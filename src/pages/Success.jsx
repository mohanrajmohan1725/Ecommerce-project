import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center animate-fadeIn">

      <div className="text-6xl mb-4">🎉</div>

      <h1 className="text-2xl font-bold text-green-600">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-500 mt-2">
        Redirecting to home...
      </p>
    </div>
  );
}

export default Success;