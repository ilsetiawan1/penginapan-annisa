"use client";

import {
  Bed,
  CheckCircle2,
  Clock,
  Home,
  LogOut,
  Moon,
  Phone,
  Plus,
  RotateCw,
  Search,
  Send,
  Sparkles,
  Sun,
  Tv,
  User,
  Users,
  Wifi,
  Wind,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance";

interface RoomItem {
  number: string;
  type: "ac" | "kipas";
  typeName: string;
  floor: number;
  price: number;
  status: RoomStatus;
  guestName?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  totalNights?: number;
  totalAmount?: number;
  dpPaid?: number;
  remainingAmount?: number;
}

export default function AdminDashboardPage() {
  // Initial 8 Rooms State
  const [rooms, setRooms] = useState<RoomItem[]>([
    {
      number: "101",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      status: "ready",
    },
    {
      number: "102",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      status: "occupied",
      guestName: "Budi Santoso",
      guestPhone: "081234567890",
      checkInDate: "19 Aug 2026",
      checkOutDate: "21 Aug 2026",
      totalNights: 2,
      totalAmount: 550000,
      dpPaid: 275000,
      remainingAmount: 275000,
    },
    {
      number: "103",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      status: "dirty",
    },
    {
      number: "104",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      status: "ready",
    },
    {
      number: "201",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      status: "ready",
    },
    {
      number: "202",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      status: "ready",
    },
    {
      number: "203",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      status: "occupied",
      guestName: "Siti Rahma",
      guestPhone: "085299887766",
      checkInDate: "19 Aug 2026",
      checkOutDate: "20 Aug 2026",
      totalNights: 1,
      totalAmount: 200000,
      dpPaid: 100000,
      remainingAmount: 100000,
    },
    {
      number: "204",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      status: "ready",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<"all" | RoomStatus>("all");

  // Modal States
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptRoom, setReceiptRoom] = useState<RoomItem | null>(null);

  // Walk-in Form State
  const [walkInRoomNumber, setWalkInRoomNumber] = useState("101");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [totalNights, setTotalNights] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isFullPayment, setIsFullPayment] = useState(false);

  // Stats Calculations
  const readyCount = rooms.filter((r) => r.status === "ready").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const dirtyCount = rooms.filter((r) => r.status === "dirty").length;
  const maintenanceCount = rooms.filter((r) => r.status === "maintenance").length;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Actions
  const handleOpenWalkIn = (room?: RoomItem) => {
    if (room) {
      setWalkInRoomNumber(room.number);
      setSelectedRoom(room);
    } else {
      const firstReady = rooms.find((r) => r.status === "ready");
      if (firstReady) setWalkInRoomNumber(firstReady.number);
    }
    setGuestName("");
    setGuestPhone("");
    setTotalNights(1);
    setIsFullPayment(false);
    setIsWalkInOpen(true);
  };

  const handleSaveWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = rooms.find((r) => r.number === walkInRoomNumber);
    if (!targetRoom) return;

    const total = targetRoom.price * totalNights;
    const dp = isFullPayment ? total : total * 0.5;
    const remaining = total - dp;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === walkInRoomNumber) {
          return {
            ...r,
            status: "occupied",
            guestName: guestName || "Tamu Walk-in",
            guestPhone: guestPhone || "-",
            checkInDate: "Hari ini",
            checkOutDate: `${totalNights} malam ke depan`,
            totalNights,
            totalAmount: total,
            dpPaid: dp,
            remainingAmount: remaining,
          };
        }
        return r;
      }),
    );

    setIsWalkInOpen(false);
  };

  const handleCheckOut = (roomNumber: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === roomNumber) {
          return {
            ...r,
            status: "dirty",
            guestName: undefined,
            guestPhone: undefined,
            totalNights: undefined,
            totalAmount: undefined,
            dpPaid: undefined,
            remainingAmount: undefined,
          };
        }
        return r;
      }),
    );
  };

  const handleMarkClean = (roomNumber: string) => {
    setRooms((prev) => prev.map((r) => (r.number === roomNumber ? { ...r, status: "ready" } : r)));
  };

  const handleOpenReceipt = (room: RoomItem) => {
    setReceiptRoom(room);
    setIsReceiptOpen(true);
  };

  const filteredRooms = rooms.filter((r) => {
    if (activeFilter === "all") return true;
    return r.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/40 via-[#f8f5fc] to-white text-slate-900 pb-16">
      {/* Top Header Bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-xs bg-purple-50 border border-purple-200 flex items-center justify-center">
              <Image
                src="/logo-penginapan-annisa.png"
                alt="Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                  Penginapan Annisa
                </h1>
                <Badge variant="purple" className="text-[10px] py-0 px-2 font-bold">
                  Admin PMS Portal
                </Badge>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Operasional 8 Kamar Transit Bandara Pattimura
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={() => handleOpenWalkIn()}
              variant="primary"
              size="sm"
              className="gap-1.5 font-bold shadow-purple-600/20 text-xs sm:text-sm rounded-xl bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              <span>Tamu Walk-In</span>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs rounded-xl text-slate-600"
            >
              <Link href="/">
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lihat Web Publik</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Top Metric Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Ready */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === "ready" ? "all" : "ready")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeFilter === "ready"
                ? "bg-purple-50 border-purple-300 ring-2 ring-purple-500/20 shadow-xs"
                : "bg-white border-slate-200 hover:border-purple-200"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
                Siap Pakai
              </span>
              <span className="w-3 h-3 rounded-full bg-purple-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-700">{readyCount}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Kamar Kosong &amp; Bersih</p>
          </button>

          {/* Occupied */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === "occupied" ? "all" : "occupied")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeFilter === "occupied"
                ? "bg-blue-50 border-blue-300 ring-2 ring-blue-500/20 shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Terisi
              </span>
              <span className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-700">{occupiedCount}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Tamu Sedang Menginap</p>
          </button>

          {/* Dirty */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === "dirty" ? "all" : "dirty")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeFilter === "dirty"
                ? "bg-amber-50 border-amber-300 ring-2 ring-amber-500/20 shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Perlu Bersih
              </span>
              <span className="w-3 h-3 rounded-full bg-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-700">{dirtyCount}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Menunggu Housekeeping</p>
          </button>

          {/* Maintenance */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === "maintenance" ? "all" : "maintenance")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeFilter === "maintenance"
                ? "bg-red-50 border-red-300 ring-2 ring-red-500/20 shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
                Perbaikan
              </span>
              <span className="w-3 h-3 rounded-full bg-red-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-red-700">{maintenanceCount}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Out of Order</p>
          </button>
        </div>

        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Matriks Status 8 Kamar</h2>
            <p className="text-xs text-slate-500">
              Klik kartu kamar untuk input tamu, check-out, atau kirim bukti WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeFilter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Semua (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("ready")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeFilter === "ready"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
              }`}
            >
              Siap Pakai ({readyCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("occupied")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeFilter === "occupied"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200"
              }`}
            >
              Terisi ({occupiedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("dirty")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeFilter === "dirty"
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
              }`}
            >
              Perlu Bersih ({dirtyCount})
            </button>
          </div>
        </div>

        {/* 8 Rooms Visual Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRooms.map((room) => {
            const isReady = room.status === "ready";
            const isOccupied = room.status === "occupied";
            const isDirty = room.status === "dirty";
            const isMaintenance = room.status === "maintenance";

            return (
              <div
                key={room.number}
                className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                  isReady
                    ? "bg-white border-purple-200 hover:border-purple-400 hover:shadow-md"
                    : isOccupied
                      ? "bg-white border-blue-200/90 hover:border-blue-400 hover:shadow-md"
                      : isDirty
                        ? "bg-amber-50/40 border-amber-200 hover:border-amber-300"
                        : "bg-red-50/40 border-red-200"
                }`}
              >
                <div>
                  {/* Top Bar: Room Number + Type + Status Indicator */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                          #{room.number}
                        </span>
                        <Badge
                          variant={
                            isReady ? "purple" : isOccupied ? "blue" : isDirty ? "amber" : "danger"
                          }
                          className="text-[10px] py-0 px-2 font-bold uppercase"
                        >
                          {isReady
                            ? "Siap Pakai"
                            : isOccupied
                              ? "Terisi"
                              : isDirty
                                ? "Perlu Bersih"
                                : "Perbaikan"}
                        </Badge>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                        {room.typeName} (Lt. {room.floor})
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                      {formatRupiah(room.price)}
                    </span>
                  </div>

                  {/* Body Content based on Status */}
                  {isReady && (
                    <div className="py-4 my-2 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                      <CheckCircle2 className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-xs font-bold text-purple-900">Kamar Kosong &amp; Bersih</p>
                      <p className="text-[11px] text-purple-700">Siap menerima tamu transit</p>
                    </div>
                  )}

                  {isOccupied && (
                    <div className="p-3 my-2 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span className="truncate">{room.guestName}</span>
                        <span className="text-blue-700">{room.totalNights} Malam</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>WhatsApp:</span>
                        <span className="font-mono text-slate-700">{room.guestPhone}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-blue-200/60 text-[11px]">
                        <span>Sisa Bayar:</span>
                        <span className="font-bold text-slate-900">
                          {formatRupiah(room.remainingAmount || 0)}
                        </span>
                      </div>
                    </div>
                  )}

                  {isDirty && (
                    <div className="py-4 my-2 rounded-2xl bg-amber-100/40 border border-amber-200 text-center">
                      <Clock className="w-6 h-6 text-amber-600 mx-auto mb-1 animate-spin" />
                      <p className="text-xs font-bold text-amber-900">Tamu Baru Saja Pulang</p>
                      <p className="text-[11px] text-amber-700">Menunggu staf membersihkan sprei</p>
                    </div>
                  )}

                  {isMaintenance && (
                    <div className="py-4 my-2 rounded-2xl bg-red-100/40 border border-red-200 text-center">
                      <Zap className="w-6 h-6 text-red-600 mx-auto mb-1" />
                      <p className="text-xs font-bold text-red-900">Sedang Diperbaiki</p>
                    </div>
                  )}
                </div>

                {/* Bottom Quick Action Buttons */}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  {isReady && (
                    <Button
                      onClick={() => handleOpenWalkIn(room)}
                      variant="primary"
                      size="sm"
                      className="w-full gap-1 font-bold text-xs rounded-xl bg-purple-600 hover:bg-purple-700 shadow-purple-600/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Check-In Tamu</span>
                    </Button>
                  )}

                  {isOccupied && (
                    <div className="grid grid-cols-2 gap-1.5">
                      <Button
                        onClick={() => handleCheckOut(room.number)}
                        variant="secondary"
                        size="sm"
                        className="text-xs rounded-xl font-bold bg-slate-800 hover:bg-slate-900"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Check-Out</span>
                      </Button>
                      <Button
                        onClick={() => handleOpenReceipt(room)}
                        variant="outline"
                        size="sm"
                        className="text-xs rounded-xl text-purple-700 border-purple-200 hover:bg-purple-50 font-bold"
                      >
                        <Send className="w-3 h-3 text-purple-600" />
                        <span>Nota WA</span>
                      </Button>
                    </div>
                  )}

                  {isDirty && (
                    <Button
                      onClick={() => handleMarkClean(room.number)}
                      variant="primary"
                      size="sm"
                      className="w-full gap-1.5 font-bold text-xs rounded-xl bg-purple-600 hover:bg-purple-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tandai Sudah Bersih</span>
                    </Button>
                  )}

                  {isMaintenance && (
                    <Button
                      onClick={() => handleMarkClean(room.number)}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs rounded-xl text-slate-600"
                    >
                      <span>Selesai Perbaikan</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal 1: Fast-Track Walk-In Check-In */}
      <Dialog open={isWalkInOpen} onOpenChange={setIsWalkInOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold w-fit mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Input Tamu Kilat &lt; 1 Menit</span>
            </div>
            <DialogTitle>Form Check-In Tamu Walk-In</DialogTitle>
            <DialogDescription>
              Pilih kamar dan isi data pemesan untuk langsung check-in.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveWalkIn} className="space-y-4 pt-2">
            <div>
              <label
                htmlFor="walkInRoomSelect"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Pilih Kamar yang Siap Pakai
              </label>
              <select
                id="walkInRoomSelect"
                value={walkInRoomNumber}
                onChange={(e) => setWalkInRoomNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-purple-500"
              >
                {rooms.map((r) => (
                  <option key={r.number} value={r.number} disabled={r.status !== "ready"}>
                    Kamar #{r.number} — {r.typeName} ({formatRupiah(r.price)}/mlm){" "}
                    {r.status !== "ready" ? `[${r.status.toUpperCase()}]` : "[SIAP]"}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="walkInGuestName"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Nama Tamu
                </label>
                <input
                  id="walkInGuestName"
                  type="text"
                  placeholder="Nama Lengkap"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="walkInGuestPhone"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  No. WhatsApp
                </label>
                <input
                  id="walkInGuestPhone"
                  type="tel"
                  placeholder="0812xxxx"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="walkInTotalNights"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Lama Menginap
                </label>
                <select
                  id="walkInTotalNights"
                  value={totalNights}
                  onChange={(e) => setTotalNights(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-500"
                >
                  <option value={1}>1 Malam</option>
                  <option value={2}>2 Malam</option>
                  <option value={3}>3 Malam</option>
                  <option value={4}>4 Malam</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="walkInPaymentMethod"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Metode Bayar
                </label>
                <select
                  id="walkInPaymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-500"
                >
                  <option value="cash">Tunai (Cash)</option>
                  <option value="transfer">Transfer Bank</option>
                  <option value="qris">QRIS</option>
                </select>
              </div>
            </div>

            {/* Toggle Full / DP */}
            <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Langsung Bayar Lunas di Muka?</span>
              <button
                type="button"
                onClick={() => setIsFullPayment(!isFullPayment)}
                className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                  isFullPayment ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {isFullPayment ? "LUNAS" : "DP 50%"}
              </button>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsWalkInOpen(false)}
                className="rounded-xl"
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="rounded-xl font-bold gap-1.5 bg-purple-600 hover:bg-purple-700 shadow-purple-600/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan &amp; Check-In</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal 2: 1-Click WhatsApp Receipt Dispatcher */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold w-fit mb-1">
              <Send className="w-3.5 h-3.5" />
              <span>Nota Digital Resmi</span>
            </div>
            <DialogTitle>Kirim Rincian Nota via WhatsApp</DialogTitle>
            <DialogDescription>
              Pratinjau pesan nota resmi yang akan dikirimkan ke WhatsApp tamu.
            </DialogDescription>
          </DialogHeader>

          {receiptRoom && (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed space-y-1 overflow-x-auto select-all">
                <p className="font-bold text-purple-300">━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                <p className="font-bold text-center text-white">
                  BUKTI PEMBAYARAN PENGINAPAN ANNISA
                </p>
                <p className="font-bold text-purple-300">━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                <p>
                  No. Kamar : #{receiptRoom.number} ({receiptRoom.typeName})
                </p>
                <p>Nama Tamu : {receiptRoom.guestName}</p>
                <p>No. WhatsApp: {receiptRoom.guestPhone}</p>
                <p>Durasi : {receiptRoom.totalNights} Malam</p>
                <p>Total Biaya : {formatRupiah(receiptRoom.totalAmount || 0)}</p>
                <p>DP Dibayar : {formatRupiah(receiptRoom.dpPaid || 0)}</p>
                <p className="font-bold text-purple-300">
                  Sisa Tagihan: {formatRupiah(receiptRoom.remainingAmount || 0)}
                </p>
                <p className="font-bold text-purple-300">━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                <p className="text-[10px] text-slate-400 text-center">
                  Jl. Bandara Pattimura (750m dari Terminal), Ambon.
                  <br />
                  Terima kasih telah menginap di Penginapan Annisa!
                </p>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReceiptOpen(false)}
                  className="rounded-xl"
                >
                  Tutup
                </Button>
                <Button
                  asChild
                  variant="primary"
                  className="rounded-xl font-bold gap-1.5 bg-purple-600 hover:bg-purple-700 shadow-purple-600/20"
                >
                  <a
                    href={`https://wa.me/${
                      receiptRoom.guestPhone?.startsWith("08")
                        ? `62${receiptRoom.guestPhone.slice(1)}`
                        : receiptRoom.guestPhone
                    }?text=${encodeURIComponent(
                      `*BUKTI PEMBAYARAN - PENGINAPAN ANNISA*\nNo. Kamar: #${receiptRoom.number} (${receiptRoom.typeName})\nNama Tamu: ${receiptRoom.guestName}\nDurasi: ${receiptRoom.totalNights} Malam\nTotal: ${formatRupiah(receiptRoom.totalAmount || 0)}\nDP: ${formatRupiah(receiptRoom.dpPaid || 0)}\nSisa: ${formatRupiah(receiptRoom.remainingAmount || 0)}\n\nTerima kasih telah menginap di Penginapan Annisa Ambon!`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Buka Chat WA Tamu</span>
                  </a>
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
