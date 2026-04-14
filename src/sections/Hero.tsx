import type { CSSProperties } from "react";
import { LuArrowRight } from "react-icons/lu";
import Badge from "../components/shared/Badge";
import SecondaryButton from "../components/shared/SecondaryButton";

const BRANDS = ["Pika", "Humata", "Udio", "LangChain", "n8n"];
const MARQUEE_COPIES = [0, 1] as const;
const MARQUEE_ITEMS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

const HERO_COPY = {
  badge: "Soluciones IT para empresas",
  titleStart: "Conectividad y seguridad",
  titleHighlight: "En tus operaciones",
  subtitle:
    "En Innotech desarrollamos soluciones de infraestructura, redes, seguridad y automatización, pensadas para impulsar la eficiencia y el crecimiento de tu empresa.",
  cta: "Hablá con nuestro equipo",
  trustText: "Nuestros clientes confían en la calidad de nuestras soluciones",
} as const;

type HeroProps = {
  contentStyle?: CSSProperties;
};

function Hero({ contentStyle }: HeroProps) {
  return (
    // Contenedor principal del Hero: alto de viewport, borde inline y fondo con degradado vertical.
    <section className="flex w-full items-center justify-center bg-[linear-gradient(to_bottom,var(--bg)_0%,var(--bg)_80%,var(--bg-muted)_100%)]">
      <div
        className="flex w-full max-w-[1240px] flex-col items-center justify-center gap-8 text-center p-4"
        style={contentStyle}>
        {/* 1) Badge */}
        <div>
          <Badge>{HERO_COPY.badge}</Badge>
        </div>

        {/* 2) Título */}
        <div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.06] text-[var(--text)] md:text-5xl lg:text-6xl">
            {HERO_COPY.titleStart}
            <span className="block bg-[var(--accent-1)] bg-clip-text text-transparent">{HERO_COPY.titleHighlight}</span>
          </h1>
        </div>

        {/* 3) Subtítulo */}
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">{HERO_COPY.subtitle}</p>
        </div>

        {/* 4) CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SecondaryButton href="/contact" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
            {HERO_COPY.cta}
          </SecondaryButton>
        </div>

        {/* 5) Marquee infinito: dos copias del mismo track para loop continuo sin cortes. */}
        <div className="hero-marquee-mask w-full max-w-[800px] overflow-hidden">
          <div className="hero-marquee-track whitespace-nowrap py-2 text-sm font-semibold uppercase tracking-wide text-[var(--text)]">
            {MARQUEE_COPIES.map((copyIndex) => (
              <div key={copyIndex} className="hero-marquee-group gap-16 pr-16" aria-hidden={copyIndex === 1}>
                {MARQUEE_ITEMS.map((brand, index) => (
                  <span key={`${copyIndex}-${brand}-${index}`}>{brand}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 6) Texto de confianza */}
        <div>
          <p className="text-sm text-[var(--text-muted)]">{HERO_COPY.trustText}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
