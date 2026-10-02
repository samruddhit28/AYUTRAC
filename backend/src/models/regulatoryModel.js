const pool = require("../config/database");
async function list() { return (await pool.query("SELECT * FROM regulatory_deadlines ORDER BY due_date ASC")).rows; }
async function create(data) {
  const query = "INSERT INTO regulatory_deadlines (study_id, category, title, owner_role, due_date, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
  return (await pool.query(query, [data.study_id, data.category, data.title, data.owner_role, data.due_date, data.status])).rows[0];
}
module.exports = { list, create };

