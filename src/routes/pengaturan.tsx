import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Field, Section, TextInput } from "@/components/ui-bits";
import { relativeTime, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

export const Route = createFileRoute("/pengaturan")({
  head: () => ({ meta: [{ title: "Pengaturan · EcoBin" }] }),
  component: PengaturanPage,
});

const defaults = {
  almost: 70,
  full: 90,
  interval: 10,
  notifWeb: true,
  notifMobile: true,
  optimasi: true,
};

function PengaturanPage() {
  const [settings, setSettings] = useState(defaults);
  const live = useLiveEcoBinTelemetry(5000);

  const save = () => {
    if (settings.interval < 5 || settings.interval > 300) {
      toast.error("Interval update harus berada pada rentang 5–300 detik.");
      return;
    }
    if (settings.almost >= settings.full) {
      toast.error("Threshold hampir penuh harus lebih kecil dari threshold penuh.");
      return;
    }
    toast.success("Preferensi demo disimpan untuk sesi ini.");
  };

  const reset = () => {
    setSettings(defaults);
    toast.message("Pengaturan dikembalikan ke nilai awal.");
  };

  const connected = Boolean(live.telemetry);

  return (
    <AppShell
      title="Pengaturan Sistem"
      subtitle="Konfigurasi ambang batas, notifikasi, dan status integrasi IoT."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Threshold Sensor" description="Tentukan ambang batas tingkat kepenuhan.">
          <div className="space-y-5">
            <Slider label="Threshold hampir penuh" value={settings.almost} onChange={(almost) => setSettings({ ...settings, almost })} suffix="%" />
            <Slider label="Threshold penuh" value={settings.full} onChange={(full) => setSettings({ ...settings, full })} suffix="%" />
            <Field label="Interval pembaruan dashboard">
              <div className="flex items-center gap-3">
                <TextInput
                  type="number"
                  min={5}
                  max={300}
                  value={settings.interval}
                  onChange={(e) => setSettings({ ...settings, interval: Number(e.target.value) })}
                  className="w-24 tabular-nums"
                />
                <span className="text-sm text-muted-foreground">detik</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Disarankan 5–10 detik untuk demo telemetry EcoBin.</p>
            </Field>
          </div>
        </Section>

        <Section title="Notifikasi" description="Atur kanal peringatan bagi admin dan petugas.">
          <div className="space-y-3">
            <Toggle label="Notifikasi web" desc="Tampilkan pemberitahuan di dashboard saat ada alert." value={settings.notifWeb} onChange={(notifWeb) => setSettings({ ...settings, notifWeb })} />
            <Toggle label="Notifikasi mobile" desc="Kirim push notification ke aplikasi petugas." value={settings.notifMobile} onChange={(notifMobile) => setSettings({ ...settings, notifMobile })} />
            <Toggle label="Optimasi rute otomatis" desc="Saran rute pengangkutan berdasarkan prioritas kepenuhan." value={settings.optimasi} onChange={(optimasi) => setSettings({ ...settings, optimasi })} />
          </div>
        </Section>

        <Section title="Koneksi IoT" description="Integrasi HTTP antara ESP32, ThingsBoard Cloud, dan dashboard EcoBin." className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoField label="Platform IoT" value="ThingsBoard Cloud" />
            <InfoField label="Protokol telemetry" value="HTTP POST" />
            <InfoField label="ThingsBoard URL" value="https://thingsboard.cloud" />
            <InfoField label="Dashboard API" value="/api/ecobin/latest" />
            <InfoField label="Perangkat terhubung" value={live.telemetry?.deviceName || "ECO-01"} />
            <InfoField label="Lokasi perangkat" value={live.telemetry?.location || "Fakultas Teknik"} />
          </div>

          <div className={`mt-4 flex items-start justify-between gap-4 rounded-md border px-4 py-3 text-sm ${connected ? "border-success/25 bg-success/5" : "border-warning/30 bg-warning/10"}`}>
            <div>
              <div className="font-medium">Status koneksi</div>
              {connected ? (
                <div className="text-xs text-muted-foreground">
                  Telemetry HTTP aktif dari {live.telemetry?.deviceName} · pembaruan {relativeTime(live.telemetry?.updatedAt ?? null)}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  {live.loading ? "Memeriksa endpoint telemetry…" : "Integrasi belum aktif. Tambahkan environment variable ThingsBoard di Vercel."}
                </div>
              )}
            </div>
            <span className={`inline-flex shrink-0 items-center gap-2 text-xs font-medium ${connected ? "text-success" : "text-warning-foreground"}`}>
              <span className={`h-2 w-2 rounded-full ${connected ? "bg-success" : "bg-warning"}`} />
              {connected ? "Online" : "Belum dikonfigurasi"}
            </span>
          </div>

          {live.error && !live.loading && (
            <p className="mt-3 text-xs text-muted-foreground">
              Detail: {live.error}
            </p>
          )}

          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            Credential ThingsBoard disimpan sebagai environment variable Vercel dan tidak dapat diubah melalui browser.
          </p>
        </Section>

        <div className="lg:col-span-2 flex justify-end gap-2">
          <button onClick={reset} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
          <button onClick={save} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">Simpan Preferensi</button>
        </div>
      </div>
    </AppShell>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="min-h-10 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/90 break-all">{value}</div>
    </div>
  );
}

function Slider({ label, value, onChange, suffix }: { label: string; value: number; onChange: (v: number) => void; suffix: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums">{value}{suffix}</span>
      </div>
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[color:var(--primary)]" />
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className="flex w-full items-center justify-between gap-4 rounded-md border border-border p-3 text-left hover:bg-muted/40"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground mt-0.5">{desc}</span>
      </span>
      <span className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${value ? "border-primary bg-primary" : "border-border bg-muted"}`}>
        <span className={`inline-block h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}
