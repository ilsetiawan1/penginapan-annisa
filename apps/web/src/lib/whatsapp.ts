/**
 * Global WhatsApp URL & Message Generator for Penginapan Annisa
 * Single Source of Truth for all WhatsApp communications across the application.
 */

export const ANNISA_WA_NUMBER = "6281242163116";

/**
 * Generates WhatsApp booking URL for room inquiries & reservations.
 */
export function getRoomBookingWhatsAppUrl(params: {
  roomNumber?: string;
  roomName: string;
  price: string;
  checkInDate?: string;
  nights?: number;
  total?: string;
  dp?: string;
}) {
  const { roomNumber, roomName, price, checkInDate, nights, total, dp } = params;

  let text = `Halo Penginapan Annisa, saya tertarik memesan ${
    roomNumber ? `Kamar #${roomNumber} (${roomName})` : roomName
  } tarif Rp ${price}/malam.`;

  if (checkInDate) {
    text += `\n- Tanggal Check-in: ${checkInDate}`;
  }
  if (nights && nights > 1) {
    text += `\n- Durasi: ${nights} Malam`;
  }
  if (total) {
    text += `\n- Estimasi Total: Rp ${total}`;
  }
  if (dp) {
    text += `\n- DP 50%: Rp ${dp}`;
  }

  text += "\n\nApakah unit tersedia pada jadwal tersebut?";

  return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp URL when asking for room availability on occupied rooms.
 */
export function getRoomAvailabilityInquiryUrl(roomNumber: string, roomName: string) {
  const text = `Halo Penginapan Annisa, saya ingin tanya kapan Kamar #${roomNumber} (${roomName}) bisa dipesan kembali untuk transit?`;
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
 * Generates WhatsApp Digital Receipt URL (used by staff/admin).
 */
export function getDigitalReceiptWhatsAppUrl(guestPhone: string, receiptContent: string) {
  const cleanPhone = guestPhone.startsWith("0") ? `62${guestPhone.slice(1)}` : guestPhone;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(receiptContent)}`;
}
