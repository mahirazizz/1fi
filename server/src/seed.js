require("dotenv").config();
const mongoose = require("mongoose");
const { Product } = require("./controllers/models");

const image = (url, alt) => ({ url, alt });
const gallery = (color, urls) =>
  urls.map((url, index) => image(url, `${color} phone view ${index + 1}`));
const plans = (price) => [
  {
    tenureMonths: 3,
    monthlyPayment: Math.round(price / 3),
    interestRate: 0,
    cashback: 7500,
  },
  {
    tenureMonths: 6,
    monthlyPayment: Math.round(price / 6),
    interestRate: 0,
    cashback: 5000,
  },
  {
    tenureMonths: 12,
    monthlyPayment: Math.round((price * 1.045) / 12),
    interestRate: 8.9,
    cashback: 3500,
  },
  {
    tenureMonths: 24,
    monthlyPayment: Math.round((price * 1.09) / 24),
    interestRate: 10.5,
    cashback: 2500,
  },
  {
    tenureMonths: 36,
    monthlyPayment: Math.round((price * 1.16) / 36),
    interestRate: 12.5,
    cashback: 1500,
  },
];
const variant = (color, storage, finish, urls, mrp, price) => ({
  color,
  storage,
  finish,
  imageUrl: urls[0],
  images: gallery(color, urls),
  mrp,
  price,
  emiPlans: plans(price),
});

const appleSilver = [
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=85",
];
const appleBlue = [
  "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85",
];
const appleOrange = [
  "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=85",
];
const samsungBlack = [
  "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=85",
];
const samsungBlue = [
  "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=85",
];
const pixelObsidian = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=85",
];
const pixelHazel = [
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
];

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    rating: 4.8,
    soldCount: 12400,
    description:
      "A pro camera system, powerful A-series performance, and a bright titanium design built for the everyday.",
    descriptionPoints: [
      "Pro camera system for detailed photos and cinematic video",
      "A-series performance for demanding apps and games",
      "Titanium construction with an all-day battery",
    ],
    variants: [
      variant(
        "Silver",
        "128GB",
        "Natural Titanium",
        appleSilver,
        124900,
        119900,
      ),
      variant(
        "Silver",
        "256GB",
        "Natural Titanium",
        appleSilver,
        134900,
        127400,
      ),
      variant("Blue", "128GB", "Deep Blue Titanium", appleBlue, 124900, 119900),
      variant("Blue", "256GB", "Deep Blue Titanium", appleBlue, 134900, 127400),
      variant("Orange", "256GB", "Cosmic Orange", appleOrange, 134900, 127400),
    ],
  },
  {
    name: "Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    rating: 4.7,
    soldCount: 9800,
    description:
      "A titanium frame, built-in S Pen, and Galaxy AI make this an uncompromising flagship experience.",
    descriptionPoints: [
      "Built-in S Pen for notes, sketches, and precise control",
      "Galaxy AI tools to work smarter and communicate easily",
      "200MP camera and a bright, durable titanium frame",
    ],
    variants: [
      variant(
        "Titanium Black",
        "256GB",
        "Titanium",
        samsungBlack,
        129999,
        109999,
      ),
      variant(
        "Titanium Black",
        "512GB",
        "Titanium",
        samsungBlack,
        149999,
        124999,
      ),
      variant(
        "Titanium Blue",
        "256GB",
        "Titanium",
        samsungBlue,
        129999,
        111999,
      ),
      variant(
        "Titanium Gray",
        "512GB",
        "Titanium",
        samsungBlack,
        149999,
        124999,
      ),
    ],
  },
  {
    name: "Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    rating: 4.6,
    soldCount: 7600,
    description:
      "Google Tensor intelligence, an exceptional camera, and a refined design that feels unmistakably Pixel.",
    descriptionPoints: [
      "Google Tensor intelligence for helpful everyday experiences",
      "Advanced camera processing for natural portraits and night shots",
      "Smooth 120Hz display with a refined glass and metal design",
    ],
    variants: [
      variant(
        "Obsidian",
        "128GB",
        "Polished Glass",
        pixelObsidian,
        99999,
        89999,
      ),
      variant(
        "Obsidian",
        "256GB",
        "Polished Glass",
        pixelObsidian,
        109999,
        99999,
      ),
      variant("Hazel", "128GB", "Polished Glass", pixelHazel, 99999, 89999),
      variant(
        "Porcelain",
        "256GB",
        "Polished Glass",
        pixelHazel,
        109999,
        99999,
      ),
    ],
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
