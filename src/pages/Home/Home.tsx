import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Globe2, ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      name: 'Avocado',
      category: 'fruits',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Tomatoes',
      category: 'vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Strawberries',
      category: 'fruits',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="home">

  <section className="home-hero">
  <div className="home-hero-overlay"></div>

  <img
    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop"
    alt="Fresh Produce"
    className="home-hero-image"
  />

  <div className="home-hero-content">
    <h1>{t('home.hero_title')}</h1>
    <p>{t('home.hero_subtitle')}</p>

    <Link to="/products" className="home-hero-btn">
      {t('home.hero_btn')}
    </Link>
  </div>
</section>
      {/* PRODUCTS */}
      <section className="products-intro">
        <div className="products-text">
          <h2>{t('home.products_intro_title')}</h2>
          <p>{t('home.products_intro_desc')}</p>
          <Link to="/products" className="link-primary">
            {t('home.hero_btn')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <span>{t(`products.category_${product.category}`)}</span>
                <h3>{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
     {/* ABOUT + BENEFITS */}
{/* ABOUT + BENEFITS */}
<section className="about-benefits">

  <div className="about-benefits-container">

    {/* TEXTO */}
    <div className="about-text">
      <h2>{t('home.about_mini_title')}</h2>
      <p>{t('home.about_mini_desc')}</p>

      <Link to="/about" className="btn-primary">
        {t('home.about_btn')}
      </Link>
    </div>

    {/* BENEFICIOS EN LISTA */}
    <div className="benefits-list">

      <div className="benefit-card">
        <Truck size={30} />
        <div>
          <h3>{t('home.benefit_1_title')}</h3>
          <p>{t('home.benefit_1_desc')}</p>
        </div>
      </div>

      <div className="benefit-card">
        <ShieldCheck size={30} />
        <div>
          <h3>{t('home.benefit_2_title')}</h3>
          <p>{t('home.benefit_2_desc')}</p>
        </div>
      </div>

      <div className="benefit-card">
        <Globe2 size={30} />
        <div>
          <h3>{t('home.benefit_3_title')}</h3>
          <p>{t('home.benefit_3_desc')}</p>
        </div>
      </div>

    </div>

  </div>

</section>
      {/* CONTACT CTA */}
      <section className="contact-cta">
        <h2>{t('home.contact_cta_title')}</h2>
        <p>{t('home.contact_cta_desc')}</p>
        <Link to="/contact" className="btn-primary">
          {t('home.contact_btn')}
        </Link>
      </section>

    </div>
  );
}