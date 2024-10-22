import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple GET route
app.get('/api', (req: Request, res: Response) => {
    res.send('Hello from the Node Firecrawl API!');
});

// A sample POST route
app.post('/api/data', (req: Request, res: Response) => {
    const { name } = req.body;
    res.json({
        message: `Hello, ${name}!`
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});