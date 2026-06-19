import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DemoModal, Section, StatusPill } from "@/components/ui-bits";
import { alerts, type AlertItem } from "@/lib/mock-data";

export const Route = createFileRoute("/notifikasi")({
  head: () => ({ meta: [{ title: "Notifikasi · EcoBin" }] }),
  component: NotifPage,
});

const tabs = ["Semua", "Critical", "Warning", "Maintenance", "Network"] as const;

function NotifPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Semua");
  const [read, setRead] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<AlertItem | null>(null);

  const list = alerts.filter((a) => tab === "Semua" || a.kategori === tab);

  return (
    <AppShell
      title="Pusat Notifikasi"
      subtitle="Semua peringatan operasional, pemeliharaan, dan jaringan dari perangkat EcoBin."
    >
      <Section
        title="Notifikasi"
        description={`${alerts.length - read.size} dari ${alerts.length} belum dibaca`}
        action={
          <div className="flex items-center gap-1 rounded-md border border-border p-0.5 bg-background">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 h-7 rounded text-xs font-medium ${
                  tab === t ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        {list.length === 0 ? (
          <div className="py-14 text-center">
            <Check className="mx-auto h-6 w-6 text-success/80" />
            <p className="mt-2 text-sm font-medium">Tidak ada notifikasi pada kategori ini.</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Semua tempat sampah dalam kondisi aman.</p>
          </div>
        ) : (
        <ul className="divide-y divide-border -my-2">
          {list.map((a) => {
            const isRead = read.has(a.id);
            const sev = a.severity === "Kritis" ? "danger" : a.severity === "Peringatan" ? "warn" : "info";
            return (
              <li key={a.id} className={`py-3 flex items-start gap-4 ${isRead ? "opacity-60" : ""}`}>
                <div className="mt-1">
                  <StatusPill tone={sev}>{a.severity}</StatusPill>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="tabular-nums">{a.binId}</span>
                    <span className="text-muted-foreground font-normal">· {a.kategori}</span>
                  </div>
                  <p className="text-[13px] mt-1 text-foreground/90">{a.pesan}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.lokasi}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.waktu}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => setSelected(a)}
                    className="text-xs inline-flex items-center gap-1 px-2 h-8 rounded-md border border-border hover:bg-muted text-muted-foreground"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => setRead((s) => {
                      const n = new Set(s);
                      const nextRead = !n.has(a.id);
                      nextRead ? n.add(a.id) : n.delete(a.id);
                      toast.success(nextRead ? "Notifikasi ditandai dibaca." : "Notifikasi ditandai belum dibaca.");
                      return n;
                    })}
                    className="text-xs inline-flex items-center gap-1 px-2 h-8 rounded-md border border-border hover:bg-muted text-muted-foreground"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {isRead ? "Belum dibaca" : "Tandai dibaca"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        )}
      </Section>

      <DemoModal open={!!selected} title={selected ? `Detail Notifikasi ${selected.binId}` : "Detail Notifikasi"} description="Rincian alert dan tindakan yang disarankan." onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><StatusPill tone={selected.severity === "Kritis" ? "danger" : selected.severity === "Peringatan" ? "warn" : "info"}>{selected.severity}</StatusPill><span>{selected.kategori}</span></div>
            <dl className="grid grid-cols-2 gap-3">
              <Info k="ID Bin" v={selected.binId} />
              <Info k="Lokasi" v={selected.lokasi} />
              <Info k="Waktu" v={selected.waktu} />
              <Info k="Rekomendasi" v="Periksa / jadwalkan pengangkutan" />
            </dl>
            <p className="rounded-md border border-border bg-muted/40 p-3">{selected.pesan}</p>
          </div>
        )}
      </DemoModal>
    </AppShell>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return <div className="rounded-md border border-border bg-muted/40 p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>;
}
