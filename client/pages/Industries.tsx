export default function Industries() {
  return (
    <section className="container py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Industries</h1>
        <p className="mt-3 text-muted-foreground">
          Focused on automotive platforms where fork and powertrain sealing is critical.
        </p>
      </div>
      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          "Motorcycles",
          "Scooters",
          "Passenger Cars",
          "Light Commercial",
          "Aftermarket",
          "OEMs",
        ].map((i) => (
          <div key={i} className="rounded-md border bg-card px-4 py-3 text-center text-sm font-medium">
            {i}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-sm text-muted-foreground">
        Need a size not listed? Visit the contact page to request a quote.
      </div>
    </section>
  );
}
