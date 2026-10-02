const regulatory = require("../models/regulatoryModel");
const { recordAudit } = require("../services/auditService");
const { deriveDeadlineStatus } = require("../services/regulatoryService");
async function getRegulatory(req, res, next) { try { res.json(await regulatory.list()); } catch (error) { next(error); } }
async function createRegulatoryDeadline(req, res, next) { try { const deadline = await regulatory.create({ ...req.body, status: req.body.status || deriveDeadlineStatus(req.body.due_date) }); await recordAudit({ userId: req.user.id, action: "CREATE", entity: "regulatory_deadline", entityId: deadline.id, ipAddress: req.user.ip, newValue: deadline }); res.status(201).json(deadline); } catch (error) { next(error); } }
module.exports = { getRegulatory, createRegulatoryDeadline };

