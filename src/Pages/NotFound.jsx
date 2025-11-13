import React from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";

// ErrorPage.jsx
// A responsive, accessible error page component with friendly messaging,
// an illustration placeholder (left empty for you to provide), and
// quick actions: Back Home / Retry.

const NotFound = ({ code = 404, title, message, showRetry = true, onRetry }) => {
  const navigate = useNavigate();

  const defaultTitle = code === 404 ? "Page not found" : "Something went wrong";
  const defaultMessage =
    message ||
    (code === 404
      ? "We couldn't find the page you're looking for. Try returning home or check the URL."
      : "An unexpected error occurred. Try again or return to the homepage.");

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-white to-emerald-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Illustration / image area - keep src empty for you to add an image */}
        <div className="h-60 md:h-auto bg-emerald-100 flex items-center justify-center">
          {/* replace src with your asset when ready */}
          <img src="" alt="error illustration" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
          <div>
            <div className="text-sm text-amber-500 font-semibold">Error</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              {code} — {title || defaultTitle}
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">{defaultMessage}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
            <Link to="/" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow">
              Go back home
            </Link>

            {showRetry && (
              <button
                onClick={() => {
                  if (typeof onRetry === "function") onRetry();
                  else window.location.reload();
                }}
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-md hover:shadow-sm"
              >
                Retry
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className="ml-0 sm:ml-2 text-sm text-slate-500 underline-offset-2 hover:underline"
            >
              Go back
            </button>
          </div>

          <div className="text-xs text-slate-400">If the problem persists, contact support: <a href="mailto:info@krishilink.com" className="underline">info@krishilink.com</a></div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
