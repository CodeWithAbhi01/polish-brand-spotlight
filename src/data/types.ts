// ============================================================================
// ApniSabha — Core Type Definitions
// Governance Escalation & Transparency System
// ============================================================================

// ---------------------------------------------------------------------------
// Governance Hierarchy Types
// ---------------------------------------------------------------------------

export type GovernanceTier = "LOCAL" | "DISTRICT" | "STATE" | "NATIONAL";

export type GovernanceRoleCategory =
  | "POLITICAL"
  | "EXECUTIVE_CIVIL"
  | "LAW_ENFORCEMENT"
  | "SPECIALIZED_UTILITY";

export type JurisdictionType =
  | "WARD"
  | "ZONE"
  | "GRAM_PANCHAYAT"
  | "BLOCK"
  | "MUNICIPALITY"
  | "DISTRICT"
  | "ASSEMBLY_CONSTITUENCY"
  | "PARLIAMENTARY_CONSTITUENCY"
  | "STATE"
  | "NATIONAL";

export interface OfficialDesignation {
  id: string;
  title: string;
  shortCode: string;
  tier: GovernanceTier;
  category: GovernanceRoleCategory;
  /** 1 = highest (PM/President), 10 = frontline (JE/Patwari) */
  levelRank: number;
  isElected: boolean;
  jurisdictionType: JurisdictionType;
  reportsToDesignationId?: string;
}

export interface GovernanceOfficial {
  id: string;
  fullName: string;
  designationId: string;
  designation: string;
  tier: GovernanceTier;
  department?: string;
  jurisdictionName: string;
  partyCode?: string;
  contactEmail: string;
  helplinePhone?: string;
  officeAddress: string;
  /** Simulated response rate 0–100% */
  responseRate: number;
  /** Number of issues routed to this official */
  issuesRouted: number;
  /** Whether official is onboarded on the ApniSabha platform */
  isOnboarded: boolean;
  /** Two-letter initials for avatar */
  initials: string;
}

// ---------------------------------------------------------------------------
// Department & Specialized Bodies
// ---------------------------------------------------------------------------

export interface Department {
  id: string;
  name: string;
  code: string;
  tier: GovernanceTier;
  description: string;
  iconName: string;
  headDesignation: string;
}

export interface SpecializedBody {
  id: string;
  name: string;
  acronym: string;
  type:
    | "POLLUTION_BOARD"
    | "WATER_AUTHORITY"
    | "DISCOM"
    | "PWD"
    | "HIGHWAY_AUTHORITY"
    | "RAILWAYS_METRO"
    | "DEVELOPMENT_AUTHORITY"
    | "TRANSPORT_CORP";
  helpline: string;
  website: string;
}

// ---------------------------------------------------------------------------
// Civic Issue System
// ---------------------------------------------------------------------------

export interface EscalationChainStep {
  tierLevel: number;
  tierName: string;
  responsibleDesignation: string;
  responsibleDepartment: string;
  triggerHoursBreach: number;
}

export interface CivicIssueCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  /** Lucide icon name */
  iconName: string;
  defaultDepartment: string;
  defaultSlaHours: number;
  tags: string[];
  escalationChain: EscalationChainStep[];
  /** Hex color for category badge */
  color: string;
}

export type EscalationStatus =
  | "ASSIGNED"
  | "ACKNOWLEDGED"
  | "IN_PROGRESS"
  | "ACTION_TAKEN"
  | "SLA_BREACHED"
  | "ESCALATED"
  | "RESOLVED"
  | "PENDING";

export interface EscalationStep {
  id: string;
  tierLevel: number;
  tierName: string;
  officialName: string;
  officialDesignation: string;
  officialPartyCode?: string;
  timestamp: string;
  status: EscalationStatus;
  note?: string;
  slaHours: number;
  hoursElapsed: number;
}

export type IssueSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IssueStatus =
  | "FILED"
  | "UNDER_REVIEW"
  | "IN_PROGRESS"
  | "ESCALATED"
  | "RESOLVED"
  | "CLOSED";

export interface FiledIssue {
  id: string;
  petitionId: string;
  categoryCode: string;
  categoryName: string;
  title: string;
  description: string;
  location: string;
  ward: string;
  city: string;
  filedBy: string;
  filedByRole: string;
  filedDate: string;
  status: IssueStatus;
  severity: IssueSeverity;
  currentTier: number;
  currentTierName: string;
  endorsements: number;
  volunteersActive: number;
  escalationHistory: EscalationStep[];
  /** Overall SLA status */
  slaStatus: "ON_TRACK" | "BREACHED" | "CRITICAL";
  /** Photo placeholder URLs */
  photoCount: number;
}

// ---------------------------------------------------------------------------
// Political Parties
// ---------------------------------------------------------------------------

export interface PoliticalParty {
  id: string;
  code: string;
  name: string;
  isNationalParty: boolean;
  symbolDescription: string;
  primaryStates: string[];
  headquarters: string;
  /** Hex brand color */
  color: string;
  /** Lighter background tint for badges */
  bgColor: string;
}

// ---------------------------------------------------------------------------
// Community & Sabha
// ---------------------------------------------------------------------------

export interface SabhaDiscussion {
  id: string;
  title: string;
  description: string;
  category: string;
  sabhaName: string;
  author: string;
  authorRole: string;
  createdAt: string;
  timeAgo: string;
  participants: number;
  upvotes: number;
  comments: number;
  status: "LIVE DISCUSSION" | "PETITION FILED" | "MUNICIPAL RESPONSE" | "ACTION IN PROGRESS" | "ESCALATED";
  badgeColor: string;
  linkedIssueId?: string;
  linkedOfficials?: string[];
  ward: string;
  city: string;
}

export interface Volunteer {
  id: string;
  name: string;
  initials: string;
  ward: string;
  city: string;
  issuesResolved: number;
  sabhasJoined: number;
  role: string;
  isVerified: boolean;
  joinDate: string;
}

// ---------------------------------------------------------------------------
// User / Auth
// ---------------------------------------------------------------------------

export interface UserProfile {
  name: string;
  email: string;
  city: string;
  role: string;
  avatarUrl?: string;
}

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------

export interface PlatformStats {
  totalCitizens: number;
  totalSabhas: number;
  issuesFiled: number;
  issuesResolved: number;
  avgResolutionHours: number;
  officialResponseRate: number;
  activeVolunteers: number;
  citiesActive: number;
  transparencyScore: number;
}
