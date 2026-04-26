import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill all fields ❌");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password ❌");
    }
  };

 return (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">

    <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Welcome Back 👋
      </h2>
      <p className="text-center text-gray-500 mt-1 mb-6">
        Login to continue shopping
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm mt-6 text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-semibold">
          Signup
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;