/**
 * @file Specialities Component
 * @description This file defines the specialities component.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconSelector from "@/services/iconSelector/iconSelector";
import SpecialitiesEditor from "@/components/dashboard/editors/specialitiesEditor";

type SpecialitiesProps = {
  userId: number;
  data: SpecialitiesData;
  editable: boolean;
};

type SpecialitiesData = {
  order: number;
  title: string;
  description: string;
  theme: string;
  specialities: Speciality[];
};

type Speciality = {
  title: string;
  description: string;
  icon: string;
};

/**
 * @function Specialities
 * @description The specialities component.
 * @param {SpecialitiesProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export default function Specialities({
  data,
  editable,
  userId,
}: SpecialitiesProps) {
  return (
    <section
      id="specialities"
      className={`specialities-container theme-${data.theme}`}
    >
      <div className="specialities-text-container">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className="specialities-list-container">
        {data.specialities.map((speciality, index) => (
          <div key={index} className="speciality-container">
            <FontAwesomeIcon
              icon={IconSelector(speciality.icon)}
              aria-hidden="true"
              size="4x"
            />
            <h3>{speciality.title}</h3>
            <p>{speciality.description}</p>
          </div>
        ))}
      </div>
      {editable && (
        <SpecialitiesEditor
          userIdProp={userId}
          orderProp={data.order}
          titleProp={data.title}
          descriptionProp={data.description}
          themeProp={data.theme}
          specialitiesProp={data.specialities}
        />
      )}
    </section>
  );
}
