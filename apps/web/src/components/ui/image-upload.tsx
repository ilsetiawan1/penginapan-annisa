"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImagePlus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";

interface ImageKitAuthResponse {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  urlEndpoint: string;
}

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  description?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "/rooms",
  label = "Upload Foto Kamar",
  description = "Format JPG, PNG, atau WebP (Maks. 5MB)",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview when value prop changes (e.g. when opening a different room)
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      return;
    }

    try {
      setIsUploading(true);

      // 1. Ambil Signature Auth dari Backend API
      const authData = await apiClient.get<ImageKitAuthResponse>(
        "/auth/imagekit-auth",
      );

      // 2. Siapkan FormData untuk Direct Upload ke ImageKit.io CDN
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", authData.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire.toString());
      formData.append("token", authData.token);
      formData.append("folder", folder);
      formData.append("useUniqueFileName", "true");

      // 3. Upload langsung ke endpoint resmi ImageKit
      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Gagal upload gambar ke ImageKit.");
      }

      const result = await response.json();
      const uploadedUrl = result.url;

      setPreview(uploadedUrl);
      onChange(uploadedUrl);
      toast.success("Foto berhasil diunggah ke ImageKit CDN!");
    } catch (error: any) {
      console.error("ImageKit upload error:", error);
      toast.error(error.message || "Gagal mengunggah foto ke ImageKit.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700">{label}</label>

      {preview ? (
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-purple-200 bg-slate-100 group shadow-xs">
          <img
            src={preview}
            alt="Preview Foto"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if broken
              e.currentTarget.src = "/rooms/room-ac-101.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-md hover:bg-purple-50 transition cursor-pointer flex items-center gap-1.5"
            >
              <ImagePlus className="w-3.5 h-3.5 text-purple-700" />
              Ganti Foto
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition cursor-pointer"
              title="Hapus Foto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-emerald-300 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>ImageKit CDN Ready</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-purple-200 hover:border-purple-600 bg-purple-50/40 hover:bg-purple-50/80 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center group"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-purple-700 py-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-bold">Mengunggah ke ImageKit CDN...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 group-hover:bg-purple-200 text-purple-700 flex items-center justify-center transition shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Klik untuk pilih foto kamar dari komputer
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}
