"use client";

import { logout } from "@/app/lib/actions/auth";

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
    </button>
  );
}
