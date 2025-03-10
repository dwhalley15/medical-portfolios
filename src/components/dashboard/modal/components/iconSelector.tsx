import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconSelectorService from "@/services/iconSelector/iconSelector";

type IconProp = {
  icon: string;
  setIcon: (theme: string) => void;
};

export default function IconSelector({ icon, setIcon }: IconProp) {
  return (
    <div className="btn-width">
      <FontAwesomeIcon
        icon={IconSelectorService(icon)}
        size="4x"
        aria-hidden="true"
      />
      <select
        className="text-input select-input edit-shadow-border btn-text white-background"
        id="icon"
        name="icon"
        aria-label="Icon"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
      >
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
  );
}
