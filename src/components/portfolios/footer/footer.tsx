/**
 * @file This is the footer component.
 * @description This component displays the footer for the portfolio page.
 */

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconSelector from "@/services/iconSelector/iconSelector";

type FooterProps = {
  data: FooterData;
  editable: boolean;
};

type FooterData = {
  theme: string;
  name: string;
  socials: Social[];
};

type Social = {
  name: string;
  link: string;
};

/**
 * This function returns the footer component.
 * @param {FooterProps} data - The data for the footer component.
 * @returns {JSX.Element} The footer component.
 */
export default function Footer({ data, editable }: FooterProps) {
  return (
    <footer className={`footer-container theme-${data.theme}`}>
      {data.socials.length > 0 && (
        <ul className="socials-container">
          {data.socials.map((social, index) => (
            <li key={index} className="social-item-container">
              <Link
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={IconSelector(social.name.toLowerCase())}
                  size="lg"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p>
        {`© ${new Date().getFullYear()} | Powered by Medical Portfolio's | All rights reserved.`}
      </p>
    </footer>
  );
}
