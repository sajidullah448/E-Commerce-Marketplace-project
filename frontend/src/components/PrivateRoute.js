import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PrivateRoute component
 * @param {ReactNode} children - component to render
 * @param {string} role - optional role restriction ("admin", "seller", "customer")
 */
export default function PrivateRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // User not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // User does not have required role → redirect to home
    return <Navigate to="/" replace />;
  }

  // Authorized → render children
  return children;
}
