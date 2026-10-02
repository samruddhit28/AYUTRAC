const pool = require("../config/database");
async function list() { return (await pool.query("SELECT p.*, s.protocol_number, si.name AS site_name FROM participants p JOIN studies s ON s.id=p.study_id JOIN sites si ON si.id=p.site_id ORDER BY p.created_at DESC")).rows; }
async function create(data) {
  const query = `INSERT INTO participants (pseudonym, study_id, site_id, screening_status, enrollment_date, current_visit, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  return (await pool.query(query, [data.pseudonym, data.study_id, data.site_id, data.screening_status, data.enrollment_date || null, data.current_visit, data.status || "Active"])).rows[0];
}
module.exports = { list, create };

