"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, ImagePlus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";

export interface R2PresignedResponse {
  presignedUrl: string;
  publicUrl: string;
}

export async function uploadBase64ToR2(
  base64Url: string,
  fileName: string,
  folder: string
): Promise<string> {
  // Convert base64 to Blob
  const res = await fetch(base64Url);
  const blob = await res.blob();
  
  // Clean folder path (remove leading slash if any)
  const cleanFolder = folder.startsWith("/") ? folder.slice(1) : folder;
  const objectKey = cleanFolder ? `${cleanFolder}/${fileName}` : fileName;

  const { presignedUrl, publicUrl } = await apiClient.post<R2PresignedResponse>(
    "/auth/r2-presigned-url",
    {
      fileName: objectKey,
      contentType: blob.type || "image/jpeg",
    }
  );

  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": blob.type || "image/jpeg",
    },
  });

  if (!uploadRes.ok) {
    throw new Error("Gagal mengunggah foto ke Cloudflare R2.");
  }

  return publicUrl;
}

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  description?: string;
  autoUpload?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder = "/rooms",
  label = "Upload Foto Kamar",
  description = "Format JPG, PNG, atau WebP (Maks. 5MB)",
  autoUpload = true,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview when value prop changes
  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      return;
    }

    // 1. Baca file langsung menjadi Data URL base64 yang 100% aman & persisten di browser
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async (event) => {
      const base64DataUrl = event.target?.result as string;
      if (!base64DataUrl) return;

      // Update preview langsung agar user melihat perubahan
      setPreview(base64DataUrl);
      onChange(base64DataUrl);

      if (!autoUpload) {
        // Jika autoUpload false, berhenti di sini (parent akan handle uploadnya)
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      try {
        setIsUploading(true);

        const url = await uploadBase64ToR2(base64DataUrl, file.name, folder);
        
        // 5. Update form state dengan URL CDN yang sebenarnya
        onChange(url);
        setPreview(url); // Use the CDN url for preview to ensure it matches

        toast.success("Foto berhasil diunggah ke Cloudflare R2!");
      } catch (error: any) {
        console.error("Image upload error:", error);
        toast.error(error.message || "Gagal mengunggah foto.");
        // Fallback: hapus preview jika gagal upload agar tidak disubmit
        setPreview(undefined);
        onChange("");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
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
            <span>Foto Aktif</span>
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
              <span className="text-xs font-bold">Mengunggah foto...</span>
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
