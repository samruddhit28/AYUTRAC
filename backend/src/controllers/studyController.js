const studies = require("../models/studyModel");
const { recordAudit } = require("../services/auditService");

async function getStudies(req, res, next) { try { res.json(await studies.list()); } catch (error) { next(error); } }
async function getStudy(req, res, next) { try { const study = await studies.findById(req.params.id); if (!study) return res.status(404).json({ message: "Study not found" }); res.json(study); } catch (error) { next(error); } }
async function createStudy(req, res, next) {
  try { const study = await studies.create(req.body); await recordAudit({ userId: req.user.id, action: "CREATE", entity: "study", entityId: study.id, ipAddress: req.user.ip, newValue: study }); res.status(201).json(study); } catch (error) { next(error); }
}
async function updateStudy(req, res, next) {
  try { const previous = await studies.findById(req.params.id); if (!previous) return res.status(404).json({ message: "Study not found" }); const study = await studies.update(req.params.id, req.body); await recordAudit({ userId: req.user.id, action: "UPDATE", entity: "study", entityId: study.id, ipAddress: req.user.ip, previousValue: previous, newValue: study }); res.json(study); } catch (error) { next(error); }
}
async function deleteStudy(req, res, next) {
  try { const study = await studies.remove(req.params.id); if (!study) return res.status(404).json({ message: "Study not found" }); await recordAudit({ userId: req.user.id, action: "DELETE", entity: "study", entityId: study.id, ipAddress: req.user.ip, previousValue: study }); res.status(204).send(); } catch (error) { next(error); }
}
module.exports = { getStudies, getStudy, createStudy, updateStudy, deleteStudy };

