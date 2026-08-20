import { Button } from "../../../../components/ui/button";
import { SouvenirCard, type SouvenirItem } from "./souvenir-card";

interface SouvenirGridProps {
  items: SouvenirItem[];
  searchQuery: string;
  onReset: () => void;
}

export function SouvenirGrid({ items, searchQuery, onReset }: SouvenirGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 sm:pb-20">
      <div className="flex items-center justify-between mt-10 mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
          Daftar Produk Oleh-oleh
        </h2>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
          Tersedia langsung di Resepsionis Annisa
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm font-medium">
            Tidak ditemukan produk oleh-oleh dengan kata kunci &quot;{searchQuery}&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="mt-3 rounded-full text-xs font-bold cursor-pointer"
          >
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item) => (
            <SouvenirCard key={item.name} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
