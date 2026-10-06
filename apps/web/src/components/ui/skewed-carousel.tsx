"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

export type SkewedCarouselItem = {
  id: string | number;
  title: string;
  image?: string;
  alt?: string;
  href?: string;
  [key: string]: unknown;
};

export type SkewedCarouselProps<T extends SkewedCarouselItem = SkewedCarouselItem> = {
  items: T[];
  /** index awal */
  defaultIndex?: number;
  /** lebar kartu tengah (px) */
  cardWidth?: number;
  /** rasio tinggi / lebar kartu */
  aspect?: number;
  /** jarak antar kartu (px), default = cardWidth * 1.05 */
  step?: number;
  /** besar kemiringan kartu samping (derajat) */
  skew?: number;
  /** lebar kartu samping relatif ke kartu tengah (0-1) */
  sideScale?: number;
  /** putar balik dari akhir ke awal */
  loop?: boolean;
  /** autoplay dalam ms (0 = mati) */
  autoPlay?: number;
  onChange?: (index: number, item: T) => void;
  onItemClick?: (item: T, index: number) => void;
  renderCard?: (item: T, isCenter: boolean) => React.ReactNode;
  className?: string;
};

export function SkewedCarousel<T extends SkewedCarouselItem = SkewedCarouselItem>({
  items,
  defaultIndex = 0,
  cardWidth = 280,
  aspect = 1.25,
  step,
  skew = 5,
  sideScale = 0.65,
  loop = true,
  autoPlay = 0,
  onChange,
  onItemClick,
  renderCard,
  className = "",
}: SkewedCarouselProps<T>) {
  const n = items.length;
  const [active, setActive] = React.useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(n - 1, 0)),
  );
  const [paused, setPaused] = React.useState(false);
  const drag = React.useRef<{ x: number; moved: boolean } | null>(null);

  const cardHeight = cardWidth * aspect;
  const gap = step ?? cardWidth * 1.05;

  const go = React.useCallback(
    (to: number) => {
      if (n === 0) return;
      let next = to;
      if (loop) next = ((to % n) + n) % n;
      else next = Math.min(Math.max(to, 0), n - 1);
      setActive(next);
      onChange?.(next, items[next]);
    },
    [items, loop, n, onChange],
  );

  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  // autoplay
  React.useEffect(() => {
    if (!autoPlay || paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => go(active + 1), autoPlay);
    return () => window.clearInterval(t);
  }, [autoPlay, paused, active, go, n]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  // drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) {
      d.moved = true;
      if (dx < 0) {
        next();
      } else {
        prev();
      }
      // cegah click setelah swipe
      (e.target as HTMLElement).addEventListener("click", (ev) => ev.stopPropagation(), {
        capture: true,
        once: true,
      });
    }
  };

  const offsetOf = (i: number) => {
    let d = i - active;
    if (loop && n > 1) {
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
    }
    return d;
  };

  if (n === 0) return null;

  const atStart = !loop && active === 0;
  const atEnd = !loop && active === n - 1;

  return (
    <section
      className={`w-full select-none ${className}`}
      aria-roledescription="carousel"
      aria-label="Koleksi kamar pilihan"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative mx-auto w-full overflow-hidden touch-pan-y"
        style={{ height: cardHeight + 40 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {items.map((item, i) => {
          const d = offsetOf(i);
          const abs = Math.abs(d);
          const isCenter = d === 0;
          const hidden = abs > 3;

          const sx = isCenter ? 1 : sideScale;
          const sy = isCenter ? 1 : Math.max(0.8, 0.95 - (abs - 1) * 0.05);
          const skewY = isCenter ? 0 : -Math.sign(d) * skew;

          return (
            <div
              key={item.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${n}: ${item.title}`}
              aria-hidden={!isCenter}
              onClick={() => (isCenter ? onItemClick?.(item, i) : go(i))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (isCenter) {
                    onItemClick?.(item, i);
                  } else {
                    go(i);
                  }
                }
              }}
              tabIndex={isCenter ? 0 : -1}
              className={`absolute top-1/2 left-1/2 cursor-pointer overflow-hidden rounded-2xl bg-white border border-[#e9e8ea] shadow-[0px_4px_20px_rgba(226,223,254,0.45)] transition-[transform,opacity] duration-700 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3c315b] ${
                hidden ? "pointer-events-none" : ""
              }`}
              style={{
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
                zIndex: 10 - abs,
                opacity: hidden ? 0 : isCenter ? 1 : 0.85,
                transform: `translateX(${d * gap}px) skewY(${skewY}deg) scale(${sx}, ${sy})`,
                transitionTimingFunction: "cubic-bezier(0.25, 1.25, 0.35, 1)",
              }}
            >
              {renderCard ? (
                renderCard(item, isCenter)
              ) : (
                <>
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.alt ?? item.title}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${
                      isCenter ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* kontrol navigasi Light Phantom */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          aria-label="Sebelumnya"
          className="text-[#86848d] hover:text-[#3c315b] hover:bg-[#f4f2f4] rounded-full p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3c315b] disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ke slide ${i + 1}`}
              aria-current={i === active}
              className="group py-2 cursor-pointer focus:outline-none"
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
          onClick={next}
          disabled={atEnd}
          aria-label="Berikutnya"
          className="text-[#86848d] hover:text-[#3c315b] hover:bg-[#f4f2f4] rounded-full p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3c315b] disabled:opacity-30 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default SkewedCarousel;
