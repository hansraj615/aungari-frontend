import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAboutData } from "../api/aboutApi";
import { IMAGE_BASE_URL } from "../constants";
import "../style/About.css";

export default function About() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lang = params.get("lang") || "en";
    i18n.changeLanguage(lang);
  }, [location.search, i18n]);

  useEffect(() => {
    fetchAboutData().then(setAboutData);
  }, []);

  const fixImagePaths = (html) => {
    return html
      .replace(/src=\"\/storage\//g, `src=\"${IMAGE_BASE_URL}`)
      .replace(/(<img [^>]*)(width|height)=\"[^\"]*\"([^>]*>)/gi, "$1$3")
      .replace(/<img /g, '<img class="img-fluid rounded shadow" ');
  };

  if (!aboutData) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const { title_en, title_hi, body_en, body_hi, images } = aboutData;
  const lang = i18n.language;
  const title = lang === "hi" ? title_hi : title_en;
  const body = lang === "hi" ? body_hi : body_en;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 display-5 text-danger ">{title}</h2>

      {/* Render fixed body HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: fixImagePaths(body) }}
        className="mb-5 "
      />

      {/* Gallery Section */}
      {images?.length > 0 && (
        <>
          <h4 className="mt-5">🖼️ {lang === "hi" ? "गैलरी" : "Gallery"}</h4>
          <div className="row g-3">
            {images.map((img, index) => (
              <div className="col-6 col-md-3" key={index}>
                <img
                  src={`${IMAGE_BASE_URL}${img}`}
                  alt={`Aungari Dham ${index + 1}`}
                  className="gallery-img"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-4">
        📲{" "}
        {lang === "hi"
          ? "अधिक जानकारी और अपडेट्स के लिए, विजिट करें"
          : "For more info and updates, visit the"}{" "}
        <a
          href="https://www.facebook.com/AungariDham"
          target="_blank"
          rel="noopener noreferrer"
        >
          {lang === "hi"
            ? "आधिकारिक औंगरी धाम फेसबुक पेज"
            : "official Aungari Dham Facebook page"}
        </a>
        .
      </p>
    </div>
  );
}
