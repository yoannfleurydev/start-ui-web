import Axios, { AxiosResponse } from 'axios';

import { AUTH_TOKEN_KEY } from '@/spa/auth/AuthContext';
import { isBrowser } from '@/utils/ssr';

Axios.interceptors.request.use(
  (config) => {
    const isExternal = !!config?.url?.startsWith('http');
    const token = isBrowser ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

    if (token && !isExternal) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.headers['x-total-count']) {
    return {
      content: response.data,
      totalItems: response?.headers['x-total-count'],
    };
  }
  return response.data;
});
