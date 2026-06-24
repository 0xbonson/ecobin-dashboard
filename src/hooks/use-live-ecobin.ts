import { useEffect, useState } from "react";

export type LiveEcoBinTelemetry = {
  deviceId: string;
  deviceName: string;
  location: string;
  fillLevel: number | null;
  distanceCm: number | null;
  irDetected: boolean | null;
  irStatusText: string | null;
  servoStatus: string | null;
  ledStatus: string | null;
  buzzerStatus: string | null;
  binStatus: string | null;
  binStatusText: string | null;
  updatedAt: number | null;
};

type LiveState = {
  loading: boolean;
  telemetry: LiveEcoBinTelemetry | null;
  error: string | null;
};

const initialState: LiveState = {
  loading: true,
  telemetry: null,
  error: null,
};

export function useLiveEcoBinTelemetry(intervalMs = 5000) {
  const [state, setState] = useState<LiveState>(initialState);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/ecobin/latest", { cache: "no-store" });
        const payload = (await response.json()) as {
          ok?: boolean;
          telemetry?: LiveEcoBinTelemetry;
          error?: string;
        };

        if (!response.ok || !payload.ok || !payload.telemetry) {
          throw new Error(payload.error || "Telemetry belum tersedia.");
        }

        if (active) {
          setState({ loading: false, telemetry: payload.telemetry, error: null });
        }
      } catch (error) {
        if (active) {
          setState({
            loading: false,
            telemetry: null,
            error: error instanceof Error ? error.message : "Gagal memuat telemetry.",
          });
        }
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), intervalMs);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [intervalMs]);

  return state;
}

export function statusLabel(status: string | null) {
  if (status === "full") return "Penuh";
  if (status === "almost_full") return "Hampir Penuh";
  if (status === "normal") return "Normal";
  return status || "Normal";
}

export function relativeTime(timestamp: number | null) {
  if (!timestamp) return "Belum ada data";
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 10) return "baru saja";
  if (seconds < 60) return `${seconds} dtk lalu`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mnt lalu`;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
