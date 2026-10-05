import { prisma } from "@annisa/db";

const DEFAULT_SETTINGS: Record<string, string> = {
  whatsapp_number: "6281242163116",
  lodging_name: "Penginapan Annisa",
  airport_distance: "750 meter atau 2–3 menit dari Bandara Pattimura",
  checkin_time: "14:00 WIT",
  checkout_time: "12:00 WIT",
  min_dp_percent: "50%",
};

export class SettingRepository {
  async getAll(): Promise<Record<string, string>> {
    const settings = await prisma.systemSetting.findMany();

    if (settings.length === 0) {
      // Auto-populate default values jika tabel kosong
      await prisma.$transaction(
        Object.entries(DEFAULT_SETTINGS).map(([key, value]) =>
          prisma.systemSetting.upsert({
            where: { key },
            update: {},
            create: { key, value },
          }),
        ),
      );
      return { ...DEFAULT_SETTINGS };
    }

    const dict: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const s of settings) {
      dict[s.key] = s.value;
    }
    return dict;
  }

  async batchUpdate(data: Record<string, string>): Promise<Record<string, string>> {
    const entries = Object.entries(data);

    await prisma.$transaction(
      entries.map(([key, value]) =>
        prisma.systemSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        }),
      ),
    );

    return this.getAll();
  }
}

export const settingRepository = new SettingRepository();
