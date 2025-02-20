/**
 * @file Privacy Policy Page Component
 * @description This page displays the privacy policy for Medical Portfolios.
 *              It outlines how user data is collected, used, and protected.
 */

import { faCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Metadata } from "next";

/**
 * Metadata for the Privacy Policy page.
 * @constant {Metadata}
 */
export const metadata: Metadata = {
  title: "Privacy Policy | Medical Portfolios",
  description:
    "Welcome to Medical Portfolios. This privacy policy explains how we collect, use, and protect your personal information when you use our website. By using our platform, you agree to the terms outlined in this policy.",
};

/**
 * Privacy Policy Page Component
 * @returns {JSX.Element} A page displaying the privacy policy for Medical Portfolios.
 */
export default async function PrivacyPage() {
  return (
    <main className="text-page-container">
      <section>
        <h1 className="blue">{`Privacy Policy`}</h1>
        <p className="blue">{"Last updated: 19//02/2025"}</p>
        <h2 className="blue">{"Introduction"}</h2>
        <p className="blue">
          {
            "Welcome to Medical Portfolios. This privacy policy explains how we collect, use, and protect your personal information when you use our website. By using our platform, you agree to the terms outlined in this policy."
          }
        </p>
        <h2 className="blue">{"Information We Collect"}</h2>
        <p className="blue">
          {"We may collect the following types of personal information:"}
        </p>
        <ul className="blue normal-text">
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            <strong>{" Personal Data:"}</strong>
            {
              " Name, email address, medical qualifications, and other profile details."
            }
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            <strong>{" Usage Data:"}</strong>
            {
              " Information on how you interact with the website, such as page visits and time spent on pages."
            }
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            <strong>{" Cookies and Tracking:"}</strong>
            {
              " We may use cookies to enhance user experience and analyse website traffic."
            }
          </li>
        </ul>
        <h2 className="blue">{"How We Use Your Information"}</h2>
        <p className="blue">
          {"We use the information collected for the following purposes:"}
        </p>
        <ul className="blue normal-text">
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" To create and manage user profiles."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" To improve website functionality and user experience."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {
              " To communicate with users regarding updates or support requests."
            }
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" To analyse website performance through tracking technologies."}
          </li>
        </ul>
        <h2 className="blue">{"How We Protect Your Data"}</h2>
        <p className="blue">
          {
            "We take reasonable measures to protect your personal data, including:"
          }
        </p>
        <ul className="blue normal-text">
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Secure data storage."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Limited access to user data."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Encryption of sensitive information (if applicable)."}
          </li>
        </ul>
        <h2 className="blue">{"User Rights"}</h2>
        <p className="blue">{"You have the right to:"}</p>
        <ul className="blue normal-text">
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Access, update, or delete your personal information."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Request information about how your data is used."}
          </li>
          <li>
            <FontAwesomeIcon icon={faCircle} aria-hidden="true" size={"xs"} />
            {" Opt out of certain data collection methods (e.g., cookies)."}
          </li>
        </ul>
        <h2 className="blue">{"Cookies & Tracking Technologies"}</h2>
        <p className="blue">
          {
            "Our website may use cookies to enhance functionality and track user behavior. You can manage cookie preferences through your browser settings."
          }
        </p>
        <h2 className="blue">{"Policy Changes"}</h2>
        <p className="blue">
          {
            "We may update this policy from time to time. Any changes will be posted on this page, and significant updates may be communicated to users directly."
          }
        </p>
        <h2 className="blue">{"Contact Information"}</h2>
        <p className="blue">
          {
            "If you have any questions about this privacy policy, please contact us at: "
          }
          <Link
            className="in-text-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send email to info@medicalportfolios.com"
            href={"mailto:info@medicalportfolios.com"}
          >
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" size={"xs"} />
            {" info@medicalportfolios.com"}
          </Link>
        </p>
      </section>
    </main>
  );
}
