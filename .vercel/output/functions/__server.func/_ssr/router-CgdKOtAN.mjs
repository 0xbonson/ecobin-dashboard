import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CgdKOtAN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B8COW_PU.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-6xl font-semibold text-foreground tracking-tight",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-base font-medium text-foreground",
					children: "Halaman tidak ditemukan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Halaman yang Anda cari tidak tersedia atau telah dipindahkan."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95",
						children: "Kembali ke Dashboard"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold tracking-tight",
					children: "Terjadi kesalahan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Sistem mengalami gangguan sementara. Silakan coba lagi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95",
						children: "Coba lagi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted",
						children: "Ke Dashboard"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "EcoBin · Smart Waste Monitoring" },
			{
				name: "description",
				content: "Platform monitoring dan pengangkutan tempat sampah pintar berbasis IoT."
			},
			{
				name: "author",
				content: "EcoBin"
			},
			{
				property: "og:title",
				content: "EcoBin · Smart Waste Monitoring"
			},
			{
				property: "og:description",
				content: "Platform monitoring dan pengangkutan tempat sampah pintar berbasis IoT."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-right",
				richColors: true,
				closeButton: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$8 = () => import("./users-DtV5Ip71.mjs");
var Route$8 = createFileRoute("/users")({
	head: () => ({ meta: [{ title: "Manajemen User · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./riwayat-BgBIR_d5.mjs");
var Route$7 = createFileRoute("/riwayat")({
	head: () => ({ meta: [{ title: "Riwayat Monitoring · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./pengaturan-7fuV_JFt.mjs");
var Route$6 = createFileRoute("/pengaturan")({
	head: () => ({ meta: [{ title: "Pengaturan · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./pengangkutan-H-ITSzsX.mjs");
var Route$5 = createFileRoute("/pengangkutan")({
	head: () => ({ meta: [{ title: "Pengangkutan Sampah · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./notifikasi-CtekxAwj.mjs");
var Route$4 = createFileRoute("/notifikasi")({
	head: () => ({ meta: [{ title: "Notifikasi · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./monitoring-nhhXayRA.mjs");
var Route$3 = createFileRoute("/monitoring")({
	head: () => ({ meta: [{ title: "Monitoring Real-Time · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./laporan-DvYuQNFm.mjs");
var Route$2 = createFileRoute("/laporan")({
	head: () => ({ meta: [{ title: "Laporan Kendala · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./bins-BQ7APNGk.mjs");
var Route$1 = createFileRoute("/bins")({
	head: () => ({ meta: [{ title: "Data Tempat Sampah · EcoBin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-Cc_mj41h.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Dashboard · EcoBin" }, {
		name: "description",
		content: "Ringkasan operasional sistem monitoring tempat sampah pintar."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var UsersRoute = Route$8.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => Route$9
});
var RiwayatRoute = Route$7.update({
	id: "/riwayat",
	path: "/riwayat",
	getParentRoute: () => Route$9
});
var PengaturanRoute = Route$6.update({
	id: "/pengaturan",
	path: "/pengaturan",
	getParentRoute: () => Route$9
});
var PengangkutanRoute = Route$5.update({
	id: "/pengangkutan",
	path: "/pengangkutan",
	getParentRoute: () => Route$9
});
var NotifikasiRoute = Route$4.update({
	id: "/notifikasi",
	path: "/notifikasi",
	getParentRoute: () => Route$9
});
var MonitoringRoute = Route$3.update({
	id: "/monitoring",
	path: "/monitoring",
	getParentRoute: () => Route$9
});
var LaporanRoute = Route$2.update({
	id: "/laporan",
	path: "/laporan",
	getParentRoute: () => Route$9
});
var BinsRoute = Route$1.update({
	id: "/bins",
	path: "/bins",
	getParentRoute: () => Route$9
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	BinsRoute,
	LaporanRoute,
	MonitoringRoute,
	NotifikasiRoute,
	PengangkutanRoute,
	PengaturanRoute,
	RiwayatRoute,
	UsersRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
