/**
 * Global WhatsApp URL & Message Generator for Penginapan Annisa
 * Single Source of Truth for all WhatsApp communications across the application.
 */

export const ANNISA_WA_NUMBER = "6281242163116";

/**
 * Helper to normalize room title without repeating room codes.
 * E.g., if roomName is already "Kamar #A1 (AC)", returns "Kamar #A1 (AC)".
 * If roomNumber is "A1" and roomName is "Kamar AC", returns "Kamar #A1 (AC)".
 */
export function formatRoomTitle(roomName: string, roomNumber?: string): string {
  if (!roomNumber) return roomName;
  if (roomName.includes(`#${roomNumber}`) || roomName.includes(roomNumber)) {
    return roomName;
  }
  return `Kamar #${roomNumber} (${roomName})`;
}

/**
 * Generates WhatsApp booking URL for room inquiries & reservations.
 */
export function getRoomBookingWhatsAppUrl(params: {
  roomNumber?: string;
  roomName: string;
  price: string;
  checkInDate?: string;
  checkOutDate?: string;
  nights?: number;
  total?: string;
  dp?: string;
  guestName?: string;
  guestPhone?: string;
}) {
  const {
    roomNumber,
    roomName,
    price,
    checkInDate,
    checkOutDate,
    nights,
    total,
    dp,
    guestName,
    guestPhone,
  } = params;
  const cleanRoomName = formatRoomTitle(roomName, roomNumber);

  // Jika menyertakan identitas tamu menginap
  if (guestName || guestPhone) {
    let text = "Halo Penginapan Annisa, saya ingin reservasi kamar:";
    if (guestName) text += `\n• Tamu Menginap: *${guestName.trim()}*`;
    if (guestPhone) text += `\n• No. WhatsApp Tamu: *${guestPhone.trim()}*`;
    text += `\n• Unit: *${cleanRoomName}*`;
    if (checkInDate) text += `\n• Check-In: *${checkInDate}* (mulai 14:00 WIT)`;
    if (checkOutDate) text += `\n• Check-Out: *${checkOutDate}* (maks 12:00 WIT)`;
    if (nights) text += `\n• Durasi: *${nights} Malam*`;
    if (total) text += `\n• Estimasi Total: *Rp ${total}*`;
    if (dp) text += `\n• DP 50%: *Rp ${dp}*`;
    text += "\n\nApakah unit tersedia pada jadwal tersebut? Terima kasih.";
    return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  // Jika dari preview beranda tanpa tanggal spesifik
  if (!checkInDate) {
    const text = `Halo Penginapan Annisa, saya tertarik untuk memesan *${cleanRoomName}* (Rp ${price}/malam).\n\nApakah unit kamar ini tersedia untuk jadwal transit dalam waktu dekat? Terima kasih.`;
    return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  // Jika dari pencarian dengan tanggal reservasi
  let text = `Halo Penginapan Annisa, saya ingin reservasi kamar:\n• Unit: *${cleanRoomName}*\n• Tarif: Rp ${price}/malam\n• Tgl Check-In: *${checkInDate}*`;

  if (nights && nights > 1) {
    text += `\n• Durasi: *${nights} Malam*`;
  }
  if (total) {
    text += `\n• Estimasi Total: *Rp ${total}*`;
  }
  if (dp) {
    text += `\n• DP 50%: *Rp ${dp}*`;
  }

  text += "\n\nApakah unit tersedia pada jadwal tersebut? Terima kasih.";

  return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp URL when asking for room availability on occupied rooms.
 */
export function getRoomAvailabilityInquiryUrl(
  paramsOrRoomNumber:
    | { roomName: string; roomNumber?: string; dateStr?: string; nights?: number }
    | string,
  legacyRoomName?: string,
) {
  if (typeof paramsOrRoomNumber === "string") {
    const cleanRoomName = formatRoomTitle(legacyRoomName || "", paramsOrRoomNumber);
    const text = `Halo Penginapan Annisa, saya ingin menanyakan ketersediaan *${cleanRoomName}*.\n\nApakah ada jadwal kosong di tanggal terdekat, atau rekomendasi kamar transit lainnya? Terima kasih.`;
    return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  const { roomName, roomNumber, dateStr, nights } = paramsOrRoomNumber;
  const cleanRoomName = formatRoomTitle(roomName, roomNumber);

  const dateContext =
    dateStr && dateStr !== "Hari Ini" ? `untuk tanggal *${dateStr}*` : "untuk hari ini";

  const nightsContext = nights && nights > 1 ? ` (${nights} malam)` : "";

  const text = `Halo Penginapan Annisa, saya ingin menanyakan ketersediaan *${cleanRoomName}*.\n\nSaya melihat unit ini sedang terisi ${dateContext}${nightsContext}. Apakah ada jadwal kosong di tanggal terdekat, atau rekomendasi kamar transit lainnya? Terima kasih.`;

  return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp order URL for authentic Maluku souvenirs.
 */
export function getSouvenirOrderWhatsAppUrl(itemName: string, price: string, origin?: string) {
  let text = `Halo Penginapan Annisa, saya tertarik membeli oleh-oleh: ${itemName} (${price}).`;
  if (origin) {
    text += ` [Asal: ${origin}]`;
  }
  text += "\n\nApakah stok saat ini tersedia di meja resepsionis?";

  return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates general contact / customer service WhatsApp URL.
 */
export function getGeneralContactWhatsAppUrl(message?: string) {
  const text =
    message ||
    "Halo Penginapan Annisa, saya ingin bertanya seputar layanan transit, antar-jemput, dan kamar dekat Bandara Pattimura.";
  return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates structured inquiry WhatsApp URL from the contact page form.
 */
export function getContactFormWhatsAppUrl(params: {
  name?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  roomType?: string;
  message?: string;
}) {
  const { name, arrivalDate, arrivalTime, roomType, message } = params;
  const guestName = name?.trim() || "Tamu";
  const guestDate = arrivalDate?.trim();
  const guestArrival = arrivalTime?.trim();
  const guestRoomType = roomType && roomType !== "Belum tahu" ? roomType : "";
  const guestMessage = message?.trim() || "Saya ingin menanyakan informasi kamar dan transit.";

  let text = `Halo Resepsionis Penginapan Annisa, saya ${guestName}.\n`;
  if (guestDate) {
    text += `• Tanggal Tiba: ${guestDate}\n`;
  }
  if (guestArrival) {
    text += `• Waktu Tiba: ${guestArrival}\n`;
  }
  if (guestRoomType) {
    text += `• Pilihan Tipe Kamar: ${guestRoomType}\n`;
  }
  text += `• Pesan: ${guestMessage}`;

  return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp Digital Receipt URL (used by staff/admin).
 */
export function getDigitalReceiptWhatsAppUrl(guestPhone: string, receiptContent: string) {
  const digits = guestPhone.replace(/\D/g, "");
  const cleanPhone = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits.startsWith("62")
      ? digits
      : `62${digits}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(receiptContent)}`;
}

/**
 * Normalizes phone number into international Indonesian WhatsApp link (e.g. https://wa.me/6281234567890)
 */
export function getDirectWhatsAppUrl(rawPhone: string, message?: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) return "#";
  let standardized = digits;
  if (standardized.startsWith("0")) {
    standardized = `62${standardized.slice(1)}`;
  } else if (!standardized.startsWith("62")) {
    standardized = `62${standardized}`;
  }
  const textQuery = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${standardized}${textQuery}`;
}

/**
 * Format phone input value by inserting spaces every 4 digits (e.g. 0812 3456 7890)
 */
export function formatPhoneWithSpaces(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 15);
  const chunks = digits.match(/.{1,4}/g);
  return chunks ? chunks.join(" ") : "";
}
