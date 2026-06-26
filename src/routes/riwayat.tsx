import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Section } from "@/components/ui-bits";

type TelemetryRow = {
  timestamp: number;
  distanceCm: number | null;
  fillLevel: number | null;
  binStatus: string | null;
  binStatusText: string | null;
  irDetected: boolean | null;
  irStatusText: string | null;
  servoStatus: string | null;
  ledStatus: string | null;
  buzzerStatus: string | null;
};

type HistoryPayload = {
  ok: boolean;
  error?: string;
  device?: {
    id: string;
    name: string;
    location: string;
  };
  range?: {
    minutes: number;
    startTs: number;
    endTs: number;
  };
  rows?: TelemetryRow[];
};

export const Route = createFileRoute("/riwayat")({
  head: () => ({ meta: [{ title: "Riwayat Telemetry · EcoBin" }] }),
  component: RiwayatPage,
});

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
}

function actuatorLabel(value: string | null) {
  if (!value) return "—";

  const labels: Record<string, string> = {
    on: "Aktif",
    off: "Nonaktif",
    open: "Terbuka",
    closed: "Tertutup",
    locked: "Terkunci",
  };

  return labels[value] || value;
}

function statusClass(status: string | null) {
  if (status === "full") {
    return "bg-destructive/10 text-destructive border-destructive/20";
  }

  if (status === "almost_full") {
    return "bg-warning/10 text-warning border-warning/20";
  }

  if (status === "normal") {
    return "bg-success/10 text-success border-success/20";
  }

  return "bg-muted text-muted-foreground border-border";
}

function csvCell(value: string | number | null) {
  return `"${String(value ?? "—").replace(/"/g, '""')}"`;
}

