import { ROOMS_FILE } from "../config.js";
import { readJson, send } from "../utils.js";

export async function getAvailableRooms(res) {
    const rooms = await readJson(ROOMS_FILE);
    send(res, 200, rooms);
}