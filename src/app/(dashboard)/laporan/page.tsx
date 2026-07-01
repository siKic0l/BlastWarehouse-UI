"use client";

import { useState } from "react";
import {
  FileText, Download, Filter, Calendar,
  ChevronLeft, ChevronRight, X, Building2,
  User, MapPin, Printer,
  Search,
} from "lucide-react";

type StatusType = "In Progress" | "Returned" | "Overdue";

interface Transaksi {
  id: string;
  peminjam: string;
  keperluan: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  staff: string;
  status: StatusType;
  items: { namaBarang: string; jumlah: number; satuan: string; kondisiKembali?: string }[];
}

interface TemplatePDF {
  instansi: string;
  subInstansi: string;
  alamat: string;
  namaPimpinan: string;
  nipPimpinan: string;
  kotaTtd: string;
}


const dummyTransaksi: Transaksi[] = [
  { id: "TRX-20240625-001", peminjam: "Ahmad Sulaiman", keperluan: "Rapat Koordinasi", tanggalPinjam: "2024-06-25", tanggalKembali: "2024-06-26", staff: "Admin User", status: "Overdue", items: [{ namaBarang: "Precision Laptop X1", jumlah: 1, satuan: "Unit" }, { namaBarang: "Proyektor Epson", jumlah: 1, satuan: "Unit" }] },
  { id: "TRX-20240625-002", peminjam: "Budi Hartono", keperluan: "Presentasi Client", tanggalPinjam: "2024-06-25", tanggalKembali: "2024-06-28", staff: "Staff Gudang", status: "In Progress", items: [{ namaBarang: "Kamera Sony A7 IV", jumlah: 2, satuan: "Unit" }] },
  { id: "TRX-20240624-001", peminjam: "Siti Aminah", keperluan: "Workshop Divisi", tanggalPinjam: "2024-06-24", tanggalKembali: "2024-06-24", staff: "Admin User", status: "Returned", items: [{ namaBarang: "Ergonomic Office Chair", jumlah: 3, satuan: "Pcs", kondisiKembali: "Baik" }] },
  { id: "TRX-20240624-002", peminjam: "Dian Pratama", keperluan: "Event Outdoor", tanggalPinjam: "2024-06-24", tanggalKembali: "2024-06-25", staff: "Staff Gudang", status: "Returned", items: [{ namaBarang: "Microphone Shure SM58", jumlah: 2, satuan: "Unit", kondisiKembali: "Rusak Ringan" }] },
  { id: "TRX-20240623-001", peminjam: "Rudi Hermawan", keperluan: "Training Internal", tanggalPinjam: "2024-06-23", tanggalKembali: "2024-06-30", staff: "Admin User", status: "In Progress", items: [{ namaBarang: "Precision Laptop X1", jumlah: 3, satuan: "Unit" }, { namaBarang: "Spidol Whiteboard", jumlah: 10, satuan: "Pcs" }] },
  { id: "TRX-20240622-001", peminjam: "Ahmad Sulaiman", keperluan: "Meeting Eksternal", tanggalPinjam: "2024-06-22", tanggalKembali: "2024-06-22", staff: "Admin User", status: "Returned", items: [{ namaBarang: "Proyektor Epson", jumlah: 1, satuan: "Unit", kondisiKembali: "Baik" }] },
  { id: "TRX-20240621-001", peminjam: "Budi Hartono", keperluan: "Demo Produk", tanggalPinjam: "2024-06-21", tanggalKembali: "2024-06-21", staff: "Staff Gudang", status: "Returned", items: [{ namaBarang: "Kamera Sony A7 IV", jumlah: 1, satuan: "Unit", kondisiKembali: "Baik" }] },
];

const ITEMS_PER_PAGE = 8;

