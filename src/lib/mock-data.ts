export type BinStatus = "Normal" | "Hampir Penuh" | "Penuh" | "Gangguan Sensor" | "Offline";

export type Bin = {
  id: string;
  lokasi: string;
  kepenuhan: number | null;
  status: BinStatus;
  baterai: number;
  koneksi: "Online" | "Offline";
  updateTerakhir: string;
  kapasitas: string;
  tanggalInstalasi: string;
  terakhirDirawat: string;
  jarakSensor: number;
  sensorIR: "Aktif" | "Nonaktif" | "Error";
  servo: "Normal" | "Tertutup" | "Error";
  ledBuzzer: "Normal" | "Error";
  jenisKoneksi: "Wi-Fi" | "LoRa";
  catatan: string;
};

export const bins: Bin[] = [
  {
    id: "ECO-01", lokasi: "Fakultas Teknik", kepenuhan: 45, status: "Normal",
    baterai: 91, koneksi: "Online", updateTerakhir: "12 detik lalu",
    kapasitas: "120 L", tanggalInstalasi: "12 Jan 2025", terakhirDirawat: "08 Mei 2025",
    jarakSensor: 33, sensorIR: "Aktif", servo: "Normal", ledBuzzer: "Normal",
    jenisKoneksi: "Wi-Fi", catatan: "Kondisi baik, tidak ada keluhan.",
  },
  {
    id: "ECO-07", lokasi: "Taman Kampus", kepenuhan: 82, status: "Hampir Penuh",
    baterai: 76, koneksi: "Online", updateTerakhir: "21 detik lalu",
    kapasitas: "120 L", tanggalInstalasi: "20 Jan 2025", terakhirDirawat: "02 Mei 2025",
    jarakSensor: 11, sensorIR: "Aktif", servo: "Normal", ledBuzzer: "Normal",
    jenisKoneksi: "LoRa", catatan: "Sering penuh saat akhir pekan.",
  },
  {
    id: "ECO-09", lokasi: "Kantin Utama", kepenuhan: 96, status: "Penuh",
    baterai: 64, koneksi: "Online", updateTerakhir: "8 detik lalu",
    kapasitas: "240 L", tanggalInstalasi: "05 Feb 2025", terakhirDirawat: "10 Mei 2025",
    jarakSensor: 2, sensorIR: "Aktif", servo: "Tertutup", ledBuzzer: "Normal",
    jenisKoneksi: "Wi-Fi", catatan: "Perlu pengangkutan segera.",
  },
  {
    id: "ECO-12", lokasi: "Perpustakaan", kepenuhan: 61, status: "Normal",
    baterai: 88, koneksi: "Online", updateTerakhir: "17 detik lalu",
    kapasitas: "120 L", tanggalInstalasi: "11 Feb 2025", terakhirDirawat: "30 Apr 2025",
    jarakSensor: 22, sensorIR: "Aktif", servo: "Normal", ledBuzzer: "Normal",
    jenisKoneksi: "Wi-Fi", catatan: "—",
  },
  {
    id: "ECO-15", lokasi: "Gedung Kuliah A", kepenuhan: 78, status: "Hampir Penuh",
    baterai: 70, koneksi: "Online", updateTerakhir: "31 detik lalu",
    kapasitas: "120 L", tanggalInstalasi: "18 Feb 2025", terakhirDirawat: "06 Mei 2025",
    jarakSensor: 13, sensorIR: "Aktif", servo: "Normal", ledBuzzer: "Normal",
    jenisKoneksi: "Wi-Fi", catatan: "Pantau setiap jam istirahat.",
  },
  {
    id: "ECO-03", lokasi: "Lapangan Utama", kepenuhan: null, status: "Gangguan Sensor",
    baterai: 22, koneksi: "Offline", updateTerakhir: "15 menit lalu",
    kapasitas: "240 L", tanggalInstalasi: "14 Jan 2025", terakhirDirawat: "20 Mar 2025",
    jarakSensor: 0, sensorIR: "Error", servo: "Error", ledBuzzer: "Error",
    jenisKoneksi: "LoRa", catatan: "Sensor ultrasonik perlu diganti.",
  },
];

