type ThemeSelectorProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  return (
    <select
      className="text-input select-input edit-shadow-border btn-text white-background"
      id="theme"
      name="theme"
      aria-label="Theme"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option className="blue" value="default">{"Blue Theme"}</option>
      <option className="blue" value="default-inverted">{"Blue Theme Inverted"}</option>
      <option className="green" value="green">{"Green Theme"}</option>
      <option className="green" value="green-inverted">{"Green Theme Inverted"}</option>
      <option className="purple" value="purple">{"Purple Theme"}</option>
      <option className="purple" value="purple-inverted">{"Purple Theme Inverted"}</option>
    </select>
  );
}
