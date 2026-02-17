import API from "../../services/api";

/**
 * Fetch all products
 * @returns Axios response
 */
export const getProducts = async () => {
  try {
    const res = await API.get("/products");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Fetch single product by ID
 * @param {string} productId
 * @returns Axios response
 */
export const getProductById = async (productId) => {
  try {
    const res = await API.get(`/products/${productId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Create new product (seller)
 * @param {Object} productData - { title, description, price, stock, category, images }
 * @returns Axios response
 */
export const createProduct = async (productData) => {
  try {
    const res = await API.post("/products", productData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Update existing product (seller)
 * @param {string} productId
 * @param {Object} productData
 * @returns Axios response
 */
export const updateProduct = async (productId, productData) => {
  try {
    const res = await API.put(`/products/${productId}`, productData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Delete product (seller)
 * @param {string} productId
 * @returns Axios response
 */
export const deleteProduct = async (productId) => {
  try {
    const res = await API.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};
