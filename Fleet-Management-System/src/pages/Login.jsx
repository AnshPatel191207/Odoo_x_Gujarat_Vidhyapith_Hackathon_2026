import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../components/login/ThreeBackground";

const C = "#4f46e5"; 

function LogoMark({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <rect width="72" height="72" rx="20" fill={C} />
      <rect x="14" y="19" width="44" height="8" rx="4" fill="white" opacity="0.9" />
      <rect x="30" y="19" width="12" height="24" rx="4" fill="white" opacity="0.9" />
      <path d="M18 48 L36 55 L54 48" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" fill="none" />
    </svg>
  );
}

const GoogleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.9c1.8 0 3.42.66 4.68 1.74l3.49-3.49A11.8 11.8 0 0 0 12 .9C8.45.9 5.34 2.93 3.67 5.9l1.6 3.86z" /><path fill="#34A853" d="M16.04 18.01A7.07 7.07 0 0 1 12 19.1c-3.07 0-5.69-1.96-6.7-4.72l-3.63 2.8C3.48 21.12 7.43 23.1 12 23.1c2.97 0 5.79-1.07 7.91-2.99l-3.87-2.1z" /><path fill="#4285F4" d="M19.91 20.11C22.04 18.05 23.1 14.97 23.1 12c0-.77-.1-1.56-.27-2.32H12v4.64h6.25c-.28 1.46-1.06 2.7-2.21 3.59l3.87 2.2z" /><path fill="#FBBC05" d="M5.3 14.38A7.16 7.16 0 0 1 4.9 12c0-.84.14-1.65.37-2.41L3.67 5.9A11.85 11.85 0 0 0 .9 12c0 1.92.46 3.73 1.26 5.35l3.14-2.97z" /></svg>;
const GithubIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.05c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" /></svg>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    await login(email || "manager12@gmail.com", password || "password123");
    navigate("/dashboard");
  };


  const inp = {
    width: "100%", padding: "11px 14px",
    background: "#131316", border: "1px solid #1c1c22",
    borderRadius: 9, color: "#f0f0f0", fontSize: "0.88rem",
    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color .15s",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter',sans-serif", background: "#0a0a0b" }}>

      
      <div className="login-left-panel" style={{
        flex: "0 0 46%", position: "relative",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 52px", overflow: "hidden",
        background: "#0d0d10",
        borderRight: "1px solid #1c1c22",
      }}>
        
        <ThreeBackground />
        
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0d0d10cc 60%,transparent)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44 }}>
            <LogoMark size={50} />
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0f0" }}>Transvora</div>
              <div style={{ fontSize: "0.62rem", color: "#333", letterSpacing: "0.12em", textTransform: "uppercase" }}>Fleet Intelligence Platform</div>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#f0f0f0", lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.04em" }}>
            Drive smarter,<br />
            <span style={{ color: C }}>fleet further.</span>
          </h2>
          <p style={{ color: "#444", fontSize: "0.93rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 370 }}>
            A single pane of glass to track vehicles, manage drivers, and optimise every route — in real time.
          </p>

          
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              "Real-time GPS fleet tracking",
              "Driver management & compliance",
              "Maintenance scheduling & alerts",
              "Revenue & performance analytics",
            ].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: C, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontSize: "0.86rem", color: "#888" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="login-right-panel" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px", background: "#0a0a0b" }}>
        <div style={{ width: "100%", maxWidth: 390 }}>
          <div style={{ marginBottom: 30 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.65rem", fontWeight: 800, color: "#f0f0f0", letterSpacing: "-0.03em", marginBottom: 6 }}>Welcome back</h3>
            <p style={{ color: "#333", fontSize: "0.86rem" }}>Sign in to your Transvora account.</p>
          </div>

          
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
            {[
              { icon: <GoogleIcon />, label: "Continue with Google" },
              { icon: <GithubIcon />, label: "Continue with GitHub", dark: true },
            ].map(b => (
              <button key={b.label} onClick={handleLogin} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "11px", width: "100%",
                background: b.dark ? "#18181c" : "#131316",
                border: "1px solid #25252d",
                borderRadius: 10, color: "#888",
                fontSize: "0.86rem", fontWeight: 500, fontFamily: "inherit",
                cursor: "pointer", transition: "all .15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C}40`; e.currentTarget.style.color = "#f0f0f0"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#25252d"; e.currentTarget.style.color = "#888"; }}
              >{b.icon}{b.label}</button>
            ))}
          </div>

          
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <div style={{ flex: 1, height: 1, background: "#1c1c22" }} />
            <span style={{ fontSize: "0.73rem", color: "#333" }}>or email</span>
            <div style={{ flex: 1, height: 1, background: "#1c1c22" }} />
          </div>

          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#444", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
              <input type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} style={inp}
                onFocus={e => e.target.style.borderColor = `${C}60`}
                onBlur={e => e.target.style.borderColor = "#1c1c22"}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
                <span style={{ fontSize: "0.75rem", color: C, cursor: "pointer" }}>Forgot?</span>
              </div>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={inp}
                onFocus={e => e.target.style.borderColor = `${C}60`}
                onBlur={e => e.target.style.borderColor = "#1c1c22"}
              />
            </div>
            <button type="submit" style={{
              padding: "12px", width: "100%", marginTop: 4,
              background: C, border: "none", borderRadius: 9,
              color: "#fff", fontSize: "0.9rem", fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              cursor: "pointer", boxShadow: `0 4px 16px ${C}40`,
              transition: "all .18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#6366f1"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${C}50`; }}
              onMouseLeave={e => { e.currentTarget.style.background = C; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 16px ${C}40`; }}
            >
              Sign In to Transvora →
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.76rem", color: "#333", marginTop: 20 }}>
            Don't have an account?{" "}
            <span style={{ color: C, cursor: "pointer", fontWeight: 600 }}>Request access</span>
          </p>

          {/* Security */}
          <div style={{ marginTop: 24, padding: "9px 13px", background: "#131316", border: "1px solid #1c1c22", borderRadius: 9, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span style={{ fontSize: "0.72rem", color: "#444" }}>Enterprise-grade security · SOC 2 Type II · TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  );
}