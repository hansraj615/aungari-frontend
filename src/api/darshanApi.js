import axios from "axios";

import { API_BASE_URL } from "../constants";

export async function fetchDarshanVideos() {
  try {
    const response = await axios.get(`${API_BASE_URL}/darshan-videos`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Darshan videos:", error);
    return [];
  }
}
