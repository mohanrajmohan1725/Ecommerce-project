import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* 🔔 Toast */}
      <Toaster position="top-right" />

      {/* 🧭 Navbar */}
      <Navbar />

      {/* 📄 Pages Container */}
      <div className="w-full px-4 md:max-w-7xl md:mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;