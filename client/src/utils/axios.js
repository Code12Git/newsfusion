import axios from "axios";

const BASE_URL = "http://localhost:7000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const createAuthorizedRequest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  return axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};
