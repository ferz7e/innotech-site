import type { ReactNode } from "react";
import {
  LuArrowRight,
  LuCloud,
  LuInstagram,
  LuLockKeyhole,
  LuNetwork,
  LuShieldCheck,
  LuWorkflow,
} from "react-icons/lu";
import Card from "../components/shared/Card";
import SectionHeading from "../components/shared/SectionHeading";
import PrimaryButton from "../components/shared/PrimaryButton";
import SecondaryButton from "../components/shared/SecondaryButton";

type UseCaseItem = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

// Datos de casos de uso: la sección renderiza estas tarjetas en orden.
const USE_CASES: UseCaseItem[] = [
  {
    icon: <LuNetwork className="h-8 w-8 text-[var(--text)]" aria-hidden="true" />,
    title: "Conectividad corporativa",
    subtitle: "Unificamos sedes, equipos y usuarios con redes estables, seguras y listas para escalar.",
  },
  {
    icon: <LuShieldCheck className="h-8 w-8 text-[var(--text)]" aria-hidden="true" />,
    title: "Seguridad perimetral",
    subtitle: "Protegemos activos críticos con monitoreo activo, hardening y políticas de acceso claras.",
  },
  {
    icon: <LuWorkflow className="h-8 w-8 text-[var(--text)]" aria-hidden="true" />,
    title: "Automatización operativa",
    subtitle: "Reducimos tareas manuales con flujos automáticos para acelerar procesos internos.",
  },
  {
    icon: <LuCloud className="h-8 w-8 text-[var(--text)]" aria-hidden="true" />,
    title: "Infraestructura híbrida",
    subtitle: "Combinamos nube y on-premise para balancear rendimiento, costos y continuidad.",
  },
  {
    icon: <LuLockKeyhole className="h-8 w-8 text-[var(--text)]" aria-hidden="true" />,
    title: "Gestión de identidades",
    subtitle: "Centralizamos autenticación y permisos para minimizar riesgos y mejorar auditoría.",
  },
  {
    icon: <LuArrowRight className="h-8 w-8 text-[var(--text)]" aria-hidden="true" />,
    title: "Evolución tecnológica",
    subtitle: "Diseñamos hojas de ruta IT por etapas para crecer sin interrumpir la operación diaria.",
  },
] as const;

function UseCasesSection() {
  return (
    <section className="flex items-center justify-center bg-[var(--bg-muted)]">
      <div className="flex w-full max-w-[1240px] flex-col gap-8 p-4">
        {/* Encabezado principal de la sección */}
        <SectionHeading
          align="center"
          title="Casos de uso"
          subtitle="Escenarios reales donde nuestras soluciones aportan eficiencia, seguridad y continuidad operativa."
        />

        {/* CTAs de apoyo: red social + navegación a más casos */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            icon={<LuInstagram className="h-3.5 w-3.5" aria-hidden="true" />}>
            Seguinos en Instagram
          </PrimaryButton>
          <SecondaryButton href="/contact" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
            Ver mas casos de uso
          </SecondaryButton>
        </div>

        {/* Grid responsive: mantiene 3 columnas en desktop y se adapta en mobile/tablet. */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase) => (
            <Card key={useCase.title} icon={useCase.icon} title={useCase.title} subtitle={useCase.subtitle} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
