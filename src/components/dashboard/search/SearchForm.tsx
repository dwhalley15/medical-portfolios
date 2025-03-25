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
    const formData = new FormData(e.target as HTMLFormElement);
    const searchText = formData.get("search-text") as string;
    const searchSpeciality = formData.get("search-speciality") as string;

    const queryParams: any = {};
    if (searchText?.trim()) {
      queryParams.text = searchText.trim().toLowerCase();
    }
    if (searchSpeciality?.trim() && searchSpeciality !== "DEFAULT") {
      queryParams.speciality = searchSpeciality.trim().toLowerCase();
    }

    if (Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams(queryParams).toString();
      router.push(`/search?${searchParams}`);
    }
    setLoading(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label className="blue" htmlFor="search-text">
          {"Search by name"}
        </label>
        <input
          type="text"
          name="search-text"
          placeholder="Search for a medical professional by name"
          className="text-input btn-text shadow-border"
          aria-label="Search"
        />
      </div>

      <div className="input-wrapper">
        <label className="blue" htmlFor="search-speciality">
          {"Search by speciality"}
        </label>
        <select
          name="search-speciality"
          className="text-input btn-text shadow-border white-background"
          defaultValue={"DEFAULT"}
          aria-label="Speciality"
        >
          <option value="DEFAULT" disabled>
            Select Speciality
          </option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="endocrinology">Endocrinology</option>
          <option value="gastroenterology">Gastroenterology</option>
          <option value="hematology">Hematology</option>
          <option value="infectious-disease">Infectious Disease</option>
          <option value="neurology">Neurology</option>
          <option value="nephrology">Nephrology</option>
          <option value="obstetrics-gynecology">
            Obstetrics and Gynecology
          </option>
          <option value="oncology">Oncology</option>
          <option value="ophthalmology">Ophthalmology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="otolaryngology">Otolaryngology (ENT)</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="psychiatry">Psychiatry</option>
          <option value="pulmonology">Pulmonology</option>
          <option value="radiology">Radiology</option>
          <option value="rheumatology">Rheumatology</option>
          <option value="surgery-general">General Surgery</option>
          <option value="urology">Urology</option>
        </select>
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
