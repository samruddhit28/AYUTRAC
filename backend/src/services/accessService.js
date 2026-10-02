const PERMISSIONS = {
  ADMIN: ["*"],
  PRINCIPAL_INVESTIGATOR: ["studies:read", "studies:write", "safety:read", "reports:read"],
  STUDY_COORDINATOR: ["studies:read", "studies:write", "participants:read", "participants:write", "regulatory:read", "regulatory:write"],
  MONITOR: ["studies:read", "participants:read", "safety:read"],
  ETHICS_COMMITTEE: ["regulatory:read", "regulatory:write"],
  PHARMACOVIGILANCE: ["safety:read", "safety:write", "reports:read"],
  LEADERSHIP: ["studies:read", "safety:read", "reports:read"],
};

module.exports = { PERMISSIONS };

