export const ROLES = {
  ADMIN: "ADMIN",
  PRINCIPAL_INVESTIGATOR: "PRINCIPAL_INVESTIGATOR",
  STUDY_COORDINATOR: "STUDY_COORDINATOR",
  MONITOR: "MONITOR",
  ETHICS_COMMITTEE: "ETHICS_COMMITTEE",
  PHARMACOVIGILANCE: "PHARMACOVIGILANCE",
  LEADERSHIP: "LEADERSHIP",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Administrator",
  [ROLES.PRINCIPAL_INVESTIGATOR]: "Principal Investigator",
  [ROLES.STUDY_COORDINATOR]: "Research Coordinator",
  [ROLES.MONITOR]: "Clinical Monitor",
  [ROLES.ETHICS_COMMITTEE]: "Ethics Committee",
  [ROLES.PHARMACOVIGILANCE]: "Pharmacovigilance",
  [ROLES.LEADERSHIP]: "Leadership",
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: ["*"],
  [ROLES.PRINCIPAL_INVESTIGATOR]: ["studies:read", "studies:write", "safety:read", "reports:read"],
  [ROLES.STUDY_COORDINATOR]: ["studies:read", "participants:write", "regulatory:write"],
  [ROLES.MONITOR]: ["studies:read", "monitoring:write", "queries:write"],
  [ROLES.ETHICS_COMMITTEE]: ["regulatory:read", "regulatory:write", "documents:read"],
  [ROLES.PHARMACOVIGILANCE]: ["safety:read", "safety:write", "reports:read"],
  [ROLES.LEADERSHIP]: ["studies:read", "reports:read", "safety:read"],
};

export const STATUS_COLORS = {
  Recruiting: "success",
  Monitoring: "info",
  Setup: "neutral",
  "Due Soon": "warning",
  "On Track": "success",
  Pending: "warning",
  Closed: "neutral",
  Active: "success",
  Screened: "info",
  Enrolled: "success",
  "Screen Failed": "danger",
  Open: "warning",
  Resolved: "success",
};

