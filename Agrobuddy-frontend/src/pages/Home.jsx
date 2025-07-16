import React from "react";

const Home = () => (
  <div className="text-center space-y-12">
    <div className="space-y-6">
      <h2 className="text-5xl font-bold m-0 leading-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Welcome to AgroBuddy
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Your intelligent farming companion. Get crop recommendations and detect plant diseases with AI-powered insights.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <a href="/recommend" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105 border border-blue-400/30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative flex items-center gap-3">🌾 Crop Recommendation</span>
      </a>
      <a href="/disease" className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-2xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105 border border-red-400/30">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative flex items-center gap-3">🔍 Disease Detection</span>
      </a>
    </div>
    <div className="grid md:grid-cols-3 gap-6 mt-16">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-100">
        <div className="text-4xl mb-4">🌱</div>
        <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
        <p className="text-gray-300">Get personalized crop suggestions based on soil conditions and climate data.</p>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-100">
        <div className="text-4xl mb-4">🔬</div>
        <h3 className="text-xl font-semibold mb-2">Disease Detection</h3>
        <p className="text-gray-300">Identify plant diseases early with our AI-powered image analysis.</p>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-100">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">Data Insights</h3>
        <p className="text-gray-300">Access detailed analytics and farming recommendations for better yields.</p>
      </div>
    </div>
  </div>
);

export default Home;
