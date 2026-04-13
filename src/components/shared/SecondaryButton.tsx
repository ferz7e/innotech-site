import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PrimaryButtonProps = ComponentPropsWithoutRef<"a"> & {
  icon?: ReactNode;
};

function SecondaryButton({ children, icon, ...props }: PrimaryButtonProps) {
  return (
    <a
      className="group inline-flex items-center rounded-[4px] border border-[var(--line)] bg-[var(--bg-muted)] px-4 py-2 text-sm transition hover:brightness-104 hover:border-[var(--accent-2)]"
      {...props}>
      <span className="text-[var(--accent-2)]">{children}</span>

      {icon && (
        <span className="ml-0 text-[var(--accent-2)] max-w-0 overflow-hidden opacity-0 transition-all group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
          {icon}
        </span>
      )}
    </a>
  );
}

export default SecondaryButton;
