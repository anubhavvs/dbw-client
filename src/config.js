/* eslint-disable no-undef */
export const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.178.91:5000/api'
    : process.env.BACKEND_URL;
