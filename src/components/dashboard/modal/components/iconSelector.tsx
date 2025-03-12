/**
 * @file This file defines the component for selecting an icon.
 * @description This component displays the icon selector for the dashboard.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconSelectorService from "@/services/iconSelector/iconSelector";

type IconProp = {
  icon: string;
  setIcon: (theme: string) => void;
};

/**
 * This function returns the icon selector component.
 * @param {IconProp} icon - The icon to select.
 * @param {IconProp} setIcon - The function to set the icon.
 * @returns {JSX.Element} The icon selector component.
 */
export default function IconSelector({ icon, setIcon }: IconProp) {
  return (
    <div className="btn-width">
      <FontAwesomeIcon
        icon={IconSelectorService(icon)}
        size="4x"
        aria-hidden="true"
      />
      <div className="input-wrapper">
        <label htmlFor="icon">{"Select an Icon"}</label>
        <select
          className="text-input select-input edit-shadow-border btn-text white-background"
          id="icon"
          name="icon"
          aria-label="Icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        >
          <option value="" disabled>
            {"Select an Icon"}
          </option>
          <option value="syringe">{"Syringe"}</option>
          <option value="heart">{"Heart"}</option>
          <option value="brain">{"Brain"}</option>
          <option value="tooth">{"Tooth"}</option>
          <option value="eye">{"Eye"}</option>
          <option value="lungs">{"Lungs"}</option>
          <option value="crutch">{"Crutch"}</option>
          <option value="prescription-bottle">{"Prescription Bottle"}</option>
          <option value="person-walking">{"Person Walking"}</option>
          <option value="biohazard">{"Biohazard"}</option>
          <option value="pills">{"Pills"}</option>
          <option value="stethoscope">{"Stethoscope"}</option>
        </select>
      </div>
    </div>
  );
}
