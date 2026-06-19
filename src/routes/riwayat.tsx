import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Field, Section, SelectInput, TextInput } from "@/components/ui-bits";
import { history, historicalChart, bins, type HistoryEntry } from "@/lib/mock-data";

export const Route = createFileRoute("/riwayat")({
  head: () => ({ meta: [{ title: "Riwayat Monitoring · EcoBin" }] }),
  component: RiwayatPage,
});

function eventDate(entry: HistoryEntry) {
  const months: Record<string, string> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", Mei: "05", Jun: "06", Jul: "07", Agu: "08", Sep: "09", Okt: "10", Nov: "11", Des: "12" };
  const [day, mon, year] = entry.waktu.split(" ");
  return `${year}-${months[mon] ?? "06"}-${day.padStart(2, "0")}`;
}

function eventMatches(entry: HistoryEntry, type: string) {
  if (type === "Semua") return true;
  const e = entry.event.toLowerCase();
  if (type === "Threshold penuh") return e.includes("threshold");
  if (type === "Update telemetry") return e.includes("telemetry");
  if (type === "Sensor error") return e.includes("sensor");
  return true;
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function RiwayatPage() {
  const [from, setFrom] = useState("2026-06-11");
  const [to, setTo] = useState("2026-06-18");
  const [bin, setBin] = useState("Semua");
  const [eventType, setEventType] = useState("Semua");

  const filtered = useMemo(() => history.filter((h) => {
    const d = eventDate(h);
    return (bin === "Semua" || h.binId === bin) && d >= from && d <= to && eventMatches(h, eventType);
  }), [bin, from, to, eventType]);

  const exportCsv = () => {
    const rows = ["Waktu,ID Bin,Lokasi,Event,Kepenuhan,Baterai", ...filtered.map((h) => `"${h.waktu}",${h.binId},"${h.lokasi}","${h.event}",${h.kepenuhan},${h.baterai}`)];
    download("riwayat-telemetri-ecobin.csv", rows.join("\n"), "text/csv;charset=utf-8");
    toast.success("Riwayat berhasil diekspor sebagai CSV.");
  };

  const exportPdf = () => {
    const html = `<!doctype html><html><head><title>Riwayat Telemetri EcoBin</title><style>body{font-family:Arial,sans-serif;padding:24px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f3f4f6;text-align:left}</style></head><body><h2>Riwayat Telemetri EcoBin</h2><p>Periode ${from} — ${to}</p><table><thead><tr><th>Waktu</th><th>ID Bin</th><th>Lokasi</th><th>Event</th><th>Kepenuhan</th><th>Baterai</th></tr></thead><tbody>${filtered.map((h) => `<tr><td>${h.waktu}</td><td>${h.binId}</td><td>${h.lokasi}</td><td>${h.event}</td><td>${h.kepenuhan}%</td><td>${h.baterai}%</td></tr>`).join("")}</tbody></table><script>window.print()</script></body></html>`;
    const win = window.open("", "_blank", "width=960,height=700");
    if (win) {
      win.document.write(html);
      win.document.close();
      toast.success("Dokumen PDF siap dicetak/disimpan.");
    } else {
      toast.error("Popup diblokir. Izinkan popup untuk ekspor PDF.");
    }
  };

  return (
    <AppShell
      title="Riwayat Monitoring"
      subtitle="Telemetri historis dari seluruh perangkat IoT untuk audit dan analisis."
      actions={
        <>
          <button onClick={exportCsv} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">
            <Download className="h-4 w-4" /> Ekspor CSV
          </button>
          <button onClick={exportPdf} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">
            <FileText className="h-4 w-4" /> Ekspor PDF
          </button>
        </>
      }
    >
      <Section
        title="Filter Periode"
        description="Pilih rentang tanggal dan perangkat untuk membatasi data."
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Field label="Dari tanggal">
            <TextInput type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="Sampai tanggal">
            <TextInput type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
          <Field label="Perangkat">
            <SelectInput value={bin} onChange={(e) => setBin(e.target.value)}>
              <option>Semua</option>
              {bins.map((b) => <option key={b.id}>{b.id}</option>)}
            </SelectInput>
          </Field>
          <Field label="Tipe event">
            <SelectInput value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option>Semua</option><option>Threshold penuh</option><option>Update telemetry</option><option>Sensor error</option>
            </SelectInput>
          </Field>
        </div>
      </Section>

      <div className="mt-4">
        <Section
          title="Tren Kepenuhan Historis"
          description="Tiga perangkat dengan aktivitas tertinggi hari ini."
        >
          <div className="h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={historicalChart} margin={{ left: -10, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="jam" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="ECO09" name="ECO-09" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="ECO07" name="ECO-07" stroke="var(--warning)" fillOpacity={0} strokeWidth={2} />
                <Area type="monotone" dataKey="ECO15" name="ECO-15" stroke="var(--accent)" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="mt-4">
        <Section title="Riwayat Telemetri" description={`${filtered.length} entri pada rentang ${from} — ${to}`}>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="text-left font-medium py-2 px-5">Waktu</th>
                  <th className="text-left font-medium py-2 pr-3">ID Bin</th>
                  <th className="text-left font-medium py-2 pr-3">Lokasi</th>
                  <th className="text-left font-medium py-2 pr-3">Event</th>
                  <th className="text-left font-medium py-2 pr-3">Kepenuhan</th>
                  <th className="text-left font-medium py-2 px-5">Baterai</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h) => (
                  <tr key={h.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="py-2.5 px-5 text-xs text-foreground/80 tabular-nums">{h.waktu}</td>
                    <td className="py-2.5 pr-3 font-medium tabular-nums">{h.binId}</td>
                    <td className="py-2.5 pr-3 text-foreground/80">{h.lokasi}</td>
                    <td className="py-2.5 pr-3 text-foreground/80">{h.event}</td>
                    <td className="py-2.5 pr-3 tabular-nums">{h.kepenuhan}%</td>
                    <td className="py-2.5 px-5 tabular-nums">{h.baterai}%</td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">Tidak ada data yang cocok dengan filter.</td></tr>}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
