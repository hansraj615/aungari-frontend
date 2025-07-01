import React, { useEffect, useState } from "react";
import { fetchDarshanVideos } from "../api/darshanApi";
import "../style/Contact.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Darshan() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lang = params.get("lang") || "hi";
    i18n.changeLanguage(lang);
  }, [location.search, i18n]);

  useEffect(() => {
    fetchDarshanVideos().then((data) => {
      setVideos(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-danger display-5">
        🕉️ {t("darshanVideos")}
      </h2>
      <h5 className="text-center mb-4 text-danger ">
        {t("darshanDescription")}
      </h5>

      {videos.length === 0 ? (
        <p className="text-center text-muted">{t("noDarshanVideos")}</p>
      ) : (
        <div className="row g-4">
          {videos.map((video) => (
            <div className="col-md-4" key={video.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    className="rounded-top"
                    src={getEmbedUrl(video.youtube_url)}
                    title={video.title}
                    allowFullScreen
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-danger">{video.title}</h5>
                  {video.description && (
                    <p className="card-text text-muted">{video.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper to convert normal URL to embeddable one
function getEmbedUrl(url) {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}
