import React, { useState } from "react";

const Recommend = () => {
  const [cropForm, setCropForm] = useState({ N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: '' });
  const [cropResult, setCropResult] = useState(null);
  const [cropLoading, setCropLoading] = useState(false);
  const [cropError, setCropError] = useState(null);

  const handleCropChange = (e) => {
    setCropForm({ ...cropForm, [e.target.name]: e.target.value });
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    setCropLoading(true);
    setCropError(null);
    setCropResult(null);
    try {
      const res = await fetch('http://127.0.0.1:5000/predict-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropForm)
      });
      const data = await res.json();
      if (res.ok) setCropResult(data.crop);
      else setCropError(data.error || 'Error occurred');
    } catch (err) {
      setCropError('Network error');
    }
    setCropLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
          Advanced Crop Analysis
        </h2>
        <p className="text-gray-300">Enter detailed soil and climate parameters for precise recommendations</p>
      </div>
      <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6" onSubmit={handleCropSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Nitrogen (N)</label>
            <input type="number" name="N" value={cropForm.N} onChange={handleCropChange} placeholder="0-140" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Phosphorus (P)</label>
            <input type="number" name="P" value={cropForm.P} onChange={handleCropChange} placeholder="5-145" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Potassium (K)</label>
            <input type="number" name="K" value={cropForm.K} onChange={handleCropChange} placeholder="5-205" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">pH Value</label>
            <input type="number" name="ph" value={cropForm.ph} onChange={handleCropChange} placeholder="3.5-10.0" step="0.1" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Rainfall (mm)</label>
            <input type="number" name="rainfall" value={cropForm.rainfall} onChange={handleCropChange} placeholder="20-300" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Humidity (%)</label>
            <input type="number" name="humidity" value={cropForm.humidity} onChange={handleCropChange} placeholder="15-100" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Temperature (°C)</label>
            <input type="number" name="temperature" value={cropForm.temperature} onChange={handleCropChange} placeholder="10-40" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 px-6 py-4 rounded-xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105" type="submit" disabled={cropLoading}>
          {cropLoading ? 'Getting Recommendation...' : '🌾 Get Recommendations'}
        </button>
        {cropResult && <div className="mt-4 text-green-400 font-bold">Recommended Crop: {cropResult}</div>}
        {cropError && <div className="mt-4 text-red-400 font-bold">{cropError}</div>}
      </form>
    </div>
  );
};

export default Recommend;
