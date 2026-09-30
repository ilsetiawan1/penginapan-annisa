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
    <section className="relative z-20 -mt-5 sm:-mt-6 w-full flex justify-center px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-slate-200/90 inline-flex flex-wrap items-center justify-center gap-1.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