function downloadCsv(rows: TelemetryRow[]) {
  const header = [
    "Waktu",
    "Jarak (cm)",
    "Kepenuhan (%)",
    "Status Tong",
    "Sensor IR",
    "Servo",
    "LED",
    "Buzzer",
  ];

  const content = [
    header.map(csvCell).join(","),
    ...rows.map((row) =>
      [
        formatDate(row.timestamp),
        row.distanceCm,
        row.fillLevel,
        row.binStatusText,
        row.irStatusText,
        actuatorLabel(row.servoStatus),
        actuatorLabel(row.ledStatus),
        actuatorLabel(row.buzzerStatus),
      ]
        .map(csvCell)
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([content], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "riwayat-telemetry-ecobin.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function RiwayatPage() {
  const [minutes, setMinutes] = useState<30 | 60 | 1440>(1440);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState<HistoryPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadHistory = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/ecobin/history?minutes=${minutes}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        const data = (await response.json()) as HistoryPayload;

        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Riwayat telemetry belum tersedia.");
        }

        setPayload(data);
        setError(null);
      } catch (loadError) {
        if (controller.signal.aborted) return;

        setPayload(null);
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Gagal memuat riwayat telemetry.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadHistory();

    return () => controller.abort();
  }, [minutes, reloadKey]);

  const rows = payload?.rows ?? [];

  const summary = useMemo(() => {
    const latest = rows[0] ?? null;

    return {
      latest,
      total: rows.length,
    };
  }, [rows]);

  const exportCsv = () => {
    if (!rows.length) {
      toast.error("Belum ada data telemetry untuk diekspor.");
      return;
    }

    downloadCsv(rows);
    toast.success("Riwayat telemetry berhasil diekspor sebagai CSV.");
  };

  return (
    <AppShell
      title="Riwayat Telemetry"
      subtitle="Rekaman data sensor dan aktuator dari perangkat EcoBin yang tersimpan di ThingsBoard."
      actions={
        <>
          <button
            onClick={() => setReloadKey((value) => value + 1)}
            disabled={loading}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Muat Ulang
          </button>

          <button
            onClick={exportCsv}
            disabled={!rows.length}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            Unduh CSV
          </button>
        </>
      }
    >
      <Section
        title="Rentang Riwayat"
        description="Data diambil langsung dari telemetry perangkat yang tersimpan di ThingsBoard."
      >
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMinutes(30)}
            className={`h-9 rounded-md px-3 text-sm transition-colors ${
              minutes === 30
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background hover:bg-muted"
            }`}
          >
            30 Menit Terakhir
          </button>

          <button
            onClick={() => setMinutes(60)}
            className={`h-9 rounded-md px-3 text-sm transition-colors ${
              minutes === 60
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background hover:bg-muted"
            }`}
          >
            1 Jam Terakhir
          </button>

          <button
            onClick={() => setMinutes(1440)}
            className={`h-9 rounded-md px-3 text-sm transition-colors ${
              minutes === 1440
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background hover:bg-muted"
            }`}
          >
            24 Jam Terakhir
          </button>

          <div className="ml-auto text-xs text-muted-foreground">
            {payload?.device
              ? `${payload.device.name} · ${payload.device.location}`
              : "Menunggu data perangkat"}
          </div>
        </div>
      </Section>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Section
          title="Total Sampel"
          description="Jumlah data telemetry dalam rentang terpilih."
        >
          <div className="text-3xl font-semibold tabular-nums">
            {loading ? "—" : summary.total}
          </div>
        </Section>

        <Section
          title="Pembacaan Terakhir"
          description="Jarak sensor ultrasonik terakhir yang tercatat."
        >
          <div className="text-3xl font-semibold tabular-nums">
            {summary.latest?.distanceCm == null
              ? "—"
              : `${summary.latest.distanceCm.toFixed(1)} cm`}
          </div>
        </Section>

        <Section
          title="Status Terakhir"
          description="Status tong berdasarkan telemetry terbaru."
        >
          <div className="text-3xl font-semibold">
            {summary.latest?.binStatusText || "—"}
          </div>
        </Section>
      </div>

      <div className="mt-4">
        <Section
          title="Riwayat Telemetry"
          description={
            loading
              ? "Mengambil data dari ThingsBoard..."
              : `${rows.length} entri telemetry pada ${minutes} menit terakhir.`
          }
        >
          {error && (
            <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="overflow-x-auto -mx-5">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2 font-medium">Waktu</th>
                  <th className="py-2 pr-3 font-medium">Jarak</th>
                  <th className="py-2 pr-3 font-medium">Kepenuhan</th>
                  <th className="py-2 pr-3 font-medium">Status Tong</th>
                  <th className="py-2 pr-3 font-medium">IR</th>
                  <th className="py-2 pr-3 font-medium">Servo</th>
                  <th className="py-2 pr-3 font-medium">LED</th>
                  <th className="px-5 py-2 font-medium">Buzzer</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.timestamp}
                    className="border-b border-border last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-5 py-2.5 text-xs tabular-nums text-foreground/80">
                      {formatDate(row.timestamp)}
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums">
                      {row.distanceCm == null
                        ? "—"
                        : `${row.distanceCm.toFixed(1)} cm`}
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums">
                      {row.fillLevel == null ? "—" : `${row.fillLevel}%`}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusClass(
                          row.binStatus,
                        )}`}
                      >
                        {row.binStatusText || "Belum tersedia"}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-foreground/80">
                      {row.irStatusText ||
                        (row.irDetected ? "Terdeteksi" : "Tidak terdeteksi")}
                    </td>
                    <td className="py-2.5 pr-3 text-foreground/80">
                      {actuatorLabel(row.servoStatus)}
                    </td>
                    <td className="py-2.5 pr-3 text-foreground/80">
                      {actuatorLabel(row.ledStatus)}
                    </td>
                    <td className="px-5 py-2.5 text-foreground/80">
                      {actuatorLabel(row.buzzerStatus)}
                    </td>
                  </tr>
                ))}

                {!loading && !rows.length && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-muted-foreground"
                    >
                      Belum ada telemetry pada rentang waktu ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
