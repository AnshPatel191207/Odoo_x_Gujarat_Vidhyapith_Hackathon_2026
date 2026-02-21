import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useFleet } from "../context/FleetContext";
import TripStatusPill from "../components/trips/TripStatusPill";
import TripForm from "../components/trips/TripForm";

export default function Trips() {
    const { trips, deleteTrip, searchQuery, setSearchQuery } = useFleet();
    const [showAdd, setShowAdd] = useState(false);
    const [filter, setFilter] = useState("All");

    const filtered = trips.filter(t => {
        const matchFilter = filter === "All" || t.status === filter;
        const q = searchQuery.toLowerCase().trim();
        const matchSearch = !q ||
            t.origin.toLowerCase().includes(q) ||
            t.destination.toLowerCase().includes(q) ||
            t.driver.toLowerCase().includes(q) ||
            t.vehicle.toLowerCase().includes(q);
        return matchFilter && matchSearch;
    });

    const totalCost = filtered.filter(t => t.status === "Completed").reduce((s, t) => s + t.cost, 0);
    const totalDist = filtered.filter(t => t.status === "Completed").reduce((s, t) => s + t.distance, 0);

    return (
        <Layout>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Trip Management</h2>
                    <p className="page-subtitle">{trips.length} total trips logged</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>➕ New Trip</button>
            </div>


            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {[
                    { label: "Total Trips", value: trips.length, color: "#3b82f6" },
                    { label: "Completed", value: trips.filter(t => t.status === "Completed").length, color: "#10b981" },
                    { label: "In Progress", value: trips.filter(t => t.status === "In Progress").length, color: "#3b82f6" },
                    { label: "Scheduled", value: trips.filter(t => t.status === "Scheduled").length, color: "#06b6d4" },
                    { label: "Total Revenue", value: `₹${(totalCost / 1000).toFixed(1)}K`, color: "#8b5cf6" },
                    { label: "Total KM", value: `${totalDist.toLocaleString()} km`, color: "#f59e0b" },
                ].map(s => (
                    <div key={s.label} style={{
                        flex: 1, padding: "12px 14px",
                        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--r-md)",
                        borderTop: `2px solid ${s.color}`,
                    }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}</div>
                    </div>
                ))}
            </div>


            <div className="toolbar">
                <div className="search-bar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        placeholder="Search by route, driver, vehicle..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-tabs">
                    {["All", "Completed", "In Progress", "Scheduled", "Cancelled"].map(f => (
                        <button key={f} className={`filter-tab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                    ))}
                </div>
            </div>


            <div className="table-wrapper">
                <table className="fleet-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Route</th>
                            <th>Driver</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                            <th>Distance</th>
                            <th>Cost (₹)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={9} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>No trips found</td></tr>
                        ) : filtered.map((trip, idx) => (
                            <tr key={trip.id}>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{idx + 1}</td>
                                <td>
                                    <div style={{ fontWeight: 500 }}>{trip.origin}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>→ {trip.destination}</div>
                                </td>
                                <td style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{trip.driver}</td>
                                <td>
                                    <span style={{ fontFamily: "monospace", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "var(--r-sm)", fontSize: "0.78rem", color: "var(--accent-light)" }}>
                                        {trip.vehicle}
                                    </span>
                                </td>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{trip.date}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{trip.distance} km</td>
                                <td style={{ color: trip.cost > 0 ? "var(--success)" : "var(--text-muted)", fontWeight: trip.cost > 0 ? 600 : 400 }}>
                                    {trip.cost > 0 ? `₹${trip.cost.toLocaleString()}` : "—"}
                                </td>
                                <td><TripStatusPill status={trip.status} /></td>
                                <td>
                                    <button className="btn-icon" title="Delete" onClick={() => { if (window.confirm("Delete this trip?")) deleteTrip(trip.id); }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: 10, fontSize: "0.8rem", color: "var(--text-muted)" }}>Showing {filtered.length} of {trips.length} trips</div>

            {showAdd && <TripForm onClose={() => setShowAdd(false)} />}
        </Layout>
    );
}
