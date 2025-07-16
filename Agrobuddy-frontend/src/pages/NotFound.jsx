import React from "react";

const NotFound = () => (
  <div className="text-center py-32">
    <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
    <p className="text-xl text-gray-300 mb-8">Page Not Found</p>
    <a href="/" className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">← Back to Home</a>
  </div>
);

export default NotFound;
