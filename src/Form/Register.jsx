import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const Register = () => {
  let { googleSignIn } = use(AuthContext);
  let navigate = useNavigate()

  let googleSignUser = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate('/home')
      })
      .catch((error) => {
        console.log(error);
      });
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

        {/* Form */}
        <form  className="space-y-3 cursor-pointer">
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              className="mt-1 w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">
              Photo URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="mt-1 w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="mt-1 w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="border-t"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-gray-500">
            OR
          </span>
        </div>

        {/* Google Button */}
        <button onClick={googleSignUser} type="submit" className="w-full border rounded-xl py-2 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5 h-5"
            alt=""
            
          />
          Continue with Google
        </button>

        {/* Link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-green-700 underline cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
