import { auth } from "@/services/auth/auth";
import LogoutBtn from "@/components/dashboard/auth/logoutBtn";
import { emailVerifiedCheck, isOAuthUser } from "../../../services/db/db";
import EmailVerification from "@/components/dashboard/auth/emailVerification";

export default async function Dashboard() {
  const session = await auth();
  let emailVerified = false;
  let isOAuthUserFlag = false;

  if (session?.user?.email) {
    emailVerified = await emailVerifiedCheck(session.user.email);
    isOAuthUserFlag = await isOAuthUser(session.user.email);
  }

  return (
    <>
      <main className="page-container">
        {!isOAuthUserFlag && !emailVerified && (
          <section className="container">
            <h1 className="blue">{"Email Verification Required"}</h1>
            <EmailVerification
              email={session?.user?.email}
              name={session?.user?.name}
            />
          </section>
        )}
        {(emailVerified || isOAuthUserFlag) && (
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
