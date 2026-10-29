const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function seed() {
  const uri = process.env.DB_URL;
  const dbName = process.env.DB_NAME;
  if (!uri || !dbName) {
    console.error("Missing DB_URL or DB_NAME");
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName });
  console.log("Connected to MongoDB:", dbName);

  // Read data.ts from frontend
  const dataTsPath = path.join(__dirname, "../../frontend/src/data.ts");
  const dataTsContent = fs.readFileSync(dataTsPath, "utf-8");

  // Category map - 100% aligned with frontend/src/data.ts
  const categories = [
    { id: 'fresh-juices', nameAr: 'عصائر فريش' },
    { id: 'imported-fruits', nameAr: 'فواكه مستوردة' },
    { id: 'avocado-mixes', nameAr: 'ميكسات أفوكادو' },
    { id: 'couple-mixes', nameAr: 'ميكسات كبل' },
    { id: 'fruit-salad', nameAr: 'سلطة فواكه' },
    { id: 'milkshake', nameAr: 'ميلك شيك' },
    { id: 'protein-cocktail', nameAr: 'بروتين كوكتيل' },
    { id: 'awar-qalb', nameAr: 'عوار قلب' },
    { id: 'soft-ice-cream', nameAr: 'ميكسات سوفت آيس كريم' },
    { id: 'fans-cocktail', nameAr: 'فانز كوكتيل' },
    { id: 'juice-time-yogurt', nameAr: 'زبادي عصير تايم' },
    { id: 'soft-drinks', nameAr: 'موخيتو / المشروبات' },
    { id: 'smoothies', nameAr: 'اسموزي' },
    { id: 'iced-coffee', nameAr: 'آيس كوفي' },
    { id: 'waffles', nameAr: 'وافل' },
    { id: 'mini-pancakes', nameAr: 'ميني بان كيك' },
    { id: 'sweets', nameAr: 'حلواني' },
    { id: 'rice-pudding', nameAr: 'أرز بلبن' },
    { id: 'hot-drinks', nameAr: 'مشروبات ساخنة' },
    { id: 'winter-corner', nameAr: 'الركن الشتوي' },
    { id: 'coffee', nameAr: 'القهوة' },
  ];
  const catMap = {};
  categories.forEach(c => { catMap[c.id] = c.nameAr; });

  // Let's parse products with regex line by line
  const lines = dataTsContent.split("\n");
  const extractedProducts = [];
  let orderIndex = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("{") && trimmed.includes("nameAr:") && trimmed.includes("categoryId:")) {
      try {
        const idMatch = trimmed.match(/id:\s*['"]([^'"]+)['"]/);
        const catMatch = trimmed.match(/categoryId:\s*['"]([^'"]+)['"]/);
        const nameMatch = trimmed.match(/nameAr:\s*['"]([^'"]+)['"]/);
        const descMatch = trimmed.match(/description:\s*['"]([^'"]+)['"]/);
        const imgMatch = trimmed.match(/image:\s*['"]([^'"]+)['"]/);
        
        let cupPrice = 0;
        let literPrice = undefined;

        // Check sizes
        if (trimmed.includes("sizes:")) {
          const sizePrices = [...trimmed.matchAll(/price:\s*(\d+)/g)].map(m => Number(m[1]));
          if (sizePrices.length > 0) cupPrice = sizePrices[0];
          if (sizePrices.length > 1) literPrice = sizePrices[1];
        } else if (trimmed.includes("price:")) {
          const pMatch = trimmed.match(/price:\s*(\d+)/);
          if (pMatch) cupPrice = Number(pMatch[1]);
        }

        if (nameMatch && catMatch) {
          const catId = catMatch[1];
          orderIndex++;

          let priceType = 'cup_liter';
          if (catId === 'coffee') {
            priceType = 'single_double';
          } else if (!literPrice) {
            priceType = 'single_price';
          }

          extractedProducts.push({
            name: nameMatch[1],
            type: catMap[catId] || catId,
            prices: {
              cup: cupPrice || 35,
              ...(literPrice ? { liter: literPrice } : {})
            },
            priceType,
            order: orderIndex,
            description: descMatch ? descMatch[1] : "",
            imageurl: imgMatch ? imgMatch[1] : ""
          });
        }
      } catch (err) {
        console.warn("Could not parse line:", trimmed);
      }
    }
  }

  console.log(`Parsed ${extractedProducts.length} products from data.ts`);

  if (extractedProducts.length > 0) {
    await mongoose.connection.collection("products").deleteMany({});
    console.log("Cleared old products collection");

    const baseTime = Date.now();
    const docs = extractedProducts.map((p, idx) => ({
      ...p,
      createdAt: new Date(baseTime + idx * 1000),
      updatedAt: new Date(baseTime + idx * 1000)
    }));

    const result = await mongoose.connection.collection("products").insertMany(docs);
    console.log(`Successfully seeded ${result.insertedCount} products into MongoDB Atlas with correct Arabic types and order!`);
  }

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
