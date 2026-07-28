import React from "react";

interface GhostBtnProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function GhostBtn({ onClick, href, children, className = "" }: GhostBtnProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-[12px] sm:rounded-[14px] border border-cloud bg-snow px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-medium text-graphite transition-colors hover:border-iron cursor-pointer ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} type="button" className={baseClass}>
        {children}
      </button>
    );
  }
  return (
    <a href={href || "#"} className={baseClass}>
      {children}
    </a>
  );
}
