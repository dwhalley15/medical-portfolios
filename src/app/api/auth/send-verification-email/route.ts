import { NextResponse } from "next/server";
import { sendEmail } from "../../../../services/email/email";
import { createVerificationToken } from "../../../../services/db/db";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.MAIL_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { email, name } = await req.json();

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 3600000);

    const tokenCreated = await createVerificationToken(email, expires, token);

    if (!email || !token || !tokenCreated) {
      return NextResponse.json(
        { error: "Missing email or token" },
        { status: 400 }
      );
    }

    const referer = req.headers.get("referer");
    if (!referer || !referer.startsWith(process.env.PUBLIC_URL!)) {
      return NextResponse.json({ error: "Invalid referer" }, { status: 403 });
    }

    const verificationLink = `${process.env.PUBLIC_URL}/api/auth/verify-email?token=${token}`;

    await sendEmail({
      sender: {
        name: "medical-portfolios",
        address: "no-reply@medical-portfolios.me",
      },
      recipient: { name: name || "User", address: email },
      subject: "Verify your email",
      message: `
        <p>Hello ${name || "User"},</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
