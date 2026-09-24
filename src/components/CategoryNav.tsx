import type { Category } from '../data';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav aria-label="أقسام قائمة الطعام" className="px-4 py-4 bg-white border-b-2 border-gray-50 z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <ul className="flex gap-2.5 overflow-x-auto hide-scroll pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <li key={cat.id} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                aria-pressed={isActive}
                aria-label={`قسم ${cat.nameAr} - ${cat.nameEn}`}
                className={`flex flex-col items-center justify-center min-w-[90px] h-[85px] px-2 rounded-2xl transition-all duration-300 border-[1.5px] cursor-pointer
                  ${
                    isActive
                      ? 'bg-brand-green text-white border-brand-green shadow-lg shadow-brand-green/30 scale-[1.02]'
                      : 'bg-white text-brand-green border-brand-green/20 hover:bg-brand-green/5 hover:border-brand-green'
                  }`}
              >
                <img
                  src={cat.img}
                  alt=""
                  aria-hidden="true"
                  className="w-8 h-8 object-contain mb-1 transition-transform duration-300 hover:scale-110"
                  style={isActive ? { filter: 'brightness(0) invert(1)' } : {}}
                />
                <span className="text-xs font-bold leading-tight mb-0.5">{cat.nameAr}</span>
                <span className="text-[9px] font-semibold opacity-80">{cat.nameEn}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
