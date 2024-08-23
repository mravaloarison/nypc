import puppeteer from "puppeteer-core";

export async function GET() {
    let browser: any;

    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
        });

        const page = await browser.newPage();

        await page.goto('https://www.duranno.com/livinglife/qt/');
        
        const text = await page.$(".sub_title").then((el: any) => el?.evaluate((node: any) => node.textContent));

        return new Response(JSON.stringify({ quote: text }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error("Something went wrong while fetching");

        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } finally {
        await browser?.close();
    }
}
