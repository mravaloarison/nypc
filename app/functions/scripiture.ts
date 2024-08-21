"use server";

import dotenv from 'dotenv';

dotenv.config();

const ESV_API_KEY = process.env.ESV_API_KEY;
const ESV_API_URL = "https://api.esv.org/v3/passage/text/";

export async function fetchScriptureText(passage: string): Promise<any> {

	if (!ESV_API_KEY) {
		console.error("Error fetching scripture text: ESV_API_KEY not set.");
		return "Error fetching scripture text: ESV_API_KEY not set.";
	}

	try {
		const params: any = {
			q: passage,
			"indent-poetry": false,
			"include-footnotes": false,
			"include-short-copyright": false,
			"include-passage-references": false,
			"include-selahs": false,
		};
		const headers = {
			Authorization: `Token ${ESV_API_KEY}`,
		};

		const response = await fetch(`${ESV_API_URL}?${new URLSearchParams(params)}`, { headers });
		if (!response.ok) {
			throw new Error(`Error fetching scripture text: ${response.statusText}`);
		}

		const data = await response.json();
		return data ?? "Scripture not found.";
	} catch (error) {
		return "Error fetching scripture text while fetching.";
	}
}
