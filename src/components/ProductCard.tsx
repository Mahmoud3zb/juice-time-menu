import type { Product } from '../data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white border-[1.5px] border-brand-green/10 rounded-[1.5rem] p-3 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
      
      <div className="text-right flex-1 ml-4 py-1 z-10">
        <h3 className="text-brand-green font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-[11px] font-semibold mb-3 leading-relaxed opacity-90">
          {product.desc}
        </p>

        <div className="flex items-center justify-end gap-1.5 text-brand-orange font-black text-lg">
          <span>
            {product.price} <span className="text-[11px] font-bold">ج.م</span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

     
      <div className="w-[85px] h-[85px] rounded-[1rem] bg-orange-50/50 flex items-center justify-center flex-shrink-0 border border-orange-100 p-2 z-10">
        <img
          src={product.iconUrl}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-green/5 rounded-full blur-xl"></div>
    </article>
  );
}
