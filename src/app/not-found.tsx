import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </section>
    </main>
  );
}
