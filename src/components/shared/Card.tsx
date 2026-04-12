import type { ReactNode } from "react";
import { LuArrowRight, LuServer } from "react-icons/lu";
import SecondaryButton from "./SecondaryButton";

type CardProps = {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: ReactNode;
  className?: string;
};

function Card({
  icon,
  title,
  subtitle,
  ctaLabel = "Ver detalle",
  ctaHref = "/contact",
  ctaIcon,
  className = "",
}: CardProps) {
  return (
    <article
      className={`h-[280px] max-h-[280px] overflow-hidden rounded-xl border border-[var(--line)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent-1)] ${className}`}>
      <div className="flex h-1/3 items-center justify-center bg-[var(--bg)]">
        {icon ?? <LuServer className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />}
      </div>

      <div className="flex h-2/3 flex-col justify-between bg-[var(--bg-muted)] p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight text-[var(--text)]">{title}</h3>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">{subtitle}</p>
        </div>

        <div>
          <SecondaryButton href={ctaHref} icon={ctaIcon ?? <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
            {ctaLabel}
          </SecondaryButton>
        </div>
      </div>
    </article>
  );
}

export default Card;
