import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { a as Section, c as TextInput, n as DemoModal, o as SelectInput, r as Field, s as StatusPill, t as AppShell, v as users } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-DtV5Ip71.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function roleTone(r) {
	if (r === "Admin") return "danger";
	if (r === "Supervisor") return "info";
	return "muted";
}
var emptyUser = {
	nama: "",
	email: "",
	role: "Petugas Lapangan"
};
function UsersPage() {
	const [userList, setUserList] = (0, import_react.useState)(users);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [confirmInactive, setConfirmInactive] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyUser);
	const addUser = () => {
		if (!form.nama.trim() || !form.email.trim()) {
			toast.error("Nama dan email wajib diisi.");
			return;
		}
		const newUser = {
			id: `U-${String(userList.length + 1).padStart(2, "0")}`,
			nama: form.nama.trim(),
			email: form.email.trim(),
			role: form.role,
			status: "Aktif",
			terakhirLogin: "Belum pernah login"
		};
		setUserList((list) => [newUser, ...list]);
		setForm(emptyUser);
		setAddOpen(false);
		toast.success("Pengguna baru berhasil ditambahkan.");
	};
	const saveEdit = () => {
		if (!editing) return;
		setUserList((list) => list.map((u) => u.id === editing.id ? editing : u));
		setEditing(null);
		toast.success("Data pengguna berhasil diperbarui.");
	};
	const deactivate = () => {
		if (!confirmInactive) return;
		setUserList((list) => list.map((u) => u.id === confirmInactive.id ? {
			...u,
			status: "Nonaktif"
		} : u));
		toast.warning(`${confirmInactive.nama} berhasil dinonaktifkan.`);
		setConfirmInactive(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Manajemen User",
		subtitle: "Atur akses, peran, dan status pengguna dalam sistem EcoBin.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setAddOpen(true),
			className: "inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Tambah Pengguna"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-4",
				children: [
					{
						role: "Admin",
						count: userList.filter((u) => u.role === "Admin").length,
						desc: "Akses penuh sistem & konfigurasi"
					},
					{
						role: "Supervisor",
						count: userList.filter((u) => u.role === "Supervisor").length,
						desc: "Mengawasi pengangkutan & laporan"
					},
					{
						role: "Petugas Lapangan",
						count: userList.filter((u) => u.role === "Petugas Lapangan").length,
						desc: "Eksekusi rute & laporan kendala"
					}
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: roleTone(r.role),
							children: r.role
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-semibold tabular-nums",
							children: r.count
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: r.desc
					})]
				}, r.role))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Daftar Pengguna",
				description: `${userList.length} akun terdaftar.`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto -mx-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 px-5",
									children: "Nama"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left font-medium py-2 pr-3",
									children: "Terakhir Login"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right font-medium py-2 px-5",
									children: "Aksi"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: userList.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-0 hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 px-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-[11px] font-semibold",
											children: u.nama.split(" ").map((p) => p[0]).slice(0, 2).join("")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: u.nama
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-foreground/80",
									children: u.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: roleTone(u.role),
										children: u.role
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: u.status === "Aktif" ? "normal" : "muted",
										children: u.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-xs text-muted-foreground",
									children: u.terakhirLogin
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2.5 px-5 text-right text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditing(u),
										className: "px-2 py-1 rounded-md hover:bg-muted",
										children: "Edit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setConfirmInactive(u),
										className: "px-2 py-1 rounded-md hover:bg-muted text-destructive",
										children: "Nonaktifkan"
									})]
								})
							]
						}, u.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: addOpen,
				title: "Tambah Pengguna",
				description: "Tambahkan akun pengguna baru untuk demo.",
				onClose: () => setAddOpen(false),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setAddOpen(false),
					className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: addUser,
					className: "h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium",
					children: "Simpan"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nama",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: form.nama,
								onChange: (e) => setForm({
									...form,
									nama: e.target.value
								}),
								placeholder: "Nama pengguna"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: form.email,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								}),
								placeholder: "nama@ecobin.id"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Role",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: form.role,
								onChange: (e) => setForm({
									...form,
									role: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Admin" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Supervisor" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Petugas Lapangan" })
								]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!editing,
				title: editing ? `Edit ${editing.nama}` : "Edit Pengguna",
				description: "Ubah role dan status pengguna.",
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
							label: "Nama",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: editing.nama,
								onChange: (e) => setEditing({
									...editing,
									nama: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: editing.email,
								onChange: (e) => setEditing({
									...editing,
									email: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Role",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: editing.role,
								onChange: (e) => setEditing({
									...editing,
									role: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Admin" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Supervisor" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Petugas Lapangan" })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
								value: editing.status,
								onChange: (e) => setEditing({
									...editing,
									status: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Aktif" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Nonaktif" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: !!confirmInactive,
				title: "Nonaktifkan Pengguna",
				description: "Akun tidak dihapus, hanya ditandai nonaktif pada mode demo.",
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
						"Nonaktifkan akun ",
						confirmInactive?.nama,
						"?"
					]
				})
			})
		]
	});
}
//#endregion
export { UsersPage as component };
