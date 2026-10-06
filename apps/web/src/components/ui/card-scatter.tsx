"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

export type CardScatterItem = {
  id: string | number;
  title: string;
  image?: string;
  alt?: string;
  href?: string;
  [key: string]: unknown;
};

export type CardScatterProps<T extends CardScatterItem = CardScatterItem> = {
  items: T[];
  /** lebar tiap kartu (px) */
  cardWidth?: number;
  /** rasio tinggi / lebar kartu */
  aspect?: number;
  /** jarak horizontal antar kartu (px), default = cardWidth * 0.62 */
  step?: number;
  /** selisih tinggi baris atas & bawah (px) */
  rowGap?: number;
  /** pola kemiringan kartu non-aktif (derajat), diulang berurutan */
  rotations?: number[];
  /** perbesaran kartu aktif */
  activeScale?: number;
  /** pindah otomatis tiap N ms (0 = mati) */
  autoPlay?: number;
  /** jeda saat kursor / fokus ada di komponen */
  pauseOnHover?: boolean;
  /** index awal */
  defaultIndex?: number;
  /** tampilkan panah & indikator */
  showControls?: boolean;
  ariaLabel?: string;
  onChange?: (index: number, item: T) => void;
  onItemClick?: (item: T, index: number) => void;
  renderCard?: (item: T, state: { isActive: boolean }) => React.ReactNode;
  className?: string;
};

const DEFAULT_ROTATIONS = [-4, 3, -2, 4, -3, 2, -4, 3];

export function CardScatter<T extends CardScatterItem = CardScatterItem>({
  items,
  cardWidth = 190,
  aspect = 1.3,
  step,
  rowGap = 90,
  rotations = DEFAULT_ROTATIONS,
  activeScale = 1.1,
  autoPlay = 3000,
  pauseOnHover = true,
  defaultIndex = 0,
  showControls = true,
  ariaLabel = "Kumpulan kartu pilihan",
  onChange,
  onItemClick,
  renderCard,
  className = "",
}: CardScatterProps<T>) {
  const n = items.length;
  const [active, setActive] = React.useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(n - 1, 0)),
  );
  const [paused, setPaused] = React.useState(false);

  const cardHeight = cardWidth * aspect;
  const gapX = step ?? cardWidth * 0.62;
  const stageHeight = cardHeight + rowGap + 70;

  // Jaga active index tetap valid jika jumlah item berubah dinamis
  React.useEffect(() => {
    setActive((prev) => Math.min(Math.max(prev, 0), Math.max(n - 1, 0)));
  }, [n]);

  const go = React.useCallback(
    (to: number) => {
      if (n === 0) return;
      const next = ((to % n) + n) % n;
      setActive(next);
      onChange?.(next, items[next]);
    },
    [items, n, onChange],
  );

  // auto active
  React.useEffect(() => {
    if (!autoPlay || n < 2) return;
    if (pauseOnHover && paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(active + 1), autoPlay);
    return () => window.clearTimeout(t);
  }, [autoPlay, pauseOnHover, paused, active, go, n]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
  };

  if (n === 0) return null;

  // track digeser supaya kartu aktif selalu di tengah
  const trackX = -(active * gapX + cardWidth / 2);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={`w-full select-none ${className}`}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        className="relative mx-auto w-full overflow-hidden"
        style={{
          height: stageHeight,
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 h-full transition-transform duration-[900ms] motion-reduce:transition-none"
          style={{
            transform: `translateX(${trackX}px)`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {items.map((item, i) => {
            const isActive = i === active;
            const row = i % 2; // genap = atas, ganjil = bawah
            const rot = rotations[i % rotations.length] ?? 0;
            const y = 20 + row * rowGap + (isActive ? -14 : 0);

            return (
              <button
                type="button"
                key={item.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${n}: ${item.title}`}
                onMouseEnter={() => go(i)}
                onFocus={() => go(i)}
                onClick={() => (isActive ? onItemClick?.(item, i) : go(i))}
                className="absolute top-0 cursor-pointer overflow-hidden rounded-2xl border border-[#e9e8ea] bg-white transition-[transform,box-shadow,filter] duration-[900ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3c315b] motion-reduce:transition-none text-left p-0"
                style={{
                  left: i * gapX,
                  width: cardWidth,
                  height: cardHeight,
                  zIndex: n - Math.abs(i - active),
                  transform: `translateY(${y}px) rotate(${isActive ? 0 : rot}deg) scale(${
                    isActive ? activeScale : 0.97
                  })`,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: isActive
                    ? "0px 18px 40px rgba(60,49,91,0.22)"
                    : "0px 4px 20px rgba(226,223,254,0.45)",
                  filter: isActive ? "none" : "brightness(0.96)",
                }}
              >
                {renderCard ? (
                  renderCard(item, { isActive })
                ) : (
                  <div className="flex h-full flex-col p-2.5">
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-[#f4f2f4]">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.alt ?? item.title}
                          draggable={false}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <p className="truncate px-1 pt-3 pb-1 text-center text-sm font-medium text-[#1c1c1c]">
                      {item.title}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showControls && (
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Sebelumnya"
            className="cursor-pointer rounded-full p-2 text-[#86848d] transition-colors hover:bg-[#f4f2f4] hover:text-[#3c315b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3c315b]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ke slide ${i + 1}`}
                aria-current={i === active}
                className="group cursor-pointer py-2 focus:outline-none"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-[#3c315b]" : "w-2 bg-[#e9e8ea] group-hover:bg-[#86848d]"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Berikutnya"
            className="cursor-pointer rounded-full p-2 text-[#86848d] transition-colors hover:bg-[#f4f2f4] hover:text-[#3c315b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3c315b]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}

export default CardScatter;

/* ---------- contoh pemakaian ----------

import { CardScatter } from "@/components/ui/card-scatter";

const souvenirs = [
  { id: "1", title: "MKP - Cap Mutiara (100ml)", price: "Rp 40.000", image: "/images/mkp.jpg" },
  { id: "2", title: "Kain Tenun Maluku",         price: "Rp 150.000", image: "/images/tenun.jpg" },
  { id: "3", title: "Kopi Bubuk Lokal",          price: "Rp 45.000",  image: "/images/kopi.jpg" },
  { id: "4", title: "Keripik Pisang",            price: "Rp 25.000",  image: "/images/keripik.jpg" },
  { id: "5", title: "Gantungan Kunci",           price: "Rp 10.000",  image: "/images/gantungan.jpg" },
];

// pakai layout bawaan (foto + judul)
<CardScatter items={souvenirs} autoPlay={3000} onItemClick={(item) => console.log(item.title)} />

// atau layout kustom
<CardScatter
  items={souvenirs}
  cardWidth={210}
  renderCard={(item, { isActive }) => (
    <div className="flex h-full flex-col p-2.5">
      <img src={item.image} alt={item.title} className="min-h-0 flex-1 rounded-xl object-cover" />
      <div className="px-1 pt-2.5">
        <h4 className="truncate text-sm font-medium text-[#1c1c1c]">{item.title}</h4>
        <span className="text-xs font-bold text-[#3c315b]">{item.price as string}</span>
        {isActive && <button className="mt-2 w-full rounded-full bg-[#3c315b] py-1.5 text-xs text-white">Tambah</button>}
      </div>
    </div>
  )}
/>
*/
