const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  const body = await response.json();
  if (!response.ok || !body.success)
    throw new Error(body.error || "Unable to load data");
  return body.data;
}
export const getProducts = () => request("/products");
export const getProduct = (slug) =>
  request(`/products/${encodeURIComponent(slug)}`);
