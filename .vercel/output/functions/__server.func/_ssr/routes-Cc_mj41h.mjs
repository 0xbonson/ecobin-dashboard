import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as CircleCheck, D as BellRing, S as Clock, c as TrendingUp, f as Route, h as MapPin, k as ArrowUpRight, l as Trash2, m as OctagonAlert, r as WifiOff, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { _ as trend7d, a as Section, d as distribusiStatus, h as pengangkutanHarian, i as FillBar, l as alerts, n as DemoModal, s as StatusPill, t as AppShell, u as bins } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cc_mj41h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var stats = [
	{
		label: "Total Bin Terhubung",
		value: 23,
		delta: "+2 minggu ini",
		icon: Trash2,
		tone: "text-primary"
	},
	{
		label: "Bin Normal",
		value: 18,
		delta: "78% dari total",
		icon: CircleCheck,
		tone: "text-success"
	},
	{
		label: "Hampir Penuh",
		value: 5,
		delta: "Pantau rutin",
		icon: TriangleAlert,
		tone: "text-warning"
	},
	{
		label: "Bin Penuh",
		value: 3,
		delta: "Prioritas angkut",
		icon: OctagonAlert,
		tone: "text-destructive"
	},
	{
		label: "Notifikasi Aktif",
		value: 7,
		delta: "2 kritis",
		icon: BellRing,
		tone: "text-foreground"
	},
	{
		label: "Efisiensi Pengangkutan",
		value: "87%",
		delta: "+3% vs minggu lalu",
		icon: TrendingUp,
		tone: "text-primary"
	}
];
function statusTone(s) {
	if (s === "Normal") return "normal";
	if (s === "Hampir Penuh") return "warn";
	if (s === "Penuh") return "danger";
	return "muted";
}
function DashboardPage() {
	const [readAlerts, setReadAlerts] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [selectedAlert, setSelectedAlert] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Dashboard Operasional",
		subtitle: "Pantau status tempat sampah, notifikasi, dan aktivitas pengangkutan secara real-time.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3",
				children: stats.map((s) => {
					const Icon = s.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card px-4 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] uppercase tracking-wider",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 ${s.tone}` })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 text-2xl font-semibold tracking-tight tabular-nums",
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: s.delta
							})
						]
					}, s.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					className: "lg:col-span-2",
					title: "Tren Kepenuhan 7 Hari",
					description: "Rata-rata dan puncak tingkat kepenuhan harian (%).",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), "Rata-rata"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-warning" }), "Puncak"]
						})]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[240px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: trend7d,
							margin: {
								left: -10,
								right: 8,
								top: 8,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "hari",
									stroke: "var(--muted-foreground)",
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--muted-foreground)",
									fontSize: 11,
									tickLine: false,
									axisLine: false,
									domain: [0, 100]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--popover)",
									border: "1px solid var(--border)",
									borderRadius: 8,
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "rata",
									stroke: "var(--primary)",
									strokeWidth: 2,
									dot: { r: 3 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "puncak",
									stroke: "var(--warning)",
									strokeWidth: 2,
									dot: { r: 3 },
									strokeDasharray: "4 3"
								})
							]
						}) })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Distribusi Status",
					description: "Sebaran 23 perangkat aktif.",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[240px] flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data: distribusiStatus,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 48,
							outerRadius: 78,
							paddingAngle: 2,
							children: distribusiStatus.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: [
								"var(--success)",
								"var(--warning)",
								"var(--destructive)",
								"var(--muted-foreground)"
							][i] }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							background: "var(--popover)",
							border: "1px solid var(--border)",
							borderRadius: 8,
							fontSize: 12
						} })] }) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5 text-xs",
						children: distribusiStatus.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 rounded-full",
									style: { background: [
										"var(--success)",
										"var(--warning)",
										"var(--destructive)",
										"var(--muted-foreground)"
									][i] }
								}), d.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted-foreground",
								children: [d.value, " unit"]
							})]
						}, d.name))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					className: "xl:col-span-2",
					title: "Monitoring Tempat Sampah",
					description: "Pembaruan otomatis setiap 10 detik melalui MQTT.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/monitoring",
						className: "text-xs font-medium text-primary inline-flex items-center gap-1 hover:underline",
						children: ["Lihat semua ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto -mx-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 px-5",
										children: "ID Bin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Lokasi"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3 w-44",
										children: "Kepenuhan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Baterai"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Koneksi"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Update"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-right font-medium py-2 px-5",
										children: "Aksi"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: bins.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0 hover:bg-muted/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 px-5 font-medium tabular-nums",
										children: b.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-foreground/80",
										children: b.lokasi
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillBar, { value: b.kepenuhan })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: statusTone(b.status),
											children: b.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 pr-3 tabular-nums text-foreground/80",
										children: [b.baterai, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs ${b.koneksi === "Online" ? "text-success" : "text-muted-foreground"}`,
											children: b.koneksi
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-xs text-muted-foreground",
										children: b.updateTerakhir
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 px-5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toast.message(`Detail ${b.id} dibuka di halaman Monitoring.`),
											className: "text-xs font-medium text-primary hover:underline",
											children: "Detail"
										})
									})
								]
							}, b.id)) })]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Alert Terbaru",
					description: "Peringatan dari sensor IoT pada 24 jam terakhir.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: [alerts.length - readAlerts.size, " belum dibaca"]
					}),
					children: alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-6 w-6 text-success/80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium",
								children: "Tidak ada notifikasi kritis saat ini."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Semua tempat sampah dalam kondisi aman."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2.5",
						children: alerts.map((a) => {
							const read = readAlerts.has(a.id);
							const tone = a.severity === "Kritis" ? "danger" : a.severity === "Peringatan" ? "warn" : "info";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: `rounded-md border border-border p-3 ${read ? "opacity-60" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-start justify-between gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
													tone,
													children: a.severity
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-medium",
													children: a.binId
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 text-[13px] leading-snug",
												children: a.pesan
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), a.lokasi]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), a.waktu]
												})]
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2.5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setReadAlerts((s) => {
											const n = new Set(s);
											if (n.has(a.id)) n.delete(a.id);
											else n.add(a.id);
											return n;
										}),
										className: "text-[11px] text-muted-foreground hover:text-foreground",
										children: read ? "Tandai belum dibaca" : "Tandai sudah dibaca"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSelectedAlert(a),
										className: "text-[11px] font-medium text-primary px-2.5 py-1 rounded-md border border-border hover:bg-muted",
										children: "Lihat Detail"
									})]
								})]
							}, a.id);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-md border border-warning/30 bg-warning/10 px-4 py-3 flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-4 w-4 mt-0.5 text-warning shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] font-medium text-foreground",
							children: "Data ECO-03 belum diperbarui selama 15 menit."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Periksa koneksi perangkat atau sensor ultrasonik di Lapangan Utama."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/monitoring",
						className: "text-[11px] font-medium text-primary hover:underline whitespace-nowrap",
						children: "Periksa Perangkat"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Aktivitas Pengangkutan Harian",
						description: "Jumlah bin terangkut per hari (7 hari).",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: pengangkutanHarian,
								margin: {
									left: -10,
									right: 8,
									top: 6,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "hari",
										stroke: "var(--muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--popover)",
										border: "1px solid var(--border)",
										borderRadius: 8,
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "jumlah",
										fill: "var(--primary)",
										radius: [
											4,
											4,
											0,
											0
										],
										barSize: 20
									})
								]
							}) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Rute Prioritas Hari Ini",
						description: "Urutan pengangkutan berdasarkan tingkat kepenuhan.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: "warn",
							children: "Menunggu Pengangkutan"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "h-4 w-4 text-primary shrink-0" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "ECO-09"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "ECO-07"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "ECO-15"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-[11px] font-semibold",
										children: "BS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "leading-tight min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[13px] font-medium truncate",
											children: "Budi Santoso"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground",
											children: "Petugas Lapangan"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "grid grid-cols-2 gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border px-2.5 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-[10.5px] uppercase tracking-wider text-muted-foreground",
											children: "Estimasi"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-sm font-medium mt-0.5",
											children: "35 menit"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border px-2.5 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-[10.5px] uppercase tracking-wider text-muted-foreground",
											children: "Efisiensi"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-sm font-medium mt-0.5 text-success",
											children: "+18%"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/pengangkutan",
									className: "mt-1 inline-flex items-center justify-center w-full h-8 rounded-md border border-border text-xs font-medium hover:bg-muted",
									children: "Lihat Detail Rute"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Sebaran Lokasi Bin",
						description: "Peta skematik area kampus.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: "5 titik aktif"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusMap, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!selectedAlert,
				title: selectedAlert ? `Detail Alert ${selectedAlert.binId}` : "Detail Alert",
				description: "Informasi alert operasional dari perangkat EcoBin.",
				onClose: () => setSelectedAlert(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSelectedAlert(null),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Tutup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/notifikasi",
					onClick: () => setSelectedAlert(null),
					className: "h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center",
					children: "Buka Notifikasi"
				})] }),
				children: selectedAlert && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: selectedAlert.severity === "Kritis" ? "danger" : selectedAlert.severity === "Peringatan" ? "warn" : "info",
								children: selectedAlert.severity
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: selectedAlert.kategori
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "ID Bin"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium tabular-nums",
									children: selectedAlert.binId
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Lokasi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: selectedAlert.lokasi
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Waktu"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selectedAlert.waktu })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Tindak lanjut"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Periksa perangkat / rute prioritas" })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-border bg-muted/40 p-3 text-foreground/85",
							children: selectedAlert.pesan
						})
					]
				})
			})
		]
	});
}
var campusPoints = [
	{
		name: "Fakultas Teknik",
		binId: "ECO-01",
		x: 18,
		y: 28,
		tone: "normal",
		fill: "45%"
	},
	{
		name: "Kantin Utama",
		binId: "ECO-09",
		x: 72,
		y: 36,
		tone: "danger",
		fill: "96%"
	},
	{
		name: "Taman Kampus",
		binId: "ECO-07",
		x: 50,
		y: 60,
		tone: "warn",
		fill: "82%"
	},
	{
		name: "Perpustakaan",
		binId: "ECO-12",
		x: 28,
		y: 72,
		tone: "normal",
		fill: "61%"
	},
	{
		name: "Gedung Kuliah A",
		binId: "ECO-15",
		x: 80,
		y: 76,
		tone: "warn",
		fill: "78%"
	}
];
var toneColor = {
	normal: "var(--success)",
	warn: "var(--warning)",
	danger: "var(--destructive)",
	muted: "var(--muted-foreground)"
};
function CampusMap() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/9] rounded-md border border-border bg-muted/30 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "absolute inset-0 w-full h-full",
					viewBox: "0 0 100 100",
					preserveAspectRatio: "none",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 10 30 Q 40 30 50 60 T 80 76",
							stroke: "var(--border)",
							strokeWidth: "0.6",
							fill: "none",
							strokeDasharray: "2 2",
							vectorEffect: "non-scaling-stroke"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 50 60 L 28 72",
							stroke: "var(--border)",
							strokeWidth: "0.6",
							fill: "none",
							strokeDasharray: "2 2",
							vectorEffect: "non-scaling-stroke"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 50 60 L 72 36",
							stroke: "var(--border)",
							strokeWidth: "0.6",
							fill: "none",
							strokeDasharray: "2 2",
							vectorEffect: "non-scaling-stroke"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-3 bottom-2 text-[9px] uppercase tracking-wider text-muted-foreground/60",
					children: "Area Kampus"
				}),
				campusPoints.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -translate-x-1/2 -translate-y-1/2 block h-2.5 w-2.5 rounded-full ring-[3px] ring-card",
					style: {
						left: `${p.x}%`,
						top: `${p.y}%`,
						background: toneColor[p.tone]
					},
					title: `${p.binId} · ${p.name}`
				}, p.binId))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1.5",
			children: campusPoints.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 text-[12.5px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2 w-2 rounded-full shrink-0",
						style: { background: toneColor[p.tone] }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground tabular-nums text-[10.5px] w-12",
						children: p.binId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 min-w-0 truncate",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground tabular-nums text-[11px]",
						children: p.fill
					})
				]
			}, p.binId))
		})]
	});
}
//#endregion
export { DashboardPage as component };
