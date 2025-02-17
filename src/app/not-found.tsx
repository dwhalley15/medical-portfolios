/**
 * @file NotFound Page Component
 * @description This component renders a 404 error page for when users try to access a non-existent route.
 */

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

/**
 * NotFound Page Component
 * @returns {JSX.Element} A 404 error message with a button to navigate back to the home page.
 */
export default async function NotFound() {
  return (
    <main className="page-container">
      <section className="container">
        <h1 className="blue">{"404 - Page Not Found"}</h1>
        <p className="blue">{"The page you are looking for does not exist."}</p>
        <Link
          className="btn shadow-border blue-background btn-text white"
          href="/"
          aria-label="Go to Home page"
          role="button"
        >
          {"Back to Home Page"}
          <FontAwesomeIcon icon={faHome} aria-hidden="true"/>
        </Link>
      </section>
    </main>
  );
}
