/**
 * @file This file defines the location section of the portfolio.
 * @description This file contains the location section of the portfolio. It includes the location title, description, and a list of locations. Each location includes the title, address, city, state, zip, country, phone, email, and website. The section is editable and includes an editor and a remover.
 */

import SectionRemover from "@/components/dashboard/editors/sectionRemover";
import LocationEditor from "@/components/dashboard/editors/locationEditor";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGlobe,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import LocationMap from "./locationMap";

type LocationProps = {
  userId: number;
  data: LocationData;
  editable: boolean;
};

type LocationData = {
  order: number;
  title: string;
  description: string;
  theme: string;
  location: Location[];
};

type Location = {
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website: string;
};

/**
 * This function returns the location section of the portfolio.
 * @param {number} userId - The ID of the user.
 * @param {LocationData} data - The location data.
 * @param {boolean} editable - Indicates if the section is editable.
 * @returns {JSX.Element} The location section.
 */
export default function Location({ userId, data, editable }: LocationProps) {
  return (
    <section id="location" className={`location-container theme-${data.theme}`}>
      <div className="location-text-container">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className="location-list-container">
        {data.location.map((location, index) => (
          <div key={index} className="location-item-container">
            <h3>
              <FontAwesomeIcon icon={faHospital} aria-hidden="true" />{" "}
              {location.title}
            </h3>
            <Link
              className="link-text"
              href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
            >
              <FontAwesomeIcon icon={faPhone} aria-hidden="true" />{" "}
              {location.phone}
            </Link>
            <Link className="link-text" href={`mailto:${location.email}`}>
              <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />{" "}
              {location.email}
            </Link>
            <Link
              className="link-text"
              target="_blank"
              rel="noopener noreferrer"
              href={location.website}
            >
              <FontAwesomeIcon icon={faGlobe} aria-hidden="true" />{" "}
              {location.website}
            </Link>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" />{" "}
              {location.address} {location.city}
              {", "}
              {location.state} {location.country} {location.zip}
            </p>
            <LocationMap
              title={location.title}
              address={`${location.title} ${location.address} ${location.city} ${location.state} ${location.country} ${location.zip}`}
            />
          </div>
        ))}
      </div>
      {editable && (
        <div className="edit-buttons-container">
          <LocationEditor
            userIdProp={userId}
            themeProp={data.theme}
            orderProp={data.order}
            titleProp={data.title}
            descriptionProp={data.description}
            locationProp={data.location}
          />
          <SectionRemover userIdProp={userId} section="location" />
        </div>
      )}
    </section>
  );
}
