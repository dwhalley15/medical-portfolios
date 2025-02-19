"use client";

import { githubLogin } from "@/app/lib/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function GithubSignInBtn() {
  const handleLogin = async () => {
    await githubLogin();
  };
  return (
    <button
      className="github-btn white btn-text"
      onClick={handleLogin}
      aria-label="Sign in with Github"
    >
      <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
      {"Sign in with Github"}
    </button>
  );
}
