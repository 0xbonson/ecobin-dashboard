import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { O as Battery, d as Search, h as MapPin, n as Wifi, t as X } from "../_libs/lucide-react.mjs";
import { a as Section, i as FillBar, s as StatusPill, t as AppShell, u as bins } from "./ui-bits-pO_onUBf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monitoring-nhhXayRA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tone(s) {
	if (s === "Normal") return "normal";
	if (s === "Hampir Penuh") return "warn";
	if (s === "Penuh") return "danger";
	return "muted";
}
function MonitoringPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Semua");
	const [lokasi, setLokasi] = (0, import_react.useState)("Semua");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const lokasiList = (0, import_react.useMemo)(() => ["Semua", ...Array.from(new Set(bins.map((b) => b.lokasi)))], []);
	const filtered = bins.filter((b) => {
		if (status !== "Semua" && b.status !== status) return false;
		if (lokasi !== "Semua" && b.lokasi !== lokasi) return false;
		if (q && !`${b.id} ${b.lokasi}`.toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Monitoring Real-Time",
		subtitle: "Pemantauan kondisi terkini setiap tempat sampah berbasis sensor ultrasonik dan IR.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: `${filtered.length} perangkat ditemukan`,
			description: "Klik baris untuk melihat detail telemetri dan status komponen.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-2.5 h-9 rounded-md border border-border bg-background text-sm w-56",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Cari ID atau lokasi…",
							className: "bg-transparent outline-none w-full placeholder:text-muted-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: status,
						onChange: (e) => setStatus(e.target.value),
						className: "h-9 rounded-md border border-border bg-background px-2.5 text-sm",
						children: [
							"Semua",
							"Normal",
							"Hampir Penuh",
							"Penuh",
							"Gangguan Sensor",
							"Offline"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: lokasi,
						onChange: (e) => setLokasi(e.target.value),
						className: "h-9 rounded-md border border-border bg-background px-2.5 text-sm",
						children: lokasiList.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l }, l))
					})
				]
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
								children: "Sensor IR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left font-medium py-2 px-5",
								children: "Update"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						onClick: () => setSelected(b),
						className: "border-b border-border last:border-0 hover:bg-muted/40 cursor-pointer",
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
									tone: tone(b.status),
									children: b.status
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2.5 pr-3 tabular-nums text-foreground/80",
								children: [b.baterai, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-xs ${b.koneksi === "Online" ? "text-success" : "text-muted-foreground"}`,
									children: [
										b.koneksi,
										" · ",
										b.jenisKoneksi
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-3 text-xs",
								children: b.sensorIR
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 px-5 text-xs text-muted-foreground",
								children: b.updateTerakhir
							})
						]
					}, b.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 8,
						className: "py-12 text-center text-sm text-muted-foreground",
						children: "Tidak ada perangkat yang cocok dengan filter."
					}) })] })]
				})
			})
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-foreground/30",
				onClick: () => setSelected(null)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-xl overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "px-5 py-4 border-b border-border flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Detail Perangkat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base font-semibold mt-0.5",
							children: [
								selected.id,
								" · ",
								selected.lokasi
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
								" ",
								selected.lokasi
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelected(null),
						className: "h-8 w-8 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-5",
					children: [
						(selected.koneksi === "Offline" || selected.status === "Gangguan Sensor") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-warning/30 bg-warning/10 px-3 py-2.5 text-[12.5px] leading-snug text-foreground/90",
							children: [
								"Data ",
								selected.id,
								" belum diperbarui selama ",
								selected.updateTerakhir.replace(" lalu", ""),
								". Periksa koneksi perangkat atau sensor ultrasonik."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "uppercase tracking-wider text-muted-foreground",
										children: "Tingkat Kepenuhan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: ["ID ", selected.id]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-3xl font-semibold tabular-nums",
									children: selected.kepenuhan === null ? "—" : `${selected.kepenuhan}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillBar, { value: selected.kepenuhan })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: tone(selected.status),
										children: selected.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: ["Update ", selected.updateTerakhir]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-2",
							children: "Telemetri Sensor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Jarak ultrasonik",
									v: `${selected.jarakSensor} cm`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Sensor IR",
									v: selected.sensorIR
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Servo penutup",
									v: selected.servo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "LED / Buzzer",
									v: selected.ledBuzzer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Baterai",
									v: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "h-3.5 w-3.5" }),
											selected.baterai,
											"%"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Koneksi",
									v: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-3.5 w-3.5" }),
											selected.jenisKoneksi,
											" · ",
											selected.koneksi
										]
									})
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-2",
								children: "Catatan Pemeliharaan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-foreground/80",
								children: selected.catatan
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									"Terakhir dirawat: ",
									selected.terakhirDirawat,
									" · Instalasi: ",
									selected.tanggalInstalasi
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "rounded-md border border-border bg-muted/30 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer px-3 py-2 text-muted-foreground hover:text-foreground select-none",
								children: "Telemetri mentah (opsional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "px-3 pb-3 overflow-x-auto text-[11px] leading-snug text-foreground/70",
								children: `{
  "device_id": "${selected.id}",
  "fill": ${selected.kepenuhan ?? "null"},
  "battery": ${selected.baterai},
  "rssi": -64,
  "link": "${selected.jenisKoneksi}",
  "ts": "2026-06-18T10:42:18Z"
}`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex-1 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
								children: "Jadwalkan Pengangkutan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "h-9 px-3 rounded-md border border-border text-sm hover:bg-muted",
								children: "Buat Laporan"
							})]
						})
					]
				})]
			})]
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-0.5 rounded-md border border-border bg-background px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: v
		})]
	});
}
//#endregion
export { MonitoringPage as component };
