import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchHomeData } from "../api/homeApi";
import { IMAGE_BASE_URL, ROUTES } from "../constants";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  // Set language from URL
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang && ["en", "hi"].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  useEffect(() => {
    fetchHomeData().then(setHomeData);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.querySelector("#carouselHero");
      if (window.bootstrap && el) {
        new window.bootstrap.Carousel(el, {
          interval: 4000,
          ride: "carousel",
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!homeData) {
    return <div className="text-center p-5">Loading homepage...</div>;
  }

  const lang = i18n.language || "en";
  const hero_section = homeData.hero_section;
  const dynamic_sections = homeData.dynamic_sections || [];

  return (
    <div>
      {/* HERO SECTION */}
      {hero_section?.images?.length > 0 && (
        <div
          id="carouselHero"
          className="carousel slide container-fluid"
          data-bs-ride="carousel"
          data-bs-interval="4000"
          style={{ maxHeight: "80vh", overflow: "hidden" }}
        >
          <div className="carousel-inner">
            {hero_section.images.map((imgPath, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={`${IMAGE_BASE_URL}${imgPath}`}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ objectFit: "cover", height: "80vh" }}
                />
                <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                  <h1 className="display-3 fw-bold bg-dark bg-opacity-50 p-3 rounded">
                    {hero_section[`title_${lang}`]}
                  </h1>
                  <p className="lead bg-dark bg-opacity-50 px-3 py-2 rounded">
                    {hero_section[`subtitle_${lang}`]}
                  </p>
                  <a
                    href={ROUTES.darshan}
                    className="btn btn-warning btn-lg mt-3 shadow"
                  >
                    📺 Watch Live Darshan
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselHero"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselHero"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}

      {/* RENDER DYNAMIC SECTIONS */}
      {dynamic_sections.map((section, index) => (
        <SectionRenderer
          key={index}
          section={section}
          lang={lang}
          baseUrl={IMAGE_BASE_URL}
        />
      ))}

      {/* GALLERY */}
      <div
        className="container-fluid px-4 py-5"
        style={{ maxWidth: "1140px", margin: "0 auto" }}
      >
        <h3 className="text-center text-danger mb-4">Temple Gallery</h3>
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-md-4 mb-3" key={i}>
              <img
                src={`/images/home/gallery/gallery${i}.jpg`}
                alt={`Gallery ${i}`}
                className="img-fluid rounded shadow"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <a href="/gallery" className="btn btn-outline-secondary">
            📸 View Full Gallery
          </a>
        </div>
      </div>

      {/* VISITOR INFO */}
      <div className="bg-dark text-white py-5">
        <div
          className="w-100 px-4 text-center"
          style={{ maxWidth: "1140px", margin: "0 auto" }}
        >
          <h4>📍 Visit Aungari Dham</h4>
          <p>Aungari Village, Nalanda District, Bihar</p>
          <p>🕔 Open: 5 AM – 8 PM Daily</p>
          <iframe
            title="Temple Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.274276177127!2d85.2514386!3d25.193971349999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2c0131dfb0793%3A0x936292dcd64df843!2sSun%20Temple%2CAungari%2CNalanda!5e0!3m2!1sen!2sin!4v1746457196722!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

function SectionRenderer({ section, lang, baseUrl }) {
  switch (section.type) {
    case "text":
      return (
        <div className="container py-5 text-center">
          <h2 className="text-danger mb-3">{section[`title_${lang}`]}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: section[`content_${lang}`] || section.content,
            }}
          />
        </div>
      );

    case "cta":
      return (
        <section
          className="text-white text-center d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${baseUrl}${section.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
            padding: "60px 20px",
          }}
        >
          <h2 className="display-5 text-warning mb-3">
            {section[`title_${lang}`]}
          </h2>
          <div
            className="lead mb-4"
            dangerouslySetInnerHTML={{
              __html: section[`content_${lang}`] || section.content,
            }}
          />
          {section.button_link && section[`button_text_${lang}`] && (
            <a href={section.button_link} className="btn btn-warning btn-lg">
              {section[`button_text_${lang}`]}
            </a>
          )}
        </section>
      );

    case "cards":
      return (
        <div
          className="bg-gradient py-5"
          style={{ background: "linear-gradient(to right, #FFF3CD, #FFE0B2)" }}
        >
          <div className="container text-center">
            <h3 className="mb-4 text-danger">{section[`title_${lang}`]}</h3>
            <div className="row">
              {section.items.map((item, i) => (
                <div className="col-md-4 mb-4" key={i}>
                  <div className="card border-0 shadow h-100">
                    <div className="card-body">
                      <div className="display-4">{item.icon}</div>
                      <h5 className="card-title mt-3">
                        {item[`title_${lang}`]}
                      </h5>
                      <p className="card-text">{item[`description_${lang}`]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "video":
      return section.video_url ? (
        <div className="container py-5 text-center">
          <h2 className="text-danger mb-4">{section[`title_${lang}`]}</h2>
          <div className="ratio ratio-16x9">
            <iframe
              src={section.video_url.replace(
                "youtu.be/",
                "www.youtube.com/embed/"
              )}
              title={section[`title_${lang}`]}
              allowFullScreen
              width="100%"
              height="400"
              style={{
                borderRadius: "12px",
                boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              }}
            ></iframe>
          </div>
        </div>
      ) : null;

    default:
      return null;
  }
}
