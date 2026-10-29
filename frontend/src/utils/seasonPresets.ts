import { categories, type Category } from "../data";

export type SeasonPreset = "default" | "summer" | "winter" | "ramadan" | "custom";

export interface MenuConfigData {
  _id?: string;
  activeSeason: SeasonPreset;
  categoryOrder: string[];
  updatedAt?: string;
}

export interface SeasonInfo {
  id: SeasonPreset;
  title: string;
  shortLabel: string;
  badge: string;
  icon: string;
  color: string;
  bgLight: string;
  border: string;
  description: string;
}

export const SEASON_INFO: Record<SeasonPreset, SeasonInfo> = {
  default: {
    id: "default",
    title: "الترتيب القياسي",
    shortLabel: "افتراضي 📋",
    badge: "الترتيب الأصلي",
    icon: "📋",
    color: "#475569",
    bgLight: "#f8fafc",
    border: "#cbd5e1",
    description: "الترتيب الطبيعي الثابت لكافة أقسام المنيو",
  },
  summer: {
    id: "summer",
    title: "موسم الصيف والانتعاش",
    shortLabel: "صيف ☀️",
    badge: "انتعاش الصيف ☀️",
    icon: "☀️",
    color: "#ea580c",
    bgLight: "#fff7ed",
    border: "#fdba74",
    description: "تقديم العصائر الفريش، الإسموزي، الموخيتو، الآيس كريم، والميلك شيك في المقدمة",
  },
  winter: {
    id: "winter",
    title: "موسم الشتاء والدفء",
    shortLabel: "شتاء ❄️",
    badge: "أجواء الشتاء والدفء ❄️",
    icon: "❄️",
    color: "#0284c7",
    bgLight: "#f0f9ff",
    border: "#7dd3fc",
    description: "تقديم الركن الشتوي، المشروبات الساخنة، القهوة، الحلويات، والوافل في المقدمة",
  },
  ramadan: {
    id: "ramadan",
    title: "موسم شهر رمضان المبارك",
    shortLabel: "رمضان 🌙",
    badge: "رمضان كريم 🌙",
    icon: "🌙",
    color: "#7c3aed",
    bgLight: "#faf5ff",
    border: "#c084fc",
    description: "تقديم العصائر الفريش الطبيعية، الحلواني، الأرز باللبن، وسلطة الفواكه",
  },
  custom: {
    id: "custom",
    title: "ترتيب مخصص يدوي",
    shortLabel: "مخصص ⚙️",
    badge: "ترتيب يدوي خاص ⚙️",
    icon: "⚙️",
    color: "#16a34a",
    bgLight: "#f0fdf4",
    border: "#86efac",
    description: "ترتيب يدوي مخصص تم ضبطه وتعديل أولوياته يدوياً",
  },
};

// Default category IDs sequence directly from categories definition
export const DEFAULT_CATEGORY_ORDER: string[] = categories.map((c) => c.id);

// Summer sequence: Cold drinks, smoothies, soft ice cream, fruit cocktails first
export const SUMMER_CATEGORY_ORDER: string[] = [
  "fresh-juices",
  "smoothies",
  "soft-drinks",
  "soft-ice-cream",
  "milkshake",
  "fruit-salad",
  "avocado-mixes",
  "couple-mixes",
  "iced-coffee",
  "fans-cocktail",
  "imported-fruits",
  "juice-time-yogurt",
  "protein-cocktail",
  "awar-qalb",
  "waffles",
  "mini-pancakes",
  "sweets",
  "rice-pudding",
  "coffee",
  "hot-drinks",
  "winter-corner",
];

// Winter sequence: Hot drinks, winter corner, coffee, hot desserts first
export const WINTER_CATEGORY_ORDER: string[] = [
  "winter-corner",
  "hot-drinks",
  "coffee",
  "waffles",
  "mini-pancakes",
  "sweets",
  "rice-pudding",
  "avocado-mixes",
  "couple-mixes",
  "fresh-juices",
  "protein-cocktail",
  "fruit-salad",
  "iced-coffee",
  "milkshake",
  "smoothies",
  "imported-fruits",
  "fans-cocktail",
  "juice-time-yogurt",
  "soft-drinks",
  "soft-ice-cream",
  "awar-qalb",
];

// Ramadan sequence: Fresh juices, sweets, rice pudding, fruit salad, hot drinks
export const RAMADAN_CATEGORY_ORDER: string[] = [
  "fresh-juices",
  "sweets",
  "rice-pudding",
  "fruit-salad",
  "hot-drinks",
  "winter-corner",
  "avocado-mixes",
  "couple-mixes",
  "coffee",
  "smoothies",
  "milkshake",
  "juice-time-yogurt",
  "waffles",
  "mini-pancakes",
  "fans-cocktail",
  "imported-fruits",
  "soft-drinks",
  "soft-ice-cream",
  "iced-coffee",
  "protein-cocktail",
  "awar-qalb",
];

export const PRESET_ORDERS: Record<Exclude<SeasonPreset, "custom">, string[]> = {
  default: DEFAULT_CATEGORY_ORDER,
  summer: SUMMER_CATEGORY_ORDER,
  winter: WINTER_CATEGORY_ORDER,
  ramadan: RAMADAN_CATEGORY_ORDER,
};

/**
 * Reorders a Category array based on an array of category IDs.
 * Any categories in the original array not present in the order list are appended at the end.
 */
export function applyCategoryOrder(baseCategories: Category[], orderIds?: string[]): Category[] {
  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    return [...baseCategories];
  }

  const map = new Map<string, Category>();
  baseCategories.forEach((cat) => map.set(cat.id, cat));

  const ordered: Category[] = [];
  const addedIds = new Set<string>();

  orderIds.forEach((id) => {
    const cat = map.get(id);
    if (cat && !addedIds.has(id)) {
      ordered.push(cat);
      addedIds.add(id);
    }
  });

  // Append any categories that weren't in orderIds
  baseCategories.forEach((cat) => {
    if (!addedIds.has(cat.id)) {
      ordered.push(cat);
      addedIds.add(cat.id);
    }
  });

  return ordered;
}
