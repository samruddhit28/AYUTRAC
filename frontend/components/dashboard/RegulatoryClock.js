import { CalendarClock } from "lucide-react";
import Badge from "../common/Badge";

export default function RegulatoryClock({ deadlines }) {
  return (
    <section className="panel regulatory-clock">
      <div className="panel-heading"><div><span className="eyebrow">Compliance</span><h2>Regulatory clock</h2></div><CalendarClock size={21} className="heading-icon" /></div>
      <div className="deadline-list">
        {deadlines.map((deadline) => <article className={`deadline-item ${deadline.status === "Due Soon" ? "deadline-urgent" : ""}`} key={deadline.id}>
          <div className="deadline-date"><strong>{deadline.due.split(" ")[0]}</strong><span>{deadline.due.split(" ").slice(1).join(" ")}</span></div>
          <div className="deadline-copy"><strong>{deadline.title}</strong><span>{deadline.owner}</span></div>
          <Badge>{deadline.status}</Badge>
        </article>)}
      </div>
    </section>
  );
}

