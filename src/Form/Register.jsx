import React, { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router"; 
import { updateProfile } from "firebase/auth";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2"; // <-- Added SweetAlert

const Register = () => {
  const { googleSignIn, registeruser } = use(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleSignUser = async () => {
    if (typeof googleSignIn !== "function") {
      toast.error("Google sign-in is currently unavailable.");
      return;
    }
    try {
      setLoading(true);
      const result = await googleSignIn();

      // 🔥 SweetAlert Success Popup
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to KrishiLink",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect after alert
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const registerLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (typeof registeruser !== "function") {
      setError("Registration service unavailable. Check AuthContext.");
      return;
    }

    const displayName = event.target.name.value;
    const email = event.target.email.value;
    const photoURL = event.target.photo.value;
    const password = event.target.password.value;

    if (!/[A-Z]/.test(password)) {
      setError("Password must have at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must have at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const result = await registeruser(email, password);

      await updateProfile(result.user, {
        displayName,
        photoURL: photoURL || undefined,
      });

      toast.success("Registered successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });

      setError("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Registration failed");
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur border rounded-2xl shadow-sm p-6">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex w-9 h-9 bg-green-600 rounded-full mr-2" />
          <h1 className="inline-block text-2xl font-extrabold align-middle">
            KrishiLink
          </h1>
          <p className="text-gray-600 text-sm mt-1">Create your account</p>
        </div>

        <form onSubmit={registerLogin} className="space-y-3">
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="mt-1 w-full border-black text-black border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <ToastContainer />

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="mt-1 border-black text-black w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Photo URL (Optional)</label>
            <input
              name="photo"
              type="text"
              placeholder="https://..."
              className="mt-1 w-full border border-black text-black rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="mt-1 w-full border border-black text-black rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="border-t"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-gray-500">
            OR
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={googleSignUser}
          type="button"
          disabled={loading}
          className="w-full border-black text-black border rounded-xl py-2 hover:bg-gray-50 flex items-center justify-center gap-2 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5 h-5"
            alt="Google logo"
          />
          Continue with Google
        </button>

        {/* Link Fix */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
