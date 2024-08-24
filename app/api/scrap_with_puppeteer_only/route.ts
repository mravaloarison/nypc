import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function GET() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.duranno.com/livinglife/qt/', {
        waitUntil: 'networkidle2',
      });

    const text = await page.content().then((content: any) => {
        const $ = cheerio.load(content);
        const quote = $('.sub_title').text();

        try {
            return quote;
        }
        catch (error) {
            return error;
        }
    });

    await browser.close();

    return Response.json({quote: text});
}