/**
 * @file Theme selector component.
 * @description This file defines the theme selector component for the dashboard.
 */

type ThemeSelectorProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

/**
 * This function returns the theme selector component.
 * @param {ThemeSelectorProps} data - The data for the theme selector component.
 * @returns {JSX.Element} The theme selector component.
 */
export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  return (
    <div className="input-wrapper">
      <label htmlFor="theme">{"Select a Theme"}</label>
      <select
        className="text-input select-input edit-shadow-border btn-text white-background"
        id="theme"
        name="theme"
        aria-label="Theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option className="blue" value="default">
          {"Blue Theme"}
        </option>
        <option className="blue" value="default-inverted">
          {"Blue Theme Inverted"}
        </option>
        <option className="green" value="green">
          {"Green Theme"}
        </option>
        <option className="green" value="green-inverted">
          {"Green Theme Inverted"}
        </option>
        <option className="purple" value="purple">
          {"Purple Theme"}
        </option>
        <option className="purple" value="purple-inverted">
          {"Purple Theme Inverted"}
        </option>
        <option className="peach" value="peach">
          {"Peach Theme"}
        </option>
        <option className="peach" value="peach-inverted">
          {"Peach Theme Inverted"}
        </option>
      </select>
    </div>
  );
}
