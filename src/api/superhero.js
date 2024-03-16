import axios from "axios";
import { noAuthHeader } from "@/api/header.js";

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api";

export const nameSearch = async (token, name) => {
  return await axios.get(`${BASE_URL}/${token}/search/${name}`, {
    headers: noAuthHeader()
  });
};

export const idSearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}`, {
    headers: noAuthHeader()
  });
};

export const powerstatsSearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}/powerstats`, {
    headers: noAuthHeader()
  });
};

export const biographySearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}/biography`, {
    headers: noAuthHeader()
  });
};

export const appearanceSearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}/appearance`, {
    headers: noAuthHeader()
  });
};

export const workSearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}/work`, {
    headers: noAuthHeader()
  });
};

export const connectionsSearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}/connections`, {
    headers: noAuthHeader()
  });
};

export const imageSearch = async (token, id) => {
  return await axios.get(`${BASE_URL}/${token}/${id}/image`, {
    headers: noAuthHeader()
  });
};
