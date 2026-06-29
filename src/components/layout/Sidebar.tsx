"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Package, ClipboardList,
  FileText, Settings, LogOut, Warehouse,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/loan-tracking", label: "Loan Tracking", icon: ClipboardList },
  { href: "/laporan", label: "Laporan", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);

  const content = (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#ffffff",
      borderRight: "1px solid #f0f0f0",
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    }}>
      {/* Brand */}
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #f5f5f5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", background: "#2d3748",
            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Warehouse size={18} color="white" />
          </div>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.3px" }}>BlastID</p>
            <p style={{ fontSize: "9px", fontWeight: 700, color: "#aaa", margin: 0, letterSpacing: "2px", textTransform: "uppercase" }}>Warehouse Mgmt</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const isHovered = hoveredItem === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "10px", marginBottom: "2px",
                textDecoration: "none",
                background: isActive ? "#f0f0f0" : isHovered ? "#f7f7f7" : "transparent",
                color: isActive ? "#1a1a1a" : "#666",
                transition: "all 0.15s",
              }}
              onMouseEnter={() => setHoveredItem(href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ fontSize: "14px", fontWeight: isActive ? 700 : 500 }}>{label}</span>
              {isActive && (
                <div style={{ marginLeft: "auto", width: "5px", height: "5px", borderRadius: "50%", background: "#2d3748" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid #f5f5f5" }}>

        <button
          style={{
            width: "100%", padding: "10px 12px",
            background: "transparent",
            color: hoveredLogout ? "#e53e3e" : "#aaa",
            border: "none", borderRadius: "10px",
            display: "flex", alignItems: "center", gap: "10px",
            cursor: "pointer", fontSize: "13px", fontWeight: 600,
            transition: "all 0.15s",
          }}
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop — always visible */}
      <div style={{
        display: "none",
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
      }} className="sidebar-desktop-wrapper">
        {content}
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40,
          }}
        />
      )}

      {/* Mobile sidebar */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        height: "100vh", zIndex: 50,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        display: "none",
      }} className="sidebar-mobile-wrapper">
        {content}
      </div>
    </>
  );
}