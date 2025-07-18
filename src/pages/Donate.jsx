import React from "react";
import "../style/Donate.css"; // custom styles for donation page
import { useTranslation } from "react-i18next";

export default function Donate() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <div className="donate-wrapper py-5 px-3">
      <div className="container text-center">
        <h2 className="text-primary fw-bold mb-3">
          {lang === "hi"
            ? "🌸 औंगरी धाम ट्रस्ट को दान करें"
            : "🌸 Donate to Aungari Dham Trust"}
        </h2>
        <p className="lead mb-4">
          {lang === "hi"
            ? "आपका सहयोग मंदिर के विकास और त्योहारों के आयोजन में सहायक है।"
            : "Your support helps with temple development and festival arrangements."}
        </p>

        {/* QR Section */}
        <div className="qr-section bg-light p-4 rounded shadow mb-4 d-inline-block">
          <img
            src="/images/scanner.jpg"
            alt="UPI QR"
            className="img-fluid"
            style={{ maxWidth: "220px" }}
          />
          <p className="mt-3 text-muted mb-0">
            {lang === "hi"
              ? "UPI स्कैन करें और दान करें"
              : "Scan to donate via UPI"}
          </p>
        </div>

        {/* Bank Details */}
        {/* <div
          className="bank-details card mx-auto shadow-sm border-0"
          style={{ maxWidth: "400px" }}
        >
          <div className="card-body text-start">
            <h5 className="card-title text-success">
              {lang === "hi" ? "बैंक विवरण" : "Bank Details"}
            </h5>
            <p className="card-text mb-1">
              <strong>{lang === "hi" ? "बैंक नाम" : "Bank Name"}:</strong> SBI
            </p>
            <p className="card-text mb-1">
              <strong>{lang === "hi" ? "खाता संख्या" : "Account No"}:</strong>{" "}
              1234567890
            </p>
            <p className="card-text mb-0">
              <strong>IFSC:</strong> SBIN0000001
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
