import { useState, useContext, useEffect } from "react";
import logo from "../assets/main.logo.png";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHeart,
  FaSearch,
  FaUserCircle,
  FaHome,
  FaBoxOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
  }, [cartOpen]);

  const userName = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() +
      user.email.split("@")[0].slice(1)
    : "Guest";

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* 🔥 LOGO */}
          <Link to="/" className="flex items-center gap-2">
  <img src={logo} className="w-12 h-12" />
  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    MyShop
  </span>
</Link>

          {/* 🔍 SEARCH */}
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-1/3 shadow-sm focus-within:ring-2 ring-blue-400 transition">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>

          {/* 🧭 RIGHT SIDE */}
          <div className="flex items-center gap-5">
            {/* ❤️ Wishlist */}
            <Link
              to="/wishlist"
              className="text-xl text-red-500 hover:scale-110 transition"
            >
              <FaHeart />
            </Link>

            {/* 🛒 Cart */}
            <div
              onClick={() => setCartOpen(true)}
              className="relative text-xl cursor-pointer hover:scale-110 transition"
            >
              <FaShoppingCart className="text-blue-600" />
              <span
                className={`absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full 
  ${cart.length > 0 ? "animate-bounceCart" : ""}`}
              >
                {cart.length}
              </span>
            </div>

            {/* 👤 PROFILE */}
            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="cursor-pointer text-2xl"
              >
                <FaUserCircle />
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-lg p-3 z-50">
                  <p className="text-sm text-gray-600 border-b pb-2 mb-2">
                    {userName}
                  </p>

                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block py-2 hover:text-blue-600"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="block py-2 hover:text-blue-600"
                  >
                    Orders
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left py-2 text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* 📱 MOBILE MENU BUTTON */}
            <div
              className="md:hidden text-xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>

        {/* 📱 MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md px-4 py-5 shadow-xl rounded-b-2xl animate-slideDown">
            {/* 🔍 Search */}
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full mb-4">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* 📱 Menu Items */}
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition"
              >
                <FaHome className="text-blue-600" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition"
              >
                <FaHeart className="text-red-500" />
                <span className="font-medium">Wishlist</span>
              </Link>

              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition"
              >
                <FaBoxOpen className="text-green-600" />
                <span className="font-medium">Orders</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}

export default Navbar;
