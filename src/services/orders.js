import axiosInstance from './axios';

export const ordersAPI = {
  // Create new order
  create: async (orderData) => {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  },

  // Get user orders
  getUserOrders: async () => {
    const response = await axiosInstance.get('/orders/my-orders');
    return response.data;
  },

  // Get single order
  getById: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  // Get all orders (admin only)
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/orders', { params });
    return response.data;
  },

  // Update order status (admin only)
  updateStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Cancel order
  cancel: async (id) => {
    const response = await axiosInstance.patch(`/orders/${id}/cancel`);
    return response.data;
  }
};
