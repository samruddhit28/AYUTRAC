import { MoreHorizontal } from "lucide-react";
import Badge from "../common/Badge";

export default function ParticipantTable({ participants }) {
  return <div className="table-wrap"><table className="data-table participant-table">
    <thead><tr><th>Participant ID</th><th>Study</th><th>Site</th><th>Screening status</th><th>Enrollment date</th><th>Current visit</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
    <tbody>{participants.map((participant) => <tr key={participant.id}><td className="table-title">{participant.id}<span>Pseudonymous record</span></td><td>{participant.study}</td><td>{participant.site}</td><td><Badge>{participant.screening}</Badge></td><td>{participant.enrollmentDate}</td><td>{participant.visit}</td><td><Badge>{participant.status}</Badge></td><td><button className="icon-button" title="View participant record" aria-label={`View ${participant.id}`}><MoreHorizontal size={18} /></button></td></tr>)}</tbody>
  </table></div>;
}

