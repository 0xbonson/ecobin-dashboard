import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as Clock, T as Check, h as MapPin } from "../_libs/lucide-react.mjs";
import { a as Section, l as alerts, n as DemoModal, s as StatusPill, t as AppShell } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifikasi-CtekxAwj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"Semua",
	"Critical",
	"Warning",
	"Maintenance",
	"Network"
];
function NotifPage() {
	const [tab, setTab] = (0, import_react.useState)("Semua");
	const [read, setRead] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [selected, setSelected] = (0, import_react.useState)(null);
	const list = alerts.filter((a) => tab === "Semua" || a.kategori === tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Pusat Notifikasi",
		subtitle: "Semua peringatan operasional, pemeliharaan, dan jaringan dari perangkat EcoBin.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Notifikasi",
			description: `${alerts.length - read.size} dari ${alerts.length} belum dibaca`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 rounded-md border border-border p-0.5 bg-background",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(t),
					className: `px-2.5 h-7 rounded text-xs font-medium ${tab === t ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: t
				}, t))
			}),
			children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mx-auto h-6 w-6 text-success/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-medium",
						children: "Tidak ada notifikasi pada kategori ini."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "Semua tempat sampah dalam kondisi aman."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border -my-2",
				children: list.map((a) => {
					const isRead = read.has(a.id);
					const sev = a.severity === "Kritis" ? "danger" : a.severity === "Peringatan" ? "warn" : "info";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `py-3 flex items-start gap-4 ${isRead ? "opacity-60" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: sev,
									children: a.severity
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: a.binId
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground font-normal",
											children: ["· ", a.kategori]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] mt-1 text-foreground/90",
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelected(a),
									className: "text-xs inline-flex items-center gap-1 px-2 h-8 rounded-md border border-border hover:bg-muted text-muted-foreground",
									children: "Detail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setRead((s) => {
										const n = new Set(s);
										const nextRead = !n.has(a.id);
										nextRead ? n.add(a.id) : n.delete(a.id);
										toast.success(nextRead ? "Notifikasi ditandai dibaca." : "Notifikasi ditandai belum dibaca.");
										return n;
									}),
									className: "text-xs inline-flex items-center gap-1 px-2 h-8 rounded-md border border-border hover:bg-muted text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), isRead ? "Belum dibaca" : "Tandai dibaca"]
								})]
							})
						]
					}, a.id);
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
			open: !!selected,
			title: selected ? `Detail Notifikasi ${selected.binId}` : "Detail Notifikasi",
			description: "Rincian alert dan tindakan yang disarankan.",
			onClose: () => setSelected(null),
			children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: selected.severity === "Kritis" ? "danger" : selected.severity === "Peringatan" ? "warn" : "info",
							children: selected.severity
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected.kategori })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "ID Bin",
								v: selected.binId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Lokasi",
								v: selected.lokasi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Waktu",
								v: selected.waktu
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Rekomendasi",
								v: "Periksa / jadwalkan pengangkutan"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-border bg-muted/40 p-3",
						children: selected.pesan
					})
				]
			})
		})]
	});
}
function Info({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-muted/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-medium",
			children: v
		})]
	});
}
//#endregion
export { NotifPage as component };
