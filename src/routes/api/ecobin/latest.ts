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

type TimeSeriesValue = { ts: number; value: string };
type ThingsBoardResponse = Partial<Record<(typeof TELEMETRY_KEYS)[number], TimeSeriesValue[]>>;

type LiveTelemetry = {
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

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

function firstValue(payload: ThingsBoardResponse, key: (typeof TELEMETRY_KEYS)[number]) {
  return payload[key]?.[0] ?? null;
}

function toNumber(value: string | undefined) {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toBoolean(value: string | undefined) {
  if (value == null) return null;
  return value === "true" || value === "1";
}

async function getAuthorizationHeader(baseUrl: string) {
  const apiKey = process.env.TB_API_KEY;
  if (apiKey) return `ApiKey ${apiKey}`;

  const username = process.env.TB_USERNAME;
  const password = process.env.TB_PASSWORD;
  if (!username || !password) {
    throw new Error("Kredensial ThingsBoard belum dikonfigurasi.");
  }

  const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!loginResponse.ok) {
    throw new Error("Autentikasi ThingsBoard gagal.");
  }

  const loginData = (await loginResponse.json()) as { token?: string };
  if (!loginData.token) {
    throw new Error("ThingsBoard tidak mengembalikan token akses.");
  }

  return `Bearer ${loginData.token}`;
}

export const Route = createFileRoute("/api/ecobin/latest")({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = process.env.TB_BASE_URL?.replace(/\/$/, "");
        const deviceId = process.env.TB_DEVICE_ID;

        if (!baseUrl || !deviceId) {
          return json(
            {
              ok: false,
              error: "Integrasi ThingsBoard belum dikonfigurasi di Vercel.",
              code: "NOT_CONFIGURED",
            },
            503,
          );
        }

        try {
          const authorization = await getAuthorizationHeader(baseUrl);
          const keys = encodeURIComponent(TELEMETRY_KEYS.join(","));
          const response = await fetch(
            `${baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}`,
            { headers: { "X-Authorization": authorization } },
          );

          if (!response.ok) {
            throw new Error(`ThingsBoard mengembalikan HTTP ${response.status}.`);
          }

          const payload = (await response.json()) as ThingsBoardResponse;
          const timestamps = TELEMETRY_KEYS.map((key) => firstValue(payload, key)?.ts ?? 0).filter(Boolean);
          const updatedAt = timestamps.length ? Math.max(...timestamps) : null;

          const telemetry: LiveTelemetry = {
            deviceId,
            deviceName: process.env.TB_DEVICE_NAME || "Perangkat EcoBin",
            location: process.env.TB_DEVICE_LOCATION || "Lokasi belum ditentukan",
            fillLevel: toNumber(firstValue(payload, "fillLevel")?.value),
            distanceCm: toNumber(firstValue(payload, "distanceCm")?.value),
            irDetected: toBoolean(firstValue(payload, "irDetected")?.value),
            irStatusText: firstValue(payload, "irStatusText")?.value ?? null,
            servoStatus: firstValue(payload, "servoStatus")?.value ?? null,
            ledStatus: firstValue(payload, "ledStatus")?.value ?? null,
            buzzerStatus: firstValue(payload, "buzzerStatus")?.value ?? null,
            binStatus: firstValue(payload, "binStatus")?.value ?? null,
            binStatusText: firstValue(payload, "binStatusText")?.value ?? null,
            updatedAt,
          };

          return json({ ok: true, source: "thingsboard", telemetry });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Gagal membaca telemetry ThingsBoard.";
          return json({ ok: false, error: message, code: "THINGSBOARD_ERROR" }, 502);
        }
      },
    },
  },
});
