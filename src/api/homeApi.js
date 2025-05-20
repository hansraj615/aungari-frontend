import { API_BASE_URL } from "../constants";

export const fetchHomeData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/homes/1`, {
      headers: { Accept: "application/json" },
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};
