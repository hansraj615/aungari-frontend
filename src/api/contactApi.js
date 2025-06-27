import axios from "axios";

export const sendContactMessage = async (formData) => {
  const response = await axios.post(
    "http://localhost:8001/api/contact",
    formData
  );
  return response.data;
};
