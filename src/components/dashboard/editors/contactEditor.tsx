/**
 * @file This file defines the contact editor component.
 * @description This file contains the contact editor component.
 */

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import SubmitBtn from "../modal/components/submitBtn";
import EditModal from "../modal/EditModal";
import SectionItems from "../modal/components/sectionItems";
import { UpdateContact } from "@/services/portfolioUpdates/updateContact";

type ContactEditorProps = {
  userIdProp: number;
  orderProp: number;
  themeProp: string;
  titleProp: string;
  descriptionProp: string;
  contactProp: Contact;
};

type Contact = {
  email: string;
  phone: string;
  locationLat: string;
  locationLong: string;
  message: string;
};

/**
 * This function returns the contact editor.
 * @param {number} userIdProp - The ID of the user.
 * @param {number} orderProp - The order of the section.
 * @param {string} themeProp - The theme of the section.
 * @param {string} titleProp - The title of the section.
 * @param {string} descriptionProp - The description of the section.
 * @param {Contact} contactProp - The contact information.
 * @returns {JSX.Element} The contact editor.
 */
export default function ContactEditor({
  userIdProp,
  orderProp,
  themeProp,
  titleProp,
  descriptionProp,
  contactProp,
}: ContactEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [title, setTitle] = useState(titleProp);
  const [description, setDescription] = useState(descriptionProp);
  const [order, setOrder] = useState(orderProp);
  const [email, setEmail] = useState(contactProp.email);
  const [phone, setPhone] = useState(contactProp.phone);
  const [locationLat, setLocationLat] = useState(contactProp.locationLat);
  const [locationLong, setLocationLong] = useState(contactProp.locationLong);
  const [message, setMessage] = useState(contactProp.message);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  /**
   * This function handles the form submission.
   * @param {FormData}
   * @returns {Promise<void>}
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateContact(formData, userIdProp);
    if (results.success) {
      await RevalidatePage(pathname);
      setLoading(false);
      setIsOpen(false);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  return (
    <>
      <ModalBtn setIsOpen={setIsOpen} btnText="Edit Contact" iconProp="pen" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Contact"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleSubmit(formData);
          }}
        >
          <SectionItems
            theme={theme}
            setTheme={setTheme}
            order={order}
            setOrder={setOrder}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />

          <div className="input-wrapper">
            <label htmlFor="email">{"Enter Email"}</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              className="text-input btn-text edit-shadow-border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="phone">{"Enter Phone"}</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone"
              className="text-input btn-text edit-shadow-border"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="locationLat">{"Enter Location Latitude"}</label>
            <input
              type="text"
              name="locationLat"
              placeholder="Enter latitude"
              className="text-input btn-text edit-shadow-border"
              value={locationLat}
              onChange={(e) => setLocationLat(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="locationLong">{"Enter Location Longitude"}</label>
            <input
              type="text"
              name="locationLong"
              placeholder="Enter longitude"
              className="text-input btn-text edit-shadow-border"
              value={locationLong}
              onChange={(e) => setLocationLong(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="message">{"Enter Thank you Message"}</label>
            <input
              type="text"
              name="message"
              placeholder="Enter message"
              className="text-input btn-text edit-shadow-border"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
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
