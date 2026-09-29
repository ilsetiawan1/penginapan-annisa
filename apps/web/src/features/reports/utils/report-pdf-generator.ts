import type { MonthReportData } from "../data/monthly-reports.data";

export function generateReportPdf(report: MonthReportData): boolean {
  const currentDateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const reportHtml = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Laporan Keuangan &amp; Okupansi - ${report.label} - Penginapan Annisa</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 15mm;
        }
        * {
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #1e293b;
          margin: 0;
          padding: 24px;
          background: #f8fafc;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .report-sheet {
          max-width: 820px;
          margin: 0 auto;
          background: #fff;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
        }
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2.5px solid #7c3aed;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .brand-name {
          font-size: 22px;
          font-weight: 900;
          color: #1e1b4b;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .brand-sub {
          font-size: 11px;
          color: #64748b;
          margin: 3px 0 0 0;
          font-weight: 600;
        }
        .report-title-container {
          text-align: center;
          margin: 16px 0 20px 0;
        }
        .report-title {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .report-period {
          font-size: 12px;
          font-weight: 800;
          color: #7c3aed;
          margin: 4px 0 0 0;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .kpi-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px;
        }
        .kpi-label {
          font-size: 9px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          display: block;
        }
        .kpi-val {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          margin-top: 4px;
        }
        .kpi-purple { color: #7c3aed; }
        .kpi-amber { color: #b45309; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
          font-size: 11px;
        }
        th {
          background: #f1f5f9;
          color: #475569;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 9.5px;
          padding: 8px 10px;
          border-bottom: 2px solid #cbd5e1;
          text-align: left;
        }
        td {
          padding: 8px 10px;
          border-bottom: 1px solid #e2e8f0;
          color: #334155;
        }
        .text-right { text-align: right; }
        .badge-lunas {
          background: #dcfce7;
          color: #166534;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 9999px;
        }
        .badge-dp {
          background: #fef3c7;
          color: #92400e;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 9999px;
        }
        .signature-section {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          padding-top: 20px;
        }
        .sig-box {
          text-align: center;
          width: 180px;
        }
        .sig-line {
          border-bottom: 1px solid #94a3b8;
          margin-top: 50px;
          margin-bottom: 4px;
        }

        /* Top Action Bar (Hanya tampil di browser, otomatis hilang saat dicetak/disimpan ke PDF) */
        .top-action-bar {
          position: sticky;
          top: 0;
          margin: -24px -24px 20px -24px;
          background: #1e1b4b;
          color: #ffffff;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          z-index: 9999;
        }
        .btn-print {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
        }
        .btn-print:hover {
          background: #6d28d9;
        }
        .btn-close {
          background: rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          margin-left: 8px;
          transition: background 0.2s;
        }
        .btn-close:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #fff;
            padding: 0;
          }
          .report-sheet {
            max-width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            border: none;
          }
        }
      </style>
    </head>
    <body>
      <!-- Navigasi Aksi Atas (Hilang Otomatis Saat Print / Save PDF) -->
      <div class="top-action-bar no-print">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 16px;">📄</span>
          <span style="font-size: 13px; font-weight: 700;">Pratinjau Dokumen Cetak / Simpan PDF</span>
          <span style="background: rgba(255,255,255,0.15); font-size: 11px; padding: 2px 8px; border-radius: 6px; margin-left: 4px;">${report.label}</span>
        </div>
        <div>
          <button type="button" onclick="window.print()" class="btn-print">
            🖨️ Cetak / Simpan ke PDF
          </button>
          <button type="button" onclick="window.close()" class="btn-close">
            ✕ Tutup Tab
          </button>
        </div>
      </div>

      <div class="report-sheet">
        <div class="header-bar">
          <div>
            <h1 class="brand-name">PENGINAPAN ANNISA AMBON</h1>
            <p class="brand-sub">Penginapan Transit 750m dari Bandara Pattimura Ambon</p>
            <p class="brand-sub">Jl. Bandara Pattimura, Tawiri, Ambon • Telp / WA: 0812-4040-5050</p>
          </div>
          <div style="text-align: right;">
            <span style="background: #f3e8ff; color: #6b21a8; font-size: 9.5px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; border: 1px solid #d8b4fe;">DOKUMEN RESMI PMS</span>
            <p style="font-size: 9.5px; color: #94a3b8; margin: 6px 0 0 0;">Dicetak: ${currentDateStr}</p>
          </div>
        </div>

        <div class="report-title-container">
          <h2 class="report-title">LAPORAN KEUANGAN &amp; REKAPITULASI RESERVASI</h2>
          <p class="report-period">Periode: ${report.label}</p>
        </div>

        <div class="kpi-grid">
          <div class="kpi-box">
            <span class="kpi-label">Total Omzet</span>
            <div class="kpi-val kpi-purple">Rp ${report.totalOmzet.toLocaleString("id-ID")}</div>
          </div>
          <div class="kpi-box">
            <span class="kpi-label">Okupansi Kamar</span>
            <div class="kpi-val">${report.occupancyRate}%</div>
          </div>
          <div class="kpi-box">
            <span class="kpi-label">Total Tamu Menginap</span>
            <div class="kpi-val">${report.totalGuests} Tamu</div>
          </div>
          <div class="kpi-box">
            <span class="kpi-label">Penjualan Oleh-Oleh</span>
            <div class="kpi-val kpi-amber">Rp ${report.souvenirOmzet.toLocaleString("id-ID")}</div>
          </div>
        </div>

        <h3 style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #0f172a; margin-bottom: 6px;">
          Rincian Transaksi Reservasi Kamar
        </h3>

        <table>
          <thead>
            <tr>
              <th>No. Transaksi</th>
              <th>Tanggal</th>
              <th>Unit Kamar</th>
              <th>Nama Tamu</th>
              <th>Durasi</th>
              <th class="text-right">Total Nilai</th>
              <th style="text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${report.transactions
              .map(
                (t) => `
              <tr>
                <td style="font-weight: 700;">${t.id}</td>
                <td>${t.date}</td>
                <td style="color: #6b21a8; font-weight: 700;">${t.room}</td>
                <td style="font-weight: 700;">${t.guest}</td>
                <td>${t.nights} Malam</td>
                <td class="text-right" style="font-weight: 800;">Rp ${t.amount.toLocaleString("id-ID")}</td>
                <td style="text-align: center;">
                  <span class="${t.status === "Lunas" ? "badge-lunas" : "badge-dp"}">${t.status}</span>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>

        <div class="signature-section">
          <div class="sig-box">
            <p style="font-size: 10px; margin: 0; color: #64748b;">Disiapkan oleh,</p>
            <div class="sig-line"></div>
            <p style="font-size: 11px; font-weight: 800; margin: 0; color: #0f172a;">Resepsionis PMS</p>
          </div>
          <div class="sig-box">
            <p style="font-size: 10px; margin: 0; color: #64748b;">Mengetahui,</p>
            <div class="sig-line"></div>
            <p style="font-size: 11px; font-weight: 800; margin: 0; color: #0f172a;">Ibu Annisa (Owner)</p>
          </div>
        </div>
      </div>

      <script>
        // Memicu dialog cetak / Simpan sebagai PDF secara otomatis
        function triggerAutoPrint() {
          setTimeout(function() {
            window.focus();
            window.print();
          }, 350);
        }

        if (document.readyState === "complete" || document.readyState === "interactive") {
          triggerAutoPrint();
        } else {
          window.addEventListener("DOMContentLoaded", triggerAutoPrint);
        }
      </script>
    </body>
    </html>
  `;

  try {
    const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl, "_blank");

    if (!printWindow) {
      return false;
    }

    // Bersihkan Blob URL setelah jendela selesai memuat
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 60000);

    return true;
  } catch (err) {
    console.error("Gagal membuka jendela cetak PDF:", err);
    return false;
  }
}

