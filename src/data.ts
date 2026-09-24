export type DrinkSizeName = 'كباية' | 'لتر';

export interface ProductSize {
  name: DrinkSizeName;
  price: number;
}

export interface ProteinOption {
  scoops: number;
  labelAr: string;
  extraPrice?: number;
  proteinGrams?: number;
}

export interface Product {
  id: string;
  categoryId: string;
  nameAr: string;
  nameEn?: string;
  description?: string;

  // Used for dual-size products (كباية / لتر)
  sizes?: ProductSize[];

  // Used for single-price products
  price?: number;

  // Used for selectable flavors (e.g. Yogurt)
  flavors?: string[];

  // Used for Protein Cocktails
  proteinOptions?: ProteinOption[];

  image?: string;
  featured?: boolean;

  // Backward-compatibility getters/fields for current UI rendering
  name?: string;
  desc?: string;
  category?: string;
  iconUrl?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn?: string;
  background?: string;
  icon?: string;
  description?: string;

  // Backward-compatibility field for current CategoryNav rendering
  img?: string;
}

export const categories: Category[] = [
  {
    id: 'fresh-juices',
    nameAr: 'عصائر فريش',
    nameEn: 'Fresh Juices',
    background: '/img/مانجا.jpg',
    icon: '/img/مانجا.jpg',
    img: '/img/مانجا.jpg',
  },
  {
    id: 'imported-fruits',
    nameAr: 'فواكه مستوردة',
    nameEn: 'Imported Fruits',
    background: '/img/اناناس.jpg',
    icon: '/img/اناناس.jpg',
    img: '/img/اناناس.jpg',
  },
  {
    id: 'avocado-mixes',
    nameAr: 'ميكسات أفوكادو',
    nameEn: 'Avocado Mixes',
    background: '/img/2.jpg',
    icon: '/img/2.jpg',
    img: '/img/2.jpg',
  },
  {
    id: 'couple-mixes',
    nameAr: 'ميكسات كبل',
    nameEn: 'Couple Mixes',
    background: '/img/4.jpg',
    icon: '/img/4.jpg',
    img: '/img/4.jpg',
  },
  {
    id: 'fruit-salad',
    nameAr: 'سلطة فواكه',
    nameEn: 'Fruit Salad',
    background: '/img/سلطة فواكة.jpg',
    icon: '/img/سلطة فواكة.jpg',
    img: '/img/سلطة فواكة.jpg',
  },
  {
    id: 'milkshake',
    nameAr: 'ميلك شيك',
    nameEn: 'Milk Shakes',
    background: '/img/6.jpg',
    icon: '/img/6.jpg',
    img: '/img/6.jpg',
  },
  {
    id: 'protein-cocktail',
    nameAr: 'بروتين كوكتيل',
    nameEn: 'Protein Cocktails',
    background: '/img/5.jpg',
    icon: '/img/5.jpg',
    img: '/img/5.jpg',
  },
  {
    id: 'awar-qalb',
    nameAr: 'عوار قلب',
    nameEn: 'Awar Qalb',
    background: '/img/3.jpg',
    icon: '/img/3.jpg',
    img: '/img/3.jpg',
  },
  {
    id: 'soft-ice-cream',
    nameAr: 'ميكسات سوفت آيس كريم',
    nameEn: 'Soft Ice Cream Mixes',
    background: '/img/teremassoo.jpg',
    icon: '/img/teremassoo.jpg',
    img: '/img/teremassoo.jpg',
  },
  {
    id: 'fans-cocktail',
    nameAr: 'فانز كوكتيل',
    nameEn: 'Fans Cocktails',
    background: '/img/1.jpg',
    icon: '/img/1.jpg',
    img: '/img/1.jpg',
  },
  {
    id: 'juice-time-yogurt',
    nameAr: 'زبادي عصير تايم',
    nameEn: 'Juice Time Yogurt',
    background: '/img/1.jpg',
    icon: '/img/1.jpg',
    img: '/img/1.jpg',
  },
  {
    id: 'soft-drinks',
    nameAr: 'مشروبات غازية',
    nameEn: 'Mojitos & Sodas',
    background: '/img/back2.jpg',
    icon: '/img/back2.jpg',
    img: '/img/back2.jpg',
  },
  {
    id: 'smoothies',
    nameAr: 'اسموزي',
    nameEn: 'Smoothies',
    background: '/img/اسموزى.jpg',
    icon: '/img/اسموزى.jpg',
    img: '/img/اسموزى.jpg',
  },
  {
    id: 'iced-coffee',
    nameAr: 'آيس كوفي',
    nameEn: 'Iced Coffee',
    background: '/img/8.jpg',
    icon: '/img/8.jpg',
    img: '/img/8.jpg',
  },
  {
    id: 'waffles',
    nameAr: 'وافلز',
    nameEn: 'Waffles',
    background: '/img/b1.jpg',
    icon: '/img/b1.jpg',
    img: '/img/b1.jpg',
  },
  {
    id: 'mini-pancakes',
    nameAr: 'ميني بان كيك',
    nameEn: 'Mini Pancakes',
    background: '/img/b1.jpg',
    icon: '/img/b1.jpg',
    img: '/img/b1.jpg',
  },
  {
    id: 'sweets',
    nameAr: 'حلواني',
    nameEn: 'Sweets & Cakes',
    background: '/img/ام على.jpg',
    icon: '/img/ام على.jpg',
    img: '/img/ام على.jpg',
  },
  {
    id: 'rice-pudding',
    nameAr: 'أرز بلبن',
    nameEn: 'Rice Pudding',
    background: '/img/ام على.jpg',
    icon: '/img/ام على.jpg',
    img: '/img/ام على.jpg',
  },
  {
    id: 'hot-drinks',
    nameAr: 'مشروبات ساخنة',
    nameEn: 'Hot Drinks',
    background: '/img/8.jpg',
    icon: '/img/8.jpg',
    img: '/img/8.jpg',
  },
  {
    id: 'winter-corner',
    nameAr: 'الركن الشتوي',
    nameEn: 'Winter Corner',
    background: '/img/ام على.jpg',
    icon: '/img/ام على.jpg',
    img: '/img/ام على.jpg',
  },
  {
    id: 'coffee',
    nameAr: 'القهوة',
    nameEn: 'Coffee',
    background: '/img/8.jpg',
    icon: '/img/8.jpg',
    img: '/img/8.jpg',
  },
];

