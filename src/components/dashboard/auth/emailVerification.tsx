/**
 * @file EmailVerification Component
 * @description This component allows users to trigger the sending of a verification email, 
 * displaying either a success message or an error message depending on the result of the operation.
 */

"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

/**
 * @typedef {Object} EmailVerificationProps
 * @description Defines the props for the EmailVerification component.
 * @property {string | null | undefined} email - The email address to send the verification email to.
 * @property {string | null | undefined} name - The name of the user to personalize the verification email.
 */
type EmailVerificationProps = {
  email: string | null | undefined;
  name: string | null | undefined;
};

/**
 * EmailVerification component that allows users to trigger the sending of a verification email.
 * This component handles the email sending process and displays success or error messages.
 *
 * @param {EmailVerificationProps} props - The component's props containing user email and name.
 * @returns {JSX.Element} The rendered JSX for the EmailVerification component.
 */
export default function EmailVerification({
  email,
  name,
}: EmailVerificationProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the email sending process by making a POST request to the backend API.
   * Sends the email and updates the UI based on success or failure.
   */
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
          <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
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
