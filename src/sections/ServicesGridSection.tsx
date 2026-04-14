import type { RefObject } from "react";
import SectionHeading from "../components/shared/SectionHeading";
import { NAVIGATION_GROUPS } from "../layouts/components/navigationData";

type ServiceLayout = "column" | "row";
type ServiceImageMode = "fixed200" | "fill";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  items: string[];
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
  hideImage?: boolean;
  textFit?: boolean;
  layout?: ServiceLayout;
  imageMode?: ServiceImageMode;
};

type ServiceCardProps = ServiceItem & {
  className?: string;
};

type ServicesGridSectionProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
};

const getItemsByCategory = (category: string, extra: string[] = []) => {
  const categoryItems = NAVIGATION_GROUPS.find((group) => group.category === category)?.items ?? [];
  return Array.from(new Set([...categoryItems, ...extra]));
};

const toSlug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "infraestructura",
    title: "Infraestructura",
    description: "Diseñamos una base tecnológica robusta para asegurar continuidad, rendimiento y escalabilidad.",
    items: getItemsByCategory("Infraestructura"),
    imageSrc: "https://picsum.photos/id/1040/1200/900",
    imageAlt: "Infraestructura empresarial",
    textFit: true,
    layout: "row",
    imageMode: "fill",
  },
  {
    id: "comunicacion",
    title: "Comunicación",
    description: "Integramos canales de voz empresarial para que tus equipos y clientes se conecten con claridad.",
    items: getItemsByCategory("Comunicaciones"),
    imageSrc: "https://picsum.photos/id/1062/1200/900",
    imageAlt: "Comunicación empresarial",
    hideImage: true,
  },
  {
    id: "seguridad",
    title: "Seguridad",
    description: "Protegemos tus activos críticos con soluciones de monitoreo y control para operar con confianza.",
    items: getItemsByCategory("Seguridad", ["Videovigilancia IP"]),
    imageSrc: "https://picsum.photos/id/1018/1200/900",
    imageAlt: "Seguridad y monitoreo",
    imageFirst: true,
  },
  {
    id: "automatizaciones",
    title: "Automatizaciones",
    description: "Implementamos automatización inteligente para simplificar tareas repetitivas y optimizar tiempos.",
    items: getItemsByCategory("Automatizacion", ["Domotica"]),
    imageSrc: "https://picsum.photos/id/1070/1200/900",
    imageAlt: "Automatizaciones y domótica",
  },
  {
    id: "redes",
    title: "Redes",
    description: "Diseñamos y optimizamos redes empresariales para mantener conectividad estable y segura.",
    items: getItemsByCategory("Redes"),
    imageSrc: "https://picsum.photos/id/1039/1200/900",
    imageAlt: "Redes corporativas",
    textFit: true,
    imageMode: "fill",
  },
];

function ServiceCard({
  title,
  description,
  items,
  imageSrc,
  imageAlt,
  imageFirst = false,
  hideImage = false,
  textFit = false,
  layout = "column",
  imageMode = "fixed200",
  className = "",
}: ServiceCardProps) {
  const textBlock = (
    <div
      className={`flex min-h-0 flex-col gap-8 ${
        textFit || hideImage ? "h-fit flex-none items-start justify-start" : "flex-1 justify-between"
      }`}>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-[var(--text)] md:text-2xl">{title}</h3>
        <p className="max-w-md text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">{description}</p>
      </div>

      <ul className="flex flex-col gap-2 text-[11px] text-[var(--text-muted)] md:text-xs">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="text-[var(--accent-2)]">•</span>
            <a href={`/${toSlug(item)}`} className="transition-colors hover:text-[var(--text)]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageBlock = hideImage ? null : (
    <div
      className={`hidden overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg)] md:flex ${
        imageMode === "fill" ? "min-h-0 flex-1 self-stretch" : "h-[200px] min-h-[200px]"
      }`}>
      <img src={imageSrc} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  );

  return (
    <article
      className={`group h-fit w-full rounded-xl border border-[var(--line)] bg-[var(--bg-muted-accent)] p-4 transition-all duration-300 hover:border-[var(--accent-2)] ${className}`}>
      <div className={`flex h-full justify-between gap-8 ${layout === "row" ? "flex-col md:flex-row" : "flex-col"}`}>
        {imageFirst ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </article>
  );
}

function ServicesGridSection({ scrollContainerRef }: ServicesGridSectionProps) {
  const [infraestructura, comunicacion, seguridad, automatizaciones, redes] = SERVICES_DATA;

  return (
    <section
      ref={scrollContainerRef}
      className="relative flex h-full min-h-0 items-start justify-center overflow-y-auto py-6 md:min-h-screen md:items-center md:overflow-visible md:py-12">
      <div className="relative z-10 flex w-full max-w-[1240px] flex-col gap-8 p-4">
        <SectionHeading
          align="start"
          title="Nuestras soluciones"
          subtitle="Servicios diseñados para cubrir cada necesidad tecnológica de tu empresa."
        />

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:hidden">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        <div className="hidden w-full grid-cols-3 gap-8 lg:grid">
          <ServiceCard {...infraestructura} className="lg:col-span-2 lg:h-full" />

          <div className="row-span-2 flex min-h-0 flex-col gap-8">
            <ServiceCard {...comunicacion} />
            <ServiceCard {...redes} className="flex-1 lg:h-full" />
          </div>

          <ServiceCard {...automatizaciones} />
          <ServiceCard {...seguridad} />
        </div>
      </div>
    </section>
  );
}

export default ServicesGridSection;
