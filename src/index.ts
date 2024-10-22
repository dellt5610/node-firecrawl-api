import express, { Request, Response } from 'express';
import FirecrawlApp, { CrawlParams, CrawlStatusResponse } from '@mendable/firecrawl-js';

const app = express();
const appFirecrawl  = new FirecrawlApp({apiKey: "fc-6771a06bf4de4e1599d8fce547334A9e"});
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple GET route
app.get('/api', async (req: Request, res: Response) => {
// Scrape a website
const scrapeResponse = await appFirecrawl.scrapeUrl('https://firecrawl.dev', {
    formats: ['markdown', 'html'],
  });
  
  if (scrapeResponse) {
    console.log(scrapeResponse)
  }
  
  // Crawl a website
  const crawlResponse = await appFirecrawl.crawlUrl('https://firecrawl.dev', {
    limit: 100,
    scrapeOptions: {
      formats: ['markdown', 'html'],
    }
  } as CrawlParams, 30) as CrawlStatusResponse;
  
  if (crawlResponse) {
    console.log(crawlResponse)
  }    
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