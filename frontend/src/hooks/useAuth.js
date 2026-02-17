import { useSelector } from "react-redux";

/**
 * Custom hook to get authentication info
 * @returns {Object} { user, token, isAuthenticated, role }
 */
export default function useAuth() {
  const { user, token } = useSelector((state) => state.auth);

  return {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!token && !!user,
  };
}
