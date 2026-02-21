import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const C = "#4f46e5";

const BellIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
const SearchIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const ChevDown = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
const LogoutIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const MenuIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;

function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <rect width="72" height="72" rx="18" fill={C} />
      <rect x="14" y="19" width="44" height="8" rx="4" fill="white" opacity="0.9" />
      <rect x="30" y="19" width="12" height="24" rx="4" fill="white" opacity="0.9" />
      <path d="M18 48 L36 55 L54 48" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" fill="none" />
    </svg>
  );
}

const PAGE_LABELS = {
  "/dashboard": "Dashboard", "/vehicles": "Vehicles", "/drivers": "Drivers",
  "/trips": "Trips", "/maintenance": "Maintenance", "/reports": "Reports",
};

const NOTIFS = [
  { id: 1, text: "GJ-18-EF-9012 engine overhaul overdue", time: "2m ago", col: "#ef4444" },
  { id: 2, text: "New trip Ahmedabad → Surat scheduled", time: "18m ago", col: C },
  { id: 3, text: "Kiran Desai completed trip to Jamnagar", time: "1h ago", col: "#22c55e" },
];

export default function Navbar({ onMenuClick }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const pageLabel = PAGE_LABELS[location.pathname] || "Transvora";
  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "FM";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "var(--navbar-h)",
      background: "#0a0a0b",
      borderBottom: "1px solid #1c1c22",
      display: "flex", alignItems: "center",
      padding: "0 20px 0 0", zIndex: 100,
    }}>


      <div
        className="navbar-logo-zone"
        style={{ width: "var(--sidebar-w)", display: "flex", alignItems: "center", gap: 10, padding: "0 20px", height: "100%", flexShrink: 0, borderRight: "1px solid #1c1c22" }}
      >

        <button
          onClick={onMenuClick}
          className="navbar-hamburger"
          style={{
            display: "none",
            background: "none", border: "none",
            color: "#888", cursor: "pointer",
            padding: "4px", marginRight: 4, flexShrink: 0,
          }}
        >
          <MenuIcon />
        </button>
        <LogoMark size={32} />
        <div className="navbar-brand-text">
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "#f0f0f0" }}>Transvora</div>
          <div style={{ fontSize: "0.56rem", color: "#333", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 1 }}>Fleet Intelligence</div>
        </div>
      </div>


      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 14, padding: "0 20px" }}>

        <div className="navbar-breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: "0.72rem", color: "#333" }}>Transvora</span>
          <span style={{ color: "#222", fontSize: "0.9rem" }}>/</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: C, background: `${C}18`, padding: "2px 10px", borderRadius: 20, border: `1px solid ${C}30` }}>{pageLabel}</span>
        </div>


        <div
          className="navbar-search"
          style={{ flex: 1, maxWidth: 340, display: "flex", alignItems: "center", gap: 8, background: "#101012", border: "1px solid #1c1c22", borderRadius: 10, padding: "7px 14px", transition: "all .18s" }}
          onFocus={e => { e.currentTarget.style.borderColor = `${C}60`; }}
          onBlur={e => { e.currentTarget.style.borderColor = "#1c1c22"; }}
          tabIndex={-1}
        >
          <span style={{ color: "#333", flexShrink: 0 }}><SearchIcon /></span>
          <input placeholder="Search vehicles, drivers, trips…" style={{ background: "none", border: "none", outline: "none", color: "#888", fontSize: "0.82rem", fontFamily: "'Inter',sans-serif", width: "100%" }} />
          <kbd style={{ backgroundColor: `${C}15`, border: `1px solid ${C}25`, borderRadius: 5, padding: "1px 6px", fontSize: "0.65rem", color: "#555", fontFamily: "monospace", flexShrink: 0 }}>⌘K</kbd>
        </div>
      </div>


      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>


        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowNotif(p => !p); setShowUser(false); }} style={{
            width: 38, height: 38, borderRadius: 10,
            background: showNotif ? `${C}18` : "rgba(255,255,255,0.03)",
            border: `1px solid ${showNotif ? `${C}50` : "#1c1c22"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: showNotif ? C : "#444", cursor: "pointer", position: "relative", transition: "all .15s",
          }}
            onMouseEnter={e => { if (!showNotif) { e.currentTarget.style.borderColor = `${C}40`; e.currentTarget.style.color = C; } }}
            onMouseLeave={e => { if (!showNotif) { e.currentTarget.style.borderColor = "#1c1c22"; e.currentTarget.style.color = "#444"; } }}
          >
            <BellIcon />
            <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%", background: "#ef4444", border: "1.5px solid #0a0a0b" }} />
          </button>

          {showNotif && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 310, background: "#131316", border: "1px solid #1c1c22", borderRadius: 14, boxShadow: "0 20px 50px rgba(0,0,0,0.7)", zIndex: 200, overflow: "hidden" }}>
              <div style={{ padding: "13px 16px", borderBottom: "1px solid #1c1c22", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "#f0f0f0", fontSize: "0.9rem" }}>Notifications</span>
                <span style={{ fontSize: "0.7rem", color: C, fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
              </div>
              {NOTIFS.map(n => (
                <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid #1c1c22", display: "flex", gap: 12, cursor: "pointer", transition: "background .14s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#18181c"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.col, marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.81rem", color: "#ccc", lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: "0.7rem", color: "#333", marginTop: 3 }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "10px 16px", textAlign: "center" }}>
                <span style={{ fontSize: "0.76rem", color: "#333", cursor: "pointer" }}>View all →</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ width: 1, height: 22, background: "#1c1c22", margin: "0 4px" }} />


        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowUser(p => !p); setShowNotif(false); }} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "6px 10px 6px 6px",
            background: showUser ? `${C}15` : "rgba(255,255,255,0.03)",
            border: `1px solid ${showUser ? `${C}40` : "#1c1c22"}`,
            borderRadius: 10, cursor: "pointer", transition: "all .15s",
          }}
            onMouseEnter={e => { if (!showUser) { e.currentTarget.style.background = `${C}0d`; e.currentTarget.style.borderColor = `${C}30`; } }}
            onMouseLeave={e => { if (!showUser) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "#1c1c22"; } }}
          >
            <div style={{ position: "relative" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "#fff", boxShadow: `0 2px 10px ${C}50` }}>{initials}</div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderRadius: "50%", background: "#22c55e", border: "1.5px solid #0a0a0b" }} />
            </div>
            <div className="navbar-user-text" style={{ textAlign: "left", lineHeight: 1.25 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f0f0f0", whiteSpace: "nowrap" }}>Fleet Manager</div>
              <div style={{ fontSize: "0.68rem", color: "#333", whiteSpace: "nowrap", maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</div>
            </div>
            <span className="navbar-user-text" style={{ color: "#333", marginLeft: 2 }}><ChevDown /></span>
          </button>

          {showUser && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 210, background: "#131316", border: "1px solid #1c1c22", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.7)", zIndex: 200 }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid #1c1c22" }}>
                <div style={{ fontWeight: 600, color: "#f0f0f0", fontSize: "0.88rem" }}>Fleet Manager</div>
                <div style={{ fontSize: "0.73rem", color: "#333", marginTop: 2, wordBreak: "break-all" }}>{user?.email}</div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: "0.68rem", color: "#22c55e" }}>Online</span>
                </div>
              </div>
              {[
                { label: "Profile Settings", path: "/settings" },
                { label: "Preferences", path: "/settings?tab=preferences" },
              ].map(item => (
                <button key={item.label}
                  onClick={() => { navigate(item.path); setShowUser(false); }}
                  style={{ width: "100%", padding: "10px 16px", background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: "0.83rem", fontFamily: "Inter,sans-serif", cursor: "pointer", transition: "background .14s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#18181c"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >{item.label}</button>
              ))}

              <div style={{ borderTop: "1px solid #1c1c22" }}>
                <button onClick={() => { logout(); navigate("/"); }} style={{ width: "100%", padding: "10px 16px", background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, color: "#ef4444", fontSize: "0.83rem", fontFamily: "Inter,sans-serif", cursor: "pointer", transition: "background .14s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                ><LogoutIcon /> Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}