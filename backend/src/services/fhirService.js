// TODO: Implement FHIR R4 mapping only after source-system contracts are approved.
// This service is deliberately an interoperability boundary, not a mock FHIR implementation.
async function exportStudyAsResearchStudy(study) {
  throw new Error("FHIR R4 export is not configured. Map approved Study data to ResearchStudy here.");
}

module.exports = { exportStudyAsResearchStudy };

