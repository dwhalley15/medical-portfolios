/**
 * @file SignUpForm Component
 * @description This component provides the user interface for signing up a new user with their personal and login details.
 * It handles form submission, user registration, error handling, and redirects to the dashboard after successful registration.
 */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faLock,
  faShieldAlt,
  faIdCard,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { signUp } from "../../../app/lib/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { credentialsLogin } from "../../../app/lib/actions/auth";

/**
 * SignUpForm component that allows users to register for an account with personal details and login credentials.
 * It handles form submission, user registration, error handling, and redirects users to the dashboard after successful registration.
 *
 * @returns {JSX.Element} The rendered JSX for the SignUpForm component.
 */
export default function SignUpForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Handles the form submission by sending the user's details to the registration API.
   * If registration is successful, it logs in the user and redirects to the dashboard.
   * If there are any errors, it displays them.
   *
   * @param {FormData} formData - The form data containing the user's details and credentials.
   */
  return (
    <form
      className="form-container"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setErrors([]);
        setLoading(true);
        const results = await signUp(formData);
        if (!results.success) {
          setErrors(results.errors ?? []);
        } else {
          await credentialsLogin(formData);
          setLoading(false);
          router.push(results.redirectTo ?? "/dashboard");
        }
      }}
    >
      <div className="form-content">
        <fieldset className="input-container">
          <div className="input-wrapper">
            <label className="blue" htmlFor="title">
              {"Select a Title"}
            </label>
            <select
              className="text-input select-input shadow-border blue btn-text white-background"
              name="title"
              aria-label="Title"
              defaultValue={"DEFAULT"}
              required
            >
              <option value="DEFAULT" disabled>
                Select Title
              </option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label className="blue" htmlFor="last-name">
              {"Enter Your Last Name"}
            </label>
            <div className="input-icon-container blue btn-text">
              <input
                className="text-input shadow-border blue btn-text"
                name="last-name"
                type="text"
                placeholder="Surname"
                aria-label="Surname"
                autoComplete="family-name"
                required
              />
              <FontAwesomeIcon
                icon={faUserTie}
                className="input-icon"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="input-wrapper">
            <label className="blue" htmlFor="first-name">
              {"Enter Your Forename(s)"}
            </label>
            <div className="input-icon-container blue btn-text">
              <input
                className="text-input shadow-border blue btn-text"
                name="first-name"
                type="text"
                placeholder="Forename(s)"
                aria-label="Forename"
                autoComplete="given-name"
                required
              />
              <FontAwesomeIcon
                icon={faIdCard}
                className="input-icon"
                aria-hidden="true"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="input-container">
          <div className="input-wrapper">
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
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="input-icon"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="input-wrapper">
            <label className="blue" htmlFor="password">
              {"Enter Your Password"}
            </label>
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
          </div>
          <div className="input-wrapper">
            <label className="blue" htmlFor="password-confirm">
              {"Confirm Your Password"}
            </label>
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
          </div>
        </fieldset>
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

      <button
        className="btn btn-limit shadow-border blue-background btn-text white"
        type="submit"
        aria-label="Sign Up"
        role="button"
        disabled={loading}
      >
        {loading ? "Working..." : "Sign Up"}
        <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" />
      </button>
    </form>
  );
}
