import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders"));
    if (stored) setOrders(stored);
  }, []);

  const addOrder = (cartItems) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      date: new Date().toLocaleString(),
    };

    const updated = [...orders, newOrder];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;