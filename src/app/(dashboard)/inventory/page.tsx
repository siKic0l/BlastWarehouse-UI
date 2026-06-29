"use client";

import { useState } from "react";
import {
  Package, ClipboardList, AlertTriangle,
  Search, Filter, Download, Plus,
  Eye, Pencil, Trash2, X, ChevronLeft, ChevronRight,
} from "lucide-react";

// Dummy Data
const dummyBarang = [
  { id: "1", kode: "ELK-001", nama: "Precision Laptop X1", kategori: "Elektronik", stok: 10, stokRusak: 1, stokMaintenance: 0, stokHilang: 0, satuan: "Unit", kondisi: "BAIK", lokasi: "R-12-B" },
  { id: "2", kode: "ELK-002", nama: "Proyektor Epson EB-X51", kategori: "Elektronik", stok: 3, stokRusak: 1, stokMaintenance: 1, stokHilang: 0, satuan: "Unit", kondisi: "BAIK", lokasi: "R-08-A" },
  { id: "3", kode: "MBL-001", nama: "Ergonomic Office Chair", kategori: "Meubel", stok: 0, stokRusak: 2, stokMaintenance: 0, stokHilang: 1, satuan: "Pcs", kondisi: "RUSAK", lokasi: "W-04-A" },
  { id: "4", kode: "ATK-001", nama: "Spidol Whiteboard Hitam", kategori: "ATK", stok: 50, stokRusak: 0, stokMaintenance: 0, stokHilang: 0, satuan: "Pcs", kondisi: "BAIK", lokasi: "L-01-C" },
  { id: "5", kode: "ELK-003", nama: "Kamera Sony A7 IV", kategori: "Elektronik", stok: 2, stokRusak: 0, stokMaintenance: 1, stokHilang: 0, satuan: "Unit", kondisi: "BAIK", lokasi: "R-05-B" },
  { id: "6", kode: "MBL-002", nama: "Meja Rapat Kayu Jati", kategori: "Meubel", stok: 5, stokRusak: 0, stokMaintenance: 0, stokHilang: 0, satuan: "Pcs", kondisi: "BAIK", lokasi: "A-02-A" },
  { id: "7", kode: "ATK-002", nama: "Kertas HVS A4", kategori: "ATK", stok: 200, stokRusak: 0, stokMaintenance: 0, stokHilang: 0, satuan: "Rim", kondisi: "BAIK", lokasi: "L-01-A" },
  { id: "8", kode: "ELK-004", nama: "Microphone Shure SM58", kategori: "Elektronik", stok: 6, stokRusak: 0, stokMaintenance: 2, stokHilang: 1, satuan: "Unit", kondisi: "BAIK", lokasi: "R-10-C" },
];

const kategoriList = ["Semua", "Elektronik", "Meubel", "ATK"];
const ITEMS_PER_PAGE = 5;

function getStatus(stok: number) {
  if (stok === 0) return { label: "Out of Stock", bg: "#fff1f1", color: "#e53e3e" };
  if (stok <= 3) return { label: "Low Stock", bg: "#fff7ed", color: "#f97316" };
  return { label: "In Stock", bg: "#f0fdf4", color: "#22c55e" };
}

