/**
 * @file This is the search form component. It contains the search form for the search page.
 * @description The search form component is responsible for rendering the search form for the search page.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * This is the search form component. It contains the search form for the search page.
 * @returns {JSX.Element} The search form component.
 */
export default function SearchForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * This function handles the form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   * @returns {void}
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search-text") as string;

    if (!searchQuery?.trim()) {
      setErrors(["Please enter a name, symptom, or query to search."]);
      setLoading(false);
      return;
    }

    const queryParams = {
      text: searchQuery.trim().toLowerCase(),
    };

    const searchParams = new URLSearchParams(queryParams).toString();
    router.push(`/search?${searchParams}`);

    setLoading(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label className="blue" htmlFor="search-text">
          {"Search by Name or Ailment"}
        </label>
        <input
          type="text"
          name="search-text"
          placeholder="Search for a medical professional by name"
          className="text-input btn-text shadow-border"
          aria-label="Search"
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

      <button
        type="submit"
        className="btn btn-width shadow-border blue-background btn-text white"
        aria-label="Search"
        disabled={loading}
      >
        {loading ? "Working..." : "Search"}
        <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
      </button>
    </form>
  );
}
