import url from 'node:url';
import { send } from './utils.js';
import { getAvailableRooms } from './handlers/rooms.js';
import { getAllReservations, postReservation } from './handlers/reservations.js';

export async function router(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET' && pathname === '/rooms') {
        return getAvailableRooms(res);
    }
    if (req.method === 'GET' && pathname === '/reservations') {
        return getAllReservations(res);
    }
    if (req.method === 'POST' && pathname === '/reservations') {
        return postReservation(req, res);
    }
    if (req.method === 'DELETE' && pathname.startsWith('/reservations/:reservationId')) {
        return console.log('Deleting a reservation...');
    }

    send(res, 404, { error: 'Not Found' });

}