import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Section } from "@/components/ui-bits";
import { relativeTime, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/pengaturan")({
  head: () => ({ meta: [{ title: "Pengaturan · EcoBin" }] }),
  component: PengaturanPage,
});

function PengaturanPage() {
  const live = useLiveEcoBinTelemetry(5000);
  const [webNotice, setWebNotice] = useState(true);
  const [fullNotice, setFullNotice] = useState(true);

  const connected = Boolean(live.telemetry);
  const deviceName = live.telemetry?.deviceName || "Perangkat EcoBin";
  const location = live.telemetry?.location || "Lokasi belum ditentukan";

  return (
    <AppShell
      title="Pengaturan Sistem"
      subtitle="Informasi ambang perangkat, notifikasi dashboard, dan integrasi IoT."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Ambang Perangkat" description="Nilai ini mengikuti logika firmware ESP32 dan tidak diubah dari browser.">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoCard label="Status normal" value="Lebih dari 15 cm" description="Ruang sampah masih tersedia." />
            <InfoCard label="Hampir penuh" value="6–15 cm" description="Perlu dipantau atau dijadwalkan." />
            <InfoCard label="Penuh" value="6 cm atau kurang" description="Servo terkunci dan buzzer aktif." />
          </div>
          <div className="mt-4 rounded-md border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
            Tingkat kepenuhan dihitung dari pembacaan ultrasonik. Perubahan ambang harus dilakukan pada firmware ESP32 agar konsisten dengan perangkat.
          </div>
        </Section>

        <Section title="Notifikasi Dashboard" description="Preferensi tampilan peringatan pada sesi browser ini.">
          <div className="space-y-3">
            <Toggle label="Indikator koneksi IoT" desc="Tampilkan status koneksi ThingsBoard pada header dashboard." value={webNotice} onChange={setWebNotice} />
            <Toggle label="Peringatan tong penuh" desc="Tandai kondisi penuh sebagai informasi prioritas di dashboard." value={fullNotice} onChange={setFullNotice} />
          </div>
        </Section>

        <Section title="Koneksi IoT" description="Integrasi HTTP antara ESP32, ThingsBoard Cloud, dan dashboard EcoBin." className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <InfoField label="Platform IoT" value="ThingsBoard Cloud" />
            <InfoField label="Protokol telemetry" value="HTTP POST" />
            <InfoField label="ThingsBoard URL" value="https://thingsboard.cloud" />
            <InfoField label="Dashboard API" value="/api/ecobin/latest" />
            <InfoField label="Perangkat terhubung" value={deviceName} />
            <InfoField label="Lokasi perangkat" value={location} />
          </div>

          <div className={`mt-4 flex items-start justify-between gap-4 rounded-md border px-4 py-3 text-sm ${connected ? "border-success/25 bg-success/5" : "border-warning/30 bg-warning/10"}`}>
            <div>
              <div className="font-medium">Status koneksi</div>
              <div className="text-xs text-muted-foreground">
                {connected
                  ? `Telemetry HTTP aktif dari ${deviceName} · pembaruan ${relativeTime(live.telemetry?.updatedAt ?? null)}`
                  : live.loading
                    ? "Memeriksa endpoint telemetry…"
                    : "Telemetry belum tersedia. Pastikan environment variable ThingsBoard sudah aktif di Vercel."}
              </div>
            </div>
            <span className={`inline-flex shrink-0 items-center gap-2 text-xs font-medium ${connected ? "text-success" : "text-warning-foreground"}`}>
              <span className={`h-2 w-2 rounded-full ${connected ? "bg-success" : "bg-warning"}`} />
              {connected ? "Online" : "Menunggu telemetry"}
            </span>
          </div>

          {live.error && !live.loading && (
            <p className="mt-3 text-xs text-muted-foreground">Detail: {live.error}</p>
          )}

          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            Credential ThingsBoard disimpan sebagai environment variable Vercel dan tidak dapat diubah melalui browser.
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="min-h-10 break-all rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/90">{value}</div>
    </div>
  );
}

function InfoCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/20 p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{description}</div>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className="flex w-full items-center justify-between gap-4 rounded-md border border-border p-3 text-left hover:bg-muted/40"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{desc}</span>
      </span>
      <span className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${value ? "border-primary bg-primary" : "border-border bg-muted"}`}>
        <span className={`inline-block h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}
