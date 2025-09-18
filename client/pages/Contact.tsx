import ContactForm from "@/components/site/ContactForm";

export default function Contact() {
  return (
    <section className="border-t bg-muted/30 py-14 sm:py-20">
      <div className="container grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Request a Quote</h1>
          <p className="mt-3 text-muted-foreground">
            Tell us about your vehicle and fork dimensions. We’ll recommend the right shocker seal or automotive oil seal and pricing.
          </p>
          <div className="mt-6 rounded-xl border bg-card p-6">
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Materials" value="NBR, FKM, PTFE" />
              <Stat label="Fork Sizes" value="26–50mm" />
              <Stat label="Tooling" value="In‑house" />
              <Stat label="MOQ" value="Flexible" />
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-4 text-center">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold text-primary">{value}</div>
    </div>
  );
}
