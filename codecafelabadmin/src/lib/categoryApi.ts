import apiClient from './axios';
import {  Category } from './constent';

export const getCategories = () => apiClient.get('http://localhost:5000/api/categories');
export const getCategory = (id: string) => apiClient.get(`http://localhost:5000/api/categories/${id}`);
export const createCategory = (data: Category) => apiClient.post('http://localhost:5000/api/categories', data);
export const updateCategory = (id: string, data: Category) => apiClient.put(`http://localhost:5000/api/categories/${id}`, data);
export const deleteCategory = (id: string) => apiClient.delete(`http://localhost:5000/api/categories/${id}`);
