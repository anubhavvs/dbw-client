/* eslint-disable no-undef */
export const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://dbw-server.onrender.com/api';
