export type DrinkSizeName = 'كباية' | 'لتر' | 'سنجل' | 'دبل' | string;

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

  // Used for dual-size products (كباية / لتر or سنجل / دبل)
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
    nameAr: 'موخيتو / المشروبات',
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
    nameAr: 'وافل',
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
  // 1. عصائر فريش (Fresh Juices) - Two Sizes: Cup / 1 Liter
  { id: 'fj-mango', categoryId: 'fresh-juices', nameAr: 'مانجو', nameEn: 'Mango', description: 'عصير مانجو طبيعي فريش 100% غني بالطعم الاستوائي المنعش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }], image: '/img/مانجا.jpg' },
  { id: 'fj-strawberry', categoryId: 'fresh-juices', nameAr: 'فراولة', nameEn: 'Strawberry', description: 'عصير فراولة طبيعي فريش غني بالمذاق الحلو المنعش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }], image: '/img/1.jpg' },
  { id: 'fj-guava', categoryId: 'fresh-juices', nameAr: 'جوافة', nameEn: 'Guava', description: 'عصير جوافة فريش طبيعي غني بالنكهة اللذيذة', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-banana', categoryId: 'fresh-juices', nameAr: 'موز حليب', nameEn: 'Banana Milk', description: 'عصير موز بالحليب الطبيعي كريمي وغني بالطاقة', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'fj-cantaloupe', categoryId: 'fresh-juices', nameAr: 'كانتلوب', nameEn: 'Cantaloupe', description: 'عصير كانتلوب طبيعي فريش بارد ولطيف', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-grape', categoryId: 'fresh-juices', nameAr: 'عنب', nameEn: 'Grape', description: 'عصير عنب طبيعي فريش غني بالفوائد والانتعاش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-watermelon', categoryId: 'fresh-juices', nameAr: 'بطيخ', nameEn: 'Watermelon', description: 'عصير بطيخ أحمر طبيعي منشط وبارد للصيف', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-peach', categoryId: 'fresh-juices', nameAr: 'خوخ', nameEn: 'Peach', description: 'عصير خوخ طبيعي فريش بنكهة استوائية ساحرة', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-prickly-pear', categoryId: 'fresh-juices', nameAr: 'تين شوكي', nameEn: 'Prickly Pear', description: 'عصير تين شوكي طبيعي فريش بارد وممتزج بالانتعاش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-pomegranate', categoryId: 'fresh-juices', nameAr: 'رمان', nameEn: 'Pomegranate', description: 'عصير رمان طبيعي فريش غني بالمذاق الرفيع والفوائد', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'fj-orange', categoryId: 'fresh-juices', nameAr: 'برتقال متصفى', nameEn: 'Filtered Orange', description: 'عصير برتقال طبيعي مصفى 100% مليء بفيتامين سي', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'fj-lemon', categoryId: 'fresh-juices', nameAr: 'ليمون', nameEn: 'Lemon', description: 'عصير ليمون طبيعي فريش بارد ومنعش', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-lemon-mint', categoryId: 'fresh-juices', nameAr: 'لمون نعناع', nameEn: 'Lemon Mint', description: 'مزيج الليمون الفريش المنعش مع أوراق النعناع الطازجة', sizes: [{ name: 'كباية', price: 40 }, { name: 'لتر', price: 80 }] },
  { id: 'fj-carrot', categoryId: 'fresh-juices', nameAr: 'جزر', nameEn: 'Carrot', description: 'عصير جزر طبيعي طازج مغذي ومفيد جداً', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },

  // 2. فواكه مستوردة (Imported Fruits) - Two Sizes: Cup / 1 Liter (Names without word "عصير")
  { id: 'imp-pineapple', categoryId: 'imported-fruits', nameAr: 'أناناس', nameEn: 'Pineapple', description: 'أناناس استوائي طبيعي طازج منعش', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }], image: '/img/اناناس.jpg' },
  { id: 'imp-kiwi', categoryId: 'imported-fruits', nameAr: 'كيوي', nameEn: 'Kiwi', description: 'كيوي طبيعي فريش غني بالفيتامينات', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 130 }] },
  { id: 'imp-cherry', categoryId: 'imported-fruits', nameAr: 'كريز لبناني', nameEn: 'Lebanese Cherry', description: 'كريز لبناني فاخر بطعم منعش ومميز', sizes: [{ name: 'كباية', price: 80 }, { name: 'لتر', price: 160 }] },
  { id: 'imp-berries', categoryId: 'imported-fruits', nameAr: 'توت', nameEn: 'Berries', description: 'توت طبيعي فريش غني بالنكهات الممتازة', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 130 }] },
  { id: 'imp-apple', categoryId: 'imported-fruits', nameAr: 'تفاح', nameEn: 'Apple', description: 'تفاح طبيعي فريش صافي ولذيذ', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 135 }] },
  { id: 'imp-custard-apple', categoryId: 'imported-fruits', nameAr: 'قشطة', nameEn: 'Custard Apple', description: 'فاكهة القشطة الطبيعي الكريمي الغني', sizes: [{ name: 'كباية', price: 90 }, { name: 'لتر', price: 180 }] },
  { id: 'imp-plum', categoryId: 'imported-fruits', nameAr: 'برقوق', nameEn: 'Plum', description: 'برقوق طازج طبيعي ولذيذ', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 130 }] },
  { id: 'imp-passion-fruit', categoryId: 'imported-fruits', nameAr: 'باشون فروت', nameEn: 'Passion Fruit', description: 'باشون فروت استوائي فاخر منعش', sizes: [{ name: 'كباية', price: 100 }, { name: 'لتر', price: 200 }] },
  { id: 'imp-mix-3', categoryId: 'imported-fruits', nameAr: 'ميكس 3 أصناف', nameEn: '3 Fruits Mix', description: 'مزيج رائع من 3 أصناف فواكه مستوردة فاخرة', sizes: [{ name: 'كباية', price: 100 }, { name: 'لتر', price: 200 }] },

  // 3. ميكسات أفوكادو (Avocado Mixes)
  { id: 'avo-plain', categoryId: 'avocado-mixes', nameAr: 'أفوكادو سادة', description: 'مزيج أفوكادو طبيعي كريمي غني بالطاقة', sizes: [{ name: 'كباية', price: 100 }, { name: 'لتر', price: 190 }], image: '/img/2.jpg' },
  { id: 'avo-nuts', categoryId: 'avocado-mixes', nameAr: 'أفوكادو مكسرات', description: 'أفوكادو كريمي مزين بأجود المكسرات المحمصة', sizes: [{ name: 'كباية', price: 110 }, { name: 'لتر', price: 220 }] },
  { id: 'avo-cream', categoryId: 'avocado-mixes', nameAr: 'أفوكادو قشطة', description: 'أفوكادو طبيعي كريمي مع القشطة البلدي الغنية', sizes: [{ name: 'كباية', price: 100 }, { name: 'لتر', price: 200 }] },
  { id: 'avo-dates-nuts', categoryId: 'avocado-mixes', nameAr: 'أفوكادو مكسرات بلح', description: 'مزيج الأفوكادو اللذيذ مع التمر والمكسرات الفاخرة', sizes: [{ name: 'كباية', price: 120 }, { name: 'لتر', price: 240 }] },
  { id: 'avo-tropical', categoryId: 'avocado-mixes', nameAr: 'تروبيكال', description: 'مزيج تروبيكال أفوكادو مميز وفاخر', price: 150 },
  { id: 'avo-cream-nuts', categoryId: 'avocado-mixes', nameAr: 'قشطة مكسرات', description: 'أفوكادو فاخر مع القشطة والمكسرات', price: 120 },

  // 4. ميكسات كبل (Couple Mixes) - Two Sizes: Cup / 1 Liter
  { id: 'cpl-mango-avocado', categoryId: 'couple-mixes', nameAr: 'مانجو وأفوكادو', description: 'مزيج المانجو الاستوائية مع الأفوكادو الكريمي', sizes: [{ name: 'كباية', price: 95 }, { name: 'لتر', price: 170 }], image: '/img/4.jpg' },
  { id: 'cpl-mango-strawberry', categoryId: 'couple-mixes', nameAr: 'مانجو وفراولة', description: 'مزيج المانجو الفريش مع الفراولة الطبيعية', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-mango-guava', categoryId: 'couple-mixes', nameAr: 'مانجو وجوافة', description: 'مزيج المانجو الطبيعية مع الجوافة الفريش', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-kiwi-strawberry', categoryId: 'couple-mixes', nameAr: 'كيوي وفراولة', description: 'مزيج الكيوي المنعش مع الفراولة الطبيعية', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-strawberry-berry', categoryId: 'couple-mixes', nameAr: 'فراولة وتوت', description: 'كوكتيل الفراولة الطازجة مع التوت الغني', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 110 }] },
  { id: 'cpl-pomegranate-berry', categoryId: 'couple-mixes', nameAr: 'رمان وتوت', description: 'كوكتيل الرمان الطبيعي مع التوت المشكل', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-orange-pineapple', categoryId: 'couple-mixes', nameAr: 'برتقال وأناناس', description: 'كوكتيل البرتقال الفريش مع الأناناس المنعش', sizes: [{ name: 'كباية', price: 75 }, { name: 'لتر', price: 150 }] },
  { id: 'cpl-peach-mango', categoryId: 'couple-mixes', nameAr: 'خوخ ومانجو', description: 'كوكتيل الخوخ الطبيعي مع المانجو الاستوائية', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-mango-watermelon', categoryId: 'couple-mixes', nameAr: 'مانجو بطيخ', description: 'مزيج المانجو الاستوائية مع البطيخ البارد', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-avocado-banana', categoryId: 'couple-mixes', nameAr: 'أفوكادو موز', description: 'مزيج الأفوكادو الغني مع الموز والحليب', sizes: [{ name: 'كباية', price: 95 }, { name: 'لتر', price: 190 }] },
  { id: 'cpl-kiwi-peach', categoryId: 'couple-mixes', nameAr: 'كيوي خوخ', description: 'مزيج الكيوي المنعش مع الخوخ الطبيعي', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-kiwi-pineapple', categoryId: 'couple-mixes', nameAr: 'كيوي أناناس', description: 'مزيج الكيوي والأناناس الاستوائي المنعش', sizes: [{ name: 'كباية', price: 80 }, { name: 'لتر', price: 160 }] },
  { id: 'cpl-strawberry-plum', categoryId: 'couple-mixes', nameAr: 'فراولة برقوق', description: 'مزيج الفراولة الطبيعية مع البرقوق المنعش', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-avocado-kiwi', categoryId: 'couple-mixes', nameAr: 'أفوكادو كيوي', description: 'مزيج الأفوكادو الغني مع الكيوي الفريش', sizes: [{ name: 'كباية', price: 95 }, { name: 'لتر', price: 190 }] },
  { id: 'cpl-avocado-dates', categoryId: 'couple-mixes', nameAr: 'أفوكادو بلح', description: 'أفوكادو طبيعي ممتاز ممتزج بالبلح التمر اللذيذ', sizes: [{ name: 'كباية', price: 100 }, { name: 'لتر', price: 170 }] },
  { id: 'cpl-avocado-pineapple', categoryId: 'couple-mixes', nameAr: 'أفوكادو أناناس', description: 'مزيج الأفوكادو الكريمي مع الأناناس الاستوائي', sizes: [{ name: 'كباية', price: 100 }, { name: 'لتر', price: 200 }] },
  { id: 'cpl-kiwi-guava', categoryId: 'couple-mixes', nameAr: 'كيوي جوافة', description: 'مزيج الكيوي المنعش مع الجوافة الطبيعية', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'cpl-banana-cantaloupe', categoryId: 'couple-mixes', nameAr: 'موز كانتالوب', description: 'مزيج الموز اللذيذ مع الكانتلوب البارد', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-watermelon-cantaloupe', categoryId: 'couple-mixes', nameAr: 'بطيخ كانتالوب', description: 'كوكتيل البطيخ الأحمر مع الكانتلوب البارد', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-orange-carrot', categoryId: 'couple-mixes', nameAr: 'برتقال جزر', description: 'مزيج البرتقال الفريش مع الجزر المغذي', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-orange-kiwi', categoryId: 'couple-mixes', nameAr: 'برتقال كيوي', description: 'مزيج البرتقال الطبيعي مع الكيوي المنعش', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }] },
  { id: 'cpl-mango-pineapple', categoryId: 'couple-mixes', nameAr: 'مانجا أناناس', description: 'مزيج المانجو الفريش مع الأناناس الاستوائي', sizes: [{ name: 'كباية', price: 75 }, { name: 'لتر', price: 150 }] },
  { id: 'cpl-guava-strawberry', categoryId: 'couple-mixes', nameAr: 'جوافة فراولة', description: 'مزيج الجوافة الطبيعية مع الفراولة المنعشة', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-kiwi-lemon-mint', categoryId: 'couple-mixes', nameAr: 'كيوي ليمون نعناع', description: 'مزيج الكيوي مع الليمون والنعناع الطازج', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }] },
  { id: 'cpl-strawberry-banana', categoryId: 'couple-mixes', nameAr: 'فراولة موز', description: 'مزيج الفراولة الطبيعية مع الموز والحليب', sizes: [{ name: 'كباية', price: 50 }, { name: 'لتر', price: 100 }] },
  { id: 'cpl-apricot-peach', categoryId: 'couple-mixes', nameAr: 'مشمش خوخ', description: 'مزيج المشمش اللذيذ مع الخوخ الطبيعي', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 130 }] },
  { id: 'cpl-mango-prickly-pear', categoryId: 'couple-mixes', nameAr: 'مانجو تين شوكي', description: 'مزيج المانجو الاستوائية مع التين الشوكي', sizes: [{ name: 'كباية', price: 65 }, { name: 'لتر', price: 130 }] },
  { id: 'cpl-dates-milk-nuts', categoryId: 'couple-mixes', nameAr: 'بلح حليب مكسرات', description: 'مزيج التمر بالحليب الغني والمكسرات المحمصة', sizes: [{ name: 'كباية', price: 85 }, { name: 'لتر', price: 170 }] },
  { id: 'cpl-peach-milk', categoryId: 'couple-mixes', nameAr: 'خوخ حليب', description: 'مزيج الخوخ الطبيعي مع الحليب البلدي', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }] },

  // 5. سلطة فواكه (Fruit Salad) - Single Price
  { id: 'fs-juice', categoryId: 'fruit-salad', nameAr: 'فروت سلاط مع عصير', description: 'قطع فواكه طازجة مشكلة مغطاة بالعصير الفريش', price: 50, image: '/img/سلطة فواكة.jpg' },
  { id: 'fs-icecream', categoryId: 'fruit-salad', nameAr: 'فروت سلاط مع آيس كريم', description: 'فواكه طازجة مشكلة مع بولة آيس كريم غنية', price: 60 },
  { id: 'fs-nuts-cream', categoryId: 'fruit-salad', nameAr: 'فروت مع مكسرات وقشطة', description: 'فواكه مشكلة مع القشطة البلدي والمكسرات المحمصة', price: 60 },
  { id: 'fs-bomb', categoryId: 'fruit-salad', nameAr: 'قنبلة', description: 'قنبلة الفواكه الخاصة مع الآيس كريم والقشطة والمكسرات', price: 100 },
  { id: 'fs-icecream-nuts', categoryId: 'fruit-salad', nameAr: 'فروت سلاط آيس كريم مكسرات', description: 'فواكه مشكلة مع آيس كريم ومكسرات فاخرة', price: 75 },
  { id: 'fs-watermelon-pieces', categoryId: 'fruit-salad', nameAr: 'قطع بطيخ', description: 'قطع بطيخ بارد طازج منعش', price: 45 },
  { id: 'fs-pomegranate-seeds', categoryId: 'fruit-salad', nameAr: 'حب رمان', description: 'حبوب رمان طبيعي فريش صافي', price: 65 },
  { id: 'fs-mango-pieces', categoryId: 'fruit-salad', nameAr: 'قطع مانجو', description: 'قطع مانجو فريش طبيعية طازجة', price: 65 },
  { id: 'fs-strawberry-pieces', categoryId: 'fruit-salad', nameAr: 'قطع فراولة', description: 'قطع فراولة طازجة منعشة', price: 50 },
  { id: 'fs-mango-tree', categoryId: 'fruit-salad', nameAr: 'شجرة مانجو', description: 'شجرة المانجو الخاصة والمميزة', price: 90 },

  // 6. ميلك شيك (Milk Shake) - Single Price
  { id: 'ms-fruits', categoryId: 'milkshake', nameAr: 'ميلك تشيك فواكه', description: 'مانجو - كيوي - موز - فراولة', price: 75, image: '/img/6.jpg' },
  { id: 'ms-oreo', categoryId: 'milkshake', nameAr: 'ميلك تشيك أوريو', description: 'ميلك تشيك كريمي غني بقطع بسكويت أوريو', price: 75 },
  { id: 'ms-vanilla', categoryId: 'milkshake', nameAr: 'ميلك تشيك فانيليا', description: 'ميلك تشيك فانيليا كلاسيكي غني ولذيذ', price: 75 },
  { id: 'ms-kitkat', categoryId: 'milkshake', nameAr: 'ميلك تشيك كيت كات', description: 'ميلك تشيك مع قطع شوكولاتة كيت كات المقرمشة', price: 75 },
  { id: 'ms-cashew', categoryId: 'milkshake', nameAr: 'ميلك تشيك كاجو', description: 'ميلك تشيك غني بالكاجو المحمص والآيس كريم', price: 85 },
  { id: 'ms-lotus', categoryId: 'milkshake', nameAr: 'ميلك تشيك لوتس', description: 'ميلك تشيك فاخر بنكهة زبدة وبسكويت اللوتس', price: 80 },
  { id: 'ms-twix', categoryId: 'milkshake', nameAr: 'ميلك تشيك تويكس مادكس', description: 'ميلك تشيك غني بالشوكولاتة والكراميل والبسكويت', price: 75 },
  { id: 'ms-snickers', categoryId: 'milkshake', nameAr: 'ميلك تشيك سنيكرز', description: 'ميلك تشيك مع قطع سنيكرز وزبدة الفول السوداني', price: 75 },
  { id: 'ms-kinder', categoryId: 'milkshake', nameAr: 'ميلك تشيك نوتي كيندر', description: 'ميلك تشيك ناعم بنكهة كيندر والشوكولاتة البيضاء', price: 75 },
  { id: 'ms-redberry', categoryId: 'milkshake', nameAr: 'ميلك تشيك ريد بيري', description: 'ميلك تشيك كريمي غني بنكهة التوت الأحمر', price: 75 },
  { id: 'ms-blueberry', categoryId: 'milkshake', nameAr: 'ميلك تشيك بلو بيري', description: 'ميلك تشيك كريمي غني بنكهة التوت الأزرق', price: 75 },
  { id: 'ms-cerelac', categoryId: 'milkshake', nameAr: 'ميلك تشيك سيرلاك', description: 'ميلك تشيك مغذي ومميز بنكهة السيريلاك', price: 75 },
  { id: 'ms-nutella', categoryId: 'milkshake', nameAr: 'ميلك تشيك نوتيلا', description: 'ميلك تشيك غني بشوكولاتة النوتيلا الأصلي', price: 75 },
  { id: 'ms-yogurt-berry', categoryId: 'milkshake', nameAr: 'ميلك تشيك زبادي توت', description: 'مزيج الميلك تشيك الكريمي مع الزبادي والتوت', price: 80 },
  { id: 'ms-mega', categoryId: 'milkshake', nameAr: 'ميلك تشيك ميجا', description: 'ميلك تشيك ميجا غني بالشوكولاتة والآيس كريم', price: 75 },
  { id: 'ms-jojo', categoryId: 'milkshake', nameAr: 'ميلك تشيك جوجو', description: 'مزيج مميز غني بالفواكه والميلك تشيك الكريمي', price: 85 },
  { id: 'ms-pistachio', categoryId: 'milkshake', nameAr: 'ميلك تشيك بستاشيو', description: 'ميلك تشيك فاخر بنكهة الفستق البستاشيو', price: 85 },
  { id: 'ms-caramel', categoryId: 'milkshake', nameAr: 'ميلك تشيك كراميل', description: 'ميلك تشيك ناعم غني بصوص الكراميل', price: 75 },
  { id: 'ms-cherry', categoryId: 'milkshake', nameAr: 'ميلك تشيك كريز', description: 'ميلك تشيك غني بنكهة الكريز اللبناني المنعش', price: 90 },
  { id: 'ms-galaxy', categoryId: 'milkshake', nameAr: 'ميلك تشيك جلاكسي', description: 'ميلك تشيك ناعم بشوكولاتة جلاكسي الفاخرة', price: 75 },

  // 7. بروتين كوكتيل (Protein Cocktail) - Single Price
  { id: 'prot-mass', categoryId: 'protein-cocktail', nameAr: 'ماس', description: 'موز - زبدة فول - حليب - شوفان', price: 70, proteinOptions: defaultProteinOptions, image: '/img/5.jpg' },
  { id: 'prot-lean-dessert', categoryId: 'protein-cocktail', nameAr: 'لين ديزرت', description: 'فراولة - موز - زبدة فول سوداني - حليب - واي بروتين', price: 75, proteinOptions: defaultProteinOptions },
  { id: 'prot-whats-whey', categoryId: 'protein-cocktail', nameAr: 'واتس واي', description: 'حليب - موز - توت أحمر - زبدة فول سوداني - تمر - واي بروتين', price: 70, proteinOptions: defaultProteinOptions },
  { id: 'prot-juice-time', categoryId: 'protein-cocktail', nameAr: 'عصير تايم', description: 'حليب - توت أزرق - توت أحمر - موز - أفوكادو - شوفان - واي بروتين', price: 85, proteinOptions: defaultProteinOptions },
  { id: 'prot-nitricore', categoryId: 'protein-cocktail', nameAr: 'نايتروكور', description: 'فراولة - آيس كريم - شوفان - أفوكادو - حليب - واي بروتين', price: 95, proteinOptions: defaultProteinOptions },
  { id: 'prot-kamkon', categoryId: 'protein-cocktail', nameAr: 'كمكون', description: 'أفوكادو - زبادي - جوز هند - توت أحمر - قرفة - واي بروتين', price: 95, proteinOptions: defaultProteinOptions },
  { id: 'prot-vehgra', categoryId: 'protein-cocktail', nameAr: 'فيهجرة', description: 'أفوكادو - حليب - كريمة - عسل أبيض - جرجير - كيوي', price: 120, proteinOptions: defaultProteinOptions },

  // 8. عوار قلب (Awar Qalb) - Single Price
  { id: 'aq-sunshine-day', categoryId: 'awar-qalb', nameAr: 'صن شاين داي', description: 'فراولة - خوخ - زبادي - كريمة لباني', price: 70, image: '/img/3.jpg' },
  { id: 'aq-pineapple-kali', categoryId: 'awar-qalb', nameAr: 'أناناس كالي', description: 'أناناس - موز - زبادي - عسل - زبدة فول سوداني', price: 70 },
  { id: 'aq-blueberry', categoryId: 'awar-qalb', nameAr: 'بلو بيري عوار', description: 'أفوكادو - توت أزرق - مانجو - عسل - جوز هند - حليب', price: 80 },
  { id: 'aq-awar-qalb', categoryId: 'awar-qalb', nameAr: 'عوار القلب', description: 'مانجو - آيس كريم - حليب - فراولة', price: 70 },
  { id: 'aq-signature', categoryId: 'awar-qalb', nameAr: 'سجنتشر', description: 'مانجو قطع - أفوكادو - فراولة - برادايس - حب رمان', price: 80 },
  { id: 'aq-crystal', categoryId: 'awar-qalb', nameAr: 'كريستال', description: 'كانتلوب - عصير مانجو - آيس كريم - حليب', price: 70 },
  { id: 'aq-paradise', categoryId: 'awar-qalb', nameAr: 'براديس', description: 'ايس كريم - فراولة - موز - قشطة - كيوي', price: 90 },
  { id: 'aq-jamaica', categoryId: 'awar-qalb', nameAr: 'جاميكا', description: 'ايس كريم - فانيليا - عصير مانجو', price: 70 },
  { id: 'aq-jambajos', categoryId: 'awar-qalb', nameAr: 'جمباجوس', description: 'كوكتيل جمباجوس المميز الخاص', price: 65 },
  { id: 'aq-modamer', categoryId: 'awar-qalb', nameAr: 'المدمر', description: 'أفوكادو - كيوي - قطع تفاح - مكسرات - موز', price: 120 },
  { id: 'aq-na-nasha', categoryId: 'awar-qalb', nameAr: 'نعنشة', description: 'مزيج عوار قلب المنعش بالنعناع', price: 65 },
  { id: 'aq-shabab', categoryId: 'awar-qalb', nameAr: 'شباب', description: 'بلح - آيس كريم - حليب', price: 70 },
  { id: 'aq-akher-kalam', categoryId: 'awar-qalb', nameAr: 'آخر كلام', description: 'آيس كريم - صوص بستاشيو - مارشملو', price: 80 },
  { id: 'aq-fusion', categoryId: 'awar-qalb', nameAr: 'فيوجين', description: 'مزيج فيوجين عوار قلب المنعش', price: 70 },

  // 9. ميكسات سوفت آيس كريم (Soft Ice Cream Mixes) - Single Price
  { id: 'sic-small-scoop', categoryId: 'soft-ice-cream', nameAr: 'بولة سوفت صغيرة', description: 'بولة آيس كريم سوفت صغيرة', price: 30, image: '/img/teremassoo.jpg' },
  { id: 'sic-large-scoop', categoryId: 'soft-ice-cream', nameAr: 'بولة سوفت كبيرة', description: 'بولة آيس كريم سوفت كبيرة', price: 40 },
  { id: 'sic-biscuit-large', categoryId: 'soft-ice-cream', nameAr: 'بسكوته سوفت كبيرة', description: 'بسكوتة آيس كريم مقرمشة كبيرة', price: 45 },
  { id: 'sic-ice-fruit', categoryId: 'soft-ice-cream', nameAr: 'آيس فروت', description: 'آيس كريم - فروت سلاط - مانجو - موز', price: 75 },
  { id: 'sic-mangawi', categoryId: 'soft-ice-cream', nameAr: 'منجاوي', description: 'آيس كريم - قطع مانجو - عصير مانجو', price: 90 },
  { id: 'sic-oreo-soft', categoryId: 'soft-ice-cream', nameAr: 'أوريو سوفت', description: 'آيس كريم فانيليا - صوص شوكولاته - ويتش أوريو', price: 75 },
  { id: 'sic-caramel-soft', categoryId: 'soft-ice-cream', nameAr: 'كراميل سوفت', description: 'آيس كريم فانيليا - صوص كراميل - ويتش كراميل', price: 70 },
  { id: 'sic-kaza', categoryId: 'soft-ice-cream', nameAr: 'كازا', description: 'آيس كريم فانيليا - قطع مانجو - كريمه - كيوي', price: 75 },
  { id: 'sic-shaker', categoryId: 'soft-ice-cream', nameAr: 'شيكر', description: 'آيس كريم شوكولاته - عوارقلب - أوريو', price: 80 },
  { id: 'sic-lago', categoryId: 'soft-ice-cream', nameAr: 'لاجو', description: 'آيس كريم فانيليا - قطع فراولة - فرولة بيري', price: 70 },
  { id: 'sic-taco', categoryId: 'soft-ice-cream', nameAr: 'تاكو آيس كريم', description: 'تاكو آيس كريم مقرمش محشو بالآيس كريم والصوص', price: 65 },
  { id: 'sic-roll', categoryId: 'soft-ice-cream', nameAr: 'رول آيس كريم', description: 'رول آيس كريم مقرمش ولذيذ', price: 45 },
  { id: 'sic-ghareqni', categoryId: 'soft-ice-cream', nameAr: 'غرفني', description: 'آيس كريم فانيليا - قطع فواكه - مكسرات', price: 100 },
  { id: 'sic-stop-watch', categoryId: 'soft-ice-cream', nameAr: 'ستوب وتش', description: 'آيس كريم فانيليا - قطع فواكه - كت كات - عصير مانجو', price: 75 },
  { id: 'sic-jojo', categoryId: 'soft-ice-cream', nameAr: 'آيس كريم جوجو', description: 'آيس كريم سوفت جوجو الخاص', price: 40 },
  { id: 'sic-nutella', categoryId: 'soft-ice-cream', nameAr: 'آيس كريم نوتيلا', description: 'آيس كريم سوفت بشوكولاتة النوتيلا', price: 35 },
  { id: 'sic-kinder', categoryId: 'soft-ice-cream', nameAr: 'آيس كريم كيندر', description: 'آيس كريم سوفت بنكهة شوكولاتة كيندر', price: 35 },
  { id: 'sic-legend', categoryId: 'soft-ice-cream', nameAr: 'أسطورة سوفت', description: 'ميكس آيس كريم أسطورة سوفت المميز', price: 70 },
  { id: 'sic-ibn-battuta', categoryId: 'soft-ice-cream', nameAr: 'ابن بطوطة سوفت', description: 'مانجو - فراولة - آيس كريم فانيليا - كيوي', price: 70 },
  { id: 'sic-lotus-caramel', categoryId: 'soft-ice-cream', nameAr: 'سوفت لوتس كراميل', description: 'آيس كريم فانيليا - صوص مكس - ويتش لوتس', price: 75 },

  // 10. فانز كوكتيل (Fans Cocktail) - Single Price
  { id: 'fc-sunrise', categoryId: 'fans-cocktail', nameAr: 'صن رايز', description: 'برتقال - خوخ - جراندين - كريز', price: 60, image: '/img/1.jpg' },
  { id: 'fc-florida', categoryId: 'fans-cocktail', nameAr: 'فلوردا', description: 'مانجو - جوافة - برتقال - جراندين', price: 65 },
  { id: 'fc-pina-colada', categoryId: 'fans-cocktail', nameAr: 'بينا كولادا', description: 'أناناس - جوز هند - حليب - أناناس فريش', price: 70 },
  { id: 'fc-love-flow', categoryId: 'fans-cocktail', nameAr: 'لاف فلو', description: 'فراولة - موز - كريمة - جوز هند - أناناس', price: 70 },
  { id: 'fc-my-dream', categoryId: 'fans-cocktail', nameAr: 'ماي دريم', description: 'موز - أناناس - فراولة - حليب', price: 70 },
  { id: 'fc-cocktail-lion', categoryId: 'fans-cocktail', nameAr: 'كوكتيل لايون', description: 'برتقال - أناناس - مانجو - كيوي', price: 75 },
  { id: 'fc-entash', categoryId: 'fans-cocktail', nameAr: 'انتعاش', description: 'فراولة - بطيخ - كيوي', price: 70 },

  // 11. زبادي عصير تايم (Juice Time Yogurt) - Two Sizes: Cup / 1 Liter
  { id: 'yogurt-honey', categoryId: 'juice-time-yogurt', nameAr: 'زبادي عسل', description: 'زبادي فريش مع العسل الطبيعي', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }], image: '/img/1.jpg' },
  { id: 'yogurt-strawberry', categoryId: 'juice-time-yogurt', nameAr: 'زبادي فراولة', description: 'زبادي فريش مع قطع وعصير الفراولة', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 120 }] },
  { id: 'yogurt-mango', categoryId: 'juice-time-yogurt', nameAr: 'زبادي مانجو', description: 'زبادي فريش مع قطع وعصير المانجو', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 120 }] },
  { id: 'yogurt-mix-fruit', categoryId: 'juice-time-yogurt', nameAr: 'زبادي مكس فواكه', description: 'زبادي فريش مع قطع الفواكه المشكلة', sizes: [{ name: 'كباية', price: 85 }, { name: 'لتر', price: 140 }] },
  { id: 'yogurt-banana', categoryId: 'juice-time-yogurt', nameAr: 'زبادي موز', description: 'زبادي فريش مع الموز بالحليب', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'yogurt-peanut-milk', categoryId: 'juice-time-yogurt', nameAr: 'سوداني بحليب', description: 'مزيج الزبادي والسوداني بحليب', sizes: [{ name: 'كباية', price: 60 }, { name: 'لتر', price: 120 }] },
  { id: 'yogurt-dates-milk', categoryId: 'juice-time-yogurt', nameAr: 'بلح بحليب', description: 'مزيج الزبادي والبلح بحليب', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 120 }] },
  { id: 'yogurt-berry', categoryId: 'juice-time-yogurt', nameAr: 'زبادي توت', description: 'زبادي فريش بنكهة التوت الغنية', sizes: [{ name: 'كباية', price: 70 }, { name: 'لتر', price: 140 }] },

  // 12. موخيتو / المشروبات (Soft Drinks / Mojitos) - Single Price
  { id: 'sd-sunshine', categoryId: 'soft-drinks', nameAr: 'صن شاين', description: 'مشروب صن شاين المنعش بارد جداً', price: 45, image: '/img/back2.jpg' },
  { id: 'sd-blue-hawaii', categoryId: 'soft-drinks', nameAr: 'بلو هاواي', description: 'سبرايت / أناناس / بلوعروسو', price: 70 },
  { id: 'sd-mojito', categoryId: 'soft-drinks', nameAr: 'موخيتو', description: 'صودا / ليمون / نعناع / موخيتو', price: 55 },
  { id: 'sd-mojito-strawberry', categoryId: 'soft-drinks', nameAr: 'فراولة موخيتو', description: 'صودا ليمون ونعناع مع سيرب الفراولة', price: 60 },
  { id: 'sd-mojito-mango-large', categoryId: 'soft-drinks', nameAr: 'مانجو موخيتو كبير', description: 'موخيتو المانجو البارد المنعش حجم كبير', price: 60 },
  { id: 'sd-mojito-kiwi', categoryId: 'soft-drinks', nameAr: 'كيوي موخيتو', description: 'صودا ليمون ونعناع بنكهة الكيوي', price: 60 },
  { id: 'sd-sky', categoryId: 'soft-drinks', nameAr: 'اسكاى', description: 'ريدبول - تفاح / أناناس - بلوعروسو', price: 80 },
  { id: 'sd-mojito-classic', categoryId: 'soft-drinks', nameAr: 'موخيتو كلاسيك', description: 'صودا / ليمون / نعناع سيرب / موخيتو', price: 60 },
  { id: 'sd-mojito-blue', categoryId: 'soft-drinks', nameAr: 'موخيتو بلو', description: 'صودا / ليمون / نعناع / بلو كرواسو', price: 60 },
  { id: 'sd-mojito-redbull', categoryId: 'soft-drinks', nameAr: 'موخيتو ريد بول', description: 'ليمون / نعناع / ريد بول / موخيتو', price: 80 },
  { id: 'sd-lemonade', categoryId: 'soft-drinks', nameAr: 'ماي فافوريت ليمونت', description: 'ليمون / صودا / فرولة / خوخ', price: 50 },
  { id: 'sd-mango-tango', categoryId: 'soft-drinks', nameAr: 'مانجو تانجو', description: 'مانجو / برتقال / ريد بول', price: 75 },
  { id: 'sd-mojito-blueberry', categoryId: 'soft-drinks', nameAr: 'موخيتو بلوبيري', description: 'موخيتو صودا بنكهة التوت الأزرق', price: 60 },

  // 13. اسموزي (Smoothies) - Single Price
  { id: 'sm-lemon', categoryId: 'smoothies', nameAr: 'اسموزي ليمون', description: 'اسموزي ليمون منعش بارد جداً', price: 50, image: '/img/اسموزى.jpg' },
  { id: 'sm-strawberry', categoryId: 'smoothies', nameAr: 'اسموزي فراولة', description: 'اسموزي فراولة طبيعي مثلج', price: 55 },
  { id: 'sm-watermelon', categoryId: 'smoothies', nameAr: 'اسموزي بطيخ', description: 'اسموزي البطيخ البارد المنعش للصيف', price: 65 },
  { id: 'sm-cantaloupe', categoryId: 'smoothies', nameAr: 'اسموزي كانتلوب', description: 'اسموزي الكانتلوب البارد اللذيذ', price: 55 },
  { id: 'sm-lemon-mint', categoryId: 'smoothies', nameAr: 'اسموزي ليمون نعناع', description: 'اسموزي ليمون بالنعناع الطازج المضروب بالثلج', price: 55 },
  { id: 'sm-kiwi', categoryId: 'smoothies', nameAr: 'اسموزي كيوي', description: 'اسموزي كيوي منعش غني بالفوائد', price: 65 },
  { id: 'sm-berry-pomegranate', categoryId: 'smoothies', nameAr: 'اسموزي توت رمان', description: 'اسموزي غني بنكهات التوت والرمان الطبيعي', price: 60 },
  { id: 'sm-mango-strawberry', categoryId: 'smoothies', nameAr: 'اسموزي مانجو فراولة', description: 'مزيج اسموزي المانجو والفراولة المثلجة', price: 50 },
  { id: 'sm-juice-time', categoryId: 'smoothies', nameAr: 'اسموزي عصير تايم', description: 'كيوى - فراولة - مانجو - توت', price: 85 },
  { id: 'sm-mango', categoryId: 'smoothies', nameAr: 'اسموزي مانجو', description: 'اسموزي مانجو استوائي بارد منعش', price: 55 },
  { id: 'sm-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي أناناس', description: 'اسموزي أناناس استوائي مثلج', price: 75 },
  { id: 'sm-kiwi-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي كيوي أناناس', description: 'اسموزي الكيوي والأناناس المثلج المنعش', price: 85 },
  { id: 'sm-orange-pineapple', categoryId: 'smoothies', nameAr: 'اسموزي برتقال أناناس', description: 'اسموزي البرتقال الفريش والأناناس المثلج', price: 75 },
  { id: 'sm-electric-lemon', categoryId: 'smoothies', nameAr: 'اليكتريك ليمون', description: 'اسموزي اليكتريك ليمون البارد', price: 55 },
  { id: 'sm-pomegranate', categoryId: 'smoothies', nameAr: 'اسموزي رمان', description: 'اسموزي رمان طبيعي فريش بارد', price: 50 },
  { id: 'sm-berry', categoryId: 'smoothies', nameAr: 'اسموزي توت', description: 'اسموزي التوت الطبيعي غني بالنكهات', price: 65 },
  { id: 'sm-peach', categoryId: 'smoothies', nameAr: 'اسموزي خوخ', description: 'اسموزي الخوخ الطبيعي المنعش', price: 65 },
  { id: 'sm-mango-kiwi', categoryId: 'smoothies', nameAr: 'اسموزي مانجو كيوي', description: 'مزيج اسموزي المانجو والكيوي المثلج', price: 70 },
  { id: 'sm-orange', categoryId: 'smoothies', nameAr: 'اسموزي برتقال', description: 'اسموزي البرتقال الطبيعي الفريش', price: 50 },
  { id: 'sm-strawberry-berry', categoryId: 'smoothies', nameAr: 'اسموزي فراولة توت', description: 'مزيج اسموزي الفراولة والتوت المثلج', price: 60 },
  { id: 'sm-mango-peach', categoryId: 'smoothies', nameAr: 'اسموزي مانجو خوخ', description: 'مزيج اسموزي المانجو والخوخ المثلج', price: 70 },
  { id: 'sm-prickly-pear', categoryId: 'smoothies', nameAr: 'اسموزي تين شوكي', description: 'اسموزي التين الشوكي البارد المنعش', price: 50 },

  // 14. آيس كوفي (Iced Coffee) - Single Price (Ice Coffee Caramel appears only ONCE)
  { id: 'ic-coffee', categoryId: 'iced-coffee', nameAr: 'Ice Coffee', description: 'قهوة مثلجة كلاسيكية باردة ومنعشة', price: 65 },
  { id: 'ic-latte', categoryId: 'iced-coffee', nameAr: 'Ice Latte', description: 'آيس لاتيه غني بالحليب والاسبريسو البارد', price: 70 },
  { id: 'ic-caramel-frappuccino', categoryId: 'iced-coffee', nameAr: 'Caramel Frappu', description: 'فرابوتشينو مثلج بصوص الكراميل اللذيذ', price: 75 },
  { id: 'ic-mocha-frappuccino', categoryId: 'iced-coffee', nameAr: 'Mocha Frappu', description: 'فرابوتشينو مثلج بالشوكولاتة والاسبريسو', price: 75 },
  { id: 'ic-white-lotus', categoryId: 'iced-coffee', nameAr: 'White Lotus Coffee', description: 'قهوة مثلجة بلمسة اللوتس والشوكولاتة البيضاء', price: 75 },
  { id: 'ic-toffe-nut', categoryId: 'iced-coffee', nameAr: 'Toffe Nut Coffee', description: 'قهوة مثلجة بنكهة التوفي والمكسرات الغنية', price: 70 },
  { id: 'ic-snow-white', categoryId: 'iced-coffee', nameAr: 'Snow Whit Farppichino', description: 'فرابوتشينو أبيض كريمي بارد ومنعش', price: 70 },
  { id: 'ic-pumpkin-spice', categoryId: 'iced-coffee', nameAr: 'Pumpkine Spice Latte', description: 'آيس لاتيه بنكهة اليقطين والتوابل الدافئة المثلجة', price: 65 },
  { id: 'ic-pumpkin-crunch', categoryId: 'iced-coffee', nameAr: 'Pumpkine Crunch', description: 'آيس كوفي بنكهة كرانش اليقطين المقرمش', price: 60 },
  { id: 'ic-matcha-macchiato', categoryId: 'iced-coffee', nameAr: 'Match Matchitao', description: 'ماتشا ماكياتو باردة مغذية ومميزة', price: 55 },
  { id: 'ic-oreo-matcha', categoryId: 'iced-coffee', nameAr: 'Oreo Match Farppichino', description: 'فرابوتشينو الماتشا المثلج مع قطع الأوريو', price: 60 },
  { id: 'ic-caramel-macchiato', categoryId: 'iced-coffee', nameAr: 'Caramel Coffe Machitao', description: 'كراميل ماكياتو بارد غني بصوص الكراميل', price: 60 },
  { id: 'ic-coffee-caramel', categoryId: 'iced-coffee', nameAr: 'Ice Coffee Caramel', description: 'قهوة مثلجة غنية بصوص الكراميل', price: 75 },
  { id: 'ic-white-mocha', categoryId: 'iced-coffee', nameAr: 'Ice White Mocha', description: 'آيس موكا بيضاء باردة ولذيذة', price: 70 },
  { id: 'ic-latte-caramel', categoryId: 'iced-coffee', nameAr: 'Ice Latte Caramel', description: 'آيس لاتيه بارد بصوص الكراميل', price: 80 },
  { id: 'ic-spanish-latte', categoryId: 'iced-coffee', nameAr: 'Spanish Latte', description: 'سبانيش لاتيه بارد غني ومميز', price: 80 },
  { id: 'ic-frappe-pistachio', categoryId: 'iced-coffee', nameAr: 'Frappe Pistachio', description: 'فرابيه بارد بنكهة البستاشيو الفاخرة', price: 90 },

  // 15. وافل (Waffles) - Single Price
  { id: 'wf-nutella', categoryId: 'waffles', nameAr: 'وافل نوتيلا', description: 'وافل مقرمش طازج مغطى بشوكولاتة النوتيلا الغنية', price: 60 },
  { id: 'wf-fruits', categoryId: 'waffles', nameAr: 'وافل فاكهة', description: 'وافل مقرمش مغطى بقطع الفواكه الطازجة والعسل', price: 75 },
  { id: 'wf-juice-time', categoryId: 'waffles', nameAr: 'وافل عصير تايم', description: 'وافل عصير تايم الخاص المشكل بالشوكولاتة والفواكه', price: 75 },
  { id: 'wf-galaxy', categoryId: 'waffles', nameAr: 'وافل جلاكسي', description: 'وافل مقرمش غارق بشوكولاتة جلاكسي الناعمة', price: 75 },
  { id: 'wf-kitkat', categoryId: 'waffles', nameAr: 'وافل كيت كات', description: 'وافل مقرمش مع قطع شوكولاتة كيت كات', price: 75 },

  // 16. ميني بان كيك (Mini Pancakes) - Single Price
  { id: 'mp-small', categoryId: 'mini-pancakes', nameAr: 'بان كيك صغير', description: 'قطع ميني بان كيك هشة ولذيذة مع الصوص', price: 50 },
  { id: 'mp-large', categoryId: 'mini-pancakes', nameAr: 'بان كيك كبير', description: 'وجبة ميني بان كيك كبيرة مشكلة بالصوصات', price: 60 },
  { id: 'mp-mix-cake', categoryId: 'mini-pancakes', nameAr: 'ميكس ميني كيك', description: 'قطع مانجو + نوتيلا', price: 75 },

  // 17. حلواني (Sweets & Cakes) - Single Price
  { id: 'sw-cheesecake', categoryId: 'sweets', nameAr: 'تشيز كيك', description: 'تشيز كيك كريمي فاخر مع صوص الفراولة أو التوت', price: 70 },
  { id: 'sw-despacito', categoryId: 'sweets', nameAr: 'ديسباسيتو', description: 'كيك ديسباسيتو البرازيلي الشوكولاتة الغني', price: 50 },
  { id: 'sw-tajn-lotus', categoryId: 'sweets', nameAr: 'طاجن لوتس', description: 'طاجن لوتس غني بزبدة وبسكويت اللوتس المقرمش', price: 60 },
  { id: 'sw-tajn-nutella', categoryId: 'sweets', nameAr: 'طاجن نوتيلا', description: 'طاجن الكيك الدافئ الغارق بشوكولاتة النوتيلا', price: 60 },
  { id: 'sw-tajn-oreo', categoryId: 'sweets', nameAr: 'طاجن أوريو', description: 'طاجن أوريو دافئ مع الكريمة الشوكولاتية', price: 60 },
  { id: 'sw-red-velvet', categoryId: 'sweets', nameAr: 'ريد فيلفت', description: 'كيك الريد فيلفيت الهش والغني بالكريمة', price: 70 },
  { id: 'sw-molten-cake', categoryId: 'sweets', nameAr: 'مولتن كيك', description: 'مولتن كيك ساخن محشو بالشوكولاتة السائلة', price: 60 },
  { id: 'sw-qashtouta', categoryId: 'sweets', nameAr: 'قشطوطة', description: 'نوتيلا - لوتس - مانجو - أوريو - ميكس', price: 75 },
  { id: 'sw-koshary-oreo', categoryId: 'sweets', nameAr: 'كشرى أوريو', description: 'كشري الحلو المميز ببسكويت وبسكويت الأوريو', price: 60 },
  { id: 'sw-mini-eclair', categoryId: 'sweets', nameAr: 'ميني إكلير', description: 'قطع ميني إكلير هشة ومحشوة بالكريمة', price: 45 },
  { id: 'sw-freska', categoryId: 'sweets', nameAr: 'فريسكا', description: 'مقرمشات فريسكا طازجة بالحلويات', price: 40 },
  { id: 'sw-cup-mango', categoryId: 'sweets', nameAr: 'كب مانجو', description: 'كب الكيك والكريمة مع قطع المانجو', price: 50 },
  { id: 'sw-tajn-mix', categoryId: 'sweets', nameAr: 'طاجن ميكس', description: 'طاجن حلواني مشكل من الصوصات الفاخرة', price: 60 },
  { id: 'sw-eclair', categoryId: 'sweets', nameAr: 'إكلير', description: 'إكلير فاخر محشو بالكريمة ومغطى بالشوكولاتة', price: 75 },
  { id: 'sw-mango-mousse', categoryId: 'sweets', nameAr: 'مانجو موس', description: 'موس المانجو الطبيعي الفاخر', price: 150 },
  { id: 'sw-soiree-box', categoryId: 'sweets', nameAr: 'علبة سواريهات', description: 'تشكيلة قطع سواريهات حلويات فاخرة', price: 180 },
  { id: 'sw-kunafa-crunch', categoryId: 'sweets', nameAr: 'كنافة كرانش', description: 'كنافة مقرمشة محشوة ومغطاة بالصوصات', price: 100 },
  { id: 'sw-fudge', categoryId: 'sweets', nameAr: 'فادج', description: 'كيك فادج شوكولاتة غنية ودافئة', price: 70 },
  { id: 'sw-qashtouta-mango', categoryId: 'sweets', nameAr: 'قشطوطة مانجو', description: 'قشطوطة غنية بقطع وسيرب المانجو الفريش', price: 90 },
  { id: 'sw-tiramisu', categoryId: 'sweets', nameAr: 'تراميسو', description: 'تيراميسو إيطالي فاخر بنكهة القهوة', price: 50 },
  { id: 'sw-avaterol', categoryId: 'sweets', nameAr: 'افاترول', description: 'قطعة افاترول هشة غنية بالكريمة', price: 35 },
  { id: 'sw-qashtouta-strawberry', categoryId: 'sweets', nameAr: 'قشطوطة فراولة', description: 'قشطوطة طازجة غنية بقطع الفراولة', price: 85 },

  // 18. أرز بلبن (Rice Pudding) - Single Price
  { id: 'rp-plain', categoryId: 'rice-pudding', nameAr: 'أرز لبن سادة', description: 'أرز باللبن البلدي الكريمي السادة طازج', price: 35 },
  { id: 'rp-mango', categoryId: 'rice-pudding', nameAr: 'أرز لبن مانجو', description: 'أرز باللبن الكريمي مغطى بقطع المانجو الفريش', price: 55 },
  { id: 'rp-nuts-honey', categoryId: 'rice-pudding', nameAr: 'أرز لبن مكسرات وعسل', description: 'أرز باللبن مزين بأجود المكسرات والعسل', price: 55 },
  { id: 'rp-icecream', categoryId: 'rice-pudding', nameAr: 'أرز لبن آيس كريم', description: 'أرز باللبن الكريمي مع بولة آيس كريم فانيليا', price: 55 },
  { id: 'rp-lotus', categoryId: 'rice-pudding', nameAr: 'أرز بلبن لوتس', description: 'أرز باللبن مغطى بزبدة وبسكويت اللوتس', price: 55 },

  // 19. مشروبات ساخنة (Hot Drinks) - Single Price (Hot Cider & Pumpkine Hot Coffee moved to Coffee)
  { id: 'hd-tea', categoryId: 'hot-drinks', nameAr: 'شاي', description: 'شاي أحمر دافئ ممتاز', price: 20 },
  { id: 'hd-tea-milk', categoryId: 'hot-drinks', nameAr: 'شاي بالحليب', description: 'شاي مغلي مضبوط مضاف إليه الحليب البلدي', price: 30 },
  { id: 'hd-herbs', categoryId: 'hot-drinks', nameAr: 'أعشاب', description: 'ينسون - كركديه - قرفة - زنجبيل', price: 20 },
  { id: 'hd-cinnamon-milk', categoryId: 'hot-drinks', nameAr: 'قرفة بالحليب', description: 'مشروب القرفة الدافئ بالحليب', price: 40 },
  { id: 'hd-ginger-milk', categoryId: 'hot-drinks', nameAr: 'جنزبيل حليب', description: 'مشروب الزنجبيل الدافئ بالحليب البلدي', price: 40 },
  { id: 'hd-vitamin-c', categoryId: 'hot-drinks', nameAr: 'فيتامين سي عصير تايم', description: 'ينسون - نعناع - ليمون - عسل - زنجبيل', price: 35 },
  { id: 'hd-pineapple-spice', categoryId: 'hot-drinks', nameAr: 'Pinapple Spice', description: 'مشروب الأناناس الدافئ بالتوابل العطرية', price: 50 },
  { id: 'hd-water-small', categoryId: 'hot-drinks', nameAr: 'مياه صغيرة', description: 'زجاجة مياه معدنية صغيرة نقية', price: 10 },

  // 20. الركن الشتوي (Winter Corner) - Single Price
  { id: 'wc-belila-nuts', categoryId: 'winter-corner', nameAr: 'بليلة لبن مكسرات', description: 'بليلة دافئة بالحليب والمكسرات الفاخرة', price: 65 },
  { id: 'wc-hummus-large', categoryId: 'winter-corner', nameAr: 'حمص الشام كبير', description: 'حمص الشام الساخن الحار حجم كبير', price: 35 },
  { id: 'wc-hummus-small', categoryId: 'winter-corner', nameAr: 'حمص الشام صغير', description: 'حمص الشام الساخن الحار حجم صغير', price: 25 },
  { id: 'wc-belila-plain', categoryId: 'winter-corner', nameAr: 'بليلة لبن سادة', description: 'بليلة دافئة بالحليب البلدي الساخن', price: 50 },
  { id: 'wc-sahlab-plain', categoryId: 'winter-corner', nameAr: 'سحلب عادي', description: 'سحلب ساخن غني ولذيذ', price: 50 },
  { id: 'wc-sahlab-nuts', categoryId: 'winter-corner', nameAr: 'سحلب مكسرات', description: 'سحلب ساخن غني ومزين بالمكسرات المحمصة', price: 65 },
  { id: 'wc-sahlab-nutella', categoryId: 'winter-corner', nameAr: 'سحلب نوتيلا ومكسرات', description: 'سحلب دافئ بشوكولاتة النوتيلا والمكسرات', price: 65 },
  { id: 'wc-sahlab-fruits', categoryId: 'winter-corner', nameAr: 'سحلب فواكه', description: 'سحلب دافئ مزين بقطع الفواكه الطازجة', price: 65 },
  { id: 'wc-sahlab-juicetime', categoryId: 'winter-corner', nameAr: 'سحلب عصير تايم', description: 'سحلب عصير تايم المشكل بالمكسرات والفواكه', price: 65 },

  // 21. القهوة (Coffee) - Single & Dual Sizes (Hot Cider & Pumpkine Hot Coffee included here)
  { id: 'cff-plain-light', categoryId: 'coffee', nameAr: 'سادة فاتح', description: 'قهوة تركي سادة فاتح', sizes: [{ name: 'سنجل', price: 35 }, { name: 'دبل', price: 45 }] },
  { id: 'cff-plain-dark', categoryId: 'coffee', nameAr: 'سادة غامق', description: 'قهوة تركي سادة غامق', sizes: [{ name: 'سنجل', price: 35 }, { name: 'دبل', price: 45 }] },
  { id: 'cff-spiced-light', categoryId: 'coffee', nameAr: 'محوج فاتح', description: 'قهوة تركي محوج فاتح', sizes: [{ name: 'سنجل', price: 35 }, { name: 'دبل', price: 45 }] },
  { id: 'cff-spiced-dark', categoryId: 'coffee', nameAr: 'محوج غامق', description: 'قهوة تركي محوج غامق', sizes: [{ name: 'سنجل', price: 35 }, { name: 'دبل', price: 45 }] },
  { id: 'cff-french', categoryId: 'coffee', nameAr: 'قهوة فرنساوي', description: 'قهوة فرنسية ناعمة بالحليب الساخن', sizes: [{ name: 'سنجل', price: 40 }, { name: 'دبل', price: 50 }] },
  { id: 'cff-hazelnut', categoryId: 'coffee', nameAr: 'قهوة بندق', description: 'قهوة تركي غنية بنكهة البندق العطرية', sizes: [{ name: 'سنجل', price: 50 }, { name: 'دبل', price: 60 }] },
  { id: 'cff-espresso', categoryId: 'coffee', nameAr: 'إسبريسو', description: 'جرعة اسبريسو إيطالية مركزة', sizes: [{ name: 'سنجل', price: 40 }, { name: 'دبل', price: 50 }] },
  { id: 'cff-american', categoryId: 'coffee', nameAr: 'أمريكان كوفي', description: 'قهوة أمريكية سوداء صافية ومركزة', price: 55 },
  { id: 'cff-nescafe-black', categoryId: 'coffee', nameAr: 'نسكافيه بلاك', description: 'نسكافيه بلاك سادة ساخن', price: 30 },
  { id: 'cff-nescafe-milk', categoryId: 'coffee', nameAr: 'نسكافيه حليب', description: 'نسكافيه ساخن مضاف إليه الحليب', price: 50 },
  { id: 'cff-foot-latte', categoryId: 'coffee', nameAr: 'فوت لاتيه', description: 'فوت لاتيه ساخن غني برغوة الحليب', price: 60 },
  { id: 'cff-flat-white', categoryId: 'coffee', nameAr: 'فلات وايت', description: 'اسبريسو مضاعف مع الحليب الساخن الناعم', price: 65 },
  { id: 'cff-hot-mocha', categoryId: 'coffee', nameAr: 'هوت موكا', description: 'مزيج الاسبريسو مع الشوكولاتة والحليب الساخن', price: 70 },
  { id: 'cff-hot-chocolate', categoryId: 'coffee', nameAr: 'هوت شوكلت', description: 'مشروب شوكولاتة ساخنة غنية ولذيذة', price: 60 },
  { id: 'cff-cappuccino', categoryId: 'coffee', nameAr: 'كابتشينو', description: 'اسبريسو مع الحليب ورغوة الكابتشينو الغنية', price: 70 },
  { id: 'cff-caramel-hot-choc', categoryId: 'coffee', nameAr: 'كراميل هوت شوكليت', description: 'هوت شوكليت دافئ بصوص الكراميل', price: 70 },
  { id: 'cff-hot-lotus', categoryId: 'coffee', nameAr: 'هوت لوتس كافيه', description: 'مشروب دافئ غني بزبدة وبسكويت اللوتس', price: 65 },
  { id: 'cff-hot-cider', categoryId: 'coffee', nameAr: 'هوت سيدر', description: 'مشروب هوت سيدر التفاح الدافئ بالقرفة', price: 50 },
  { id: 'cff-pumpkin-hot', categoryId: 'coffee', nameAr: 'Pumpkine Hot Coffee', description: 'قهوة دافئة بنكهة اليقطين والتوابل العطرية', price: 60 },
  { id: 'cff-double-macchiato', categoryId: 'coffee', nameAr: 'دبل ماكياتو', description: 'دبل اسبريسو مع لمسة من رغوة الحليب', price: 65 },
];

// Dynamically attach backward-compatibility getters to all items
products.forEach((p) => {
  p.name = p.nameAr;
  p.desc = p.description; // Clean natural description without hardcoded price strings
  p.category = p.categoryId;
  p.iconUrl = p.image || '/logo.png';

  // Fallback price string for current ProductCard rendering
  if (p.price !== undefined) {
    (p as unknown as { price: string | number }).price = String(p.price);
  } else if (p.sizes && p.sizes.length > 0) {
    if (p.sizes[0].name === 'كباية' || p.sizes[0].name === 'لتر') {
      (p as unknown as { price: string | number }).price = `${p.sizes[0].price} (كباية) / ${p.sizes[1]?.price || ''} (لتر)`;
    } else {
      (p as unknown as { price: string | number }).price = `${p.sizes[0].price} (${p.sizes[0].name}) / ${p.sizes[1]?.price || ''} (${p.sizes[1]?.name || ''})`;
    }
  }
});