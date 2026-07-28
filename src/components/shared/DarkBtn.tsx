import React from "react";

interface DarkBtnProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function DarkBtn({ onClick, href, children, className = "" }: DarkBtnProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-[12px] sm:rounded-[14px] bg-obsidian px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-medium text-snow transition-transform hover:-translate-y-[1px] cursor-pointer ${className}`;
  const shadow = "inset 0 0.5px 0 0 rgba(255,255,255,0.5), 0 0 0 1.5px #2c2e34, 0 4px 6px 0 rgba(0,0,0,0.14)";

  if (onClick) {
    return (
      <button onClick={onClick} type="button" className={baseClass} style={{ boxShadow: shadow }}>
        {children}
      </button>
    );
  }
  return (
    <a href={href || "#"} className={baseClass} style={{ boxShadow: shadow }}>
      {children}
    </a>
  );
}
