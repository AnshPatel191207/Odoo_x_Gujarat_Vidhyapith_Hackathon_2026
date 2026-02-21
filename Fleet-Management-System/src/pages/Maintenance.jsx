import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useFleet } from "../context/FleetContext";
import MaintenanceForm from "../components/maintenance/MaintenanceForm";

const priorityStyle = {
    "Critical": "badge-danger",
    "High": "badge-warning",
    "Normal": "badge-info",
};

const statusStyle = {
    "Scheduled": "badge-info",
    "In Progress": "badge-warning",
    "Completed": "badge-success",
    "Overdue": "badge-danger",
};

export default function Maintenance() {
    const { maintenance, deleteMaintenance } = useFleet();
    const [showAdd, setShowAdd] = useState(false);
    const [filter, setFilter] = useState("All");

    const overdue = maintenance.filter(m => m.status === "Overdue");
    const critical = maintenance.filter(m => m.priority === "Critical");

    const filtered = maintenance.filter(m =>
        filter === "All" || m.status === filter
    );

    return (
        <Layout>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Maintenance Schedule</h2>
                    <p className="page-subtitle">Track vehicle service and repair records</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>➕ Schedule Maintenance</button>
            </div>

            
            {overdue.length > 0 && (
                <div className="alert alert-danger">
                    <span className="alert-icon">🚨</span>
                    <div>
                        <div style={{ fontWeight: 600, color: "var(--danger)", fontSize: "0.9rem" }}>
                            {overdue.length} Overdue Maintenance {overdue.length === 1 ? "Record" : "Records"}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>
                            {overdue.map(m => m.vehicle).join(", ")} — requires immediate attention
                        </div>
                    </div>
                </div>
            )}
            {critical.length > 0 && (
                <div className="alert alert-warning">
                    <span className="alert-icon">⚠️</span>
                    <div>
                        <div style={{ fontWeight: 600, color: "var(--warning)", fontSize: "0.9rem" }}>
                            {critical.length} Critical Priority {critical.length === 1 ? "Issue" : "Issues"}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>
                            {critical.map(m => `${m.vehicle} — ${m.type}`).join(", ")}
                        </div>
                    </div>
                </div>
            )}

            
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {[
                    { label: "Total Records", value: maintenance.length, color: "#3b82f6" },
                    { label: "Scheduled", value: maintenance.filter(m => m.status === "Scheduled").length, color: "#06b6d4" },
                    { label: "In Progress", value: maintenance.filter(m => m.status === "In Progress").length, color: "#f59e0b" },
                    { label: "Overdue", value: maintenance.filter(m => m.status === "Overdue").length, color: "#ef4444" },
                    { label: "Total Cost", value: `₹${(maintenance.reduce((s, m) => s + m.cost, 0) / 1000).toFixed(1)}K`, color: "#8b5cf6" },
                ].map(s => (
                    <div key={s.label} style={{
                        flex: 1, padding: "12px 14px",
                        background: "var(--bg-card)", border: "1px solid var(--border)",
                        borderRadius: "var(--r-md)", borderTop: `2px solid ${s.color}`,
                    }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}</div>
                    </div>
                ))}
            </div>

            
            <div className="toolbar">
                <div className="filter-tabs">
                    {["All", "Scheduled", "In Progress", "Completed", "Overdue"].map(f => (
                        <button key={f} className={`filter-tab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                    ))}
                </div>
            </div>

            
            <div className="table-wrapper">
                <table className="fleet-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Service Type</th>
                            <th>Scheduled Date</th>
                            <th>Technician</th>
                            <th>Cost (₹)</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>No records found</td></tr>
                        ) : filtered.map(m => (
                            <tr key={m.id}>
                                <td>
                                    <span style={{ fontFamily: "monospace", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "var(--r-sm)", fontSize: "0.8rem", color: "var(--accent-light)" }}>
                                        {m.vehicle}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 500 }}>{m.type}</td>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{m.date}</td>
                                <td style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{m.technician}</td>
                                <td style={{ color: "var(--success)", fontWeight: 600 }}>₹{m.cost.toLocaleString()}</td>
                                <td><span className={`badge ${priorityStyle[m.priority] || "badge-muted"}`}>{m.priority}</span></td>
                                <td><span className={`badge ${statusStyle[m.status] || "badge-muted"}`}>{m.status}</span></td>
                                <td>
                                    <button className="btn-icon" title="Delete" onClick={() => { if (window.confirm("Delete this record?")) deleteMaintenance(m.id); }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAdd && <MaintenanceForm onClose={() => setShowAdd(false)} />}
        </Layout>
    );
}
