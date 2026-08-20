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
    <section className="relative z-20 -mt-5 sm:-mt-6 max-w-xl mx-auto px-3 sm:px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-full p-1 sm:p-1.5 shadow-lg border border-slate-200/90 flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}
