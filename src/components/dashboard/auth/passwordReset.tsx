/**
 * @file PasswordReset Component
 * @description This component allows users to reset their password.
 * It displays a form to enter a new password and confirm it, and provides feedback based on the success or failure of the password reset operation.
 */

"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faShieldAlt,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "../../../app/lib/actions/auth";

/**
 * PasswordReset component that allows users to reset their password by entering and confirming a new password.
 * It handles the form submission and provides feedback based on the success or failure of the reset operation.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.email - The email address associated with the password reset request.
 * @returns {JSX.Element} The rendered JSX for the PasswordReset component.
 */
export default function PasswordReset({ email }: { email: string }) {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="form-container"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setErrors([]);
        setSuccess(false);
        setLoading(true);
        const results = await resetPassword(formData, email);
        if (!results.success) {
          setErrors(results.errors ?? []);
        }
        setSuccess(results.success);
        setLoading(false);
      }}
    >
      <div className="input-icon-container blue btn-text">
        <input
          className="text-input shadow-border blue btn-text"
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <FontAwesomeIcon
          icon={faLock}
          className="input-icon"
          aria-hidden="true"
        />
      </div>
      <div className="input-icon-container blue btn-text">
        <input
          className="text-input shadow-border blue btn-text"
          name="password-confirm"
          type="password"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          autoComplete="current-password"
          required
        />
        <FontAwesomeIcon
          icon={faShieldAlt}
          className="input-icon"
          aria-hidden="true"
        />
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

      {success && <p className="blue">{"Password reset successfully."}</p>}

      {!success && (
        <button
          className="btn btn-limit shadow-border blue-background btn-text white"
          type="submit"
          aria-label="Reset Password"
          role="button"
          disabled={loading}
        >
          {loading ? "Working..." : "Reset Password"}
          <FontAwesomeIcon icon={faArrowsRotate} aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
