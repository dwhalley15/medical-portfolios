/**
 * @file Personal Details Form
 * @description This file defines the personal details form component for the user dashboard settings page.
*/

"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faIdCard,
  faCheckCircle,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { updatePersonalDetails } from "../../../services/db/db";

type PDFormProps = {
  nameProp: string;
  emailProp: string;
  emailVerifiedProp: boolean;
  provider?: string;
};

/**
 * @function PDForm
 * @description A form component for updating a user's personal details.
 * @param {PDFormProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function PDForm({
  nameProp,
  emailProp,
  emailVerifiedProp,
  provider,
}: PDFormProps) {
  const splitName = (fullName: string) => {
    const titles = ["Dr", "Prof", "Mr", "Ms", "Mrs"];
    const parts = fullName.trim().split(/\s+/);
    let title = "DEFAULT";
    let firstNames = "";
    let lastName = "";

    if (titles.includes(parts[0])) {
      title = parts.shift() as string;
    }

    if (parts.length > 1) {
      lastName = parts.pop() as string;
      firstNames = parts.join(" ");
    } else {
      firstNames = parts[0] || "";
    }

    return { title, firstNames, lastName };
  };

  const [emailVerified, setEmailVerified] = useState(emailVerifiedProp);
  const { title, firstNames, lastName } = splitName(nameProp);
  const [nameTitle, setNameTitle] = useState(title);
  const [firstNameState, setFirstName] = useState(firstNames);
  const [lastNameState, setLastName] = useState(lastName);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <form
      className="form-container"
      onSubmit={async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const results = await updatePersonalDetails(formData);
        if (!results.success) {
          setErrors(results.errors ?? []);
        }
        setSuccess(results.success);
        setLoading(false);
      }}
    >
      <fieldset className="input-container">
        <select
          className="text-input select-input shadow-border blue btn-text white-background"
          name="title"
          aria-label="Title"
          value={nameTitle}
          onChange={(e) => setNameTitle(e.target.value)}
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
            required
            value={lastNameState}
            onChange={(e) => setLastName(e.target.value)}
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
            required
            value={firstNameState}
            onChange={(e) => setFirstName(e.target.value)}
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
            type="hidden"
            placeholder="Email"
            aria-label="Email"
            value={emailProp}
          />
        </div>

        <span className="blue btn-text">
          <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
          {provider
            ? ` Verified by ${provider}`
            : emailVerified
            ? " Email Verified"
            : " Email Not Verified"}
        </span>
      </fieldset>

      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="error-text">
              {error}
            </p>
          ))}
        </div>
      )}

      {success && (
        <p className="blue">{"Personal details updated successfully."}</p>
      )}

      <button
        className="btn btn-limit shadow-border blue-background btn-text white"
        type="submit"
        aria-label="Update"
        role="button"
        disabled={loading}
      >
        {loading ? "Working..." : "Update"}
        <FontAwesomeIcon icon={faArrowsRotate} aria-hidden="true" />
      </button>
    </form>
  );
}
