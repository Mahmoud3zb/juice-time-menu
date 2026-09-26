import type { Category } from '../data';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav aria-label="أقسام قائمة الطعام" className="px-4 py-3.5 bg-white border-b-2 border-gray-50 z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <ul className="flex gap-2.5 overflow-x-auto hide-scroll pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <li key={cat.id} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                aria-pressed={isActive}
                aria-label={`قسم ${cat.nameAr} - ${cat.nameEn || ''}`}
                className={`flex flex-col items-center justify-center min-w-[92px] h-[88px] px-2 rounded-2xl transition-all duration-300 border-[1.5px] cursor-pointer group
                  ${
                    isActive
                      ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/25 scale-[1.02]'
                      : 'bg-white text-brand-green border-brand-green/20 hover:bg-brand-green/5 hover:border-brand-green'
                  }`}
              >
                {/* Image container box */}
                <div
                  className={`w-9 h-9 rounded-xl overflow-hidden mb-1 flex items-center justify-center p-0.5 border transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 border-white/40 shadow-sm'
                      : 'bg-orange-50/60 border-orange-100 group-hover:scale-105'
                  }`}
                >
                  <img
                    src={cat.icon || cat.img || '/img/logo.jpg'}
                    alt={cat.nameAr}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <span className="text-xs font-bold leading-tight mb-0.5 truncate max-w-[80px]">
                  {cat.nameAr}
                </span>
                {cat.nameEn && (
                  <span
                    className={`text-[9px] font-semibold truncate max-w-[80px] ${
                      isActive ? 'text-white/90' : 'text-gray-400'
                    }`}
                  >
                    {cat.nameEn}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
