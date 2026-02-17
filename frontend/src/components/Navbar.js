import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        SMV-ECOM
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/cart" className="hover:text-indigo-500">Cart</Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-indigo-500">Admin</Link>
            )}
            {user.role === "seller" && (
              <Link to="/seller" className="hover:text-indigo-500">Seller</Link>
            )}
            <span className="font-medium">{user.name}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-500">Login</Link>
            <Link to="/register" className="hover:text-indigo-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
