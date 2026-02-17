import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, loadProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  useEffect(() => {
    if (token && user) {
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

    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      return alert("Please fill in all fields!");
    }

    try {
      await dispatch(register(formData)).unwrap();
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
          Create an Account
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              placeholder="********"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
