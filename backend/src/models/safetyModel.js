const pool = require("../config/database");
async function list() {
  const result = await pool.query(`SELECT id, study_id, participant_id, event_code, 'AE' AS event_type, severity, status, onset_date, narrative FROM adverse_events
    UNION ALL SELECT id, study_id, participant_id, sae_number AS event_code, 'SAE' AS event_type, severity, status, onset_date, narrative FROM serious_adverse_events ORDER BY onset_date DESC`);
  return result.rows;
}
async function create(data) {
  const table = data.event_type === "SAE" ? "serious_adverse_events" : "adverse_events";
  const codeColumn = data.event_type === "SAE" ? "sae_number" : "event_code";
  const query = `INSERT INTO ${table} (study_id, participant_id, ${codeColumn}, severity, status, onset_date, narrative)
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  return (await pool.query(query, [data.study_id, data.participant_id || null, data.event_code, data.severity, data.status || "Open", data.onset_date, data.narrative])).rows[0];
}
module.exports = { list, create };

