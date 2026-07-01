"use client";

import { useState, useRef } from "react";
import { Building2, Phone, MapPin, User, Save, Plus, Pencil, Trash2, X } from "lucide-react";

interface PengaturanApp {
  instansi: string;
  subInstansi: string;
  alamat: string;
  telepon: string;
  logoKiri: string;
  logoKanan: string;
  namaPimpinan: string;
  nipPimpinan: string;
  kotaTtd: string;
}

interface Peminjam {
  id: string;
  nama: string;
}

const dummySettings: PengaturanApp = {
  instansi: "PT Blast Promotion Indonesia",
  subInstansi: "Divisi Gudang",
  alamat: "Jl. Teknologi No. 1, Jakarta",
  telepon: "021-0000000",
  logoKiri: "",
  logoKanan: "",
  namaPimpinan: "Nama Pimpinan",
  nipPimpinan: "NIP. 000000",
  kotaTtd: "Jakarta",
};

const dummyPeminjam: Peminjam[] = [
  { id: "1", nama: "Ahmad Sulaiman" },
  { id: "2", nama: "Budi Hartono" },
  { id: "3", nama: "Siti Aminah" },
  { id: "4", nama: "Dian Pratama" },
  { id: "5", nama: "Rudi Hermawan" },
];

function ModalPeminjam({ item, onClose, onSave }: {
  item?: Peminjam | null;
  onClose: () => void;
  onSave: (nama: string) => void;
}) {
  const [nama, setNama] = useState(item?.nama || "");

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "400px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>
            {item ? "Edit Peminjam" : "Tambah Peminjam"}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>
        <div style={{ padding: "24px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#888", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>
            Nama Peminjam
          </label>
          <input
            autoFocus
            value={nama}
            onChange={e => setNama(e.target.value)}
            placeholder="Masukkan nama peminjam..."
            style={{ width: "100%", padding: "10px 12px", fontSize: "13px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "#fafafa", outline: "none", color: "#1a1a1a", boxSizing: "border-box" }}
            onKeyDown={e => { if (e.key === "Enter" && nama.trim()) { onSave(nama.trim()); onClose(); } }}
          />
        </div>
        <div style={{ padding: "0 24px 24px", display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            Batal
          </button>
          <button
            onClick={() => { if (nama.trim()) { onSave(nama.trim()); onClose(); } }}
            style={{ flex: 1, padding: "11px", background: "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalDelete({ nama, onClose, onConfirm }: { nama: string; onClose: () => void; onConfirm: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "380px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "32px 24px 24px", textAlign: "center" }}>
          <div style={{ width: "52px", height: "52px", background: "#fff1f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Trash2 size={22} color="#e53e3e" />
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1a1a1a", margin: "0 0 8px" }}>Hapus Peminjam?</h3>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            <strong>{nama}</strong> akan dihapus dari daftar peminjam.
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

export default function SettingsPage() {
  const [settings, setSettings] = useState<PengaturanApp>(dummySettings);
  const [peminjamList, setPeminjamList] = useState<Peminjam[]>(dummyPeminjam);
  const [savedToast, setSavedToast] = useState(false);
  const [modalPeminjam, setModalPeminjam] = useState<{ open: boolean; item?: Peminjam | null }>({ open: false });
  const [modalDelete, setModalDelete] = useState<Peminjam | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const logoKiriRef = useRef<HTMLInputElement>(null);
  const logoKananRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (side: "kiri" | "kanan", file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target?.result as string;
      setSettings(prev => ({
        ...prev,
        [side === "kiri" ? "logoKiri" : "logoKanan"]: base64,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleSavePeminjam = (nama: string) => {
    if (modalPeminjam.item) {
      setPeminjamList(prev => prev.map(p => p.id === modalPeminjam.item!.id ? { ...p, nama } : p));
    } else {
      setPeminjamList(prev => [...prev, { id: String(Date.now()), nama }]);
    }
  };

  const handleDeletePeminjam = () => {
    if (modalDelete) {
      setPeminjamList(prev => prev.filter(p => p.id !== modalDelete.id));
      setModalDelete(null);
    }
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

  const sectionStyle = {
    background: "white", borderRadius: "16px",
    border: "1.5px solid #f5f5f5", overflow: "hidden" as const,
    marginBottom: "20px",
  };

  const sectionHeaderStyle = {
    padding: "16px 24px", borderBottom: "1px solid #f5f5f5",
    display: "flex" as const, alignItems: "center" as const, gap: "10px",
  };

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", maxWidth: "800px" }}>

      {/* Toast */}
      {savedToast && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#2d3748", color: "white", padding: "12px 20px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "8px" }}>
          ✓ Pengaturan berhasil disimpan
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>Settings</h1>
        <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0 0", fontWeight: 500 }}>Kelola pengaturan aplikasi dan data referensi.</p>
      </div>

      {/* Section 1: Profil Aplikasi */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={{ width: "32px", height: "32px", background: "#f0f4ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={16} color="#4069e5" />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Profil Instansi</p>
            <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>Informasi yang muncul di laporan PDF</p>
          </div>
        </div>
        <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Nama Instansi</label>
            <input style={inputStyle} value={settings.instansi} onChange={e => setSettings({ ...settings, instansi: e.target.value })} placeholder="PT Blast Promotion Indonesia" />
          </div>
          <div>
            <label style={labelStyle}>Sub Instansi / Divisi</label>
            <input style={inputStyle} value={settings.subInstansi} onChange={e => setSettings({ ...settings, subInstansi: e.target.value })} placeholder="Divisi Gudang" />
          </div>
          <div>
            <label style={labelStyle}>Telepon</label>
            <input style={inputStyle} value={settings.telepon} onChange={e => setSettings({ ...settings, telepon: e.target.value })} placeholder="021-0000000" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Alamat</label>
            <input style={inputStyle} value={settings.alamat} onChange={e => setSettings({ ...settings, alamat: e.target.value })} placeholder="Jl. Teknologi No. 1" />
          </div>
          <div>
            <label style={labelStyle}>Nama Pimpinan</label>
            <input style={inputStyle} value={settings.namaPimpinan} onChange={e => setSettings({ ...settings, namaPimpinan: e.target.value })} placeholder="Nama Pimpinan" />
          </div>
          <div>
            <label style={labelStyle}>NIP / Jabatan</label>
            <input style={inputStyle} value={settings.nipPimpinan} onChange={e => setSettings({ ...settings, nipPimpinan: e.target.value })} placeholder="NIP. 000000" />
          </div>
          <div>
            <label style={labelStyle}>Kota TTD</label>
            <input style={inputStyle} value={settings.kotaTtd} onChange={e => setSettings({ ...settings, kotaTtd: e.target.value })} placeholder="Jakarta" />
          </div>
        </div>
      </div>

      {/* Section 2: Logo */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div style={{ width: "32px", height: "32px", background: "#f0fdf4", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={16} color="#22c55e" />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Logo</p>
            <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>Upload logo untuk kop surat laporan</p>
          </div>
        </div>
        <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {(["kiri", "kanan"] as const).map(side => (
            <div key={side}>
              <label style={labelStyle}>Logo {side === "kiri" ? "Kiri" : "Kanan"}</label>
              <div
                onClick={() => (side === "kiri" ? logoKiriRef : logoKananRef).current?.click()}
                style={{
                  border: "2px dashed #e8e8e8", borderRadius: "12px",
                  padding: "20px", textAlign: "center", cursor: "pointer",
                  background: "#fafafa", transition: "all 0.15s",
                  minHeight: "100px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "8px",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#2d3748")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8e8e8")}
              >
                {settings[side === "kiri" ? "logoKiri" : "logoKanan"] ? (
                  <img
                    src={settings[side === "kiri" ? "logoKiri" : "logoKanan"]}
                    alt={`Logo ${side}`}
                    style={{ maxHeight: "60px", maxWidth: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <>
                    <div style={{ width: "36px", height: "36px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Plus size={18} color="#aaa" />
                    </div>
                    <p style={{ fontSize: "12px", color: "#aaa", margin: 0, fontWeight: 600 }}>Klik untuk upload</p>
                    <p style={{ fontSize: "11px", color: "#ccc", margin: 0 }}>PNG, JPG, SVG</p>
                  </>
                )}
              </div>
              <input
                ref={side === "kiri" ? logoKiriRef : logoKananRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(side, file);
                }}
              />
              {settings[side === "kiri" ? "logoKiri" : "logoKanan"] && (
                <button
                  onClick={() => setSettings(prev => ({ ...prev, [side === "kiri" ? "logoKiri" : "logoKanan"]: "" }))}
                  style={{ marginTop: "6px", width: "100%", padding: "6px", background: "none", border: "none", fontSize: "12px", color: "#e53e3e", cursor: "pointer", fontWeight: 600 }}
                >
                  Hapus Logo
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Simpan */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "11px 24px", background: hoveredBtn === "save" ? "#1a202c" : "#2d3748",
            color: "white", border: "none", borderRadius: "10px",
            fontSize: "13px", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
          }}
          onMouseEnter={() => setHoveredBtn("save")}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <Save size={15} /> Simpan Pengaturan
        </button>
      </div>

      {/* Section 3: Manajemen Peminjam */}
      <div style={sectionStyle}>
        <div style={{ ...sectionHeaderStyle, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", background: "#fff7ed", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={16} color="#f97316" />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Daftar Peminjam</p>
              <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>{peminjamList.length} peminjam terdaftar</p>
            </div>
          </div>
          <button
            onClick={() => setModalPeminjam({ open: true, item: null })}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "add-peminjam" ? "#1a202c" : "#2d3748", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={() => setHoveredBtn("add-peminjam")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <Plus size={14} /> Tambah
          </button>
        </div>

        <div style={{ padding: "8px 0" }}>
          {peminjamList.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#ccc", fontSize: "13px", fontWeight: 600 }}>
              Belum ada peminjam terdaftar
            </div>
          ) : peminjamList.map((p, idx) => (
            <div
              key={p.id}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 24px",
                borderBottom: idx < peminjamList.length - 1 ? "1px solid #f5f5f5" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#555" }}>
                  {p.nama.charAt(0).toUpperCase()}
                </div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{p.nama}</p>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <ActionBtn icon={<Pencil size={13} />} onClick={() => setModalPeminjam({ open: true, item: p })} title="Edit" color="#f97316" />
                <ActionBtn icon={<Trash2 size={13} />} onClick={() => setModalDelete(p)} title="Hapus" color="#e53e3e" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {modalPeminjam.open && (
        <ModalPeminjam
          item={modalPeminjam.item}
          onClose={() => setModalPeminjam({ open: false })}
          onSave={handleSavePeminjam}
        />
      )}
      {modalDelete && (
        <ModalDelete
          nama={modalDelete.nama}
          onClose={() => setModalDelete(null)}
          onConfirm={handleDeletePeminjam}
        />
      )}
    </div>
  );
}