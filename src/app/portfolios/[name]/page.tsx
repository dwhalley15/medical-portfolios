export default async function PortfolioPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;

  return (
      <main className="page-container">
          <section className="container">
              <h1 className="blue">{`Welcome to ${resolvedParams.name}'s Portfolio`}</h1>
              <p className="blue">{"This is a placeholder for the user's portfolio page."}</p>
          </section>
      </main>
  );
}
