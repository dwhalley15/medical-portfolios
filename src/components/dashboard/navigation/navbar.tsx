/**
 * @file This is the navigation bar component. It contains the navigation links for the application.
 * @description The navigation bar component is responsible for rendering the navigation links for the application.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faHandHoldingMedical } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

/**
 * This is the navigation bar component. It contains the navigation links for the application.
 * @returns {JSX.Element} The navigation bar component.
 */
export default function Navbar() {

  const pathname = usePathname();

  /**
   * This function checks if a route is active.
   * @param {string}
   * @returns {string} The active class name.
   */
  const isActive = (route: string) => {
    if (route === "/") {
      return pathname !== "/search" ? "blue white-background" : "white";
    }
    return pathname === route ? "blue white-background" : "white";
  };

  return (
    <nav className="main-navbar-container blue-background white">
      <div className="navbar-logo-container white-background">
        <Link href="/" aria-label="Go to Home page" role="button">
          <Image
            className="footer-logo"
            src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-logo-small-0tjxIFdCiUAkdsYhbjASAnqVExAR0j.png"
            alt="Medical portfolio logo"
            width={400}
            height={400}
            priority
            quality={100}
          />
        </Link>
      </div>
      <ul className="main-navbar-items-container">
        <li className={`${isActive("/")}`}>
          <Link
            href="/"
            aria-label="Go to Home page"
            role="button"
            className={`link-text ${isActive("/")}`}
          >
            {"Professionals"}
            <FontAwesomeIcon icon={faUserDoctor} aria-hidden="true" size="2x"/>
          </Link>
        </li>

        <li className={`${isActive("/search")}`}>
          <Link
            href="/search"
            aria-label="Go to Home page"
            role="button"
            className={`link-text ${isActive("/search")}`}
          >
            {"Patients"}
            <FontAwesomeIcon icon={faHandHoldingMedical} aria-hidden="true" size="2x"/>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
