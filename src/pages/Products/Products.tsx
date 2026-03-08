import { useState, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./Products.css";

type Product = {
  id: string;
  name: string;
  category: string;
  intro_description: string;
  image_path: string;
  slug: string;
  origin?: string;
  history?: string;
};

const CATEGORIES = ["all", "fruits", "vegetables", "packaging"];

const ProductCard = ({ product, onClick, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`product-card ${isVisible ? "is-visible" : ""}`}
      onClick={() => onClick(product)}
    >
      <div className="product-image-wrapper">
        <img
          src={product.image_path}
          alt={product.name}
          referrerPolicy="no-referrer"
        />
        <div className="product-overlay">
          <span>{t("products.view_details")} &rarr;</span>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">
          {t(`products.category_${product.category}`)}
        </span>
        <h3 className="product-title">{product.name}</h3>
      </div>
    </div>
  );
};

export default function Products() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*");

      if (fetchError) {
        throw fetchError;
      }

      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar los productos"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category, products]);

  return (
    <div className="products-page">
      <div className="products-container">
        <header className="products-header">
          <h1>{t("products.title")}</h1>
          <p>{t("products.subtitle")}</p>
        </header>

        <div className="products-layout">
          <aside className="products-sidebar">
            <div className="sidebar-content">
              <div className="search-box">
                <label>{t("products.search_label")}</label>
                <div className="search-input-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder={t("products.search_placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="categories-box">
                <div className="categories-title">
                  <SlidersHorizontal className="filter-icon" />
                  <label>{t("products.filter_label")}</label>
                </div>
                <div className="categories-list">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`category-btn ${category === cat ? "active" : ""}`}
                    >
                      {t(`products.category_${cat}`)}
                      {category === cat && <span className="active-dot"></span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="products-main">
            <div className="results-info">
              <span>
                {t("products.showing_results", {
                  count: filteredProducts.length,
                })}
              </span>
            </div>

            {loading ? (
              <div className="empty-state">
                <p>{t("products.loading", "Cargando productos...")}</p>
              </div>
            ) : error ? (
              <div className="empty-state">
                <p>{error}</p>
                <button onClick={fetchProducts}>
                  {t("products.retry", "Reintentar")}
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={setSelectedProduct}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>{t("products.no_results")}</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("all");
                  }}
                >
                  {t("products.clear_filters")}
                </button>
              </div>
            )}

            <div className="products-cta">
              <div className="cta-glow"></div>
              <h2>{t("products.cta_title")}</h2>
              <p>{t("products.cta_desc")}</p>
              <Link to="/contact" className="cta-btn">
                {t("products.cta_btn")}
              </Link>
            </div>
          </main>
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image">
              <img
                src={selectedProduct.image_path}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
              />
              <button
                className="modal-close-mobile"
                onClick={() => setSelectedProduct(null)}
              >
                <X />
              </button>
            </div>
            <div className="modal-body">
              <button
                className="modal-close-desktop"
                onClick={() => setSelectedProduct(null)}
              >
                <X />
              </button>
              <span className="modal-category">
                {t(`products.category_${selectedProduct.category}`)}
              </span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.intro_description}</p>
              <div className="modal-actions">
                <Link
                  to={`/product/${selectedProduct.slug}`}
                  className="btn-dark"
                >
                  {t("products.view_details")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
