import type { HTMLAttributes, ReactNode } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border border-[var(--line)] bg-[var(--bg-muted)] px-2 py-1 text-xs font-medium text-[var(--text-muted)] ${className}`}
      {...props}>
      {children}
    </span>
  );
}

export default Badge;
