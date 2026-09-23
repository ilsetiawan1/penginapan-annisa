import { describe, expect, it } from "bun:test";
import { SouvenirService } from "../souvenir.service";

describe("🛍️ Souvenir Module Service Tests", () => {
  const souvenirService = new SouvenirService();

  it("should fetch all seeded souvenirs with category relation", async () => {
    const items = await souvenirService.getAllSouvenirs();

    expect(items).toBeDefined();
    expect(items.length).toBeGreaterThanOrEqual(6);

    const mkp = items.find((i) => i.name.includes("Minyak Kayu Putih"));
    expect(mkp).toBeDefined();
    expect(mkp?.category).toBeDefined();
  });

  it("should filter souvenirs by category slug", async () => {
    const items = await souvenirService.getAllSouvenirs({
      categorySlug: "kue-makanan-khas",
    });

    expect(items.length).toBeGreaterThanOrEqual(1);
    for (const item of items) {
      expect(item.category.slug).toBe("kue-makanan-khas");
    }
  });

  it("should successfully process POS checkout and decrement stock", async () => {
    const items = await souvenirService.getAllSouvenirs();
    const product = items[0];
    const initialStock = product.stock;

    const receipt = await souvenirService.processPosCheckout({
      items: [
        {
          souvenirId: product.id,
          quantity: 2,
        },
      ],
      paymentMethod: "cash",
      cashReceived: product.price * 2 + 10000,
    });

    expect(receipt.receiptNumber).toContain("POS-");
    expect(receipt.grandTotal).toBe(product.price * 2);
    expect(receipt.change).toBe(10000);

    // Verify stock is decremented
    const productAfter = await souvenirService.getSouvenirById(product.id);
    expect(productAfter.stock).toBe(initialStock - 2);
  });

  it("should reject POS checkout when cash received is less than total", async () => {
    const items = await souvenirService.getAllSouvenirs();
    const product = items[0];

    expect(
      souvenirService.processPosCheckout({
        items: [
          {
            souvenirId: product.id,
            quantity: 1,
          },
        ],
        paymentMethod: "cash",
        cashReceived: 1000, // Less than price
      }),
    ).rejects.toThrow("Uang tunai tidak cukup");
  });
});
