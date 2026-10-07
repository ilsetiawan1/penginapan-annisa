"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (isInstalled) {
      toast.success("Aplikasi Penginapan Annisa sudah terpasang di perangkat Anda.");
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        toast.success("Aplikasi Penginapan Annisa berhasil dipasang.");
      }
      setDeferredPrompt(null);
      return;
    }

    // Panduan fallback jika browser tidak memicu beforeinstallprompt secara otomatis (Safari iOS, Firefox, atau Chrome desktop)
    if (typeof window !== "undefined") {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        toast.info(
          "Untuk memasang di iPhone/iPad: Ketuk ikon 'Bagikan' (Share) di Safari, lalu pilih 'Tambah ke Layar Utama'.",
          { duration: 5000 },
        );
      } else {
        toast.info(
          "Untuk memasang: Buka menu browser (ikon titik tiga atau ikon pasang di kolom alamat), lalu pilih 'Pasang/Install'.",
          { duration: 5000 },
        );
      }
    }
  };

  return {
    canInstall: true,
    installPWA,
    isInstalled,
  };
}
