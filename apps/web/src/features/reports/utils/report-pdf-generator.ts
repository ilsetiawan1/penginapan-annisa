import type { MonthReportData } from "../data/monthly-reports.data";

export function generateReportPdf(report: MonthReportData): boolean {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    return false;
  }

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
      <title>Laporan Keuangan & Okupansi - ${report.label} - Penginapan Annisa</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 15mm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
          margin: 0;
          padding: 20px;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
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
          border-radius: 12px;
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
      </style>
    </head>
    <body>
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

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(reportHtml);
  printWindow.document.close();
  return true;
}
