import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function SignInForm() {
  return (
    <form className="form-container" method="post" action="">
      <div className="input-icon-container blue btn-text">
        <input
          className="text-input shadow-border blue btn-text"
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="input-icon"
          aria-hidden="true"
        />
      </div>
      <div className="input-icon-container blue btn-text">
        <input
          className="text-input shadow-border blue btn-text"
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <FontAwesomeIcon
          icon={faLock}
          className="input-icon"
          aria-hidden="true"
        />
      </div>
      <button
        className="btn btn-width shadow-border blue-background btn-text white"
        type="submit"
        aria-label="Sign In"
        role="button"
      >
        {"Sign In"}
        <FontAwesomeIcon icon={faUser} aria-hidden="true" />
      </button>
    </form>
  );
}
