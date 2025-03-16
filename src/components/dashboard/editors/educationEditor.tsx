/**
 * @file This is the education editor component.
 * @description This component allows the user to edit the education section of the portfolio.
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
import { UpdateEducation } from "@/services/portfolioUpdates/updateEducation";
import SectionItems from "../modal/components/sectionItems";

type EducationEditorProps = {
  userIdProp: number;
  orderProp: number;
  themeProp: string;
  titleProp: string;
  descriptionProp: string;
  educationProp: Education[];
};

type Education = {
  title: string;
  location: string;
  description: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
};

/**
 * This function returns the education editor component.
 * @param {EducationEditorProps} data - The data for the education editor component.
 * @returns {JSX.Element} The education editor component.
 */
export default function EducationEditor({
  userIdProp,
  orderProp,
  themeProp,
  titleProp,
  descriptionProp,
  educationProp,
}: EducationEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [title, setTitle] = useState(titleProp);
  const [description, setDescription] = useState(descriptionProp);
  const [order, setOrder] = useState(orderProp);
  const [education, setEducation] = useState(educationProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  /**
   * This function handles the form submission.
   * @param formData The form data containing the education details.
   * @returns A promise that contains a boolean indicating the success status and an optional array of errors.
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateEducation(formData, userIdProp);
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
   * This function handles the change of education details.
   * @param index
   * @param field
   * @param value
   * @returns void
   */
  const handleEducationChange = (
    index: number,
    field: "title" | "location" | "description" | "startDate" | "endDate",
    value: string
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]:
        field === "startDate" || field === "endDate" ? new Date(value) : value,
    };
    setEducation(updatedEducation);
  };

  /**
   * This function adds a new education section.
   * @returns void
   */
  const addEducation = () => {
    setEducation([
      ...education,
      {
        title: "",
        location: "",
        description: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };

  /**
   * This function removes an education section.
   * @param index
   * @returns void
   */
  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <>
      <ModalBtn setIsOpen={setIsOpen} btnText="Edit Education" iconProp="pen" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Education"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const extractedEducation: Education[] = [];
            education.forEach((_, index) => {
              const title = formData.get(
                `education[${index}][title]`
              ) as string;
              const location = formData.get(
                `education[${index}][location]`
              ) as string;
              const description = formData.get(
                `education[${index}][description]`
              ) as string;
              const startDateString = formData.get(
                `education[${index}][startDate]`
              ) as string;
              const endDateString = formData.get(
                `education[${index}][endDate]`
              ) as string;

              if (
                title &&
                description &&
                location &&
                startDateString &&
                endDateString
              ) {
                extractedEducation.push({
                  title,
                  description,
                  location,
                  startDate: new Date(startDateString),
                  endDate: new Date(endDateString),
                });
              }
            });
            formData.append("education", JSON.stringify(extractedEducation));
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

          <div className="form-container">
            {education.map((education, index) => (
              <div
                key={index}
                className="socials-form-container edit-shadow-border"
              >
                <div className="input-wrapper">
                  <label htmlFor="title">{"Enter Education Title"}</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    className="text-input btn-text edit-shadow-border"
                    value={education.title}
                    onChange={(e) =>
                      handleEducationChange(index, "title", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="location">{"Enter Location"}</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    className="text-input btn-text edit-shadow-border"
                    value={education.location}
                    onChange={(e) =>
                      handleEducationChange(index, "location", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Education Description"}</label>
                  <textarea
                    id="description"
                    name="description"
                    className="text-input btn-text edit-shadow-border"
                    placeholder="Description"
                    value={education.description}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="startDate">{"Enter Start Date"}</label>
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Enter Start Date"
                    className="text-input btn-text edit-shadow-border"
                    value={
                      education.startDate instanceof Date
                        ? education.startDate.toISOString().split("T")[0]
                        : typeof education.startDate === "string"
                        ? education.startDate
                        : ""
                    }
                    onChange={(e) =>
                      handleEducationChange(index, "startDate", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="endDate">{"Enter End Date"}</label>
                  <input
                    type="date"
                    name="endDate"
                    placeholder="Enter End Date"
                    className="text-input btn-text edit-shadow-border"
                    value={
                      education.endDate instanceof Date
                        ? education.endDate.toISOString().split("T")[0]
                        : typeof education.endDate === "string"
                        ? education.endDate
                        : ""
                    }
                    onChange={(e) =>
                      handleEducationChange(index, "endDate", e.target.value)
                    }
                    required
                  />
                </div>

                <input
                  type="hidden"
                  name={`education[${index}][title]`}
                  value={education.title}
                />
                <input
                  type="hidden"
                  name={`education[${index}][location]`}
                  value={education.location}
                />
                <input
                  type="hidden"
                  name={`education[${index}][description]`}
                  value={education.description}
                />
                <input
                  type="hidden"
                  name={`education[${index}][startDate]`}
                  value={
                    education.startDate instanceof Date
                      ? education.startDate.toISOString().split("T")[0]
                      : typeof education.startDate === "string"
                      ? education.startDate
                      : ""
                  }
                />
                <input
                  type="hidden"
                  name={`education[${index}][endDate]`}
                  value={
                    education.endDate instanceof Date
                      ? education.endDate.toISOString().split("T")[0]
                      : typeof education.endDate === "string"
                      ? education.endDate
                      : ""
                  }
                />

                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="btn btn-text edit-shadow-border white-background edit-button-hover"
                >
                  {"Remove Education "}
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
              onClick={addEducation}
              className="btn btn-text edit-shadow-border white-background edit-button-hover"
            >
              {"Add Education "}
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
