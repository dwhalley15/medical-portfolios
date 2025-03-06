/**
 * @file SignInForm Component
 * @description This component provides the user interface for signing in with email and password.
 * It handles form submission, displays errors if authentication fails, and provides a link for password recovery.
 */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { credentialsLogin } from "../../../app/lib/actions/auth";
import Link from "next/link";
import { useState } from "react";

/**
 * SignInForm component that allows users to sign in with their email and password.
 * It handles form submission, authentication, error handling, and displays relevant messages.
 *
 * @returns {JSX.Element} The rendered JSX for the SignInForm component.
 */
export default function SignInForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission by sending the email and password to the authentication service.
   * If authentication fails, it displays the error message(s).
   *
   * @param {FormData} formData - The form data containing the user's email and password.
   */
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setErrors([]);
    const result = await credentialsLogin(formData);
    if (result.error) {
      setErrors([result.error]);
    }
    setLoading(false);
  };

  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        handleSubmit(formData);
      }}
    >
      <div className="input-icon-container blue btn-text">
        <input
          className="text-input shadow-border blue btn-text"
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="input-icon"
          aria-hidden="true"
        />
      </div>
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

      <Link
        href="/password-recovery"
        className="link-text blue"
        role="button"
        aria-label="Forgot Password?"
      >
        {"Forgot Password?"}
      </Link>

      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="error-text">
              {error}
            </p>
          ))}
        </div>
      )}

      <button
        className="btn btn-width shadow-border blue-background btn-text white"
        type="submit"
        aria-label="Sign In"
        role="button"
        disabled={loading}
      >
        {loading ? "Working..." : "Sign In"}
        <FontAwesomeIcon icon={faUser} aria-hidden="true" />
      </button>
    </form>
  );
}
