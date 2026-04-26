import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function Orders() {
  const { orders } = useContext(OrderContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded">
            <p className="text-sm text-gray-500">{order.date}</p>

            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 mt-2">
                <img src={item.image} className="w-16 h-16" />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;