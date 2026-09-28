import { execSync } from "node:child_process";

const ports = [3000, 4000];

for (const port of ports) {
  try {
    if (process.platform === "win32") {
      const stdout = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      const lines = stdout.trim().split("\n");
      const pids = new Set<string>();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(Number(pid)) && Number(pid) > 0) {
          pids.add(pid);
        }
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          console.log(`[clean-ports] Menutup proses PID ${pid} pada port ${port}`);
        } catch {
          // Abaikan jika proses sudah ditutup
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
    }
  } catch {
    // Port sedang tidak digunakan, abaikan secara hening
  }
}
