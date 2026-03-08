import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock, Utensils, Globe, X } from "lucide-react";
import "./ProductDetail.css";

// Datos de ejemplo con llaves de i18n
const RECIPES_MOCK = [
  { 
    id: 1, 
    nameKey: "products.recipe_1_name", 
    image: "https://images.unsplash.com/photo-1512241133817-997849d4448c?q=80&w=400",
    descKey: "products.recipe_1_desc" 
  },
  { 
    id: 2, 
    nameKey: "products.recipe_2_name", 
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=400",
    descKey: "products.recipe_2_desc"
  },
  { 
    id: 3, 
    nameKey: "products.recipe_3_name", 
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400",
    descKey: "products.recipe_3_desc"
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  // Estado para controlar qué receta mostrar en el modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="detail-page">
      <div className="detail-container">
        
        {/* Navegación superior */}
        <Link to="/products" className="back-link">
          <ArrowLeft className="icon-sm" />
          {t('products.back_to_list')}
        </Link>

        {/* Hero: Imagen Principal del Producto */}
        <section className="product-hero">
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1200" 
              alt="Product Hero" 
              className="hero-image"
            />
            <div className="hero-overlay">
              <span className="badge">{t(`products.category_label`)}</span>
              <h1>{t('products.display_name')} (ID: {id})</h1>
            </div>
          </div>
        </section>

        {/* Catálogo de Recetas */}
        <section className="recipes-section">
          <div className="section-header">
            <Utensils className="icon-md" />
            <h2>{t('products.recipes_catalog_title')}</h2>
          </div>
          
          <div className="recipes-catalog">
            {RECIPES_MOCK.map((recipe) => (
              <div 
                key={recipe.id} 
                className="recipe-card" 
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="recipe-img-wrapper">
                  <img src={recipe.image} alt={t(recipe.nameKey)} />
                  <div className="card-overlay">
                    <span>{t('products.view_recipe')}</span>
                  </div>
                </div>
                <div className="recipe-content">
                  <h3>{t(recipe.nameKey)}</h3>
                  <div className="recipe-meta">
                    <Clock className="icon-xs" />
                    <span>20 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Historia (Debajo de las recetas) */}
        <section className="history-section">
          <div className="history-card">
            <div className="history-content">
              <div className="section-header">
                <Globe className="icon-md" />
                <h2>{t('products.history_title')}</h2>
              </div>
              <p className="history-text">
                {t('products.history_description_long')}
              </p>
              <div className="history-footer">
                <div className="stat">
                  <strong>100%</strong>
                  <span>{t('products.organic_label')}</span>
                </div>
                <div className="stat">
                  <strong>Local</strong>
                  <span>{t('products.origin_label')}</span>
                </div>
              </div>
            </div>
            <div className="history-visual">
              <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=600" alt="History" />
            </div>
          </div>
        </section>
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
                <img src={selectedRecipe.image} alt={t(selectedRecipe.nameKey)} />
              </div>
              <div className="recipe-modal-body">
                <span className="recipe-modal-badge">{t('products.featured_recipe')}</span>
                <h2>{t(selectedRecipe.nameKey)}</h2>
                <div className="recipe-modal-meta">
                  <Clock size={16} />
                  <span>20 min</span>
                </div>
                <hr />
                <div className="recipe-modal-description">
                  <h3>{t('products.instructions_label')}</h3>
                  <p>{t(selectedRecipe.descKey)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}