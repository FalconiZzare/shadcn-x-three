import axios from "axios";
import { authHeader } from "@/api/header.js";

const BASE_URL = "https://trackapi.nutritionix.com";
const INSTANT_ENDPOINT = "v2/search/instant";
const ITEM_ENDPOINT = "v2/search/item";
const NATURAL_NUTRIENTS_ENDPOINT = "v2/natural/nutrients";
const NATURAL_EXERCISE_ENDPOINT = "v2/natural/exercise";

export const instantSearch = async (query) => {
  return await axios.get(`${BASE_URL}/${INSTANT_ENDPOINT}/?query=${query}`, {
    headers: authHeader()
  });
};

export const itemSearch = async (nixId) => {
  return await axios.get(`${BASE_URL}/${ITEM_ENDPOINT}/?nix_item_id=${nixId}`, {
    headers: authHeader()
  });
};

export const naturalNutrients = async (data) => {
  return await axios.post(`${BASE_URL}/${NATURAL_NUTRIENTS_ENDPOINT}`, data, {
    headers: authHeader()
  });
};

export const naturalExercise = async (data) => {
  return await axios.post(`${BASE_URL}/${NATURAL_EXERCISE_ENDPOINT}`, data, {
    headers: authHeader()
  });
};
