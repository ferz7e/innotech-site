import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type PrimaryButtonProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  icon?: ReactNode;
};

const isExternalHref = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");

function SecondaryButton({ children, icon, href, ...props }: PrimaryButtonProps) {
  const buttonContent = (
    <>
      <span className="text-[var(--accent-2)]">{children}</span>

      {icon && (
        <span className="ml-0 text-[var(--accent-2)] max-w-0 overflow-hidden opacity-0 transition-all group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
          {icon}
        </span>
      )}
    </>
  );

  if (isExternalHref(href) || href.startsWith("#")) {
    return (
      <a
        href={href}
        className="group inline-flex items-center rounded-[4px] border border-[var(--line)] bg-[var(--bg-muted)] px-4 py-2 text-sm transition hover:brightness-104 hover:border-[var(--accent-2)]"
        {...props}>
        {buttonContent}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="group inline-flex items-center rounded-[4px] border border-[var(--line)] bg-[var(--bg-muted)] px-4 py-2 text-sm transition hover:brightness-104 hover:border-[var(--accent-2)]"
      {...props}>
      {buttonContent}
    </Link>
  );
}

export default SecondaryButton;
