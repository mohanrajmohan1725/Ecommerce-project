import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Payment() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/success");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

        {/* 💳 Icon */}
        <div className="text-5xl mb-4">💳</div>

        {/* Title */}
        <h1 className="text-xl font-bold mb-2">
          Processing Payment
        </h1>

        <p className="text-gray-500 mb-4">
          Please wait, do not refresh...
        </p>

        {/* Loader */}
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

      </div>
    </div>
  );
}

export default Payment;