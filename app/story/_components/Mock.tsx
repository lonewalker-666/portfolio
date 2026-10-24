import type { MockKind } from "../_content/content";

const CONFIG: Record<
  MockKind,
  { title: string; kpis: [string, string][]; line: string; area: string; color: string; rows: [string, string, boolean][] }
> = {
  media: {
    title: "Media pipeline",
    kpis: [["Publish time", "−80%"], ["Queue backlog", "0"], ["Streams", "HLS"]],
    line: "M0 30 C 40 32, 70 40, 110 60 S 180 90, 220 96 S 290 100, 320 104",
    area: "M0 30 C 40 32, 70 40, 110 60 S 180 90, 220 96 S 290 100, 320 104 L 320 120 L 0 120 Z",
    color: "#ff6a26",
    rows: [["lecture-12.mp4", "MediaConvert", true], ["intro-course.mov", "Transcoding", false], ["webinar-03.mp4", "MediaConvert", true]],
  },
  ledger: {
    title: "Transactions",
    kpis: [["Daily txns", "500+"], ["Rails", "UPI · AEPS"], ["Recon", "Auto"]],
    line: "M0 90 C 30 70, 60 84, 90 62 S 150 50, 180 56 S 250 30, 280 34 S 310 20, 320 18",
    area: "M0 90 C 30 70, 60 84, 90 62 S 150 50, 180 56 S 250 30, 280 34 S 310 20, 320 18 L 320 120 L 0 120 Z",
    color: "#4fd88a",
    rows: [["UPI · ₹1,250", "Settled", true], ["AEPS · ₹3,000", "Retrying", false], ["BBPS · ₹780", "Reconciled", true]],
  },
  tenants: {
    title: "Tenants",
    kpis: [["Domains", "3"], ["Isolation", "Per tenant"], ["Access", "RBAC"]],
    line: "M0 100 L 40 92 L 80 80 L 120 82 L 160 64 L 200 58 L 240 44 L 280 40 L 320 28",
    area: "M0 100 L 40 92 L 80 80 L 120 82 L 160 64 L 200 58 L 240 44 L 280 40 L 320 28 L 320 120 L 0 120 Z",
    color: "#9b8cff",
    rows: [["Music academy", "Payroll run", true], ["Tuition centre", "Attendance", true], ["Karate class", "Invoice due", false]],
  },
  fleet: {
    title: "Load board",
    kpis: [["Daily users", "100+"], ["Order matching", "Live"], ["HRM", "In-house"]],
    line: "M0 80 C 30 60, 50 90, 80 70 S 130 40, 160 60 S 210 30, 240 44 S 290 20, 320 30",
    area: "M0 80 C 30 60, 50 90, 80 70 S 130 40, 160 60 S 210 30, 240 44 S 290 20, 320 30 L 320 120 L 0 120 Z",
    color: "#ffb84d",
    rows: [["Chennai → Pune", "Accepted", true], ["Delhi → Jaipur", "Matching", false], ["Hosur → Kochi", "In transit", true]],
  },
};

export default function Mock({ kind }: { kind: MockKind }) {
  const c = CONFIG[kind];
  return (
    <div className="sx-mock" aria-hidden="true">
      <div className="sx-mock__bar">
        <i />
        <i />
        <i />
        <span>{c.title}</span>
      </div>
      <div className="sx-mock__body">
        <div className="sx-mock__side">
          <b />
          <b />
          <b />
          <b />
          <b />
        </div>
        <div className="sx-mock__main">
          <div className="sx-mock__kpis">
            {c.kpis.map(([label, value]) => (
              <div key={label} className="sx-mock__kpi">
                <small>{label}</small>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="sx-mock__chart">
            <svg viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`sx-fill-${kind}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={c.color} stopOpacity="0.35" />
                  <stop offset="1" stopColor={c.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={c.area} fill={`url(#sx-fill-${kind})`} />
              <path d={c.line} fill="none" stroke={c.color} strokeWidth="2.5" data-draw />
            </svg>
          </div>
          <div className="sx-mock__rows">
            {c.rows.map(([name, status, ok]) => (
              <div key={name} className="sx-mock__row">
                <span>{name}</span>
                <span className={`sx-mock__pill ${ok ? "sx-mock__pill--ok" : "sx-mock__pill--wait"}`}>{status}</span>
                <span>now</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
