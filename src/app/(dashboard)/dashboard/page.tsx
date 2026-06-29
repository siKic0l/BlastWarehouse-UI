"use client";

import { useState } from "react";
import {
  Package, ClipboardList, CheckCircle, TrendingUp,
  Calendar, Download, ArrowUpRight,
} from "lucide-react";

// Dummy data
const statCards = [
  {
    label: "Total Items",
    value: "1,284",
    change: "+2.4%",
    changePositive: true,
    icon: Package,
    iconBg: "#f0f4ff",
    iconColor: "#4069e5",
  },
  {
    label: "Pending Loans",
    value: "48",
    change: "+4 baru",
    changePositive: false,
    icon: ClipboardList,
    iconBg: "#fff7ed",
    iconColor: "#f97316",
  },
  {
    label: "Completed Loans",
    value: "1,204",
    change: "+12%",
    changePositive: true,
    icon: CheckCircle,
    iconBg: "#f0fdf4",
    iconColor: "#22c55e",
  },
  {
    label: "Dipinjam",
    value: "3.7%",
    change: "dari total stok",
    changePositive: true,
    icon: TrendingUp,
    iconBg: "#fdf4ff",
    iconColor: "#a855f7",
  },
];

const todayTransactions = [
  { id: "TRX-20240625-001", peminjam: "Ahmad Sulaiman", tanggal: "25/06/2024", status: "Dipinjam", keperluan: "Rapat Koordinasi" },
  { id: "TRX-20240625-002", peminjam: "Budi Hartono", tanggal: "25/06/2024", status: "Selesai", keperluan: "Presentasi Client" },
  { id: "TRX-20240625-003", peminjam: "Siti Aminah", tanggal: "25/06/2024", status: "Dipinjam", keperluan: "Workshop Divisi" },
  { id: "TRX-20240625-004", peminjam: "Dian Pratama", tanggal: "25/06/2024", status: "Selesai", keperluan: "Event Outdoor" },
];

function StatCard({ label, value, change, changePositive, icon: Icon, iconBg, iconColor }: typeof statCards[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "20px 24px",
        border: `1.5px solid ${hovered ? "#e0e0e0" : "#f5f5f5"}`,
        cursor: "default",
        transition: "all 0.2s",
        boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>
            {label}
          </p>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1a1a1a", margin: "8px 0 6px", letterSpacing: "-1px" }}>
            {value}
          </h2>
          <p style={{ fontSize: "12px", fontWeight: 600, color: changePositive ? "#22c55e" : "#f97316", margin: 0 }}>
            {change}
          </p>
        </div>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: iconBg, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={20} color={iconColor} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredExport, setHoveredExport] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState(false);

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", maxWidth: "100%" }}>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>
            Warehouse Overview
          </h1>
          <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0 0", fontWeight: 500 }}>
            Real-time tracking of logistics and asset management.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {/* Filter Button */}
          <button
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px",
              background: hoveredFilter ? "#f5f5f5" : "white",
              border: "1.5px solid #e8e8e8",
              borderRadius: "10px",
              fontSize: "13px", fontWeight: 600, color: "#444",
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={() => setHoveredFilter(true)}
            onMouseLeave={() => setHoveredFilter(false)}
          >
            <Calendar size={14} /> Last 30 Days
          </button>

          {/* Export Button */}
          <button
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px",
              background: hoveredExport ? "#1a202c" : "#2d3748",
              border: "none",
              borderRadius: "10px",
              fontSize: "13px", fontWeight: 700, color: "white",
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={() => setHoveredExport(true)}
            onMouseLeave={() => setHoveredExport(false)}
          >
            <Download size={14} /> Ekspor Data
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginBottom: "28px",
      }}>
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Today's Transactions */}
      <div style={{
        background: "white",
        borderRadius: "16px",
        border: "1.5px solid #f5f5f5",
        overflow: "hidden",
      }}>
        {/* Table Header */}
        <div style={{
          padding: "18px 24px",
          borderBottom: "1px solid #f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
              Transaksi Hari Ini
            </h3>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 0", fontWeight: 500 }}>
              {todayTransactions.length} transaksi ditemukan
            </p>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: "4px",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "12px", fontWeight: 700, color: "#2d3748",
          }}>
            View All <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["ID Transaksi", "Peminjam", "Tanggal", "Status", "Keperluan"].map((col) => (
                  <th key={col} style={{
                    padding: "11px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#aaa",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todayTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "48px", textAlign: "center", color: "#ccc", fontSize: "14px", fontWeight: 600 }}>
                    Belum ada transaksi hari ini
                  </td>
                </tr>
              ) : (
                todayTransactions.map((trx) => (
                  <tr
                    key={trx.id}
                    style={{
                      borderTop: "1px solid #f5f5f5",
                      background: hoveredRow === trx.id ? "#fafafa" : "white",
                      transition: "background 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredRow(trx.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#2d3748", fontFamily: "monospace" }}>
                        {trx.id}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 600, color: "#1a1a1a", whiteSpace: "nowrap" }}>
                      {trx.peminjam}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#888", whiteSpace: "nowrap" }}>
                      {trx.tanggal}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 700,
                        background: trx.status === "Dipinjam" ? "#fff7ed" : "#f0fdf4",
                        color: trx.status === "Dipinjam" ? "#f97316" : "#22c55e",
                        whiteSpace: "nowrap",
                      }}>
                        {trx.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#888" }}>
                      {trx.keperluan}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}