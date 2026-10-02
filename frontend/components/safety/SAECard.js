import { Siren } from "lucide-react";
import Badge from "../common/Badge";

export default function SAECard({ event }) {
  return <article className="event-card event-serious"><div className="event-icon"><Siren size={19} /></div><div className="event-main"><div className="event-top"><div><strong>{event.id}</strong><span>{event.study} · {event.type}</span></div><Badge tone="danger">{event.severity}</Badge></div><p>{event.narrative}</p><div className="event-footer"><span>Onset: {event.onset}</span><Badge>{event.status}</Badge></div></div></article>;
}

