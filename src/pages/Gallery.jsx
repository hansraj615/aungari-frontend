import React from "react";

export default function Gallery() {
  const images = [
    "gallery1.jpg",
    "gallery2.jpg",
    "gallery3.jpg",
    "gallery4.jpg",
  ];
  return (
    <div>
      <h2>Photo Gallery</h2>
      <div className="row">
        {images.map((src, idx) => (
          <div className="col-md-4 mb-3" key={idx}>
            <img
              src={`/images/gallery/gallery${idx + 1}.jpg`}
              className="gallery-img"
              alt={`Temple ${idx}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
