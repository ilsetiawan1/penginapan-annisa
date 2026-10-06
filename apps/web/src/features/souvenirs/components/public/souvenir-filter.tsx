"use client";

interface SouvenirFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function SouvenirFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: SouvenirFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-1.5 text-xs shrink-0 cursor-pointer transition-all ${
              isActive
                ? "bg-[#3c315b] text-[#fdfcfe] font-medium shadow-xs"
                : "bg-[#f4f2f4] hover:bg-[#e9e8ea] text-[#86848d] hover:text-[#1c1c1c] font-normal transition-colors"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
