import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PrimaryButtonProps = ComponentPropsWithoutRef<"a"> & {
  icon?: ReactNode;
};

function PrimaryButton({ children, icon, ...props }: PrimaryButtonProps) {
  return (
    <a
      className="group inline-flex items-center rounded-[4px] border border-[var(--accent-1)] bg-[var(--accent-1)] px-4 py-2 text-sm transition hover:brightness-116"
      {...props}>
      <span className="text-[var(--dark-text)]">{children}</span>

      {icon && (
        <span className="ml-0 text-[var(--dark-text)] max-w-0 overflow-hidden opacity-0 transition-all group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
          {icon}
        </span>
      )}
    </a>
  );
}

export default PrimaryButton;
