"use client";

import { useState } from "react";
import {
  ClipboardList, Clock, AlertTriangle, Search,
  Download, Plus, Eye, Trash2, X, ChevronLeft,
  ChevronRight, RotateCcw, ShoppingCart, Minus,
} from "lucide-react";

// Types
type StatusType = "In Progress" | "Returned" | "Overdue";
type KondisiType = "Baik" | "Rusak Ringan" | "Rusak Berat" | "Hilang";

interface DetailItem {
  barangId: string;
  namaBarang: string;
  jumlah: number;
  satuan: string;
  status: "Dipinjam" | "Kembali";
  kondisiKembali?: KondisiType;
}

interface Transaksi {
  id: string;
  peminjam: string;
  keperluan: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  staff: string;
  status: StatusType;
  items: DetailItem[];
}

interface Barang {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  stok: number;
  satuan: string;
}

// Dummy Data
const dummyBarang: Barang[] = [
  { id: "1", kode: "ELK-001", nama: "Precision Laptop X1", kategori: "Elektronik", stok: 10, satuan: "Unit" },
  { id: "2", kode: "ELK-002", nama: "Proyektor Epson EB-X51", kategori: "Elektronik", stok: 3, satuan: "Unit" },
  { id: "3", kode: "MBL-001", nama: "Ergonomic Office Chair", kategori: "Meubel", stok: 5, satuan: "Pcs" },
  { id: "4", kode: "ATK-001", nama: "Spidol Whiteboard Hitam", kategori: "ATK", stok: 50, satuan: "Pcs" },
  { id: "5", kode: "ELK-003", nama: "Kamera Sony A7 IV", kategori: "Elektronik", stok: 2, satuan: "Unit" },
  { id: "6", kode: "ELK-004", nama: "Microphone Shure SM58", kategori: "Elektronik", stok: 6, satuan: "Unit" },
];

const dummyPeminjam = ["Ahmad Sulaiman", "Budi Hartono", "Siti Aminah", "Dian Pratama", "Rudi Hermawan"];

const dummyTransaksi: Transaksi[] = [
  {
    id: "TRX-20240625-001", peminjam: "Ahmad Sulaiman", keperluan: "Rapat Koordinasi",
    tanggalPinjam: "25/06/2024", tanggalKembali: "26/06/2024", staff: "Admin User", status: "Overdue",
    items: [
      { barangId: "1", namaBarang: "Precision Laptop X1", jumlah: 1, satuan: "Unit", status: "Dipinjam" },
      { barangId: "2", namaBarang: "Proyektor Epson EB-X51", jumlah: 1, satuan: "Unit", status: "Dipinjam" },
    ],
  },
  {
    id: "TRX-20240625-002", peminjam: "Budi Hartono", keperluan: "Presentasi Client",
    tanggalPinjam: "25/06/2024", tanggalKembali: "28/06/2024", staff: "Staff Gudang", status: "In Progress",
    items: [
      { barangId: "5", namaBarang: "Kamera Sony A7 IV", jumlah: 2, satuan: "Unit", status: "Dipinjam" },
    ],
  },
  {
    id: "TRX-20240624-001", peminjam: "Siti Aminah", keperluan: "Workshop Divisi",
    tanggalPinjam: "24/06/2024", tanggalKembali: "24/06/2024", staff: "Admin User", status: "Returned",
    items: [
      { barangId: "3", namaBarang: "Ergonomic Office Chair", jumlah: 3, satuan: "Pcs", status: "Kembali", kondisiKembali: "Baik" },
    ],
  },
  {
    id: "TRX-20240624-002", peminjam: "Dian Pratama", keperluan: "Event Outdoor",
    tanggalPinjam: "24/06/2024", tanggalKembali: "25/06/2024", staff: "Staff Gudang", status: "Returned",
    items: [
      { barangId: "6", namaBarang: "Microphone Shure SM58", jumlah: 2, satuan: "Unit", status: "Kembali", kondisiKembali: "Rusak Ringan" },
    ],
  },
  {
    id: "TRX-20240623-001", peminjam: "Rudi Hermawan", keperluan: "Training Internal",
    tanggalPinjam: "23/06/2024", tanggalKembali: "30/06/2024", staff: "Admin User", status: "In Progress",
    items: [
      { barangId: "1", namaBarang: "Precision Laptop X1", jumlah: 3, satuan: "Unit", status: "Dipinjam" },
      { barangId: "4", namaBarang: "Spidol Whiteboard Hitam", jumlah: 10, satuan: "Pcs", status: "Dipinjam" },
    ],
  },
];

