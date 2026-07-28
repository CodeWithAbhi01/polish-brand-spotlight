import React from "react";
import logoMark from "@/assets/logo-mark.png";

interface LogoProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function Logo({ className = "", onClick }: LogoProps) {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`flex items-center gap-2 sm:gap-2.5 ${className}`}
    >
      <img src={logoMark} alt="ApniSabha" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
      <div className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-obsidian leading-none">
        ApniSabha
      </div>
    </a>
  );
}
