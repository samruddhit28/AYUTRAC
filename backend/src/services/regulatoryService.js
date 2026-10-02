function deriveDeadlineStatus(dueDate) {
  const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86400000);
  if (days < 0) return "Overdue";
  if (days <= 14) return "Due Soon";
  return "On Track";
}

module.exports = { deriveDeadlineStatus };

