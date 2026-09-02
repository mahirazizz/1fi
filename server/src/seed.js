require('dotenv').config()
const mongoose = require('mongoose')
const { Product } = require('./models')

const plans = (price) => [
  { tenureMonths: 3, monthlyPayment: Math.round(price / 3), interestRate: 0, cashback: 7500 },
  { tenureMonths: 6, monthlyPayment: Math.round(price / 6), interestRate: 0, cashback: 5000 },
  { tenureMonths: 12, monthlyPayment: Math.round(price * 1.045 / 12), interestRate: 8.9, cashback: 3500 },
  { tenureMonths: 24, monthlyPayment: Math.round(price * 1.09 / 24), interestRate: 10.5, cashback: 2500 },
  { tenureMonths: 36, monthlyPayment: Math.round(price * 1.16 / 36), interestRate: 12.5, cashback: 1500 },
]

const variant = (color, storage, finish, imageUrl, mrp, price) => ({ color, storage, finish, imageUrl, mrp, price, emiPlans: plans(price) })

const products = [
  {
    name: 'iPhone 17 Pro', slug: 'iphone-17-pro', brand: 'Apple',
    description: 'A pro camera system, powerful A-series performance, and a bright titanium design built for the everyday.',
    variants: [
      variant('Silver', '256GB', 'Natural Titanium', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=85', 134900, 127400),
      variant('Orange', '256GB', 'Cosmic Orange', 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900&q=85', 134900, 127400),
      variant('Blue', '512GB', 'Deep Blue Titanium', 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=900&q=85', 154900, 146900),
    ],
  },
  {
    name: 'Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', brand: 'Samsung',
    description: 'A titanium frame, built-in S Pen, and Galaxy AI make this an uncompromising flagship experience.',
    variants: [
      variant('Titanium Black', '256GB', 'Titanium', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=900&q=85', 129999, 109999),
      variant('Titanium Gray', '512GB', 'Titanium', 'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=900&q=85', 149999, 124999),
    ],
  },
  {
    name: 'Pixel 9 Pro', slug: 'google-pixel-9-pro', brand: 'Google',
    description: 'Google Tensor intelligence, an exceptional camera, and a refined design that feels unmistakably Pixel.',
    variants: [
      variant('Obsidian', '256GB', 'Polished Glass', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=85', 109999, 99999),
      variant('Hazel', '256GB', 'Polished Glass', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=85', 109999, 99999),
    ],
  },
]

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Product.deleteMany({})
  await Product.insertMany(products)
  console.log(`Seeded ${products.length} products`)
  await mongoose.disconnect()
}).catch((error) => { console.error(error); process.exit(1) })