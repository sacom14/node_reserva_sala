import { RESERVATION_FILE, ROOMS_FILE } from "../config.js";
import { randomUUID } from 'node:crypto';
import { readJson, writeJson, send, parseBody } from "../utils.js";
import { isPast, sameSlot, isRoomCapaciTyValid } from "../validations.js";

export async function getAllReservations(res) {
    const reservations = await readJson(RESERVATION_FILE);
    send(res, 200, reservations);
}

export async function postReservation(req, res) {
    const body = await parseBody(req);
    const { roomId, name, date, hour, quantityOfPeople } = body;

    if (!roomId || !name || !date || hour === undefined || quantityOfPeople === undefined) {
        return send(res, 400, { error: 'All fields are required' });
    }

    if (isPast(date, hour)) {
        return send(res, 400, { error: 'Cannot reserve a room in the past' });
    }

    const [rooms, reservations] = await Promise.all([
        readJson(ROOMS_FILE),
        readJson(RESERVATION_FILE)
    ]);

    const room = rooms.find(r => r.id === roomId);

    if (!room) {
        return send(res, 404, { error: 'Room not found' });
    }

    if (reservations.some(r => sameSlot(r, body))) {
        return send(res, 409, { error: 'This slot is already reserved' });
    }

    if (isRoomCapaciTyValid(room.capacity, quantityOfPeople) === false) {
        return send(res, 400, { error: 'Invalid room capacity' });
    }

    const reservation = {
        id: randomUUID(),
        roomId,
        name,
        date,
        hour,
        quantityOfPeople
    }

    reservations.push(reservation);
    await writeJson(RESERVATION_FILE, reservations);
    send(res, 201, reservation);
}

export async function deleteReservation(reservationId, res) {
    if (!reservationId) {
        return send(res, 400, { error: 'Reservation ID is required' });
    }
    const reservation = await readJson(RESERVATION_FILE);
    const index = reservation.findIndex(r => r.id === reservationId);

    if (index === undefined || index === -1) {
        return send(res, 404, { error: 'Reservation not found' });
    }

    reservation.splice(index, 1);
    await writeJson(RESERVATION_FILE, reservation);
    send(res, 204, null);
}