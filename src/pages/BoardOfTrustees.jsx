import React, { useEffect, useState } from "react";
import { fetchTrustees } from "../api/trusteeApi";
import { IMAGE_BASE_URL } from "../constants";
import { useTranslation } from "react-i18next";

export default function BoardOfTrustees() {
  const [trustees, setTrustees] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  useEffect(() => {
    fetchTrustees().then(setTrustees);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center text-danger mb-5">{t("boardOfTrustees")}</h2>

      {trustees.length === 0 ? (
        <p className="text-center text-muted">No trustees found.</p>
      ) : (
        <div className="row g-4">
          {trustees.map((trustee) => (
            <div className="col-md-3" key={trustee.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    trustee.image
                      ? `${IMAGE_BASE_URL}${trustee.image}`
                      : "/images/dummy_user.jpg"
                  }
                  alt={trustee.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{trustee.name}</h5>
                  <p className="card-text mb-1">
                    <strong>{t("designation")}:</strong> {trustee.designation}
                  </p>
                  <p className="card-text mb-1">
                    <strong>{t("email")}:</strong> {trustee.email || "—"}
                  </p>
                  <p className="card-text mb-1">
                    <strong>{t("mobileNumber")}:</strong> {trustee.phone || "—"}
                  </p>
                  <p className="card-text">
                    <strong>{t("address")}:</strong> {trustee.address || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
