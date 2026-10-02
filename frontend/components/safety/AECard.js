import { Activity } from "lucide-react";
import Badge from "../common/Badge";

export default function AECard({ event }) {
  return <article className="event-card"><div className="event-icon"><Activity size={19} /></div><div className="event-main"><div className="event-top"><div><strong>{event.id}</strong><span>{event.study} · {event.type}</span></div><Badge tone={event.severity === "Moderate" ? "warning" : "info"}>{event.severity}</Badge></div><p>{event.narrative}</p><div className="event-footer"><span>Onset: {event.onset}</span><Badge>{event.status}</Badge></div></div></article>;
}