export type AlertItem = {
  id: string;
  severity: "Kritis" | "Peringatan" | "Info";
  binId: string;
  lokasi: string;
  pesan: string;
  waktu: string;
  kategori: "Critical" | "Warning" | "Maintenance" | "Network";
};

export const alerts: AlertItem[] = [
  { id: "a1", severity: "Kritis", binId: "ECO-09", lokasi: "Kantin Utama",
    pesan: "Sudah penuh 96% dan perlu segera dikosongkan.", waktu: "2 menit lalu", kategori: "Critical" },
  { id: "a2", severity: "Peringatan", binId: "ECO-07", lokasi: "Taman Kampus",
    pesan: "Hampir penuh 82%.", waktu: "6 menit lalu", kategori: "Warning" },
  { id: "a3", severity: "Peringatan", binId: "ECO-15", lokasi: "Gedung Kuliah A",
    pesan: "Hampir penuh 78%.", waktu: "9 menit lalu", kategori: "Warning" },
  { id: "a4", severity: "Kritis", binId: "ECO-03", lokasi: "Lapangan Utama",
    pesan: "Gangguan sensor ultrasonik terdeteksi.", waktu: "15 menit lalu", kategori: "Maintenance" },
  { id: "a5", severity: "Info", binId: "ECO-11", lokasi: "Asrama Putra",
    pesan: "Perangkat offline selama 15 menit.", waktu: "15 menit lalu", kategori: "Network" },
];

export const trend7d = [
  { hari: "Sen", rata: 42, puncak: 68 },
  { hari: "Sel", rata: 48, puncak: 72 },
  { hari: "Rab", rata: 51, puncak: 79 },
  { hari: "Kam", rata: 55, puncak: 82 },
  { hari: "Jum", rata: 63, puncak: 91 },
  { hari: "Sab", rata: 47, puncak: 70 },
  { hari: "Min", rata: 39, puncak: 58 },
];

export const distribusiStatus = [
  { name: "Normal", value: 18 },
  { name: "Hampir Penuh", value: 5 },
  { name: "Penuh", value: 3 },
  { name: "Offline", value: 2 },
];

export const pengangkutanHarian = [
  { hari: "Sen", jumlah: 9 },
  { hari: "Sel", jumlah: 11 },
  { hari: "Rab", jumlah: 8 },
  { hari: "Kam", jumlah: 13 },
  { hari: "Jum", jumlah: 15 },
  { hari: "Sab", jumlah: 7 },
  { hari: "Min", jumlah: 4 },
];

export type Pengangkutan = {
  id: string;
  rute: string;
  petugas: string;
  estimasi: string;
  status: "Menunggu" | "Dalam Perjalanan" | "Selesai" | "Dibatalkan";
  bins: string[];
};

export const pengangkutanList: Pengangkutan[] = [
  { id: "RT-A", rute: "Rute A — Zona Tengah", petugas: "Budi Santoso", estimasi: "35 menit",
    status: "Dalam Perjalanan", bins: ["ECO-09", "ECO-07", "ECO-15"] },
  { id: "RT-B", rute: "Rute B — Zona Utara", petugas: "Rian Pratama", estimasi: "28 menit",
    status: "Menunggu", bins: ["ECO-12", "ECO-04"] },
  { id: "RT-C", rute: "Rute C — Zona Selatan", petugas: "Hendra Wijaya", estimasi: "42 menit",
    status: "Selesai", bins: ["ECO-01", "ECO-18", "ECO-22"] },
  { id: "RT-D", rute: "Rute D — Zona Barat", petugas: "—", estimasi: "—",
    status: "Dibatalkan", bins: ["ECO-05"] },
];

export type IssueReport = {
  id: string;
  bin: string;
  kategori: "Sensor error" | "Servo tidak bergerak" | "LED/buzzer rusak" | "Koneksi offline" | "Baterai lemah" | "Sampah meluap";
  prioritas: "Rendah" | "Sedang" | "Tinggi";
  petugas: string;
  status: "Terbuka" | "Diproses" | "Selesai";
  dilaporkan: string;
};

