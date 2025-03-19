/**
 * @file This is the contact section of the portfolio.
 * @description This file defines the contact section of the portfolio.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import SectionRemover from "@/components/dashboard/editors/sectionRemover";
import Link from "next/link";
import ContactForm from "./contactForm";
import ContactEditor from "@/components/dashboard/editors/contactEditor";

type ContactProps = {
  userId: number;
  data: ContactData;
  editable: boolean;
};

type ContactData = {
  order: number;
  title: string;
  description: string;
  theme: string;
  contact: Contact;
};

type Contact = {
  email: string;
  phone: string;
  locationLat: string;
  locationLong: string;
  message: string;
};

/**
 * This function returns the contact section of the portfolio.
 * @param {number} userId - The ID of the user.
 * @param {ContactData} data - The contact data.
 * @param {boolean} editable - Indicates if the section is editable.
 * @returns {JSX.Element} The contact section.
 */
export default function Contact({ userId, data, editable }: ContactProps) {
  return (
    <section id="contact" className={`contact-container theme-${data.theme}`}>
      <div className="contact-text-container">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>

      <div className="contact-item-container">
        {data.contact.email && (
          <Link
            href={`mailto:${data.contact.email}`}
            className="contact-item"
            aria-label="Email"
          >
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
          </Link>
        )}
        {data.contact.phone && (
            <Link
                href={`tel:${data.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="contact-item"
                aria-label="Phone"
            >
                <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
            </Link>
        )}
        {data.contact.locationLat && data.contact.locationLong && (
          <Link
            href={`https://www.google.co.uk/maps/@${data.contact.locationLat},${data.contact.locationLong}`}
            className="contact-item"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Location"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" />
          </Link>
        )}
      </div>
      <ContactForm userIdProp={userId} messageProp={data.contact.message} />
      {editable && (
        <div className="edit-buttons-container">
          <ContactEditor
            userIdProp={userId}
            orderProp={data.order}
            themeProp={data.theme}
            titleProp={data.title}
            descriptionProp={data.description}
            contactProp={data.contact}
          />
          <SectionRemover userIdProp={userId} section="contact" />
        </div>
      )}
    </section>
  );
}
