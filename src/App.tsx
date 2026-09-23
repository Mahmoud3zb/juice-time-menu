// src/App.tsx
import { useState } from 'react';
import { categories, products } from './data';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('fresh');
  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      {/* Container simulating mobile screen */}
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl flex flex-col font-sans">
        
        {/* Top welcome banner */}
        <div className="bg-brand-green text-white text-center py-1.5 text-[13px] font-semibold w-full">
          أهلاً بكم! تم المسح بنجاح | Welcome! Scan Successful
        </div>

        {/* Header logo area */}
        <div className="py-6 flex justify-center border-b border-gray-100 relative overflow-hidden">
          {/* Pattern Background (Optional styling for header) */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(#009a74 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px'
          }}></div>
          {/* استبدل src بـ logo.jpg عندما توفره */}
          <h1 className="text-3xl font-extrabold text-brand-green relative z-10">
            عصير تايم
          </h1>
        </div>

        {/* Categories Bar (Tabs) */}
        <div className="px-4 py-4 bg-white border-b-2 border-gray-50 z-10">
          <ul className="flex gap-2.5 overflow-x-auto hide-scroll pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              
              return (
                <li 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center justify-center min-w-[95px] h-[85px] rounded-2xl transition-all duration-300 border-[1.5px] cursor-pointer flex-shrink-0
                    ${isActive 
                      ? "bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20" 
                      : "bg-white text-brand-green border-brand-green hover:bg-brand-green/5"
                    }`}
                >
                  <img 
                    src={cat.img} 
                    alt={cat.nameAr} 
                    className="w-8 h-8 object-contain mb-1" 
                    style={isActive ? { filter: "brightness(0) invert(1)" } : {}}
                  />
                  <span className="text-xs font-bold leading-tight mb-0.5">{cat.nameAr}</span>
                  <span className="text-[9px] font-semibold opacity-90">{cat.nameEn}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-brand-bg p-4 flex flex-col items-center justify-center">
          <p className="text-gray-500 font-semibold">
            القسم النشط حالياً: {categories.find(c => c.id === activeCategory)?.nameAr}
          </p>
          <p className="text-sm mt-2 text-brand-orange font-bold">
            عدد المنتجات: {filteredProducts.length}
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;