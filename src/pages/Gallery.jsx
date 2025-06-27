import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchGalleries } from "../api/galleryApi";
import { IMAGE_BASE_URL } from "../constants";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlassPlus,
  FaMagnifyingGlassMinus,
} from "react-icons/fa6";

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  // State
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Image viewer state
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentGallery, setCurrentGallery] = useState(null);

  // Load galleries
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const galleriesResponse = await fetchGalleries({ page: currentPage });
        setGalleries(galleriesResponse.data);
        setTotalPages(
          Math.ceil(galleriesResponse.total / galleriesResponse.per_page)
        );
      } catch (error) {
        console.error("Error loading gallery data:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [currentPage]);

  const openImageViewer = (gallery, imageIndex) => {
    setCurrentGallery(gallery);
    setCurrentImageIndex(imageIndex);
    setSelectedImage(gallery.images[imageIndex]);
    setZoomLevel(1);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setCurrentGallery(null);
    setZoomLevel(1);
  };

  const navigateImage = (direction) => {
    if (!currentGallery) return;

    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = currentGallery.images.length - 1;
    if (newIndex >= currentGallery.images.length) newIndex = 0;

    setCurrentImageIndex(newIndex);
    setSelectedImage(currentGallery.images[newIndex]);
    setZoomLevel(1);
  };

  const handleZoom = (increment) => {
    setZoomLevel((prev) => {
      const newZoom = prev + increment;
      return Math.min(Math.max(1, newZoom), 3);
    });
  };

  if (loading && !galleries.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-danger mb-4">{t("gallery")}</h2>
      {/* Gallery Grid */}
      <div className="row g-4">
        {galleries.map((gallery) => (
          <div key={gallery.id} className="col-md-4 col-lg-3">
            <div className="card h-100">
              {gallery.images?.[0] && (
                <img
                  src={`${IMAGE_BASE_URL}${gallery.images[0].image_path}`}
                  className="card-img-top"
                  alt={gallery.images[0][`caption_${lang}`]}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => openImageViewer(gallery, 0)}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{gallery[`title_${lang}`]}</h5>
                <p className="card-text small text-muted">
                  {new Date(gallery.event_date).toLocaleDateString()}
                </p>
                <p className="card-text">{gallery[`description_${lang}`]}</p>
                {gallery.occasion && (
                  <span className="badge bg-primary">
                    {gallery.occasion[`name_${lang}`]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Gallery pagination">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={closeImageViewer}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark">
              <div className="modal-header border-0 d-flex justify-content-between align-items-center">
                <h5 className="modal-title text-white">
                  {selectedImage[`caption_${lang}`]}
                </h5>
                <button
                  type="button"
                  className="btn btn-light btn-sm rounded-circle"
                  onClick={closeImageViewer}
                  style={{ width: "32px", height: "32px", padding: "4px" }}
                >
                  <FaXmark size={16} />
                </button>
              </div>
              <div
                className="modal-body text-center p-0"
                style={{ height: "70vh", overflow: "hidden" }}
              >
                <img
                  src={`${IMAGE_BASE_URL}${selectedImage.image_path}`}
                  alt={selectedImage[`caption_${lang}`]}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    transform: `scale(${zoomLevel})`,
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <div className="modal-footer justify-content-between border-0">
                <div>
                  <button
                    className="btn btn-light me-2"
                    onClick={() => handleZoom(0.5)}
                    disabled={zoomLevel >= 3}
                  >
                    <FaMagnifyingGlassPlus />
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => handleZoom(-0.5)}
                    disabled={zoomLevel <= 1}
                  >
                    <FaMagnifyingGlassMinus />
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-light me-2"
                    onClick={() => navigateImage(-1)}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => navigateImage(1)}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
