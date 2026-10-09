"use client";

import type { AdminRole } from "@/components/layout/admin-sidebar";
import { ANNISA_WA_NUMBER } from "@/lib/whatsapp";
import { useEffect, useState } from "react";
import { useSettings, useUpdateSettings } from "../hooks/use-settings";
import { SettingsGeneralForm } from "./admin/settings-general-form";
import { SettingsHeader } from "./admin/settings-header";
import { SettingsProfileCard } from "./admin/settings-profile-card";

interface AdminSettingsProps {
  currentRole?: AdminRole;
  onRoleChange?: (role: AdminRole) => void;
}

export function AdminSettings({
  currentRole: _currentRole,
  onRoleChange: _onRoleChange,
}: AdminSettingsProps = {}) {
  const { data: settings } = useSettings();
  const updateMutation = useUpdateSettings();

  const [waNumber, setWaNumber] = useState(ANNISA_WA_NUMBER);
  const [lodgingName, setLodgingName] = useState("Penginapan Annisa");
  const [distanceText, setDistanceText] = useState(
    "2-3 Menit dari Bandara Pattimura",
  );
  const [checkinTime, setCheckinTime] = useState("14:00 WIT");
  const [checkoutTime, setCheckoutTime] = useState("12:00 WIT");
  const [minDpPercent, setMinDpPercent] = useState("50%");

  // Sinkronkan state lokal saat data settings dari database termuat
  useEffect(() => {
    if (settings) {
      if (settings.whatsapp_number) setWaNumber(settings.whatsapp_number);
      if (settings.lodging_name) setLodgingName(settings.lodging_name);
      if (settings.airport_distance) setDistanceText(settings.airport_distance);
      if (settings.checkin_time) setCheckinTime(settings.checkin_time);
      if (settings.checkout_time) setCheckoutTime(settings.checkout_time);
      if (settings.min_dp_percent) setMinDpPercent(settings.min_dp_percent);
    }
  }, [settings]);

  const handleReset = () => {
    if (settings) {
      setWaNumber(settings.whatsapp_number || ANNISA_WA_NUMBER);
      setLodgingName(settings.lodging_name || "Penginapan Annisa");
      setDistanceText(
        settings.airport_distance || "2-3 Menit dari Bandara Pattimura",
      );
      setCheckinTime(settings.checkin_time || "14:00 WIT");
      setCheckoutTime(settings.checkout_time || "12:00 WIT");
      setMinDpPercent(settings.min_dp_percent || "50%");
    }
  };

  const handleSave = async () => {
    await updateMutation.mutateAsync({
      whatsapp_number: waNumber.trim(),
      lodging_name: lodgingName.trim(),
      airport_distance: distanceText.trim(),
      checkin_time: checkinTime.trim(),
      checkout_time: checkoutTime.trim(),
      min_dp_percent: minDpPercent.trim(),
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Pengaturan Halaman */}
      <SettingsHeader />

      {/* 2. Grid 2-Kolom Bersih & Seimbang */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Kolom Kiri: Profil & Kredensial Pengguna (5 Kolom) */}
        <div className="lg:col-span-5">
          <SettingsProfileCard />
        </div>

        {/* Kolom Kanan: Pengaturan Properti & Operasional (7 Kolom) */}
        <div className="lg:col-span-7">
          <SettingsGeneralForm
            waNumber={waNumber}
            onWaNumberChange={setWaNumber}
            lodgingName={lodgingName}
            onLodgingNameChange={setLodgingName}
            distanceText={distanceText}
            onDistanceTextChange={setDistanceText}
            checkinTime={checkinTime}
            onCheckinTimeChange={setCheckinTime}
            checkoutTime={checkoutTime}
            onCheckoutTimeChange={setCheckoutTime}
            minDpPercent={minDpPercent}
            onMinDpPercentChange={setMinDpPercent}
            onSave={handleSave}
            onReset={handleReset}
            isSaving={updateMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}

export { SettingsGeneralForm, SettingsHeader, SettingsProfileCard };
