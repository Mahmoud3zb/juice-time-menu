import type { Product } from '../data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Description handling (strictly natural description text, ignoring legacy size/price strings)
  const rawDescription = product.description || (product.desc && !product.desc.includes('كباية') && !product.desc.includes('لتر') ? product.desc : undefined);
  const description = rawDescription;

  // Image URL fallback
  const imageUrl = product.image || product.iconUrl || '/img/logo.jpg';

  // Pricing display logic
  const sizes = product.sizes;
  const singlePrice =
    typeof product.price === 'number'
      ? product.price
      : typeof product.price === 'string' && !isNaN(Number(product.price))
      ? Number(product.price)
      : undefined;

  return (
    <article className="py-4 border-b border-gray-200/60 last:border-b-0 flex items-start gap-3.5 sm:gap-4 transition-colors hover:bg-black/[0.01] rounded-2xl px-1">
      {/* 1. Image Container - Squircle with soft pastel background */}
      <div className="relative w-[92px] h-[108px] sm:w-[100px] sm:h-[116px] rounded-[1.5rem] bg-[#F5EFE9] border border-[#EBE2D8]/60 flex items-center justify-center flex-shrink-0 p-2 overflow-hidden group shadow-sm">
        <img
          src={imageUrl}
          alt={product.nameAr}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-1.5 right-1.5 bg-brand-orange text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm">
            مميز
          </span>
        )}
      </div>

      {/* 2. Details Container */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5 text-right">
        <div>
          {/* Rating cue */}
          <div className="flex items-center gap-1 mb-0.5">
            <div className="flex text-amber-400 text-[10px] tracking-tight font-bold">
              ★ <span className="mr-0.5">4.9</span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">(+50)</span>
          </div>

          {/* Title */}
          <h3 className="text-[#1A1A1A] font-bold text-base sm:text-lg leading-snug truncate group-hover:text-brand-green transition-colors">
            {product.nameAr}
          </h3>

          {/* Description with line-clamp-2 */}
          {description && (
            <p className="text-gray-500 text-xs leading-relaxed mt-0.5 line-clamp-2 font-medium opacity-90">
              {description}
            </p>
          )}

          {/* Selectable flavors count preview if available */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="inline-block bg-emerald-50 text-brand-green text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                {product.flavors.length} نكهات مميزة
              </span>
            </div>
          )}
        </div>

        {/* Price & Action Area (No slashes, clean badges/pills) */}
        <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
          {/* Price Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {sizes && sizes.length > 0 ? (
              // Dual Sizes Pills: "كباية" and "لتر"
              sizes.map((s, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-transform active:scale-95 ${
                    s.name === 'كباية'
                      ? 'bg-amber-50 text-brand-orange border border-amber-200/80'
                      : 'bg-emerald-50 text-brand-green border border-emerald-200/80'
                  }`}
                >
                  <span className="opacity-80 text-[10px] font-semibold">{s.name}</span>
                  <span className="text-sm font-extrabold">{s.price}</span>
                  <span className="text-[9px] font-bold">ج.م</span>
                </div>
              ))
            ) : singlePrice !== undefined ? (
              // Single Price Pill
              <div className="inline-flex items-center gap-1 bg-amber-50 text-brand-orange border border-amber-200/80 px-3 py-1 rounded-full text-xs font-bold">
                <span className="text-base font-black">{singlePrice}</span>
                <span className="text-[10px] font-extrabold">ج.م</span>
              </div>
            ) : null}
          </div>

          {/* High-Contrast Action Button */}
          <button
            type="button"
            aria-label={`طلب ${product.nameAr}`}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-brand-green text-white flex items-center justify-center shadow-md hover:shadow-brand-green/20 transition-all duration-300 flex-shrink-0 active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
