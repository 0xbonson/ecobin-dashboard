import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DemoModal, Field, Section, SelectInput, StatusPill, TextInput } from "@/components/ui-bits";
import { bins as initialBins, type Bin } from "@/lib/mock-data";

export const Route = createFileRoute("/bins")({
  head: () => ({ meta: [{ title: "Data Tempat Sampah · EcoBin" }] }),
  component: BinsPage,
});

const emptyForm = {
  id: "",
  lokasi: "",
  kapasitas: "120 L",
  jenisKoneksi: "Wi-Fi" as Bin["jenisKoneksi"],
};

function BinsPage() {
  const [binList, setBinList] = useState(initialBins);
  const [selected, setSelected] = useState<Bin | null>(null);
  const [editing, setEditing] = useState<Bin | null>(null);
  const [confirmInactive, setConfirmInactive] = useState<Bin | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const resetForm = () => setForm(emptyForm);

  const addBin = () => {
    if (!form.id.trim() || !form.lokasi.trim()) {
      toast.error("ID bin dan lokasi wajib diisi.");
      return;
    }
    const newBin: Bin = {
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
      catatan: "Perangkat baru ditambahkan pada mode demo.",
    };
    setBinList((list) => [newBin, ...list]);
    setAddOpen(false);
    resetForm();
    toast.success("Bin baru berhasil ditambahkan.");
  };

  const saveEdit = () => {
    if (!editing) return;
    setBinList((list) => list.map((b) => (b.id === editing.id ? editing : b)));
    setEditing(null);
    toast.success("Perubahan perangkat berhasil disimpan.");
  };

  const deactivate = () => {
    if (!confirmInactive) return;
    setBinList((list) => list.map((b) => (b.id === confirmInactive.id ? { ...b, koneksi: "Offline", status: "Offline", updateTerakhir: "baru saja" } : b)));
    toast.warning(`${confirmInactive.id} berhasil dinonaktifkan pada mode demo.`);
    setConfirmInactive(null);
  };

  return (
    <AppShell
      title="Data Tempat Sampah"
      subtitle="Manajemen perangkat terdaftar, status instalasi, dan jadwal perawatan."
    >
      <Section
        title="Perangkat Terdaftar"
        description={`${binList.length} bin tercatat dalam sistem.`}
        action={
          <button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-95">
            <Plus className="h-4 w-4" /> Tambah Bin
          </button>
        }
      >
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2 px-5">ID Bin</th>
                <th className="text-left font-medium py-2 pr-3">Lokasi</th>
                <th className="text-left font-medium py-2 pr-3">Kapasitas</th>
                <th className="text-left font-medium py-2 pr-3">Status Perangkat</th>
                <th className="text-left font-medium py-2 pr-3">Koneksi</th>
                <th className="text-left font-medium py-2 pr-3">Tanggal Instalasi</th>
                <th className="text-left font-medium py-2 pr-3">Terakhir Dirawat</th>
                <th className="text-right font-medium py-2 px-5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {binList.map((b) => {
                const ok = b.koneksi === "Online";
                return (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="py-2.5 px-5 font-medium tabular-nums">{b.id}</td>
                    <td className="py-2.5 pr-3 text-foreground/80">{b.lokasi}</td>
                    <td className="py-2.5 pr-3 tabular-nums">{b.kapasitas}</td>
                    <td className="py-2.5 pr-3">
                      <StatusPill tone={ok ? "normal" : "danger"}>{ok ? "Aktif" : "Bermasalah"}</StatusPill>
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-foreground/80">{b.jenisKoneksi} · {b.koneksi}</td>
                    <td className="py-2.5 pr-3 text-xs text-foreground/80">{b.tanggalInstalasi}</td>
                    <td className="py-2.5 pr-3 text-xs text-foreground/80">{b.terakhirDirawat}</td>
                    <td className="py-2.5 px-5 text-right">
                      <div className="inline-flex items-center gap-1 text-xs">
                        <button onClick={() => setSelected(b)} className="px-2 py-1 rounded-md hover:bg-muted text-foreground/80">Detail</button>
                        <button onClick={() => setEditing(b)} className="px-2 py-1 rounded-md hover:bg-muted text-foreground/80">Edit</button>
                        <button onClick={() => setConfirmInactive(b)} className="px-2 py-1 rounded-md hover:bg-muted text-destructive">Nonaktifkan</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <DemoModal
        open={addOpen}
        title="Tambah Bin"
        description="Tambah perangkat EcoBin baru pada mode demo."
        onClose={() => setAddOpen(false)}
        footer={
          <>
            <button onClick={() => setAddOpen(false)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
            <button onClick={addBin} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Simpan</button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-3">
          <Field label="ID Bin"><TextInput value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="ECO-24" /></Field>
          <Field label="Lokasi"><TextInput value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} placeholder="Gedung Baru" /></Field>
          <Field label="Kapasitas"><TextInput value={form.kapasitas} onChange={(e) => setForm({ ...form, kapasitas: e.target.value })} /></Field>
          <Field label="Jenis koneksi">
            <SelectInput value={form.jenisKoneksi} onChange={(e) => setForm({ ...form, jenisKoneksi: e.target.value as Bin["jenisKoneksi"] })}>
              <option>Wi-Fi</option><option>LoRa</option>
            </SelectInput>
          </Field>
        </div>
      </DemoModal>

      <DemoModal
        open={!!selected}
        title={selected ? `Detail ${selected.id}` : "Detail Perangkat"}
        description="Ringkasan data perangkat, sensor, dan catatan pemeliharaan."
        onClose={() => setSelected(null)}
      >
        {selected && (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Info k="Lokasi" v={selected.lokasi} />
            <Info k="Kapasitas" v={selected.kapasitas} />
            <Info k="Status" v={selected.status} />
            <Info k="Koneksi" v={`${selected.jenisKoneksi} · ${selected.koneksi}`} />
            <Info k="Sensor IR" v={selected.sensorIR} />
            <Info k="Servo" v={selected.servo} />
            <Info k="LED/Buzzer" v={selected.ledBuzzer} />
            <Info k="Baterai" v={`${selected.baterai}%`} />
            <div className="col-span-2 rounded-md border border-border bg-muted/40 p-3">
              <dt className="text-xs text-muted-foreground">Catatan</dt>
              <dd className="mt-1 text-foreground/85">{selected.catatan}</dd>
            </div>
          </dl>
        )}
      </DemoModal>

      <DemoModal
        open={!!editing}
        title={editing ? `Edit ${editing.id}` : "Edit Perangkat"}
        description="Ubah data dasar perangkat pada mode demo."
        onClose={() => setEditing(null)}
        footer={
          <>
            <button onClick={() => setEditing(null)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
            <button onClick={saveEdit} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Simpan Perubahan</button>
          </>
        }
      >
        {editing && (
          <div className="grid grid-cols-1 gap-3">
            <Field label="Lokasi"><TextInput value={editing.lokasi} onChange={(e) => setEditing({ ...editing, lokasi: e.target.value })} /></Field>
            <Field label="Kapasitas"><TextInput value={editing.kapasitas} onChange={(e) => setEditing({ ...editing, kapasitas: e.target.value })} /></Field>
            <Field label="Catatan"><TextInput value={editing.catatan} onChange={(e) => setEditing({ ...editing, catatan: e.target.value })} /></Field>
          </div>
        )}
      </DemoModal>

      <DemoModal
        open={!!confirmInactive}
        title="Nonaktifkan Perangkat"
        description="Tindakan ini hanya mengubah status perangkat pada mode demo."
        onClose={() => setConfirmInactive(null)}
        footer={
          <>
            <button onClick={() => setConfirmInactive(null)} className="h-9 px-3 rounded-md border border-border bg-background text-sm hover:bg-muted">Batal</button>
            <button onClick={deactivate} className="h-9 px-4 rounded-md bg-destructive text-destructive-foreground text-sm font-medium">Nonaktifkan</button>
          </>
        }
      >
        <p className="text-sm text-foreground/85">Perangkat {confirmInactive?.id} akan ditandai offline dan bermasalah.</p>
      </DemoModal>
    </AppShell>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/40 p-3">
      <dt className="text-xs text-muted-foreground">{k}</dt>
      <dd className="mt-1 font-medium">{v}</dd>
    </div>
  );
}
