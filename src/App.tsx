import { useState } from 'react';
import { categories, products } from './data';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'fresh-juices');
  const filteredProducts = products.filter((p) => p.categoryId === activeCategory || p.category === activeCategory);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      {/* حاوية محاكاة شاشة الهاتف */}
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl flex flex-col font-sans">
        <Header />
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ProductList products={filteredProducts} />
        <Footer />
      </div>
    </div>
  );
}

export default App;