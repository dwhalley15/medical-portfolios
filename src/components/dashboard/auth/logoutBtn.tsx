/**
 * @file Logout Button Component
 * @description A client-side button component that allows users to log out of their account.
 */

"use client";

import { logout } from "@/app/lib/actions/auth";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * LogoutBtn Component
 * @description Renders a logout button that triggers the `logout` function when clicked.
 *              The button includes an icon for better user experience.
 * @returns {JSX.Element} A styled button component for user logout.
 */
export default function LogoutBtn() {
  /**
   * Handles the user logout process.
   * Calls the `logout` function to end the session.
   */
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button
      className="btn shadow-border blue-background btn-text white"
      onClick={handleLogout}
      aria-label="Sign Out"
      role="button"
    >
      {"Sign Out"}
      <FontAwesomeIcon icon={faRightToBracket} aria-hidden="true" />
    </button>
  );
}
