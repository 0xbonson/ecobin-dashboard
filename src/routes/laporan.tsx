import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Field, Section, SelectInput, StatusPill } from "@/components/ui-bits";
import { type IssueReport } from "@/lib/mock-data";
import { useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/laporan")({
  head: () => ({ meta: [{ title: "Laporan Kendala · EcoBin" }] }),
  component: LaporanPage,
});

const kategoriList = [
  "Sensor error", "Servo tidak bergerak", "LED/buzzer rusak",
  "Koneksi offline", "Sampah meluap",
] as const;

type IssueForm = {
  kategori: IssueReport["kategori"];
  prioritas: IssueReport["prioritas"];
  deskripsi: string;
};

const defaultForm: IssueForm = {
  kategori: "Sensor error",
  prioritas: "Sedang",
  deskripsi: "",
};

function statusTone(status: string) {
  if (status === "Selesai") return "normal" as const;
  if (status === "Diproses") return "warn" as const;
  return "info" as const;
}

function prioTone(priority: string) {
  if (priority === "Tinggi") return "danger" as const;
  if (priority === "Sedang") return "warn" as const;
  return "muted" as const;
}

function LaporanPage() {
  const live = useLiveEcoBinTelemetry(5000);
  const [open, setOpen] = useState(true);
  const [issueList, setIssueList] = useState<IssueReport[]>([]);
  const [form, setForm] = useState<IssueForm>(defaultForm);

  const deviceName = live.telemetry?.deviceName || "Perangkat EcoBin";
  const location = live.telemetry?.location || "Lokasi belum ditentukan";

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.deskripsi.trim()) {
      toast.error("Deskripsi kendala wajib diisi.");
      return;
    }

    const newIssue: IssueReport = {
      id: `ISS-${String(issueList.length + 1).padStart(3, "0")}`,
      bin: deviceName,
      kategori: form.kategori,
      prioritas: form.prioritas,
      petugas: "Belum ditugaskan",
      status: "Terbuka",
      dilaporkan: "Baru saja",
    };

    setIssueList((current) => [newIssue, ...current]);
    setForm(defaultForm);
    setOpen(false);
    toast.success("Laporan kendala berhasil dibuat.");
  };

  return (
    <AppShell
      title="Laporan Kendala"
      subtitle="Catat kendala perangkat untuk ditindaklanjuti."
      actions={
        <button
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> Lapor Kendala
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section
            title="Daftar Kendala"
            description={issueList.length ? `${issueList.length} laporan dibuat pada sesi ini.` : "Belum ada laporan kendala aktif."}
          >
            {issueList.length ? (
              <div className="-mx-5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-2 text-left font-medium">ID</th>
                      <th className="py-2 pr-3 text-left font-medium">Kategori</th>
                      <th className="py-2 pr-3 text-left font-medium">Prioritas</th>
                      <th className="py-2 pr-3 text-left font-medium">Status</th>
                      <th className="px-5 py-2 text-left font-medium">Dilaporkan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueList.map((issue) => (
                      <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                        <td className="px-5 py-2.5 font-medium tabular-nums">{issue.id}</td>
                        <td className="py-2.5 pr-3 text-foreground/80">{issue.kategori}</td>
                        <td className="py-2.5 pr-3"><StatusPill tone={prioTone(issue.prioritas)}>{issue.prioritas}</StatusPill></td>
                        <td className="py-2.5 pr-3"><StatusPill tone={statusTone(issue.status)}>{issue.status}</StatusPill></td>
                        <td className="px-5 py-2.5 text-xs text-muted-foreground">{issue.dilaporkan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border bg-muted/20 p-8 text-center">
                <p className="text-sm font-medium">Belum ada laporan kendala.</p>
                <p className="mt-1 text-xs text-muted-foreground">Gunakan formulir di samping saat ada masalah pada perangkat.</p>
              </div>
            )}
          </Section>
        </div>

        <Section title="Form Laporan Kendala" description={open ? "Catat masalah perangkat untuk ditindaklanjuti." : "Klik Lapor Kendala untuk membuka formulir."}>
          {open ? (
            <form className="space-y-3" onSubmit={submit}>
              <Field label="Perangkat">
                <div className="min-h-10 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/90">
                  <div className="font-medium">{deviceName}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{location}</div>
                </div>
              </Field>
              <Field label="Kategori masalah">
                <SelectInput value={form.kategori} onChange={(event) => setForm({ ...form, kategori: event.target.value as IssueReport["kategori"] })}>
                  {kategoriList.map((category) => <option key={category}>{category}</option>)}
                </SelectInput>
              </Field>
              <Field label="Prioritas">
                <div className="flex gap-1.5">
                  {(["Rendah", "Sedang", "Tinggi"] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setForm({ ...form, prioritas: priority })}
                      className={`h-9 flex-1 rounded-md border text-sm ${form.prioritas === priority ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Deskripsi">
                <textarea
                  value={form.deskripsi}
                  onChange={(event) => setForm({ ...form, deskripsi: event.target.value })}
                  rows={4}
                  placeholder="Jelaskan kondisi yang ditemukan…"
                  className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/20"
                />
              </Field>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setForm(defaultForm); setOpen(false); }} className="h-9 flex-1 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
                <button type="submit" className="h-9 flex-1 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-95">Kirim Laporan</button>
              </div>
            </form>
          ) : (
            <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center">
              <p className="text-sm font-medium">Form laporan ditutup.</p>
              <button onClick={() => setOpen(true)} className="mt-3 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">Buka Form</button>
            </div>
          )}
        </Section>
      </div>
    </AppShell>
  );
}
