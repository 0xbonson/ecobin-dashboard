import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Cloud,
  DoorOpen,
  Lightbulb,
  MapPin,
  Radio,
  Ruler,
  Volume2,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { FillBar, Section, StatusPill } from "@/components/ui-bits";
import { relativeTime, statusLabel, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/monitoring")({
  head: () => ({ meta: [{ title: "Monitoring Perangkat · EcoBin" }] }),
  component: MonitoringPage,
});

function tone(status: string) {
  if (status === "Normal") return "normal" as const;
  if (status === "Hampir Penuh") return "warn" as const;
  if (status === "Penuh") return "danger" as const;
  return "muted" as const;
}

function textServo(value: string | null) {
  if (value === "open") return "Terbuka";
  if (value === "closed") return "Tertutup";
  if (value === "locked") return "Terkunci";
  return "Belum tersedia";
}

function textState(value: string | null) {
  if (value === "on") return "Aktif";
  if (value === "off") return "Nonaktif";
  if (value === "alert") return "Peringatan";
  return "Belum tersedia";
}

function MonitoringPage() {
  const live = useLiveEcoBinTelemetry(5000);
  const telemetry = live.telemetry;
  const deviceName = telemetry?.deviceName || "Perangkat EcoBin";
  const location = telemetry?.location || "Lokasi belum ditentukan";
  const status = statusLabel(telemetry?.binStatusText || telemetry?.binStatus || null);
  const isOnline = Boolean(telemetry);
  const irStatus = telemetry?.irStatusText || (telemetry?.irDetected ? "Terdeteksi" : telemetry ? "Tidak Terdeteksi" : "Belum tersedia");

  return (
    <AppShell
      title="Monitoring Perangkat"
      subtitle="Detail telemetry, status sensor, dan aktuator dari perangkat yang terhubung ke ThingsBoard Cloud."
    >
      <Section
        title="Perangkat aktif"
        description="Menampilkan telemetry, status sensor, dan aktuator dari perangkat yang terhubung."
        action={<StatusPill tone={isOnline ? "normal" : "muted"}>{isOnline ? "Online" : "Menunggu telemetry"}</StatusPill>}
      >
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2 px-5">Perangkat</th>
                <th className="text-left font-medium py-2 pr-3">Lokasi</th>
                <th className="text-left font-medium py-2 pr-3 w-44">Kepenuhan</th>
                <th className="text-left font-medium py-2 pr-3">Status</th>
                <th className="text-left font-medium py-2 pr-3">Koneksi</th>
                <th className="text-left font-medium py-2 px-5">Update</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border last:border-0">
                <td className="py-3 px-5 font-medium tabular-nums">{deviceName}</td>
                <td className="py-3 pr-3 text-foreground/80">{location}</td>
                <td className="py-3 pr-3"><FillBar value={telemetry?.fillLevel ?? null} /></td>
                <td className="py-3 pr-3"><StatusPill tone={tone(status)}>{status}</StatusPill></td>
                <td className="py-3 pr-3 text-xs"><span className={isOnline ? "text-success" : "text-muted-foreground"}>{isOnline ? "Online · Wi-Fi" : "Belum tersedia"}</span></td>
                <td className="py-3 px-5 text-xs text-muted-foreground">{isOnline ? relativeTime(telemetry?.updatedAt ?? null) : "Belum ada data"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Telemetri Sensor" description="Nilai pembacaan dan status komponen paling baru.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TelemetryCard icon={Ruler} label="Jarak ultrasonik" value={telemetry?.distanceCm === null || telemetry?.distanceCm === undefined ? "—" : `${telemetry.distanceCm} cm`} />
            <TelemetryCard icon={Activity} label="Sensor IR" value={irStatus} />
            <TelemetryCard icon={DoorOpen} label="Servo penutup" value={textServo(telemetry?.servoStatus ?? null)} />
            <TelemetryCard icon={Lightbulb} label="LED" value={textState(telemetry?.ledStatus ?? null)} />
            <TelemetryCard icon={Volume2} label="Buzzer" value={textState(telemetry?.buzzerStatus ?? null)} />
            <TelemetryCard icon={Radio} label="Tingkat kepenuhan" value={telemetry?.fillLevel === null || telemetry?.fillLevel === undefined ? "—" : `${telemetry.fillLevel}%`} />
          </div>
        </Section>

        <Section title="Integrasi IoT" description="Alur data perangkat menuju dashboard web.">
          <div className="space-y-3 text-sm">
            <PipelineRow icon={Radio} label="ESP32" value="Membaca sensor ultrasonik dan IR" />
            <PipelineRow icon={Cloud} label="ThingsBoard Cloud" value="Menerima telemetry melalui HTTP POST" />
            <PipelineRow icon={MapPin} label="Dashboard Vercel" value="Menampilkan telemetry melalui API backend" />
          </div>
          {live.error && !live.loading && (
            <p className="mt-4 rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-muted-foreground">
              Endpoint belum memberikan telemetry: {live.error}
            </p>
          )}
        </Section>
      </div>

      <div className="mt-4">
        <Section title="Telemetry mentah" description="Data aktif yang diterima dashboard tanpa menampilkan credential atau token.">
          <pre className="overflow-x-auto rounded-md border border-border bg-muted/30 p-4 text-[11px] leading-relaxed text-foreground/80">{JSON.stringify({
            deviceName,
            location,
            fillLevel: telemetry?.fillLevel ?? null,
            distanceCm: telemetry?.distanceCm ?? null,
            binStatus: telemetry?.binStatus ?? null,
            irDetected: telemetry?.irDetected ?? null,
            servoStatus: telemetry?.servoStatus ?? null,
            ledStatus: telemetry?.ledStatus ?? null,
            buzzerStatus: telemetry?.buzzerStatus ?? null,
            updatedAt: telemetry?.updatedAt ?? null,
          }, null, 2)}</pre>
        </Section>
      </div>
    </AppShell>
  );
}

function TelemetryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-background px-3.5 py-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function PipelineRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-background px-3.5 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <div className="font-medium">{label}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}
