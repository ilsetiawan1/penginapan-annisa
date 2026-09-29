import { notFound } from "next/navigation";

// Mengembalikan 404 Not Found untuk mematahkan bot scanner otomatis
export default function AdminLoginNotFound() {
  notFound();
}
