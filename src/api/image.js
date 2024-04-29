import axios from "axios";
import { noAuthHeader } from "@/api/header.js";
import {API_KEY} from "@/config/imgbb.json"

const BASE_URL = "https://api.imgbb.com/1/upload";

export const uploadImage = async (image) => {
  return await axios.post(`${BASE_URL}?key=${API_KEY}`, image, {
    headers: noAuthHeader()
  });
};

export const royal = async () => {
  return await axios.get(import.meta.env.VITE_ROYAL_API, {
    headers: noAuthHeader()
  });
};
