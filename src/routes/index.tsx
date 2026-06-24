import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BellRing,
  CircleCheck,
  Cpu,
  Gauge,
  MapPin,
  Radio,
  Ruler,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { FillBar, Section, StatusPill } from "@/components/ui-bits";
import { relativeTime, statusLabel, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard ECO-01 · EcoBin" },
      { name: "description", content: "Monitoring telemetry EcoBin ECO-01 secara real-time." },
    ],
  }),
  component: DashboardPage,
});

function toneForStatus(status: string) {
  if (status === "Penuh") return "danger" as const;
  if (status === "Hampir Penuh") return "warn" as const;
  return "normal" as const;
}

function presentServo(value: string | null) {
  if (value === "open") return "Terbuka";
  if (value === "locked") return "Terkunci";
  if (value === "closed") return "Tertutup";
  return value || "Menunggu data";
}

function presentSwitch(value: string | null, onText: string, offText: string) {
  if (value === "on") return onText;
  if (value === "off") return offText;
  if (value === "alert") return "Peringatan aktif";
  if (value === "warning") return "Peringatan";
  if (value === "critical") return "Kritis";
  return value || "Belum tersedia";
}

function DashboardPage() {
  const live = useLiveEcoBinTelemetry(5000);
  const telemetry = live.telemetry;
  const status = statusLabel(telemetry?.binStatusText || telemetry?.binStatus || null);
  const fill = telemetry?.fillLevel ?? null;
  const isOnline = Boolean(telemetry);

  const cards = [
    { label: "Tingkat Kepenuhan", value: fill === null ? "—" : `${fill}%`, detail: "Dari sensor ultrasonik", icon: Gauge, tone: "text-primary" },
    { label: "Status Tong", value: isOnline ? status : "Menunggu data", detail: isOnline ? "Status terbaru perangkat" : "Hubungkan telemetry ESP32", icon: AlertTriangle, tone: status === "Penuh" ? "text-destructive" : status === "Hampir Penuh" ? "text-warning" : "text-success" },
    { label: "Jarak Sensor", value: telemetry?.distanceCm === null || telemetry?.distanceCm === undefined ? "—" : `${telemetry.distanceCm} cm`, detail: "Sensor ke permukaan sampah", icon: Ruler, tone: "text-primary" },
    { label: "Koneksi IoT", value: isOnline ? "Online" : "Offline", detail: isOnline ? `Update ${relativeTime(telemetry?.updatedAt ?? null)}` : "Menunggu data ThingsBoard", icon: Wifi, tone: isOnline ? "text-success" : "text-warning" },
  ];

  return (
    <AppShell
      title="Dashboard ECO-01"
      subtitle="Monitoring satu prototipe EcoBin berbasis ESP32, ThingsBoard, dan dashboard Vercel."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-lg border border-border bg-card px-4 py-3.5">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] uppercase tracking-wider">{card.label}</span>
                <Icon className={`h-4 w-4 ${card.tone}`} />
              </div>
              <div className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{card.value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{card.detail}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Section
          className="xl:col-span-2"
          title="Status Perangkat ECO-01"
          description="Fakultas Teknik · data diperbarui otomatis setiap 5 detik."
          action={
            <StatusPill tone={isOnline ? toneForStatus(status) : "muted"}>
              {isOnline ? status : "Menunggu telemetry"}
            </StatusPill>
          }
        >
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary grid place-items-center"><Cpu className="h-5 w-5" /></div>
                  <div>
                    <div className="font-semibold">ECO-01</div>
                    <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Fakultas Teknik</div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Radio className={`h-3.5 w-3.5 ${isOnline ? "text-success" : "text-warning"}`} />
                {isOnline ? `ThingsBoard online · ${relativeTime(telemetry?.updatedAt ?? null)}` : "Menunggu koneksi ThingsBoard"}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Tingkat Kepenuhan</span>
                <span className="text-lg font-semibold tabular-nums">{fill === null ? "—" : `${fill}%`}</span>
              </div>
              <FillBar value={fill} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <ComponentState label="Sensor IR" value={telemetry?.irStatusText || (telemetry?.irDetected ? "Terdeteksi" : "Tidak Terdeteksi")} icon={Activity} active={telemetry?.irDetected === true} />
            <ComponentState label="Servo Penutup" value={presentServo(telemetry?.servoStatus ?? null)} icon={CircleCheck} active={telemetry?.servoStatus === "open"} />
            <ComponentState label="LED" value={presentSwitch(telemetry?.ledStatus ?? null, "Aktif", "Nonaktif")} icon={ShieldCheck} active={telemetry?.ledStatus === "on"} />
            <ComponentState label="Buzzer" value={presentSwitch(telemetry?.buzzerStatus ?? null, "Aktif", "Nonaktif")} icon={BellRing} active={telemetry?.buzzerStatus === "on" || telemetry?.buzzerStatus === "alert"} />
          </div>
        </Section>

        <Section title="Tindakan Operasional" description="Aksi untuk satu prototipe perangkat.">
          <div className="space-y-3">
            <div className="rounded-md border border-border bg-muted/30 px-3 py-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Prioritas saat ini</div>
              <div className="mt-1 text-sm font-medium">{status === "Penuh" ? "Pengangkutan perlu dijadwalkan" : status === "Hampir Penuh" ? "Pantau kondisi tong" : "Kondisi perangkat normal"}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{status === "Penuh" ? "Tong sudah mencapai batas kepenuhan." : "Dashboard difokuskan pada ECO-01 sebagai prototipe aktif."}</p>
            </div>
            <Link to="/monitoring" className="flex h-10 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-95">Lihat Detail Telemetry</Link>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/pengangkutan" className="flex h-9 items-center justify-center rounded-md border border-border text-xs font-medium hover:bg-muted">Jadwalkan Pengangkutan</Link>
              <Link to="/laporan" className="flex h-9 items-center justify-center rounded-md border border-border text-xs font-medium hover:bg-muted">Buat Laporan</Link>
            </div>
          </div>
        </Section>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Alur Data IoT" description="Komponen sistem yang sedang digunakan pada implementasi ini.">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <FlowLabel label="ESP32 + Sensor" />
            <span className="text-muted-foreground">→</span>
            <FlowLabel label="HTTP" />
            <span className="text-muted-foreground">→</span>
            <FlowLabel label="ThingsBoard Cloud" />
            <span className="text-muted-foreground">→</span>
            <FlowLabel label="API Vercel" />
            <span className="text-muted-foreground">→</span>
            <FlowLabel label="Dashboard EcoBin" />
          </div>
        </Section>

        <Section title="Catatan Implementasi" description="Batasan prototipe yang disampaikan secara jujur saat demo.">
          <p className="text-sm leading-relaxed text-foreground/80">
            Sistem saat ini memonitor satu perangkat aktif, yaitu <span className="font-medium">ECO-01</span>. Dashboard dirancang agar dapat dikembangkan ke banyak perangkat pada tahap berikutnya, tetapi data aktif pada demo ini hanya berasal dari telemetry ECO-01.
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

function ComponentState({ label, value, icon: Icon, active }: { label: string; value: string; icon: typeof Activity; active: boolean }) {
  return (
    <div className="rounded-md border border-border bg-background px-3 py-3">
      <div className="flex items-center justify-between gap-2 text-muted-foreground">
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
        <Icon className={`h-3.5 w-3.5 ${active ? "text-success" : "text-muted-foreground"}`} />
      </div>
      <div className="mt-1.5 text-sm font-medium leading-tight">{value}</div>
    </div>
  );
}

function FlowLabel({ label }: { label: string }) {
  return <span className="rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-xs font-medium">{label}</span>;
}
