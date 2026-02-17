import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({ productId: product._id, quantity }));
    alert("Product added to cart!");
  };

  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="flex justify-center items-center h-64 text-gray-700 text-xl">
        Product not found.
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="bg-white p-4 rounded-lg shadow">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 object-cover rounded"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-gray-400 border rounded">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-indigo-600 mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-4">
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </p>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mt-4 px-6 py-2 rounded text-white font-semibold ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
