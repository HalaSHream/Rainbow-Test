

import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";

dotenv.config();

export async function lastOTP(email?: string, appPassword?: string): Promise<string | null> {
  try {
    const user = email ?? process.env.EMAIL_BASE;
    const password = appPassword ?? process.env.EMAIL_APP_PASSWORD;

    if (!user || !password) {
      throw new Error("EMAIL_BASE and EMAIL_APP_PASSWORD must be set in .env or passed as arguments");
    }

    const connection = await imaps.connect({
      imap: {
        user,
        password,
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
      },
    });

    await connection.openBox("INBOX");
    const messages = await connection.search(["UNSEEN"], { bodies: ["TEXT"], markSeen: true });

    if (!messages.length) {
      console.log(" No new messages");
      await connection.end();
      return null;
    }

    const last = messages[messages.length - 1];
    const body = last.parts[0].body;
    const parsed = await simpleParser(body);

    const match = parsed.text?.match(/\b\d{6}\b/);
    await connection.end();

    if (match) {
      console.log(" OTP found:", match[0]);
      return match[0];
    } else {
      console.log(" OTP code not found");
      return null;
    }
  } catch (err) {
    console.error("Error reading mail:", err);
    return null;
  }
}
