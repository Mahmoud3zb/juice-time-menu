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
  { id: 'fj-mango', categoryId: 'fresh-juices', nameAr: 'مانجو', nameEn: 'Mango', description: 'عصير مانجو طبيعي فريش 100% غني بالطعم الاستوائي المنعش', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }], image: '/img/مانجا.jpg' },
  { id: 'fj-strawberry', categoryId: 'fresh-juices', nameAr: 'فراولة', nameEn: 'Strawberry', description: 'عصير فراولة طبيعي فريش غني بالمذاق الحلو المنعش', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }], image: '/img/1.jpg' },
  { id: 'fj-guava', categoryId: 'fresh-juices', nameAr: 'جوافة', nameEn: 'Guava', description: 'عصير جوافة فريش طبيعي غني بالنكهة اللذيذة', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-banana', categoryId: 'fresh-juices', nameAr: 'موز', nameEn: 'Banana', description: 'عصير موز طبيعي طازج كريمي غني بالطاقة', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-cantaloupe', categoryId: 'fresh-juices', nameAr: 'كانتلوب', nameEn: 'Cantaloupe', description: 'عصير كانتلوب طبيعي فريش بارد ولطيف', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-grape', categoryId: 'fresh-juices', nameAr: 'عنب', nameEn: 'Grape', description: 'عصير عنب طبيعي فريش غني بالفوائد والانتعاش', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-watermelon', categoryId: 'fresh-juices', nameAr: 'بطيخ', nameEn: 'Watermelon', description: 'عصير بطيخ أحمر طبيعي منشط وبارد للصيف', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-peach', categoryId: 'fresh-juices', nameAr: 'خوخ', nameEn: 'Peach', description: 'عصير خوخ طبيعي فريش بنكهة استوائية ساحرة', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-prickly-pear', categoryId: 'fresh-juices', nameAr: 'تين شوكي', nameEn: 'Prickly Pear', description: 'عصير تين شوكي طبيعي فريش بارد وممتزج بالانتعاش', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-pomegranate', categoryId: 'fresh-juices', nameAr: 'رمان', nameEn: 'Pomegranate', description: 'عصير رمان طبيعي فريش غني بالمذاق الرفيع والفوائد', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-orange', categoryId: 'fresh-juices', nameAr: 'برتقال', nameEn: 'Orange', description: 'عصير برتقال فريش طبيعي 100% مليء بفيتامين سي', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-lemon', categoryId: 'fresh-juices', nameAr: 'ليمون', nameEn: 'Lemon', description: 'عصير ليمون طبيعي فريش بارد ومنعش', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-lemon-mint', categoryId: 'fresh-juices', nameAr: 'ليمون نعناع', nameEn: 'Lemon Mint', description: 'مزيج الليمون الفريش المنعش مع أوراق النعناع الطازجة', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-carrot', categoryId: 'fresh-juices', nameAr: 'جزر', nameEn: 'Carrot', description: 'عصير جزر طبيعي طازج مغذي ومفيد جداً', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },

  // 2. فواكه مستوردة (Imported Fruits) - Dual Size: كباية (60) / لتر (120)
  { id: 'imp-pineapple', categoryId: 'imported-fruits', nameAr: 'أناناس', nameEn: 'Pineapple', description: 'عصير أناناس استوائي طبيعي طازج منعش', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }], image: '/img/اناناس.jpg' },
  { id: 'imp-kiwi', categoryId: 'imported-fruits', nameAr: 'كيوى', nameEn: 'Kiwi', description: 'عصير كيوي طبيعي فريش غني بالفيتامينات', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-cherry', categoryId: 'imported-fruits', nameAr: 'كريز لبناني', nameEn: 'Lebanese Cherry', description: 'عصير كريز لبناني فاخر بطعم منعش ومميز', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-custard-apple', categoryId: 'imported-fruits', nameAr: 'قشطه', nameEn: 'Custard Apple', description: 'عصير فاكهة القشطة الطبيعي الكريمي الغني', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-berries', categoryId: 'imported-fruits', nameAr: 'توت', nameEn: 'Berries', description: 'عصير توت طبيعي فريش غني بالنكهات الغنية', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'imp-apple', categoryId: 'imported-fruits', nameAr: 'تفاح', nameEn: 'Apple', description: 'عصير تفاح طبيعي فريش صافي ولذيذ', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },

  // 3. ميكسات أفوكادو (Avocado Mixes) - Dual Size
  { id: 'avo-plain', categoryId: 'avocado-mixes', nameAr: 'افوكادو سادة', description: 'مزيج أفوكادو طبيعي كريمي غني بالطاقة', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 115 }] },
  { id: 'avo-cream', categoryId: 'avocado-mixes', nameAr: 'افوكادو قشطه', description: 'أفوكادو طبيعي كريمي مع القشطة البلدي الغنية', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'avo-nuts', categoryId: 'avocado-mixes', nameAr: 'افوكادو مكسرات', description: 'أفوكادو كريمي مزين بأجود المكسرات المحمصة', sizes: [{ name: 'كباية', price: 90 }, { name: 'لتر', price: 180 }] },
  { id: 'avo-dates-nuts', categoryId: 'avocado-mixes', nameAr: 'افوكادو بلح مكسرات', description: 'مزيج الأفوكادو اللذيذ مع التمر والمكسرات الفاخرة', sizes: [{ name: 'كباية', price: 90 }, { name: 'لتر', price: 180 }] },
  { id: 'avo-dates', categoryId: 'avocado-mixes', nameAr: 'افوكادو بلح', description: 'أفوكادو طبيعي ممتاز ممتزج بالبلح التمر اللذيذ', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }] },

  // 4. ميكسات كبل (Couple Mixes) - Dual Size
  { id: 'cpl-mango-avocado', categoryId: 'couple-mixes', nameAr: 'مانجو أفوكادو', description: 'مزيج المانجو الاستوائية مع الأفوكادو الكريمي', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-strawberry-berry', categoryId: 'couple-mixes', nameAr: 'فراولة توت', description: 'كوكتيل الفراولة الطازجة مع التوت الغني', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-strawberry', categoryId: 'couple-mixes', nameAr: 'كيوي فراولة', description: 'مزيج الكيوي المنعش مع الفراولة الطبيعية', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-avocado-banana', categoryId: 'couple-mixes', nameAr: 'أفوكادو موز', description: 'مزيج الأفوكادو الغني مع الموز والحليب', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-pomegranate-berry', categoryId: 'couple-mixes', nameAr: 'رمان توت', description: 'كوكتيل الرمان الطبيعي مع التوت المشكل', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-guava', categoryId: 'couple-mixes', nameAr: 'كيوي جوافة', description: 'مزيج الكيوي المنعش مع الجوافة الطبيعية', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-mango', categoryId: 'couple-mixes', nameAr: 'كيوي مانجو', description: 'كوكتيل الكيوي مع قطع المانجو الفريش', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-kiwi-pineapple', categoryId: 'couple-mixes', nameAr: 'كيوي أناناس', description: 'مزيج الكيوي والأناناس الاستوائي المنعش', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-mango-strawberry', categoryId: 'couple-mixes', nameAr: 'مانجو فراولة', description: 'مزيج المانجو الفريش مع الفراولة الطبيعية', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 95 }] },
  { id: 'cpl-orange-pineapple', categoryId: 'couple-mixes', nameAr: 'برتقال أناناس', description: 'كوكتيل البرتقال الفريش مع الأناناس المنعش', sizes: [{ name: 'كباية', price: 55 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-mango-guava', categoryId: 'couple-mixes', nameAr: 'مانجو جوافة', description: 'مزيج المانجو الطبيعية مع الجوافة الفريش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-peach-mango', categoryId: 'couple-mixes', nameAr: 'خوخ مانجو', description: 'كوكتيل الخوخ الطبيعي مع المانجو الاستوائية', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 95 }] },
  { id: 'cpl-banana-cantaloupe', categoryId: 'couple-mixes', nameAr: 'موز كانتلوب', description: 'مزيج الموز اللذيذ مع الكانتلوب البارد', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-watermelon-cantaloupe', categoryId: 'couple-mixes', nameAr: 'بطيخ كانتلوب', description: 'كوكتيل البطيخ الأحمر مع الكانتلوب البارد', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-strawberry-plum', categoryId: 'couple-mixes', nameAr: 'فراولة برقوق', description: 'مزيج الفراولة الطبيعية مع البرقوق المنعش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },

  // 5. سلطة فواكه (Fruit Salad) - Fixed Price
  { id: 'fs-juice', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه مع العصير', description: 'قطع فواكه طازجة مشكلة مغطاة بالعصير الفريش', price: 50, image: '/img/سلطة فواكة.jpg' },
  { id: 'fs-icecream', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه آيس كريم', description: 'فواكه طازجة مشكلة مع بولة آيس كريم غنية', price: 55 },
  { id: 'fs-nuts-cream', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه مكسرات وقشطة', description: 'فواكه مشكلة مع القشطة البلدي والمكسرات المحمصة', price: 55 },
  { id: 'fs-bomb', categoryId: 'fruit-salad', nameAr: 'سلطة فواكه عصير تايم (قنبلة)', description: 'قنبلة الفواكه الخاصة مع الآيس كريم والقشطة والمكسرات', price: 75 },

  // 6. ميلك شيك (Milk Shake) - Fixed Single Price
  { id: 'ms-fruits', categoryId: 'milkshake', nameAr: 'ميلك شيك فواكه', description: 'مانجو - كيوي - موز - فراولة', price: 70 },
  { id: 'ms-redberry', categoryId: 'milkshake', nameAr: 'ميلك شيك ريدبيري', description: 'ميلك شيك كريمي غني بنكهة التوت الأحمر', price: 70 },
  { id: 'ms-blueberry', categoryId: 'milkshake', nameAr: 'ميلك شيك بلوبيري', description: 'ميلك شيك كريمي غني بنكهة التوت الأزرق', price: 70 },
  { id: 'ms-vanilla', categoryId: 'milkshake', nameAr: 'ميلك شيك فانيليا', description: 'ميلك شيك فانيليا كلاسيكي غني ولذيذ', price: 70 },
  { id: 'ms-cerelac', categoryId: 'milkshake', nameAr: 'ميلك شيك سيريلاك (أطفال)', description: 'ميلك شيك مغذي ومميز بنكهة السيريلاك', price: 70 },
  { id: 'ms-kitkat', categoryId: 'milkshake', nameAr: 'ميلك شيك كيت كات', description: 'ميلك شيك مع قطع شوكولاتة كيت كات المقرمشة', price: 70 },
  { id: 'ms-mega', categoryId: 'milkshake', nameAr: 'ميلك شيك ميجا', description: 'ميلك شيك ميجا غني بالشوكولاتة والآيس كريم', price: 70 },
  { id: 'ms-snickers', categoryId: 'milkshake', nameAr: 'ميلك شيك سنيكرز', description: 'ميلك شيك مع قطع سنيكرز وزبدة الفول السوداني', price: 70 },
  { id: 'ms-nutella', categoryId: 'milkshake', nameAr: 'ميلك شيك نوتيلا', description: 'ميلك شيك غني بشوكولاتة النوتيلا الأصلي', price: 70 },
  { id: 'ms-twix', categoryId: 'milkshake', nameAr: 'ميلك شيك تويكس ماتس', description: 'ميلك شيك غني بالشوكولاتة والكراميل والبسكويت', price: 70 },
  { id: 'ms-kinder', categoryId: 'milkshake', nameAr: 'ميلك شيك نوتي كيندر', description: 'ميلك شيك ناعم بنكهة كيندر والشوكولاتة البيضاء', price: 70 },
  { id: 'ms-yogurt-berry', categoryId: 'milkshake', nameAr: 'ميلك شيك زبادي توت', description: 'مزيج الميلك الشيك الكريمي مع الزبادي والتوت', price: 70 },
  { id: 'ms-lotus', categoryId: 'milkshake', nameAr: 'ميلك شيك لوتس', description: 'ميلك شيك فاخر بنكهة زبدة وبسكويت اللوتس', price: 80 },
  { id: 'ms-cashew', categoryId: 'milkshake', nameAr: 'ميلك شيك كاجو', description: 'ميلك شيك غني بالكاجو المحمص والآيس كريم', price: 80 },
  { id: 'ms-jojo', categoryId: 'milkshake', nameAr: 'عصير جوجو', description: 'مزيج مميز غني بالفواكه والميلك شيك الكريمي', price: 80 },

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
  { id: 'sic-taco', categoryId: 'soft-ice-cream', nameAr: 'تاكو آيس كريم', description: 'تاكو آيس كريم مقرمش محشو بالآيس كريم والصوص', price: 50 },
  { id: 'sic-small-scoop', categoryId: 'soft-ice-cream', nameAr: 'بولة صغيرة', description: 'بولة آيس كريم صغيرة من نكهتك المفضلة', price: 20 },
  { id: 'sic-large-scoop', categoryId: 'soft-ice-cream', nameAr: 'بولة كبيرة', description: 'بولة آيس كريم كبيرة غنية ولذيذة', price: 30 },
  { id: 'sic-small-biscuit', categoryId: 'soft-ice-cream', nameAr: 'بسكوته صغيرة', description: 'بسكوتة آيس كريم صغيرة مقرمشة', price: 25 },

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
    description: 'مزيج الزبادي الفريش المنعش مع الفواكه والعسل',
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
  { id: 'sm-lemon', categoryId: 'smoothies', nameAr: 'اسموزي ليمون', description: 'اسموزي ليمون منعش بارد جداً', price: 50, image: '/img/اسموزى.jpg' },
  { id: 'sm-lemon-mint', categoryId: 'smoothies', nameAr: 'اسموزي ليمون نعناع', description: 'اسموزي ليمون بالنعناع الطازج المضروب بالثلج', price: 50 },
  { id: 'sm-watermelon', categoryId: 'smoothies', nameAr: 'اسموزي بطيخ', description: 'اسموزي البطيخ البارد المنعش للصيف', price: 50 },
  { id: 'sm-cantaloupe', categoryId: 'smoothies', nameAr: 'اسموزي كانتالوب', description: 'اسموزي الكانتلوب البارد اللذيذ', price: 50 },
  { id: 'sm-strawberry', categoryId: 'smoothies', nameAr: 'اسموزي فراولة', description: 'اسموزي فراولة طبيعي مثلج', price: 50 },
  { id: 'sm-mango', categoryId: 'smoothies', nameAr: 'اسموزي مانجو', description: 'اسموزي مانجو استوائي بارد منعش', price: 50 },
  { id: 'sm-mango-strawberry', categoryId: 'smoothies', nameAr: 'اسموزي مانجو فراولة', description: 'مزيج اسموزي المانجو والفراولة المثلجة', price: 50 },
  { id: 'sm-berry-pomegranate', categoryId: 'smoothies', nameAr: 'اسموزي توت رمان', description: 'اسموزي غني بنكهات التوت والرمان الطبيعي', price: 50 },
  { id: 'sm-juice-time', categoryId: 'smoothies', nameAr: 'اسموزي عصيرتايم', description: 'كيوى - فراولة - مانجو - توت', price: 60 },
  { id: 'sm-kiwi', categoryId: 'smoothies', nameAr: 'اسموزي كيوي', description: 'اسموزي كيوي منعش غني بالفوائد', price: 60 },
  { id: 'sm-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي أناناس', description: 'اسموزي أناناس استوائي مثلج', price: 60 },
  { id: 'sm-kiwi-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي كيوي أناناس', description: 'اسموزي الكيوي والأناناس المثلج المنعش', price: 60 },
  { id: 'sm-orange-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي برتقال أناناس', description: 'اسموزي البرتقال الفريش والأناناس المثلج', price: 60 },
  { id: 'sm-berry', categoryId: 'smoothies', nameAr: 'اسموزي توت', description: 'اسموزي التوت الطبيعي غني بالنكهات', price: 60 },

  // 14. آيس كوفي (Iced Coffee) - 11 Products
  { id: 'ic-coffee', categoryId: 'iced-coffee', nameAr: 'Ice coffee', description: 'قهوة مثلجة كلاسيكية باردة ومنعشة', price: 55, image: '/img/8.jpg' },
  { id: 'ic-latte', categoryId: 'iced-coffee', nameAr: 'Ice latte', description: 'آيس لاتيه غني بالحليب والاسبريسو البارد', price: 60 },
  { id: 'ic-caramel-frappuccino', categoryId: 'iced-coffee', nameAr: 'Caramel Frappuccino', description: 'فرابوتشينو مثلج بصوص الكراميل اللذيذ', price: 60 },
  { id: 'ic-mocha-frappuccino', categoryId: 'iced-coffee', nameAr: 'Mocha Frappuccino', description: 'فرابوتشينو مثلج بالشوكولاتة والاسبريسو', price: 60 },
  { id: 'ic-toffee-nut', categoryId: 'iced-coffee', nameAr: 'Toffe nut coffee', description: 'قهوة مثلجة بنكهة التوفي والمكسرات الغنية', price: 60 },
  { id: 'ic-white-lotus', categoryId: 'iced-coffee', nameAr: 'White Lotus Coffee', description: 'قهوة مثلجة بلمسة اللوتس والشوكولاتة البيضاء', price: 65 },
  { id: 'ic-snow-white', categoryId: 'iced-coffee', nameAr: 'Snow whit farppichino', description: 'فرابوتشينو أبيض كريمي بارد ومنعش', price: 55 },
  { id: 'ic-pumpkin-spice', categoryId: 'iced-coffee', nameAr: 'Pumpkine spice latte', description: 'آيس لاتيه بنكهة اليقطين والتوابل الدافئة المثلجة', price: 65 },
  { id: 'ic-matcha-macchiato', categoryId: 'iced-coffee', nameAr: 'Matcha machitao', description: 'ماتشا ماكياتو باردة مغذية ومميزة', price: 55 },
  { id: 'ic-oreo-matcha', categoryId: 'iced-coffee', nameAr: 'Oreo matcha farppichino', description: 'فرابوتشينو الماتشا المثلج مع قطع الأوريو', price: 60 },
  { id: 'ic-caramel-macchiato', categoryId: 'iced-coffee', nameAr: 'Carmel Coffe machitao', description: 'كراميل ماكياتو بارد غني بصوص الكراميل', price: 60 },

  // 15. وافلز (Waffles) - 4 Products
  { id: 'wf-nutella', categoryId: 'waffles', nameAr: 'وافلز نوتيلا', description: 'وافل مقرمش طازج مغطى بشوكولاتة النوتيلا الغنية', price: 60, image: '/img/b1.jpg' },
  { id: 'wf-kitkat', categoryId: 'waffles', nameAr: 'وافلز كيت كات', description: 'جلاكسي - كندر', price: 75 },
  { id: 'wf-fruits', categoryId: 'waffles', nameAr: 'وافلز فواكه', description: 'وافل مقرمش مغطى بقطع الفواكه الطازجة والعسل', price: 70 },
  { id: 'wf-juice-time', categoryId: 'waffles', nameAr: 'وافلز عصير تايم', description: 'وافل عصير تايم الخاص المشكل بالشوكولاتة والفواكه', price: 70 },

  // 16. ميني بان كيك (Mini Pancakes) - 3 Products
  { id: 'mp-small', categoryId: 'mini-pancakes', nameAr: 'ميني بان كيك صغير', description: 'قطع ميني بان كيك هشة ولذيذة مع الصوص', price: 50, image: '/img/b1.jpg' },
  { id: 'mp-large', categoryId: 'mini-pancakes', nameAr: 'ميني بان كيك كبير', description: 'وجبة ميني بان كيك كبيرة مشكلة بالصوصات', price: 60 },
  { id: 'mp-mix-cake', categoryId: 'mini-pancakes', nameAr: 'ميكس ميني كيك', description: 'قطع مانجو + نوتيلا', price: 65 },

  // 17. حلواني (Sweets & Cakes) - 8 Products
  { id: 'sw-red-velvet', categoryId: 'sweets', nameAr: 'ريد فليفت', description: 'كيك الريد فيلفيت الهش والغني بالكريمة', price: 65, image: '/img/ام على.jpg' },
  { id: 'sw-cheesecake', categoryId: 'sweets', nameAr: 'تشيز كيك', description: 'تشيز كيك كريمي فاخر مع صوص الفراولة أو التوت', price: 65 },
  { id: 'sw-tajn-nutella', categoryId: 'sweets', nameAr: 'طاجن نوتيلا', description: 'طاجن الكيك الدافئ الغارق بشوكولاتة النوتيلا', price: 60 },
  { id: 'sw-tajn-oreo', categoryId: 'sweets', nameAr: 'طاجن اوريو', description: 'طاجن أوريو دافئ مع الكريمة الشوكولاتية', price: 60 },
  { id: 'sw-tajn-lotus', categoryId: 'sweets', nameAr: 'طاجن لوتس', description: 'طاجن لوتس غني بزبدة وبسكويت اللوتس المقرمش', price: 60 },
  { id: 'sw-despacito', categoryId: 'sweets', nameAr: 'ديسباسيتو', description: 'كيك ديسباسيتو البرازيلي الشوكولاتة الغني', price: 50 },
  { id: 'sw-molten-cake', categoryId: 'sweets', nameAr: 'مولتن كيك', description: 'مولتن كيك ساخن محشو بالشوكولاتة السائلة', price: 60 },
  { id: 'sw-qashtouta', categoryId: 'sweets', nameAr: 'قشطوطه', description: 'نوتيلا - لوتس - مانجو - أوريو - ميكس', price: 75 },

  // 18. أرز بلبن (Rice Pudding) - 5 Products
  { id: 'rp-plain', categoryId: 'rice-pudding', nameAr: 'ارز بالبن سادة', description: 'أرز باللبن البلدي الكريمي السادة طازج', price: 35, image: '/img/ام على.jpg' },
  { id: 'rp-mango', categoryId: 'rice-pudding', nameAr: 'أرز بالبن مانجو', description: 'أرز باللبن الكريمي مغطى بقطع المانجو الفريش', price: 45 },
  { id: 'rp-lotus', categoryId: 'rice-pudding', nameAr: 'أرز بالبن لوتس', description: 'أرز باللبن مغطى بزبدة وبسكويت اللوتس', price: 45 },
  { id: 'rp-nuts', categoryId: 'rice-pudding', nameAr: 'أرز بالبن مكسرات', description: 'أرز باللبن البلدي مزين بأجود المكسرات المحمصة', price: 50 },
  { id: 'rp-icecream', categoryId: 'rice-pudding', nameAr: 'ارز بالبن ايس كريم', description: 'أرز باللبن الكريمي مع بولة آيس كريم فانيليا', price: 50 },

  // 19. مشروبات ساخنة (Hot Drinks) - 7 Products
  { id: 'hd-tea', categoryId: 'hot-drinks', nameAr: 'شاي', description: 'شاي أحمر دافئ ممتاز', price: 20, image: '/img/8.jpg' },
  { id: 'hd-tea-milk', categoryId: 'hot-drinks', nameAr: 'شاي بالحليب', description: 'شاي مغلي مضبوط مضاف إليه الحليب البلدي', price: 30 },
  { id: 'hd-herbs', categoryId: 'hot-drinks', nameAr: 'أعشاب', description: 'ينسون - كركديه - قرفة - زنجبيل', price: 20 },
  { id: 'hd-cinnamon-milk', categoryId: 'hot-drinks', nameAr: 'قرفة بالحليب / زنجبيل بالحليب', description: 'مشروب القرفة أو الزنجبيل الدافئ بالحليب', price: 30 },
  { id: 'hd-vitamin-c', categoryId: 'hot-drinks', nameAr: 'فيتامين سي', description: 'ينسون - نعناع - ليمون - عسل - زنجبيل', price: 35 },
  { id: 'hd-hot-cider', categoryId: 'hot-drinks', nameAr: 'هوت سيدر', description: 'مشروب هوت سيدر التفاح الدافئ بالقرفة', price: 40 },
  { id: 'hd-pineapple-spice', categoryId: 'hot-drinks', nameAr: 'Pinapple Spice', description: 'مشروب الأناناس الدافئ بالتوابل العطرية', price: 50 },

  // 20. الركن الشتوي (Winter Corner) - 10 Products
  { id: 'wc-sahlab-plain', categoryId: 'winter-corner', nameAr: 'سحلب عادي', description: 'سحلب ساخن غني ولذيذ', price: 40, image: '/img/ام على.jpg' },
  { id: 'wc-sahlab-nuts', categoryId: 'winter-corner', nameAr: 'سحلب مكسرات', description: 'سحلب ساخن غني ومزين بالمكسرات المحمصة', price: 50 },
  { id: 'wc-sahlab-nutella', categoryId: 'winter-corner', nameAr: 'سحلب نوتيلا ومكسرات', description: 'سحلب دافئ بشوكولاتة النوتيلا والمكسرات', price: 55 },
  { id: 'wc-sahlab-fruits', categoryId: 'winter-corner', nameAr: 'سحلب فواكه', description: 'سحلب دافئ مزين بقطع الفواكه الطازجة', price: 55 },
  { id: 'wc-sahlab-juicetime', categoryId: 'winter-corner', nameAr: 'سحلب عصيرتايم', description: 'سحلب عصير تايم المشكل بالمكسرات والفواكه', price: 55 },
  { id: 'wc-om-ali-plain', categoryId: 'winter-corner', nameAr: 'أم علي سادة', description: 'أم علي دافئة بالرقاق والحليب البلدي الساخن', price: 45 },
  { id: 'wc-om-ali-nuts', categoryId: 'winter-corner', nameAr: 'أم علي مكسرات', description: 'أم علي دافئة بالرقاق والحليب والمكسرات', price: 55 },
  { id: 'wc-belila-plain', categoryId: 'winter-corner', nameAr: 'بليله بلبن سادة', description: 'بليلة دافئة بالحليب البلدي الساخن', price: 55 },
  { id: 'wc-belila-nuts', categoryId: 'winter-corner', nameAr: 'بليله بلبن مكسرات', description: 'بليلة دافئة بالحليب والمكسرات الفاخرة', price: 50 },
  { id: 'wc-hummus-el-sham', categoryId: 'winter-corner', nameAr: 'حمص الشام', description: 'حمص الشام الساخن الحار بالليمون والكمون', price: 35 },

  // 21. القهوة (Coffee) - 19 Products
  { id: 'cff-turkish-plain', categoryId: 'coffee', nameAr: 'قهوة تركي سادة', description: 'فاتح / غامق', price: 40, image: '/img/8.jpg' },
  { id: 'cff-turkish-spiced', categoryId: 'coffee', nameAr: 'قهوة تركي محوج', description: 'فاتح / غامق', price: 40 },
  { id: 'cff-french', categoryId: 'coffee', nameAr: 'قهوة فرنسي', description: 'قهوة فرنسية ناعمة بالحليب الساخن', price: 45 },
  { id: 'cff-hazelnut', categoryId: 'coffee', nameAr: 'قهوة بندق', description: 'قهوة تركي غنية بنكهة البندق العطرية', price: 45 },
  { id: 'cff-american', categoryId: 'coffee', nameAr: 'أمريكان كوفي', description: 'قهوة أمريكية سوداء صافية ومركزة', price: 40 },
  { id: 'cff-nescafe-black', categoryId: 'coffee', nameAr: 'نسكافيه بلاك', description: 'نسكافيه بلاك سادة ساخن', price: 30 },
  { id: 'cff-nescafe-milk', categoryId: 'coffee', nameAr: 'نسكافيه حليب', description: 'نسكافيه ساخن مضاف إليه الحليب', price: 45 },
  { id: 'cff-espresso', categoryId: 'coffee', nameAr: 'اسبريسو', description: 'جرعة اسبريسو إيطالية مركزة', price: 45 },
  { id: 'cff-latte', categoryId: 'coffee', nameAr: 'لاتيه', description: 'اسبريسو مع الحليب الساخن ورغوة ناعمة', price: 55 },
  { id: 'cff-macchiato', categoryId: 'coffee', nameAr: 'ماكياتو', description: 'اسبريسو مع لمسة من رغوة الحليب', price: 50 },
  { id: 'cff-flat-white', categoryId: 'coffee', nameAr: 'فلات وايت', description: 'اسبريسو مضاعف مع الحليب الساخن الناعم', price: 50 },
  { id: 'cff-mocha', categoryId: 'coffee', nameAr: 'موكا', description: 'مزيج الاسبريسو مع الشوكولاتة والحليب الساخن', price: 50 },
  { id: 'cff-hot-chocolate', categoryId: 'coffee', nameAr: 'هوت شوكليت', description: 'مشروب شوكولاتة ساخنة غنية ولذيذة', price: 50 },
  { id: 'cff-cappuccino', categoryId: 'coffee', nameAr: 'كابتشينو', description: 'اسبريسو مع الحليب ورغوة الكابتشينو الغنية', price: 60 },
  { id: 'cff-caramel-hot-choc', categoryId: 'coffee', nameAr: 'كراميل هوت شوكليت', description: 'هوت شوكليت دافئ بصوص الكراميل', price: 55 },
  { id: 'cff-hot-lotus', categoryId: 'coffee', nameAr: 'هوت لوتس كافيه', description: 'مشروب دافئ غني بزبدة وبسكويت اللوتس', price: 60 },
  { id: 'cff-pumpkin-hot', categoryId: 'coffee', nameAr: 'Pumpkine Hot Coffe', description: 'قهوة دافئة بنكهة اليقطين والتوابل العطرية', price: 65 },
  { id: 'cff-redbull-can', categoryId: 'coffee', nameAr: 'كانز ريد بول', description: 'مشروب طاقة كانز ريد بول بارد', price: 65 },
  { id: 'cff-mineral-water', categoryId: 'coffee', nameAr: 'مياه معدنية', description: 'زجاجة مياه معدنية نقية ناتشورال', price: 5 },
];

// Dynamically attach backward-compatibility getters to all items
products.forEach((p) => {
  p.name = p.nameAr;
  p.desc = p.description; // Clean natural description without hardcoded price strings
  p.category = p.categoryId;
  p.iconUrl = p.image || '/img/logo.jpg';

  // Fallback price string for current ProductCard rendering
  if (p.price !== undefined) {
    (p as unknown as { price: string | number }).price = String(p.price);
  } else if (p.sizes && p.sizes.length > 0) {
    (p as unknown as { price: string | number }).price = `${p.sizes[0].price} (كباية) / ${p.sizes[1]?.price} (لتر)`;
  }
});