const PRODUCTION_ORIGIN =
  "https://chromixheart-copy-production.up.railway.app";

export const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : `${PRODUCTION_ORIGIN}/api`;

export const uploadUrl = (fileName, directory = "products") => {
  const folder = directory ? `/${directory}` : "";
  const path = `/uploads${folder}/${encodeURIComponent(fileName)}`;
  return import.meta.env.DEV ? path : `${PRODUCTION_ORIGIN}${path}`;
};
