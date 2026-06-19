import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Trash2, CheckCircle2, AlertTriangle, AlertOctagon, BellRing,
  TrendingUp, MapPin, ArrowUpRight, Clock, Route as RouteIcon, WifiOff,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

import { AppShell } from "@/components/app-shell";
import { Section, StatusPill, FillBar, DemoModal } from "@/components/ui-bits";
import { bins, alerts, trend7d, distribusiStatus, pengangkutanHarian, type AlertItem } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · EcoBin" },
      { name: "description", content: "Ringkasan operasional sistem monitoring tempat sampah pintar." },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Total Bin Terhubung", value: 23, delta: "+2 minggu ini", icon: Trash2, tone: "text-primary" },
  { label: "Bin Normal", value: 18, delta: "78% dari total", icon: CheckCircle2, tone: "text-success" },
  { label: "Hampir Penuh", value: 5, delta: "Pantau rutin", icon: AlertTriangle, tone: "text-warning" },
  { label: "Bin Penuh", value: 3, delta: "Prioritas angkut", icon: AlertOctagon, tone: "text-destructive" },
  { label: "Notifikasi Aktif", value: 7, delta: "2 kritis", icon: BellRing, tone: "text-foreground" },
  { label: "Efisiensi Pengangkutan", value: "87%", delta: "+3% vs minggu lalu", icon: TrendingUp, tone: "text-primary" },
];

function statusTone(s: string) {
  if (s === "Normal") return "normal" as const;
  if (s === "Hampir Penuh") return "warn" as const;
  if (s === "Penuh") return "danger" as const;
  return "muted" as const;
}

