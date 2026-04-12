import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  label: string;
};

function IconButton({ icon, label, className = "", type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-[4px] border border-[var(--line)] bg-[var(--bg-muted)] p-2 text-[var(--accent-1)] transition hover:brightness-104 hover:border-[var(--accent-1)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}>
      {icon}
    </button>
  );
}

export default IconButton;
