import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loadProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token && user) {
      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "seller") navigate("/seller");
      else navigate("/"); // customer
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("Please fill in all fields!");
    }

    try {
      await dispatch(login(formData)).unwrap();
      dispatch(loadProfile());
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading") return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login to Your Account
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
