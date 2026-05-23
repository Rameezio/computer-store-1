import axiosInstance from './axios';

export const usersAPI = {
  // Get all users (admin only)
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  },

  // Get single user (admin only)
  getById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Update user (admin only)
  update: async (id, userData) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user (admin only)
  delete: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },

  // Update user role (admin only)
  updateRole: async (id, role) => {
    const response = await axiosInstance.patch(`/users/${id}/role`, { role });
    return response.data;
  }
};