const defaultProteinOptions: ProteinOption[] = [
  { scoops: 1, labelAr: '1 سكوب بروتين', extraPrice: 0 },
  { scoops: 2, labelAr: '2 سكوب بروتين' },
  { scoops: 3, labelAr: '3 سكوب بروتين' },
];

export const products: Product[] = [
  // 1. عصائر فريش (Fresh Juices) - Dual Size: كباية (40) / لتر (80)
  { id: 'fj-mango', categoryId: 'fresh-juices', nameAr: 'مانجو', nameEn: 'Mango', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }], image: '/img/مانجا.jpg' },
  { id: 'fj-strawberry', categoryId: 'fresh-juices', nameAr: 'فراولة', nameEn: 'Strawberry', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }], image: '/img/1.jpg' },
  { id: 'fj-guava', categoryId: 'fresh-juices', nameAr: 'جوافة', nameEn: 'Guava', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-banana', categoryId: 'fresh-juices', nameAr: 'موز', nameEn: 'Banana', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-cantaloupe', categoryId: 'fresh-juices', nameAr: 'كانتلوب', nameEn: 'Cantaloupe', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-grape', categoryId: 'fresh-juices', nameAr: 'عنب', nameEn: 'Grape', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-watermelon', categoryId: 'fresh-juices', nameAr: 'بطيخ', nameEn: 'Watermelon', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-peach', categoryId: 'fresh-juices', nameAr: 'خوخ', nameEn: 'Peach', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-prickly-pear', categoryId: 'fresh-juices', nameAr: 'تين شوكي', nameEn: 'Prickly Pear', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-pomegranate', categoryId: 'fresh-juices', nameAr: 'رمان', nameEn: 'Pomegranate', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-orange', categoryId: 'fresh-juices', nameAr: 'برتقال', nameEn: 'Orange', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-lemon', categoryId: 'fresh-juices', nameAr: 'ليمون', nameEn: 'Lemon', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-lemon-mint', categoryId: 'fresh-juices', nameAr: 'ليمون نعناع', nameEn: 'Lemon Mint', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-carrot', categoryId: 'fresh-juices', nameAr: 'جزر', nameEn: 'Carrot', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },

  // 2. فواكه مستوردة (Imported Fruits) - Dual Size: كباية (60) / لتر (120)
  { id: 'imp-pineapple', categoryId: 'imported-fruits', nameAr: 'أناناس', nameEn: 'Pineapple', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }], image: '/img/اناناس.jpg' },
  { id: 'imp-kiwi', categoryId: 'imported-fruits', nameAr: 'كيوى', nameEn: 'Kiwi', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-cherry', categoryId: 'imported-fruits', nameAr: 'كريز لبناني', nameEn: 'Lebanese Cherry', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-custard-apple', categoryId: 'imported-fruits', nameAr: 'قشطه', nameEn: 'Custard Apple', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-berries', categoryId: 'imported-fruits', nameAr: 'توت', nameEn: 'Berries', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-apple', categoryId: 'imported-fruits', nameAr: 'تفاح', nameEn: 'Apple', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },

  // 3. ميكسات أفوكادو (Avocado Mixes) - Dual Size
  { id: 'avo-plain', categoryId: 'avocado-mixes', nameAr: 'افوكادو سادة', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 115 }] },
  { id: 'avo-cream', categoryId: 'avocado-mixes', nameAr: 'افوكادو قشطه', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'avo-nuts', categoryId: 'avocado-mixes', nameAr: 'افوكادو مكسرات', sizes: [{ name: 'كباية', price: 90 }, { name: 'لتر', price: 180 }] },
  { id: 'avo-dates-nuts', categoryId: 'avocado-mixes', nameAr: 'افوكادو بلح مكسرات', sizes: [{ name: 'كباية', price: 90 }, { name: 'لتر', price: 180 }] },
  { id: 'avo-dates', categoryId: 'avocado-mixes', nameAr: 'افوكادو بلح', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }] },

  // 4. ميكسات كبل (Couple Mixes) - Dual Size
  { id: 'cpl-mango-avocado', categoryId: 'couple-mixes', nameAr: 'مانجو أفوكادو', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-strawberry-berry', categoryId: 'couple-mixes', nameAr: 'فراولة توت', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-strawberry', categoryId: 'couple-mixes', nameAr: 'كيوي فراولة', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-avocado-banana', categoryId: 'couple-mixes', nameAr: 'أفوكادو موز', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-pomegranate-berry', categoryId: 'couple-mixes', nameAr: 'رمان توت', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-guava', categoryId: 'couple-mixes', nameAr: 'كيوي جوافة', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-mango', categoryId: 'couple-mixes', nameAr: 'كيوي مانجو', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-pineapple', categoryId: 'couple-mixes', nameAr: 'كيوي أناناس', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-mango-strawberry', categoryId: 'couple-mixes', nameAr: 'مانجو فراولة', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 95 }] },
  { id: 'cpl-orange-pineapple', categoryId: 'couple-mixes', nameAr: 'برتقال أناناس', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-mango-guava', categoryId: 'couple-mixes', nameAr: 'مانجو جوافة', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-peach-mango', categoryId: 'couple-mixes', nameAr: 'خوخ مانجو', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 95 }] },
  { id: 'cpl-banana-cantaloupe', categoryId: 'couple-mixes', nameAr: 'موز كانتلوب', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-watermelon-cantaloupe', categoryId: 'couple-mixes', nameAr: 'بطيخ كانتلوب', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-strawberry-plum', categoryId: 'couple-mixes', nameAr: 'فراولة برقوق', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },

  // 5. سلطة فواكه (Fruit Salad) - Fixed Price
  { id: 'fs-juice', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه مع العصير', price: 50, image: '/img/سلطة فواكة.jpg' },
  { id: 'fs-icecream', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه آيس كريم', price: 55 },
  { id: 'fs-nuts-cream', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه مكسرات وقشطة', price: 55 },
  { id: 'fs-bomb', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه عصير تايم (قنبلة)', price: 75 },

  // 6. ميلك شيك (Milk Shake) - Fixed Single Price
  { id: 'ms-fruits', categoryId: 'milkshake', nameAr: 'ميلك شيك فواكه', description: 'مانجو - كيوي - موز - فراولة', price: 70 },
  { id: 'ms-redberry', categoryId: 'milkshake', nameAr: 'ميلك شيك ريدبيري', price: 70 },
  { id: 'ms-blueberry', categoryId: 'milkshake', nameAr: 'ميلك شيك بلوبيري', price: 70 },
  { id: 'ms-vanilla', categoryId: 'milkshake', nameAr: 'ميلك شيك فانيليا', price: 70 },
  { id: 'ms-cerelac', categoryId: 'milkshake', nameAr: 'ميلك شيك سيريلاك (أطفال)', price: 70 },
  { id: 'ms-kitkat', categoryId: 'milkshake', nameAr: 'ميلك شيك كيت كات', price: 70 },
  { id: 'ms-mega', categoryId: 'milkshake', nameAr: 'ميلك شيك ميجا', price: 70 },
  { id: 'ms-snickers', categoryId: 'milkshake', nameAr: 'ميلك شيك سنيكرز', price: 70 },
  { id: 'ms-nutella', categoryId: 'milkshake', nameAr: 'ميلك شيك نوتيلا', price: 70 },
  { id: 'ms-twix', categoryId: 'milkshake', nameAr: 'ميلك شيك تويكس ماتس', price: 70 },
  { id: 'ms-kinder', categoryId: 'milkshake', nameAr: 'ميلك شيك نوتي كيندر', price: 70 },
  { id: 'ms-yogurt-berry', categoryId: 'milkshake', nameAr: 'ميلك شيك زبادي توت', price: 70 },
  { id: 'ms-lotus', categoryId: 'milkshake', nameAr: 'ميلك شيك لوتس', price: 80 },
  { id: 'ms-cashew', categoryId: 'milkshake', nameAr: 'ميلك شيك كاجو', price: 80 },
  { id: 'ms-jojo', categoryId: 'milkshake', nameAr: 'عصير جوجو', price: 80 },

  // 7. بروتين كوكتيل (Protein Cocktail) - Base Price + Protein Options
  { id: 'prot-mass', categoryId: 'protein-cocktail', nameAr: 'ماس', description: 'موز - زبدة فول - حليب - شوفان', price: 65, proteinOptions: defaultProteinOptions },
  { id: 'prot-lean-dessert', categoryId: 'protein-cocktail', nameAr: 'لين ديزرت', description: 'فراولة - موز - زبدة فول سوداني - حليب - واي بروتين', price: 70, proteinOptions: defaultProteinOptions },
  { id: 'prot-whats-whey', categoryId: 'protein-cocktail', nameAr: 'واتس واي', description: 'حليب - موز - توت أحمر - زبدة فول سوداني - تمر - واي بروتين', price: 70, proteinOptions: defaultProteinOptions },
  { id: 'prot-juice-time', categoryId: 'protein-cocktail', nameAr: 'عصير تايم', description: 'حليب - توت أزرق - توت أحمر - موز - أفوكادو - شوفان - واي بروتين', price: 75, proteinOptions: defaultProteinOptions },
  { id: 'prot-nitricore', categoryId: 'protein-cocktail', nameAr: 'نايتركور', description: 'فراولة - آيس كريم - شوفان - أفوكادو - حليب - واي بروتين', price: 75, proteinOptions: defaultProteinOptions },
  { id: 'prot-kamkon', categoryId: 'protein-cocktail', nameAr: 'كمكون', description: 'أفوكادو - زبادي - جوز هند - توت أحمر - قرفة - واي بروتين', price: 75, proteinOptions: defaultProteinOptions },
  { id: 'prot-vehgra', categoryId: 'protein-cocktail', nameAr: 'فيهجرة', description: 'أفوكادو - حليب - كريمة - عسل أبيض - جرجير - كيوي', price: 85, proteinOptions: defaultProteinOptions },

  // 8. عوار قلب (Awar Qalb) - Fixed Single Price
  { id: 'aq-crystal', categoryId: 'awar-qalb', nameAr: 'كريستال', description: 'كانتلوب - عصير مانجو - آيس كريم - حليب', price: 65, image: '/img/3.jpg' },
  { id: 'aq-samdo', categoryId: 'awar-qalb', nameAr: 'صمدو', description: 'أفوكادو - ايس كريم - مانجو - فرولة', price: 85, image: '/img/3.jpg' },
  { id: 'aq-sunshine-day', categoryId: 'awar-qalb', nameAr: 'صن شاين داي', description: 'فراولة - خوخ - زبادي - كريمة لباني', price: 60 },
  { id: 'aq-isfahani', categoryId: 'awar-qalb', nameAr: 'اصفهاني', description: 'مانجو - فرولة - حليب - زبادي - توت', price: 65 },
  { id: 'aq-juice-g', categoryId: 'awar-qalb', nameAr: 'عصير جي', description: 'مانجو - فرولة - حليب - جوافة', price: 65 },
  { id: 'aq-pineapple-kali', categoryId: 'awar-qalb', nameAr: 'أناناس كالي', description: 'أناناس - موز - زبادي - عسل - زبدة فول سوداني', price: 65 },
  { id: 'aq-paradise', categoryId: 'awar-qalb', nameAr: 'برادايس', description: 'ايس كريم - فراولة - موز - قشطة - كيوي', price: 75 },
  { id: 'aq-jamaica', categoryId: 'awar-qalb', nameAr: 'جاميكا', description: 'ايس كريم - فانيليا - عصير مانجو', price: 65 },
  { id: 'aq-blueberry', categoryId: 'awar-qalb', nameAr: 'بلوبيري', description: 'أفوكادو - توت أزرق - مانجو - عسل - جوز هند - حليب', price: 70 },
  { id: 'aq-awar-qalb', categoryId: 'awar-qalb', nameAr: 'عوار قلب', description: 'مانجو - آيس كريم - حليب - فراولة', price: 65 },
  { id: 'aq-anaisy-pro', categoryId: 'awar-qalb', nameAr: 'عنائسي برو', description: 'مانجو - بلح - حلاوة - حليب - مكسرات', price: 80 },
  { id: 'aq-signature', categoryId: 'awar-qalb', nameAr: 'سجنتشر', description: 'مانجو قطع - أفوكادو - فراولة - برادايس - حب رمان', price: 80 },
  { id: 'aq-shabab', categoryId: 'awar-qalb', nameAr: 'شباب', description: 'بلح - آيس كريم - حليب', price: 65 },
  { id: 'aq-modamer', categoryId: 'awar-qalb', nameAr: 'المدمر', description: 'أفوكادو - كيوي - قطع تفاح - مكسرات - موز', price: 85 },
  { id: 'aq-akher-kalam', categoryId: 'awar-qalb', nameAr: 'آخر كلام', description: 'آيس كريم - صوص بستاشيو - مارشملو', price: 75 },

  // 9. ميكسات سوفت آيس كريم (Soft Ice Cream Mixes) - Fixed Items
  { id: 'sic-ice-fruit', categoryId: 'soft-ice-cream', nameAr: 'آيس فروت', description: 'آيس كريم - فروت سلاط - مانجو - موز', price: 60, image: '/img/teremassoo.jpg' },
  { id: 'sic-mangawi', categoryId: 'soft-ice-cream', nameAr: 'منجاوي', description: 'آيس كريم - قطع مانجو - عصير مانجو', price: 60 },
  { id: 'sic-soft-oreo', categoryId: 'soft-ice-cream', nameAr: 'سوفت أوريو', description: 'آيس كريم فانيليا - صوص شوكولاته - ويتش أوريو', price: 70 },
  { id: 'sic-soft-caramel', categoryId: 'soft-ice-cream', nameAr: 'سوفت كراميل', description: 'آيس كريم فانيليا - صوص كراميل - ويتش كراميل', price: 70 },
  { id: 'sic-soft-lotus-caramel', categoryId: 'soft-ice-cream', nameAr: 'سوفت لوتس كراميل', description: 'آيس كريم فانيليا - صوص مكس - ويتش لوتس', price: 70 },
  { id: 'sic-kaza', categoryId: 'soft-ice-cream', nameAr: 'كازا', description: 'آيس كريم فانيليا - قطع مانجو - كريمه - كيوي', price: 70 },
  { id: 'sic-shaker', categoryId: 'soft-ice-cream', nameAr: 'شيكر', description: 'آيس كريم شوكولاته - عوارقلب - أوريو', price: 70 },
  { id: 'sic-lago', categoryId: 'soft-ice-cream', nameAr: 'لاجو', description: 'آيس كريم فانيليا - قطع فراولة - فرولة بيري', price: 70 },
  { id: 'sic-ghareqni', categoryId: 'soft-ice-cream', nameAr: 'غرقني', description: 'آيس كريم فانيليا - قطع فواكه - مكسرات', price: 70 },
  { id: 'sic-stop-watch', categoryId: 'soft-ice-cream', nameAr: 'أستوب وتِش', description: 'آيس كريم فانيليا - قطع فواكه - كت كات - عصير مانجو', price: 70 },
  { id: 'sic-ibn-battuta', categoryId: 'soft-ice-cream', nameAr: 'أبن بطوطة', description: 'مانجو - فراولة - آيس كريم فانيليا - كيوي', price: 65 },
  { id: 'sic-taco', categoryId: 'soft-ice-cream', nameAr: 'تاكو آيس كريم', price: 50 },
  { id: 'sic-small-scoop', categoryId: 'soft-ice-cream', nameAr: 'بولة صغيرة', price: 20 },
  { id: 'sic-large-scoop', categoryId: 'soft-ice-cream', nameAr: 'بولة كبيرة', price: 30 },
  { id: 'sic-small-biscuit', categoryId: 'soft-ice-cream', nameAr: 'بسكوته صغيرة', price: 25 },

  // 10. فانز كوكتيل (Fans Cocktail) - 7 Products
  { id: 'fc-sunrise', categoryId: 'fans-cocktail', nameAr: 'صن رايز', description: 'برتقال - خوخ - جراندين - كريز', price: 50, image: '/img/1.jpg' },
  { id: 'fc-florida', categoryId: 'fans-cocktail', nameAr: 'فلوردا', description: 'مانجو - جوافة - برتقال - جراندين', price: 50 },
  { id: 'fc-pina-colada', categoryId: 'fans-cocktail', nameAr: 'بيناكولادا', description: 'أناناس - جوز هند - حليب - أناناس فريش', price: 60 },
  { id: 'fc-love-flow', categoryId: 'fans-cocktail', nameAr: 'لاف فلو', description: 'فراولة - موز - كريمة - جوز هند - أناناس', price: 60 },
  { id: 'fc-my-dream', categoryId: 'fans-cocktail', nameAr: 'ماي دريم', description: 'موز - أناناس - فراولة - حليب', price: 60 },
  { id: 'fc-cocktail-lion', categoryId: 'fans-cocktail', nameAr: 'كوكتيل لايون', description: 'برتقال - أناناس - مانجو - كيوي', price: 65 },
  { id: 'fc-entash', categoryId: 'fans-cocktail', nameAr: 'أنتعاش', description: 'فراولة - بطيخ - كيوي', price: 60 },

  // 11. زبادي عصير تايم (Juice Time Yogurt) - 1 Product with 7 Flavors & Dual Size
  {
    id: 'yogurt-juice-time',
    categoryId: 'juice-time-yogurt',
    nameAr: 'زبادي عصيرتايم',
    nameEn: 'Juice Time Yogurt',
    description: 'اختر نكهة الزبادي المفضلة لديك',
    sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }],
    flavors: ['مانجو', 'فراولة', 'عسل', 'ميكس فواكه', 'موز', 'سوداني حليب', 'بلح حليب'],
    image: '/img/1.jpg',
  },

  // 12. مشروبات غازية (Mojitos & Sodas) - 9 Products
  { id: 'sd-mojito', categoryId: 'soft-drinks', nameAr: 'موخيتو', description: 'صودا / ليمون / نعناع / موخيتو', price: 45, image: '/img/back2.jpg' },
  { id: 'sd-mojito-classic', categoryId: 'soft-drinks', nameAr: 'موخيتو كلاسيك', description: 'صودا / ليمون / نعناع سيرب / موخيتو', price: 45 },
  { id: 'sd-blue-hawaii', categoryId: 'soft-drinks', nameAr: 'بلوهواي', description: 'سبرايت / أناناس / بلوعروسو', price: 50 },
  { id: 'sd-mojito-blue', categoryId: 'soft-drinks', nameAr: 'موخيتو بلو', description: 'صودا / ليمون / نعناع / بلو كرواسو', price: 45 },
  { id: 'sd-mojito-flavor', categoryId: 'soft-drinks', nameAr: 'موخيتو طعم', description: 'فرولة / مانجو / بلوبيري / رسبيري / كيوى', price: 50 },
  { id: 'sd-mojito-redbull', categoryId: 'soft-drinks', nameAr: 'موخيتو ريد بول', description: 'ليمون / نعناع / ريد بول / موخيتو', price: 65 },
  { id: 'sd-lemonade', categoryId: 'soft-drinks', nameAr: 'ماي فيفوريروت ليمونيد', description: 'ليمون / صودا / فرولة / خوخ', price: 45 },
  { id: 'sd-sky', categoryId: 'soft-drinks', nameAr: 'إسكاي', description: 'ريدبول - تفاح / أناناس - بلوعروسو', price: 65 },
  { id: 'sd-mango-tango', categoryId: 'soft-drinks', nameAr: 'مانجو تانجو', description: 'مانجو / برتقال / ريد بول', price: 60 },

  // 13. اسموزي (Smoothies) - 14 Products
  { id: 'sm-lemon', categoryId: 'smoothies', nameAr: 'اسموزي ليمون', price: 50, image: '/img/اسموزى.jpg' },
  { id: 'sm-lemon-mint', categoryId: 'smoothies', nameAr: 'اسموزي ليمون نعناع', price: 50 },
  { id: 'sm-watermelon', categoryId: 'smoothies', nameAr: 'اسموزي بطيخ', price: 50 },
  { id: 'sm-cantaloupe', categoryId: 'smoothies', nameAr: 'اسموزي كانتالوب', price: 50 },
  { id: 'sm-strawberry', categoryId: 'smoothies', nameAr: 'اسموزي فراولة', price: 50 },
  { id: 'sm-mango', categoryId: 'smoothies', nameAr: 'اسموزي مانجو', price: 50 },
  { id: 'sm-mango-strawberry', categoryId: 'smoothies', nameAr: 'اسموزي مانجو فراولة', price: 50 },
  { id: 'sm-berry-pomegranate', categoryId: 'smoothies', nameAr: 'اسموزي توت رمان', price: 50 },
  { id: 'sm-juice-time', categoryId: 'smoothies', nameAr: 'اسموزي عصيرتايم', description: 'كيوى - فراولة - مانجو - توت', price: 60 },
  { id: 'sm-kiwi', categoryId: 'smoothies', nameAr: 'اسموزي كيوي', price: 60 },
  { id: 'sm-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي أناناس', price: 60 },
  { id: 'sm-kiwi-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي كيوي أناناس', price: 60 },
  { id: 'sm-orange-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي برتقال أناناس', price: 60 },
  { id: 'sm-berry', categoryId: 'smoothies', nameAr: 'اسموزي توت', price: 60 },

  // 14. آيس كوفي (Iced Coffee) - 11 Products
  { id: 'ic-coffee', categoryId: 'iced-coffee', nameAr: 'Ice coffee', price: 55, image: '/img/8.jpg' },
  { id: 'ic-latte', categoryId: 'iced-coffee', nameAr: 'Ice latte', price: 60 },
  { id: 'ic-caramel-frappuccino', categoryId: 'iced-coffee', nameAr: 'Caramel Frappuccino', price: 60 },
  { id: 'ic-mocha-frappuccino', categoryId: 'iced-coffee', nameAr: 'Mocha Frappuccino', price: 60 },
  { id: 'ic-toffee-nut', categoryId: 'iced-coffee', nameAr: 'Toffe nut coffee', price: 60 },
  { id: 'ic-white-lotus', categoryId: 'iced-coffee', nameAr: 'White Lotus Coffee', price: 65 },
  { id: 'ic-snow-white', categoryId: 'iced-coffee', nameAr: 'Snow whit farppichino', price: 55 },
  { id: 'ic-pumpkin-spice', categoryId: 'iced-coffee', nameAr: 'Pumpkine spice latte', price: 65 },
  { id: 'ic-matcha-macchiato', categoryId: 'iced-coffee', nameAr: 'Matcha machitao', price: 55 },
  { id: 'ic-oreo-matcha', categoryId: 'iced-coffee', nameAr: 'Oreo matcha farppichino', price: 60 },
  { id: 'ic-caramel-macchiato', categoryId: 'iced-coffee', nameAr: 'Carmel Coffe machitao', price: 60 },

  // 15. وافلز (Waffles) - 4 Products
  { id: 'wf-nutella', categoryId: 'waffles', nameAr: 'وافلز نوتيلا', price: 60, image: '/img/b1.jpg' },
  { id: 'wf-kitkat', categoryId: 'waffles', nameAr: 'وافلز كيت كات', description: 'جلاكسي - كندر', price: 75 },
  { id: 'wf-fruits', categoryId: 'waffles', nameAr: 'وافلز فواكه', price: 70 },
  { id: 'wf-juice-time', categoryId: 'waffles', nameAr: 'وافلز عصير تايم', price: 70 },

  // 16. ميني بان كيك (Mini Pancakes) - 3 Products
  { id: 'mp-small', categoryId: 'mini-pancakes', nameAr: 'ميني بان كيك صغير', price: 50, image: '/img/b1.jpg' },
  { id: 'mp-large', categoryId: 'mini-pancakes', nameAr: 'ميني بان كيك كبير', price: 60 },
  { id: 'mp-mix-cake', categoryId: 'mini-pancakes', nameAr: 'ميكس ميني كيك', description: 'قطع مانجو + نوتيلا', price: 65 },

  // 17. حلواني (Sweets & Cakes) - 8 Products
  { id: 'sw-red-velvet', categoryId: 'sweets', nameAr: 'ريد فليفت', price: 65, image: '/img/ام على.jpg' },
  { id: 'sw-cheesecake', categoryId: 'sweets', nameAr: 'تشيز كيك', price: 65 },
  { id: 'sw-tajn-nutella', categoryId: 'sweets', nameAr: 'طاجن نوتيلا', price: 60 },
  { id: 'sw-tajn-oreo', categoryId: 'sweets', nameAr: 'طاجن اوريو', price: 60 },
  { id: 'sw-tajn-lotus', categoryId: 'sweets', nameAr: 'طاجن لوتس', price: 60 },
  { id: 'sw-despacito', categoryId: 'sweets', nameAr: 'ديسباسيتو', price: 50 },
  { id: 'sw-molten-cake', categoryId: 'sweets', nameAr: 'مولتن كيك', price: 60 },
  { id: 'sw-qashtouta', categoryId: 'sweets', nameAr: 'قشطوطه', description: 'نوتيلا - لوتس - مانجو - أوريو - ميكس', price: 75 },

  // 18. أرز بلبن (Rice Pudding) - 5 Products
  { id: 'rp-plain', categoryId: 'rice-pudding', nameAr: 'ارز بالبن سادة', price: 35, image: '/img/ام على.jpg' },
  { id: 'rp-mango', categoryId: 'rice-pudding', nameAr: 'أرز بالبن مانجو', price: 45 },
  { id: 'rp-lotus', categoryId: 'rice-pudding', nameAr: 'أرز بالبن لوتس', price: 45 },
  { id: 'rp-nuts', categoryId: 'rice-pudding', nameAr: 'أرز بالبن مكسرات', price: 50 },
  { id: 'rp-icecream', categoryId: 'rice-pudding', nameAr: 'ارز بالبن ايس كريم', price: 50 },

  // 19. مشروبات ساخنة (Hot Drinks) - 7 Products
  { id: 'hd-tea', categoryId: 'hot-drinks', nameAr: 'شاي', price: 20, image: '/img/8.jpg' },
  { id: 'hd-tea-milk', categoryId: 'hot-drinks', nameAr: 'شاي بالحليب', price: 30 },
  { id: 'hd-herbs', categoryId: 'hot-drinks', nameAr: 'أعشاب', description: 'ينسون - كركديه - قرفة - زنجبيل', price: 20 },
  { id: 'hd-cinnamon-milk', categoryId: 'hot-drinks', nameAr: 'قرفة بالحليب / زنجبيل بالحليب', price: 30 },
  { id: 'hd-vitamin-c', categoryId: 'hot-drinks', nameAr: 'فيتامين سي', description: 'ينسون - نعناع - ليمون - عسل - زنجبيل', price: 35 },
  { id: 'hd-hot-cider', categoryId: 'hot-drinks', nameAr: 'هوت سيدر', price: 40 },
  { id: 'hd-pineapple-spice', categoryId: 'hot-drinks', nameAr: 'Pinapple Spice', price: 50 },

  // 20. الركن الشتوي (Winter Corner) - 10 Products
  { id: 'wc-sahlab-plain', categoryId: 'winter-corner', nameAr: 'سحلب عادي', price: 40, image: '/img/ام على.jpg' },
  { id: 'wc-sahlab-nuts', categoryId: 'winter-corner', nameAr: 'سحلب مكسرات', price: 50 },
  { id: 'wc-sahlab-nutella', categoryId: 'winter-corner', nameAr: 'سحلب نوتيلا ومكسرات', price: 55 },
  { id: 'wc-sahlab-fruits', categoryId: 'winter-corner', nameAr: 'سحلب فواكه', price: 55 },
  { id: 'wc-sahlab-juicetime', categoryId: 'winter-corner', nameAr: 'سحلب عصيرتايم', price: 55 },
  { id: 'wc-om-ali-plain', categoryId: 'winter-corner', nameAr: 'أم علي سادة', price: 45 },
  { id: 'wc-om-ali-nuts', categoryId: 'winter-corner', nameAr: 'أم علي مكسرات', price: 55 },
  { id: 'wc-belila-plain', categoryId: 'winter-corner', nameAr: 'بليله بلبن سادة', price: 55 },
  { id: 'wc-belila-nuts', categoryId: 'winter-corner', nameAr: 'بليله بلبن مكسرات', price: 50 },
  { id: 'wc-hummus-el-sham', categoryId: 'winter-corner', nameAr: 'حمص الشام', price: 35 },

  // 21. القهوة (Coffee) - 19 Products
  { id: 'cff-turkish-plain', categoryId: 'coffee', nameAr: 'قهوة تركي سادة', description: 'فاتح / غامق', price: 40, image: '/img/8.jpg' },
  { id: 'cff-turkish-spiced', categoryId: 'coffee', nameAr: 'قهوة تركي محوج', description: 'فاتح / غامق', price: 40 },
  { id: 'cff-french', categoryId: 'coffee', nameAr: 'قهوة فرنسي', price: 45 },
  { id: 'cff-hazelnut', categoryId: 'coffee', nameAr: 'قهوة بندق', price: 45 },
  { id: 'cff-american', categoryId: 'coffee', nameAr: 'أمريكان كوفي', price: 40 },
  { id: 'cff-nescafe-black', categoryId: 'coffee', nameAr: 'نسكافيه بلاك', price: 30 },
  { id: 'cff-nescafe-milk', categoryId: 'coffee', nameAr: 'نسكافيه حليب', price: 45 },
  { id: 'cff-espresso', categoryId: 'coffee', nameAr: 'اسبريسو', price: 45 },
  { id: 'cff-latte', categoryId: 'coffee', nameAr: 'لاتيه', price: 55 },
  { id: 'cff-macchiato', categoryId: 'coffee', nameAr: 'ماكياتو', price: 50 },
  { id: 'cff-flat-white', categoryId: 'coffee', nameAr: 'فلات وايت', price: 50 },
  { id: 'cff-mocha', categoryId: 'coffee', nameAr: 'موكا', price: 50 },
  { id: 'cff-hot-chocolate', categoryId: 'coffee', nameAr: 'هوت شوكليت', price: 50 },
  { id: 'cff-cappuccino', categoryId: 'coffee', nameAr: 'كابتشينو', price: 60 },
  { id: 'cff-caramel-hot-choc', categoryId: 'coffee', nameAr: 'كراميل هوت شوكليت', price: 55 },
  { id: 'cff-hot-lotus', categoryId: 'coffee', nameAr: 'هوت لوتس كافيه', price: 60 },
  { id: 'cff-pumpkin-hot', categoryId: 'coffee', nameAr: 'Pumpkine Hot Coffe', price: 65 },
  { id: 'cff-redbull-can', categoryId: 'coffee', nameAr: 'كانز ريد بول', price: 65 },
  { id: 'cff-mineral-water', categoryId: 'coffee', nameAr: 'مياه معدنية', price: 5 },
];

// Dynamically attach backward-compatibility getters to all items
products.forEach((p) => {
  p.name = p.nameAr;
  p.desc = p.description || (p.sizes ? `كباية: ${p.sizes[0]?.price} ج.م | لتر: ${p.sizes[1]?.price} ج.م` : undefined);
  p.category = p.categoryId;
  p.iconUrl = p.image || '/img/logo.jpg';

  // Fallback price string for current ProductCard rendering
  if (p.price !== undefined) {
    (p as unknown as { price: string | number }).price = String(p.price);
  } else if (p.sizes && p.sizes.length > 0) {
    (p as unknown as { price: string | number }).price = `${p.sizes[0].price} (كباية) / ${p.sizes[1]?.price} (لتر)`;
  }
});