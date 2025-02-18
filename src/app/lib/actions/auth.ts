"use server"

import { signIn, signOut } from "../../../services/auth/auth";

export const githubLogin = async () => {
    await signIn("github", {redirectTo: "/dashboard"});
};

export const googleLogin = async () => {
    await signIn("google", {redirectTo: "/dashboard"});
}

export const logout = async () => {
    await signOut({redirectTo: "/"});
};