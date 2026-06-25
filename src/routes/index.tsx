import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BellRing,
  CircleAlert,
  DoorOpen,
  Gauge,
  Lightbulb,
  MapPin,
  Radio,
  Ruler,
  Volume2,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { FillBar, Section, StatusPill } from "@/components/ui-bits";
import { relativeTime, statusLabel, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoBin Monitoring" },
      { name: "description", content: "Monitoring perangkat IoT EcoBin secara real-time." },
    ],
  }),
  component: DashboardPage,
});

function statusTone(status: string) {
  if (status === "Normal") return "normal" as const;
  if (status === "Hampir Penuh") return "warn" as const;
  if (status === "Penuh") return "danger" as const;
  return "muted" as const;
}

function labelServo(value: string | null) {
  if (value === "open") return "Terbuka";
  if (value === "closed") return "Tertutup";
  if (value === "locked") return "Terkunci";
  return "Belum tersedia";
}

function labelState(value: string | null, onLabel = "Aktif", offLabel = "Nonaktif") {
  if (value === "on") return onLabel;
  if (value === "off") return offLabel;
  if (value === "alert") return "Peringatan";
  return "Belum tersedia";
}

function DashboardPage() {
  const live = useLiveEcoBinTelemetry(5000);
  const telemetry = live.telemetry;
  const deviceName = telemetry?.deviceName || "Perangkat EcoBin";
  const location = telemetry?.location || "Lokasi belum ditentukan";
  const status = statusLabel(telemetry?.binStatusText || telemetry?.binStatus || null);
  const fillLevel = telemetry?.fillLevel ?? null;
  const distanceCm = telemetry?.distanceCm ?? null;
  const updatedAt = telemetry?.updatedAt ?? null;
  const isOnline = Boolean(telemetry);
  const irStatus = telemetry?.irStatusText || (telemetry?.irDetected ? "Terdeteksi" : telemetry ? "Tidak Terdeteksi" : "Belum tersedia");
  const servoStatus = labelServo(telemetry?.servoStatus ?? null);
  const ledStatus = labelState(telemetry?.ledStatus ?? null);
  const buzzerStatus = labelState(telemetry?.buzzerStatus ?? null);

  const actionText =
    status === "Penuh"
      ? "Tong sudah penuh. Prioritaskan pengangkutan dan servo tetap terkunci."
      : status === "Hampir Penuh"
        ? "Tong mendekati batas penuh. Pantau kondisi dan siapkan pengangkutan."
        : "Kondisi perangkat normal. Sistem tetap memantau telemetry secara berkala.";

  return (
    <AppShell
      title="EcoBin Monitoring"
      subtitle="Pantau kondisi perangkat, sensor, aktuator, dan telemetry cloud secara real-time."
    >
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{deviceName}</h2>
              <StatusPill tone={isOnline ? "normal" : "muted"}>{isOnline ? "Online" : "Menunggu data"}</StatusPill>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {location}
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Data pada halaman ini difokuskan pada satu perangkat fisik yang terhubung ke ThingsBoard Cloud melalui HTTP.
            </p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 px-3.5 py-3 text-sm md:min-w-56">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Pembaruan terakhir</div>
            <div className="mt-1 font-medium">{isOnline ? relativeTime(updatedAt) : "Belum ada telemetry"}</div>
            <div className="mt-1 text-xs text-muted-foreground">ESP32 → HTTP → ThingsBoard → Vercel</div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <MetricCard icon={Gauge} label="Tingkat Kepenuhan" value={fillLevel === null ? "—" : `${fillLevel}%`} tone="text-primary">
          <div className="mt-2"><FillBar value={fillLevel} /></div>
        </MetricCard>
        <MetricCard icon={CircleAlert} label="Status Tong" value={status} tone={status === "Penuh" ? "text-destructive" : status === "Hampir Penuh" ? "text-warning" : "text-success"}>
          <div className="mt-2"><StatusPill tone={statusTone(status)}>{status}</StatusPill></div>
        </MetricCard>
        <MetricCard icon={Ruler} label="Jarak Ultrasonik" value={distanceCm === null ? "—" : `${distanceCm} cm`} tone="text-primary">
          <p className="mt-2 text-xs text-muted-foreground">Jarak sensor ke permukaan sampah.</p>
        </MetricCard>
        <MetricCard icon={Radio} label="Koneksi IoT" value={isOnline ? "Online" : "Belum aktif"} tone={isOnline ? "text-success" : "text-warning"}>
          <p className="mt-2 text-xs text-muted-foreground">ThingsBoard Cloud melalui HTTP.</p>
        </MetricCard>
      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Section
          className="xl:col-span-2"
          title="Status Sensor dan Aktuator"
          description="Kondisi komponen terbaru yang dikirim oleh perangkat terhubung."
          action={<StatusPill tone={isOnline ? "normal" : "muted"}>{isOnline ? "Telemetry aktif" : "Menunggu telemetry"}</StatusPill>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DeviceState icon={Activity} label="Sensor IR" value={irStatus} detail="Mendeteksi pengguna atau objek di depan tong." />
            <DeviceState icon={DoorOpen} label="Servo Penutup" value={servoStatus} detail="Membuka tutup hanya saat tong belum penuh." />
            <DeviceState icon={Lightbulb} label="LED" value={ledStatus} detail="Indikator saat pengguna terdeteksi dan tutup membuka." />
            <DeviceState icon={Volume2} label="Buzzer" value={buzzerStatus} detail="Peringatan suara ketika tong sudah penuh." />
          </div>
        </Section>

        <Section title="Tindak Lanjut" description="Rekomendasi berdasarkan status perangkat saat ini.">
          <div className="rounded-md border border-border bg-muted/30 p-3.5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BellRing className="h-4 w-4 text-primary" /> Status operasional
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{actionText}</p>
          </div>
          <Link
            to="/laporan"
            className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md border border-border text-sm font-medium hover:bg-muted"
          >
            Buat Laporan Kendala
          </Link>
        </Section>
      </div>

      <div className="mt-4">
        <Section title="Informasi Sistem" description="Ringkasan koneksi dan konfigurasi monitoring EcoBin.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <InfoItem label="Perangkat aktif" value={`${deviceName} · ${location}`} />
            <InfoItem label="Platform IoT" value="ThingsBoard Cloud" />
            <InfoItem label="Protokol telemetry" value="HTTP POST" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Dashboard dirancang agar dapat dikembangkan untuk beberapa perangkat pada tahap berikutnya. Pada demonstrasi ini, hanya telemetry dari {deviceName} yang digunakan sebagai data aktif.
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone,
  children,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3.5">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
        <Icon className={`h-3.5 w-3.5 ${tone}`} />
      </div>
      <div className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
      {children}
    </div>
  );
}

function DeviceState({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border border-border bg-background px-3.5 py-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background px-3.5 py-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
