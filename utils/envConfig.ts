import dotenv from "dotenv";
dotenv.config();

export const EnvConfig = {
    gmailEmail: process.env.GMAIL_EMAIL!,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD!,
    rainbowEmail: process.env.RAINBOW_EMAIL!,
    rainbowPassword: process.env.RAINBOW_PASSWORD!,
};