import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import LogoAr from "../../../assets/images/LogoAr.png";
import "./Navbar.css";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.products"), path: "/products" },
    { name: t("nav.quality"), path: "/quality" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      {isOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">

            {/* Logo */}
            <div className="navbar-left">
              <NavLink to="/" className="navbar-logo">
                <img src={LogoAr} alt="AR logo" className="navbar-logo-img" />
              </NavLink>
            </div>

            {/* Desktop Links */}
            <div className="navbar-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="navbar-right">

              {/* Language Selector */}
              <div className="language-selector">
                <button
                  className="language-button"
                  onClick={() => setLangOpen(!langOpen)}
                >
                  <Globe size={18} />
                  <span>{i18n.language.toUpperCase()}</span>
                </button>

                {langOpen && (
                  <div className="language-dropdown">
                    <button onClick={() => changeLanguage("en")}>English</button>
                    <button onClick={() => changeLanguage("es")}>Español</button>
                    <button onClick={() => changeLanguage("fr")}>Français</button>
                  </div>
                )}
              </div>

              {/* Mobile Toggle */}
              <button className="mobile-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className="mobile-link"
            >
              {link.name}
            </NavLink>
          ))}

          <div className="mobile-languages">
            <button onClick={() => { changeLanguage("en"); closeMenu(); }}>EN</button>
            <button onClick={() => { changeLanguage("es"); closeMenu(); }}>ES</button>
            <button onClick={() => { changeLanguage("fr"); closeMenu(); }}>FR</button>
          </div>
        </div>
      </nav>
    </>
  );
}