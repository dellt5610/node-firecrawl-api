import express, { Request, Response } from 'express';
import FirecrawlApp, { CrawlParams, CrawlStatusResponse } from '@mendable/firecrawl-js';

const app = express();
const appFirecrawl  = new FirecrawlApp({apiKey: "fc-6771a06bf4de4e1599d8fce547334a9e"});
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple GET route
app.get('/api', async (req: Request, res: Response) => {  
    res.send('Hello from the Node Firecrawl API!');
});

app.get('/api/scrape', async (req: Request, res: Response) => {
  // Scrape a website
  const scrapeResponse = await appFirecrawl.scrapeUrl('https://firecrawl.dev', {
    formats: ['markdown', 'html'],
  });

  if (scrapeResponse) {
    res.send(scrapeResponse);
  }else{
    res.send('Failed to scrape the website');
  }
});

app.get('/api/crawl',  async (req: Request, res: Response) => {
  // Crawl a website
  const crawlResponse = await appFirecrawl.crawlUrl('https://firecrawl.dev', {
    limit: 100,
    scrapeOptions: {
      formats: ['markdown', 'html'],
    }
  } as CrawlParams, 30) as CrawlStatusResponse;

  if (crawlResponse) {
    res.send(crawlResponse)
  }else{
    res.send('Failed to crawl the website');
  }
});

app.get('/api/crawl_cdx',  async (req: Request, res: Response) => {
  // Crawl a website
  const crawlResponse = await appFirecrawl.crawlUrl('https://wiki.codix.eu/wiki/index.php?title=CodiX_Group_Intranet_Main_Page', {
    limit: 100,
    scrapeOptions: {
      formats: ['markdown', 'html'],
    }
  } as CrawlParams, 30) as CrawlStatusResponse;

  if (crawlResponse) {
    res.send(crawlResponse)
  }else{
    res.send('Failed to crawl the website');
  }
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