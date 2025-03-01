/**
 * @file Password Reset Page Component
 * @description This page handles the password reset process.
 *              It validates the reset token, checks expiration, and allows the user to set a new password.
 */

import { redirect } from "next/navigation";
import { verifyToken } from "@/services/db/db";
import PasswordReset from "../../../../components/dashboard/auth/passwordReset";

/**
 * Password Reset Page Component
 * @param {Object} props - Component properties.
 * @param {Promise<{ token: string }> | undefined} props.searchParams - Search parameters containing the password reset token.
 * @returns {JSX.Element} A page where users can reset their password after verifying their reset token.
 */
export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }> | undefined;
}) {
  const token = searchParams
    ? ((await searchParams).token as string)
    : undefined;

  if (!token) {
    redirect("/not-found");
  }

  const tokenValid = await verifyToken(token);

  if (!tokenValid) {
    redirect("/not-found");
  }

  const email = tokenValid.identifier;

  return (
    <main className="page-container">
      <section className="container">
        <h1 className="blue bottom-border">{`Password Reset`}</h1>
        <PasswordReset email={email} />
      </section>
    </main>
  );
}
