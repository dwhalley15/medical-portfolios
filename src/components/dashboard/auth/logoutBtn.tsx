"use client";

import { logout } from "@/app/lib/actions/auth";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutBtn() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button
      className="btn shadow-border blue-background btn-text white"
      onClick={handleLogout}
      aria-label="Logout"
    >
      {"Logout"}
      <FontAwesomeIcon icon={faRightToBracket} aria-hidden="true" />
    </button>
  );
}
