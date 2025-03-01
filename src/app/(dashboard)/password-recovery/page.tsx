/**
 * @file Password Recovery Page Component
 * @description This page allows users to initiate the password recovery process.
 *              It provides a form for users to enter their email and request a password reset link.
 */

import PasswordRecovery from "@/components/dashboard/auth/passwordRecovery";

/**
 * Password Recovery Page Component
 * @returns {JSX.Element} A page where users can request a password reset link.
 */
export default async function PasswordRecoveryPage() {
  return (
    <main className="page-container">
      <section className="container">
        <h1 className="blue bottom-border">{`Password Recovery`}</h1>
        <PasswordRecovery />
      </section>
    </main>
  );
}
