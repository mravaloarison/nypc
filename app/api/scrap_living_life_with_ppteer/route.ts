import * as cheerio from 'cheerio';

let puppeteer: any;
let chrome: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // require('chrome-aws-lambda').install();
    // require('puppeteer-core').install();

    // import puppeteer from 'puppeteer-core';
    puppeteer = require('puppeteer-core');

    // import chrome from 'chrome-aws-lambda';
    chrome = require('chrome-aws-lambda');
} else {
    // import puppeteer from 'puppeteer';
    puppeteer = require('puppeteer');
}


export async function GET() {
    let options = {};

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
            args: [...chrome.args, '--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: false,
            ignoreHTTPSErrors: true,
        };
    }

    const browser = await puppeteer.launch(options);
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