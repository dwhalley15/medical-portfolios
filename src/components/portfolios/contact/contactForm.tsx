/**
 * @file This is the contact form of the portfolio.
 * @description This file defines the contact form of the portfolio.
 */

"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { SendContactEmail } from "@/services/email/SendContactEmail";

type ContactFormProps = {
  userIdProp: number;
  messageProp: string;
};

/**
 * This function returns the contact form.
 * @returns {JSX.Element} The contact form.
 */
export default function ContactForm({
  userIdProp,
  messageProp,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * This function handles the form submission.
   * @param {FormData}
   * @returns {Promise<void>}
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setSubmitted(false);
    setLoading(true);
    const results = await SendContactEmail(formData, userIdProp);
    if (results.success) {
      setLoading(false);
      setSubmitted(true);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  return submitted ? (
    <p className="contact-form-success">
      {messageProp?.trim()
        ? messageProp
        : "Thank you! Your message has been sent successfully."}
    </p>
  ) : (
    <form
      className="contact-form-container"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        await handleSubmit(formData);
      }}
    >
      <div className="contact-form-input-container">
        <label className="contact-form-label" htmlFor="name">
          {"Name"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="contact-form-input"
          placeholder="Enter Your name"
          aria-label="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="contact-form-input-container">
        <label className="contact-form-label" htmlFor="email">
          {"Email"}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="contact-form-input"
          placeholder="Enter Your email"
          aria-label="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="contact-form-input-container">
        <label className="contact-form-label" htmlFor="message">
          {"Message"}
        </label>
        <textarea
          id="message"
          name="message"
          className="contact-form-input"
          placeholder="Enter Your message"
          aria-label="message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        ></textarea>
      </div>

      {errors.map((error) => (
        <p key={error} className="error-text">
          {error}
        </p>
      ))}

      <button
        className="contact-btn"
        type="submit"
        disabled={loading || submitted}
        aria-label="Send"
      >
        {loading ? "Sending..." : submitted ? "Sent" : "Send"}
        <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
      </button>
    </form>
  );
}
