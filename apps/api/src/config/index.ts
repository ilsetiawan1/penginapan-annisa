import path from "node:path";
import dotenv from "dotenv";

// Load root .env or local .env
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";

// Keamanan: Wajibkan JWT_SECRET di environment production
if (nodeEnv === "production" && !process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable wajib diatur pada production!");
}

export const config = {
  port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4000,
  nodeEnv,
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (nodeEnv === "development" ? "annisa_dev_only_secret_key_change_in_production" : ""),
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  whatsapp: {
    officialNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281200000000",
  },
  bank: {
    name: process.env.NEXT_PUBLIC_BANK_NAME || "Bank BCA",
    account: process.env.NEXT_PUBLIC_BANK_ACCOUNT || "0000000000",
    holder: process.env.NEXT_PUBLIC_BANK_HOLDER || "Penginapan Annisa",
  },
  r2: {
    endpoint: process.env.R2_ENDPOINT || "https://auto.r2.cloudflarestorage.com",
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    bucketName: process.env.R2_BUCKET_NAME || "penginapan-annisa",
    publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-xxxx.r2.dev",
  },
};
