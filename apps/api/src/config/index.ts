import path from "node:path";
import dotenv from "dotenv";

// Load root .env or local .env
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
dotenv.config();

export const config = {
  port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET || "annisa_jwt_default_secret_key_2026",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  whatsapp: {
    officialNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281242163116",
  },
  bank: {
    name: process.env.NEXT_PUBLIC_BANK_NAME || "BCA / BRI / Mandiri",
    account: process.env.NEXT_PUBLIC_BANK_ACCOUNT || "1234567890",
    holder: process.env.NEXT_PUBLIC_BANK_HOLDER || "Penginapan Annisa",
  },
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "public_sample_annisa",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "private_sample_annisa",
    urlEndpoint:
      process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/penginapanannisa",
  },
};
