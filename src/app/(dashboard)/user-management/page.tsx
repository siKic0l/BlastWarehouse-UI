"use client";

import { useState } from "react";
import { Users, Plus, Pencil, Trash2, X, Eye, EyeOff, ShieldCheck, User } from "lucide-react";

type RoleType = "ADMIN" | "STAFF";

interface UserData {
  id: string;
  nama: string;
  email: string;
  password: string;
  role: RoleType;
  createdAt: string;
}

const dummyUsers: UserData[] = [
  { id: "1", nama: "Admin Utama", email: "admin@blastid.com", password: "admin123", role: "ADMIN", createdAt: "2024-01-01" },
  { id: "2", nama: "Budi Santoso", email: "budi@blastid.com", password: "staff123", role: "STAFF", createdAt: "2024-03-15" },
  { id: "3", nama: "Siti Rahayu", email: "siti@blastid.com", password: "staff123", role: "STAFF", createdAt: "2024-04-20" },
  { id: "4", nama: "Dian Kurniawan", email: "dian@blastid.com", password: "staff123", role: "STAFF", createdAt: "2024-05-10" },
];

function ModalForm({ item, onClose, onSave }: {
  item?: UserData | null;
  onClose: () => void;
  onSave: (data: Partial<UserData>) => void;
}) {
  const [form, setForm] = useState({
    nama: item?.nama || "",
    email: item?.email || "",
    password: "",
    role: item?.role || "STAFF" as RoleType,
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, password: form.password || item?.password });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "460px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>
            {item ? "Edit User" : "Tambah User Baru"}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Nama Lengkap</label>
              <input
                required
                style={inputStyle}
                value={form.nama}
                onChange={e => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama lengkap user..."
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                required
                type="email"
                style={inputStyle}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="email@blastid.com"
              />
            </div>
            <div>
              <label style={labelStyle}>
                {item ? "Password Baru (kosongkan jika tidak diubah)" : "Password"}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  required={!item}
                  type={showPassword ? "text" : "password"}
                  style={{ ...inputStyle, paddingRight: "40px" }}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder={item ? "Kosongkan jika tidak diubah..." : "Minimal 6 karakter..."}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Role</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {(["ADMIN", "STAFF"] as RoleType[]).map(role => (
                  <div
                    key={role}
                    onClick={() => setForm({ ...form, role })}
                    style={{
                      flex: 1, padding: "12px", borderRadius: "10px", cursor: "pointer",
                      border: `1.5px solid ${form.role === role ? "#2d3748" : "#e8e8e8"}`,
                      background: form.role === role ? "#f0f0f0" : "white",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                      transition: "all 0.15s",
                    }}
                  >
                    {role === "ADMIN"
                      ? <ShieldCheck size={20} color={form.role === role ? "#2d3748" : "#aaa"} />
                      : <User size={20} color={form.role === role ? "#2d3748" : "#aaa"} />
                    }
                    <p style={{ fontSize: "12px", fontWeight: 700, color: form.role === role ? "#1a1a1a" : "#aaa", margin: 0 }}>{role}</p>
                    <p style={{ fontSize: "10px", color: "#aaa", margin: 0, textAlign: "center" }}>
                      {role === "ADMIN" ? "Akses penuh" : "Akses terbatas"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "0 24px 24px", display: "flex", gap: "10px" }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", color: "#444", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Batal
            </button>
            <button type="submit" style={{ flex: 1, padding: "11px", background: "#2d3748", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              {item ? "Simpan Perubahan" : "Tambah User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalDelete({ user, onClose, onConfirm }: { user: UserData; onClose: () => void; onConfirm: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "380px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "32px 24px 24px", textAlign: "center" }}>
          <div style={{ width: "52px", height: "52px", background: "#fff1f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Trash2 size={22} color="#e53e3e" />
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1a1a1a", margin: "0 0 8px" }}>Hapus User?</h3>
          <p style={{ fontSize: "13px", color: "#888", margin: 0, lineHeight: 1.6 }}>
            <strong>{user.nama}</strong> akan dihapus dan tidak bisa login lagi.
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

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserData[]>(dummyUsers);
  const [modalForm, setModalForm] = useState<{ open: boolean; item?: UserData | null }>({ open: false });
  const [modalDelete, setModalDelete] = useState<UserData | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const handleSave = (data: Partial<UserData>) => {
    if (modalForm.item) {
      setUsers(prev => prev.map(u => u.id === modalForm.item!.id ? { ...u, ...data } : u));
    } else {
      setUsers(prev => [...prev, { ...data as UserData, id: String(Date.now()), createdAt: new Date().toISOString().split("T")[0] }]);
    }
  };

  const handleDelete = () => {
    if (modalDelete) {
      setUsers(prev => prev.filter(u => u.id !== modalDelete.id));
      setModalDelete(null);
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>User Management</h1>
          <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0 0", fontWeight: 500 }}>Kelola akun pengguna yang dapat mengakses sistem.</p>
        </div>
        <button
          onClick={() => setModalForm({ open: true, item: null })}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: hoveredBtn === "tambah" ? "#1a202c" : "#2d3748", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "white", cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={() => setHoveredBtn("tambah")}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <Plus size={14} /> Tambah User
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total User", value: users.length, color: "#1a1a1a", bg: "white", iconBg: "#f0f4ff", iconColor: "#4069e5", icon: Users },
          { label: "Administrator", value: users.filter(u => u.role === "ADMIN").length, color: "#2d3748", bg: "white", iconBg: "#f0f0f0", iconColor: "#2d3748", icon: ShieldCheck },
          { label: "Staff", value: users.filter(u => u.role === "STAFF").length, color: "#3b82f6", bg: "white", iconBg: "#eff6ff", iconColor: "#3b82f6", icon: User },
        ].map(({ label, value, color, bg, iconBg, iconColor, icon: Icon }) => (
          <div key={label} style={{ background: bg, borderRadius: "14px", padding: "16px 20px", border: "1.5px solid #f5f5f5", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={18} color={iconColor} />
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.8px", margin: 0 }}>{label}</p>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color, margin: "2px 0 0", letterSpacing: "-0.5px" }}>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid #f5f5f5", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["User", "Email", "Role", "Bergabung", "Actions"].map(col => (
                  <th key={col} style={{ padding: "11px 20px", textAlign: col === "Actions" ? "right" : "left", fontSize: "11px", fontWeight: 700, color: "#aaa", letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr
                  key={u.id}
                  style={{ borderTop: "1px solid #f5f5f5", background: hoveredRow === u.id ? "#fafafa" : "white", transition: "background 0.15s" }}
                  onMouseEnter={() => setHoveredRow(u.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2d3748", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>
                        {u.nama.charAt(0).toUpperCase()}
                      </div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{u.nama}</p>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "13px", color: "#555" }}>{u.email}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700,
                      background: u.role === "ADMIN" ? "#f0f0f0" : "#eff6ff",
                      color: u.role === "ADMIN" ? "#2d3748" : "#3b82f6",
                    }}>
                      {u.role === "ADMIN" ? <ShieldCheck size={11} /> : <User size={11} />}
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", color: "#aaa" }}>{u.createdAt}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                      <ActionBtn icon={<Pencil size={13} />} onClick={() => setModalForm({ open: true, item: u })} title="Edit" color="#f97316" />
                      <ActionBtn icon={<Trash2 size={13} />} onClick={() => setModalDelete(u)} title="Hapus" color="#e53e3e" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modalForm.open && <ModalForm item={modalForm.item} onClose={() => setModalForm({ open: false })} onSave={handleSave} />}
      {modalDelete && <ModalDelete user={modalDelete} onClose={() => setModalDelete(null)} onConfirm={handleDelete} />}
    </div>
  );
}