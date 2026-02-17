import API from "../../services/api";

/**
 * Register a new user (customer or seller)
 * @param {Object} userData - { name, email, password, role }
 * @returns Axios response
 */
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns Axios response
 */
export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

/**
 * Fetch currently logged-in user profile
 * @returns Axios response
 */
export const fetchProfile = async () => {
  try {
    const res = await API.get("/auth/profile");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};
