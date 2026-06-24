import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as Download, y as FileText } from "../_libs/lucide-react.mjs";
import { a as Section, c as TextInput, f as historicalChart, o as SelectInput, p as history, r as Field, t as AppShell, u as bins } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as YAxis, h as Legend, l as CartesianGrid, m as Tooltip, o as XAxis, p as ResponsiveContainer, s as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/riwayat-BgBIR_d5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function eventDate(entry) {
	const months = {
		Jan: "01",
		Feb: "02",
		Mar: "03",
		Apr: "04",
		Mei: "05",
		Jun: "06",
		Jul: "07",
		Agu: "08",
		Sep: "09",
		Okt: "10",
		Nov: "11",
		Des: "12"
	};
	const [day, mon, year] = entry.waktu.split(" ");
	return `${year}-${months[mon] ?? "06"}-${day.padStart(2, "0")}`;
}
function eventMatches(entry, type) {
	if (type === "Semua") return true;
	const e = entry.event.toLowerCase();
	if (type === "Threshold penuh") return e.includes("threshold");
	if (type === "Update telemetry") return e.includes("telemetry");
	if (type === "Sensor error") return e.includes("sensor");
	return true;
}
function download(filename, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function RiwayatPage() {
	const [from, setFrom] = (0, import_react.useState)("2026-06-11");
	const [to, setTo] = (0, import_react.useState)("2026-06-18");
	const [bin, setBin] = (0, import_react.useState)("Semua");
	const [eventType, setEventType] = (0, import_react.useState)("Semua");
	const filtered = (0, import_react.useMemo)(() => history.filter((h) => {
		const d = eventDate(h);
		return (bin === "Semua" || h.binId === bin) && d >= from && d <= to && eventMatches(h, eventType);
	}), [
		bin,
		from,
		to,
		eventType
	]);
	const exportCsv = () => {
		download("riwayat-telemetri-ecobin.csv", ["Waktu,ID Bin,Lokasi,Event,Kepenuhan,Baterai", ...filtered.map((h) => `"${h.waktu}",${h.binId},"${h.lokasi}","${h.event}",${h.kepenuhan},${h.baterai}`)].join("\n"), "text/csv;charset=utf-8");
		toast.success("Riwayat berhasil diekspor sebagai CSV.");
	};
	const exportPdf = () => {
		const html = `<!doctype html><html><head><title>Riwayat Telemetri EcoBin</title><style>body{font-family:Arial,sans-serif;padding:24px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f3f4f6;text-align:left}</style></head><body><h2>Riwayat Telemetri EcoBin</h2><p>Periode ${from} — ${to}</p><table><thead><tr><th>Waktu</th><th>ID Bin</th><th>Lokasi</th><th>Event</th><th>Kepenuhan</th><th>Baterai</th></tr></thead><tbody>${filtered.map((h) => `<tr><td>${h.waktu}</td><td>${h.binId}</td><td>${h.lokasi}</td><td>${h.event}</td><td>${h.kepenuhan}%</td><td>${h.baterai}%</td></tr>`).join("")}</tbody></table><script>window.print()<\/script></body></html>`;
		const win = window.open("", "_blank", "width=960,height=700");
		if (win) {
			win.document.write(html);
			win.document.close();
			toast.success("Dokumen PDF siap dicetak/disimpan.");
		} else toast.error("Popup diblokir. Izinkan popup untuk ekspor PDF.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Riwayat Monitoring",
		subtitle: "Telemetri historis dari seluruh perangkat IoT untuk audit dan analisis.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: exportCsv,
			className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Ekspor CSV"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: exportPdf,
			className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), " Ekspor PDF"]
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Filter Periode",
				description: "Pilih rentang tanggal dan perangkat untuk membatasi data.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dari tanggal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								type: "date",
								value: from,
								onChange: (e) => setFrom(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Sampai tanggal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								type: "date",
								value: to,
								onChange: (e) => setTo(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Perangkat",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: bin,
								onChange: (e) => setBin(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Semua" }), bins.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: b.id }, b.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tipe event",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: eventType,
								onChange: (e) => setEventType(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Semua" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Threshold penuh" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Update telemetry" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Sensor error" })
								]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Tren Kepenuhan Historis",
					description: "Tiga perangkat dengan aktivitas tertinggi hari ini.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: historicalChart,
							margin: {
								left: -10,
								right: 8,
								top: 6,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "g1",
									x1: "0",
									x2: "0",
									y1: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--primary)",
										stopOpacity: .3
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--primary)",
										stopOpacity: 0
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "jam",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "ECO09",
									name: "ECO-09",
									stroke: "var(--primary)",
									fill: "url(#g1)",
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "ECO07",
									name: "ECO-07",
									stroke: "var(--warning)",
									fillOpacity: 0,
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "ECO15",
									name: "ECO-15",
									stroke: "var(--accent)",
									fillOpacity: 0,
									strokeWidth: 2
								})
							]
						}) })
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Riwayat Telemetri",
					description: `${filtered.length} entri pada rentang ${from} — ${to}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto -mx-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 px-5",
										children: "Waktu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "ID Bin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Lokasi"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Event"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Kepenuhan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 px-5",
										children: "Baterai"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0 hover:bg-muted/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 px-5 text-xs text-foreground/80 tabular-nums",
										children: h.waktu
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 font-medium tabular-nums",
										children: h.binId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-foreground/80",
										children: h.lokasi
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-foreground/80",
										children: h.event
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 pr-3 tabular-nums",
										children: [h.kepenuhan, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 px-5 tabular-nums",
										children: [h.baterai, "%"]
									})
								]
							}, h.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "py-12 text-center text-sm text-muted-foreground",
								children: "Tidak ada data yang cocok dengan filter."
							}) })] })]
						})
					})
				})
			})
		]
	});
}
//#endregion
export { RiwayatPage as component };
