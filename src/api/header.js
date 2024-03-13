import config from "@/config/nurtitionix.json";

export const authHeader = () => {
  return {
    "Content-Type": "application/json",
    "x-app-id": config.APP_ID,
    "x-app-key": config.APP_KEY
  };
};

export const noAuthHeader = () => {
  return {
    "Content-Type": "multipart/form-data"
  };
};
