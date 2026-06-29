"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, Warehouse } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === "admin@blastid.com" && password === "admin123") {
        alert("Login berhasil! (simulasi)");
      } else {
        setError("Email atau password salah.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
        minHeight: "100vh",
        backgroundImage: "url('/backgroundlogin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
    }}>
    
    {/* Overlay */}
    <div style={{
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.1)",
    zIndex: 0,
    }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "36px" }}>
          <div style={{
            width: "92px", height: "92px",
            background: "#2d3748",
            borderRadius: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "14px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.18)"
          }}>
            <Warehouse size={36} color="white" />
          </div>
          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.5px", margin: 0 }}>
            BlastID
          </h1>
          <p style={{ fontSize: "24px", fontWeight: 700, color: "#777", letterSpacing: "3.5px", textTransform: "uppercase", marginTop: "5px" }}>
            Warehouse Management
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
          border: "1.5px solid #e0e0e0",
        }}>
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 700,
                color: "#666", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px"
              }}>
                Email or Username
              </label>
              <div style={{ position: "relative" }}>
                <User size={16} color="#bbb" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your credentials"
                  required
                  style={{
                    width: "100%", paddingLeft: "42px", paddingRight: "14px",
                    paddingTop: "13px", paddingBottom: "13px",
                    fontSize: "15px", fontWeight: 500,
                    border: "1.5px solid #e5e5e5", borderRadius: "10px",
                    background: "#fafafa", outline: "none", color: "#1a1a1a",
                    boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#2d3748"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 700,
                color: "#666", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#bbb" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", paddingLeft: "42px", paddingRight: "44px",
                    paddingTop: "13px", paddingBottom: "13px",
                    fontSize: "15px", fontWeight: 500,
                    border: "1.5px solid #e5e5e5", borderRadius: "10px",
                    background: "#fafafa", outline: "none", color: "#1a1a1a",
                    boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#2d3748"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#fafafa"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#bbb", display: "flex", alignItems: "center", padding: 0 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" style={{ width: "15px", height: "15px", accentColor: "#2d3748" }} />
                <span style={{ fontSize: "13px", color: "#888", fontWeight: 600 }}>Remember Me</span>
              </label>
              <button type="button" style={{ fontSize: "13px", color: "#888", fontWeight: 600, background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
               onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = "#2d3748"} 
               onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = "#888"}>
                Forgot Password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: "#fff5f5", border: "1.5px solid #fed7d7", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
                <p style={{ fontSize: "13px", color: "#e53e3e", fontWeight: 600, margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                background: loading ? "#718096" : "#2d3748",
                color: "white", fontWeight: 700, fontSize: "15px",
                borderRadius: "10px", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.5px", transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.background = "#1a202c"; }}
              onMouseLeave={(e) => { if (!loading) (e.target as HTMLButtonElement).style.background = "#2d3748"; }}
            >
              {loading ? "Memverifikasi..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: "28px", paddingTop: "22px", borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#aaa", margin: 0, fontWeight: 500 }}>
              Authorized Access Only.{" "}
              <span style={{ color: "#2d3748", fontWeight: 700, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target as HTMLSpanElement).style.color = "#1a202c"}
                onMouseLeave={(e) => (e.target as HTMLSpanElement).style.color = "#2d3748"}
              >
                Request Access
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: "28px" }}>
          {["Privacy Policy", "Support", "System Status"].map((item) => (
            <button key={item} style={{ fontSize: "12px", color: "#999", background: "none", border: "none", cursor: "pointer", fontWeight: 600, letterSpacing: "0.5px", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = "#2d3748"}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = "#999"}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}