export const issues: IssueReport[] = [
  { id: "ISS-104", bin: "ECO-03", kategori: "Sensor error", prioritas: "Tinggi", petugas: "Budi Santoso", status: "Diproses", dilaporkan: "Hari ini, 09:14" },
  { id: "ISS-103", bin: "ECO-11", kategori: "Koneksi offline", prioritas: "Sedang", petugas: "Rian Pratama", status: "Terbuka", dilaporkan: "Hari ini, 08:02" },
  { id: "ISS-102", bin: "ECO-22", kategori: "Baterai lemah", prioritas: "Sedang", petugas: "Hendra Wijaya", status: "Selesai", dilaporkan: "Kemarin, 16:48" },
  { id: "ISS-101", bin: "ECO-09", kategori: "Sampah meluap", prioritas: "Tinggi", petugas: "Budi Santoso", status: "Selesai", dilaporkan: "Kemarin, 11:20" },
];

export type AppUser = {
  id: string;
  nama: string;
  email: string;
  role: "Admin" | "Supervisor" | "Petugas Lapangan";
  status: "Aktif" | "Nonaktif";
  terakhirLogin: string;
};

export const users: AppUser[] = [
  { id: "U-01", nama: "Ahmad Rizky", email: "ahmad.rizky@ecobin.id", role: "Admin", status: "Aktif", terakhirLogin: "Hari ini, 08:10" },
  { id: "U-02", nama: "Siti Rahma", email: "siti.rahma@ecobin.id", role: "Supervisor", status: "Aktif", terakhirLogin: "Hari ini, 07:42" },
  { id: "U-03", nama: "Budi Santoso", email: "budi.santoso@ecobin.id", role: "Petugas Lapangan", status: "Aktif", terakhirLogin: "Hari ini, 06:30" },
  { id: "U-04", nama: "Rian Pratama", email: "rian.pratama@ecobin.id", role: "Petugas Lapangan", status: "Aktif", terakhirLogin: "Kemarin, 17:55" },
  { id: "U-05", nama: "Hendra Wijaya", email: "hendra.wijaya@ecobin.id", role: "Petugas Lapangan", status: "Nonaktif", terakhirLogin: "3 hari lalu" },
];

export type HistoryEntry = {
  id: string;
  binId: string;
  lokasi: string;
  kepenuhan: number;
  baterai: number;
  event: string;
  waktu: string;
};

export const history: HistoryEntry[] = [
  { id: "h1", binId: "ECO-09", lokasi: "Kantin Utama", kepenuhan: 96, baterai: 64, event: "Threshold penuh tercapai", waktu: "18 Jun 2026 10:42" },
  { id: "h2", binId: "ECO-07", lokasi: "Taman Kampus", kepenuhan: 82, baterai: 76, event: "Hampir penuh", waktu: "18 Jun 2026 10:31" },
  { id: "h3", binId: "ECO-15", lokasi: "Gedung Kuliah A", kepenuhan: 78, baterai: 70, event: "Hampir penuh", waktu: "18 Jun 2026 10:18" },
  { id: "h4", binId: "ECO-12", lokasi: "Perpustakaan", kepenuhan: 61, baterai: 88, event: "Update telemetry", waktu: "18 Jun 2026 10:05" },
  { id: "h5", binId: "ECO-01", lokasi: "Fakultas Teknik", kepenuhan: 45, baterai: 91, event: "Update telemetry", waktu: "18 Jun 2026 09:58" },
  { id: "h6", binId: "ECO-03", lokasi: "Lapangan Utama", kepenuhan: 0, baterai: 22, event: "Sensor error", waktu: "18 Jun 2026 09:50" },
  { id: "h7", binId: "ECO-09", lokasi: "Kantin Utama", kepenuhan: 71, baterai: 65, event: "Update telemetry", waktu: "18 Jun 2026 09:40" },
  { id: "h8", binId: "ECO-07", lokasi: "Taman Kampus", kepenuhan: 64, baterai: 77, event: "Update telemetry", waktu: "18 Jun 2026 09:25" },
];

export const historicalChart = [
  { jam: "06:00", ECO09: 12, ECO07: 18, ECO15: 22 },
  { jam: "08:00", ECO09: 28, ECO07: 32, ECO15: 35 },
  { jam: "10:00", ECO09: 54, ECO07: 51, ECO15: 48 },
  { jam: "12:00", ECO09: 78, ECO07: 66, ECO15: 58 },
  { jam: "14:00", ECO09: 88, ECO07: 73, ECO15: 67 },
  { jam: "16:00", ECO09: 96, ECO07: 82, ECO15: 78 },
];
