import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Field, Section, TextInput } from "@/components/ui-bits";

export const Route = createFileRoute("/pengaturan")({
  head: () => ({ meta: [{ title: "Pengaturan · EcoBin" }] }),
  component: PengaturanPage,
});

const defaults = {
  almost: 70,
  full: 80,
  interval: 10,
  notifWeb: true,
  notifMobile: true,
  optimasi: true,
  mqtt: "mqtts://broker.ecobin.id:8883",
  topic: "ecobin/devices",
  api: "https://api.ecobin.id/v1",
  region: "ap-southeast-1",
};

function PengaturanPage() {
  const [settings, setSettings] = useState(defaults);

  const save = () => {
    if (settings.interval < 5 || settings.interval > 300) {
      toast.error("Interval update harus berada pada rentang 5–300 detik.");
      return;
    }
    if (settings.almost >= settings.full) {
      toast.error("Threshold hampir penuh harus lebih kecil dari threshold penuh.");
      return;
    }
    toast.success("Data berhasil disimpan.");
  };

  const reset = () => {
    setSettings(defaults);
    toast.message("Perubahan dibatalkan dan pengaturan dikembalikan.");
  };

  return (
    <AppShell
      title="Pengaturan Sistem"
      subtitle="Konfigurasi ambang batas, notifikasi, dan integrasi cloud."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Threshold Sensor" description="Tentukan ambang batas tingkat kepenuhan.">
          <div className="space-y-5">
            <Slider label="Threshold hampir penuh" value={settings.almost} onChange={(almost) => setSettings({ ...settings, almost })} suffix="%" />
            <Slider label="Threshold penuh" value={settings.full} onChange={(full) => setSettings({ ...settings, full })} suffix="%" />
            <Field label="Interval update data">
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
              <p className="mt-1 text-[11px] text-muted-foreground">Disarankan 10–30 detik untuk demo dan sensor EcoBin.</p>
            </Field>
          </div>
        </Section>

        <Section title="Notifikasi" description="Atur kanal pengiriman notifikasi peringatan.">
          <div className="space-y-3">
            <Toggle label="Notifikasi web" desc="Tampilkan pop-up di dashboard saat ada alert." value={settings.notifWeb} onChange={(notifWeb) => setSettings({ ...settings, notifWeb })} />
            <Toggle label="Notifikasi mobile" desc="Kirim push notification ke aplikasi petugas." value={settings.notifMobile} onChange={(notifMobile) => setSettings({ ...settings, notifMobile })} />
            <Toggle label="Optimasi rute otomatis" desc="Saran rute pengangkutan berbasis kepenuhan." value={settings.optimasi} onChange={(optimasi) => setSettings({ ...settings, optimasi })} />
          </div>
        </Section>

        <Section title="Koneksi Cloud" description="Konfigurasi broker MQTT dan endpoint API." className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="MQTT Broker URL"><Input value={settings.mqtt} onChange={(e) => setSettings({ ...settings, mqtt: e.target.value })} /></Field>
            <Field label="Topic prefix"><Input value={settings.topic} onChange={(e) => setSettings({ ...settings, topic: e.target.value })} /></Field>
            <Field label="API Endpoint"><Input value={settings.api} onChange={(e) => setSettings({ ...settings, api: e.target.value })} /></Field>
            <Field label="Region"><Input value={settings.region} onChange={(e) => setSettings({ ...settings, region: e.target.value })} /></Field>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-md border border-border bg-muted/40 px-4 py-3 text-sm">
            <div>
              <div className="font-medium">Status koneksi</div>
              <div className="text-xs text-muted-foreground">Terhubung ke ThingsBoard Cloud · 1 device demo aktif · HTTP telemetry valid</div>
            </div>
            <span className="inline-flex items-center gap-2 text-success text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-success" /> Online
            </span>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={reset} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
            <button onClick={save} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">Simpan Perubahan</button>
          </div>
        </Section>
      </div>
    </AppShell>
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

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <TextInput {...props} />;
}
