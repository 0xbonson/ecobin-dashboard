import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Activity, E as Bell, _ as LayoutDashboard, d as Search, g as Leaf, i as Users, l as Trash2, o as Truck, s as TriangleAlert, t as X, u as Settings, v as History, w as ChevronDown, x as Cloud } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-bits-pO_onUBf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var bins = [
	{
		id: "ECO-01",
		lokasi: "Fakultas Teknik",
		kepenuhan: 45,
		status: "Normal",
		baterai: 91,
		koneksi: "Online",
		updateTerakhir: "12 detik lalu",
		kapasitas: "120 L",
		tanggalInstalasi: "12 Jan 2025",
		terakhirDirawat: "08 Mei 2025",
		jarakSensor: 33,
		sensorIR: "Aktif",
		servo: "Normal",
		ledBuzzer: "Normal",
		jenisKoneksi: "Wi-Fi",
		catatan: "Kondisi baik, tidak ada keluhan."
	},
	{
		id: "ECO-07",
		lokasi: "Taman Kampus",
		kepenuhan: 82,
		status: "Hampir Penuh",
		baterai: 76,
		koneksi: "Online",
		updateTerakhir: "21 detik lalu",
		kapasitas: "120 L",
		tanggalInstalasi: "20 Jan 2025",
		terakhirDirawat: "02 Mei 2025",
		jarakSensor: 11,
		sensorIR: "Aktif",
		servo: "Normal",
		ledBuzzer: "Normal",
		jenisKoneksi: "LoRa",
		catatan: "Sering penuh saat akhir pekan."
	},
	{
		id: "ECO-09",
		lokasi: "Kantin Utama",
		kepenuhan: 96,
		status: "Penuh",
		baterai: 64,
		koneksi: "Online",
		updateTerakhir: "8 detik lalu",
		kapasitas: "240 L",
		tanggalInstalasi: "05 Feb 2025",
		terakhirDirawat: "10 Mei 2025",
		jarakSensor: 2,
		sensorIR: "Aktif",
		servo: "Tertutup",
		ledBuzzer: "Normal",
		jenisKoneksi: "Wi-Fi",
		catatan: "Perlu pengangkutan segera."
	},
	{
		id: "ECO-12",
		lokasi: "Perpustakaan",
		kepenuhan: 61,
		status: "Normal",
		baterai: 88,
		koneksi: "Online",
		updateTerakhir: "17 detik lalu",
		kapasitas: "120 L",
		tanggalInstalasi: "11 Feb 2025",
		terakhirDirawat: "30 Apr 2025",
		jarakSensor: 22,
		sensorIR: "Aktif",
		servo: "Normal",
		ledBuzzer: "Normal",
		jenisKoneksi: "Wi-Fi",
		catatan: "—"
	},
	{
		id: "ECO-15",
		lokasi: "Gedung Kuliah A",
		kepenuhan: 78,
		status: "Hampir Penuh",
		baterai: 70,
		koneksi: "Online",
		updateTerakhir: "31 detik lalu",
		kapasitas: "120 L",
		tanggalInstalasi: "18 Feb 2025",
		terakhirDirawat: "06 Mei 2025",
		jarakSensor: 13,
		sensorIR: "Aktif",
		servo: "Normal",
		ledBuzzer: "Normal",
		jenisKoneksi: "Wi-Fi",
		catatan: "Pantau setiap jam istirahat."
	},
	{
		id: "ECO-03",
		lokasi: "Lapangan Utama",
		kepenuhan: null,
		status: "Gangguan Sensor",
		baterai: 22,
		koneksi: "Offline",
		updateTerakhir: "15 menit lalu",
		kapasitas: "240 L",
		tanggalInstalasi: "14 Jan 2025",
		terakhirDirawat: "20 Mar 2025",
		jarakSensor: 0,
		sensorIR: "Error",
		servo: "Error",
		ledBuzzer: "Error",
		jenisKoneksi: "LoRa",
		catatan: "Sensor ultrasonik perlu diganti."
	}
];
var alerts = [
	{
		id: "a1",
		severity: "Kritis",
		binId: "ECO-09",
		lokasi: "Kantin Utama",
		pesan: "Sudah penuh 96% dan perlu segera dikosongkan.",
		waktu: "2 menit lalu",
		kategori: "Critical"
	},
	{
		id: "a2",
		severity: "Peringatan",
		binId: "ECO-07",
		lokasi: "Taman Kampus",
		pesan: "Hampir penuh 82%.",
		waktu: "6 menit lalu",
		kategori: "Warning"
	},
	{
		id: "a3",
		severity: "Peringatan",
		binId: "ECO-15",
		lokasi: "Gedung Kuliah A",
		pesan: "Hampir penuh 78%.",
		waktu: "9 menit lalu",
		kategori: "Warning"
	},
	{
		id: "a4",
		severity: "Kritis",
		binId: "ECO-03",
		lokasi: "Lapangan Utama",
		pesan: "Gangguan sensor ultrasonik terdeteksi.",
		waktu: "15 menit lalu",
		kategori: "Maintenance"
	},
	{
		id: "a5",
		severity: "Info",
		binId: "ECO-11",
		lokasi: "Asrama Putra",
		pesan: "Perangkat offline selama 15 menit.",
		waktu: "15 menit lalu",
		kategori: "Network"
	}
];
var trend7d = [
	{
		hari: "Sen",
		rata: 42,
		puncak: 68
	},
	{
		hari: "Sel",
		rata: 48,
		puncak: 72
	},
	{
		hari: "Rab",
		rata: 51,
		puncak: 79
	},
	{
		hari: "Kam",
		rata: 55,
		puncak: 82
	},
	{
		hari: "Jum",
		rata: 63,
		puncak: 91
	},
	{
		hari: "Sab",
		rata: 47,
		puncak: 70
	},
	{
		hari: "Min",
		rata: 39,
		puncak: 58
	}
];
var distribusiStatus = [
	{
		name: "Normal",
		value: 18
	},
	{
		name: "Hampir Penuh",
		value: 5
	},
	{
		name: "Penuh",
		value: 3
	},
	{
		name: "Offline",
		value: 2
	}
];
var pengangkutanHarian = [
	{
		hari: "Sen",
		jumlah: 9
	},
	{
		hari: "Sel",
		jumlah: 11
	},
	{
		hari: "Rab",
		jumlah: 8
	},
	{
		hari: "Kam",
		jumlah: 13
	},
	{
		hari: "Jum",
		jumlah: 15
	},
	{
		hari: "Sab",
		jumlah: 7
	},
	{
		hari: "Min",
		jumlah: 4
	}
];
var pengangkutanList = [
	{
		id: "RT-A",
		rute: "Rute A — Zona Tengah",
		petugas: "Budi Santoso",
		estimasi: "35 menit",
		status: "Dalam Perjalanan",
		bins: [
			"ECO-09",
			"ECO-07",
			"ECO-15"
		]
	},
	{
		id: "RT-B",
		rute: "Rute B — Zona Utara",
		petugas: "Rian Pratama",
		estimasi: "28 menit",
		status: "Menunggu",
		bins: ["ECO-12", "ECO-04"]
	},
	{
		id: "RT-C",
		rute: "Rute C — Zona Selatan",
		petugas: "Hendra Wijaya",
		estimasi: "42 menit",
		status: "Selesai",
		bins: [
			"ECO-01",
			"ECO-18",
			"ECO-22"
		]
	},
	{
		id: "RT-D",
		rute: "Rute D — Zona Barat",
		petugas: "—",
		estimasi: "—",
		status: "Dibatalkan",
		bins: ["ECO-05"]
	}
];
var issues = [
	{
		id: "ISS-104",
		bin: "ECO-03",
		kategori: "Sensor error",
		prioritas: "Tinggi",
		petugas: "Budi Santoso",
		status: "Diproses",
		dilaporkan: "Hari ini, 09:14"
	},
	{
		id: "ISS-103",
		bin: "ECO-11",
		kategori: "Koneksi offline",
		prioritas: "Sedang",
		petugas: "Rian Pratama",
		status: "Terbuka",
		dilaporkan: "Hari ini, 08:02"
	},
	{
		id: "ISS-102",
		bin: "ECO-22",
		kategori: "Baterai lemah",
		prioritas: "Sedang",
		petugas: "Hendra Wijaya",
		status: "Selesai",
		dilaporkan: "Kemarin, 16:48"
	},
	{
		id: "ISS-101",
		bin: "ECO-09",
		kategori: "Sampah meluap",
		prioritas: "Tinggi",
		petugas: "Budi Santoso",
		status: "Selesai",
		dilaporkan: "Kemarin, 11:20"
	}
];
var users = [
	{
		id: "U-01",
		nama: "Ahmad Rizky",
		email: "ahmad.rizky@ecobin.id",
		role: "Admin",
		status: "Aktif",
		terakhirLogin: "Hari ini, 08:10"
	},
	{
		id: "U-02",
		nama: "Siti Rahma",
		email: "siti.rahma@ecobin.id",
		role: "Supervisor",
		status: "Aktif",
		terakhirLogin: "Hari ini, 07:42"
	},
	{
		id: "U-03",
		nama: "Budi Santoso",
		email: "budi.santoso@ecobin.id",
		role: "Petugas Lapangan",
		status: "Aktif",
		terakhirLogin: "Hari ini, 06:30"
	},
	{
		id: "U-04",
		nama: "Rian Pratama",
		email: "rian.pratama@ecobin.id",
		role: "Petugas Lapangan",
		status: "Aktif",
		terakhirLogin: "Kemarin, 17:55"
	},
	{
		id: "U-05",
		nama: "Hendra Wijaya",
		email: "hendra.wijaya@ecobin.id",
		role: "Petugas Lapangan",
		status: "Nonaktif",
		terakhirLogin: "3 hari lalu"
	}
];
var history = [
	{
		id: "h1",
		binId: "ECO-09",
		lokasi: "Kantin Utama",
		kepenuhan: 96,
		baterai: 64,
		event: "Threshold penuh tercapai",
		waktu: "18 Jun 2026 10:42"
	},
	{
		id: "h2",
		binId: "ECO-07",
		lokasi: "Taman Kampus",
		kepenuhan: 82,
		baterai: 76,
		event: "Hampir penuh",
		waktu: "18 Jun 2026 10:31"
	},
	{
		id: "h3",
		binId: "ECO-15",
		lokasi: "Gedung Kuliah A",
		kepenuhan: 78,
		baterai: 70,
		event: "Hampir penuh",
		waktu: "18 Jun 2026 10:18"
	},
	{
		id: "h4",
		binId: "ECO-12",
		lokasi: "Perpustakaan",
		kepenuhan: 61,
		baterai: 88,
		event: "Update telemetry",
		waktu: "18 Jun 2026 10:05"
	},
	{
		id: "h5",
		binId: "ECO-01",
		lokasi: "Fakultas Teknik",
		kepenuhan: 45,
		baterai: 91,
		event: "Update telemetry",
		waktu: "18 Jun 2026 09:58"
	},
	{
		id: "h6",
		binId: "ECO-03",
		lokasi: "Lapangan Utama",
		kepenuhan: 0,
		baterai: 22,
		event: "Sensor error",
		waktu: "18 Jun 2026 09:50"
	},
	{
		id: "h7",
		binId: "ECO-09",
		lokasi: "Kantin Utama",
		kepenuhan: 71,
		baterai: 65,
		event: "Update telemetry",
		waktu: "18 Jun 2026 09:40"
	},
	{
		id: "h8",
		binId: "ECO-07",
		lokasi: "Taman Kampus",
		kepenuhan: 64,
		baterai: 77,
		event: "Update telemetry",
		waktu: "18 Jun 2026 09:25"
	}
];
var historicalChart = [
	{
		jam: "06:00",
		ECO09: 12,
		ECO07: 18,
		ECO15: 22
	},
	{
		jam: "08:00",
		ECO09: 28,
		ECO07: 32,
		ECO15: 35
	},
	{
		jam: "10:00",
		ECO09: 54,
		ECO07: 51,
		ECO15: 48
	},
	{
		jam: "12:00",
		ECO09: 78,
		ECO07: 66,
		ECO15: 58
	},
	{
		jam: "14:00",
		ECO09: 88,
		ECO07: 73,
		ECO15: 67
	},
	{
		jam: "16:00",
		ECO09: 96,
		ECO07: 82,
		ECO15: 78
	}
];
var nav = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/monitoring",
		label: "Monitoring Real-Time",
		icon: Activity
	},
	{
		to: "/bins",
		label: "Data Tempat Sampah",
		icon: Trash2
	},
	{
		to: "/pengangkutan",
		label: "Pengangkutan Sampah",
		icon: Truck
	},
	{
		to: "/notifikasi",
		label: "Notifikasi",
		icon: Bell
	},
	{
		to: "/riwayat",
		label: "Riwayat Monitoring",
		icon: History
	},
	{
		to: "/laporan",
		label: "Laporan Kendala",
		icon: TriangleAlert
	},
	{
		to: "/users",
		label: "Manajemen User",
		icon: Users
	},
	{
		to: "/pengaturan",
		label: "Pengaturan",
		icon: Settings
	}
];
var globalItems = [
	...bins.map((b) => ({
		label: `${b.id} · ${b.lokasi}`,
		desc: `${b.status} · ${b.koneksi}`,
		to: "/monitoring"
	})),
	...alerts.map((a) => ({
		label: `${a.binId} · ${a.severity}`,
		desc: a.pesan,
		to: "/notifikasi"
	})),
	...pengangkutanList.map((r) => ({
		label: `${r.id} · ${r.rute}`,
		desc: `${r.status} · ${r.petugas}`,
		to: "/pengangkutan"
	})),
	...users.map((u) => ({
		label: u.nama,
		desc: `${u.role} · ${u.status}`,
		to: "/users"
	}))
];
function AppShell({ title, subtitle, actions, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const results = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return [];
		return globalItems.filter((item) => `${item.label} ${item.desc}`.toLowerCase().includes(q)).slice(0, 6);
	}, [search]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex w-full bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `${menuOpen ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"} lg:flex lg:static w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-sidebar-foreground",
							children: "EcoBin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: "Smart Waste Monitor"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 overflow-y-auto py-3 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pt-1 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground",
						children: "Menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-0.5",
						children: nav.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setMenuOpen(false),
								className: `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							}) }, item.to);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-3 border-t border-sidebar-border space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-warning/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground/70",
								children: "Mode Demo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10.5px] text-muted-foreground/80 leading-snug",
							children: "Data disimulasikan untuk kebutuhan presentasi."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10.5px] text-muted-foreground/70 pt-0.5",
							children: "v1.4.3 · Build 2026.06"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-16 border-b border-border bg-card flex items-center gap-3 px-4 lg:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMenuOpen((v) => !v),
						className: "lg:hidden h-9 w-9 grid place-items-center rounded-md border border-border text-muted-foreground",
						"aria-label": "Menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18M3 12h18M3 18h18" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[15px] font-semibold leading-tight truncate",
							children: title
						}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground leading-snug line-clamp-2",
							children: subtitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:flex items-center gap-2 ml-4 px-2.5 py-1.5 rounded-md border border-border bg-background text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "h-3.5 w-3.5 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/80",
								children: "Cloud Online"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "· Update 12 dtk lalu"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative hidden md:flex items-center gap-2 px-2.5 h-9 rounded-md border border-border bg-background text-sm w-64",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: search,
										onChange: (e) => setSearch(e.target.value),
										placeholder: "Cari bin, lokasi, petugas…",
										className: "bg-transparent outline-none w-full placeholder:text-muted-foreground"
									}),
									search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute right-0 top-10 z-50 w-80 rounded-lg border border-border bg-popover shadow-xl overflow-hidden",
										children: results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "py-1.5",
											children: results.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: item.to,
												onClick: () => setSearch(""),
												className: "block px-3 py-2 hover:bg-muted",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm font-medium truncate",
													children: item.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-0.5 text-xs text-muted-foreground truncate",
													children: item.desc
												})]
											}) }, `${item.label}-${index}`))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3 py-4 text-center text-xs text-muted-foreground",
											children: "Tidak ada hasil pencarian."
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/notifikasi",
								className: "relative h-9 w-9 grid place-items-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 pl-2 ml-1 border-l border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-semibold",
										children: "AR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden sm:block leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[13px] font-medium",
											children: "Ahmad Rizky"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground",
											children: "Admin"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 text-muted-foreground hidden sm:block" })
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 overflow-x-hidden",
				children: [actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 lg:px-6 pt-4 flex flex-wrap gap-2 justify-end",
					children: actions
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 lg:p-6",
					children
				})]
			})]
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function StatusPill({ tone, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", {
			normal: "bg-success/10 text-success border-success/20",
			warn: "bg-warning/15 text-warning-foreground border-warning/30",
			danger: "bg-destructive/10 text-destructive border-destructive/25",
			muted: "bg-muted text-muted-foreground border-border",
			info: "bg-accent/15 text-accent-foreground border-accent/25"
		}[tone], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full", tone === "normal" && "bg-success", tone === "warn" && "bg-warning", tone === "danger" && "bg-destructive", tone === "muted" && "bg-muted-foreground/60", tone === "info" && "bg-accent") }), children]
	});
}
function FillBar({ value, tone }) {
	if (value === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 flex-1 rounded-full bg-muted overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[repeating-linear-gradient(45deg,var(--muted-foreground)_0_4px,transparent_4px_8px)] opacity-30" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground tabular-nums w-10 text-right",
			children: "—"
		})]
	});
	const computed = tone === "warn" || tone === "danger" || tone === "normal" ? tone : value >= 90 ? "danger" : value >= 70 ? "warn" : "normal";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 flex-1 rounded-full bg-muted overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full", computed === "danger" ? "bg-destructive" : computed === "warn" ? "bg-warning" : "bg-success"),
				style: { width: `${value}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs tabular-nums w-10 text-right text-foreground/80",
			children: [value, "%"]
		})]
	});
}
function Section({ title, description, action, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-lg border border-border bg-card", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-start justify-between gap-4 px-5 py-4 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: description
				})]
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-5",
			children
		})]
	});
}
function DemoModal({ open, title, description, children, onClose, footer }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": "Tutup modal",
			className: "absolute inset-0 bg-foreground/35",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: title
						}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
							children: description
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[70vh] overflow-y-auto px-5 py-4",
					children
				}),
				footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex justify-end gap-2 border-t border-border px-5 py-3",
					children: footer
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn("h-9 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/20", props.className)
	});
}
function SelectInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cn("h-9 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/20", props.className)
	});
}
//#endregion
export { trend7d as _, Section as a, TextInput as c, distribusiStatus as d, historicalChart as f, pengangkutanList as g, pengangkutanHarian as h, FillBar as i, alerts as l, issues as m, DemoModal as n, SelectInput as o, history as p, Field as r, StatusPill as s, AppShell as t, bins as u, users as v };
