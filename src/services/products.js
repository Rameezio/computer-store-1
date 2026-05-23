import axiosInstance from './axios';

export const productsAPI = {
  // Get all products
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },

  // Get single product
  getById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getByCategory: async (category) => {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data;
  },

  // Search products
  search: async (query) => {
    const response = await axiosInstance.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Create product (admin only)
  create: async (productData) => {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  },

  // Update product (admin only)
  update: async (id, productData) => {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (admin only)
  delete: async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },

  // Upload product images (admin only) — requires Cloudinary
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    const response = await axiosInstance.post('/products/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
