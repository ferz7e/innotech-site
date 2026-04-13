import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuX } from "react-icons/lu";
import IconButton from "../components/shared/IconButton";
import PrimaryButton from "../components/shared/PrimaryButton";
import SectionHeading from "../components/shared/SectionHeading";

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  className: string;
};

const PHOTO_ITEMS: PortfolioProject[] = [
  {
    id: "infraestructura-core",
    title: "Infraestructura Core",
    description:
      "Diseño e implementación de infraestructura crítica para garantizar disponibilidad continua, rendimiento estable y capacidad de crecimiento por etapas.",
    src: "https://picsum.photos/id/1005/1200/900",
    alt: "Equipo técnico planificando un proyecto de infraestructura.",
    className: "lg:col-start-1 lg:col-end-8 lg:row-start-3 lg:row-end-7",
  },
  {
    id: "data-center-moderno",
    title: "Data Center Moderno",
    description:
      "Modernización integral de equipamiento y operaciones en sala técnica para optimizar eficiencia energética, resiliencia y monitoreo proactivo.",
    src: "https://picsum.photos/id/1011/1200/900",
    alt: "Centro de datos con equipamiento de red empresarial.",
    className: "lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-5",
  },
  {
    id: "operacion-inteligente",
    title: "Operación Inteligente",
    description:
      "Integración de paneles de visibilidad y control en tiempo real para acelerar diagnóstico, reducir incidentes y mejorar tiempos de respuesta.",
    src: "https://picsum.photos/id/1048/1200/900",
    alt: "Panel de monitoreo y operación en sitio.",
    className: "lg:col-start-8 lg:col-end-13 lg:row-start-5 lg:row-end-7",
  },
  {
    id: "comunicaciones-empresariales",
    title: "Comunicaciones Empresariales",
    description:
      "Proyecto de conectividad y telefonía corporativa con foco en calidad de servicio, cobertura integral y escalabilidad para nuevas sedes.",
    src: "https://picsum.photos/id/1033/1200/900",
    alt: "Instalación de hardware de comunicaciones.",
    className: "lg:col-start-1 lg:col-end-5 lg:row-start-7 lg:row-end-10",
  },
  {
    id: "cableado-estructurado",
    title: "Cableado Estructurado",
    description:
      "Estandarización de red física y organización de rack para mejorar mantenimiento, seguridad operativa y continuidad de servicio.",
    src: "https://picsum.photos/id/1060/800/1200",
    alt: "Detalle de cableado estructurado en rack.",
    className: "lg:col-start-5 lg:col-end-7 lg:row-start-7 lg:row-end-10",
  },
  {
    id: "seguridad-y-control",
    title: "Seguridad y Control",
    description:
      "Despliegue de soluciones de seguridad tecnológica con monitoreo centralizado para proteger activos, personas e información sensible.",
    src: "https://picsum.photos/id/1050/1200/900",
    alt: "Implementación de seguridad y videovigilancia.",
    className: "lg:col-start-7 lg:col-end-13 lg:row-start-7 lg:row-end-10",
  },
];

type PhotoTileProps = {
  project: PortfolioProject;
  onOpen: (project: PortfolioProject) => void;
};

type PortfolioItemButtonProps = {
  onClick: () => void;
  children: string;
};

function PortfolioItemButton({ onClick, children }: PortfolioItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/portfolio-btn inline-flex w-fit cursor-pointer items-center rounded-[4px] border border-[var(--line)] bg-[var(--bg-muted)] px-4 py-2 text-sm transition hover:brightness-104 hover:border-[var(--accent-2)]">
      <span className="text-[var(--accent-2)]">{children}</span>
      <span className="ml-0 inline-flex w-0 min-w-0 items-center overflow-hidden text-[var(--accent-2)] opacity-0 transition-all duration-200 group-hover/portfolio-btn:ml-2 group-hover/portfolio-btn:w-4 group-hover/portfolio-btn:opacity-100">
        <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  );
}

function PhotoTile({ project, onOpen }: PhotoTileProps) {
  return (
    <article
      className={`group relative h-72 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg)] md:h-96 lg:h-full ${project.className}`}>
      <img
        src={project.src}
        alt={project.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 flex items-end bg-black/70 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
        <div className="pointer-events-auto flex w-full flex-col gap-3 p-4">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <PortfolioItemButton onClick={() => onOpen(project)}>
            Ver más
          </PortfolioItemButton>
        </div>
      </div>
    </article>
  );
}

function PortfolioGallerySection() {
  const MODAL_FADE_DURATION_MS = 280;
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenProject = (project: PortfolioProject) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setSelectedProject(project);
    setIsModalVisible(false);

    // Espera un frame para permitir la transición de entrada.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const handleCloseProject = () => {
    setIsModalVisible(false);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setSelectedProject(null);
      closeTimeoutRef.current = null;
    }, MODAL_FADE_DURATION_MS);
  };

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="flex items-center justify-center bg-[var(--bg-muted)] px-4 pb-24">
        <div className="w-full max-w-[1240px] rounded-xl p-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[96px]">
            <article className="min-h-72 p-4 md:min-h-96 lg:col-start-1 lg:col-end-8 lg:row-start-1 lg:row-end-3 lg:min-h-0">
              <SectionHeading
                align="start"
                title="Proyectos que hablan por nosotros"
                subtitle="Una selección visual de implementaciones en infraestructura, redes y seguridad para distintos entornos empresariales."
              />
            </article>

            {PHOTO_ITEMS.map((project) => (
              <PhotoTile key={project.id} project={project} onOpen={handleOpenProject} />
            ))}
          </div>
        </div>
      </section>

      {selectedProject ? (
        <div
          className={`fixed inset-0 z-[80] flex items-stretch justify-center bg-black/75 p-4 backdrop-blur-sm transition-opacity duration-300 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseProject}>
          <div
            className={`flex h-full w-full max-w-[1240px] flex-col overflow-y-auto rounded-xl border border-[var(--line)] bg-[var(--bg)] p-8 transition-all duration-300 ${
              isModalVisible ? "scale-100 opacity-100" : "scale-[0.985] opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <h3 className="text-xl font-semibold text-[var(--text)] md:text-2xl">{selectedProject.title}</h3>
              <IconButton
                icon={<LuX className="h-5 w-5" aria-hidden="true" />}
                label="Cerrar detalle de proyecto"
                onClick={handleCloseProject}
                className="h-10 w-10 p-0"
              />
            </div>

            <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-2">
              <div className="min-h-[260px] overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg-muted)] lg:min-h-0">
                <img src={selectedProject.src} alt={selectedProject.alt} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <p className="text-base leading-relaxed text-[var(--text-muted)]">{selectedProject.description}</p>

                <div className="mt-auto flex justify-center">
                  <PrimaryButton href="/contact" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
                    Solicita tu presupuesto
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PortfolioGallerySection;
