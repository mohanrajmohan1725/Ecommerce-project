import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("cod");

  // 🧾 Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Fill all fields ❌");
      return false;
    }
    return true;
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast.error("Cart empty ❌");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    // 💳 UPI FLOW
    if (payment === "online") {
      setTimeout(() => {
        toast.success("Redirecting to UPI...");
        navigate("/payment");
      }, 800);
      return;
    }

    // 🚚 COD FLOW
    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn">

      <h1 className="text-2xl font-bold mb-6">Checkout 🧾</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* 📦 LEFT - FORM */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">

          <h2 className="text-lg font-semibold">Shipping Details</h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="label">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input"
                placeholder="Enter phone number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="input"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="label">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input"
                placeholder="Enter city"
              />
            </div>

          </div>

          {/* 💳 PAYMENT */}
          <div>
            <h3 className="font-semibold mt-4 mb-2">
              Payment Method
            </h3>

            <div className="space-y-2">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={payment === "online"}
                  onChange={() => setPayment("online")}
                />
                UPI / Card
              </label>

            </div>
          </div>

        </div>

        {/* 🛒 RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-4 border-t pt-4">

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading
                ? "Processing..."
                : payment === "online"
                ? "Pay Now"
                : "Place Order"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;