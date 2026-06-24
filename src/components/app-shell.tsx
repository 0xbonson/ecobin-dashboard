import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Activity,
  Truck,
  AlertTriangle,
  Settings,
  ChevronDown,
  Cloud,
  Leaf,
  Search,
} from "lucide-react";
import { relativeTime, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/monitoring", label: "Monitoring ECO-01", icon: Activity },
  { to: "/pengangkutan", label: "Pengangkutan", icon: Truck },
  { to: "/laporan", label: "Laporan Kendala", icon: AlertTriangle },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings },
] as const;

const searchItems = [
  { label: "ECO-01 · Fakultas Teknik", desc: "Perangkat EcoBin aktif", to: "/monitoring" as const },
  { label: "Pengangkutan", desc: "Tindakan lanjutan saat tong penuh", to: "/pengangkutan" as const },
  { label: "Laporan Kendala", desc: "Catat masalah perangkat", to: "/laporan" as const },
  { label: "Pengaturan", desc: "Threshold dan integrasi IoT", to: "/pengaturan" as const },
];

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const live = useLiveEcoBinTelemetry(5000);
  const cloudOnline = Boolean(live.telemetry);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return searchItems.filter((item) => `${item.label} ${item.desc}`.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      <aside
        className={`${
          menuOpen ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"
        } lg:flex lg:static w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar`}
      >
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center">
            <Leaf className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-sidebar-foreground">EcoBin</div>
            <div className="text-[11px] text-muted-foreground">Smart Waste Monitor</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="px-3 pt-1 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Menu</div>
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-3 border-t border-sidebar-border space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className={`h-1.5 w-1.5 rounded-full ${cloudOnline ? "bg-success" : "bg-warning/80"}`} />
            <span className="font-medium text-foreground/70">{cloudOnline ? "IoT Live" : "Menunggu Telemetry"}</span>
          </div>
          <div className="text-[10.5px] text-muted-foreground/80 leading-snug">
            {cloudOnline ? "ECO-01 membaca telemetry ThingsBoard melalui HTTP." : "ESP32 belum mengirim data telemetry."}
          </div>
          <div className="text-[10.5px] text-muted-foreground/70 pt-0.5">Prototipe 1 perangkat · HTTP ThingsBoard</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center gap-3 px-4 lg:px-6">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-md border border-border text-muted-foreground"
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-[15px] font-semibold leading-tight truncate">{title}</h1>
            {subtitle && <div className="text-xs text-muted-foreground leading-snug line-clamp-2">{subtitle}</div>}
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4 px-2.5 py-1.5 rounded-md border border-border bg-background text-xs">
            <span className="relative flex h-2 w-2">
              {cloudOnline && <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${cloudOnline ? "bg-success" : "bg-warning"}`} />
            </span>
            <Cloud className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground/80">{cloudOnline ? "ThingsBoard Online" : "IoT belum aktif"}</span>
            <span className="text-muted-foreground">· {cloudOnline ? relativeTime(live.telemetry?.updatedAt ?? null) : "menunggu data"}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:flex items-center gap-2 px-2.5 h-9 rounded-md border border-border bg-background text-sm w-52">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari fitur…"
                className="bg-transparent outline-none w-full placeholder:text-muted-foreground"
              />
              {search && (
                <div className="absolute right-0 top-10 z-50 w-72 rounded-lg border border-border bg-popover shadow-xl overflow-hidden">
                  {results.length ? (
                    <ul className="py-1.5">
                      {results.map((item) => (
                        <li key={item.label}>
                          <Link to={item.to} onClick={() => setSearch("")} className="block px-3 py-2 hover:bg-muted">
                            <div className="text-sm font-medium truncate">{item.label}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground truncate">{item.desc}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-4 text-center text-xs text-muted-foreground">Tidak ada hasil pencarian.</div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-semibold">AR</div>
              <div className="hidden sm:block leading-tight">
                <div className="text-[13px] font-medium">Ahmad Rizky</div>
                <div className="text-[11px] text-muted-foreground">Admin</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          {actions && <div className="px-4 lg:px-6 pt-4 flex flex-wrap gap-2 justify-end">{actions}</div>}
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
