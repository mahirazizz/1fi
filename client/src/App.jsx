import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { getProduct, getProducts } from "./services/api";
import "./App.css";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
const colorHex = {
  Silver: "#c8c9c4",
  Blue: "#426b98",
  Orange: "#d97842",
  "Titanium Black": "#282a2c",
  "Titanium Blue": "#526e91",
  "Titanium Gray": "#989b9d",
  Obsidian: "#202225",
  Hazel: "#a28c79",
  Porcelain: "#e8e3d8",
};

function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/products">
        <span className="logo-mark">1</span>fi
        <span className="logo-dot">.</span>
      </Link>
      <nav>
        <Link to="/products">Explore phones</Link>
        <span className="secure">
          <ShieldCheck size={16} /> Secure checkout
        </span>
      </nav>
    </header>
  );
}
function Loading() {
  return (
    <div className="state">
      <LoaderCircle className="spin" size={28} />
      <p>Loading your OneFi experience...</p>
    </div>
  );
}
function ErrorState({ message }) {
  return (
    <div className="state error-state">
      <span>!</span>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <Link className="button primary" to="/products">
        Back to catalog
      </Link>
    </div>
  );
}
function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`image-fallback ${className}`}>1fi</div>
  ) : (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
function Gallery({ variant, productName }) {
  const images = variant.images?.length
    ? variant.images
    : [{ url: variant.imageUrl, alt: `${productName} in ${variant.color}` }];
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="gallery">
      <div className="gallery-thumbs">
        {images.map((item, index) => (
          <button
            className={`thumb ${index === selectedImage ? "active" : ""}`}
            key={`${item.url}-${index}`}
            onClick={() => setSelectedImage(index)}
            aria-label={`View image ${index + 1}`}
          >
            <ProductImage src={item.url} alt="" />
          </button>
        ))}
      </div>
      <div className="large-art">
        <ProductImage
          src={images[selectedImage].url}
          alt={
            images[selectedImage].alt || `${productName} in ${variant.color}`
          }
        />
      </div>
    </div>
  );
}

