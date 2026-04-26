import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Success from "./pages/Success";
import Payment from "./pages/Payment";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { AnimatePresence, motion } from "framer-motion";

// 🔥 Page Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  // 🔥 FULLSCREEN PAGES (NO NAVBAR)
  const isFullPage = ["/login", "/signup", "/payment", "/success"].includes(
    location.pathname
  );

  return (
    <>
      {/* 🔔 Toast */}
      <Toaster position="top-right" />

      {/* 🧭 Navbar */}
      {!isFullPage && <Navbar />}

      {/* 📄 Container */}
      <div
        className={
          isFullPage
            ? "w-full h-screen flex items-center justify-center bg-gray-100"
            : "w-full px-4 md:max-w-7xl md:mx-auto"
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            {/* 🔓 Public */}
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />

            <Route
              path="/signup"
              element={
                <PageWrapper>
                  <Signup />
                </PageWrapper>
              }
            />

            {/* 💳 Payment (FULL PAGE) */}
            <Route
              path="/payment"
              element={
                <PageWrapper>
                  <Payment />
                </PageWrapper>
              }
            />

            {/* 🎉 Success (FULL PAGE) */}
            <Route
              path="/success"
              element={
                <PageWrapper>
                  <Success />
                </PageWrapper>
              }
            />

            {/* 🔒 Protected */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <ProductDetails />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Cart />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Wishlist />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Checkout />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Orders />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* 🚨 Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;