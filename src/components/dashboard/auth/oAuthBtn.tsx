/**
 * @file OAuth Button Component
 * @description A client-side button component that allows users to log in via Google, Twitter or Facebook.
 *              It renders a styled button that triggers the respective login function for the selected provider.
 */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { googleLogin, facebookLogin, twitterLogin } from "@/app/lib/actions/auth";

/**
 * @interface ProviderConfig
 * @description Configuration object for each OAuth provider, including the icon, action, and styling details.
 */
interface ProviderConfig {
  icon: any;
  action: () => Promise<void>;
  className: string;
  label: string;
}

/**
 * @interface OAuthButtonProps
 * @description Props required for the OAuth button component, including the selected provider
 *              and optional custom text.
 */
interface OAuthButtonProps {
  provider: "google" | "facebook" | "twitter";
  text?: string;
}

/**
 * @constant providerConfig
 * @description A configuration object that maps each OAuth provider (Google, Facebook, Twitter) to its
 *              respective icon, login action, styling, and label.
 */
const providerConfig: Record<string, ProviderConfig> = {
  google: {
    icon: faGoogle,
    action: googleLogin,
    className: "google-color",
    label: "Sign in with Google",
  },
  facebook: {
    icon: faFacebook,
    action: facebookLogin,
    className: "facebook-color",
    label: "Sign in with Facebook",
  },
  twitter: {
    icon: faXTwitter,
    action: twitterLogin,
    className: "twitter-color",
    label: "Sign in with Twitter",
  }
};

/**
 * OAuthBtn Component
 * @description A button that allows users to log in using Google, Twitter or Facebook.
 *              It triggers the respective login function based on the selected provider and displays
 *              a dynamic label and icon.
 * @param {OAuthButtonProps} props - The properties for the component.
 * @param {string} provider - The OAuth provider to use ('google', 'twitter' or 'facebook').
 * @param {string} [text] - Optional custom text to display on the button.
 * @returns {JSX.Element | null} A styled OAuth login button or null if an invalid provider is specified.
 */
export default function OAuthBtn({ provider, text }: OAuthButtonProps) {
  const config = providerConfig[provider];

  if (!config) {
    console.error("Invalid provider specified");
    return null;
  }

  /**
   * Handles the login process by invoking the appropriate login function
   * based on the selected provider (Google, Twitter or Facebook).
   */
  const handleLogin = async () => {
    await config.action();
  };

  return (
    <button
      className={`oauth-btn ${config.className} btn-text`}
      onClick={handleLogin}
      aria-label={text || config.label}
    >
      <FontAwesomeIcon icon={config.icon} aria-hidden="true" />
      {text || config.label}
    </button>
  );
}
