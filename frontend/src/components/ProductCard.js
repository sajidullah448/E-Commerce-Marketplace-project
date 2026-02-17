import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={`http://localhost:5000/${product.images[0]}`}
        alt={product.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-indigo-600 font-bold">${product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="mt-2 inline-block text-sm text-gray-500 hover:text-indigo-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
