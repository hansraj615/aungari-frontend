import { API_BASE_URL } from "../constants";

// Fetch all or filtered events
export async function fetchEvents({ year, month } = {}) {
  const url = new URL(`${API_BASE_URL}/events`);
  if (year) url.searchParams.append("year", year);
  if (month) url.searchParams.append("month", month.padStart(2, "0"));

  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log("Fetched events:", json);
    return json.data || [];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
  }
}

// ✅ NEW: Fetch single event by ID
export async function fetchEventById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/events/${id}`);
    const json = await res.json();
    console.log("Fetched events:", json);
    return json.data || null;
  } catch (err) {
    console.error(`Failed to fetch event with id ${id}:`, err);
    return null;
  }
}
