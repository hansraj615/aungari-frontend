import { API_BASE_URL } from "../constants";

export const fetchAboutData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/abouts/1`, {
      headers: { Accept: "application/json" },
    });
    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error("Failed to fetch About data:", err);
    return null;
  }
};
