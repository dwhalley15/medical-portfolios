/**
 * @file This file defines the location editor component.
 * @description This file contains the location editor component. It includes a form that allows the user to edit the location section of the portfolio. The form includes fields for the location title, address, city, state, zip, country, phone, email, and website. The user can add or remove locations as needed.
 */

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import SubmitBtn from "../modal/components/submitBtn";
import EditModal from "../modal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SectionItems from "../modal/components/sectionItems";
import { UpdateLocation } from "@/services/portfolioUpdates/updateLocation";

type LocationProps = {
  userIdProp: number;
  orderProp: number;
  titleProp: string;
  descriptionProp: string;
  themeProp: string;
  locationProp: Location[];
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
 * This function returns the location editor component.
 * @param {number} userIdProp - The ID of the user.
 * @param {number} orderProp - The order of the section.
 * @param {string} titleProp - The title of the section.
 * @param {string} descriptionProp - The description of the section.
 * @param {string} themeProp - The theme of the section.
 * @param {Location[]} locationProp - The location data.
 * @returns {JSX.Element} The location editor component.
 */
export default function LocationEditor({
  userIdProp,
  orderProp,
  titleProp,
  descriptionProp,
  themeProp,
  locationProp,
}: LocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [title, setTitle] = useState(titleProp);
  const [description, setDescription] = useState(descriptionProp);
  const [order, setOrder] = useState(orderProp);
  const [location, setLocation] = useState(locationProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  /**
   * This function handles the form submission.
   * @param formData - The form data.
   * @returns {Promise<void>} The result of the form submission.
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateLocation(formData, userIdProp);
    if (results.success) {
      await RevalidatePage(pathname);
      setLoading(false);
      setIsOpen(false);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  /**
   * This function handles the location change.
   * @param {number} index - The index of the location.
   * @param {string} field - The field to change.
   * @param {string} value - The value to set.
   * @returns {void}
   */
  const handleLocationChange = (
    index: number,
    field:
      | "title"
      | "address"
      | "city"
      | "state"
      | "zip"
      | "country"
      | "phone"
      | "email"
      | "website",
    value: string
  ) => {
    const updatedLocation = [...location];
    updatedLocation[index] = {
      ...updatedLocation[index],
      [field]: value,
    };
    setLocation(updatedLocation);
  };

  /**
   * This function adds a location.
   * @returns {void}
   */
  const addLocation = () => {
    setLocation([
      ...location,
      {
        title: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        email: "",
        website: "",
      },
    ]);
  };

  /**
   * This function removes a location.
   * @param {number} index - The index of the location to remove.
   * @returns {void}
   */
  const removeLocation = (index: number) => {
    setLocation(location.filter((_, i) => i !== index));
  };

  return (
    <>
      <ModalBtn setIsOpen={setIsOpen} btnText="Edit Location" iconProp="pen" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Location"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const extractedLocation: Location[] = [];
            location.forEach((_, index) => {
              const title = formData.get(`location[${index}][title]`) as string;
              const address = formData.get(
                `location[${index}][address]`
              ) as string;
              const city = formData.get(`location[${index}][city]`) as string;
              const state = formData.get(`location[${index}][state]`) as string;
              const zip = formData.get(`location[${index}][zip]`) as string;
              const country = formData.get(
                `location[${index}][country]`
              ) as string;
              const phone = formData.get(`location[${index}][phone]`) as string;
              const email = formData.get(`location[${index}][email]`) as string;
              const website = formData.get(
                `location[${index}][website]`
              ) as string;
              extractedLocation.push({
                title,
                address,
                city,
                state,
                zip,
                country,
                phone,
                email,
                website,
              });
            });
            formData.append("location", JSON.stringify(extractedLocation));
            await handleSubmit(formData);
          }}
        >
          <SectionItems
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            theme={theme}
            setTheme={setTheme}
            order={order}
            setOrder={setOrder}
          />

          <div className="form-container">
            {location.map((loc, index) => (
              <div
                key={index}
                className="socials-form-container edit-shadow-border"
              >
                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Title"}</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.title}
                    onChange={(e) =>
                      handleLocationChange(index, "title", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Address"}</label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.address}
                    onChange={(e) =>
                      handleLocationChange(index, "address", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Town or City"}</label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.city}
                    onChange={(e) =>
                      handleLocationChange(index, "city", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location State or Province"}</label>
                  <input
                    type="text"
                    placeholder="Enter State"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.state}
                    onChange={(e) =>
                      handleLocationChange(index, "state", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">
                    {"Enter Location Zip or Postal Code"}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Zip"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.zip}
                    onChange={(e) =>
                      handleLocationChange(index, "zip", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Country"}</label>
                  <input
                    type="text"
                    placeholder="Enter Country"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.country}
                    onChange={(e) =>
                      handleLocationChange(index, "country", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Phone Number"}</label>
                  <input
                    type="text"
                    placeholder="Enter Phone"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.phone}
                    onChange={(e) =>
                      handleLocationChange(index, "phone", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Email Address"}</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.email}
                    onChange={(e) =>
                      handleLocationChange(index, "email", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Location Website URL"}</label>
                  <input
                    type="url"
                    placeholder="Enter Website URL"
                    className="text-input btn-text edit-shadow-border"
                    value={loc.website}
                    onChange={(e) =>
                      handleLocationChange(index, "website", e.target.value)
                    }
                    required
                  />
                </div>

                <input
                  type="hidden"
                  name={`location[${index}][title]`}
                  value={loc.title}
                />

                <input
                  type="hidden"
                  name={`location[${index}][address]`}
                  value={loc.address}
                />

                <input
                  type="hidden"
                  name={`location[${index}][city]`}
                  value={loc.city}
                />

                <input
                  type="hidden"
                  name={`location[${index}][state]`}
                  value={loc.state}
                />

                <input
                  type="hidden"
                  name={`location[${index}][zip]`}
                  value={loc.zip}
                />

                <input
                  type="hidden"
                  name={`location[${index}][country]`}
                  value={loc.country}
                />

                <input
                  type="hidden"
                  name={`location[${index}][phone]`}
                  value={loc.phone}
                />

                <input
                  type="hidden"
                  name={`location[${index}][email]`}
                  value={loc.email}
                />

                <input
                  type="hidden"
                  name={`location[${index}][website]`}
                  value={loc.website}
                />

                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="btn btn-text edit-shadow-border white-background edit-button-hover"
                >
                  {"Remove Location "}
                  <FontAwesomeIcon
                    icon={faTrash}
                    aria-hidden="true"
                    size="1x"
                  />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLocation}
              className="btn btn-text edit-shadow-border white-background edit-button-hover"
            >
              {"Add Location "}
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" size="1x" />
            </button>
          </div>

          {errors.map((error) => (
            <p key={error} className="error-text">
              {error}
            </p>
          ))}

          <SubmitBtn loading={loading} />
        </form>
      </EditModal>
    </>
  );
}
