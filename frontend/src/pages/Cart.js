import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addItem,
  updateItem,
  removeItem,
  checkout,
} from "../features/cart/cartSlice";
import Loader from "../components/Loader";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalAmount, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (productId, qty) => {
    if (qty < 1) return;
    dispatch(updateItem({ productId, quantity: qty }));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleCheckout = () => {
    dispatch(checkout());
    alert("Order placed successfully!");
  };

  if (status === "loading") return <Loader />;

  if (items.length === 0)
    return (
      <div className="flex justify-center items-center h-64 text-gray-700 text-xl">
        Your cart is empty.
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
          >
            {/* Product Info */}
            <div className="flex items-center space-x-4">
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                <p className="text-gray-600">${item.product.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.product._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          Total: ${totalAmount.toFixed(2)}
        </h2>
        <button
          onClick={handleCheckout}
          className="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
