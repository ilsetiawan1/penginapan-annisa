import crypto from "node:crypto";
import { config } from "../config";

export interface ImageKitAuthParams {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  urlEndpoint: string;
}

/**
 * Generate client-side authentication parameters for ImageKit Direct Upload
 */
export function getImageKitAuthParams(): ImageKitAuthParams {
  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 60 * 30; // 30 minutes validity
  const privateKey = config.imagekit.privateKey;

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return {
    token,
    expire,
    signature,
    publicKey: config.imagekit.publicKey,
    urlEndpoint: config.imagekit.urlEndpoint,
  };
}
