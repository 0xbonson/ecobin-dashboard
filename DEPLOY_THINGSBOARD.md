# Menghubungkan Dashboard EcoBin Vercel ke ThingsBoard

Source ini sudah memiliki endpoint server:

```text
GET /api/ecobin/latest
```

Endpoint tersebut berjalan di server TanStack Start/Vercel. Browser tidak membaca ThingsBoard secara langsung, sehingga credential tetap aman di environment variable Vercel.

## 1. Tambahkan environment variable di Vercel

Masuk ke project `ecobin-dashboard` di Vercel:

```text
Settings → Environment Variables
```

Tambahkan pada target **Production**, **Preview**, dan **Development** bila tersedia:

```text
TB_BASE_URL = https://thingsboard.cloud
TB_DEVICE_ID = ID device ECO-01
TB_DEVICE_NAME = ECO-01
TB_DEVICE_LOCATION = Fakultas Teknik
```

Untuk autentikasi, pilih salah satu metode berikut.

### Rekomendasi: API key

```text
TB_API_KEY = API key ThingsBoard
```

### Fallback: akun ThingsBoard

Gunakan hanya bila API key tidak tersedia:

```text
TB_USERNAME = email akun ThingsBoard
TB_PASSWORD = password akun ThingsBoard
```

Jangan mengisi `TB_API_KEY` bersamaan dengan `TB_USERNAME` dan `TB_PASSWORD` kecuali memang diperlukan. Kode akan memprioritaskan API key.

Jangan pakai awalan `VITE_` atau `NEXT_PUBLIC_` pada semua variable di atas.

## 2. Deploy ulang

Setelah environment variable tersimpan, lakukan redeploy dari Vercel atau push commit baru ke GitHub. Environment variable baru tidak digunakan oleh deployment lama.

## 3. Tes endpoint

Buka URL berikut setelah deployment:

```text
https://DOMAIN-VERCEL-KAMU/api/ecobin/latest
```

Jika berhasil, responsnya memiliki format seperti ini:

```json
{
  "ok": true,
  "source": "thingsboard",
  "telemetry": {
    "deviceName": "ECO-01",
    "fillLevel": 96,
    "distanceCm": 6,
    "binStatusText": "Penuh",
    "irStatusText": "Terdeteksi"
  }
}
```

## 4. Yang berubah pada website

- Halaman **Pengaturan** sekarang menjelaskan integrasi HTTP + ThingsBoard, bukan MQTT dummy.
- Header menampilkan status ThingsBoard aktual jika endpoint berhasil membaca telemetry.
- Halaman **Dashboard** menampilkan data live `ECO-01` pada tabel monitoring.
- Halaman **Monitoring Real-Time** mengganti baris `ECO-01` dengan telemetry yang dibaca dari ThingsBoard setiap 5 detik.
- Nilai baterai `ECO-01` ditampilkan `—` sampai perangkat fisik benar-benar mengirim telemetry baterai.

## Telemetry minimum dari ESP32

Agar dashboard terisi lengkap, ESP32 perlu mengirim key berikut ke ThingsBoard:

```text
fillLevel
distanceCm
irDetected
irStatusText
servoStatus
ledStatus
buzzerStatus
binStatus
binStatusText
```
