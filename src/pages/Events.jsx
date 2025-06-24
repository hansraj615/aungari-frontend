import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventApi";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

export default function Events() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  useEffect(() => {
    setLoading(true);
    fetchEvents({ year, month }).then((data) => {
      setEvents(data);
      setLoading(false);
    });

    // Fetch all events for the selected year (ignoring month)
    fetchEvents({ year }).then(setAllEvents);
  }, [year, month]);

  if (loading) return <LoadingSpinner />;

  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const monthOptions = [
    { value: "01", label: lang === "hi" ? "जनवरी" : "January" },
    { value: "02", label: lang === "hi" ? "फ़रवरी" : "February" },
    { value: "03", label: lang === "hi" ? "मार्च" : "March" },
    { value: "04", label: lang === "hi" ? "अप्रैल" : "April" },
    { value: "05", label: lang === "hi" ? "मई" : "May" },
    { value: "06", label: lang === "hi" ? "जून" : "June" },
    { value: "07", label: lang === "hi" ? "जुलाई" : "July" },
    { value: "08", label: lang === "hi" ? "अगस्त" : "August" },
    { value: "09", label: lang === "hi" ? "सितंबर" : "September" },
    { value: "10", label: lang === "hi" ? "अक्टूबर" : "October" },
    { value: "11", label: lang === "hi" ? "नवंबर" : "November" },
    { value: "12", label: lang === "hi" ? "दिसंबर" : "December" },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center text-danger mb-4">{t("upcomingEvents")}</h2>

      {/* Filters */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={month}
            onChange={(e) => setMonth(e.target.value.padStart(2, "0"))}
          >
            {monthOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Event Cards */}
      {events.length === 0 ? (
        <p className="text-center text-muted">{t("noEvents")}</p>
      ) : (
        <div className="row g-4">
          {events.map((event) => (
            <div className="col-md-4" key={event.id}>
              <div
                className={`card shadow-sm h-100 border-0 ${
                  event.show_in_banner ? "border border-warning border-3" : ""
                }`}
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event[`name_${lang}`]}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    {event[`name_${lang}`]}
                  </h5>
                  <p className="card-text small text-muted">
                    📅
                    {new Date(event.start_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" - "}
                    {new Date(event.end_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {event[`description_${lang}`] && (
                    <p className="card-text">
                      {event[`description_${lang}`].slice(0, 80)}...
                    </p>
                  )}
                  <Link
                    to={`/events/${event.id}`}
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Events for the Year */}
      <div className="pt-5 mt-5 border-top">
        <h3 className="text-center text-danger mb-4">
          {lang === "hi" ? "इस वर्ष के सभी कार्यक्रम" : "All Events This Year"}
        </h3>
        <div className="row g-4">
          {allEvents.map((event) => (
            <div className="col-md-3" key={event.id}>
              <div className="card border-0 shadow-sm h-100">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event[`name_${lang}`]}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h6 className="card-title text-danger">
                    {event[`name_${lang}`]}
                  </h6>
                  <p className="card-text small text-muted">
                    📅
                    {new Date(event.start_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" - "}
                    {new Date(event.end_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <Link
                    to={`/events/${event.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
