"use client";

import { useCallback } from "react";

export function useHeroActions() {
  const handleScrollToRooms = useCallback(() => {
    const el = document.getElementById("pilihan-kamar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return {
    handleScrollToRooms,
  };
}
