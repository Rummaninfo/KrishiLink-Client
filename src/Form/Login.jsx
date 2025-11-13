// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2"; // <- SweetAlert2 import

const Login = () => {
  const { setUser, loginuser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  console.log(from);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleloginuser = async (event) => {
    event.preventDefault();
    setError("");

    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      const result = await loginuser(email, password);

      if (typeof setUser === "function") {
        setUser(result.user);
      }

      // Show SweetAlert success popup, then navigate when it's closed/auto-closed
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to KrishiLink",
        timer: 1500,
        showConfirmButton: false,
        background: "#ffffff",
      }).then(() => {
        navigate(from, { replace: true });
      });

      // keep toast too (optional) — comment out if you don't want both
     
    } catch (err) {
      console.error("Login error:", err);
      const message = err?.message || "Login failed";
      setError(message);

      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur border rounded-2xl shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="inline-flex w-9 h-9 bg-green-600 rounded-full mr-2" />
          <h1 className="inline-block text-2xl font-extrabold align-middle">
            KrishiLink
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Welcome back — login to your account
          </p>
        </div>

        <form onSubmit={handleloginuser} className="space-y-3">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              className="mt-1 w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="mt-1 w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-1" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 underline cursor-pointer"
          >
            Register
          </span>
        </p>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
};

export default Login;
