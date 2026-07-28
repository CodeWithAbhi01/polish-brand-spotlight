import React from "react";
import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  badgeColor = "bg-ember/10 text-ember",
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider ${badgeColor}`}>
          {badge}
        </span>
      )}
      <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-bold leading-[1.15] tracking-tight text-obsidian">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] leading-relaxed text-steel max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
