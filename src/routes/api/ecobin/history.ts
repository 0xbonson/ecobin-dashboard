import { createFileRoute } from "@tanstack/react-router";

const TELEMETRY_KEYS = [
  "fillLevel",
  "distanceCm",
  "irDetected",
  "irStatusText",
  "servoStatus",
  "ledStatus",
  "buzzerStatus",
  "binStatus",
  "binStatusText",
] as const;

type TelemetryKey = (typeof TELEMETRY_KEYS)[number];
type TimeSeriesValue = { ts: number; value: string };
type ThingsBoardResponse = Partial<Record<TelemetryKey, TimeSeriesValue[]>>;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

function toNumber(value: string | null) {
  if (value == null || value === "") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toBoolean(value: string | null) {
  if (value == null) return null;
  return value === "true" || value === "1";
}

function statusText(status: string | null) {
  if (status === "full") return "Penuh";
  if (status === "almost_full") return "Hampir Penuh";
  if (status === "normal") return "Normal";
  if (status === "sensor_error") return "Sensor Error";
  return "Belum tersedia";
}

function closestValue(
  payload: ThingsBoardResponse,
  key: TelemetryKey,
  timestamp: number,
) {
  const points = payload[key] ?? [];

  let closest: TimeSeriesValue | null = null;
  let smallestDifference = Number.POSITIVE_INFINITY;

  for (const point of points) {
    const difference = Math.abs(point.ts - timestamp);

    if (difference < smallestDifference) {
      closest = point;
      smallestDifference = difference;
    }
  }

  return closest && smallestDifference <= 2500 ? closest.value : null;
}

async function getAuthorizationHeader(baseUrl: string) {
  const apiKey = process.env.TB_API_KEY;

  if (apiKey) {
    return `ApiKey ${apiKey}`;
  }

  const username = process.env.TB_USERNAME;
  const password = process.env.TB_PASSWORD;

  if (!username || !password) {
    throw new Error("Kredensial ThingsBoard belum dikonfigurasi.");
  }

  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Autentikasi ThingsBoard gagal.");
  }

  const data = (await response.json()) as { token?: string };

  if (!data.token) {
    throw new Error("ThingsBoard tidak mengembalikan token akses.");
  }

  return `Bearer ${data.token}`;
}

export const Route = createFileRoute("/api/ecobin/history")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const baseUrl = process.env.TB_BASE_URL?.replace(/\/$/, "");
        const deviceId = process.env.TB_DEVICE_ID;

        if (!baseUrl || !deviceId) {
          return json(
            {
              ok: false,
              error: "Integrasi ThingsBoard belum dikonfigurasi.",
              code: "NOT_CONFIGURED",
            },
            503,
          );
        }

        const requestUrl = new URL(request.url);
        const requestedMinutes = Number(requestUrl.searchParams.get("minutes"));
        const minutes =
          requestedMinutes === 1440
            ? 1440
            : requestedMinutes === 60
              ? 60
              : 30;

        const endTs = Date.now();
        const startTs = endTs - minutes * 60 * 1000;

        try {
          const authorization = await getAuthorizationHeader(baseUrl);

          const endpoint = new URL(
            `${baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`,
          );

          endpoint.searchParams.set("keys", TELEMETRY_KEYS.join(","));
          endpoint.searchParams.set("startTs", String(startTs));
          endpoint.searchParams.set("endTs", String(endTs));
          endpoint.searchParams.set("limit", minutes === 1440 ? "5000" : minutes === 60 ? "2500" : "1500");
          endpoint.searchParams.set("orderBy", "ASC");

          const response = await fetch(endpoint, {
            headers: { "X-Authorization": authorization },
          });

          if (!response.ok) {
            throw new Error(`ThingsBoard mengembalikan HTTP ${response.status}.`);
          }

          const payload = (await response.json()) as ThingsBoardResponse;

          const anchorPoints =
            payload.fillLevel?.length
              ? payload.fillLevel
              : payload.distanceCm ?? [];

          const rows = [...anchorPoints]
            .sort((a, b) => b.ts - a.ts)
            .map((point) => {
              const binStatus = closestValue(payload, "binStatus", point.ts);
              const binStatusText =
                closestValue(payload, "binStatusText", point.ts) ??
                statusText(binStatus);

              const irDetected = toBoolean(
                closestValue(payload, "irDetected", point.ts),
              );

              return {
                timestamp: point.ts,
                distanceCm: toNumber(
                  closestValue(payload, "distanceCm", point.ts),
                ),
                fillLevel: toNumber(point.value),
                binStatus,
                binStatusText,
                irDetected,
                irStatusText:
                  closestValue(payload, "irStatusText", point.ts) ??
                  (irDetected ? "Terdeteksi" : "Tidak terdeteksi"),
                servoStatus: closestValue(payload, "servoStatus", point.ts),
                ledStatus: closestValue(payload, "ledStatus", point.ts),
                buzzerStatus: closestValue(payload, "buzzerStatus", point.ts),
              };
            });

          return json({
            ok: true,
            source: "thingsboard",
            device: {
              id: deviceId,
              name: process.env.TB_DEVICE_NAME || "Perangkat EcoBin",
              location:
                process.env.TB_DEVICE_LOCATION || "Lokasi belum ditentukan",
            },
            range: {
              minutes,
              startTs,
              endTs,
            },
            rows,
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Gagal membaca riwayat telemetry ThingsBoard.";

          return json(
            { ok: false, error: message, code: "THINGSBOARD_ERROR" },
            502,
          );
        }
      },
    },
  },
});
