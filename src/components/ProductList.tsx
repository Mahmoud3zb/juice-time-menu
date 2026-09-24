import type { Product } from '../data';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <main className="flex-1 bg-brand-bg p-4 sm:p-5 flex flex-col gap-4 pb-28 overflow-y-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <p className="font-semibold text-sm">لا توجد منتجات في هذا القسم حالياً</p>
        </div>
      )}
    </main>
  );
}
