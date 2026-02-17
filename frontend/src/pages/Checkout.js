import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, checkout } from "../features/cart/cartSlice";
import Loader from "../components/Loader";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items, totalAmount, status } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Simple validation
    const emptyField = Object.values(shipping).some((val) => val.trim() === "");
    if (emptyField) return alert("Please fill in all shipping details!");

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shipping.name}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shipping.address}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shipping.city}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shipping.postalCode}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shipping.country}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>{item.product.title} x {item.quantity}</div>
                <div>${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-lg font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
