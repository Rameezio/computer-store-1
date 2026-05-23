import axiosInstance from './axios';

export const adminAPI = {
  // Get dashboard stats
  getStats: async () => {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  },

  // Get recent orders
  getRecentOrders: async (limit = 10) => {
    const response = await axiosInstance.get(`/admin/recent-orders?limit=${limit}`);
    return response.data;
  },

  // Get top products
  getTopProducts: async (limit = 10) => {
    const response = await axiosInstance.get(`/admin/top-products?limit=${limit}`);
    return response.data;
  },

  // Get sales data for charts
  getSalesData: async (period = '7d') => {
    const response = await axiosInstance.get(`/admin/sales?period=${period}`);
    return response.data;
  }
};
