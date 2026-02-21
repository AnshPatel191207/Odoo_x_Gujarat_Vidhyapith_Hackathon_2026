import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useFleet } from "../context/FleetContext";

export default function FuelLogs() {
    const { vehicles, trips } = useFleet();
    const [filter, setFilter] = useState("all");


    const FUEL_LOGS = [
        { id: 1, date: "2026-02-21", vehicle: "GJ-01-AB-1234", liters: 65, costPerLiter: 93.5, total: 6077.5, odometer: 45380, type: "Diesel", trip: "AHM → ST" },
        { id: 2, date: "2026-02-20", vehicle: "GJ-05-CD-5678", liters: 55, costPerLiter: 93.5, total: 5142.5, odometer: 62210, type: "Diesel", trip: "ST → MUM" },
        { id: 3, date: "2026-02-19", vehicle: "GJ-18-EF-9012", liters: 48, costPerLiter: 93.5, total: 4488.0, odometer: 19020, type: "Diesel", trip: "AHM → RJK" },
        { id: 4, date: "2026-02-18", vehicle: "GJ-01-GH-3456", liters: 40, costPerLiter: 93.5, total: 3740.0, odometer: 78530, type: "Diesel", trip: "VDR → AHM" },
        { id: 5, date: "2026-02-17", vehicle: "GJ-07-IJ-7890", liters: 30, costPerLiter: 68.0, total: 2040.0, odometer: 31310, type: "CNG", trip: "—" },
        { id: 6, date: "2026-02-16", vehicle: "GJ-01-KL-2345", liters: 70, costPerLiter: 93.5, total: 6545.0, odometer: 95740, type: "Diesel", trip: "RJK → BHV" },
        { id: 7, date: "2026-02-15", vehicle: "GJ-15-MN-6789", liters: 38, costPerLiter: 93.5, total: 3553.0, odometer: 12410, type: "Diesel", trip: "AHM → GDH" },
        { id: 8, date: "2026-02-14", vehicle: "GJ-10-OP-1122", liters: 52, costPerLiter: 102.0, total: 5304.0, odometer: 54840, type: "Petrol", trip: "ST → VSD" },
    ];

    const filtered = filter === "all" ? FUEL_LOGS : FUEL_LOGS.filter(l => l.type.toLowerCase() === filter);

    const totalLiters = FUEL_LOGS.reduce((s, l) => s + l.liters, 0);
    const totalCost = FUEL_LOGS.reduce((s, l) => s + l.total, 0);
    const avgPerLiter = totalCost / totalLiters;
    const dieselCount = FUEL_LOGS.filter(l => l.type === "Diesel").length;

    const kpis = [
        {
            label: "Total Fuel Cost", value: `₹${(totalCost / 1000).toFixed(1)}K`, color: "#ef4444",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>
        },
        {
            label: "Total Litres", value: `${totalLiters} L`, color: "#4f46e5",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        },
        {
            label: "Avg Cost / Litre", value: `₹${avgPerLiter.toFixed(1)}`, color: "#f59e0b",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
        },
        {
            label: "Diesel Fills", value: `${dieselCount} / ${FUEL_LOGS.length}`, color: "#10b981",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
        },
    ];

    const fuelTypeColor = { Diesel: "#f59e0b", Petrol: "#3b82f6", CNG: "#10b981" };

    return (
        <Layout>

            <div className="page-header">
                <div>
                    <h2 className="page-title">Fuel Logs</h2>
                    <p className="page-subtitle">Track fuel fills, costs and efficiency across the fleet</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {["all", "diesel", "petrol", "cng"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "7px 14px", borderRadius: 8, border: "1px solid",
                                fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                                textTransform: "capitalize", fontFamily: "inherit",
                                background: filter === f ? "var(--accent)" : "transparent",
                                borderColor: filter === f ? "var(--accent)" : "var(--border)",
                                color: filter === f ? "#fff" : "var(--text-secondary)",
                                transition: "all .15s",
                            }}
                        >
                            {f === "all" ? "All Types" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

            </div>


            <div className="kpi-grid" style={{ marginBottom: 24 }}>
                {kpis.map(kpi => (
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


            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif" }}>Fill History</h4>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", background: "var(--bg-secondary)", padding: "3px 10px", borderRadius: 20 }}>
                        {filtered.length} records
                    </span>
                </div>

                <table className="fleet-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Vehicle</th>
                            <th>Fuel Type</th>
                            <th>Litres</th>
                            <th>Cost / L</th>
                            <th>Total Cost</th>
                            <th>Odometer</th>
                            <th>Trip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                                    No fuel logs found.
                                </td>
                            </tr>
                        ) : filtered.map(log => (
                            <tr key={log.id}>
                                <td style={{ color: "var(--text-secondary)", fontSize: "0.83rem" }}>{log.date}</td>
                                <td>
                                    <span style={{
                                        fontFamily: "monospace", background: "var(--bg-secondary)",
                                        padding: "2px 8px", borderRadius: "var(--r-sm)",
                                        fontSize: "0.8rem", color: "var(--accent-light)",
                                    }}>
                                        {log.vehicle}
                                    </span>
                                </td>
                                <td>
                                    <span style={{
                                        display: "inline-flex", alignItems: "center", gap: 5,
                                        padding: "2px 10px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600,
                                        background: `${fuelTypeColor[log.type]}1a`,
                                        color: fuelTypeColor[log.type],
                                        border: `1px solid ${fuelTypeColor[log.type]}33`,
                                    }}>
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: fuelTypeColor[log.type] }} />
                                        {log.type}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{log.liters} L</td>
                                <td style={{ color: "var(--text-secondary)" }}>₹{log.costPerLiter.toFixed(1)}</td>
                                <td style={{ fontWeight: 700, color: "var(--danger)" }}>₹{log.total.toLocaleString()}</td>
                                <td style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{log.odometer.toLocaleString()} km</td>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{log.trip}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="card" style={{ marginTop: 20 }}>
                <h4 style={{ margin: "0 0 16px 0", fontFamily: "'Space Grotesk',sans-serif" }}>Spend by Vehicle</h4>
                {FUEL_LOGS.map(log => {
                    const pct = Math.round((log.total / totalCost) * 100);
                    return (
                        <div key={log.id} style={{ marginBottom: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: "0.8rem" }}>
                                <span style={{ fontFamily: "monospace", color: "var(--accent-light)" }}>{log.vehicle}</span>
                                <span style={{ color: "var(--text-muted)" }}>₹{log.total.toLocaleString()} <span style={{ color: "var(--text-muted)", opacity: 0.6, marginLeft: 4 }}>({pct}%)</span></span>
                            </div>
                            <div style={{ height: 5, background: "var(--bg-secondary)", borderRadius: 4, overflow: "hidden", border: "1px solid var(--border)" }}>
                                <div style={{
                                    height: "100%", width: `${pct}%`,
                                    background: "var(--brand-gradient)",
                                    borderRadius: 4, transition: "width .6s ease",
                                }} />
                            </div>
                        </div>

                    );
                })}
            </div>
        </Layout>
    );
}
