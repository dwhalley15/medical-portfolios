/**
 * @file Terms of Use Page Component
 * @description This page outlines the terms and conditions for using the Medical Portfolios platform.
 *              It specifies user responsibilities, acceptable use, intellectual property rights, and other legal considerations.
 */

import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";

/**
 * Metadata for the Terms of Use page.
 * @constant {Metadata}
 */
export const metadata: Metadata = {
  title: "Terms of Use | Medical Portfolios",
  description:
    "Read the Terms of Use for Medical Portfolios. Understand user responsibilities, acceptable use policies, and platform limitations.",
};

/**
 * Terms of Use Page Component
 * @returns {JSX.Element} A page displaying the terms and conditions for using Medical Portfolios.
 */
export default async function TermsPage() {
  return (
    <main className="text-page-container">
      <section>
        <h1 className="blue bottom-border">{`Terms of Use`}</h1>
        <p className="blue">{"Last updated: 19//02/2025"}</p>
        <h2 className="blue">{"Introduction"}</h2>
        <p className="blue">
          {
            "Welcome to Medical Portfolios. These Terms of Use outline the rules and regulations for using our platform. By accessing or using our website, you agree to comply with these terms."
          }
        </p>
        <h2 className="blue">{"User Responsibilities"}</h2>
        <p className="blue">{"By using Medical Portfolios, you agree to:"}</p>
        <ul className="blue normal-text">
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Provide accurate and truthful information on your profile."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Use the platform for lawful purposes only."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Respect the privacy and rights of other users."}
          </li>
        </ul>
        <h2 className="blue">{"Acceptable Use"}</h2>
        <p className="blue">{"Users must not:"}</p>
        <ul className="blue normal-text">
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Share false or misleading information."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Engage in any form of harassment or inappropriate behavior."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Attempt to compromise the security of the platform."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Copy or distribute platform content without permission."}
          </li>
        </ul>
        <h2 className="blue">{"Intellectual Property"}</h2>
        <p className="blue">
          {
            "All content, including text, logos, and images, is the property of Medical Portfolios and may not be used without prior permission."
          }
        </p>
        <h2 className="blue">{"Limitation of Liability"}</h2>
        <p className="blue">
          {
            "Medical Portfolios is provided on an 'as-is' basis. We do not guarantee the accuracy of information provided by users and are not responsible for any damages arising from the use of the platform."
          }
        </p>
        <h2 className="blue">{"Termination of Access"}</h2>
        <p className="blue">
          {
            "We reserve the right to suspend or terminate user accounts that violate these Terms of Use."
          }
        </p>
        <h2 className="blue">{"Changes to Terms"}</h2>
        <p className="blue">
          {
            "We may update these Terms of Use at any time. Users will be notified of significant changes."
          }
        </p>
        <h2 className="blue">{"Contact Information"}</h2>
        <p className="blue">
          {"For questions about these terms, please contact us at: "}
          <Link
            className="in-text-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send email to medicalportfolios@proton.me"
            href={"mailto:medicalportfolios@proton.me"}
          >
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" size={"xs"} />
            {" medicalportfolios@proton.me"}
          </Link>
        </p>
      </section>
    </main>
  );
}
