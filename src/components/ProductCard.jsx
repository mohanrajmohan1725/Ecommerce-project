import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

function ProductCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isLiked = wishlist.find((w) => w.id === item.id);
  const originalPrice = item.price + 500;

  return (
    <div className="relative w-full h-full bg-white rounded-xl shadow hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 p-4 flex flex-col">
      
      {/* ❤️ Wishlist */}
      <button
        onClick={() => toggleWishlist(item)}
        className={`absolute top-2 right-2 ${
          isLiked ? "text-red-500" : "text-gray-400"
        }`}
      >
        <FaHeart />
      </button>

      {/* Image */}
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="h-40 w-full object-contain mb-3 transition duration-300 hover:scale-105"
        />
      </Link>

      {/* Title */}
      <h2 className="text-sm font-semibold h-10 overflow-hidden">
        {item.name}
      </h2>

      {/* Rating */}
      <div className="flex items-center text-yellow-500 text-sm mt-1">
        <FaStar />
        <span className="ml-1">{item.rating}</span>
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="mt-2">
          <span className="text-lg font-bold">₹{item.price}</span>
          <span className="text-gray-400 line-through ml-2">
            ₹{originalPrice}
          </span>
        </div>

        <button
          onClick={() => {
            addToCart(item);
            toast.success("Added to cart ✅");
          }}
          className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 active:scale-95 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;