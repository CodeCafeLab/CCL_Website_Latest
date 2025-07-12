import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProducts = () => apiClient.get('/products');
export const getProduct = (id: string) => apiClient.get(`/products/${id}`); 