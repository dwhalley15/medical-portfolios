/**
 * @file Password Recovery API Route
 * @description Handles password recovery requests by generating a verification token,
 *              validating the email, and sending a password reset email.
 */

import { NextResponse } from "next/server";
import { sendEmail } from "../../../../services/email/email";
import {
  createVerificationToken,
  emailVerifiedCheck,
  isOAuthUser,
} from "../../../../services/db/db";

/**
 * Handles password recovery requests.
 * Validates the email, checks if it's verified, and generates a password reset token.
 * Sends an email with a password reset link if all conditions are met.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure.
 */
export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.MAIL_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const email = body.email?.trim();

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 3600000);

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const emailVerified = await emailVerifiedCheck(email);

    const isOAuthUserFlag = await isOAuthUser(email);

    if (isOAuthUserFlag) {
      return NextResponse.json(
        { error: "OAuth users do not require passwords" },
        { status: 400 }
      );
    }

    if (!emailVerified) {
      return NextResponse.json(
        { error: "Email address not verified" },
        { status: 400 }
      );
    }

    const tokenCreated = await createVerificationToken(email, expires, token);

    if (!token || !tokenCreated) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const referer = req.headers.get("referer");
    if (!referer || !referer.startsWith(process.env.PUBLIC_URL!)) {
      return NextResponse.json({ error: "Invalid referer" }, { status: 403 });
    }

    const recoveryLink = `${process.env.PUBLIC_URL}/password-recovery/reset-password?token=${token}`;

    await sendEmail({
      sender: {
        name: "medical-portfolios",
        address: "no-reply@medical-portfolios.me",
      },
      recipient: { name: "Password Recovery", address: email },
      subject: "Reset your password",
      message: `
      <p>This is a password recovery for the account relating to, ${email}</p>
      <p>Please click the link below to set a new password.</p>
      <a href="${recoveryLink}">${recoveryLink}</a>
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
