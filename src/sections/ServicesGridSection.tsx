import SectionHeading from "../components/shared/SectionHeading";
import { NAVIGATION_GROUPS } from "../layouts/components/navigationData";

/**
 * CONFIGURACIÓN DE DATOS
 * Extraemos y normalizamos los items de navegación.
 */
const getItemsByCategory = (category: string, extra: string[] = []) => {
  const items = NAVIGATION_GROUPS.find((g) => g.category === category)?.items ?? [];
  return Array.from(new Set([...items, ...extra]));
};

const SERVICES_DATA = [
  {
    title: "Infraestructura",
    description: "Diseñamos una base tecnológica robusta para asegurar continuidad, rendimiento y escalabilidad.",
    items: getItemsByCategory("Infraestructura"),
    imageSrc: "https://picsum.photos/id/1040/1200/900",
    imageAlt: "Infraestructura",
    isWide: true, // Para el diseño de 2 columnas
    imageFirst: false,
  },
  {
    title: "Comunicación",
    description: "Integramos canales de voz empresarial para que tus equipos y clientes se conecten con claridad.",
    items: getItemsByCategory("Comunicaciones"),
    imageSrc: "https://picsum.photos/id/1062/1200/900",
    imageAlt: "Comunicación",
    imageFirst: true,
  },
  {
    title: "Automatizaciones",
    description: "Implementamos automatización inteligente para simplificar tareas repetitivas y optimizar tiempos.",
    items: getItemsByCategory("Automatizacion", ["Domotica"]),
    imageSrc: "https://picsum.photos/id/1070/1200/900",
    imageAlt: "Automatizaciones",
    imageFirst: false,
  },
  {
    title: "Seguridad",
    description: "Protegemos tus activos críticos con soluciones de monitoreo y control para operar con confianza.",
    items: getItemsByCategory("Seguridad", ["Videovigilancia IP"]),
    imageSrc: "https://picsum.photos/id/1018/1200/900",
    imageAlt: "Seguridad",
    imageFirst: true,
  },
  {
    title: "Redes",
    description: "Diseñamos y optimizamos redes empresariales para mantener conectividad estable y segura.",
    items: getItemsByCategory("Redes"),
    imageSrc: "https://picsum.photos/id/1039/1200/900",
    imageAlt: "Redes",
    imageFirst: false,
  },
];

/**
 * COMPONENTE: ServiceCard
 * Un componente único y flexible para renderizar cada tarjeta de servicio.
 */
interface ServiceCardProps {
  title: string;
  description: string;
  items: string[];
  imageSrc: string;
  imageAlt: string;
  isWide?: boolean;
  imageFirst?: boolean;
}

const ServiceCard = ({ title, description, items, imageSrc, imageAlt, isWide, imageFirst }: ServiceCardProps) => {
  const isVerticalLayout = !isWide;

  // Contenedor de Información (Texto + Lista)
  const TextContent = (
    <div className={`flex min-h-0 flex-col justify-between gap-4 ${isVerticalLayout ? "md:basis-2/3" : "flex-1"}`}>
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
              className="hover:text-[var(--text)] transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // Contenedor de Imagen
  const ImageContent = (
    <div
      className={`hidden min-h-0 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg)] md:flex ${
        isVerticalLayout ? "md:basis-1/3" : "flex-1"
      }`}>
      <img src={imageSrc} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  );

  return (
    <div
      className={`
      group h-fit w-full rounded-xl border border-[var(--line)] bg-[var(--bg-muted-accent)] p-4 md:h-[360px]
      transition-all duration-300 hover:border-[var(--accent-2)]
      ${isWide ? "col-span-1 lg:col-span-2" : "col-span-1"}
    `}>
      <div
        className={`
        flex h-full justify-between gap-4 
        ${isWide ? "flex-col lg:flex-row" : "flex-col"}
      `}>
        {/* Renderizado condicional basado en el orden deseado o si es ancho */}
        {imageFirst && !isWide ? (
          <>
            {ImageContent}
            {TextContent}
          </>
        ) : (
          <>
            {TextContent}
            {ImageContent}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * SECCIÓN PRINCIPAL: ServicesGridSection
 */
function ServicesGridSection() {
  return (
    <section className="relative flex h-full min-h-0 items-start justify-center overflow-y-auto py-6 md:min-h-screen md:items-center md:overflow-visible md:py-12">
      <div className="relative z-10 flex w-full max-w-[1240px] flex-col gap-8 p-4">
        <SectionHeading
          align="start"
          title="Nuestras soluciones"
          subtitle="Servicios diseñados para cubrir cada necesidad tecnológica de tu empresa."
        />

        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGridSection;
