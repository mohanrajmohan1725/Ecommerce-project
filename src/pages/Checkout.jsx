import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

 const handleOrder = () => {
  if (cart.length === 0) {
    toast.error("Cart is empty ❌");
    return;
  }

  // ✅ show toast
  toast.success("Order placed successfully 🎉");

  // ✅ navigate FIRST (IMPORTANT FIX)
  navigate("/", { replace: true });

  // ✅ then clear cart (after navigation)
  setTimeout(() => {
    setCart([]);
  }, 100);
};

  return (
    <div className="p-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

      {/* 🧾 LEFT – ADDRESS */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full mb-3 rounded"
        />
      </div>

      {/* 🛒 RIGHT – ORDER SUMMARY */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3 text-sm"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr className="my-4" />

            <h3 className="text-lg font-bold">
              Total: ₹{total}
            </h3>

            <button
              onClick={handleOrder}
              disabled={cart.length === 0}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;