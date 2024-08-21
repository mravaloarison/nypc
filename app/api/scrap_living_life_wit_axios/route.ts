import axios from 'axios';
import * as cheerio from 'cheerio';

export function GET() {

    axios.get("https://www.duranno.com/livinglife/qt/")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            console.log(html)
            // $('strong', html).each(function() {
            //     console.log($(this).text());
            // })
        })
        .catch((error) => {
            console.log(error);
        });

    return Response.json({message: 'Hello from Next.js!'})
}
