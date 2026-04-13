import SectionHeading from "../components/shared/SectionHeading";

// Repetimos 2 copias de cada track para conseguir loop infinito sin cortes.
const MARQUEE_COPIES = [0, 1] as const;

type ClientRecommendation = {
  name: string;
  company: string;
  quote: string;
  avatarUrl: string;
};

type ClientRecommendationCardProps = {
  avatarUrl: string;
  name: string;
  company: string;
  quote: string;
};

type RecommendationMarqueeRowProps = {
  recommendations: ClientRecommendation[];
  trackClassName?: string;
  className?: string;
};

// Dataset de testimonios ficticios para poblar el marquee.
const CLIENT_RECOMMENDATIONS: ClientRecommendation[] = [
  {
    name: "Valentina Ruiz",
    company: "Nova Steel",
    quote: "Ordenaron nuestra infraestructura y logramos reducir incidentes críticos en menos de 60 días.",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Santiago Gómez",
    company: "Ruta Norte",
    quote: "La migración se ejecutó sin cortar operación y con una hoja de ruta técnica muy clara.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Camila Ortega",
    company: "Altiva Labs",
    quote: "Mejoramos conectividad entre sedes y hoy el equipo trabaja con mucha más estabilidad.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Martín Pérez",
    company: "Andes Retail",
    quote: "El enfoque en seguridad fue excelente, con procesos simples y resultados medibles.",
    avatarUrl: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Lucía Navarro",
    company: "Delta Med",
    quote: "Nos acompañaron en cada etapa del proyecto y el soporte fue ágil de principio a fin.",
    avatarUrl: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    name: "Facundo Silva",
    company: "Terra Energia",
    quote: "Pasamos de una red inestable a una plataforma robusta para crecer con confianza.",
    avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Julieta Acosta",
    company: "Blue Cargo",
    quote: "La consultoría fue práctica, sin vueltas, y alineada a nuestra realidad operativa.",
    avatarUrl: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    name: "Nicolás Funes",
    company: "Pixel Farm",
    quote: "El equipo tradujo necesidades complejas en soluciones concretas y fáciles de sostener.",
    avatarUrl: "https://randomuser.me/api/portraits/men/43.jpg",
  },
] as const;
const CLIENT_RECOMMENDATIONS_REVERSED = [...CLIENT_RECOMMENDATIONS].reverse();

// Configuración declarativa de filas para evitar markup duplicado.
const MARQUEE_ROWS: RecommendationMarqueeRowProps[] = [
  { recommendations: CLIENT_RECOMMENDATIONS },
  { recommendations: CLIENT_RECOMMENDATIONS_REVERSED, trackClassName: "client-recommendations-track-ltr" },
  { recommendations: CLIENT_RECOMMENDATIONS },
];

function ClientRecommendationCard({ avatarUrl, name, company, quote }: ClientRecommendationCardProps) {
  return (
    <article className="min-h-[154.25px] w-[85vw] max-w-[300px] rounded-xl border border-[var(--line)] bg-[var(--bg-muted)] p-4 sm:w-[300px]">
      <header className="mb-3 flex items-center gap-3">
        <img src={avatarUrl} alt={`Avatar de ${name}`} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--text)]">{name}</p>
          <p className="truncate text-xs text-[var(--text-muted)]">{company}</p>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-[var(--text-muted)]">{quote}</p>
    </article>
  );
}

function RecommendationMarqueeRow({ recommendations, trackClassName, className = "" }: RecommendationMarqueeRowProps) {
  return (
    <div className={`client-recommendations-mask w-full overflow-hidden py-4 ${className}`}>
      <div className={`client-recommendations-track gap-4 ${trackClassName ?? ""}`}>
        {MARQUEE_COPIES.map((copyIndex) => (
          <div key={copyIndex} className="client-recommendations-group gap-4 pr-4" aria-hidden={copyIndex === 1}>
            {recommendations.map((recommendation, recommendationIndex) => (
              <ClientRecommendationCard
                key={`${copyIndex}-${recommendation.company}-${recommendationIndex}`}
                avatarUrl={recommendation.avatarUrl}
                name={recommendation.name}
                company={recommendation.company}
                quote={recommendation.quote}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientRecommendationsSection() {
  return (
    <section className="relative mb-48 overflow-hidden bg-[var(--bg)] p-4">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8">
        {/* Encabezado de sección */}
        <SectionHeading
          align="start"
          title="Recomendaciones de clientes"
          subtitle="Referencias de clientes que respaldan la calidad nuestras soluciones."
        />

        {/* Marquee en varias filas con direcciones alternadas */}
        <div className="relative mx-auto flex w-full max-w-[280px] flex-col gap-2">
          {MARQUEE_ROWS.map((row, index) => (
            <RecommendationMarqueeRow
              key={`recommendation-row-${index}`}
              recommendations={row.recommendations}
              trackClassName={row.trackClassName}
              className={row.className}
            />
          ))}

          {/* Capa lineal inferior para integrar visualmente el final del bloque */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,var(--bg)_0%,transparent_100%)]"
          />
          {/* Halo circular difuso para suavizar el corte al final del contenido */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-140px] left-1/2 h-[300px] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,transparent_24%,var(--bg)_72%,var(--bg)_100%)] opacity-95 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default ClientRecommendationsSection;
