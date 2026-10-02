import Link from "next/link";
import { ArrowUpRight, HeartPulse } from "lucide-react";
import Badge from "../common/Badge";

export default function SafetySignals({ events }) {
  return (
    <section className="panel safety-signals">
      <div className="panel-heading"><div><span className="eyebrow">Human review loop</span><h2>Safety signals</h2></div><Link href="/safety" className="text-link">Review queue <ArrowUpRight size={15} /></Link></div>
      <div className="signal-summary"><HeartPulse size={20} /><span><strong>2 events</strong> require clinician review</span></div>
      {events.map((event) => <div className="signal-row" key={event.id}><div><strong>{event.id}</strong><span>{event.study} · {event.type}</span></div><Badge tone={event.severity === "Serious" ? "danger" : event.severity === "Moderate" ? "warning" : "info"}>{event.severity}</Badge></div>)}
    </section>
  );
}

