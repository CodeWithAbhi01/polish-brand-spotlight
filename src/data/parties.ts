// ============================================================================
// ApniSabha — Political Parties Catalog (National + Regional)
// ============================================================================

import type { PoliticalParty } from "./types";

export const politicalParties: PoliticalParty[] = [
  // ── National Parties ──────────────────────────────────────────────────
  { id: "party_bjp", code: "BJP", name: "Bharatiya Janata Party", isNationalParty: true, symbolDescription: "Lotus", primaryStates: ["PAN-India"], headquarters: "New Delhi", color: "#FF6B00", bgColor: "#FFF3E8" },
  { id: "party_inc", code: "INC", name: "Indian National Congress", isNationalParty: true, symbolDescription: "Open Hand", primaryStates: ["PAN-India"], headquarters: "New Delhi", color: "#00A4EF", bgColor: "#E8F6FF" },
  { id: "party_aap", code: "AAP", name: "Aam Aadmi Party", isNationalParty: true, symbolDescription: "Broom", primaryStates: ["Delhi", "Punjab", "Gujarat"], headquarters: "New Delhi", color: "#0074D9", bgColor: "#E8F0FF" },
  { id: "party_bsp", code: "BSP", name: "Bahujan Samaj Party", isNationalParty: true, symbolDescription: "Elephant", primaryStates: ["Uttar Pradesh", "Madhya Pradesh"], headquarters: "New Delhi", color: "#0047AB", bgColor: "#E8EEFF" },
  { id: "party_cpim", code: "CPI(M)", name: "Communist Party of India (Marxist)", isNationalParty: true, symbolDescription: "Hammer, Sickle & Star", primaryStates: ["Kerala", "West Bengal", "Tripura"], headquarters: "New Delhi", color: "#CC0000", bgColor: "#FFE8E8" },
  { id: "party_npp", code: "NPP", name: "National People's Party", isNationalParty: true, symbolDescription: "Book", primaryStates: ["Meghalaya", "North-East"], headquarters: "Meghalaya", color: "#1A5276", bgColor: "#E8F0F5" },

  // ── Regional / State Parties ──────────────────────────────────────────
  { id: "party_tmc", code: "TMC", name: "All India Trinamool Congress", isNationalParty: false, symbolDescription: "Twin Flowers & Grass", primaryStates: ["West Bengal"], headquarters: "Kolkata", color: "#1E8449", bgColor: "#E8F6EF" },
  { id: "party_dmk", code: "DMK", name: "Dravida Munnetra Kazhagam", isNationalParty: false, symbolDescription: "Rising Sun", primaryStates: ["Tamil Nadu"], headquarters: "Chennai", color: "#E74C3C", bgColor: "#FDE8E8" },
  { id: "party_aiadmk", code: "AIADMK", name: "All India Anna Dravida Munnetra Kazhagam", isNationalParty: false, symbolDescription: "Two Leaves", primaryStates: ["Tamil Nadu"], headquarters: "Chennai", color: "#196F3D", bgColor: "#E8F5EE" },
  { id: "party_sp", code: "SP", name: "Samajwadi Party", isNationalParty: false, symbolDescription: "Bicycle", primaryStates: ["Uttar Pradesh"], headquarters: "Lucknow", color: "#E74C3C", bgColor: "#FDE8E8" },
  { id: "party_jdu", code: "JD(U)", name: "Janata Dal (United)", isNationalParty: false, symbolDescription: "Arrow", primaryStates: ["Bihar"], headquarters: "Patna", color: "#2E86C1", bgColor: "#E8F2FF" },
  { id: "party_rjd", code: "RJD", name: "Rashtriya Janata Dal", isNationalParty: false, symbolDescription: "Hurricane Lamp", primaryStates: ["Bihar"], headquarters: "Patna", color: "#27AE60", bgColor: "#E8F8EF" },
  { id: "party_ncp", code: "NCP", name: "Nationalist Congress Party", isNationalParty: false, symbolDescription: "Clock", primaryStates: ["Maharashtra"], headquarters: "New Delhi", color: "#2980B9", bgColor: "#E8F0FF" },
  { id: "party_shiv_sena", code: "SHS", name: "Shiv Sena", isNationalParty: false, symbolDescription: "Bow & Arrow", primaryStates: ["Maharashtra"], headquarters: "Mumbai", color: "#FF6600", bgColor: "#FFF2E8" },
  { id: "party_tdp", code: "TDP", name: "Telugu Desam Party", isNationalParty: false, symbolDescription: "Bicycle", primaryStates: ["Andhra Pradesh"], headquarters: "Amaravati", color: "#FFD700", bgColor: "#FFFDE8" },
  { id: "party_brs", code: "BRS", name: "Bharat Rashtra Samithi", isNationalParty: false, symbolDescription: "Car", primaryStates: ["Telangana"], headquarters: "Hyderabad", color: "#E91E8C", bgColor: "#FDE8F5" },
  { id: "party_ysrcp", code: "YSRCP", name: "YSR Congress Party", isNationalParty: false, symbolDescription: "Ceiling Fan", primaryStates: ["Andhra Pradesh"], headquarters: "Tadepalli", color: "#1E88E5", bgColor: "#E8F2FF" },
  { id: "party_bjd", code: "BJD", name: "Biju Janata Dal", isNationalParty: false, symbolDescription: "Conch Shell", primaryStates: ["Odisha"], headquarters: "Bhubaneswar", color: "#1A5276", bgColor: "#E8F0F5" },
  { id: "party_jmm", code: "JMM", name: "Jharkhand Mukti Morcha", isNationalParty: false, symbolDescription: "Bow & Arrow", primaryStates: ["Jharkhand"], headquarters: "Ranchi", color: "#2ECC71", bgColor: "#E8FAF0" },
  { id: "party_sad", code: "SAD", name: "Shiromani Akali Dal", isNationalParty: false, symbolDescription: "Scales", primaryStates: ["Punjab"], headquarters: "Chandigarh", color: "#0D47A1", bgColor: "#E8EEFF" },
  { id: "party_aimim", code: "AIMIM", name: "All India Majlis-e-Ittehadul Muslimeen", isNationalParty: false, symbolDescription: "Kite", primaryStates: ["Telangana", "Maharashtra"], headquarters: "Hyderabad", color: "#1B5E20", bgColor: "#E8F5EC" },
  { id: "party_jds", code: "JD(S)", name: "Janata Dal (Secular)", isNationalParty: false, symbolDescription: "Lady Farmer", primaryStates: ["Karnataka"], headquarters: "Bengaluru", color: "#00695C", bgColor: "#E8F5F2" },
];

// Helper: Get party by code
export const getPartyByCode = (code: string): PoliticalParty | undefined =>
  politicalParties.find((p) => p.code === code);

// Helper: Get national parties only
export const getNationalParties = () =>
  politicalParties.filter((p) => p.isNationalParty);

// Helper: Get regional parties only
export const getRegionalParties = () =>
  politicalParties.filter((p) => !p.isNationalParty);
