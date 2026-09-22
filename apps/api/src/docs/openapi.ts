import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

// Register Security Scheme (Bearer JWT)
registry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Masukkan JWT Token hasil login PMS",
});

export function generateOpenApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Penginapan Annisa PMS & Public Reservation API",
      version: "1.0.0",
      description:
        "REST API resmi untuk Sistem Informasi Manajemen Kamar, Reservasi WhatsApp / Walk-in, Kasir POS Oleh-Oleh, dan CMS Pariwisata Penginapan Annisa (750m dari Bandara Pattimura Ambon).",
      contact: {
        name: "Penginapan Annisa Tech Team",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development Local Server (Port 4000)",
      },
      {
        url: "/api/v1",
        description: "API v1 Base URL",
      },
    ],
  });
}
