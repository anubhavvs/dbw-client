/* eslint-disable no-undef */
export const URL =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? 'http://192.168.178.91:5000/api'
    : import.meta.env.VITE_BACKEND_URL;
