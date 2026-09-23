
export type Category = {
    id: string;
    nameAr: string;
    nameEn: string;
    img: string;
};

export type Product = {
    id: number;
    name: string;
    desc: string;
    price: string;
    category: string;
    iconUrl: string;
};

export const categories: Category[] = [
    { id: 'fresh', nameAr: 'عصائر طازجة', nameEn: 'Fresh Juices', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
    { id: 'awar', nameAr: 'عوار قلب', nameEn: 'Awar Qalb', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014496.png' },
    { id: 'smoothie', nameAr: 'سموثي وكوكتيل', nameEn: 'Smoothies', img: 'https://cdn-icons-png.flaticon.com/512/2400/2400922.png' },
    { id: 'coffee', nameAr: 'ركن القهوة', nameEn: 'Coffee', img: 'https://cdn-icons-png.flaticon.com/512/2934/2934098.png' },
    { id: 'dessert', nameAr: 'حلويات ووافل', nameEn: 'Desserts', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014535.png' }
];

export const products: Product[] = [
    { id: 1, name: 'مانجو فريش', desc: 'عصير مانجو طبيعي 100%', price: '40', category: 'fresh', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
    { id: 2, name: 'فراولة فريش', desc: 'عصير فراولة طبيعي', price: '40', category: 'fresh', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
    { id: 5, name: 'كريستال', desc: 'كانتلوب - عصير مانجو - آيس كريم - حليب', price: '65', category: 'awar', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014496.png' },
    { id: 6, name: 'صمدو', desc: 'أفوكادو - آيس كريم - مانجو - فراولة', price: '85', category: 'awar', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014496.png' },
    { id: 10, name: 'سموذي توت رمان', desc: 'سموذي منعش بالتوت والرمان', price: '50', category: 'smoothie', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2400/2400922.png' },
    { id: 14, name: 'اسبريسو', desc: 'قهوة اسبريسو مركزة (سنجل/دبل)', price: '35', category: 'coffee', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2934/2934098.png' },
    { id: 18, name: 'وافلز نوتيلا', desc: 'وافل طازج مغطى بشوكولاتة النوتيلا', price: '60', category: 'dessert', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014535.png' }
];