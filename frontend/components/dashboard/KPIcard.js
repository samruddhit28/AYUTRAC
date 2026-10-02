export default function KPIcard({ label, value, detail, icon: Icon, tone = "teal" }) {
  return (
    <article className={`kpi-card kpi-${tone}`}>
      <div><p>{label}</p><strong>{value}</strong><span>{detail}</span></div>
      <div className="kpi-icon"><Icon size={21} /></div>
    </article>
  );
}

