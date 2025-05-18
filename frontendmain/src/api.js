import axios from 'axios';

// main API client forwards through Vite proxy at localhost:5173
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 
    "X-Requested-With": "XMLHttpRequest", 
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});

let csrfInitialized = false;

async function ensureCsrf() {
  if (!csrfInitialized) {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
    csrfInitialized = true;
    console.log("CSRF token fetched successfully");
  }
}

api.interceptors.request.use(async config => {
  const m = config.method?.toLowerCase();
  if (['post','put','patch','delete'].includes(m)) {
    await ensureCsrf();
  }
  return config;
});

api.interceptors.response.use(res => res, async err => {
  const { response, config } = err;
  if (response?.status === 419 && !config._retry) {
    console.log("Got 419 error, refreshing CSRF token and retrying...");
    config._retry = true;
    csrfInitialized = false;
    await ensureCsrf();
    return api(config);
  }
  return Promise.reject(err);
});

export default api;
