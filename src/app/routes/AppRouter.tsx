import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../../pages/Home/Home';
import AboutUs from '../../pages/AboutUs/AboutUs';
import Products from '../../pages/Products/Products';
import ProductDetail from '../../pages/ProductDetail/ProductDetail';
import QualityAssurance from '../../pages/Assurance/Assurance';
import Contact from '../../pages/Contact/Contact';
import ScrollToTop from '../../components/common/ScrollToTop';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="quality" element={<QualityAssurance />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<div className="p-20 text-center text-2xl">404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