const ITEMS_PER_PAGE = 5;

function getStatusStyle(status: StatusType) {
  switch (status) {
    case "In Progress": return { bg: "#eff6ff", color: "#3b82f6", label: "In Progress" };
    case "Returned": return { bg: "#f0fdf4", color: "#22c55e", label: "Returned" };
    case "Overdue": return { bg: "#fff1f1", color: "#e53e3e", label: "Overdue" };
  }
}

// Stat Card
function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor, alert }: {
  label: string; value: number; sub: string;
  icon: any; iconBg: string; iconColor: string; alert?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: "white", borderRadius: "16px", padding: "20px 24px",
        border: `1.5px solid ${alert ? "#fee2e2" : hovered ? "#e0e0e0" : "#f5f5f5"}`,
        transition: "all 0.2s",
        boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>{label}</p>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: alert ? "#e53e3e" : "#1a1a1a", margin: "8px 0 4px", letterSpacing: "-1px" }}>{value}</h2>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#aaa", margin: 0 }}>{sub}</p>
        </div>
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={20} color={iconColor} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

// Modal Detail
function ModalDetail({ trx, onClose }: { trx: Transaksi; onClose: () => void }) {
  const statusStyle = getStatusStyle(trx.status);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>Detail Transaksi</h3>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 0", fontFamily: "monospace" }}>{trx.id}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>

        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {/* Info */}
          <div style={{ background: "#f9f9f9", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { label: "Peminjam", value: trx.peminjam },
                { label: "Staff", value: trx.staff },
                { label: "Tanggal Pinjam", value: trx.tanggalPinjam },
                { label: "Tanggal Kembali", value: trx.tanggalKembali },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 3px" }}>{label}</p>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{value}</p>
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 3px" }}>Keperluan</p>
                <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>{trx.keperluan}</p>
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 3px" }}>Status</p>
                <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: statusStyle.bg, color: statusStyle.color }}>
                  {statusStyle.label}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>Daftar Barang</p>
          <div style={{ border: "1.5px solid #f0f0f0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  {["Nama Barang", "Jumlah", "Status", "Kondisi Kembali"].map(col => (
                    <th key={col} style={{ padding: "10px 14px", textAlign: "left", fontSize: "10px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trx.items.map((item, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "12px 14px", fontSize: "13px", fontWeight: 600, color: "#1a1a1a" }}>{item.namaBarang}</td>
                    <td style={{ padding: "12px 14px", fontSize: "13px", color: "#555" }}>{item.jumlah} {item.satuan}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{
                        display: "inline-block", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 700,
                        background: item.status === "Dipinjam" ? "#fff7ed" : "#f0fdf4",
                        color: item.status === "Dipinjam" ? "#f97316" : "#22c55e",
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {item.kondisiKembali ? (
                        <span style={{
                          display: "inline-block", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 700,
                          background: item.kondisiKembali === "Baik" ? "#f0fdf4" : item.kondisiKembali === "Hilang" ? "#f3f4f6" : "#fff1f1",
                          color: item.kondisiKembali === "Baik" ? "#22c55e" : item.kondisiKembali === "Hilang" ? "#6b7280" : "#e53e3e",
                        }}>
                          {item.kondisiKembali}
                        </span>
                      ) : <span style={{ fontSize: "12px", color: "#ccc" }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #f5f5f5", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 24px", background: "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Kembalikan
function ModalKembali({ trx, onClose, onConfirm }: {
  trx: Transaksi;
  onClose: () => void;
  onConfirm: (items: { barangId: string; kondisi: KondisiType }[]) => void;
}) {
  const dipinjam = trx.items.filter(i => i.status === "Dipinjam");
  const [kondisiMap, setKondisiMap] = useState<Record<string, KondisiType>>(
    Object.fromEntries(dipinjam.map(i => [i.barangId, "Baik"]))
  );

  const kondisiOptions: KondisiType[] = ["Baik", "Rusak Ringan", "Rusak Berat", "Hilang"];

  const getKondisiStyle = (k: KondisiType) => {
    if (k === "Baik") return { bg: "#f0fdf4", color: "#22c55e" };
    if (k === "Hilang") return { bg: "#f3f4f6", color: "#6b7280" };
    return { bg: "#fff1f1", color: "#e53e3e" };
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>Proses Pengembalian</h3>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 0" }}>Tentukan kondisi setiap barang yang dikembalikan</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>

        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
            <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
              <strong style={{ color: "#1a1a1a" }}>{trx.peminjam}</strong> — {trx.keperluan}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {dipinjam.map((item) => {
              const kondisi = kondisiMap[item.barangId];
              const style = getKondisiStyle(kondisi);
              return (
                <div key={item.barangId} style={{ border: "1.5px solid #f0f0f0", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{item.namaBarang}</p>
                      <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 0" }}>Jumlah: {item.jumlah} {item.satuan}</p>
                    </div>
                    <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: style.bg, color: style.color }}>
                      {kondisi}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {kondisiOptions.map(k => {
                      const s = getKondisiStyle(k);
                      const isSelected = kondisi === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setKondisiMap(prev => ({ ...prev, [item.barangId]: k }))}
                          style={{
                            padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                            border: `1.5px solid ${isSelected ? s.color : "#e8e8e8"}`,
                            background: isSelected ? s.bg : "white",
                            color: isSelected ? s.color : "#888",
                            cursor: "pointer", transition: "all 0.15s",
                          }}
                        >
                          {k}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #f5f5f5", display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm(Object.entries(kondisiMap).map(([barangId, kondisi]) => ({ barangId, kondisi })));
              onClose();
            }}
            style={{ flex: 1, padding: "11px", background: "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
          >
            Konfirmasi Pengembalian
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Tambah Transaksi
function ModalTambah({ onClose, onSave }: { onClose: () => void; onSave: (data: any) => void }) {
  const [peminjam, setPeminjam] = useState("");
  const [peminjamBaru, setPeminjamBaru] = useState("");
  const [showPeminjamBaru, setShowPeminjamBaru] = useState(false);
  const [keperluan, setKeperluan] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [cart, setCart] = useState<{ barang: Barang; jumlah: number }[]>([]);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [searchBarang, setSearchBarang] = useState("");

  const filteredBarang = dummyBarang.filter(b =>
    b.nama.toLowerCase().includes(searchBarang.toLowerCase()) &&
    !cart.find(c => c.barang.id === b.id)
  );

  const addToCart = (barang: Barang) => {
    setCart(prev => [...prev, { barang, jumlah: 1 }]);
    setSearchBarang("");
    setSelectedBarang("");
  };

  const updateJumlah = (id: string, val: number) => {
    setCart(prev => prev.map(c => c.barang.id === id ? { ...c, jumlah: Math.max(1, Math.min(val, c.barang.stok)) } : c));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.barang.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPeminjam = showPeminjamBaru ? peminjamBaru : peminjam;
    if (!finalPeminjam || cart.length === 0) return;
    onSave({ peminjam: finalPeminjam, keperluan, tanggalKembali, items: cart });
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", fontSize: "13px",
    border: "1.5px solid #e8e8e8", borderRadius: "10px",
    background: "#fafafa", outline: "none", color: "#1a1a1a",
    boxSizing: "border-box" as const, fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block" as const, fontSize: "11px", fontWeight: 700 as const,
    color: "#888", letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "640px", maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>Tambah Transaksi Peminjaman</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <div style={{ padding: "24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Peminjam */}
            <div>
              <label style={labelStyle}>Nama Peminjam</label>
              {!showPeminjamBaru ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    required={!showPeminjamBaru}
                    style={{ ...inputStyle, flex: 1, cursor: "pointer" }}
                    value={peminjam}
                    onChange={e => setPeminjam(e.target.value)}
                  >
                    <option value="">-- Pilih Peminjam --</option>
                    {dummyPeminjam.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowPeminjamBaru(true)}
                    style={{ padding: "10px 14px", background: "#f5f5f5", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "12px", fontWeight: 700, color: "#555", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    + Baru
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    required
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder="Nama peminjam baru..."
                    value={peminjamBaru}
                    onChange={e => setPeminjamBaru(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => { setShowPeminjamBaru(false); setPeminjamBaru(""); }}
                    style={{ padding: "10px 14px", background: "#f5f5f5", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "12px", fontWeight: 700, color: "#555", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Batal
                  </button>
                </div>
              )}
            </div>

            {/* Keperluan */}
            <div>
              <label style={labelStyle}>Keperluan</label>
              <textarea
                style={{ ...inputStyle, resize: "none", minHeight: "80px" }}
                placeholder="Contoh: Rapat Koordinasi Divisi Marketing..."
                value={keperluan}
                onChange={e => setKeperluan(e.target.value)}
              />
            </div>

            {/* Tanggal Kembali */}
            <div>
              <label style={labelStyle}>Tanggal Kembali</label>
              <input
                type="date"
                style={{ ...inputStyle, cursor: "pointer" }}
                value={tanggalKembali}
                onChange={e => setTanggalKembali(e.target.value)}
              />
            </div>

            {/* Pilih Barang */}
            <div>
              <label style={labelStyle}>Pilih Barang</label>
              <div style={{ position: "relative" }}>
                <Search size={14} color="#bbb" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  style={{ ...inputStyle, paddingLeft: "34px" }}
                  placeholder="Cari nama barang..."
                  value={searchBarang}
                  onChange={e => setSearchBarang(e.target.value)}
                />
              </div>
              {searchBarang && filteredBarang.length > 0 && (
                <div style={{ border: "1.5px solid #e8e8e8", borderRadius: "10px", marginTop: "6px", overflow: "hidden", background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                  {filteredBarang.slice(0, 5).map(b => (
                    <div
                      key={b.id}
                      onClick={() => addToCart(b)}
                      style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f5f5f5" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f9f9f9")}
                      onMouseLeave={e => (e.currentTarget.style.background = "white")}
                    >
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{b.nama}</p>
                        <p style={{ fontSize: "11px", color: "#aaa", margin: "1px 0 0" }}>{b.kode} • {b.kategori}</p>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#22c55e" }}>Stok: {b.stok}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            {cart.length > 0 && (
              <div>
                <label style={labelStyle}>Keranjang Pinjam ({cart.length} item)</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {cart.map(({ barang, jumlah }) => (
                    <div key={barang.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", background: "#f9f9f9", borderRadius: "10px", border: "1.5px solid #f0f0f0" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{barang.nama}</p>
                        <p style={{ fontSize: "11px", color: "#aaa", margin: "1px 0 0" }}>Stok tersedia: {barang.stok} {barang.satuan}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <button type="button" onClick={() => updateJumlah(barang.id, jumlah - 1)} style={{ width: "26px", height: "26px", border: "1.5px solid #e8e8e8", borderRadius: "6px", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Minus size={12} />
                        </button>
                        <input
                          type="number" min={1} max={barang.stok} value={jumlah}
                          onChange={e => updateJumlah(barang.id, Number(e.target.value))}
                          style={{ width: "48px", textAlign: "center", padding: "4px", fontSize: "13px", fontWeight: 700, border: "1.5px solid #e8e8e8", borderRadius: "6px", outline: "none" }}
                        />
                        <button type="button" onClick={() => updateJumlah(barang.id, jumlah + 1)} style={{ width: "26px", height: "26px", border: "1.5px solid #e8e8e8", borderRadius: "6px", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(barang.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e53e3e", display: "flex", alignItems: "center" }}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cart.length === 0 && !searchBarang && (
              <div style={{ padding: "24px", textAlign: "center", background: "#fafafa", borderRadius: "12px", border: "1.5px dashed #e8e8e8" }}>
                <ShoppingCart size={28} color="#ddd" style={{ marginBottom: "8px" }} />
                <p style={{ fontSize: "13px", color: "#ccc", fontWeight: 600, margin: 0 }}>Belum ada barang dipilih</p>
              </div>
            )}
          </div>

          <div style={{ padding: "16px 24px", borderTop: "1px solid #f5f5f5", display: "flex", gap: "10px" }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Batal
            </button>
            <button
              type="submit"
              disabled={cart.length === 0}
              style={{ flex: 1, padding: "11px", background: cart.length === 0 ? "#ccc" : "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: cart.length === 0 ? "not-allowed" : "pointer" }}
            >
              Proses Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Delete
function ModalDelete({ trx, onClose, onConfirm }: { trx: Transaksi; onClose: () => void; onConfirm: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "400px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "32px 24px 24px", textAlign: "center" }}>
          <div style={{ width: "52px", height: "52px", background: "#fff1f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Trash2 size={22} color="#e53e3e" />
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1a1a1a", margin: "0 0 8px" }}>Hapus Transaksi?</h3>
          <p style={{ fontSize: "13px", color: "#888", margin: 0, lineHeight: 1.6 }}>
            Transaksi <strong>{trx.id}</strong> akan dihapus permanen.
          </p>
        </div>
        <div style={{ padding: "0 24px 24px", display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Batal</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "11px", background: "#e53e3e", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
}

// Action Button
function ActionBtn({ icon, onClick, title, color }: { icon: React.ReactNode; onClick: () => void; title: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} title={title}
      style={{ width: "30px", height: "30px", background: hovered ? color : "#f5f5f5", border: "none", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s", color: hovered ? "white" : "#888" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {icon}
    </button>
  );
}

// Page Btn
function PageBtn({ children, onClick, disabled, active }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; active?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ minWidth: "30px", height: "30px", padding: "0 8px", background: active ? "#2d3748" : hovered ? "#f5f5f5" : "white", border: "1.5px solid #e8e8e8", borderRadius: "7px", fontSize: "12px", fontWeight: 700, color: active ? "white" : disabled ? "#ccc" : "#555", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
      onMouseEnter={() => !disabled && setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

// Main Page
export default function LoanTrackingPage() {
  const [transaksi, setTransaksi] = useState(dummyTransaksi);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [modalDetail, setModalDetail] = useState<Transaksi | null>(null);
  const [modalKembali, setModalKembali] = useState<Transaksi | null>(null);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalDelete, setModalDelete] = useState<Transaksi | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const isAdmin = true;

  const filtered = transaksi.filter(t => {
    const matchSearch = t.peminjam.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalActive = transaksi.filter(t => t.status === "In Progress" || t.status === "Overdue").length;
  const inProgress = transaksi.filter(t => t.status === "In Progress").length;
  const overdue = transaksi.filter(t => t.status === "Overdue").length;

  const handleKembali = (id: string, items: { barangId: string; kondisi: KondisiType }[]) => {
    setTransaksi(prev => prev.map(t => {
      if (t.id !== id) return t;
      const updatedItems = t.items.map(item => {
        const found = items.find(i => i.barangId === item.barangId);
        return found ? { ...item, status: "Kembali" as const, kondisiKembali: found.kondisi } : item;
      });
      const allReturned = updatedItems.every(i => i.status === "Kembali");
      return { ...t, items: updatedItems, status: allReturned ? "Returned" : t.status };
    }));
  };

  const handleSaveTambah = (data: any) => {
    const newTrx: Transaksi = {
      id: `TRX-${Date.now()}`,
      peminjam: data.peminjam,
      keperluan: data.keperluan,
      tanggalPinjam: new Date().toLocaleDateString("id-ID"),
      tanggalKembali: data.tanggalKembali || "-",
      staff: "Admin User",
      status: "In Progress",
      items: data.items.map((c: any) => ({
        barangId: c.barang.id,
        namaBarang: c.barang.nama,
        jumlah: c.jumlah,
        satuan: c.barang.satuan,
        status: "Dipinjam",
      })),
    };
    setTransaksi(prev => [newTrx, ...prev]);
  };

  const handleDelete = () => {
    if (modalDelete) {
      setTransaksi(prev => prev.filter(t => t.id !== modalDelete.id));
      setModalDelete(null);
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>Loan Tracking</h1>
          <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0 0", fontWeight: 500 }}>Monitor active assets and equipment distributions.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "export" ? "#f5f5f5" : "white", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "13px", fontWeight: 600, color: "#444", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={() => setHoveredBtn("export")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Download size={14} /> Export
          </button>
          <button
            onClick={() => setModalTambah(true)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "tambah" ? "#1a202c" : "#2d3748", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={() => setHoveredBtn("tambah")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Plus size={14} /> Tambah Transaksi
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <StatCard label="Total Active Loans" value={totalActive} sub="Dipinjam & overdue" icon={ClipboardList} iconBg="#eff6ff" iconColor="#3b82f6" />
        <StatCard label="In Progress" value={inProgress} sub="Belum jatuh tempo" icon={Clock} iconBg="#f0fdf4" iconColor="#22c55e" />
        <StatCard label="Overdue Items" value={overdue} sub="Melewati tanggal kembali" icon={AlertTriangle} iconBg="#fff1f1" iconColor="#e53e3e" alert={overdue > 0} />
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid #f5f5f5", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search size={14} color="#bbb" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Cari peminjam atau ID transaksi..."
              style={{ width: "100%", paddingLeft: "34px", paddingRight: "12px", paddingTop: "9px", paddingBottom: "9px", fontSize: "13px", border: "1.5px solid #f0f0f0", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {["Semua", "In Progress", "Returned", "Overdue"].map(s => (
              <button
                key={s}
                onClick={() => { setFilterStatus(s); setCurrentPage(1); }}
                style={{
                  padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                  border: `1.5px solid ${filterStatus === s ? "#2d3748" : "#e8e8e8"}`,
                  background: filterStatus === s ? "#2d3748" : "white",
                  color: filterStatus === s ? "white" : "#666",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["ID Transaksi", "Peminjam", "Tgl Pinjam", "Tgl Kembali", "Staff", "Status", "Actions"].map(col => (
                  <th key={col} style={{ padding: "11px 20px", textAlign: col === "Actions" ? "right" : "left", fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#ccc", fontSize: "14px", fontWeight: 600 }}>
                    Tidak ada transaksi ditemukan
                  </td>
                </tr>
              ) : paginated.map(t => {
                const statusStyle = getStatusStyle(t.status);
                return (
                  <tr
                    key={t.id}
                    style={{ borderTop: "1px solid #f5f5f5", background: hoveredRow === t.id ? "#fafafa" : "white", transition: "background 0.15s" }}
                    onMouseEnter={() => setHoveredRow(t.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#2d3748", fontFamily: "monospace", background: "#f5f5f5", padding: "3px 8px", borderRadius: "6px" }}>{t.id}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{t.peminjam}</p>
                      <p style={{ fontSize: "11px", color: "#aaa", margin: "1px 0 0" }}>{t.items.length} item</p>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#888", whiteSpace: "nowrap" }}>{t.tanggalPinjam}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 600, color: t.status === "Overdue" ? "#e53e3e" : "#888", whiteSpace: "nowrap" }}>{t.tanggalKembali}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#555", whiteSpace: "nowrap" }}>{t.staff}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: statusStyle.bg, color: statusStyle.color }}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <ActionBtn icon={<Eye size={14} />} onClick={() => setModalDetail(t)} title="Detail" color="#4069e5" />
                        {(t.status === "In Progress" || t.status === "Overdue") && (
                          <ActionBtn icon={<RotateCcw size={14} />} onClick={() => setModalKembali(t)} title="Kembalikan" color="#22c55e" />
                        )}
                        {isAdmin && (
                          <ActionBtn icon={<Trash2 size={14} />} onClick={() => setModalDelete(t)} title="Hapus" color="#e53e3e" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid #f5f5f5", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <p style={{ fontSize: "12px", color: "#aaa", fontWeight: 600, margin: 0 }}>
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </p>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <PageBtn disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={14} /></PageBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageBtn key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>{page}</PageBtn>
            ))}
            <PageBtn disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={14} /></PageBtn>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalDetail && <ModalDetail trx={modalDetail} onClose={() => setModalDetail(null)} />}
      {modalKembali && <ModalKembali trx={modalKembali} onClose={() => setModalKembali(null)} onConfirm={(items) => handleKembali(modalKembali.id, items)} />}
      {modalTambah && <ModalTambah onClose={() => setModalTambah(false)} onSave={handleSaveTambah} />}
      {modalDelete && <ModalDelete trx={modalDelete} onClose={() => setModalDelete(null)} onConfirm={handleDelete} />}
    </div>
  );
}