function DashboardPage() {
  const [readAlerts, setReadAlerts] = useState<Set<string>>(new Set());
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  return (
    <AppShell
      title="Dashboard Operasional"
      subtitle="Pantau status tempat sampah, notifikasi, dan aktivitas pengangkutan secara real-time."
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-card px-4 py-3.5"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] uppercase tracking-wider">{s.label}</span>
                <Icon className={`h-3.5 w-3.5 ${s.tone}`} />
              </div>
              <div className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{s.delta}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section
          className="lg:col-span-2"
          title="Tren Kepenuhan 7 Hari"
          description="Rata-rata dan puncak tingkat kepenuhan harian (%)."
          action={
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary"/>Rata-rata</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning"/>Puncak</span>
            </div>
          }
        >
          <div className="h-[240px]">
            <ResponsiveContainer>
              <LineChart data={trend7d} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hari" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="rata" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="puncak" stroke="var(--warning)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Distribusi Status" description="Sebaran 23 perangkat aktif.">
          <div className="h-[240px] flex items-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={distribusiStatus} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={2}>
                  {distribusiStatus.map((_, i) => (
                    <Cell key={i} fill={["var(--success)", "var(--warning)", "var(--destructive)", "var(--muted-foreground)"][i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {distribusiStatus.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: ["var(--success)", "var(--warning)", "var(--destructive)", "var(--muted-foreground)"][i] }} />
                  {d.name}
                </span>
                <span className="tabular-nums text-muted-foreground">{d.value} unit</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Monitoring + Alerts */}
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Section
          className="xl:col-span-2"
          title="Monitoring Tempat Sampah"
          description="Pembaruan otomatis setiap 10 detik melalui MQTT."
          action={
            <Link to="/monitoring" className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:underline">
              Lihat semua <ArrowUpRight className="h-3 w-3" />
            </Link>
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
                  <th className="text-left font-medium py-2 pr-3">Update</th>
                  <th className="text-right font-medium py-2 px-5">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bins.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="py-2.5 px-5 font-medium tabular-nums">{b.id}</td>
                    <td className="py-2.5 pr-3 text-foreground/80">{b.lokasi}</td>
                    <td className="py-2.5 pr-3"><FillBar value={b.kepenuhan} /></td>
                    <td className="py-2.5 pr-3"><StatusPill tone={statusTone(b.status)}>{b.status}</StatusPill></td>
                    <td className="py-2.5 pr-3 tabular-nums text-foreground/80">{b.baterai}%</td>
                    <td className="py-2.5 pr-3">
                      <span className={`text-xs ${b.koneksi === "Online" ? "text-success" : "text-muted-foreground"}`}>
                        {b.koneksi}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-muted-foreground">{b.updateTerakhir}</td>
                    <td className="py-2.5 px-5 text-right">
                      <button onClick={() => toast.message(`Detail ${b.id} dibuka di halaman Monitoring.`)} className="text-xs font-medium text-primary hover:underline">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Alert Terbaru"
          description="Peringatan dari sensor IoT pada 24 jam terakhir."
          action={<span className="text-[11px] text-muted-foreground">{alerts.length - readAlerts.size} belum dibaca</span>}
        >
          {alerts.length === 0 ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-6 w-6 text-success/80" />
              <p className="mt-2 text-sm font-medium">Tidak ada notifikasi kritis saat ini.</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Semua tempat sampah dalam kondisi aman.</p>
            </div>
          ) : (
          <ul className="space-y-2.5">
            {alerts.map((a) => {
              const read = readAlerts.has(a.id);
              const tone = a.severity === "Kritis" ? "danger" : a.severity === "Peringatan" ? "warn" : "info";
              return (
                <li
                  key={a.id}
                  className={`rounded-md border border-border p-3 ${read ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <StatusPill tone={tone}>{a.severity}</StatusPill>
                        <span className="text-xs font-medium">{a.binId}</span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-snug">{a.pesan}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.lokasi}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.waktu}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <button
                      onClick={() =>
                        setReadAlerts((s) => {
                          const n = new Set(s);
                          if (n.has(a.id)) n.delete(a.id); else n.add(a.id);
                          return n;
                        })
                      }
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      {read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                    </button>
                    <button onClick={() => setSelectedAlert(a)} className="text-[11px] font-medium text-primary px-2.5 py-1 rounded-md border border-border hover:bg-muted">
                      Lihat Detail
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          )}
        </Section>
      </div>

      {/* Stale data callout */}
      <div className="mt-4 rounded-md border border-warning/30 bg-warning/10 px-4 py-3 flex items-start gap-3">
        <WifiOff className="h-4 w-4 mt-0.5 text-warning shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-foreground">
            Data ECO-03 belum diperbarui selama 15 menit.
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Periksa koneksi perangkat atau sensor ultrasonik di Lapangan Utama.
          </p>
        </div>
        <Link
          to="/monitoring"
          className="text-[11px] font-medium text-primary hover:underline whitespace-nowrap"
        >
          Periksa Perangkat
        </Link>
      </div>

      {/* Bottom row: Aktivitas + Rute Prioritas + Sebaran Lokasi */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Aktivitas Pengangkutan Harian" description="Jumlah bin terangkut per hari (7 hari).">
          <div className="h-[200px]">
            <ResponsiveContainer>
              <BarChart data={pengangkutanHarian} margin={{ left: -10, right: 8, top: 6, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hari" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="jumlah" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section
          title="Rute Prioritas Hari Ini"
          description="Urutan pengangkutan berdasarkan tingkat kepenuhan."
          action={<StatusPill tone="warn">Menunggu Pengangkutan</StatusPill>}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <RouteIcon className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">ECO-09</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">ECO-07</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">ECO-15</span>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-[11px] font-semibold">
                BS
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-[13px] font-medium truncate">Budi Santoso</div>
                <div className="text-[11px] text-muted-foreground">Petugas Lapangan</div>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-md border border-border px-2.5 py-2">
                <dt className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Estimasi</dt>
                <dd className="text-sm font-medium mt-0.5">35 menit</dd>
              </div>
              <div className="rounded-md border border-border px-2.5 py-2">
                <dt className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Efisiensi</dt>
                <dd className="text-sm font-medium mt-0.5 text-success">+18%</dd>
              </div>
            </dl>
            <Link
              to="/pengangkutan"
              className="mt-1 inline-flex items-center justify-center w-full h-8 rounded-md border border-border text-xs font-medium hover:bg-muted"
            >
              Lihat Detail Rute
            </Link>
          </div>
        </Section>

        <Section
          title="Sebaran Lokasi Bin"
          description="Peta skematik area kampus."
          action={<span className="text-[11px] text-muted-foreground">5 titik aktif</span>}
        >
          <CampusMap />
        </Section>
      </div>


      <DemoModal
        open={!!selectedAlert}
        title={selectedAlert ? `Detail Alert ${selectedAlert.binId}` : "Detail Alert"}
        description="Informasi alert operasional dari perangkat EcoBin."
        onClose={() => setSelectedAlert(null)}
        footer={
          <>
            <button onClick={() => setSelectedAlert(null)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Tutup</button>
            <Link to="/notifikasi" onClick={() => setSelectedAlert(null)} className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center">Buka Notifikasi</Link>
          </>
        }
      >
        {selectedAlert && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><StatusPill tone={selectedAlert.severity === "Kritis" ? "danger" : selectedAlert.severity === "Peringatan" ? "warn" : "info"}>{selectedAlert.severity}</StatusPill><span className="font-medium">{selectedAlert.kategori}</span></div>
            <dl className="grid grid-cols-2 gap-3">
              <div><dt className="text-xs text-muted-foreground">ID Bin</dt><dd className="font-medium tabular-nums">{selectedAlert.binId}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Lokasi</dt><dd className="font-medium">{selectedAlert.lokasi}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Waktu</dt><dd>{selectedAlert.waktu}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Tindak lanjut</dt><dd>Periksa perangkat / rute prioritas</dd></div>
            </dl>
            <p className="rounded-md border border-border bg-muted/40 p-3 text-foreground/85">{selectedAlert.pesan}</p>
          </div>
        )}
      </DemoModal>
    </AppShell>
  );
}

type CampusPoint = {
  name: string;
  binId: string;
  x: number;
  y: number;
  tone: "normal" | "warn" | "danger" | "muted";
  fill: string;
};

const campusPoints: CampusPoint[] = [
  { name: "Fakultas Teknik",  binId: "ECO-01", x: 18, y: 28, tone: "normal", fill: "45%" },
  { name: "Kantin Utama",     binId: "ECO-09", x: 72, y: 36, tone: "danger", fill: "96%" },
  { name: "Taman Kampus",     binId: "ECO-07", x: 50, y: 60, tone: "warn",   fill: "82%" },
  { name: "Perpustakaan",     binId: "ECO-12", x: 28, y: 72, tone: "normal", fill: "61%" },
  { name: "Gedung Kuliah A",  binId: "ECO-15", x: 80, y: 76, tone: "warn",   fill: "78%" },
];

const toneColor: Record<string, string> = {
  normal: "var(--success)",
  warn: "var(--warning)",
  danger: "var(--destructive)",
  muted: "var(--muted-foreground)",
};

function CampusMap() {
  return (
    <div className="space-y-3">
      {/* Schematic map */}
      <div className="relative aspect-[16/9] rounded-md border border-border bg-muted/30 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 10 30 Q 40 30 50 60 T 80 76" stroke="var(--border)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          <path d="M 50 60 L 28 72" stroke="var(--border)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          <path d="M 50 60 L 72 36" stroke="var(--border)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute left-3 bottom-2 text-[9px] uppercase tracking-wider text-muted-foreground/60">
          Area Kampus
        </div>
        {campusPoints.map((p) => (
          <span
            key={p.binId}
            className="absolute -translate-x-1/2 -translate-y-1/2 block h-2.5 w-2.5 rounded-full ring-[3px] ring-card"
            style={{ left: `${p.x}%`, top: `${p.y}%`, background: toneColor[p.tone] }}
            title={`${p.binId} · ${p.name}`}
          />
        ))}
      </div>
      {/* List */}
      <ul className="space-y-1.5">
        {campusPoints.map((p) => (
          <li key={p.binId} className="flex items-center gap-2 text-[12.5px]">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: toneColor[p.tone] }}
            />
            <span className="text-muted-foreground tabular-nums text-[10.5px] w-12">{p.binId}</span>
            <span className="flex-1 min-w-0 truncate">{p.name}</span>
            <span className="text-muted-foreground tabular-nums text-[11px]">{p.fill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
