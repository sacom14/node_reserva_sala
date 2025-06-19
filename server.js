import http from 'node:http';
import { RESERVATION_FILE, ROOMS_FILE, PORT } from './src/config.js';
import { ensureFileExists } from './src/utils.js';
import { router } from './src/router.js';

(async () => {
    await ensureFileExists(ROOMS_FILE, [
        {
            "id": "R-1",
            "name": "Sala A",
            "capacity": 4,
            "location": "Planta 1"
        },
        {
            "id": "R-2",
            "name": "Sala B",
            "capacity": 3,
            "location": "Planta 2"
        },
        {
            "id": "R-3",
            "name": "Sala C",
            "capacity": 5,
            "location": "Planta 1"
        },
        {
            "id": "R-4",
            "name": "Sala D",
            "capacity": 4,
            "location": "Planta 1"
        }
    ]);

    await ensureFileExists(RESERVATION_FILE, []);

    http.createServer(async (req, res) => {
        try {
            await router(req, res);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }).listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})();



