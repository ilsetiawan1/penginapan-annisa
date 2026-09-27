interface ArticleFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ArticleFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: ArticleFilterProps) {
  return (
    <section className="relative z-20 -mt-5 sm:-mt-6 max-w-4xl mx-auto px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-1.5 sm:p-2 shadow-lg border border-slate-200/90 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
