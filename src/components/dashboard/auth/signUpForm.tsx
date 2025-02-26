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

export default function SignUpForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  return (
    <form
      className="form-container"
      action={async (formData: FormData) => {
        setErrors([]);
        const results = await signUp(formData);
        if (!results.success) {
          setErrors(results.errors ?? []);
        } else {
          await credentialsLogin(formData);
          router.push(results.redirectTo ?? "/dashboard");
        }
      }}
    >
      <div className="form-content">
        <fieldset className="input-container">
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
        </fieldset>
        <fieldset className="input-container">
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
      >
        {"Sign Up"}
        <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" />
      </button>
    </form>
  );
}
