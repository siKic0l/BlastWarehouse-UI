"use client";

import { useState } from "react";
import { Bell, HelpCircle, Search, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header style={{
      height: "60px",
      background: "white",
      borderBottom: "1px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 20,
      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      gap: "16px",
    }}>
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="hamburger-btn"
        style={{
          display: "none",
          width: "36px", height: "36px",
          background: "#f5f5f5", border: "none",
          borderRadius: "8px", alignItems: "center",
          justifyContent: "center", cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Menu size={18} color="#444" />
      </button>

      {/* Search */}
      <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
        <Search size={14} color="#bbb" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        <input
          type="text"
          placeholder="Search inventory, loans, or reports..."
          style={{
            width: "100%", paddingLeft: "34px", paddingRight: "14px",
            paddingTop: "8px", paddingBottom: "8px",
            fontSize: "13px",
            border: `1.5px solid ${searchFocused ? "#2d3748" : "#f0f0f0"}`,
            borderRadius: "10px",
            background: searchFocused ? "#fff" : "#fafafa",
            outline: "none", color: "#1a1a1a",
            transition: "all 0.2s", boxSizing: "border-box",
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
        <IconButton><Bell size={16} color="#888" /></IconButton>
        <IconButton><HelpCircle size={16} color="#888" /></IconButton>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" }}>
          <div style={{ textAlign: "right" }} className="user-text">
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Admin User</p>
            <p style={{ fontSize: "10px", color: "#aaa", margin: 0, fontWeight: 500 }}>WAREHOUSEMGR</p>
          </div>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "#2d3748", display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontSize: "13px", fontWeight: 700,
            flexShrink: 0,
          }}>
            A
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        width: "34px", height: "34px",
        background: hovered ? "#f5f5f5" : "transparent",
        border: "none", borderRadius: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}