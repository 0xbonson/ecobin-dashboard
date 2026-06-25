import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  Cloud,
  LayoutDashboard,
  Leaf,
  Settings,
} from "lucide-react";
import { relativeTime, useLiveEcoBinTelemetry } from "@/hooks/use-live-ecobin";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/monitoring", label: "Monitoring Perangkat", icon: Activity },
  { to: "/laporan", label: "Laporan Kendala", icon: AlertTriangle },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings },
] as const;

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
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const live = useLiveEcoBinTelemetry(5000);
  const cloudOnline = Boolean(live.telemetry);
  const deviceName = live.telemetry?.deviceName || "Perangkat EcoBin";
  const location = live.telemetry?.location || "Lokasi belum ditentukan";

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
            <div className="text-[11px] text-muted-foreground">EcoBin Monitoring</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="px-3 pt-1 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Menu
          </div>
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
            <span className="font-medium text-foreground/70">{cloudOnline ? "IoT Live" : "Menunggu telemetry"}</span>
          </div>
          <div className="text-[10.5px] text-muted-foreground/80 leading-snug">
            {deviceName} · {location}
          </div>
          <div className="text-[10.5px] text-muted-foreground/70 pt-0.5">1 perangkat · HTTP ThingsBoard</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center gap-3 px-4 lg:px-6">
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-md border border-border text-muted-foreground"
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
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

          <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-semibold">AR</div>
            <div className="hidden sm:block leading-tight">
              <div className="text-[13px] font-medium">Ahmad Rizky</div>
              <div className="text-[11px] text-muted-foreground">Admin</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
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
