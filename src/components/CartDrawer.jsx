import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function CartDrawer({ open, setOpen }) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      {/* 🔥 Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* 🛒 Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 🔹 Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">My Cart 🛒</h2>
          <FaTimes
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* 🔹 Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty 😢
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b pb-3"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {item.name}
                  </p>

                  <p className="text-blue-600 font-bold text-sm">
                    ₹{item.price}
                  </p>

                  {/* Qty */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* 🔹 Footer */}
        <div className="p-4 border-t">
          <h3 className="font-bold mb-3">
            Total: ₹{total}
          </h3>

          <button
            disabled={cart.length === 0}
            onClick={() => {
              if (cart.length === 0) return;
              setOpen(false);
              navigate("/checkout");
            }}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {cart.length === 0
              ? "Cart Empty"
              : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;