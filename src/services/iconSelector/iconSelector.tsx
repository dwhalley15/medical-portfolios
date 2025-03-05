/**
 * @file This is the icon selector service.
 * @description This service is used to select the correct icon based on the icon name.
 */

import {
  faSyringe,
  faHeart,
  faBrain,
  faTooth,
  faEye,
  faLungs,
  faCrutch,
  faPrescriptionBottle,
  faPersonWalking,
  faBiohazard,
  faPills,
  faStethoscope,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faXTwitter,
  faDiscord,
  faYoutube,
  faTiktok,
  faTwitch,
  faThreads,
  faSnapchat,
  faSlack,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

/**
 * This function returns the icon based on the icon name.
 * @param {string} icon - The name of the icon.
 * @returns {Icon} The icon.
 */
export default function IconSelector(icon: string) {
  switch (icon) {
    case "syringe":
      return faSyringe;
    case "heart":
      return faHeart;
    case "brain":
      return faBrain;
    case "tooth":
      return faTooth;
    case "eye":
      return faEye;
    case "lungs":
      return faLungs;
    case "crutch":
      return faCrutch;
    case "prescription-bottle":
      return faPrescriptionBottle;
    case "person-walking":
      return faPersonWalking;
    case "biohazard":
      return faBiohazard;
    case "pills":
      return faPills;
    case "stethoscope":
      return faStethoscope;
    case "github":
      return faGithub;
    case "facebook":
      return faFacebook;
    case "instagram":
      return faInstagram;
    case "twitter":
      return faXTwitter;
    case "discord":
      return faDiscord;
    case "youtube":
      return faYoutube;
    case "tiktok":
      return faTiktok;
    case "twitch":
      return faTwitch;
    case "threads":
      return faThreads;
    case "snapchat":
      return faSnapchat;
    case "slack":
      return faSlack;
    case "linkedin":
      return faLinkedin;
    case "whatsapp":
      return faWhatsapp;
    default:
      return faCircleXmark;
  }
}
