import axios from "axios";
import { noAuthHeader } from "@/api/header.js";

const BASE_URL = "https://api.imgbb.com/1/upload";
const KEY = "6e1fd8c1e1c1a697397a2572c341a0a0";

export const uploadImage = async (image) => {
  return await axios.post(`${BASE_URL}?key=${KEY}`, image, {
    headers: noAuthHeader()
  });
};

export const royal = async () => {
  return await axios.get(import.meta.env.VITE_ROYAL_API, {
    headers: noAuthHeader()
  });
};
