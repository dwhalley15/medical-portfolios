import { auth } from "@/services/auth/auth";
import LogoutBtn from "@/components/dashboard/auth/logoutBtn";
import { emailVerifiedCheck } from "../../../services/db/db";
import EmailVerification from "@/components/dashboard/auth/emailVerification";

export default async function Dashboard() {
  const session = await auth();
  let emailVerified = null;
  let isOAuthUser = false;

  if (session?.user?.email) {
    const verificationStatus = await emailVerifiedCheck(session.user.email);
    emailVerified = !!verificationStatus?.emailVerified;
    isOAuthUser = verificationStatus?.isOAuthUser;
  }

  return (
    <>
      <main className="page-container">
        {!isOAuthUser && !emailVerified && (
          <section className="container">
            <h1 className="blue">{"Email Verification Required"}</h1>
            <EmailVerification
              email={session?.user?.email}
              name={session?.user?.name}
            />
          </section>
        )}
        {(emailVerified || isOAuthUser) && (
          <section className="container">
            <h1 className="blue">{`Dashboard`}</h1>
            {session?.user && (
              <>
                <p className="blue">
                  User signed in with name {session.user.name} and email{" "}
                  {session.user.email}.{" "}
                </p>
                <LogoutBtn />
              </>
            )}
          </section>
        )}
      </main>
    </>
  );
}
