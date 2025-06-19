import { promises as fs } from 'node:fs';
import { DATA_DIR } from './config.js';
import { Buffer } from 'node:buffer';

export async function ensureFileExists(file, defeaultContent = {}) {
    try {
        await fs.access(file);
    } catch (err) {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(file, JSON.stringify(defeaultContent, null, 2));
    }
}

export const readJson = async (file) => JSON.parse(await fs.readFile(file, 'utf-8'));

export const writeJson = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

export function send(res, status, payload) {
    const body = JSON.stringify(payload);

    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
    });

    res.end(body);
}

export function parseBody(req) {
    return new Promise((resolve, reject) => {
        let buffer = '';
        req.on('data', chunk => {
            buffer += chunk.toString();
        });

        req.on('end', () => {
            try {
                resolve(JSON.parse(buffer) || "{}");
            } catch (err) {
                reject(new Error('Invalid JSON'));
            }
        })
    });

}