import Layout from "../components/layout/Layout";
import { useFleet } from "../context/FleetContext";
import FuelEfficiencyChart from "../components/reports/FuelEfficiencyChart";
import ROIChart from "../components/reports/ROIChart";

export default function Reports() {
    const { vehicles, trips, maintenance, drivers } = useFleet();

    const totalRevenue = trips.filter(t => t.status === "Completed").reduce((s, t) => s + t.cost, 0);
    const totalMaintCost = maintenance.reduce((s, m) => s + m.cost, 0);
    const netROI = totalRevenue - totalMaintCost;
    const avgTripDist = trips.length ? (trips.reduce((s, t) => s + t.distance, 0) / trips.length).toFixed(0) : 0;

    return (
        <Layout>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Analytics & Reports</h2>
                    <p className="page-subtitle">Fleet performance insights and financial overview</p>
                </div>
                <button className="btn btn-secondary" onClick={() => window.print()}>🖨️ Print Report</button>
            </div>

            
            <div className="kpi-grid" style={{ marginBottom: 24 }}>
                {[
                    {
                        label: "Total Revenue", value: `₹${(totalRevenue / 1000).toFixed(1)}K`, color: "#10b981",
                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    },
                    {
                        label: "Maintenance Cost", value: `₹${(totalMaintCost / 1000).toFixed(1)}K`, color: "#ef4444",
                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                    },
                    {
                        label: "Net ROI", value: `₹${(netROI / 1000).toFixed(1)}K`, color: netROI >= 0 ? "#10b981" : "#ef4444",
                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                    },
                    {
                        label: "Avg Trip Distance", value: `${avgTripDist} km`, color: "#3b82f6",
                        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    },
                ].map(kpi => (
                    <div key={kpi.label} className="card" style={{ borderLeft: `3px solid ${kpi.color}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{kpi.label}</div>
                                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
                            </div>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: `${kpi.color}18`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: kpi.color, flexShrink: 0,
                            }}>
                                {kpi.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            
            <div className="charts-grid">
                <FuelEfficiencyChart />
                <ROIChart />
            </div>

            
            <div className="card" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)" }}>
                    <h4>Vehicle Performance Overview</h4>
                </div>
                <table className="fleet-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Type</th>
                            <th>Mileage</th>
                            <th>Trips Assigned</th>
                            <th>Revenue (₹)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(v => {
                            const vTrips = trips.filter(t => t.vehicle === v.plate && t.status === "Completed");
                            const vRevenue = vTrips.reduce((s, t) => s + t.cost, 0);
                            return (
                                <tr key={v.id}>
                                    <td>
                                        <span style={{ fontFamily: "monospace", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "var(--r-sm)", fontSize: "0.8rem", color: "var(--accent-light)" }}>
                                            {v.plate}
                                        </span>
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{v.make} {v.model}</div>
                                    </td>
                                    <td style={{ color: "var(--text-secondary)" }}>{v.type}</td>
                                    <td style={{ color: "var(--text-secondary)" }}>{v.mileage.toLocaleString()} km</td>
                                    <td style={{ color: "var(--text-secondary)" }}>{vTrips.length}</td>
                                    <td style={{ color: "var(--success)", fontWeight: 600 }}>
                                        {vRevenue > 0 ? `₹${vRevenue.toLocaleString()}` : "—"}
                                    </td>
                                    <td>
                                        <span className={`badge ${v.status === "Active" ? "badge-success" : v.status === "In Service" ? "badge-warning" : "badge-muted"}`}>
                                            {v.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
