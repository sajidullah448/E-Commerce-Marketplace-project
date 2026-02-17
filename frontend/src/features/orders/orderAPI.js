import API from "../../services/api";

/**
 * Get all orders for current user (customer)
 * @returns Axios response
 */
export const getUserOrders = async () => {
  try {
    const res = await API.get("/orders/my");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Get all orders (admin or seller)
 * @returns Axios response
 */
export const getAllOrders = async () => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Get single order by ID
 * @param {string} orderId
 * @returns Axios response
 */
export const getOrderById = async (orderId) => {
  try {
    const res = await API.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Update order status (admin or seller)
 * @param {string} orderId
 * @param {string} status - "pending", "shipped", "delivered"
 * @returns Axios response
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await API.put(`/orders/${orderId}`, { status });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};
