import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);

  if (!cart) return <p>Loading...</p>;

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 mb-3 rounded"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-300 px-2"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-300 px-2"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">
            Total: ₹{total}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;