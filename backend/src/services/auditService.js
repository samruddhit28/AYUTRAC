const pool = require("../config/database");

async function recordAudit({ userId, action, entity, entityId, ipAddress, previousValue = null, newValue = null }) {
  const query = `INSERT INTO audit_logs (user_id, action, entity, entity_id, ip_address, previous_value, new_value)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  await pool.query(query, [userId, action, entity, entityId, ipAddress, previousValue, newValue]);
}

module.exports = { recordAudit };

