import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
let domain = window.location.origin
const formDataURL = ['product/add-product-images', '/user/update-profile'];
api.interceptors.request.use((req) => {
  let userTokenData;
  try {
    userTokenData = JSON.parse(localStorage.getItem('ecomToken'));
    // console.log("UserTokenData", userTokenData);
  } catch (error) {
    userTokenData = null;
  }
  let token = userTokenData && userTokenData.token ? userTokenData.token : null;
  // console.log("Req: ", req.url);
  req.headers['Content-Type'] = 'application/json';
  if (formDataURL.includes(req.url)) {
    req.headers['Content-Type'] = 'multipart/form-data';
  }
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  if (domain) {
    req.headers['Domain'] = domain;
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem('ecomToken');
    }
    return Promise.reject(error);
  }
);

export default api;
