import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useFleet } from "../context/FleetContext";
import AddDriverModal from "../components/drivers/AddDriverModal";

const C = "#4f46e5";


const IconLicense = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
const IconPhone = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.11 3.41 2 2 0 0 1 3.09 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z" /></svg>;
const IconVehicle = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
const IconTrips = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
const IconCalendar = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const IconStar = ({ filled }) => <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const IconMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>;
const IconSearch = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
const IconAdd = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;


const STATUS = {
    "Active": { bg: "rgba(16,185,129,0.12)", color: "#10b981", dot: "#10b981" },
    "On Trip": { bg: "rgba(99,102,241,0.15)", color: "#818cf8", dot: "#818cf8" },
    "Off Duty": { bg: "rgba(100,100,120,0.15)", color: "#6b7280", dot: "#6b7280" },
};

function StatusBadge({ status }) {
    const s = STATUS[status] || STATUS["Off Duty"];
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "3px 10px", borderRadius: 20,
            background: s.bg, color: s.color,
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em",
        }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block", boxShadow: `0 0 6px ${s.dot}` }} />
            {status}
        </span>
    );
}

function StarRating({ rating }) {
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= Math.round(rating)} />)}
            <span style={{ marginLeft: 5, color: "#f59e0b", fontWeight: 700, fontSize: "0.82rem" }}>{rating}</span>
        </span>
    );
}

function MetaRow({ icon, label, value, accent }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 0",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: 500 }}>
                {icon}
                {label}
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: accent || "var(--text-secondary)" }}>
                {value}
            </span>

        </div>
    );
}

export default function Drivers() {
    const { drivers, deleteDriver } = useFleet();
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState("");
    const [hovered, setHovered] = useState(null);

    const filtered = drivers.filter(d =>
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.license.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>


            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 24,
            }}>
                <div>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.6rem", fontWeight: 800,
                        color: "var(--text-primary)", letterSpacing: "-0.03em", margin: 0,
                    }}>
                        Driver Management
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "4px 0 0" }}>
                        {drivers.length} registered drivers
                    </p>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px",
                        background: C, border: "none", borderRadius: 10,
                        color: "#fff", fontSize: "0.88rem", fontWeight: 700,
                        fontFamily: "'Space Grotesk', sans-serif",
                        cursor: "pointer",
                        boxShadow: `0 4px 16px ${C}50`,
                        transition: "all .18s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#6366f1"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C; e.currentTarget.style.transform = "none"; }}
                >
                    <IconAdd /> Add Driver
                </button>
            </div>


            <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                borderRadius: 10, padding: "9px 14px", marginBottom: 28,
                maxWidth: 380,
            }}>
                <span style={{ color: "var(--text-muted)" }}><IconSearch /></span>
                <input
                    placeholder="Search by name or license…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        background: "none", border: "none", outline: "none",
                        color: "var(--text-primary)", fontSize: "0.88rem", width: "100%", fontFamily: "inherit",
                    }}
                />
            </div>



            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
            }}>
                {filtered.map(driver => {
                    const isHov = hovered === driver.id;
                    return (
                        <div
                            key={driver.id}
                            onMouseEnter={() => setHovered(driver.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                background: isHov ? "var(--bg-card-hover)" : "var(--bg-card)",
                                border: `1px solid ${isHov ? "var(--border-light)" : "var(--border)"}`,
                                borderRadius: 16,
                                padding: "20px",
                                transition: "all .22s ease",
                                transform: isHov ? "translateY(-3px)" : "none",
                                boxShadow: isHov ? "var(--shadow-lg)" : "var(--shadow-sm)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >


                            <div style={{
                                position: "absolute", top: -30, right: -30,
                                width: 100, height: 100, borderRadius: "50%",
                                background: `radial-gradient(circle, ${driver.color || C}18 0%, transparent 70%)`,
                                pointerEvents: "none",
                            }} />


                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>

                                <div style={{
                                    width: 52, height: 52, borderRadius: 14,
                                    background: driver.color || C,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "1.3rem", fontWeight: 800, color: "#fff",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    flexShrink: 0,
                                    boxShadow: `0 4px 14px ${driver.color || C}50`,
                                }}>
                                    {driver.name.charAt(0)}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "1.02rem", fontWeight: 700,
                                        color: "var(--text-primary)", letterSpacing: "-0.02em",
                                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                    }}>
                                        {driver.name}
                                    </div>

                                    <div style={{ marginTop: 4 }}>
                                        <StatusBadge status={driver.status} />
                                    </div>
                                </div>
                            </div>


                            <div style={{
                                display: "flex", gap: 8, marginBottom: 14,
                            }}>
                                {[
                                    { label: "Trips", value: driver.trips },
                                    { label: "Rating", value: driver.rating },
                                ].map(s => (
                                    <div key={s.label} style={{
                                        flex: 1, background: "var(--bg-secondary)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 10, padding: "8px 10px", textAlign: "center",
                                    }}>
                                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Space Grotesk',sans-serif" }}>
                                            {s.label === "Rating" ? `${s.value}★` : s.value}
                                        </div>
                                        <div style={{ fontSize: "0.67rem", color: "var(--text-muted)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                                    </div>

                                ))}
                            </div>


                            <div style={{ borderTop: "1px solid #1a1a22", paddingTop: 4 }}>
                                <MetaRow icon={<IconLicense />} label="License" value={driver.license} />
                                <MetaRow icon={<IconPhone />} label="Phone" value={driver.phone} />
                                <MetaRow icon={<IconVehicle />} label="Vehicle" value={driver.vehicle} accent="#818cf8" />
                                <MetaRow icon={<IconCalendar />} label="Joined" value={driver.joined} accent="#555" />
                            </div>


                            <div style={{
                                display: "flex", gap: 8, marginTop: 16,
                                borderTop: "1px solid #1a1a22", paddingTop: 14,
                            }}>
                                <button style={{
                                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                                    padding: "9px", background: `${C}18`,
                                    border: `1px solid ${C}30`, borderRadius: 9,
                                    color: "#818cf8", fontSize: "0.82rem", fontWeight: 600,
                                    fontFamily: "inherit", cursor: "pointer", transition: "all .15s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = `${C}30`; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = `${C}18`; }}
                                >
                                    <IconMail /> Contact
                                </button>
                                <button
                                    title="Delete driver"
                                    onClick={() => { if (window.confirm(`Remove ${driver.name}?`)) deleteDriver(driver.id); }}
                                    style={{
                                        width: 38, height: 38,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        background: "rgba(239,68,68,0.08)",
                                        border: "1px solid rgba(239,68,68,0.2)",
                                        borderRadius: 9, color: "#ef4444",
                                        cursor: "pointer", transition: "all .15s", flexShrink: 0,
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                                >
                                    <IconTrash />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "80px 0", color: "#333" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" style={{ marginBottom: 12 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <p style={{ fontSize: "0.9rem" }}>No drivers found</p>
                </div>
            )}

            {showAdd && <AddDriverModal onClose={() => setShowAdd(false)} />}
        </Layout>
    );
}
