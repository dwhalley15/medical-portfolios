"use client";

import { facebookLogin } from "@/app/lib/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function FacebookSignInBtn() {
  const handleLogin = async () => {
    await facebookLogin();
  };
  return (
    <button
      className="oauth-btn facebook-color btn-text"
      onClick={handleLogin}
      aria-label="Sign in with Facebook"
    >
      <FontAwesomeIcon icon={faFacebook} aria-hidden="true" />
      {"Sign in with Facebook"}
    </button>
  );
}
