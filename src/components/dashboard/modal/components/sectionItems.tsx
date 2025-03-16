/**
 * @file This file defines the SectionItems component that allows users to edit their section items.
 * @description This component handles the section items editing process.
 */

import ThemeSelector from "./themeSelector";

type SectionItemsProps = {
  theme: string;
  setTheme: (theme: string) => void;
  order: number;
  setOrder: (order: number) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
};

/**
 * SectionItems component that allows users to edit their section items.
 * This component handles the section items editing process.
 *
 * @param {SectionItemsProps} props - The component's props containing section items data.
 * @returns {JSX.Element} The rendered JSX for the SectionItems component.
 */
export default function SectionItems({
  theme,
  setTheme,
  order,
  setOrder,
  title,
  setTitle,
  description,
  setDescription,
}: SectionItemsProps) {
  return (
    <>
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <div className="input-wrapper">
        <label htmlFor="order">{"Change This Sections Order/Position"}</label>
        <input
          type="number"
          id="order"
          name="order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="text-input btn-text edit-shadow-border"
          min={1}
          max={999}
          required
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="title">{"Enter Section Title"}</label>
        <input
          className="text-input btn-text edit-shadow-border"
          type="text"
          id="title"
          name="title"
          aria-label="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="description">{"Enter Section Description"}</label>
        <textarea
          id="description"
          name="description"
          className="text-input btn-text edit-shadow-border"
          placeholder="Enter Description"
          aria-label="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
    </>
  );
}
