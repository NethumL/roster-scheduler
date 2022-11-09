/**
 * @param {string} method
 * @param {string} endpoint
 * @param {*} body
 * @param {RequestInit} customConfig
 */
export async function send(method, endpoint, body = null, customConfig = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }
}

/** @param {RequestInfo | URL} url */
export const fetcher = (url) => fetch(url).then((res) => res.json());
