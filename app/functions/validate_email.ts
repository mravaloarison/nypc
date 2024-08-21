"use server";

import dotenv from 'dotenv';

dotenv.config();

const EMAIL_VALIDATION_API_KEY = process.env.EMAIL_VALIDATION_API_KEY;

export async function isValidLevel1(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export async function isValidLevel2(email: string): Promise<boolean> {
    const url = "https://www.emailvalidationapi.io/v1/validate";

    console.log("API KEY IS: ", EMAIL_VALIDATION_API_KEY);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': EMAIL_VALIDATION_API_KEY as string,
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            console.error('Failed to validate email');
            console.log(await response.json());
        }

        const data = await response.json();
        return data.valid;
    } catch (error: any) {
        console.error(`Error validating email: ${error.message}`);
        return false;
    }
}