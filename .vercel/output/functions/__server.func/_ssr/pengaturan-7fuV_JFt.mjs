import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Section, c as TextInput, r as Field, t as AppShell } from "./ui-bits-pO_onUBf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pengaturan-7fuV_JFt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaults = {
	almost: 70,
	full: 80,
	interval: 10,
	notifWeb: true,
	notifMobile: true,
	optimasi: true,
	mqtt: "mqtts://broker.ecobin.id:8883",
	topic: "ecobin/devices",
	api: "https://api.ecobin.id/v1",
	region: "ap-southeast-1"
};
function PengaturanPage() {
	const [settings, setSettings] = (0, import_react.useState)(defaults);
	const save = () => {
		if (settings.interval < 5 || settings.interval > 300) {
			toast.error("Interval update harus berada pada rentang 5–300 detik.");
			return;
		}
		if (settings.almost >= settings.full) {
			toast.error("Threshold hampir penuh harus lebih kecil dari threshold penuh.");
			return;
		}
		toast.success("Data berhasil disimpan.");
	};
	const reset = () => {
		setSettings(defaults);
		toast.message("Perubahan dibatalkan dan pengaturan dikembalikan.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Pengaturan Sistem",
		subtitle: "Konfigurasi ambang batas, notifikasi, dan integrasi cloud.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Threshold Sensor",
					description: "Tentukan ambang batas tingkat kepenuhan.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: "Threshold hampir penuh",
								value: settings.almost,
								onChange: (almost) => setSettings({
									...settings,
									almost
								}),
								suffix: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: "Threshold penuh",
								value: settings.full,
								onChange: (full) => setSettings({
									...settings,
									full
								}),
								suffix: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								label: "Interval update data",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
										type: "number",
										min: 5,
										max: 300,
										value: settings.interval,
										onChange: (e) => setSettings({
											...settings,
											interval: Number(e.target.value)
										}),
										className: "w-24 tabular-nums"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "detik"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: "Disarankan 10–30 detik untuk demo dan sensor EcoBin."
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Notifikasi",
					description: "Atur kanal pengiriman notifikasi peringatan.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								label: "Notifikasi web",
								desc: "Tampilkan pop-up di dashboard saat ada alert.",
								value: settings.notifWeb,
								onChange: (notifWeb) => setSettings({
									...settings,
									notifWeb
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								label: "Notifikasi mobile",
								desc: "Kirim push notification ke aplikasi petugas.",
								value: settings.notifMobile,
								onChange: (notifMobile) => setSettings({
									...settings,
									notifMobile
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								label: "Optimasi rute otomatis",
								desc: "Saran rute pengangkutan berbasis kepenuhan.",
								value: settings.optimasi,
								onChange: (optimasi) => setSettings({
									...settings,
									optimasi
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Koneksi Cloud",
					description: "Konfigurasi broker MQTT dan endpoint API.",
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "MQTT Broker URL",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.mqtt,
										onChange: (e) => setSettings({
											...settings,
											mqtt: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Topic prefix",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.topic,
										onChange: (e) => setSettings({
											...settings,
											topic: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "API Endpoint",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.api,
										onChange: (e) => setSettings({
											...settings,
											api: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Region",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.region,
										onChange: (e) => setSettings({
											...settings,
											region: e.target.value
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between rounded-md border border-border bg-muted/40 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: "Status koneksi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Terhubung ke ThingsBoard Cloud · 1 device demo aktif · HTTP telemetry valid"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 text-success text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-success" }), " Online"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: reset,
								className: "h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted",
								children: "Batal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: save,
								className: "h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95",
								children: "Simpan Perubahan"
							})]
						})
					]
				})
			]
		})
	});
}
function Slider({ label, value, onChange, suffix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between mb-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm font-medium tabular-nums",
			children: [value, suffix]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "range",
		min: 0,
		max: 100,
		value,
		onChange: (e) => onChange(Number(e.target.value)),
		className: "w-full accent-[color:var(--primary)]"
	})] });
}
function Toggle({ label, desc, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onChange(!value),
		"aria-pressed": value,
		className: "flex w-full items-center justify-between gap-4 rounded-md border border-border p-3 text-left hover:bg-muted/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs text-muted-foreground mt-0.5",
			children: desc
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${value ? "border-primary bg-primary" : "border-border bg-muted"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}` })
		})]
	});
}
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, { ...props });
}
//#endregion
export { PengaturanPage as component };
