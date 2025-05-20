import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAboutData } from "../api/aboutApi";
import { IMAGE_BASE_URL } from "../constants";
import "../style/About.css";

export default function About() {
  const { t } = useTranslation();
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchAboutData().then(setAboutData);
  }, []);

  if (!aboutData) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const { title, body, images } = aboutData;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 display-5 text-danger ">{title}</h2>
      {/* Render body HTML */}
      <div dangerouslySetInnerHTML={{ __html: body }} className="mb-5" />

      {/* Gallery Section */}
      {images?.length > 0 && (
        <>
          <h4 className="mt-5">🖼️ Gallery</h4>
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
        📲 For more info and updates, visit the{" "}
        <a
          href="https://www.facebook.com/AungariDham"
          target="_blank"
          rel="noopener noreferrer"
        >
          official Aungari Dham Facebook page
        </a>
        .
      </p>
    </div>
  );
}
