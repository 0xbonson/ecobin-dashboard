import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { a as Section, m as issues, o as SelectInput, r as Field, s as StatusPill, t as AppShell, u as bins, v as users } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/laporan-DvYuQNFm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var kategoriList = [
	"Sensor error",
	"Servo tidak bergerak",
	"LED/buzzer rusak",
	"Koneksi offline",
	"Baterai lemah",
	"Sampah meluap"
];
var defaultForm = {
	bin: "ECO-03",
	kategori: "Sensor error",
	prioritas: "Sedang",
	petugas: "Budi Santoso",
	deskripsi: ""
};
function statusTone(s) {
	if (s === "Selesai") return "normal";
	if (s === "Diproses") return "warn";
	return "info";
}
function prioTone(p) {
	if (p === "Tinggi") return "danger";
	if (p === "Sedang") return "warn";
	return "muted";
}
function LaporanPage() {
	const [open, setOpen] = (0, import_react.useState)(true);
	const [issueList, setIssueList] = (0, import_react.useState)(issues);
	const [form, setForm] = (0, import_react.useState)(defaultForm);
	const submit = (e) => {
		e.preventDefault();
		if (!form.deskripsi.trim()) {
			toast.error("Deskripsi kendala wajib diisi.");
			return;
		}
		const newIssue = {
			id: `ISS-${105 + issueList.length}`,
			bin: form.bin,
			kategori: form.kategori,
			prioritas: form.prioritas,
			petugas: form.petugas,
			status: "Terbuka",
			dilaporkan: "Baru saja"
		};
		setIssueList((list) => [newIssue, ...list]);
		setForm(defaultForm);
		setOpen(false);
		toast.success("Laporan berhasil dikirim.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Laporan Kendala",
		subtitle: "Daftar kendala perangkat dan tindak lanjut dari petugas lapangan.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Lapor Kendala"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Daftar Kendala",
					description: `${issueList.length} laporan tercatat.`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto -mx-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 px-5",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Bin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Kategori"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Prioritas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Petugas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 pr-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium py-2 px-5",
										children: "Dilaporkan"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: issueList.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0 hover:bg-muted/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 px-5 font-medium tabular-nums",
										children: i.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 tabular-nums",
										children: i.bin
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-foreground/80",
										children: i.kategori
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: prioTone(i.prioritas),
											children: i.prioritas
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-foreground/80",
										children: i.petugas
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: statusTone(i.status),
											children: i.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 px-5 text-xs text-muted-foreground",
										children: i.dilaporkan
									})
								]
							}, i.id)) })]
						})
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Form Laporan Kendala",
				description: open ? "Catat masalah perangkat untuk ditindaklanjuti." : "Klik Lapor Kendala untuk membuka form.",
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: submit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Perangkat",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								value: form.bin,
								onChange: (e) => setForm({
									...form,
									bin: e.target.value
								}),
								children: bins.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: b.id,
									children: [
										b.id,
										" — ",
										b.lokasi
									]
								}, b.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kategori masalah",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								value: form.kategori,
								onChange: (e) => setForm({
									...form,
									kategori: e.target.value
								}),
								children: kategoriList.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Prioritas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: [
									"Rendah",
									"Sedang",
									"Tinggi"
								].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setForm({
										...form,
										prioritas: p
									}),
									className: `flex-1 h-9 rounded-md border text-sm ${form.prioritas === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`,
									children: p
								}, p))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tugaskan petugas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								value: form.petugas,
								onChange: (e) => setForm({
									...form,
									petugas: e.target.value
								}),
								children: users.filter((u) => u.role !== "Admin").map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: u.nama }, u.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Deskripsi",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.deskripsi,
								onChange: (e) => setForm({
									...form,
									deskripsi: e.target.value
								}),
								rows: 3,
								placeholder: "Jelaskan kondisi yang ditemukan…",
								className: "w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/20"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setForm(defaultForm);
									setOpen(false);
								},
								className: "h-9 flex-1 rounded-md border border-border bg-background text-sm hover:bg-muted",
								children: "Batal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "h-9 flex-1 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
								children: "Kirim Laporan"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-dashed border-border bg-muted/30 p-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Form laporan ditutup."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(true),
						className: "mt-3 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium",
						children: "Buka Form"
					})]
				})
			})]
		})
	});
}
//#endregion
export { LaporanPage as component };
