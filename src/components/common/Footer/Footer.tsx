import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import LogoAr from "../../../assets/images/LogoAr.png";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* ================= BRAND SECTION ================= */}
        <div className="footer-section">
          <div className="footer-logo">
            <NavLink to="/">
              <img src={LogoAr} alt="AR Produce Logo" />
            </NavLink>
          </div>

          <p className="footer-description">
            {t("footer.desc")}
          </p>

          <div className="footer-socials">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div className="footer-section">
          <h3>{t("footer.quick_links")}</h3>
          <ul>
            <li><NavLink to="/">{t("nav.home")}</NavLink></li>
            <li><NavLink to="/about">{t("nav.about")}</NavLink></li>
            <li><NavLink to="/products">{t("nav.products")}</NavLink></li>
            <li><NavLink to="/quality">{t("nav.quality")}</NavLink></li>
            <li><NavLink to="/contact">{t("nav.contact")}</NavLink></li>
          </ul>
        </div>

        {/* ================= CONTACT INFO ================= */}
        <div className="footer-section">
          <h3>{t("footer.contact_us")}</h3>

          <div className="footer-contact">
            <MapPin size={18} />
            <span>{t("contact.address")}</span>
          </div>

          <div className="footer-contact">
            <Phone size={18} />
            <span>{t("contact.phone")}</span>
          </div>

          <div className="footer-contact">
            <Mail size={18} />
            <span>{t("contact.email")}</span>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="footer-bottom">
        <p>{t("footer.rights")}</p>
      </div>
    </footer>
  );
}