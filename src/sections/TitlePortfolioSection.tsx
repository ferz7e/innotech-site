import { LuArrowRight } from "react-icons/lu";
import PrimaryButton from "../components/shared/PrimaryButton";
import SectionHeading from "../components/shared/SectionHeading";

type PortfolioStat = {
  value: string;
  label: string;
};

const PORTFOLIO_STATS: PortfolioStat[] = [
  { value: "+60", label: "clientes nos eligen" },
  { value: "99.9%", label: "disponibilidad de servicios" },
];

function TitlePortfolioSection() {
  return (
    <section
      id="portfolio"
      className="flex items-center justify-center  bg-[linear-gradient(to_bottom,transparent_0%,transparent_40%,var(--bg-muted)_100%)] px-4 py-24">
      <div className="flex w-full max-w-[1240px] flex-col items-center gap-8">
        <SectionHeading
          align="center"
          title="Resultados reales, impacto medible"
          subtitle="Proyectos implementados con foco en continuidad operativa, seguridad y crecimiento sostenible para empresas."
        />

        <PrimaryButton href="/contact" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
          Solicita tu presupuesto
        </PrimaryButton>

        <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
          {PORTFOLIO_STATS.map((stat) => (
            <div key={stat.value} className="flex min-w-[220px] flex-col items-center gap-3 text-center">
              <div className="h-px w-16 bg-[var(--line)]" />
              <p className="text-4xl font-semibold leading-none text-[var(--text)] md:text-5xl">{stat.value}</p>
              <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TitlePortfolioSection;
