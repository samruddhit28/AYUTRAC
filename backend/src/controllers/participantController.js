const participants = require("../models/participantModel");
const { recordAudit } = require("../services/auditService");
async function getParticipants(req, res, next) { try { res.json(await participants.list()); } catch (error) { next(error); } }
async function createParticipant(req, res, next) { try { const participant = await participants.create(req.body); await recordAudit({ userId: req.user.id, action: "CREATE", entity: "participant", entityId: participant.id, ipAddress: req.user.ip, newValue: participant }); res.status(201).json(participant); } catch (error) { next(error); } }
module.exports = { getParticipants, createParticipant };

