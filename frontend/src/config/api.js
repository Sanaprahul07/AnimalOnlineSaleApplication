const rawApiUrl = import.meta.env.VITE_API_URL || "";

export const API_URL = rawApiUrl.replace(/\/+$/, "");

export const apiUrl = (path = "") => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${API_URL}${normalizedPath}`;
};
