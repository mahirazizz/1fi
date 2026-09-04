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

## Server architecture

The Express server follows MVC boundaries:

- `src/controllers` handles request and response logic.
- `src/routes` maps HTTP endpoints to controllers.
- `src/model/models.js` contains the Mongoose product model.
- `src/utils` contains response serialization helpers.
- `src/middleware` contains shared Express middleware such as error handling.

`src/app.js` only configures middleware and composes the route modules.

## Deploy

Create a MongoDB Atlas database and allow connections from your deployed Render service. Seed it once locally with the Atlas URI:

```bash
cd server
npm install
npm run seed
```

Deploy the API to Render by creating a Node service with the root directory set to `server`, build command `npm install`, and start command `npm start`. Add these environment variables:

- `MONGODB_URI`: your MongoDB Atlas connection string
- `PORT`: the port provided by Render, if required by the service configuration
- `FRONTEND_URL`: your Vercel site URL (comma-separated URLs are supported)

Deploy the frontend to Vercel by importing the repository and setting the project root to `client`. The included `client/vercel.json` builds the Vite app, proxies `/api/*` to the Render API, and rewrites browser routes to `index.html`. Leave `VITE_API_URL` unset in Vercel so the frontend uses the same-origin `/api` proxy. For local development, use `VITE_API_URL=http://localhost:5000/api`.

After both deployments, open the Vercel URL and verify `/api/health` returns a successful response. The direct Render health URL is `https://<your-render-service>.onrender.com/api/health`.
