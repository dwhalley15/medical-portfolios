export default async function PortfolioPage({
  params,
}: {
  params: { name: string };
}) {
  console.log("Params:", params);

  if (!params?.name) {
    return <h1>Error: No name found</h1>;
  }
  return (
    <main className="page-container">
      <section className="container">
        <h1 className="blue">{`Welcome to ${params.name}'s Portfolio`}</h1>
        <p className="blue">
          {"This is a placeholder for the user's portfolio page."}
        </p>
      </section>
    </main>
  );
}
