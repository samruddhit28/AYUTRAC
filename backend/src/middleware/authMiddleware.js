const { PERMISSIONS } = require("../services/accessService");

function mockAuthenticate(req, res, next) {
  req.user = {
    id: req.header("x-user-id") || "00000000-0000-0000-0000-000000000001",
    role: req.header("x-user-role") || "STUDY_COORDINATOR",
    ip: req.ip,
  };
  next();
}

function authorize(permission) {
  return (req, res, next) => {
    const permissions = PERMISSIONS[req.user.role] || [];
    if (!permissions.includes("*") && !permissions.includes(permission)) {
      return res.status(403).json({ message: "Insufficient permission for this action" });
    }
    next();
  };
}

module.exports = { mockAuthenticate, authorize };

