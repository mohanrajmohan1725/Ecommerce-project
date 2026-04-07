import { useState, useContext, useEffect } from "react";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
  }, [cartOpen]);

  return (
    <>
   <nav className="bg-white text-black px-4 md:px-6 py-4 sticky top-0 z-50 shadow-md transition-all duration-300">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            MyShop
          </Link>

          {/* 🔍 Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/wishlist"
              className="text-xl text-gray-600 hover:text-red-500 transition"
            >
              <FaHeart />
            </Link>

            <div
              onClick={() => setCartOpen(true)}
              className={`relative text-xl cursor-pointer transition ${
                cartOpen ? "text-blue-500" : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <FaShoppingCart />

              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded">
                {cart.length}
              </span>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className="md:hidden text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center bg-white px-3 py-2 rounded-lg">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>

            <div
              onClick={() => {
                setCartOpen(true);
                setMenuOpen(false);
              }}
            >
              Cart
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}

export default Navbar;
