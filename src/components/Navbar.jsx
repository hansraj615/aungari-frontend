import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [darkMode, setDarkMode] = React.useState(false);
  const { i18n, t } = useTranslation();

  // Apply body class on dark mode toggle
  React.useEffect(() => {
    document.body.className = darkMode
      ? "bg-dark text-light"
      : "bg-light text-dark";
  }, [darkMode]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-danger"
      } px-4`}
    >
      <Link className="navbar-brand fw-bold" to="/">
        {" "}
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
          <li className="nav-item">
            <Link className="nav-link" to="/">
              {t("home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              {t("about")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/darshan">
              {t("darshan")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/events">
              {t("events")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              {t("gallery")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/donate">
              {t("donate")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              {t("contact")}
            </Link>
          </li>
        </ul>

        {/* Lang & Dark mode toggle buttons */}
        <div className="d-flex align-items-center ms-3 gap-2">
          <button
            className="btn btn-light btn-sm"
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </button>
          <button
            className="btn btn-light btn-sm"
            onClick={() => i18n.changeLanguage("hi")}
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
