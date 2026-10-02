const pool = require("../config/database");

async function list() {
  const result = await pool.query("SELECT * FROM studies ORDER BY created_at DESC");
  return result.rows;
}
async function findById(id) {
  const result = await pool.query("SELECT * FROM studies WHERE id = $1 OR protocol_number = $1", [id]);
  return result.rows[0];
}
async function create(data) {
  const query = `INSERT INTO studies (protocol_number, title, phase, status, target_enrollment, enrolled_count, principal_investigator, protocol_version, start_date)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
  const values = [data.protocol_number, data.title, data.phase, data.status || "Setup", data.target_enrollment, data.enrolled_count || 0, data.principal_investigator, data.protocol_version, data.start_date || null];
  return (await pool.query(query, values)).rows[0];
}
async function update(id, data) {
  const query = `UPDATE studies SET title=$2, phase=$3, status=$4, target_enrollment=$5, enrolled_count=$6, principal_investigator=$7, protocol_version=$8, updated_at=NOW()
    WHERE id=$1 OR protocol_number=$1 RETURNING *`;
  const values = [id, data.title, data.phase, data.status, data.target_enrollment, data.enrolled_count, data.principal_investigator, data.protocol_version];
  return (await pool.query(query, values)).rows[0];
}
async function remove(id) {
  const result = await pool.query("DELETE FROM studies WHERE id = $1 OR protocol_number = $1 RETURNING *", [id]);
  return result.rows[0];
}
module.exports = { list, findById, create, update, remove };

