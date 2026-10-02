function assessSafetyEvent(event) {
  return {
    ...event,
    requiresExpeditedReview: event.event_type === "SAE" || event.severity === "Serious",
    reviewStatus: "Open",
  };
}

module.exports = { assessSafetyEvent };

