/**
 * @file PasswordRecovery Component
 * @description This component allows users to request a password recovery email.
 * It handles the process of sending the email and displays success or error messages based on the result.
 */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/**
 * PasswordRecovery component that allows users to enter their email and request a password recovery email.
 * It handles the form submission process and provides feedback based on the success or failure of the request.
 *
 * @returns {JSX.Element} The rendered JSX for the PasswordRecovery component.
 */
export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  /**
   * Handles the process of sending the password recovery email by making a POST request to the backend API.
   * Sends the email and updates the UI based on success or failure.
   */
  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      const response = await fetch(`/api/auth/send-password-recovery-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_MAIL_API_KEY!,
          Referer: window.location.origin,
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        setErrors([error.error || "Something went wrong"]);
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      setErrors(["Failed to send email"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSendEmail}>
      <div className="input-wrapper btn-limit">
        <label className="blue" htmlFor="email">
          {"Enter Your Email Address"}
        </label>
        <div className="input-icon-container blue btn-text">
          <input
            className="text-input shadow-border blue btn-text"
            name="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="input-icon"
            aria-hidden="true"
          />
        </div>
      </div>
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="error-text">
              {error}
            </p>
          ))}
        </div>
      )}

      {emailSent && <p className="blue">{"Email sent! Check your inbox."}</p>}

      {!emailSent && (
        <button
          className="btn shadow-border btn-limit blue-background btn-text white"
          type="submit"
          aria-label="Send Password Recovery Email"
          role="button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Recover Password"}
          <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
