import React, { useState, useEffect } from "react";
import "../style/Contact.css";
import { sendContactMessage } from "../api/contactApi";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Set language from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const lang = searchParams.get("lang");
    if (lang && ["en", "hi"].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });
    try {
      await sendContactMessage(form);
      setAlert({
        type: "success",
        message: t("sendMessageSuccess") || "Message sent successfully!",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setAlert({
        type: "danger",
        message: t("sendMessageFailed") || "Failed to send. Please try again.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="contact-fullscreen">
      <div className="form-box">
        <h2>{t("contactUs")}</h2>
        {alert.message && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlert({ type: "", message: "" })}
            ></button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t("yourName")}
            required
          />
          <input
            className="form-control"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={t("yourEmail")}
            required
          />
          <textarea
            className="form-control"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t("yourMessage")}
            required
          />
          <button
            className="btn btn-danger w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {t("sending") || "Sending..."}
              </>
            ) : (
              t("sendMessage")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
