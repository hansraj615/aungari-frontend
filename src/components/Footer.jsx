import React, { useEffect, useState } from "react";
import { API_BASE_URL, ROUTES } from "../constants";

export default function Footer() {
  const [visitorStats, setVisitorStats] = useState({
    total_visits: 0,
    unique_visitors: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/visitor-count`)
      .then((res) => res.json())
      .then((data) =>
        setVisitorStats({
          total_visits: data.total_visits,
          unique_visitors: data.unique_visitors,
        })
      )
      .catch((err) => console.error("Failed to load visitor count", err));
  }, []);

  return (
    <footer className="bg-dark text-light text-center py-3">
      <p className="mb-0">
        © 2025 Aungari Dham Trust | Developed with devotion 🕉️
      </p>
      <div className="d-flex justify-content-center gap-3 mt-1">
        <p className="mb-0">
          <span role="img" aria-label="eye">
            👁️
          </span>{" "}
          Total Visits: {visitorStats.total_visits}
        </p>
        <p className="mb-0">
          <span role="img" aria-label="unique">
            👤
          </span>{" "}
          Unique Visitors: {visitorStats.unique_visitors}
        </p>
      </div>
    </footer>
  );
}
