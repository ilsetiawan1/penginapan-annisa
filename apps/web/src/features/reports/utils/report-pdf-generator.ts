import type { MonthReportData } from "../data/monthly-reports.data";

export function generateReportPdf(report: MonthReportData): boolean {
  const currentDateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const roomRev = report.roomRevenue ?? Math.max(0, report.totalOmzet - report.souvenirOmzet);

  const reportHtml = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Laporan Pendapatan - ${report.label} - Penginapan Annisa</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 14mm 12mm;
        }
        * {
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          margin: 0;
          padding: 24px;
          background: #f8fafc;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .report-sheet {
          max-width: 820px;
          margin: 0 auto;
          background: #ffffff;
          padding: 32px 36px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .brand-name {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .brand-sub {
          font-size: 11px;
          color: #475569;
          margin: 2px 0 0 0;
          font-weight: 500;
        }
        .doc-badge {
          background: #f8fafc;
          color: #475569;
          font-size: 9px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 9999px;
          border: 1px solid #cbd5e1;
          letter-spacing: 0.3px;
        }
        .report-title-container {
          text-align: center;
          margin: 16px 0 22px 0;
        }
        .report-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .report-period {
          font-size: 11.5px;
          font-weight: 600;
          color: #475569;
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
          border-radius: 8px;
          padding: 10px 12px;
        }
        .kpi-label {
          font-size: 9px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          display: block;
        }
        .kpi-val {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          margin-top: 4px;
          font-variant-numeric: tabular-nums;
        }
        .kpi-sub {
          font-size: 10px;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
          display: block;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
          font-size: 11px;
        }
        th {
          background: #f8fafc;
          color: #475569;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 9.5px;
          padding: 8px 10px;
          border-top: 1px solid #e2e8f0;
          border-bottom: 2px solid #cbd5e1;
          text-align: left;
          letter-spacing: 0.3px;
        }
        td {
          padding: 8px 10px;
          border-bottom: 1px solid #e2e8f0;
          color: #1e293b;
          font-size: 10.5px;
        }
        tbody tr:nth-child(even) {
          background: #f8fafc;
        }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .badge-lunas {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
          display: inline-block;
        }
        .badge-dp {
          background: #fffbeb;
          color: #92400e;
          border: 1px solid #fde68a;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
          display: inline-block;
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
          background: #0f172a;
          border-bottom: 1px solid #1e293b;
          color: #f8fafc;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          z-index: 9999;
        }
        .btn-print {
          background: #ffffff;
          color: #0f172a;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s;
        }
        .btn-print:hover {
          background: #f1f5f9;
        }
        .btn-close {
          background: #1e293b;
          color: #cbd5e1;
          border: 1px solid #334155;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          margin-left: 8px;
          transition: all 0.15s;
        }
        .btn-close:hover {
          background: #334155;
          color: #ffffff;
        }

        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #ffffff;
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
          <span style="font-size: 15px;">📄</span>
          <span style="font-size: 13px; font-weight: 600;">Pratinjau Dokumen Cetak / Simpan PDF</span>
          <span style="background: #1e293b; color: #94a3b8; font-size: 11px; padding: 2px 8px; border-radius: 6px; border: 1px solid #334155;">${report.label}</span>
        </div>
        <div>
          <button type="button" onclick="window.print()" class="btn-print">
            Cetak / Simpan ke PDF
          </button>
          <button type="button" onclick="window.close()" class="btn-close">
            Tutup Tab
          </button>
        </div>
      </div>

      <div class="report-sheet">
        <div class="header-bar">
          <div>
            <h1 class="brand-name">PENGINAPAN ANNISA AMBON</h1>
            <p class="brand-sub">Penginapan Transit 2-3 Menit dari Bandara Pattimura Ambon</p>
            <p class="brand-sub">Jl. Bandara Pattimura, Tawiri, Ambon • Telp / WA: 0812-4040-5050</p>
          </div>
          <div style="text-align: right;">
            <span class="doc-badge">DOKUMEN RESMI PMS</span>
            <p style="font-size: 9.5px; color: #64748b; margin: 6px 0 0 0;">Dicetak: ${currentDateStr}</p>
          </div>
        </div>

        <div class="report-title-container">
          <h2 class="report-title">LAPORAN PENDAPATAN &amp; REKAPITULASI OPERASIONAL</h2>
          <p class="report-period">Periode: ${report.label}</p>
        </div>

        <div class="kpi-grid">
          <div class="kpi-box">
            <span class="kpi-label">Total Pendapatan</span>
            <div class="kpi-val">Rp ${report.totalOmzet.toLocaleString("id-ID")}</div>
            <span class="kpi-sub">Kamar &amp; Oleh-Oleh</span>
          </div>
          <div class="kpi-box">
            <span class="kpi-label">Pendapatan Kamar</span>
            <div class="kpi-val">Rp ${roomRev.toLocaleString("id-ID")}</div>
            <span class="kpi-sub">${report.totalGuests} Tamu Menginap</span>
          </div>
          <div class="kpi-box">
            <span class="kpi-label">Penjualan Oleh-Oleh</span>
            <div class="kpi-val">Rp ${report.souvenirOmzet.toLocaleString("id-ID")}</div>
            <span class="kpi-sub">${report.souvenirItems} Produk Terjual</span>
          </div>
          <div class="kpi-box">
            <span class="kpi-label">Okupansi Kamar</span>
            <div class="kpi-val">${report.occupancyRate}%</div>
            <span class="kpi-sub">Kapasitas 8 Kamar</span>
          </div>
        </div>

        <h3 style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 8px; letter-spacing: 0.3px;">
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
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${report.transactions
              .map(
                (t) => `
              <tr>
                <td style="font-weight: 600; font-family: monospace;">${t.id}</td>
                <td>${t.date}</td>
                <td style="font-weight: 600;">${t.room}</td>
                <td style="font-weight: 600;">${t.guest}</td>
                <td>${t.nights} Malam</td>
                <td class="text-right" style="font-weight: 700; font-variant-numeric: tabular-nums;">Rp ${t.amount.toLocaleString("id-ID")}</td>
                <td class="text-center">
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
            <p style="font-size: 11px; font-weight: 700; margin: 0; color: #0f172a;">Resepsionis PMS</p>
          </div>
          <div class="sig-box">
            <p style="font-size: 10px; margin: 0; color: #64748b;">Mengetahui,</p>
            <div class="sig-line"></div>
            <p style="font-size: 11px; font-weight: 700; margin: 0; color: #0f172a;">Ibu Annisa (Owner)</p>
          </div>
        </div>
      </div>

      <script>
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

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 60000);

    return true;
  } catch (err) {
    console.error("Gagal membuka jendela cetak PDF:", err);
    return false;
  }
}
