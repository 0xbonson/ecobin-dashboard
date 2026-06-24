import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { T as Check, a as UserPlus, p as Plus } from "../_libs/lucide-react.mjs";
import { c as TextInput, g as pengangkutanList, n as DemoModal, o as SelectInput, r as Field, s as StatusPill, t as AppShell, u as bins, v as users } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pengangkutan-H-ITSzsX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tone(s) {
	if (s === "Selesai") return "normal";
	if (s === "Dalam Perjalanan") return "warn";
	if (s === "Menunggu") return "info";
	return "muted";
}
function PengangkutanPage() {
	const [list, setList] = (0, import_react.useState)(pengangkutanList);
	const [selectedRoute, setSelectedRoute] = (0, import_react.useState)(null);
	const [assignOpen, setAssignOpen] = (0, import_react.useState)(false);
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [assign, setAssign] = (0, import_react.useState)({
		routeId: pengangkutanList[0]?.id ?? "",
		petugas: "Budi Santoso"
	});
	const [newRoute, setNewRoute] = (0, import_react.useState)({
		rute: "Rute E — Zona Timur",
		petugas: "Budi Santoso",
		estimasi: "30 menit",
		bins: "ECO-09, ECO-07"
	});
	const setStatus = (id, status) => {
		setList((l) => l.map((r) => r.id === id ? {
			...r,
			status
		} : r));
		toast.success("Status rute diperbarui.");
	};
	const assignOfficer = () => {
		setList((l) => l.map((r) => r.id === assign.routeId ? {
			...r,
			petugas: assign.petugas,
			status: r.status === "Dibatalkan" ? "Menunggu" : r.status
		} : r));
		setAssignOpen(false);
		toast.success("Petugas berhasil ditugaskan.");
	};
	const createRoute = () => {
		const route = {
			id: `RT-${String.fromCharCode(65 + list.length)}`,
			rute: newRoute.rute,
			petugas: newRoute.petugas,
			estimasi: newRoute.estimasi,
			status: "Menunggu",
			bins: newRoute.bins.split(",").map((b) => b.trim().toUpperCase()).filter(Boolean)
		};
		setList((l) => [route, ...l]);
		setCreateOpen(false);
		toast.success("Rute baru berhasil dibuat.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Pengangkutan Sampah",
		subtitle: "Antrian prioritas, penugasan petugas, dan status rute pengangkutan.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setAssignOpen(true),
			className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Tugaskan Petugas"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setCreateOpen(true),
			className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Buat Rute"]
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
				children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-5 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: r.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold mt-0.5",
								children: r.rute
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: tone(r.status),
								children: r.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Petugas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: r.petugas
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Estimasi durasi"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: r.estimasi
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Jumlah bin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: r.bins.length
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-md border border-border bg-muted/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5",
								children: "Antrian Bin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-1.5 text-xs",
								children: r.bins.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1.5 py-0.5 rounded-md border border-border bg-card font-medium tabular-nums",
										children: b
									}), i < r.bins.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "→"
									})]
								}, b))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: r.status,
								onChange: (e) => setStatus(r.id, e.target.value),
								className: "h-9 flex-1 rounded-md border border-border bg-background px-2.5 text-sm",
								children: [
									"Menunggu",
									"Dalam Perjalanan",
									"Selesai",
									"Dibatalkan"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							}), r.status === "Dibatalkan" || r.status === "Selesai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedRoute(r),
								className: "inline-flex items-center gap-1 h-9 px-3 rounded-md border border-border bg-background text-sm text-muted-foreground hover:bg-muted",
								children: "Lihat Detail"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setStatus(r.id, "Selesai"),
								className: "inline-flex items-center gap-1 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Selesai"]
							})]
						})
					]
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: assignOpen,
				title: "Tugaskan Petugas",
				description: "Pilih rute dan petugas lapangan untuk pengangkutan.",
				onClose: () => setAssignOpen(false),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setAssignOpen(false),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: assignOfficer,
					className: "h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium",
					children: "Simpan"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Rute",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							value: assign.routeId,
							onChange: (e) => setAssign({
								...assign,
								routeId: e.target.value
							}),
							children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r.id }, r.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Petugas",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							value: assign.petugas,
							onChange: (e) => setAssign({
								...assign,
								petugas: e.target.value
							}),
							children: users.filter((u) => u.role === "Petugas Lapangan").map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: u.nama }, u.id))
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: createOpen,
				title: "Buat Rute",
				description: "Buat rute pengangkutan baru berdasarkan prioritas kepenuhan.",
				onClose: () => setCreateOpen(false),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCreateOpen(false),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: createRoute,
					className: "h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium",
					children: "Buat Rute"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nama rute",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: newRoute.rute,
								onChange: (e) => setNewRoute({
									...newRoute,
									rute: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Petugas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								value: newRoute.petugas,
								onChange: (e) => setNewRoute({
									...newRoute,
									petugas: e.target.value
								}),
								children: users.filter((u) => u.role === "Petugas Lapangan").map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: u.nama }, u.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estimasi",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: newRoute.estimasi,
								onChange: (e) => setNewRoute({
									...newRoute,
									estimasi: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Daftar bin",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: newRoute.bins,
								onChange: (e) => setNewRoute({
									...newRoute,
									bins: e.target.value
								}),
								placeholder: "ECO-09, ECO-07"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: ["Referensi bin aktif: ", bins.slice(0, 5).map((b) => b.id).join(", ")]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!selectedRoute,
				title: selectedRoute ? `Detail ${selectedRoute.id}` : "Detail Rute",
				description: "Ringkasan rute pengangkutan dan status terakhir.",
				onClose: () => setSelectedRoute(null),
				children: selectedRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: tone(selectedRoute.status),
							children: selectedRoute.status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: selectedRoute.rute
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Petugas",
								v: selectedRoute.petugas
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Estimasi",
								v: selectedRoute.estimasi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Jumlah bin",
								v: `${selectedRoute.bins.length} unit`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								k: "Antrian",
								v: selectedRoute.bins.join(" → ")
							})
						]
					})]
				})
			})
		]
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
export { PengangkutanPage as component };
