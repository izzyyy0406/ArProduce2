import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock, Utensils, Globe, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import "./ProductDetail.css";

type RecipeStep = {
  id: string;
  recipe_id: string;
  step_number: number;
  instruction: string;
};

type Recipe = {
  id: string;
  product_id: string;
  name: string;
  description: string | null;
  image_path: string | null;
  prep_time: number | null;
  created_at: string;
  recipe_steps: RecipeStep[];
};

type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  intro_description: string | null;
  description: string | null;
  history: string | null;
  image_path: string | null;
  created_at: string;
  origin: string | null;
};

export default function ProductDetail() {
  const { id: slug } = useParams();
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (slug) fetchProductData(slug);
  }, [slug]);

  const fetchProductData = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      const { data: recipesData, error: recipesError } = await supabase
        .from('recipes')
        .select('*, recipe_steps(*)')
        .eq('product_id', productData.id);

      if (recipesError) throw recipesError;

      const sorted = (recipesData || []).map((r) => ({
        ...r,
        recipe_steps: (r.recipe_steps || []).sort(
          (a: RecipeStep, b: RecipeStep) => a.step_number - b.step_number
        ),
      }));

      setRecipes(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <p>{t('products.loading', 'Cargando...')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <Link to="/products" className="back-link">
            <ArrowLeft className="icon-sm" />
            {t('products.back_to_list')}
          </Link>
          <p>{error || t('products.not_found', 'Producto no encontrado')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">

        <Link to="/products" className="back-link">
          <ArrowLeft className="icon-sm" />
          {t('products.back_to_list')}
        </Link>

        {/* Hero: Imagen Principal del Producto */}
        <section className="product-hero">
          <div className="hero-image-container">
            <img
              src={product.image_path || ''}
              alt={product.name}
              className="hero-image"
            />
            <div className="hero-overlay">
              <span className="badge">{t(`products.category_${product.category}`)}</span>
              <h1>{product.name}</h1>
            </div>
          </div>
        </section>

        {/* Catálogo de Recetas */}
        {recipes.length > 0 && (
          <section className="recipes-section">
            <div className="section-header">
              <Utensils className="icon-md" />
              <h2>{t('products.recipes_catalog_title')}</h2>
            </div>

            <div className="recipes-catalog">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="recipe-img-wrapper">
                    <img src={recipe.image_path || ''} alt={recipe.name} />
                    <div className="card-overlay">
                      <span>{t('products.view_recipe')}</span>
                    </div>
                  </div>
                  <div className="recipe-content">
                    <h3>{recipe.name}</h3>
                    <div className="recipe-meta">
                      <Clock className="icon-xs" />
                      <span>{recipe.prep_time ? `${recipe.prep_time} min` : '—'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sección de Historia */}
        {(product.history || product.origin) && (
          <section className="history-section">
            <div className="history-card">
              <div className="history-content">
                <div className="section-header">
                  <Globe className="icon-md" />
                  <h2>{t('products.history_title')}</h2>
                </div>
                <p className="history-text">{product.history}</p>
                {product.origin && (
                  <div className="history-footer">
                    <div className="stat">
                      <strong>{product.origin}</strong>
                      <span>{t('products.origin_label')}</span>
                    </div>
                  </div>
                )}
              </div>
              {product.image_path && (
                <div className="history-visual">
                  <img src={product.image_path} alt={product.name} />
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* MODAL DE DETALLE DE RECETA */}
      {selectedRecipe && (
        <div className="recipe-modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="recipe-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="recipe-modal-close" onClick={() => setSelectedRecipe(null)}>
              <X size={24} />
            </button>

            <div className="recipe-modal-grid">
              <div className="recipe-modal-image">
                <img src={selectedRecipe.image_path || ''} alt={selectedRecipe.name} />
              </div>
              <div className="recipe-modal-body">
                <span className="recipe-modal-badge">{t('products.featured_recipe')}</span>
                <h2>{selectedRecipe.name}</h2>
                <div className="recipe-modal-meta">
                  <Clock size={16} />
                  <span>{selectedRecipe.prep_time ? `${selectedRecipe.prep_time} min` : '—'}</span>
                </div>
                <hr />
                <div className="recipe-modal-description">
                  <h3>{t('products.instructions_label')}</h3>
                  {selectedRecipe.recipe_steps.map((step) => (
                    <p key={step.id}>
                      <strong>{step.step_number}.</strong> {step.instruction}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
