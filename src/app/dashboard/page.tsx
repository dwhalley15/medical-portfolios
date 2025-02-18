import { auth } from "@/services/auth/auth";
import LogoutBtn from "@/components/dashboard/auth/logoutBtn";

export default async function Dashboard() {
  const session = await auth();
  return (
    <main className="page-container">
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
    </main>
  );
}