function getStatusStyle(status: StatusType) {
  switch (status) {
    case "In Progress": return { bg: "#eff6ff", color: "#3b82f6" };
    case "Returned": return { bg: "#f0fdf4", color: "#22c55e" };
    case "Overdue": return { bg: "#fff1f1", color: "#e53e3e" };
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

// Modal Template Editor
function ModalTemplate({ template, onClose, onSave }: {
  template: TemplatePDF;
  onClose: () => void;
  onSave: (t: TemplatePDF) => void;
}) {
  const [form, setForm] = useState(template);

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
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>Template Laporan</h3>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 0" }}>Edit informasi yang akan muncul di PDF</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>

        <div style={{ padding: "24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Preview kop surat */}
          <div style={{ background: "#f9f9f9", borderRadius: "12px", padding: "16px", border: "1.5px solid #f0f0f0" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Preview Kop Surat</p>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>{form.instansi || "—"}</p>
              <p style={{ fontSize: "12px", color: "#555", margin: "2px 0" }}>{form.subInstansi || "—"}</p>
              <p style={{ fontSize: "11px", color: "#888", margin: 0 }}>{form.alamat || "—"}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Nama Instansi</label>
              <input style={inputStyle} value={form.instansi} onChange={e => setForm({ ...form, instansi: e.target.value })} placeholder="PT Blast Promotion Indonesia" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Sub Instansi / Divisi</label>
              <input style={inputStyle} value={form.subInstansi} onChange={e => setForm({ ...form, subInstansi: e.target.value })} placeholder="Divisi Gudang" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Alamat</label>
              <input style={inputStyle} value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} placeholder="Jl. Teknologi No. 1, Jakarta" />
            </div>
            <div>
              <label style={labelStyle}>Nama Pimpinan</label>
              <input style={inputStyle} value={form.namaPimpinan} onChange={e => setForm({ ...form, namaPimpinan: e.target.value })} placeholder="Nama Pimpinan" />
            </div>
            <div>
              <label style={labelStyle}>NIP / Jabatan</label>
              <input style={inputStyle} value={form.nipPimpinan} onChange={e => setForm({ ...form, nipPimpinan: e.target.value })} placeholder="NIP atau Jabatan" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Kota TTD</label>
              <input style={inputStyle} value={form.kotaTtd} onChange={e => setForm({ ...form, kotaTtd: e.target.value })} placeholder="Jakarta" />
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #f5f5f5", display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Batal
          </button>
          <button onClick={() => { onSave(form); onClose(); }} style={{ flex: 1, padding: "11px", background: "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Simpan & Export PDF
          </button>
        </div>
      </div>
    </div>
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

export default function LaporanPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplatePDF>({
    instansi: "PT Blast Promotion Indonesia",
    subInstansi: "Divisi Gudang",
    alamat: "Jl. Teknologi No. 1, Jakarta",
    namaPimpinan: "Nama Pimpinan",
    nipPimpinan: "NIP. 000000",
    kotaTtd: "Jakarta",
  });

  // Filter data
  const filtered = dummyTransaksi.filter(t => {
  const tgl = new Date(t.tanggalPinjam);
  const matchStart = !startDate || tgl >= new Date(startDate);
  const matchEnd = !endDate || tgl <= new Date(endDate);
  const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
  const matchSearch = !search ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.peminjam.toLowerCase().includes(search.toLowerCase()) ||
    t.items.some(i => i.namaBarang.toLowerCase().includes(search.toLowerCase()));
  return matchStart && matchEnd && matchStatus && matchSearch;
});

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Stats
  const total = filtered.length;
  const returned = filtered.filter(t => t.status === "Returned").length;
  const inProgress = filtered.filter(t => t.status === "In Progress").length;
  const overdue = filtered.filter(t => t.status === "Overdue").length;

  const handleExportPDF = (tmpl: TemplatePDF) => {
    // Buat konten HTML untuk print
    const today = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
    const periode = startDate && endDate
      ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
      : "Semua Periode";

    const rows = filtered.map(t => `
      <tr>
        <td>${t.id}</td>
        <td>${formatDate(t.tanggalPinjam)}</td>
        <td>${t.peminjam}</td>
        <td>${t.items.map(i => `${i.namaBarang} (${i.jumlah} ${i.satuan})`).join(", ")}</td>
        <td>${t.keperluan}</td>
        <td>${t.staff}</td>
        <td>${t.status}</td>
        <td>${formatDate(t.tanggalKembali)}</td>
      </tr>
    `).join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; font-size: 11px; color: #000; margin: 24px; }
          .kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 16px; }
          .kop h2 { font-size: 14px; margin: 0; text-transform: uppercase; }
          .kop p { margin: 2px 0; font-size: 11px; }
          h3 { text-align: center; font-size: 13px; margin: 12px 0 4px; text-transform: uppercase; letter-spacing: 1px; }
          .periode { text-align: center; font-size: 11px; color: #555; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th { background: #f0f0f0; padding: 7px 8px; text-align: left; font-size: 10px; text-transform: uppercase; border: 1px solid #ddd; }
          td { padding: 6px 8px; border: 1px solid #ddd; vertical-align: top; }
          tr:nth-child(even) { background: #fafafa; }
          .ttd { margin-top: 40px; text-align: right; }
          .ttd p { margin: 2px 0; }
          .summary { display: flex; gap: 16px; margin-bottom: 16px; }
          .summary-item { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; flex: 1; }
          .summary-item strong { display: block; font-size: 18px; }
          .summary-item span { font-size: 10px; color: #666; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="kop">
          <h2>${tmpl.instansi}</h2>
          <p>${tmpl.subInstansi}</p>
          <p>${tmpl.alamat}</p>
        </div>
        <h3>Laporan Peminjaman Barang</h3>
        <p class="periode">Periode: ${periode}</p>
        <div class="summary">
          <div class="summary-item"><strong>${total}</strong><span>Total</span></div>
          <div class="summary-item"><strong>${returned}</strong><span>Selesai</span></div>
          <div class="summary-item"><strong>${inProgress}</strong><span>Dipinjam</span></div>
          <div class="summary-item"><strong>${overdue}</strong><span>Overdue</span></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID Transaksi</th>
              <th>Tgl Pinjam</th>
              <th>Peminjam</th>
              <th>Barang</th>
              <th>Keperluan</th>
              <th>Staff</th>
              <th>Status</th>
              <th>Tgl Kembali</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="ttd">
          <p>${tmpl.kotaTtd}, ${today}</p>
          <p>${tmpl.namaPimpinan}</p>
          <br><br><br>
          <p><strong>${tmpl.namaPimpinan}</strong></p>
          <p>${tmpl.nipPimpinan}</p>
        </div>
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 500);
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>Laporan</h1>
          <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0 0", fontWeight: 500 }}>Rekap data peminjaman barang dengan filter periode.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowTemplate(true)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "template" ? "#f5f5f5" : "white", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "13px", fontWeight: 600, color: "#444", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={() => setHoveredBtn("template")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Printer size={14} /> Edit Template
          </button>
          <button
            onClick={() => handleExportPDF(template)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "export" ? "#1a202c" : "#2d3748", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={() => setHoveredBtn("export")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Filter */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid #f5f5f5", padding: "20px", marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 14px" }}>Filter Laporan</p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>Dari Tanggal</label>
            <input
              type="date"
              value={startDate}
              onChange={e => { setStartDate(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" as const, cursor: "pointer" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>Sampai Tanggal</label>
            <input
              type="date"
              value={endDate}
              onChange={e => { setEndDate(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" as const, cursor: "pointer" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>Status</label>
            <select
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" as const, cursor: "pointer" }}
            >
              {["Semua", "In Progress", "Returned", "Overdue"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>Cari</label>
            <div style={{ position: "relative" }}>
                <Search size={14} color="#bbb" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Nama, ID transaksi, barang..."
                style={{ width: "100%", paddingLeft: "34px", paddingRight: "12px", paddingTop: "9px", paddingBottom: "9px", fontSize: "13px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" as const }}
                />
            </div>
            </div>
          {(startDate || endDate || filterStatus !== "Semua") && (
            <button
              onClick={() => { setStartDate(""); setEndDate(""); setFilterStatus("Semua"); setSearch(""); setCurrentPage(1); }}
              style={{ padding: "9px 14px", background: "#fff1f1", color: "#e53e3e", border: "1.5px solid #fee2e2", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <X size={13} /> Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total", value: total, color: "#1a1a1a", bg: "white" },
          { label: "Selesai", value: returned, color: "#22c55e", bg: "#f0fdf4" },
          { label: "Dipinjam", value: inProgress, color: "#3b82f6", bg: "#eff6ff" },
          { label: "Overdue", value: overdue, color: "#e53e3e", bg: "#fff1f1" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ background: bg, borderRadius: "12px", padding: "16px 20px", border: "1.5px solid #f5f5f5" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 4px" }}>{label}</p>
            <h3 style={{ fontSize: "28px", fontWeight: 800, color, margin: 0, letterSpacing: "-1px" }}>{value}</h3>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid #f5f5f5", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Data Peminjaman</h3>
          <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 0" }}>{filtered.length} transaksi ditemukan</p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["ID Transaksi", "Tgl Pinjam", "Peminjam", "Barang", "Keperluan", "Staff", "Status", "Tgl Kembali"].map(col => (
                  <th key={col} style={{ padding: "11px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "48px", textAlign: "center", color: "#ccc", fontSize: "14px", fontWeight: 600 }}>
                    Tidak ada data untuk periode ini
                  </td>
                </tr>
              ) : paginated.map(t => {
                const statusStyle = getStatusStyle(t.status);
                return (
                  <tr
                    key={t.id}
                    style={{ borderTop: "1px solid #f5f5f5", background: hoveredRow === t.id ? "#fafafa" : "white", transition: "background 0.15s", cursor: "default" }}
                    onMouseEnter={() => setHoveredRow(t.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#2d3748", fontFamily: "monospace", background: "#f5f5f5", padding: "2px 7px", borderRadius: "5px" }}>{t.id}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#888", whiteSpace: "nowrap" }}>{formatDate(t.tanggalPinjam)}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap" }}>{t.peminjam}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {t.items.map((item, i) => (
                          <span key={i} style={{ fontSize: "12px", color: "#555" }}>
                            {item.namaBarang} <span style={{ color: "#aaa" }}>({item.jumlah} {item.satuan})</span>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#666", maxWidth: "160px" }}>{t.keperluan}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#555", whiteSpace: "nowrap" }}>{t.staff}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: statusStyle.bg, color: statusStyle.color, whiteSpace: "nowrap" }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", fontWeight: 600, color: t.status === "Overdue" ? "#e53e3e" : "#888", whiteSpace: "nowrap" }}>
                      {formatDate(t.tanggalKembali)}
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

      {/* Modal Template */}
      {showTemplate && (
        <ModalTemplate
          template={template}
          onClose={() => setShowTemplate(false)}
          onSave={(tmpl) => {
            setTemplate(tmpl);
            handleExportPDF(tmpl);
          }}
        />
      )}
    </div>
  );
}

