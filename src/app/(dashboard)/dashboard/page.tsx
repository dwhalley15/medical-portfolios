/** 
 * @file Dashboard Page
 * @description This file defines the user dashboard page.
*/

import { auth } from "@/services/auth/auth";
import LogoutBtn from "@/components/dashboard/auth/logoutBtn";
import {
  emailVerifiedCheck,
  isOAuthUser,
  createPortfolio,
  checkUserByEmail,
  getProvider,
} from "../../../services/db/db";
import EmailVerification from "@/components/dashboard/auth/emailVerification";
import PDForm from "@/components/dashboard/settings/PDForm";
import PortfolioBtn from "@/components/dashboard/navigation/portfolioBtn";

/**
 * @function Dashboard
 * @description The user dashboard page.
 * @returns {JSX.Element} The rendered component.
 */
export default async function Dashboard() {
  const session = await auth();
  let emailVerified = false;
  let isOAuthUserFlag = false;
  let portfolio = null;
  let userData = null;
  let provider = null;

  if (session?.user?.email) {
    emailVerified = await emailVerifiedCheck(session.user.email);
    isOAuthUserFlag = await isOAuthUser(session.user.email);
    userData = await checkUserByEmail(session?.user?.email);
  }

  if (session?.user?.id && session?.user?.name) {
    const id = Number(session?.user?.id);
    const name = session?.user?.name;
    portfolio = await createPortfolio(id, name);
    if (isOAuthUserFlag) {
      provider = await getProvider(id);
    }
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
          <>
            <h1 className="blue bottom-border">{`Dashboard`}</h1>
            {session?.user && (
              <section className="home-page-container btn-width">
                <div className="container">
                  <h2 className="blue bottom-border">{"Personal Details"}</h2>
                  <PDForm
                    nameProp={userData?.name}
                    emailProp={userData?.email}
                    emailVerifiedProp={userData?.emailVerified}
                    provider={provider}
                  />
                </div>
                <div className="container">
                  {session?.user?.id && (
                    <PortfolioBtn id={Number(session.user.id)} />
                  )}
                  <LogoutBtn />
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
