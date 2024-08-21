import { fetchScriptureText } from "@/app/functions/scripiture";

interface Recipient {
    email: string;
    addedAt: string;
}

export async function AutomatedEmails(recipients: Recipient[]) {
    const quoteData = await fetchQuote();
    const scriptureData = await fetchScriptureText(quoteData.quote);

    function getEmailsFromRecipients() {
        return recipients.map((recipient) => recipient.email);
    }

    try {
        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                passageRef: scriptureData.canonical,
                passage: scriptureData.passages[0],
                recipients: getEmailsFromRecipients(),
            }),
        });

        const data = await response.json();
        return data;

    } catch (error: any) {
        const res = await error.json();
        return res;
    }
}

async function fetchQuote() {
    try {
        const response = await fetch("/api/scrap_living_life_with_ppteer");
        if (!response.ok) throw new Error("Failed to fetch the quote");

        return await response.json();
    } catch (error: any) {
        throw new Error(`Error fetching quote: ${error.message}`);
    }
}