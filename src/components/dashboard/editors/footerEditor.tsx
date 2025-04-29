/**
 * @file This file defines the footer editor component.
 * @description This component displays the footer editor for the dashboard.
 */

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import ThemeSelector from "../modal/components/themeSelector";
import SubmitBtn from "../modal/components/submitBtn";
import EditModal from "../modal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UpdateFooter } from "@/services/portfolioUpdates/updateFooter";

type FooterEditorProps = {
  userIdProp: number;
  themeProp: string;
  socialsProp: Socials[];
};

type Socials = {
  name: string;
  link: string;
};

const SOCIAL_OPTIONS = [
  "Twitter",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "Instagram",
  "TikTok",
];

/**
 * This function returns the footer editor component.
 * @param {FooterEditorProps} data - The data for the footer editor component.
 * @returns {JSX.Element} The footer editor component.
 */
export default function FooterEditor({
  userIdProp,
  themeProp,
  socialsProp,
}: FooterEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [socials, setSocials] = useState(socialsProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  /**
   * This function handles the form submission.
   * @param {FormData} formData - The form data to update the footer.
   * @returns {Promise<void>} The success status of the update.
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateFooter(formData, userIdProp);
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
   * This function handles the social change.
   * @param {number} index - The index of the social.
   * @param {"name" | "link"} field - The field to update.
   * @param {string} value - The value to update.
   * @returns {void} Nothing.
   */
  const handleSocialChange = (
    index: number,
    field: "name" | "link",
    value: string
  ) => {
    const updatedSocials = [...socials];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setSocials(updatedSocials);
  };

  /**
   * This function adds a social.
   * @returns {void} Nothing.
   */
  const addSocial = () => {
    setSocials([...socials, { name: "", link: "" }]);
  };

  /**
   * This function removes a social.
   * @param {number}
   * @returns {void} Nothing.
   */
  const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  return (
    <>
      <ModalBtn setIsOpen={setIsOpen} btnText="Edit Portfolio Footer" iconProp="pen" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Footer"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const extractedSocials: Socials[] = [];
            socials.forEach((_, index) => {
              const name = formData.get(`socials[${index}][name]`) as string;
              const link = formData.get(`socials[${index}][link]`) as string;

              if (name && link) {
                extractedSocials.push({ name, link });
              }
            });
            formData.append("socials", JSON.stringify(extractedSocials));
            await handleSubmit(formData);
          }}
        >
          <ThemeSelector theme={theme} setTheme={setTheme} />

          <div className="form-container">
            {socials.map((social, index) => (
              <div
                key={index}
                className="socials-form-container edit-shadow-border"
              >
                <div className="input-wrapper">
                  <label htmlFor="">{"Select a Social Platform"}</label>
                  <select
                    value={social.name}
                    aria-label="socials"
                    className="text-input select-input edit-shadow-border btn-text white-background"
                    onChange={(e) =>
                      handleSocialChange(index, "name", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      {"Select platform"}
                    </option>
                    {SOCIAL_OPTIONS.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter the URL to your profile"}</label>
                  <input
                    type="url"
                    placeholder="Enter link"
                    className="text-input btn-text edit-shadow-border"
                    value={social.link}
                    onChange={(e) =>
                      handleSocialChange(index, "link", e.target.value)
                    }
                    required
                  />
                </div>

                <input
                  type="hidden"
                  name={`socials[${index}][name]`}
                  value={social.name}
                />
                <input
                  type="hidden"
                  name={`socials[${index}][link]`}
                  value={social.link}
                />

                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="btn btn-text edit-shadow-border white-background edit-button-hover"
                >
                  {"Remove Social "}
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
              onClick={addSocial}
              className="btn btn-text edit-shadow-border white-background edit-button-hover"
            >
              {"Add Social "}
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
