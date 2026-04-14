import type { RefObject } from "react";
import SectionHeading from "../components/shared/SectionHeading";
import { NAVIGATION_GROUPS } from "../layouts/components/navigationData";

type ServiceItem = {
  title: string;
  description: string;
  items: string[];
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
  hideImage?: boolean;
  textFit?: boolean;
  layout?: "column" | "row";
  imageMode?: "fixed200" | "fill";
  desktopClass: string;
};

const getItemsByCategory = (category: string, extra: string[] = []) => {
  const items = NAVIGATION_GROUPS.find((group) => group.category === category)?.items ?? [];
  return Array.from(new Set([...items, ...extra]));
};

// Layout desktop inspirado en el wireframe del usuario:
// 1) bloque grande arriba-izquierda
// 2) bloque pequeño arriba-derecha
// 3) bloque alto a la derecha
// 4) bloque abajo-izquierda
// 5) bloque abajo-centro
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
    desktopClass: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    id: "comunicacion",
    title: "Comunicación",
    description: "Integramos canales de voz empresarial para que tus equipos y clientes se conecten con claridad.",
    items: getItemsByCategory("Comunicaciones"),
    imageSrc: "https://picsum.photos/id/1062/1200/900",
    imageAlt: "Comunicación empresarial",
    hideImage: true,
    desktopClass: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    id: "seguridad",
    title: "Seguridad",
    description: "Protegemos tus activos críticos con soluciones de monitoreo y control para operar con confianza.",
    items: getItemsByCategory("Seguridad", ["Videovigilancia IP"]),
    imageSrc: "https://picsum.photos/id/1018/1200/900",
    imageAlt: "Seguridad y monitoreo",
    imageFirst: true,
    desktopClass: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-5",
  },
  {
    title: "Automatizaciones",
    description: "Implementamos automatización inteligente para simplificar tareas repetitivas y optimizar tiempos.",
    items: getItemsByCategory("Automatizacion", ["Domotica"]),
    imageSrc: "https://picsum.photos/id/1070/1200/900",
    imageAlt: "Automatizaciones y domótica",
    desktopClass: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-5",
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
    desktopClass: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-5 lg:h-full",
  },
];

type ServiceCardProps = ServiceItem & {
  className?: string;
};

function ServiceCard({
  title,
  description,
  items,
  imageSrc,
  imageAlt,
  imageFirst,
  hideImage,
  textFit,
  layout = "column",
  imageMode = "fixed200",
  className = "",
}: ServiceCardProps) {
  const isRowLayout = layout === "row";

  const textContent = (
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
            <a
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="transition-colors hover:text-[var(--text)]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageContent = hideImage ? null : (
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
      <div className={`flex h-full justify-between gap-8 ${isRowLayout ? "flex-col md:flex-row" : "flex-col"}`}>
        {imageFirst ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </article>
  );
}

function ServicesGridSection() {
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
            <ServiceCard key={service.title} {...service} />
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
