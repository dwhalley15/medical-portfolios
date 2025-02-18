"use client";

import { googleLogin } from "@/app/lib/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function GoogleSignInBtn() {
  const handleGithubLogin = async () => {
    await googleLogin();
  };
  return (
    <button
      className="google-btn btn-text"
      onClick={handleGithubLogin}
      aria-label="Sign in with Google"
    >
      <FontAwesomeIcon icon={faGoogle} aria-hidden="true" />
      {"Sign in with Google"}
    </button>
  );
}
