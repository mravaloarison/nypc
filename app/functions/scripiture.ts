const API_KEY = "bd4122e277ec412b591ab9f3a7e72951ee1d424b";
const ESV_API_URL = "https://api.esv.org/v3/passage/text/";

export function fetchScriptureText(passage: string): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			console.debug("Fetching scripture text from ESV API.");

			const params: any = {
				q: passage,
				"indent-poetry": false,
				"include-footnotes": false,
				"include-short-copyright": false,
				"include-passage-references": false,
                "include-selahs": false,
			};

			const headers = {
				Authorization: `Token ${API_KEY}`,
			};

			fetch(`${ESV_API_URL}?${new URLSearchParams(params)}`, { headers })
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							`Error fetching scripture text: ${response.statusText}`
						);
					}
					return response.json();
				})
				.then((data) => {
					console.debug("Scripture text fetched successfully.");
					resolve(data ?? "Scripture not found.");
				})
				.catch((error) => {
					console.error("Error fetching scripture text:", error);
					reject("Error fetching scripture text while fetching.");
				});
		} catch (error) {
			console.error("Error fetching scripture text:", error);
			reject("Error making calls for scripture.");
		}
	});
}
