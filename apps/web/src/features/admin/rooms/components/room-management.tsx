"use client";

import { Bed, Check, RotateCw, Save, Wind } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";

interface RoomTypeConfig {
  id: string;
  name: string;
  price: number;
  capacity: string;
  bedType: string;
  roomCodes: string[];
  facilities: string[];
  unitCount: number;
}

const INITIAL_TYPES: RoomTypeConfig[] = [
  {
    id: "ac",
    name: "Kamar Tipe AC",
    price: 275000,
    capacity: "2–3 Orang",
    bedType: "1 Kasur Besar (Double Bed)",
    roomCodes: ["#A1", "#A2", "#B1", "#B2"],
    facilities: [
      "AC Dingin",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    unitCount: 4,
  },
  {
    id: "kipas",
    name: "Kamar Tipe Kipas",
    price: 200000,
    capacity: "2–3 Orang",
    bedType: "1 Kasur Besar (Double Bed)",
    roomCodes: ["#A3", "#A4", "#B3", "#B4"],
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    unitCount: 4,
  },
];

export function RoomManagement() {
  const [types, setTypes] = useState<RoomTypeConfig[]>(INITIAL_TYPES);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handlePriceChange = (id: string, newPrice: number) => {
    setTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, price: newPrice } : t)),
    );
  };

  const handleSave = () => {
    toast.success("Tarif dan spesifikasi kamar berhasil disimpan!");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTypes(INITIAL_TYPES);
    toast.success("Daftar tarif kamar telah di-refresh ke default!");
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Pengaturan Master Tarif
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Pengaturan Tarif &amp; Fasilitas 8 Kamar
          </h2>
          <p className="text-xs text-slate-500">
            Perubahan harga di sini akan otomatis terhubung ke formulir
            pemesanan WhatsApp publik dan sistem kasir staf resepsionis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh Data Tarif"
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-purple-700" : ""}`}
            />
            <span className="text-xs font-black hidden sm:inline">Refresh</span>
          </button>

          <Button
            type="button"
            onClick={handleSave}
            className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-11 px-6 gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </div>

      {/* 2 Tipe Kamar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {types.map((type) => (
          <div
            key={type.id}
            className="bg-white rounded-3xl border-2 border-purple-200/90 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {type.unitCount} Unit Kamar
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  {type.name}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                {type.id === "ac" ? (
                  <Wind className="w-5 h-5" />
                ) : (
                  <Bed className="w-5 h-5" />
                )}
              </div>
            </div>

            {/* Daftar Unit Kamar yang Menggunakan Tipe Ini */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Nomor Unit Kamar:
              </span>
              <div className="flex gap-1.5">
                {type.roomCodes.map((code) => (
                  <span
                    key={code}
                    className="bg-purple-100/70 text-purple-900 text-xs font-black px-2.5 py-1 rounded-xl"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>

            {/* Input Edit Harga */}
            <div className="space-y-1.5 pt-2">
              <label
                htmlFor={`price-${type.id}`}
                className="text-[11px] font-black text-slate-700 uppercase tracking-wider block"
              >
                Tarif Sewa per Malam (Rp)
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-2xl px-4 py-2.5">
                <span className="text-sm font-black text-slate-500">Rp</span>
                <input
                  id={`price-${type.id}`}
                  type="number"
                  value={type.price}
                  onChange={(e) =>
                    handlePriceChange(type.id, Number(e.target.value))
                  }
                  className="w-full bg-transparent text-lg font-black text-purple-700 outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-500">
                DP Otomatis 50%:{" "}
                <strong className="text-purple-700 font-bold">
                  Rp {(type.price * 0.5).toLocaleString("id-ID")}
                </strong>
              </p>
            </div>

            {/* Fasilitas Kamar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                Fasilitas Kamar Termasuk:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {type.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="bg-purple-50 text-purple-900 border border-purple-100 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-purple-700" />
                    <span>{fac}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
