import { STATUS_COLORS } from "../../lib/constants";

export default function Badge({ children, tone }) {
  const resolvedTone = tone || STATUS_COLORS[children] || "neutral";
  return <span className={`badge badge-${resolvedTone}`}>{children}</span>;
}

