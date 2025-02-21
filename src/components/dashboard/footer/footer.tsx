/**
 * @file Footer Component
 * @description A client-side footer component that provides navigation links,
 *              contact details, and branding for the Medical Portfolio platform.
 */

import Link from "next/link";
import { faPhone, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

/**
 * Footer Component
 * @description Renders the footer section of the Medical Portfolio website.
 *              It includes a logo, description, useful links, and contact details.
 * @returns {JSX.Element} A structured footer containing navigation links, branding, and contact information.
 */
export default function Footer() {
  return (
    <footer className="footer-container blue-background white">
      <div className="footer-content-container">
        <div className="footer-image-container white-background">
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
        <div className="text-container">
          <h2 className="footer-h2">{"Medical Portfolio's"}</h2>
          <p className="white">
            {
              "A platform for medical professionals to create and showcase their professional portfolios, helping patients connect with the right healthcare experts."
            }
          </p>
        </div>
        <div className="text-container">
          <h2 className="footer-h2">{"Useful Links"}</h2>
          <ul>
            <li>
              <Link
                className="white link-text"
                aria-label="Go to about page"
                href={"/about"}
              >
                {"About"}
              </Link>
            </li>
            <li>
              <Link
                className="white link-text"
                aria-label="Go to privacy policy page"
                href={"/privacy-policy"}
              >
                {"Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link
                className="white link-text"
                aria-label="Go to terms of use page"
                href={"/terms-of-use"}
              >
                {"Terms of Use"}
              </Link>
            </li>
            <li>
              <Link
                className="white link-text"
                aria-label="Go to help page"
                href={"/help"}
              >
                {"Help"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-container">
          <h2 className="footer-h2">{"Contact"}</h2>
          <ul>
            <li>
              <Link
                className="white link-text"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Go to Google Maps location"
                href={"https://maps.app.goo.gl/hoEtHfKFXRqvTbha6"}
              >
                <FontAwesomeIcon icon={faHome} aria-hidden="true" />
                {"Fern Barrow, Poole BH12 5BB"}
              </Link>
            </li>
            <li>
              <Link
                className="white link-text"
                href={"mailto:medicalportfolios@proton.me"}
                target="_blank"
                aria-label="Send email to medicalportfolios@proton.me"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                {"medicalportfolios@proton.me"}
              </Link>
            </li>
            <li>
              <Link
                className="white link-text"
                href={"tel:02000000007"}
                target="_blank"
                aria-label="Call 02000 000 007"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                {"02000 000 007"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-container">
        <hr className="footer-divider" />
        <p className="white">
          © {new Date().getFullYear()} Medical Portfolios. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
