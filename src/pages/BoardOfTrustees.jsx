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
      <h2 className="text-center text-danger mb-4">{t("boardOfTrustees")}</h2>

      {trustees.length === 0 ? (
        <p className="text-center text-muted">No trustees found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t("photo")}</th>
                <th scope="col">{t("name")}</th>
                <th scope="col">{t("email")}</th>
                <th scope="col">{t("mobileNumber")}</th>
                <th scope="col">{t("address")}</th>
              </tr>
            </thead>
            <tbody>
              {trustees.map((trustee, index) => (
                <tr key={trustee.id}>
                  <td>{index + 1}</td>
                  <td style={{ width: "100px" }}>
                    {trustee.image ? (
                      <img
                        src={`${IMAGE_BASE_URL}${trustee.image}`}
                        alt={trustee.name}
                        className="img-thumbnail"
                        style={{
                          height: "80px",
                          width: "80px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </td>
                  <td>{trustee.name}</td>
                  <td>{trustee.email || "—"}</td>
                  <td>{trustee.phone || "—"}</td>
                  <td>{trustee.address || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
