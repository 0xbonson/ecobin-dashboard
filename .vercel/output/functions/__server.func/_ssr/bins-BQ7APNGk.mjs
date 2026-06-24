import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { a as Section, c as TextInput, n as DemoModal, o as SelectInput, r as Field, s as StatusPill, t as AppShell, u as bins } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bins-BQ7APNGk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	id: "",
	lokasi: "",
	kapasitas: "120 L",
	jenisKoneksi: "Wi-Fi"
};
function BinsPage() {
	const [binList, setBinList] = (0, import_react.useState)(bins);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [confirmInactive, setConfirmInactive] = (0, import_react.useState)(null);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const resetForm = () => setForm(emptyForm);
	const addBin = () => {
		if (!form.id.trim() || !form.lokasi.trim()) {
			toast.error("ID bin dan lokasi wajib diisi.");
			return;
		}
		const newBin = {
			id: form.id.trim().toUpperCase(),
			lokasi: form.lokasi.trim(),
			kapasitas: form.kapasitas,
			jenisKoneksi: form.jenisKoneksi,
			kepenuhan: 0,
			status: "Normal",
			baterai: 100,
			koneksi: "Online",
			updateTerakhir: "baru saja",
			tanggalInstalasi: "Hari ini",
			terakhirDirawat: "Hari ini",
			jarakSensor: 60,
			sensorIR: "Aktif",
			servo: "Normal",
			ledBuzzer: "Normal",
			catatan: "Perangkat baru ditambahkan pada mode demo."
		};
		setBinList((list) => [newBin, ...list]);
		setAddOpen(false);
		resetForm();
		toast.success("Bin baru berhasil ditambahkan.");
	};
	const saveEdit = () => {
		if (!editing) return;
		setBinList((list) => list.map((b) => b.id === editing.id ? editing : b));
		setEditing(null);
		toast.success("Perubahan perangkat berhasil disimpan.");
	};
	const deactivate = () => {
		if (!confirmInactive) return;
		setBinList((list) => list.map((b) => b.id === confirmInactive.id ? {
			...b,
			koneksi: "Offline",
			status: "Offline",
			updateTerakhir: "baru saja"
		} : b));
		toast.warning(`${confirmInactive.id} berhasil dinonaktifkan pada mode demo.`);
		setConfirmInactive(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Data Tempat Sampah",
		subtitle: "Manajemen perangkat terdaftar, status instalasi, dan jadwal perawatan.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Perangkat Terdaftar",
				description: `${binList.length} bin tercatat dalam sistem.`,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setAddOpen(true),
					className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Tambah Bin"]
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
									className: "text-left font-medium py-2 pr-3",
									children: "Kapasitas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Status Perangkat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Koneksi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Tanggal Instalasi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Terakhir Dirawat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right font-medium py-2 px-5",
									children: "Aksi"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: binList.map((b) => {
							const ok = b.koneksi === "Online";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
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
										className: "py-2.5 pr-3 tabular-nums",
										children: b.kapasitas
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											tone: ok ? "normal" : "danger",
											children: ok ? "Aktif" : "Bermasalah"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 pr-3 text-xs text-foreground/80",
										children: [
											b.jenisKoneksi,
											" · ",
											b.koneksi
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-xs text-foreground/80",
										children: b.tanggalInstalasi
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 text-xs text-foreground/80",
										children: b.terakhirDirawat
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 px-5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-1 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setSelected(b),
													className: "px-2 py-1 rounded-md hover:bg-muted text-foreground/80",
													children: "Detail"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setEditing(b),
													className: "px-2 py-1 rounded-md hover:bg-muted text-foreground/80",
													children: "Edit"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setConfirmInactive(b),
													className: "px-2 py-1 rounded-md hover:bg-muted text-destructive",
													children: "Nonaktifkan"
												})
											]
										})
									})
								]
							}, b.id);
						}) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: addOpen,
				title: "Tambah Bin",
				description: "Tambah perangkat EcoBin baru pada mode demo.",
				onClose: () => setAddOpen(false),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setAddOpen(false),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: addBin,
					className: "h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium",
					children: "Simpan"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "ID Bin",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: form.id,
								onChange: (e) => setForm({
									...form,
									id: e.target.value
								}),
								placeholder: "ECO-24"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lokasi",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: form.lokasi,
								onChange: (e) => setForm({
									...form,
									lokasi: e.target.value
								}),
								placeholder: "Gedung Baru"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kapasitas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: form.kapasitas,
								onChange: (e) => setForm({
									...form,
									kapasitas: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Jenis koneksi",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: form.jenisKoneksi,
								onChange: (e) => setForm({
									...form,
									jenisKoneksi: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Wi-Fi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "LoRa" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!selected,
				title: selected ? `Detail ${selected.id}` : "Detail Perangkat",
				description: "Ringkasan data perangkat, sensor, dan catatan pemeliharaan.",
				onClose: () => setSelected(null),
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Lokasi",
							v: selected.lokasi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Kapasitas",
							v: selected.kapasitas
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Status",
							v: selected.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Koneksi",
							v: `${selected.jenisKoneksi} · ${selected.koneksi}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Sensor IR",
							v: selected.sensorIR
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Servo",
							v: selected.servo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "LED/Buzzer",
							v: selected.ledBuzzer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							k: "Baterai",
							v: `${selected.baterai}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 rounded-md border border-border bg-muted/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Catatan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-foreground/85",
								children: selected.catatan
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!editing,
				title: editing ? `Edit ${editing.id}` : "Edit Perangkat",
				description: "Ubah data dasar perangkat pada mode demo.",
				onClose: () => setEditing(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setEditing(null),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: saveEdit,
					className: "h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium",
					children: "Simpan Perubahan"
				})] }),
				children: editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lokasi",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: editing.lokasi,
								onChange: (e) => setEditing({
									...editing,
									lokasi: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kapasitas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: editing.kapasitas,
								onChange: (e) => setEditing({
									...editing,
									kapasitas: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Catatan",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: editing.catatan,
								onChange: (e) => setEditing({
									...editing,
									catatan: e.target.value
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!confirmInactive,
				title: "Nonaktifkan Perangkat",
				description: "Tindakan ini hanya mengubah status perangkat pada mode demo.",
				onClose: () => setConfirmInactive(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setConfirmInactive(null),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: deactivate,
					className: "h-9 px-4 rounded-md bg-destructive text-destructive-foreground text-sm font-medium",
					children: "Nonaktifkan"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-foreground/85",
					children: [
						"Perangkat ",
						confirmInactive?.id,
						" akan ditandai offline dan bermasalah."
					]
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
export { BinsPage as component };
