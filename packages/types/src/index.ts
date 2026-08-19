// ==========================================
// 1. PENGGUNA & AUTH (USERS & SESSIONS)
// ==========================================
export type UserRole = "admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}

// ==========================================
// 2. KAMAR & FASILITAS (ROOMS & INVENTORY)
// ==========================================
export type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance";

export interface RoomType {
  id: string;
  name: string; // "Kamar AC" | "Kamar Kipas"
  slug: string; // "kamar-ac" | "kamar-kipas"
  description?: string | null;
  basePrice: number; // 275000 | 200000
  capacity: number; // 2-3 orang
  bedType: string;
  facilities: string[]; // ["Kamar Mandi Dalam", "WiFi Gratis", "TV", "Handuk", ...]
  images?: RoomImage[];
  rooms?: Room[];
  createdAt: Date;
}

export interface Room {
  id: string;
  roomTypeId: string;
  roomNumber: string; // "101", "102", "103", "104", "201", "202", "203", "204"
  floor: number;
  status: RoomStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  roomType?: RoomType;
}

export interface RoomImage {
  id: string;
  roomTypeId: string;
  imageUrl: string;
  caption?: string | null;
  isPrimary: boolean;
  createdAt: Date;
}

// ==========================================
// 3. TAMU & RESERVASI (PMS & BOOKINGS)
// ==========================================
export type ReservationStatus =
  | "pending_dp"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled";

export type PaymentStatus = "unpaid" | "dp_paid" | "paid";
export type PaymentMethod = "cash" | "transfer" | "qris";

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  idCardNumber?: string | null;
  address?: string | null;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  code: string; // "ANNISA-202608-001"
  roomId: string;
  guestId: string;
  userId?: string | null;
  checkInDate: Date | string;
  checkOutDate: Date | string;
  totalNights: number;
  roomRatePerNight: number;
  grandTotal: number;
  dpAmount: number; // DP 50%
  remainingAmount: number; // Sisa 50%
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  room?: Room;
  guest?: Guest;
  user?: User | null;
}

// DTOs & Inputs
export interface CreateOnlineBookingInput {
  roomTypeId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  notes?: string;
}

export interface CreateWalkInBookingInput {
  roomId: string;
  guestName: string;
  guestPhone: string;
  idCardNumber?: string;
  totalNights: number;
  paymentMethod: PaymentMethod;
  dpAmount?: number;
  isFullPayment?: boolean;
  notes?: string;
}

export interface ConfirmDpInput {
  dpAmount: number;
  paymentMethod?: PaymentMethod;
  notes?: string;
}

// ==========================================
// 4. ETALASE OLEH-OLEH (SOUVENIR SHOWCASE)
// ==========================================
export interface SouvenirCategory {
  id: string;
  name: string;
  slug: string;
  items?: Souvenir[];
}

export interface Souvenir {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  isAvailable: boolean;
  createdAt: Date;
  category?: SouvenirCategory;
}

// ==========================================
// 5. CMS ARTIKEL WISATA (TRAVEL GUIDE CMS)
// ==========================================
export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  articles?: Article[];
}

export interface Article {
  id: string;
  categoryId: string;
  authorId: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  category?: ArticleCategory;
  author?: User;
}

// ==========================================
// 6. DASHBOARD & METRIK
// ==========================================
export interface OccupancyStats {
  totalRooms: number;
  readyRooms: number;
  occupiedRooms: number;
  dirtyRooms: number;
  maintenanceRooms: number;
  occupancyRate: number; // percentage
  todayCheckIns: number;
  todayCheckOuts: number;
}
