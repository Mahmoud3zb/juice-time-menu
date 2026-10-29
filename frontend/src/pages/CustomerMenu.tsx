import { useState, useEffect } from 'react';
import { categories, products as staticProducts, type Category, type Product } from '../data';
import { Header } from '../components/Header';
import { CategoryNav } from '../components/CategoryNav';
import { ProductList } from '../components/ProductList';
import { Footer } from '../components/Footer';
import { WelcomeScreen } from '../components/WelcomeScreen';
import apiClient from '../api/client';
import {
  type SeasonPreset,
  type MenuConfigData,
  SEASON_INFO,
  applyCategoryOrder,
} from '../utils/seasonPresets';

interface BackendProduct {
  _id: string;
  name: string;
  type: string;
  priceType?: 'cup_liter' | 'single_double' | 'single_price';
  description?: string;
  price?: number;
  prices?: {
    cup?: number;
    liter?: number;
    single?: number;
  };
  imageurl?: string;
  image?: string;
  featured?: boolean;
}

function mapBackendProduct(bp: BackendProduct): Product {
  const isCoffee = bp.priceType === 'single_double' || bp.type === 'قهوة' || bp.type === 'ركن القهوة';
  const isSingle = bp.priceType === 'single_price' || (!bp.prices?.liter && bp.priceType !== 'cup_liter' && bp.priceType !== 'single_double');

  let sizes: { name: string; price: number }[] | undefined = undefined;
  let singlePrice: number | undefined = undefined;

  if (isSingle) {
    singlePrice =
      bp.prices?.single !== undefined && bp.prices?.single !== null
        ? Number(bp.prices.single)
        : bp.prices?.cup !== undefined && bp.prices?.cup !== null
        ? Number(bp.prices.cup)
        : bp.price !== undefined && bp.price !== null
        ? Number(bp.price)
        : undefined;
  } else if (isCoffee) {
    sizes = [];
    if (bp.prices?.cup !== undefined && bp.prices?.cup !== null) {
      sizes.push({ name: 'سنجل', price: Number(bp.prices.cup) });
    }
    if (bp.prices?.liter !== undefined && bp.prices?.liter !== null) {
      sizes.push({ name: 'دبل', price: Number(bp.prices.liter) });
    }
  } else {
    sizes = [];
    if (bp.prices?.cup !== undefined && bp.prices?.cup !== null) {
      sizes.push({ name: 'كباية', price: Number(bp.prices.cup) });
    }
    if (bp.prices?.liter !== undefined && bp.prices?.liter !== null) {
      sizes.push({ name: 'لتر', price: Number(bp.prices.liter) });
    }
  }

  // Resolve matching category with synonyms support
  const CATEGORY_ALIASES: Record<string, string> = {
    'فروت سلاط': 'fruit-salad',
    'سلطة فواكه': 'fruit-salad',
    'آيس كريم سوفت': 'soft-ice-cream',
    'ميكسات سوفت آيس كريم': 'soft-ice-cream',
    'قهوة': 'coffee',
    'القهوة': 'coffee',
  };

  const aliasId = bp.type ? CATEGORY_ALIASES[bp.type] : undefined;
  const matchedCat = categories.find(
    (c) => c.nameAr === bp.type || c.id === bp.type || (aliasId && c.id === aliasId)
  );

  return {
    id: bp._id,
    categoryId: matchedCat ? matchedCat.id : aliasId || bp.type || 'fresh-juices',
    category: bp.type,
    nameAr: bp.name,
    name: bp.name,
    description: bp.description,
    sizes: sizes && sizes.length > 0 ? sizes : undefined,
    price: singlePrice,
    image: bp.imageurl || bp.image,
    featured: bp.featured,
  };
}

export function CustomerMenu() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [orderedCategories, setOrderedCategories] = useState<Category[]>(categories);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'fresh-juices');
  const [activeSeason, setActiveSeason] = useState<SeasonPreset>('default');
  const [menuList, setMenuList] = useState<Product[]>(staticProducts);

  useEffect(() => {
    let isMounted = true;

    // Fetch Products
    apiClient
      .get('/api/products?limit=500')
      .then((res) => {
        const data = res.data?.data || res.data?.products || (Array.isArray(res.data) ? res.data : null);
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          const liveProducts = data.map(mapBackendProduct);
          setMenuList(liveProducts);
        }
      })
      .catch((err) => {
        console.warn('Using offline static menu fallback:', err?.message || err);
      });

    // Fetch Menu Season & Category Ordering Configuration
    apiClient
      .get<{ data: MenuConfigData }>('/api/menu-config')
      .then((res) => {
        const config = res.data?.data;
        if (isMounted && config) {
          if (config.activeSeason) {
            setActiveSeason(config.activeSeason);
          }
          if (config.categoryOrder && config.categoryOrder.length > 0) {
            const reordered = applyCategoryOrder(categories, config.categoryOrder);
            setOrderedCategories(reordered);
            // Default to the first category of the newly configured seasonal order
            if (reordered[0]) {
              setActiveCategory(reordered[0].id);
            }
          }
        }
      })
      .catch((err) => {
        console.warn('Could not load seasonal config from server, using default:', err?.message || err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activeCatObj = orderedCategories.find((c) => c.id === activeCategory);
  const activeNameAr = activeCatObj?.nameAr;

  const filteredProducts = menuList.filter(
    (p) =>
      p.categoryId === activeCategory ||
      p.category === activeCategory ||
      (activeNameAr && (p.categoryId === activeNameAr || p.category === activeNameAr))
  );

  const seasonInfo = SEASON_INFO[activeSeason] || SEASON_INFO.default;

  // If on Launch / Welcome Page, render exclusively the WelcomeScreen
  if (showWelcome) {
    return <WelcomeScreen onExploreMenu={() => setShowWelcome(false)} />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      {/* Main Mobile Container */}
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl flex flex-col font-sans">
        <Header onOpenWelcome={() => setShowWelcome(true)} />

        {/* Dynamic Seasonal Ribbon (when activeSeason is not default) */}
        {activeSeason !== 'default' && (
          <div
            className="w-full py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold transition-all border-b border-black/5"
            style={{
              backgroundColor: seasonInfo.bgLight,
              color: seasonInfo.color,
            }}
          >
            <span>{seasonInfo.icon}</span>
            <span>{seasonInfo.badge}</span>
            <span className="opacity-50 font-normal">|</span>
            <span className="truncate opacity-90">{seasonInfo.title}</span>
          </div>
        )}

        <CategoryNav
          categories={orderedCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ProductList products={filteredProducts} />
        <Footer />
      </div>
    </div>
  );
}

export default CustomerMenu;


