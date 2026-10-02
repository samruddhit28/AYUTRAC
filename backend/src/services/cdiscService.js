// TODO: Implement validated CDISC SDTM/ADaM export mappings after controlled terminology is agreed.
// This service is reserved for governed exports, not placeholder clinical data.
async function createCdiscExport(studyId) {
  throw new Error(`CDISC export is not configured for study ${studyId}`);
}

module.exports = { createCdiscExport };

