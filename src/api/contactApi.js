import axios from "axios";
import { API_BASE_URL } from "../constants";
export const sendContactMessage = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/contact`, formData);
  return response.data;
};
