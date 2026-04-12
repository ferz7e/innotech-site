import type { ReactNode } from "react";

type SectionHeadingAlign = "start" | "center" | "end";

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: SectionHeadingAlign;
  className?: string;
};

const ALIGNMENT_CLASSNAME: Record<SectionHeadingAlign, string> = {
  start: "items-start text-left",
  center: "items-center text-center",
  end: "items-end text-right",
};

function SectionHeading({ title, subtitle, align = "start", className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex w-full flex-col gap-2 ${ALIGNMENT_CLASSNAME[align]} ${className}`}>
      <h2 className="text-balance text-2xl font-semibold leading-tight text-[var(--text)] md:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeading;
