import { Request, Response, NextFunction } from "express";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "../../utils/r2.util";
import { config } from "../../config";

export const storageController = {
  getFile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = req.query.key as string;
      if (!key) {
        return res.status(400).json({ success: false, message: "File key is required." });
      }

      const command = new GetObjectCommand({
        Bucket: config.r2.bucketName,
        Key: key,
      });

      const data = await s3Client.send(command);

      // Set proper headers
      if (data.ContentType) res.setHeader("Content-Type", data.ContentType);
      if (data.ContentLength) res.setHeader("Content-Length", data.ContentLength);
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

      // Stream the response directly to the client
      if (data.Body) {
        // AWS SDK v3 streams are Web Streams in browser, but Node.js readable streams in Node
        // We can safely cast and pipe in Express
        (data.Body as NodeJS.ReadableStream).pipe(res);
      } else {
        res.status(404).json({ success: false, message: "File not found." });
      }
    } catch (error: any) {
      if (error.name === "NoSuchKey") {
        return res.status(404).json({ success: false, message: "File not found in R2." });
      }
      console.error("Error fetching file from R2:", error);
      res.status(500).json({ success: false, message: "Internal server error fetching file." });
    }
  },

  listFiles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prefix = (req.query.prefix as string) || "rooms";
      const cleanPrefix = prefix.startsWith("/") ? prefix.slice(1) : prefix;

      const command = new ListObjectsV2Command({
        Bucket: config.r2.bucketName,
        Prefix: cleanPrefix,
      });

      const data = await s3Client.send(command);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

      const files = (data.Contents || [])
        .filter((item) => item.Key && !item.Key.endsWith("/"))
        .map((item) => ({
          key: item.Key!,
          name: item.Key!.split("/").pop() || item.Key!,
          url: `${baseUrl}/storage/view?key=${encodeURIComponent(item.Key!)}`,
          size: item.Size,
          lastModified: item.LastModified,
        }))
        .sort((a, b) => {
          const timeA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
          const timeB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
          return timeB - timeA;
        });

      return res.status(200).json({
        success: true,
        data: files,
        message: "Daftar file R2 berhasil diambil.",
      });
    } catch (error: any) {
      console.error("Error listing files from R2:", error);
      res.status(500).json({ success: false, message: "Gagal mengambil daftar file dari R2." });
    }
  },
};

