import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 mb-3 rounded"
          >
            <div>
              <h2 className="font-bold">{item.name}</h2>
              <p>₹{item.price}</p>
            </div>

            <button
              onClick={() => toggleWishlist(item)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;