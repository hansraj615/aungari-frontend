import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="text-center p-5">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