// Stat Card
function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor, alert }: {
  label: string; value: string | number; sub: string;
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
function ModalDetail({ item, onClose }: { item: typeof dummyBarang[0]; onClose: () => void }) {
  const status = getStatus(item.stok);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "480px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>Detail Barang</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }}><X size={20} /></button>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { label: "Nama Barang", value: item.nama },
              { label: "Kode", value: item.kode },
              { label: "Kategori", value: item.kategori },
              { label: "Lokasi", value: item.lokasi },
              { label: "Satuan", value: item.satuan },
              { label: "Kondisi", value: item.kondisi },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px", padding: "16px", background: "#f9f9f9", borderRadius: "12px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px" }}>Stok Detail</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
              {[
                { label: "Ready", value: item.stok, color: "#22c55e" },
                { label: "Rusak", value: item.stokRusak, color: "#e53e3e" },
                { label: "Maintenance", value: item.stokMaintenance, color: "#f97316" },
                { label: "Hilang", value: item.stokHilang, color: "#6b7280" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color, margin: 0 }}>{value}</p>
                  <p style={{ fontSize: "11px", color: "#aaa", fontWeight: 600, margin: "2px 0 0" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Status</p>
            <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, background: status.bg, color: status.color }}>
              {status.label}
            </span>
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

// Modal Tambah/Edit
function ModalForm({ item, onClose, onSave }: { item?: typeof dummyBarang[0] | null; onClose: () => void; onSave: (data: any) => void }) {
  const [form, setForm] = useState({
    nama: item?.nama || "",
    kategori: item?.kategori || "",
    stok: item?.stok || 0,
    stokRusak: item?.stokRusak || 0,
    stokMaintenance: item?.stokMaintenance || 0,
    satuan: item?.satuan || "Pcs",
    kondisi: item?.kondisi || "BAIK",
    lokasi: item?.lokasi || "Gudang Utama",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", fontSize: "13px",
    border: "1.5px solid #e8e8e8", borderRadius: "10px",
    background: "#fafafa", outline: "none", color: "#1a1a1a",
    boxSizing: "border-box" as const, fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block" as const, fontSize: "11px", fontWeight: 700,
    color: "#888", letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>{item ? "Edit Barang" : "Tambah Barang Baru"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Nama Barang</label>
              <input required style={inputStyle} value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama barang..." />
            </div>
            <div>
              <label style={labelStyle}>Kategori</label>
              <select required style={{ ...inputStyle, cursor: "pointer" }} value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })}>
                <option value="">-- Pilih --</option>
                {["Elektronik", "Meubel", "ATK", "Lainnya"].map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Satuan</label>
              <input style={inputStyle} value={form.satuan} onChange={e => setForm({ ...form, satuan: e.target.value })} placeholder="Pcs, Unit, Rim..." />
            </div>
            <div>
              <label style={labelStyle}>Stok Ready</label>
              <input type="number" min={0} style={inputStyle} value={form.stok} onChange={e => setForm({ ...form, stok: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Stok Rusak</label>
              <input type="number" min={0} style={inputStyle} value={form.stokRusak} onChange={e => setForm({ ...form, stokRusak: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Maintenance</label>
              <input type="number" min={0} style={inputStyle} value={form.stokMaintenance} onChange={e => setForm({ ...form, stokMaintenance: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Kondisi</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.kondisi} onChange={e => setForm({ ...form, kondisi: e.target.value })}>
                {["BAIK", "RUSAK", "MAINTENANCE"].map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Lokasi</label>
              <input style={inputStyle} value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} placeholder="R-12-B, Gudang Utama..." />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f5f5f5" }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Batal
            </button>
            <button type="submit" style={{ flex: 1, padding: "11px", background: "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              {item ? "Simpan Perubahan" : "Tambah Barang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Konfirmasi Hapus
function ModalDelete({ item, onClose, onConfirm }: { item: typeof dummyBarang[0]; onClose: () => void; onConfirm: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "400px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "32px 24px 24px", textAlign: "center" }}>
          <div style={{ width: "52px", height: "52px", background: "#fff1f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Trash2 size={22} color="#e53e3e" />
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1a1a1a", margin: "0 0 8px" }}>Hapus Barang?</h3>
          <p style={{ fontSize: "13px", color: "#888", margin: 0, lineHeight: 1.6 }}>
            <strong>{item.nama}</strong> akan dihapus permanen dan tidak bisa dikembalikan.
          </p>
        </div>
        <div style={{ padding: "0 24px 24px", display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Batal
          </button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "11px", background: "#e53e3e", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [barang, setBarang] = useState(dummyBarang);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [modalDetail, setModalDetail] = useState<typeof dummyBarang[0] | null>(null);
  const [modalForm, setModalForm] = useState<{ open: boolean; item?: typeof dummyBarang[0] | null }>({ open: false });
  const [modalDelete, setModalDelete] = useState<typeof dummyBarang[0] | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // Role simulasi — nanti dari session
  const isAdmin = true;

  // Filter
  const filtered = barang.filter(b => {
    const matchSearch = b.nama.toLowerCase().includes(search.toLowerCase()) || b.kode.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKategori === "Semua" || b.kategori === filterKategori;
    return matchSearch && matchKat;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Stats
  const totalItems = barang.length;
  const activeLoans = 45; // dummy
  const unavailable = barang.reduce((acc, b) => acc + b.stokRusak + b.stokMaintenance, 0);

  const handleSave = (data: any) => {
    if (modalForm.item) {
      setBarang(prev => prev.map(b => b.id === modalForm.item!.id ? { ...b, ...data } : b));
    } else {
      const newItem = { ...data, id: String(Date.now()), kode: `NEW-${Date.now()}` };
      setBarang(prev => [...prev, newItem]);
    }
  };

  const handleDelete = () => {
    if (modalDelete) {
      setBarang(prev => prev.filter(b => b.id !== modalDelete.id));
      setModalDelete(null);
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>Inventory List</h1>
          <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0 0", fontWeight: 500 }}>Monitor and manage your warehouse assets in real-time.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "export" ? "#f5f5f5" : "white", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "13px", fontWeight: 600, color: "#444", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={() => setHoveredBtn("export")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Download size={14} /> Export CSV
          </button>
          {isAdmin && (
            <button
              onClick={() => setModalForm({ open: true, item: null })}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "tambah" ? "#1a202c" : "#2d3748", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={() => setHoveredBtn("tambah")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <Plus size={14} /> Tambah Barang
            </button>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <StatCard label="Total Items" value={totalItems} sub="Semua barang terdaftar" icon={Package} iconBg="#f0f4ff" iconColor="#4069e5" />
        <StatCard label="Active Loans" value={activeLoans} sub="Sedang dipinjam" icon={ClipboardList} iconBg="#fff7ed" iconColor="#f97316" />
        <StatCard label="Items Unavailable" value={unavailable} sub="Rusak & maintenance" icon={AlertTriangle} iconBg="#fff1f1" iconColor="#e53e3e" alert={unavailable > 0} />
      </div>

      {/* Table Card */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid #f5f5f5", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search size={14} color="#bbb" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Cari nama atau kode barang..."
              style={{ width: "100%", paddingLeft: "34px", paddingRight: "12px", paddingTop: "9px", paddingBottom: "9px", fontSize: "13px", border: "1.5px solid #f0f0f0", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" }}
            />
          </div>
          {/* Filter Kategori */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {kategoriList.map(k => (
              <button
                key={k}
                onClick={() => { setFilterKategori(k); setCurrentPage(1); }}
                style={{
                  padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                  border: `1.5px solid ${filterKategori === k ? "#2d3748" : "#e8e8e8"}`,
                  background: filterKategori === k ? "#2d3748" : "white",
                  color: filterKategori === k ? "white" : "#666",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["Product Name", "SKU / Kode", "Category", "Lokasi", "Detail Stock", "Actions"].map(col => (
                  <th key={col} style={{ padding: "11px 20px", textAlign: col === "Actions" ? "right" : "left", fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px", textAlign: "center", color: "#ccc", fontSize: "14px", fontWeight: 600 }}>
                    Tidak ada barang ditemukan
                  </td>
                </tr>
              ) : paginated.map(b => {
                const status = getStatus(b.stok);
                return (
                  <tr
                    key={b.id}
                    style={{ borderTop: "1px solid #f5f5f5", background: hoveredRow === b.id ? "#fafafa" : "white", transition: "background 0.15s" }}
                    onMouseEnter={() => setHoveredRow(b.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "36px", height: "36px", background: "#f5f5f5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Package size={16} color="#aaa" />
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{b.nama}</p>
                          <p style={{ fontSize: "11px", color: "#aaa", margin: "2px 0 0" }}>{b.kategori}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#2d3748", fontFamily: "monospace", background: "#f5f5f5", padding: "3px 8px", borderRadius: "6px" }}>{b.kode}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#555", background: "#f5f5f5", padding: "3px 10px", borderRadius: "20px" }}>{b.kategori}</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#888", fontWeight: 500 }}>{b.lokasi}</td>
                    <td style={{ padding: "12px 20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {[
                            { label: "Ready", value: b.stok, color: "#22c55e", bg: "#f0fdf4" },
                            { label: "Rusak", value: b.stokRusak, color: "#e53e3e", bg: "#fff1f1" },
                            { label: "Maint", value: b.stokMaintenance, color: "#f97316", bg: "#fff7ed" },
                            { label: "Hilang", value: b.stokHilang, color: "#6b7280", bg: "#f3f4f6" },
                            ].map(({ label, value, color, bg }) => (
                            <span key={label} style={{
                                display: "inline-flex", alignItems: "center", gap: "4px",
                                padding: "3px 8px", borderRadius: "6px",
                                fontSize: "11px", fontWeight: 700,
                                background: bg, color: color,
                            }}>
                                {label}: {value}
                            </span>
                            ))}
                        </div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <ActionBtn icon={<Eye size={14} />} onClick={() => setModalDetail(b)} title="Detail" color="#4069e5" />
                        {isAdmin && <>
                          <ActionBtn icon={<Pencil size={14} />} onClick={() => setModalForm({ open: true, item: b })} title="Edit" color="#f97316" />
                          <ActionBtn icon={<Trash2 size={14} />} onClick={() => setModalDelete(b)} title="Hapus" color="#e53e3e" />
                        </>}
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
      {modalDetail && <ModalDetail item={modalDetail} onClose={() => setModalDetail(null)} />}
      {modalForm.open && <ModalForm item={modalForm.item} onClose={() => setModalForm({ open: false })} onSave={handleSave} />}
      {modalDelete && <ModalDelete item={modalDelete} onClose={() => setModalDelete(null)} onConfirm={handleDelete} />}
    </div>
  );
}

function ActionBtn({ icon, onClick, title, color }: { icon: React.ReactNode; onClick: () => void; title: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: "30px", height: "30px",
        background: hovered ? color : "#f5f5f5",
        border: "none", borderRadius: "7px",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.15s",
        color: hovered ? "white" : "#888",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
    </button>
  );
}

function PageBtn({ children, onClick, disabled, active }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; active?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: "30px", height: "30px", padding: "0 8px",
        background: active ? "#2d3748" : hovered ? "#f5f5f5" : "white",
        border: "1.5px solid #e8e8e8",
        borderRadius: "7px", fontSize: "12px", fontWeight: 700,
        color: active ? "white" : disabled ? "#ccc" : "#555",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}