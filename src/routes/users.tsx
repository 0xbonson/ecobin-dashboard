import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DemoModal, Field, Section, SelectInput, StatusPill, TextInput } from "@/components/ui-bits";
import { users as initialUsers, type AppUser } from "@/lib/mock-data";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "Manajemen User · EcoBin" }] }),
  component: UsersPage,
});

function roleTone(r: string) {
  if (r === "Admin") return "danger" as const;
  if (r === "Supervisor") return "info" as const;
  return "muted" as const;
}

const emptyUser = {
  nama: "",
  email: "",
  role: "Petugas Lapangan" as AppUser["role"],
};

function UsersPage() {
  const [userList, setUserList] = useState(initialUsers);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [confirmInactive, setConfirmInactive] = useState<AppUser | null>(null);
  const [form, setForm] = useState(emptyUser);

  const addUser = () => {
    if (!form.nama.trim() || !form.email.trim()) {
      toast.error("Nama dan email wajib diisi.");
      return;
    }
    const newUser: AppUser = {
      id: `U-${String(userList.length + 1).padStart(2, "0")}`,
      nama: form.nama.trim(),
      email: form.email.trim(),
      role: form.role,
      status: "Aktif",
      terakhirLogin: "Belum pernah login",
    };
    setUserList((list) => [newUser, ...list]);
    setForm(emptyUser);
    setAddOpen(false);
    toast.success("Pengguna baru berhasil ditambahkan.");
  };

  const saveEdit = () => {
    if (!editing) return;
    setUserList((list) => list.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
    toast.success("Data pengguna berhasil diperbarui.");
  };

  const deactivate = () => {
    if (!confirmInactive) return;
    setUserList((list) => list.map((u) => (u.id === confirmInactive.id ? { ...u, status: "Nonaktif" } : u)));
    toast.warning(`${confirmInactive.nama} berhasil dinonaktifkan.`);
    setConfirmInactive(null);
  };

  return (
    <AppShell
      title="Manajemen User"
      subtitle="Atur akses, peran, dan status pengguna dalam sistem EcoBin."
      actions={
        <button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">
          <Plus className="h-4 w-4" /> Tambah Pengguna
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {[
          { role: "Admin", count: userList.filter((u) => u.role === "Admin").length, desc: "Akses penuh sistem & konfigurasi" },
          { role: "Supervisor", count: userList.filter((u) => u.role === "Supervisor").length, desc: "Mengawasi pengangkutan & laporan" },
          { role: "Petugas Lapangan", count: userList.filter((u) => u.role === "Petugas Lapangan").length, desc: "Eksekusi rute & laporan kendala" },
        ].map((r) => (
          <div key={r.role} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <StatusPill tone={roleTone(r.role)}>{r.role}</StatusPill>
              <span className="text-2xl font-semibold tabular-nums">{r.count}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>

      <Section title="Daftar Pengguna" description={`${userList.length} akun terdaftar.`}>
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2 px-5">Nama</th>
                <th className="text-left font-medium py-2 pr-3">Email</th>
                <th className="text-left font-medium py-2 pr-3">Role</th>
                <th className="text-left font-medium py-2 pr-3">Status</th>
                <th className="text-left font-medium py-2 pr-3">Terakhir Login</th>
                <th className="text-right font-medium py-2 px-5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-2.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-[11px] font-semibold">
                        {u.nama.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-medium">{u.nama}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-foreground/80">{u.email}</td>
                  <td className="py-2.5 pr-3"><StatusPill tone={roleTone(u.role)}>{u.role}</StatusPill></td>
                  <td className="py-2.5 pr-3">
                    <StatusPill tone={u.status === "Aktif" ? "normal" : "muted"}>{u.status}</StatusPill>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-muted-foreground">{u.terakhirLogin}</td>
                  <td className="py-2.5 px-5 text-right text-xs">
                    <button onClick={() => setEditing(u)} className="px-2 py-1 rounded-md hover:bg-muted">Edit</button>
                    <button onClick={() => setConfirmInactive(u)} className="px-2 py-1 rounded-md hover:bg-muted text-destructive">Nonaktifkan</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <DemoModal open={addOpen} title="Tambah Pengguna" description="Tambahkan akun pengguna baru untuk demo." onClose={() => setAddOpen(false)} footer={<><button onClick={() => setAddOpen(false)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button><button onClick={addUser} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Simpan</button></>}>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Nama"><TextInput value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama pengguna" /></Field>
          <Field label="Email"><TextInput value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@ecobin.id" /></Field>
          <Field label="Role"><SelectInput value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as AppUser["role"] })}><option>Admin</option><option>Supervisor</option><option>Petugas Lapangan</option></SelectInput></Field>
        </div>
      </DemoModal>

      <DemoModal open={!!editing} title={editing ? `Edit ${editing.nama}` : "Edit Pengguna"} description="Ubah role dan status pengguna." onClose={() => setEditing(null)} footer={<><button onClick={() => setEditing(null)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button><button onClick={saveEdit} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Simpan Perubahan</button></>}>
        {editing && (
          <div className="grid grid-cols-1 gap-3">
            <Field label="Nama"><TextInput value={editing.nama} onChange={(e) => setEditing({ ...editing, nama: e.target.value })} /></Field>
            <Field label="Email"><TextInput value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></Field>
            <Field label="Role"><SelectInput value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value as AppUser["role"] })}><option>Admin</option><option>Supervisor</option><option>Petugas Lapangan</option></SelectInput></Field>
            <Field label="Status"><SelectInput value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as AppUser["status"] })}><option>Aktif</option><option>Nonaktif</option></SelectInput></Field>
          </div>
        )}
      </DemoModal>

      <DemoModal open={!!confirmInactive} title="Nonaktifkan Pengguna" description="Akun tidak dihapus, hanya ditandai nonaktif pada mode demo." onClose={() => setConfirmInactive(null)} footer={<><button onClick={() => setConfirmInactive(null)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button><button onClick={deactivate} className="h-9 px-4 rounded-md bg-destructive text-destructive-foreground text-sm font-medium">Nonaktifkan</button></>}>
        <p className="text-sm text-foreground/85">Nonaktifkan akun {confirmInactive?.nama}?</p>
      </DemoModal>
    </AppShell>
  );
}
