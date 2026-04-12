import SectionHeading from "../components/shared/SectionHeading";

const GRID_ITEMS = Array.from({ length: 5 });

function ServicesGridSection() {
  return (
    <section className="relative min-h-[100dvh] border-x border-[var(--line)] bg-[linear-gradient(to_bottom,transparent_0%,var(--bg-muted)_28%,var(--bg-muted)_100%)] p-4">
      <div className="relative z-10 mx-auto flex h-[calc(100dvh-2rem)] w-full max-w-[1240px] flex-col gap-8">
        <SectionHeading
          align="start"
          title="Nuestras soluciones"
          subtitle="Servicios diseñados para cubrir cada necesidad tecnológica de tu empresa."
        />

        <div className="grid h-full flex-1 grid-cols-3 grid-rows-2 gap-4">
          {GRID_ITEMS.map((_, index) => (
            <div
              key={index}
              className={`rounded-xl border border-[var(--line)] bg-[var(--bg)] ${index === 0 ? "col-span-2" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGridSection;
