"use client";

import { SOUVENIRS_QUERY_KEY, useUpdateSouvenir } from "@/features/souvenirs/hooks/use-souvenirs";
import type { PosCheckoutInput, Souvenir } from "@annisa/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { posApi } from "../api/pos.api";

export type PaymentMethod = PosCheckoutInput["paymentMethod"];

export interface CartLine {
  product: Souvenir;
  quantity: number;
}

export interface SaleRecord {
  receiptNumber: string;
  itemCount: number;
  total: number;
  time: string;
  paymentMethod: PaymentMethod;
}

export function usePosRegister() {
  const queryClient = useQueryClient();
  const restockMutation = useUpdateSouvenir();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [...SOUVENIRS_QUERY_KEY, "pos"],
    queryFn: posApi.getProducts,
    staleTime: 60_000,
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [sales, setSales] = useState<SaleRecord[]>([]);

  const products = useMemo(
    () => (data ?? []).filter((p) => !p.deletedAt && p.isAvailable !== false),
    [data],
  );

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) {
      if (p.category?.id && p.category?.name) {
        map.set(p.category.id, p.category.name);
      }
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [products]);

  const keyword = search.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesKeyword =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        (p.category?.name ?? "").toLowerCase().includes(keyword);

      const matchesCategory =
        selectedCategory === "all" ||
        p.categoryId === selectedCategory ||
        p.category?.id === selectedCategory;

      return matchesKeyword && matchesCategory;
    });
  }, [products, keyword, selectedCategory]);

  const cartLines: CartLine[] = products
    .filter((p) => cart[p.id])
    .map((p) => ({ product: p, quantity: cart[p.id] }));
  const totalAmount = cartLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const totalItems = cartLines.reduce((sum, l) => sum + l.quantity, 0);
  const shiftTotal = sales.reduce((sum, s) => sum + s.total, 0);

  const setQuantity = (product: Souvenir, quantity: number) => {
    const qty = Math.min(Math.max(quantity, 0), product.stock);
    setCart((prev) => {
      const next = { ...prev };
      if (qty === 0) delete next[product.id];
      else next[product.id] = qty;
      return next;
    });
  };

  const addToCart = (product: Souvenir) => {
    const current = cart[product.id] ?? 0;
    if (current >= product.stock) {
      toast.error(`Stok ${product.name} tidak cukup.`);
      return;
    }
    setQuantity(product, current + 1);
  };

  const checkoutMutation = useMutation({
    mutationFn: posApi.checkout,
    onSuccess: (receipt, input) => {
      toast.success(`Transaksi ${receipt.receiptNumber} tercatat.`);
      const time = new Date(receipt.transactionDate || Date.now()).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSales((prev) =>
        [
          {
            receiptNumber: receipt.receiptNumber,
            itemCount: input.items.reduce((sum, i) => sum + i.quantity, 0),
            total: receipt.grandTotal,
            time,
            paymentMethod: input.paymentMethod,
          },
          ...prev,
        ].slice(0, 5),
      );
      setCart({});
      queryClient.invalidateQueries({ queryKey: SOUVENIRS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Gagal memproses transaksi kasir.");
    },
  });

  const checkout = async (paymentMethod: PaymentMethod, cashReceived?: number) => {
    try {
      await checkoutMutation.mutateAsync({
        paymentMethod,
        cashReceived,
        items: cartLines.map((l) => ({ souvenirId: l.product.id, quantity: l.quantity })),
      });
      return true;
    } catch {
      return false;
    }
  };

  const restockProduct = (product: Souvenir) =>
    restockMutation.mutate({ id: product.id, input: { stock: product.stock + 5 } });

  return {
    search,
    setSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    products,
    filteredProducts,
    isLoading,
    isRefreshing: isFetching && !isLoading,
    refresh: () => refetch(),
    cart,
    cartLines,
    totalAmount,
    totalItems,
    addToCart,
    setQuantity,
    clearCart: () => setCart({}),
    checkout,
    isCheckingOut: checkoutMutation.isPending,
    restockProduct,
    sales,
    shiftTotal,
  };
}
