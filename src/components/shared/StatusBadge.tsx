import React from "react";
import type { IssueStatus, IssueSeverity, EscalationStatus } from "@/data/types";

type BadgeVariant = IssueStatus | IssueSeverity | EscalationStatus | "ON_TRACK" | "BREACHED" | "CRITICAL" | string;

const variantStyles: Record<string, string> = {
  // Issue Status
  FILED: "bg-sky-100 text-sky-700 border-sky-200",
  UNDER_REVIEW: "bg-amber-100 text-amber-700 border-amber-200",
  IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
  ESCALATED: "bg-orange-100 text-orange-700 border-orange-200",
  RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  CLOSED: "bg-zinc-100 text-zinc-600 border-zinc-200",

  // Severity
  LOW: "bg-green-100 text-green-700 border-green-200",
  MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
  HIGH: "bg-orange-100 text-orange-700 border-orange-200",
  CRITICAL: "bg-red-100 text-red-700 border-red-200",

  // SLA Status
  ON_TRACK: "bg-emerald-100 text-emerald-700 border-emerald-200",
  BREACHED: "bg-amber-100 text-amber-700 border-amber-200",

  // Escalation Status
  ASSIGNED: "bg-sky-100 text-sky-700 border-sky-200",
  ACKNOWLEDGED: "bg-blue-100 text-blue-700 border-blue-200",
  ACTION_TAKEN: "bg-emerald-100 text-emerald-700 border-emerald-200",
  SLA_BREACHED: "bg-red-100 text-red-700 border-red-200",
  PENDING: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  pulse?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ variant, label, pulse = false, size = "sm", className = "" }: StatusBadgeProps) {
  const styles = variantStyles[variant] || "bg-zinc-100 text-zinc-600 border-zinc-200";
  const displayLabel = label || variant.replace(/_/g, " ");
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wide ${styles} ${sizeClass} ${className}`}>
      {pulse && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
      {displayLabel}
    </span>
  );
}
