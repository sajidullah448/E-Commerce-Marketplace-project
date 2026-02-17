import API from "../../services/api";

/**
 * Get current user's cart
 * @returns Axios response
 */
export const getCart = async () => {
  try {
    const res = await API.get("/cart");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Add item to cart
 * @param {Object} item - { productId, quantity }
 * @returns Axios response
 */
export const addToCart = async (item) => {
  try {
    const res = await API.post("/cart", item);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Update item quantity in cart
 * @param {String} productId
 * @param {Number} quantity
 * @returns Axios response
 */
export const updateCartItem = async (productId, quantity) => {
  try {
    const res = await API.put(`/cart/${productId}`, { quantity });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Remove item from cart
 * @param {String} productId
 * @returns Axios response
 */
export const removeFromCart = async (productId) => {
  try {
    const res = await API.delete(`/cart/${productId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Checkout / Create order from cart
 * @returns Axios response
 */
export const checkoutCart = async () => {
  try {
    const res = await API.post("/orders");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};
