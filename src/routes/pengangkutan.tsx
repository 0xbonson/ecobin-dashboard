import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, UserPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DemoModal, Field, Section, SelectInput, StatusPill, TextInput } from "@/components/ui-bits";
import { bins, pengangkutanList, users, type Pengangkutan } from "@/lib/mock-data";

export const Route = createFileRoute("/pengangkutan")({
  head: () => ({ meta: [{ title: "Pengangkutan Sampah · EcoBin" }] }),
  component: PengangkutanPage,
});

function tone(s: Pengangkutan["status"]) {
  if (s === "Selesai") return "normal" as const;
  if (s === "Dalam Perjalanan") return "warn" as const;
  if (s === "Menunggu") return "info" as const;
  return "muted" as const;
}

function PengangkutanPage() {
  const [list, setList] = useState(pengangkutanList);
  const [selectedRoute, setSelectedRoute] = useState<Pengangkutan | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [assign, setAssign] = useState({ routeId: pengangkutanList[0]?.id ?? "", petugas: "Budi Santoso" });
  const [newRoute, setNewRoute] = useState({ rute: "Rute E — Zona Timur", petugas: "Budi Santoso", estimasi: "30 menit", bins: "ECO-09, ECO-07" });

  const setStatus = (id: string, status: Pengangkutan["status"]) => {
    setList((l) => l.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success("Status rute diperbarui.");
  };

  const assignOfficer = () => {
    setList((l) => l.map((r) => (r.id === assign.routeId ? { ...r, petugas: assign.petugas, status: r.status === "Dibatalkan" ? "Menunggu" : r.status } : r)));
    setAssignOpen(false);
    toast.success("Petugas berhasil ditugaskan.");
  };

  const createRoute = () => {
    const route: Pengangkutan = {
      id: `RT-${String.fromCharCode(65 + list.length)}`,
      rute: newRoute.rute,
      petugas: newRoute.petugas,
      estimasi: newRoute.estimasi,
      status: "Menunggu",
      bins: newRoute.bins.split(",").map((b) => b.trim().toUpperCase()).filter(Boolean),
    };
    setList((l) => [route, ...l]);
    setCreateOpen(false);
    toast.success("Rute baru berhasil dibuat.");
  };

  return (
    <AppShell
      title="Pengangkutan Sampah"
      subtitle="Antrian prioritas, penugasan petugas, dan status rute pengangkutan."
      actions={
        <>
          <button onClick={() => setAssignOpen(true)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">
            <UserPlus className="h-4 w-4" /> Tugaskan Petugas
          </button>
          <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">
            <Plus className="h-4 w-4" /> Buat Rute
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {list.map((r) => (
          <div key={r.id} className="rounded-lg border border-border bg-card p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.id}</div>
                <h3 className="text-sm font-semibold mt-0.5">{r.rute}</h3>
              </div>
              <StatusPill tone={tone(r.status)}>{r.status}</StatusPill>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Petugas</span><span className="font-medium">{r.petugas}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estimasi durasi</span><span className="tabular-nums">{r.estimasi}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Jumlah bin</span><span className="tabular-nums">{r.bins.length}</span></div>
            </div>

            <div className="mt-4 rounded-md border border-border bg-muted/40 p-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">Antrian Bin</div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {r.bins.map((b, i) => (
                  <span key={b} className="inline-flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md border border-border bg-card font-medium tabular-nums">{b}</span>
                    {i < r.bins.length - 1 && <span className="text-muted-foreground">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center gap-2">
              <select
                value={r.status}
                onChange={(e) => setStatus(r.id, e.target.value as Pengangkutan["status"])}
                className="h-9 flex-1 rounded-md border border-border bg-background px-2.5 text-sm"
              >
                {(["Menunggu", "Dalam Perjalanan", "Selesai", "Dibatalkan"] as const).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {r.status === "Dibatalkan" || r.status === "Selesai" ? (
                <button
                  type="button"
                  onClick={() => setSelectedRoute(r)}
                  className="inline-flex items-center gap-1 h-9 px-3 rounded-md border border-border bg-background text-sm text-muted-foreground hover:bg-muted"
                >
                  Lihat Detail
                </button>
              ) : (
                <button
                  onClick={() => setStatus(r.id, "Selesai")}
                  className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95"
                >
                  <Check className="h-4 w-4" /> Selesai
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <DemoModal open={assignOpen} title="Tugaskan Petugas" description="Pilih rute dan petugas lapangan untuk pengangkutan." onClose={() => setAssignOpen(false)} footer={<><button onClick={() => setAssignOpen(false)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button><button onClick={assignOfficer} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Simpan</button></>}>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Rute"><SelectInput value={assign.routeId} onChange={(e) => setAssign({ ...assign, routeId: e.target.value })}>{list.map((r) => <option key={r.id}>{r.id}</option>)}</SelectInput></Field>
          <Field label="Petugas"><SelectInput value={assign.petugas} onChange={(e) => setAssign({ ...assign, petugas: e.target.value })}>{users.filter((u) => u.role === "Petugas Lapangan").map((u) => <option key={u.id}>{u.nama}</option>)}</SelectInput></Field>
        </div>
      </DemoModal>

      <DemoModal open={createOpen} title="Buat Rute" description="Buat rute pengangkutan baru berdasarkan prioritas kepenuhan." onClose={() => setCreateOpen(false)} footer={<><button onClick={() => setCreateOpen(false)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button><button onClick={createRoute} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Buat Rute</button></>}>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Nama rute"><TextInput value={newRoute.rute} onChange={(e) => setNewRoute({ ...newRoute, rute: e.target.value })} /></Field>
          <Field label="Petugas"><SelectInput value={newRoute.petugas} onChange={(e) => setNewRoute({ ...newRoute, petugas: e.target.value })}>{users.filter((u) => u.role === "Petugas Lapangan").map((u) => <option key={u.id}>{u.nama}</option>)}</SelectInput></Field>
          <Field label="Estimasi"><TextInput value={newRoute.estimasi} onChange={(e) => setNewRoute({ ...newRoute, estimasi: e.target.value })} /></Field>
          <Field label="Daftar bin"><TextInput value={newRoute.bins} onChange={(e) => setNewRoute({ ...newRoute, bins: e.target.value })} placeholder="ECO-09, ECO-07" /></Field>
          <div className="text-xs text-muted-foreground">Referensi bin aktif: {bins.slice(0, 5).map((b) => b.id).join(", ")}</div>
        </div>
      </DemoModal>

      <DemoModal open={!!selectedRoute} title={selectedRoute ? `Detail ${selectedRoute.id}` : "Detail Rute"} description="Ringkasan rute pengangkutan dan status terakhir." onClose={() => setSelectedRoute(null)}>
        {selectedRoute && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><StatusPill tone={tone(selectedRoute.status)}>{selectedRoute.status}</StatusPill><span className="font-medium">{selectedRoute.rute}</span></div>
            <dl className="grid grid-cols-2 gap-3">
              <Info k="Petugas" v={selectedRoute.petugas} />
              <Info k="Estimasi" v={selectedRoute.estimasi} />
              <Info k="Jumlah bin" v={`${selectedRoute.bins.length} unit`} />
              <Info k="Antrian" v={selectedRoute.bins.join(" → ")} />
            </dl>
          </div>
        )}
      </DemoModal>
    </AppShell>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return <div className="rounded-md border border-border bg-muted/40 p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>;
}
