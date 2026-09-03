const configuredApiUrl = import.meta.env.VITE_API_URL;
const API_URL =
  configuredApiUrl &&
  (!import.meta.env.PROD || !configuredApiUrl.includes("localhost"))
    ? configuredApiUrl
    : import.meta.env.DEV
      ? "http://localhost:5000/api"
      : "https://onefi-f8r4.onrender.com/api";
async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  const body = await response.json();
  if (!response.ok || !body.success)
    throw new Error(body.error || "Unable to load data");
  return body.data;
}
export const getProducts = () => request("/products");
export const getProduct = async (slug) => {
  const product = await request(`/products/${encodeURIComponent(slug)}`);
  return {
    ...product,
    description:
      product.descriptionPoints?.length > 0
        ? product.descriptionPoints.join("  •  ")
        : product.description,
  };
};