function Catalog() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .then(() => setStatus("ready"))
      .catch(() => setStatus("error"));
  }, []);
  return (
    <>
      <Header />
      <main className="catalog">
        <div className="catalog-intro">
          <div>
            <p className="eyebrow">
              <Sparkles size={14} /> SMARTER WAYS TO OWN MORE
            </p>
            <h1>
              Choose your next
              <br />
              <em>great device.</em>
            </h1>
          </div>
          <p className="intro-copy">
            Flexible monthly plans backed by your mutual funds. Pick a phone,
            choose your plan, and keep your savings working.
          </p>
        </div>
        {status === "loading" && <Loading />}
        {status === "error" && (
          <ErrorState message="We couldn't reach the product catalog." />
        )}
        {status === "ready" && (
          <div className="product-grid">
            {products.map((product, index) => (
              <Link
                className="product-card"
                to={`/products/${product.slug}`}
                key={product.id}
              >
                <div className={`product-art art-${index}`}>
                  <ProductImage src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-card-body">
                  <div>
                    <p className="brand">{product.brand}</p>
                    <h2>{product.name}</h2>
                    <p className="starting">
                      Starting at{" "}
                      <strong>{money(product.startingPrice)}</strong>
                    </p>
                  </div>
                  <span className="round-arrow">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function Detail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [status, setStatus] = useState("loading");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    getProduct(slug)
      .then((data) => {
        setProduct(data);
        const first = data.variants[0];
        setSelectedColor(first.color);
        setSelectedStorage(first.storage);
        setSelectedPlan(null);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [slug]);
  if (status === "loading")
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  if (status === "error")
    return (
      <>
        <Header />
        <ErrorState message="That product doesn't exist or is currently unavailable." />
      </>
    );
  if (!product) return null;
  const colors = [...new Set(product.variants.map((item) => item.color))];
  const storages = [...new Set(product.variants.map((item) => item.storage))];
  const selectedVariant =
    product.variants.find(
      (item) =>
        item.color === selectedColor && item.storage === selectedStorage,
    ) ||
    product.variants.find((item) => item.color === selectedColor) ||
    product.variants[0];
  const discount = Math.round(
    (1 - selectedVariant.price / selectedVariant.mrp) * 100,
  );
  const storageAvailable = (storage) =>
    product.variants.some(
      (item) => item.color === selectedColor && item.storage === storage,
    );
  const changeColor = (color) => {
    const next =
      product.variants.find(
        (item) => item.color === color && item.storage === selectedStorage,
      ) || product.variants.find((item) => item.color === color);
    setSelectedColor(color);
    setSelectedStorage(next.storage);
    setSelectedPlan(null);
    setConfirmed(false);
  };
  const changeStorage = (storage) => {
    if (!storageAvailable(storage)) return;
    setSelectedStorage(storage);
    setSelectedPlan(null);
    setConfirmed(false);
  };
  return (
    <>
      <Header />
      <main className="detail">
        <div className="breadcrumbs">
          <Link to="/products">Home</Link>
          <span>/</span>
          <span>Smartphones</span>
          <span>/</span>
          <span>{product.brand}</span>
          <span>/</span>
          <b>{product.name}</b>
        </div>
        <button className="back-link" onClick={() => navigate("/products")}>
          <ChevronLeft size={18} /> All devices
        </button>
        <div className="detail-grid">
          <section className="visual">
            <Gallery
              key={selectedVariant.id}
              variant={selectedVariant}
              productName={product.name}
            />
            <div className="trust-line">
              <ShieldCheck size={18} />
              <span>100% secure & transparent pricing</span>
            </div>
          </section>
          <section className="details">
            <p className="eyebrow">
              {product.brand} / {selectedVariant.finish}
            </p>
            <h1>{product.name}</h1>
            <div className="social-proof">
              <span className="rating">
                <Star size={14} fill="currentColor" /> {product.rating}
              </span>
              <span>{product.soldCount.toLocaleString("en-IN")} sold</span>
            </div>
            <ul className="description-points">
              {product.descriptionPoints?.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="price-row">
              <strong>{money(selectedVariant.price)}</strong>
              <span className="mrp">{money(selectedVariant.mrp)}</span>
              <span className="discount">{discount}% off</span>
            </div>
            <p className="price-note">Price inclusive of all taxes</p>
            <div className="rule" />
            <Selector
              label="Color"
              options={colors}
              selected={selectedColor}
              onChange={changeColor}
              colorMode
            />
            <Selector
              label="Storage"
              options={storages}
              selected={selectedStorage}
              onChange={changeStorage}
              disabled={(storage) => !storageAvailable(storage)}
            />
            <div className="rule" />
            <div className="plans-heading">
              <div>
                <h2>Choose your EMI tenure</h2>
                <p>Backed by your mutual funds</p>
              </div>
              <span className="fund-badge">Flexible monthly plans</span>
            </div>
            <div className="plans">
              {selectedVariant.emiPlans.map((plan) => (
                <button
                  className={`plan ${selectedPlan?.id === plan.id ? "active" : ""}`}
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setConfirmed(false);
                  }}
                >
                  <span className="plan-check">
                    {selectedPlan?.id === plan.id && <Check size={13} />}
                  </span>
                  <span className="plan-main">
                    <strong>
                      {money(plan.monthlyPayment)}
                      <small> × {plan.tenureMonths} months</small>
                    </strong>
                    <span>{plan.tenureMonths} month tenure</span>
                  </span>
                  <span className="plan-meta">
                    <b>{plan.interestRate}% interest</b>
                    {plan.cashback > 0 && (
                      <small>+ {money(plan.cashback)} cashback</small>
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              className="button primary proceed"
              disabled={!selectedPlan}
              onClick={() => setShowConfirm(true)}
            >
              Buy on selected EMI <ArrowRight size={18} />
            </button>
            {!selectedPlan && (
              <p className="select-hint">Select an EMI plan to continue</p>
            )}
            {confirmed && (
              <div className="success">
                <Check size={20} />
                <span>Your EMI plan has been selected successfully.</span>
              </div>
            )}
          </section>
        </div>
      </main>
      {showConfirm && (
        <Confirmation
          product={product}
          variant={selectedVariant}
          plan={selectedPlan}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setConfirmed(true);
          }}
        />
      )}
    </>
  );
}
function Selector({
  label,
  options,
  selected,
  onChange,
  disabled = () => false,
  colorMode = false,
}) {
  return (
    <div className="selector">
      <div className="selector-heading">
        <h2>{label}</h2>
        <span>{selected}</span>
      </div>
      <div className="selector-options">
        {options.map((option) => (
          <button
            className={`selector-option ${selected === option ? "active" : ""}`}
            disabled={disabled(option)}
            onClick={() => onChange(option)}
            key={option}
          >
            {colorMode && (
              <i
                className="color-swatch"
                style={{ background: colorHex[option] || "#bbb" }}
              />
            )}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
function Confirmation({ product, variant, plan, onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true">
        <button className="close" onClick={onCancel} aria-label="Close">
          <X size={19} />
        </button>
        <p className="eyebrow">READY WHEN YOU ARE</p>
        <h2>Confirm your selection</h2>
        <p className="modal-copy">
          Review the details below before continuing.
        </p>
        <div className="summary">
          <div>
            <span>Product</span>
            <b>{product.name}</b>
          </div>
          <div>
            <span>Variant</span>
            <b>
              {variant.color} / {variant.storage}
            </b>
          </div>
          <div>
            <span>Price</span>
            <b>{money(variant.price)}</b>
          </div>
          <div>
            <span>Monthly EMI</span>
            <b>{money(plan.monthlyPayment)} / month</b>
          </div>
          <div>
            <span>Tenure</span>
            <b>
              {plan.tenureMonths} months at {plan.interestRate}%
            </b>
          </div>
          <div>
            <span>Cashback</span>
            <b>{money(plan.cashback)}</b>
          </div>
        </div>
        <div className="modal-actions">
          <button className="button secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="button primary" onClick={onConfirm}>
            Confirm plan <Check size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <Link className="logo" to="/products">
        <span className="logo-mark">1</span>fi
        <span className="logo-dot">.</span>
      </Link>
      <span>Thoughtful finance for thoughtful purchases.</span>
    </footer>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/products/:slug" element={<Detail />} />
        <Route path="*" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
