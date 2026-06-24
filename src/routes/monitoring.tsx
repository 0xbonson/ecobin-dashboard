import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BellRing, CircleCheck, Cpu, MapPin, Radio, Ruler, ShieldCheck, Wifi } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { FillBar, Section, StatusPill } from "@/components/ui-bits";
import { relativeTime, statusLabel, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/monitoring")({
  head: () => ({ meta: [{ title: "Monitoring ECO-01 · EcoBin" }] }),
  component: MonitoringPage,
});

function toneForStatus(status: string) {
  if (status === "Penuh") return "danger" as const;
  if (status === "Hampir Penuh") return "warn" as const;
  return "normal" as const;
}

function servoLabel(value: string | null) {
  if (value === "open") return "Terbuka";
  if (value === "locked") return "Terkunci";
  if (value === "closed") return "Tertutup";
  return value || "Belum tersedia";
}

function statusLabelForOutput(value: string | null, type: "led" | "buzzer") {
  if (value === "on") return "Aktif";
  if (value === "off") return "Nonaktif";
  if (value === "alert") return "Peringatan aktif";
  if (value === "warning") return type === "led" ? "Indikator peringatan" : "Peringatan";
  if (value === "critical") return "Kritis";
  return value || "Belum tersedia";
}

function MonitoringPage() {
  const live = useLiveEcoBinTelemetry(5000);
  const telemetry = live.telemetry;
  const status = statusLabel(telemetry?.binStatusText || telemetry?.binStatus || null);
  const fill = telemetry?.fillLevel ?? null;
  const online = Boolean(telemetry);

  return (
    <AppShell
      title="Monitoring ECO-01"
      subtitle="Pemantauan real-time prototipe EcoBin menggunakan telemetry sensor ultrasonik dan IR."
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Section
          className="xl:col-span-2"
          title="Perangkat Aktif"
          description="Satu perangkat aktif pada tahap implementasi saat ini."
          action={<StatusPill tone={online ? toneForStatus(status) : "muted"}>{online ? status : "Menunggu telemetry"}</StatusPill>}
        >
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-md bg-primary/10 text-primary grid place-items-center"><Cpu className="h-5 w-5" /></div>
                <div>
                  <div className="text-base font-semibold">{telemetry?.deviceName || "ECO-01"}</div>
                  <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {telemetry?.location || "Fakultas Teknik"}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Radio className={`h-3.5 w-3.5 ${online ? "text-success" : "text-warning"}`} />
                {online ? `HTTP ThingsBoard · ${relativeTime(telemetry?.updatedAt ?? null)}` : "Menunggu koneksi ThingsBoard"}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Tingkat Kepenuhan</span>
                <span className="text-3xl font-semibold tabular-nums">{fill === null ? "—" : `${fill}%`}</span>
              </div>
              <FillBar value={fill} />
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Telemetri Terkini</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TelemetryRow label="Jarak ultrasonik" value={telemetry?.distanceCm === null || telemetry?.distanceCm === undefined ? "Belum tersedia" : `${telemetry.distanceCm} cm`} icon={Ruler} />
              <TelemetryRow label="Status tong" value={online ? status : "Menunggu data"} icon={Activity} />
              <TelemetryRow label="Sensor IR" value={telemetry?.irStatusText || (telemetry?.irDetected ? "Terdeteksi" : "Tidak Terdeteksi")} icon={Activity} />
              <TelemetryRow label="Servo penutup" value={servoLabel(telemetry?.servoStatus ?? null)} icon={CircleCheck} />
              <TelemetryRow label="LED" value={statusLabelForOutput(telemetry?.ledStatus ?? null, "led")} icon={ShieldCheck} />
              <TelemetryRow label="Buzzer" value={statusLabelForOutput(telemetry?.buzzerStatus ?? null, "buzzer")} icon={BellRing} />
              <TelemetryRow label="Koneksi" value={online ? "Wi-Fi · Online" : "Offline"} icon={Wifi} />
              <TelemetryRow label="Baterai" value="Belum tersedia" icon={Wifi} />
            </div>
          </div>
        </Section>

        <Section title="Tindakan Lanjutan" description="Aksi operasional untuk ECO-01.">
          <div className="space-y-3">
            <div className="rounded-md border border-border bg-muted/30 px-3 py-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Kondisi saat ini</div>
              <div className="mt-1 text-sm font-medium">{status === "Penuh" ? "Tong perlu dikosongkan" : status === "Hampir Penuh" ? "Pantau dan jadwalkan pengangkutan" : "Belum perlu tindakan"}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{status === "Penuh" ? "Servo seharusnya terkunci agar tutup tidak dibuka lagi." : "Status akan berubah otomatis ketika ESP32 mengirim telemetry baru."}</p>
            </div>
            <Link to="/pengangkutan" className="flex h-10 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-95">Jadwalkan Pengangkutan</Link>
            <Link to="/laporan" className="flex h-9 items-center justify-center rounded-md border border-border text-sm font-medium hover:bg-muted">Buat Laporan Kendala</Link>
          </div>
        </Section>
      </div>

      <Section className="mt-4" title="Data Teknis" description="Telemetry yang dibaca dari endpoint /api/ecobin/latest.">
        <details className="rounded-md border border-border bg-muted/30 text-xs">
          <summary className="cursor-pointer px-3 py-2.5 text-muted-foreground hover:text-foreground select-none">Tampilkan telemetry mentah</summary>
          <pre className="overflow-x-auto px-3 pb-3 text-[11px] leading-relaxed text-foreground/75">{JSON.stringify(telemetry ?? { status: "Menunggu telemetry ThingsBoard" }, null, 2)}</pre>
        </details>
      </Section>
    </AppShell>
  );
}

function TelemetryRow({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Activity }) {
  return (
    <div className="rounded-md border border-border bg-background px-3 py-3">
      <div className="flex items-center justify-between gap-3 text-muted-foreground">
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="mt-1.5 text-sm font-medium">{value}</div>
    </div>
  );
}
