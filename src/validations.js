export function isPast(date, hour) {
    const now = new Date();
    const limit = new Date(`${date}T${String(hour).padStart(2, "0")}:00`);
    return limit <= now;
}

export function sameSlot(a, b) {
    return a.reservationId === b.reservationId &&
        a.date === b.date &&
        a.hour === b.hour;
}

export function isRoomCapaciTyValid(roomCapacity, reqCapacity) {
    return reqCapacity <= roomCapacity && reqCapacity > 0;
}