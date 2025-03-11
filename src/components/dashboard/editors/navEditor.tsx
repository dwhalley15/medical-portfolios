/**
 * @file Navigation editor component.
 * @description This component displays the navigation editor for the dashboard.
 */

"use client";

import { useState } from "react";
import EditModal from "../modal/EditModal";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import { UpdateNavigationTheme } from "@/services/portfolioUpdates/updateNavigationTheme";
import ModalBtn from "../modal/components/modalBtn";
import ThemeSelector from "../modal/components/themeSelector";
import SubmitBtn from "../modal/components/submitBtn";
import IconSelector from "../modal/components/iconSelector";

type NavigationEditorProps = {
  userIdProp: number;
  themeProp: string;
  iconProp: string;
};

/**
 * This function returns the navigation editor component.
 * @param {NavigationEditorProps} data - The data for the navigation editor component.
 * @returns {JSX.Element} The navigation editor component.
 */
export default function NavigationEditor({
  userIdProp,
  themeProp,
  iconProp,
}: NavigationEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [icon, setIcon] = useState(iconProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateNavigationTheme(formData, userIdProp);
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
      <ModalBtn setIsOpen={setIsOpen} btnText="Edit Navbar" iconProp="pen" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Navbar"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleSubmit(formData);
          }}
        >
          <ThemeSelector theme={theme} setTheme={setTheme} />

          <IconSelector icon={icon} setIcon={setIcon} />

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
