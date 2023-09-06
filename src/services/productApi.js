import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export async function validateProductPrice(formData) {
  const response = await axios.post(`${baseURL}products/validate-prices`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function updateProductPrice(formData) {
  const response = await axios.post(`${baseURL}products/update-prices`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
