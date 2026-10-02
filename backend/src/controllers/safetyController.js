const safety = require("../models/safetyModel");
const { recordAudit } = require("../services/auditService");
const { assessSafetyEvent } = require("../services/safetyService");
async function getSafety(req, res, next) { try { res.json(await safety.list()); } catch (error) { next(error); } }
async function createSafetyEvent(req, res, next) { try { const event = await safety.create(req.body); const assessed = assessSafetyEvent({ ...event, event_type: req.body.event_type }); await recordAudit({ userId: req.user.id, action: "CREATE", entity: assessed.event_type || "safety_event", entityId: event.id, ipAddress: req.user.ip, newValue: assessed }); res.status(201).json(assessed); } catch (error) { next(error); } }
module.exports = { getSafety, createSafetyEvent };

