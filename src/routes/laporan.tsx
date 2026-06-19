import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Field, Section, SelectInput, StatusPill } from "@/components/ui-bits";
import { issues as initialIssues, bins, users, type IssueReport } from "@/lib/mock-data";

export const Route = createFileRoute("/laporan")({
  head: () => ({ meta: [{ title: "Laporan Kendala · EcoBin" }] }),
  component: LaporanPage,
});

const kategoriList = [
  "Sensor error", "Servo tidak bergerak", "LED/buzzer rusak",
  "Koneksi offline", "Baterai lemah", "Sampah meluap",
] as const;

type IssueForm = {
  bin: string;
  kategori: IssueReport["kategori"];
  prioritas: IssueReport["prioritas"];
  petugas: string;
  deskripsi: string;
};

const defaultForm: IssueForm = {
  bin: "ECO-03",
  kategori: "Sensor error",
  prioritas: "Sedang",
  petugas: "Budi Santoso",
  deskripsi: "",
};

function statusTone(s: string) {
  if (s === "Selesai") return "normal" as const;
  if (s === "Diproses") return "warn" as const;
  return "info" as const;
}

function prioTone(p: string) {
  if (p === "Tinggi") return "danger" as const;
  if (p === "Sedang") return "warn" as const;
  return "muted" as const;
}

function LaporanPage() {
  const [open, setOpen] = useState(true);
  const [issueList, setIssueList] = useState(initialIssues);
  const [form, setForm] = useState<IssueForm>(defaultForm);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.deskripsi.trim()) {
      toast.error("Deskripsi kendala wajib diisi.");
      return;
    }
    const newIssue: IssueReport = {
      id: `ISS-${105 + issueList.length}`,
      bin: form.bin,
      kategori: form.kategori,
      prioritas: form.prioritas,
      petugas: form.petugas,
      status: "Terbuka",
      dilaporkan: "Baru saja",
    };
    setIssueList((list) => [newIssue, ...list]);
    setForm(defaultForm);
    setOpen(false);
    toast.success("Laporan berhasil dikirim.");
  };

  return (
    <AppShell
      title="Laporan Kendala"
      subtitle="Daftar kendala perangkat dan tindak lanjut dari petugas lapangan."
      actions={
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> Lapor Kendala
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Daftar Kendala" description={`${issueList.length} laporan tercatat.`}>
            <div className="overflow-x-auto -mx-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="text-left font-medium py-2 px-5">ID</th>
                    <th className="text-left font-medium py-2 pr-3">Bin</th>
                    <th className="text-left font-medium py-2 pr-3">Kategori</th>
                    <th className="text-left font-medium py-2 pr-3">Prioritas</th>
                    <th className="text-left font-medium py-2 pr-3">Petugas</th>
                    <th className="text-left font-medium py-2 pr-3">Status</th>
                    <th className="text-left font-medium py-2 px-5">Dilaporkan</th>
                  </tr>
                </thead>
                <tbody>
                  {issueList.map((i) => (
                    <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="py-2.5 px-5 font-medium tabular-nums">{i.id}</td>
                      <td className="py-2.5 pr-3 tabular-nums">{i.bin}</td>
                      <td className="py-2.5 pr-3 text-foreground/80">{i.kategori}</td>
                      <td className="py-2.5 pr-3"><StatusPill tone={prioTone(i.prioritas)}>{i.prioritas}</StatusPill></td>
                      <td className="py-2.5 pr-3 text-foreground/80">{i.petugas}</td>
                      <td className="py-2.5 pr-3"><StatusPill tone={statusTone(i.status)}>{i.status}</StatusPill></td>
                      <td className="py-2.5 px-5 text-xs text-muted-foreground">{i.dilaporkan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        <Section title="Form Laporan Kendala" description={open ? "Catat masalah perangkat untuk ditindaklanjuti." : "Klik Lapor Kendala untuk membuka form."}>
          {open ? (
            <form className="space-y-3" onSubmit={submit}>
              <Field label="Perangkat">
                <SelectInput value={form.bin} onChange={(e) => setForm({ ...form, bin: e.target.value })}>
                  {bins.map((b) => <option key={b.id} value={b.id}>{b.id} — {b.lokasi}</option>)}
                </SelectInput>
              </Field>
              <Field label="Kategori masalah">
                <SelectInput value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value as IssueReport["kategori"] })}>
                  {kategoriList.map((k) => <option key={k}>{k}</option>)}
                </SelectInput>
              </Field>
              <Field label="Prioritas">
                <div className="flex gap-1.5">
                  {(["Rendah", "Sedang", "Tinggi"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, prioritas: p })}
                      className={`flex-1 h-9 rounded-md border text-sm ${form.prioritas === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Tugaskan petugas">
                <SelectInput value={form.petugas} onChange={(e) => setForm({ ...form, petugas: e.target.value })}>
                  {users.filter((u) => u.role !== "Admin").map((u) => <option key={u.id}>{u.nama}</option>)}
                </SelectInput>
              </Field>
              <Field label="Deskripsi">
                <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} rows={3} placeholder="Jelaskan kondisi yang ditemukan…" className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/20" />
              </Field>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setForm(defaultForm); setOpen(false); }} className="h-9 flex-1 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
                <button type="submit" className="h-9 flex-1 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">
                  Kirim Laporan
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center">
              <p className="text-sm font-medium">Form laporan ditutup.</p>
              <button onClick={() => setOpen(true)} className="mt-3 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium">Buka Form</button>
            </div>
          )}
        </Section>
      </div>
    </AppShell>
  );
}
