import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchEventById } from "../api/eventApi";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  useEffect(() => {
    fetchEventById(id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!event)
    return <p className="text-center py-5 text-muted">{t("eventNotFound")}</p>;

  return (
    <div className="container py-5">
      <Link to="/events" className="btn btn-sm btn-secondary mb-4">
        ← {t("backToEvents")}
      </Link>

      <div className="row">
        <div className="col-md-6">
          {event.image && (
            <img
              src={event.image}
              alt={event[`name_${lang}`]}
              className="img-fluid rounded shadow"
            />
          )}
        </div>
        <div className="col-md-6">
          <h2 className="text-danger">{event[`name_${lang}`]}</h2>
          <p className="text-muted">
            🗓️
            {new Date(event.start_date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" - "}
            {new Date(event.end_date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-3">{event[`description_${lang}`]}</p>
        </div>
      </div>
    </div>
  );
}
