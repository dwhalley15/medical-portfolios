/**
 * @file This is the education component.
 * @description This component displays the education section of the portfolio.
 */

import EducationEditor from "@/components/dashboard/editors/educationEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import SectionRemover from "@/components/dashboard/editors/sectionRemover";

type EducationProps = {
  userId: number;
  data: EducationData;
  editable: boolean;
};

type EducationData = {
  order: number;
  title: string;
  description: string;
  theme: string;
  education: Education[];
};

type Education = {
  title: string;
  location: string;
  description: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
};

/**
 * This function returns the education section of the portfolio.
 * @param {number} userId - The ID of the user.
 * @param {EducationData} data - The education data.
 * @param {boolean} editable - Indicates if the section is editable.
 * @returns {JSX.Element} The education section.
 */
export default function Education({ userId, data, editable }: EducationProps) {
  const parsedEducation = data.education.map((edu) => ({
    ...edu,
    startDate:
      edu.startDate instanceof Date
        ? edu.startDate
        : edu.startDate
        ? new Date(edu.startDate)
        : null,
    endDate:
      edu.endDate instanceof Date
        ? edu.endDate
        : edu.endDate
        ? new Date(edu.endDate)
        : null,
  }));

  return (
    <section
      id="education"
      className={`education-container theme-${data.theme}`}
    >
      <div className="education-text-container">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className="education-list-container">
        <div className="education-line"></div>
        {data.education.map((education, index) => (
          <div key={index} className="education-item-container">
            <div className="education-icon-container">
              <FontAwesomeIcon
                className="education-icon"
                icon={faGraduationCap}
                aria-hidden="true"
              />
            </div>
            <div className="education-item-text-container">
              <h3>{education.title}</h3>
              <h4>{education.location}</h4>
              <p>
                {parsedEducation[index].startDate
                  ? parsedEducation[index].startDate.toLocaleDateString()
                  : "No start date"}
                {" - "}
                {parsedEducation[index].endDate
                  ? parsedEducation[index].endDate.toLocaleDateString()
                  : "No end date"}
              </p>
              <p>{education.description}</p>
            </div>
          </div>
        ))}
      </div>
      {editable && (
        <div className="edit-buttons-container">
          <EducationEditor
            userIdProp={userId}
            themeProp={data.theme}
            orderProp={data.order}
            titleProp={data.title}
            descriptionProp={data.description}
            educationProp={parsedEducation}
          />
          <SectionRemover userIdProp={userId} section="education" />
        </div>
      )}
    </section>
  );
}
