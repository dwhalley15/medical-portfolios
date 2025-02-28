"use client";

import { useState } from "react";

type EmailVerificationProps = {
  email: string | null | undefined;
  name: string | null | undefined;
};

export default function EmailVerification({
  email,
  name,
}: EmailVerificationProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendEmail = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/auth/send-verification-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_MAIL_API_KEY!,
          Referer: window.location.origin,
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });
      if (!response.ok) {
        setError("Failed to send email");
      }

      setEmailSent(true);
    } catch (error) {
      setError("Failed to send email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {!emailSent ? (
        <button
          onClick={handleSendEmail}
          disabled={loading}
          className="btn btn-width shadow-border blue-background btn-text white"
          aria-label="Send Verification Email"
        >
          {loading ? "Sending..." : "Send Verification Email"}
        </button>
      ) : (
        <p className="blue">
          {`A verification email has been sent to ${email}. Please check your inbox and click the link to verify your email.`}
        </p>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
