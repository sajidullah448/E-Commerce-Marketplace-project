import React, { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          API.get("/admin/users-count"),
          API.get("/admin/products-count"),
          API.get("/admin/orders-count"),
        ]);

        setStats({
          users: usersRes.data.count,
          products: productsRes.data.count,
          orders: ordersRes.data.count,
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-4 rounded-full">
            <FaUsers size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
            <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-green-600 text-white p-4 rounded-full">
            <FaBoxOpen size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
            <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <FaShoppingCart size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
