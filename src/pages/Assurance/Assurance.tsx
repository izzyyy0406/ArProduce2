import { useTranslation } from "react-i18next";
import { Globe2, CheckCircle2, ShieldCheck } from "lucide-react";
import "./Assurance.css";

export default function QualityAssurance() {
  const { t } = useTranslation();

  return (
    <div className="assurance-page">

      {/* HERO */}
      <section className="assurance-hero">
        <div className="hero-bg"></div>

        <div className="assurance-hero-content">
          <h1>{t("quality.title")}</h1>
          <p>{t("quality.subtitle")}</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="assurance-intro">
        <p>{t("quality.desc")}</p>
      </section>

      {/* CERTIFICATES */}
      <section className="certificates-section">
        <div className="certificates-grid">

          {/* CERT 1 */}
          <div className="certificate-card">
            <div className="cert-icon">
              <Globe2 size={36} />
            </div>

            <h3>{t("quality.cert_1")}</h3>

            <img
              src="https://images.unsplash.com/photo-1605371924599-2d0365da26f5?q=80&w=400"
              alt="Global GAP"
            />

            <button className="cert-btn">
              {t("quality.view_certificate")}
            </button>
          </div>

          {/* CERT 2 */}
          <div className="certificate-card">
            <div className="cert-icon">
              <CheckCircle2 size={36} />
            </div>

            <h3>{t("quality.cert_2")}</h3>

            <img
              src="https://images.unsplash.com/photo-1590402237351-40113203f5ce?q=80&w=400"
              alt="USDA Organic"
            />

            <button className="cert-btn">
              {t("quality.view_certificate")}
            </button>
          </div>

          {/* CERT 3 */}
          <div className="certificate-card">
            <div className="cert-icon">
              <ShieldCheck size={36} />
            </div>

            <h3>{t("quality.cert_3")}</h3>

            <img
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400"
              alt="FDA Approved"
            />

            <button className="cert-btn">
              {t("quality.view_certificate")}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}