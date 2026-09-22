export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Akses ditolak. Token tidak valid atau sesi telah berakhir.",
  FORBIDDEN: "Akses terlarang. Anda tidak memiliki izin untuk fitur ini.",
  NOT_FOUND: "Data tidak ditemukan.",
  INVALID_INPUT: "Data yang dikirimkan tidak valid.",
  INTERNAL_SERVER: "Terjadi kesalahan internal pada server.",
} as const;

export const OFFICIAL_ROOM_NUMBERS = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
] as const;
