import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartDrawer({ open, setOpen }) {
  const { cart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg">Cart 🛒</h2>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        {/* Items */}
        <div className="p-4 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="mb-4 border-b pb-2">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-sm">₹{item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-200 px-2"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-200 px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <h3 className="font-bold text-lg">Total: ₹{total}</h3>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/checkout");
            }}
            className="w-full mt-3 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;