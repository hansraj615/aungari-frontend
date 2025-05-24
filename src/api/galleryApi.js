import { API_BASE_URL } from "../constants";

// Fetch gallery list with optional filters
export async function fetchGalleries({
  occasion_id,
  is_featured,
  search,
  from_date,
  to_date,
  sort_by = "event_date",
  sort_order = "desc",
  page = 1,
  per_page = 12,
} = {}) {
  const params = new URLSearchParams({
    page,
    per_page,
    ...(occasion_id && { occasion_id }),
    ...(is_featured && { is_featured }),
    ...(search && { search }),
    ...(from_date && { from_date }),
    ...(to_date && { to_date }),
    ...(sort_by && { sort_by }),
    ...(sort_order && { sort_order }),
  });

  const response = await fetch(`${API_BASE_URL}/galleries?${params}`);
  return response.json();
}

// Fetch single gallery details
export async function fetchGalleryById(id) {
  const response = await fetch(`${API_BASE_URL}/galleries/${id}`);
  return response.json();
}

// Fetch featured galleries
export async function fetchFeaturedGalleries() {
  const response = await fetch(`${API_BASE_URL}/galleries/featured`);
  return response.json();
}

// Fetch latest galleries
export async function fetchLatestGalleries() {
  const response = await fetch(`${API_BASE_URL}/galleries/latest`);
  return response.json();
}

// Fetch occasions list
export async function fetchOccasions({
  active_only,
  search,
  sort_by = "name_en",
  sort_order = "asc",
} = {}) {
  const params = new URLSearchParams({
    ...(active_only && { active_only }),
    ...(search && { search }),
    ...(sort_by && { sort_by }),
    ...(sort_order && { sort_order }),
  });

  const response = await fetch(`${API_BASE_URL}/occasions?${params}`);
  return response.json();
}

// Fetch occasion by slug
export async function fetchOccasionBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/occasions/${slug}`);
  return response.json();
}

// Fetch active occasions
export async function fetchActiveOccasions() {
  const response = await fetch(`${API_BASE_URL}/occasions/active`);
  return response.json();
}
