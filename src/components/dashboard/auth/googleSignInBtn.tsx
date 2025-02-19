"use client";

import { googleLogin } from "@/app/lib/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function GoogleSignInBtn() {
  const handleLogin = async () => {
    await googleLogin();
  };
  return (
    <button
      className="oauth-btn google-color btn-text"
      onClick={handleLogin}
      aria-label="Sign in with Google"
    >
      <FontAwesomeIcon icon={faGoogle} aria-hidden="true" />
      {"Sign in with Google"}
    </button>
  );
}
