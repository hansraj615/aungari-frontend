import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [darkMode, setDarkMode] = React.useState(false);
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = i18n.language || "en";

  // Apply body class on dark mode toggle
  React.useEffect(() => {
    document.body.className = darkMode
      ? "bg-dark text-light"
      : "bg-light text-dark";
  }, [darkMode]);

  const navItems = [
    { to: "/", label: t("home") },
    { to: "/about", label: t("about") },
    { to: "/darshan", label: t("darshan") },
    { to: "/events", label: t("events") },
    { to: "/trustee", label: t("boardOfTrustees") },
    { to: "/gallery", label: t("gallery") },
    { to: "/donate", label: t("donate") },
    { to: "/contact", label: t("contact") },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    const currentPath = location.pathname;
    navigate(`${currentPath}?lang=${lang}`);
  };

  const handleLinkClick = () => {
    const menu = document.getElementById("mainNavbar");
    if (menu && menu.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(menu, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-danger"
      } px-4`}
    >
      <Link
        className="navbar-brand fw-bold"
        to={`/?lang=${currentLang}`}
        onClick={handleLinkClick}
      >
        <img src="/images/logo.png" alt="Aungari Dham Logo" height="40" />{" "}
        Aungari Dham
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="navbar-nav ms-auto">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <Link
                className="nav-link"
                to={`${item.to}?lang=${currentLang}`}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Lang & Dark mode toggle buttons */}
        <div className="d-flex align-items-center ms-3 gap-2">
          <button
            className="btn btn-light btn-sm"
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </button>
          <button
            className="btn btn-light btn-sm"
            onClick={() => handleLanguageChange("hi")}
          >
            हिंदी
          </button>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
