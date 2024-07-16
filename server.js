import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handler } from './index.mjs';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', async (req, res) => {
    const event = { queryStringParameters: req.query, httpMethod: 'GET' };
    const response = await handler(event);
    res.status(response.statusCode).send(response.body);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
