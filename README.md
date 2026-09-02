# OneFi Device Finance

A full-stack React and Express application for choosing smartphones and mutual-fund-backed EMI plans. Product, variant, pricing, images, and plans are loaded from MongoDB through REST APIs.

## Stack

- React, Vite, React Router, JavaScript
- Node.js, Express, Mongoose
- MongoDB

## Run locally

1. Start MongoDB locally or create a MongoDB Atlas database.
2. In `server`, copy `.env.example` to `.env`, set `MONGODB_URI`, then run `npm install`, `npm run seed`, and `npm run dev`.
3. In `client`, copy `.env.example` to `.env`, then run `npm install` and `npm run dev`.
4. Open `http://localhost:5173/products`.

## Environment

Server: `MONGODB_URI`, `PORT` (default `5000`), and `FRONTEND_URL`.

Client: `VITE_API_URL` (default `http://localhost:5000/api`).

## API

- `GET /api/products` returns catalog cards.
- `GET /api/products/:slug` returns a product, variants, and EMI plans.
- `GET /api/products/:slug/variants/:variantId` returns one variant and its plans.
- `GET /api/health` returns service status.

The MongoDB `Product` document embeds its `variants`, and each variant embeds `emiPlans`. Product slugs are unique and indexed. The seed script creates three products, seven variants, and five plans per variant.

## Scripts

Client: `npm run dev`, `npm run build`, `npm run preview`.

Server: `npm run dev`, `npm start`, `npm run seed`.

For deployment, use a hosted MongoDB URI, deploy the server to Render/Railway with `FRONTEND_URL`, and deploy the Vite client to Vercel with the deployed `VITE_API_URL`. Configure the SPA fallback to serve `index.html` for `/products/*` routes.