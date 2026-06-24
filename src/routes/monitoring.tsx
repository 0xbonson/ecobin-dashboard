import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, MapPin, Wifi, Battery } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Section, StatusPill, FillBar } from "@/components/ui-bits";
import { bins, type Bin } from "@/lib/mock-data";
import { relativeTime, statusLabel, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/monitoring")({
  head: () => ({ meta: [{ title: "Monitoring Real-Time · EcoBin" }] }),
  component: MonitoringPage,
});

function tone(s: string) {
  if (s === "Normal") return "normal" as const;
  if (s === "Hampir Penuh") return "warn" as const;
  if (s === "Penuh") return "danger" as const;
  return "muted" as const;
}

function MonitoringPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Semua");
  const [lokasi, setLokasi] = useState("Semua");
  const [selected, setSelected] = useState<Bin | null>(null);
  const live = useLiveEcoBinTelemetry(5000);

  const displayBins = useMemo(() => {
    if (!live.telemetry) return bins;

    const telemetry = live.telemetry;
    const liveStatus = statusLabel(telemetry.binStatusText || telemetry.binStatus) as Bin["status"];

    return bins.map((bin) => {
      if (bin.id !== telemetry.deviceName) return bin;
      return {
        ...bin,
        lokasi: telemetry.location || bin.lokasi,
        kepenuhan: telemetry.fillLevel ?? bin.kepenuhan,
        status: liveStatus,
        koneksi: "Online",
        updateTerakhir: relativeTime(telemetry.updatedAt),
        jarakSensor: telemetry.distanceCm ?? bin.jarakSensor,
        sensorIR: telemetry.irDetected ? "Aktif" : "Nonaktif",
        servo: telemetry.servoStatus === "open" ? "Normal" : telemetry.servoStatus === "locked" ? "Tertutup" : bin.servo,
      };
    });
  }, [live.telemetry]);

  const lokasiList = useMemo(() => ["Semua", ...Array.from(new Set(displayBins.map((b) => b.lokasi)))], [displayBins]);

  const filtered = displayBins.filter((b) => {
    if (status !== "Semua" && b.status !== status) return false;
    if (lokasi !== "Semua" && b.lokasi !== lokasi) return false;
    if (q && !(`${b.id} ${b.lokasi}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <AppShell
      title="Monitoring Real-Time"
      subtitle="Pemantauan kondisi terkini setiap tempat sampah berbasis sensor ultrasonik dan IR."
    >
      <Section
        title={`${filtered.length} perangkat ditemukan`}
        description="Klik baris untuk melihat detail telemetri dan status komponen."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-2.5 h-9 rounded-md border border-border bg-background text-sm w-56">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari ID atau lokasi…"
                className="bg-transparent outline-none w-full placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 rounded-md border border-border bg-background px-2.5 text-sm"
            >
              {["Semua", "Normal", "Hampir Penuh", "Penuh", "Gangguan Sensor", "Offline"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="h-9 rounded-md border border-border bg-background px-2.5 text-sm"
            >
              {lokasiList.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2 px-5">ID Bin</th>
                <th className="text-left font-medium py-2 pr-3">Lokasi</th>
                <th className="text-left font-medium py-2 pr-3 w-44">Kepenuhan</th>
                <th className="text-left font-medium py-2 pr-3">Status</th>
                <th className="text-left font-medium py-2 pr-3">Baterai</th>
                <th className="text-left font-medium py-2 pr-3">Koneksi</th>
                <th className="text-left font-medium py-2 pr-3">Sensor IR</th>
                <th className="text-left font-medium py-2 px-5">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="border-b border-border last:border-0 hover:bg-muted/40 cursor-pointer"
                >
                  <td className="py-2.5 px-5 font-medium tabular-nums">{b.id}</td>
                  <td className="py-2.5 pr-3 text-foreground/80">{b.lokasi}</td>
                  <td className="py-2.5 pr-3"><FillBar value={b.kepenuhan} /></td>
                  <td className="py-2.5 pr-3"><StatusPill tone={tone(b.status)}>{b.status}</StatusPill></td>
                  <td className="py-2.5 pr-3 tabular-nums text-foreground/80">{live.telemetry && b.id === live.telemetry.deviceName ? "—" : `${b.baterai}%`}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-xs ${b.koneksi === "Online" ? "text-success" : "text-muted-foreground"}`}>
                      {b.koneksi} · {b.jenisKoneksi}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-xs">{b.sensorIR}</td>
                  <td className="py-2.5 px-5 text-xs text-muted-foreground">{b.updateTerakhir}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-sm text-muted-foreground">Tidak ada perangkat yang cocok dengan filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setSelected(null)} />
          <aside className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-xl overflow-y-auto">
            <header className="px-5 py-4 border-b border-border flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Detail Perangkat</div>
                <h3 className="text-base font-semibold mt-0.5">{selected.id} · {selected.lokasi}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {selected.lokasi}
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="h-8 w-8 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="p-5 space-y-5">
              {(selected.koneksi === "Offline" || selected.status === "Gangguan Sensor") && (
                <div className="rounded-md border border-warning/30 bg-warning/10 px-3 py-2.5 text-[12.5px] leading-snug text-foreground/90">
                  Data {selected.id} belum diperbarui selama {selected.updateTerakhir.replace(" lalu", "")}.
                  Periksa koneksi perangkat atau sensor ultrasonik.
                </div>
              )}

              <div className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="uppercase tracking-wider text-muted-foreground">Tingkat Kepenuhan</span>
                  <span className="text-muted-foreground">ID {selected.id}</span>
                </div>
                <div className="mt-1 text-3xl font-semibold tabular-nums">
                  {selected.kepenuhan === null ? "—" : `${selected.kepenuhan}%`}
                </div>
                <div className="mt-2"><FillBar value={selected.kepenuhan} /></div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <StatusPill tone={tone(selected.status)}>{selected.status}</StatusPill>
                  <span className="text-muted-foreground">Update {selected.updateTerakhir}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Telemetri Sensor</div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <Row k="Jarak ultrasonik" v={`${selected.jarakSensor} cm`} />
                  <Row k="Sensor IR" v={selected.sensorIR} />
                  <Row k="Servo penutup" v={selected.servo} />
                  <Row k="LED / Buzzer" v={selected.ledBuzzer} />
                  <Row k="Baterai" v={live.telemetry && selected.id === live.telemetry.deviceName ? "Belum tersedia" : <span className="inline-flex items-center gap-1"><Battery className="h-3.5 w-3.5"/>{selected.baterai}%</span>} />
                  <Row k="Koneksi" v={<span className="inline-flex items-center gap-1"><Wifi className="h-3.5 w-3.5"/>{selected.jenisKoneksi} · {selected.koneksi}</span>} />
                </dl>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Catatan Pemeliharaan</div>
                <p className="text-sm leading-relaxed text-foreground/80">{selected.catatan}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Terakhir dirawat: {selected.terakhirDirawat} · Instalasi: {selected.tanggalInstalasi}
                </div>
              </div>

              <details className="rounded-md border border-border bg-muted/30 text-xs">
                <summary className="cursor-pointer px-3 py-2 text-muted-foreground hover:text-foreground select-none">
                  Telemetri mentah (opsional)
                </summary>
                <pre className="px-3 pb-3 overflow-x-auto text-[11px] leading-snug text-foreground/70">{`{
  "device_id": "${selected.id}",
  "fill": ${selected.kepenuhan ?? "null"},
  "battery": ${selected.baterai},
  "rssi": -64,
  "link": "${selected.jenisKoneksi}",
  "ts": "2026-06-18T10:42:18Z"
}`}</pre>
              </details>

              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">
                  Jadwalkan Pengangkutan
                </button>
                <button className="h-9 px-3 rounded-md border border-border text-sm hover:bg-muted">
                  Buat Laporan
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </AppShell>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md border border-border bg-background px-3 py-2">
      <span className="text-[11px] text-muted-foreground">{k}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}
