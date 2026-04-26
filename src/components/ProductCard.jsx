import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const [loading, setLoading] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    setLoading(true);

    // 🔥 Fly to cart animation
    const img = e.currentTarget.closest(".card").querySelector("img");
    const cart = document.getElementById("cart-icon");

    if (img && cart) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();

      const clone = img.cloneNode(true);
      clone.style.position = "fixed";
      clone.style.left = imgRect.left + "px";
      clone.style.top = imgRect.top + "px";
      clone.style.width = imgRect.width + "px";
      clone.style.zIndex = 1000;
      clone.style.transition = "all 0.7s ease-in-out";

      document.body.appendChild(clone);

      setTimeout(() => {
        clone.style.left = cartRect.left + "px";
        clone.style.top = cartRect.top + "px";
        clone.style.width = "20px";
        clone.style.opacity = "0.5";
      }, 10);

      setTimeout(() => clone.remove(), 700);
    }

    // 🛒 Add to cart
    setTimeout(() => {
      addToCart(product);
      setLoading(false);
      toast.success("Added to cart 🛒");
    }, 500);
  };

  return (
    <div className="card bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 p-4 group relative hover:-translate-y-1">

      {/* ❤️ Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 text-lg z-10"
      >
        <FaHeart
          className={`transition ${
            isWishlisted
              ? "text-red-500 scale-110"
              : "text-gray-300 hover:text-red-400"
          }`}
        />
      </button>

      {/* 🖼️ Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* 📦 Name */}
      <h3 className="mt-3 font-semibold text-gray-800 line-clamp-1">
        {product.name}
      </h3>

      {/* 💰 Price */}
      <p className="text-blue-600 font-bold mt-1">
        ₹{product.price}
      </p>

      {/* 🛒 Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;