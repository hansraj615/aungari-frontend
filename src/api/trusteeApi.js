// src/api/trusteeApi.js
import { API_BASE_URL } from "../constants";

export async function fetchTrustees() {
  try {
    const res = await fetch(`${API_BASE_URL}/trustees`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Failed to fetch trustees:", err);
    return [];
  }
}
