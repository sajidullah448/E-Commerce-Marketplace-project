import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchAllOrders } from "../features/orders/orderSlice";
import { fetchProducts } from "../features/products/productSlice";
import { FaBoxOpen, FaShoppingCart, FaDollarSign } from "react-icons/fa";

export default function SellerDashboard() {
  const dispatch = useDispatch();
  const { orders, status: ordersStatus } = useSelector((state) => state.orders);
  const { products, status: productsStatus } = useSelector((state) => state.products);

  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      const total = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      setRevenue(total);
    }
  }, [orders]);

  if (ordersStatus === "loading" || productsStatus === "loading") return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-green-600 text-white p-4 rounded-full">
            <FaBoxOpen size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Products</h2>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <FaShoppingCart size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-4 rounded-full">
            <FaDollarSign size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
            <p className="text-2xl font-bold text-gray-900">${revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
