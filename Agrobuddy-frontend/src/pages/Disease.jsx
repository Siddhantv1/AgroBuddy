import React, { useState } from "react";

const Disease = () => {
  const [diseaseFile, setDiseaseFile] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [diseaseError, setDiseaseError] = useState(null);

  const handleDiseaseFileChange = (e) => {
    setDiseaseFile(e.target.files[0]);
  };

  const handleDiseaseSubmit = async (e) => {
    e.preventDefault();
    setDiseaseLoading(true);
    setDiseaseError(null);
    setDiseaseResult(null);
    if (!diseaseFile) {
      setDiseaseError('Please select an image file');
      setDiseaseLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', diseaseFile);
    try {
      const res = await fetch('http://127.0.0.1:5000/predict-disease', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) setDiseaseResult(data.disease);
      else setDiseaseError(data.error || 'Error occurred');
    } catch (err) {
      setDiseaseError('Network error');
    }
    setDiseaseLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          Disease Detection
        </h2>
        <p className="text-gray-300">Upload an image to identify potential diseases</p>
      </div>
      <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6" onSubmit={handleDiseaseSubmit}>
        <div className="relative">
          <div className="text-center">
            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 hover:border-white/50 transition-colors">
              {!diseaseFile ? (
                <>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleDiseaseFileChange}
                  />
                  <div className="text-center">
                    <div className="text-4xl mb-4">📷</div>
                    <p className="text-lg font-medium text-white mb-2">Upload Plant Image</p>
                    <p className="text-sm text-gray-400">Click to browse or drag and drop</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <img src={URL.createObjectURL(diseaseFile)} alt="Uploaded" className="w-32 h-32 object-cover rounded-xl border border-white/30 mb-2" />
                  <span className="text-green-400 font-semibold">Image uploaded.</span>
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
                    onClick={() => setDiseaseFile(null)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-4 rounded-xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105"
          type="submit"
          disabled={diseaseLoading}
        >
          {diseaseLoading ? 'Analyzing...' : '🔍 Analyze for Diseases'}
        </button>
        {diseaseResult && <div className="mt-4 text-green-400 font-bold">Disease: {diseaseResult}</div>}
        {diseaseError && <div className="mt-4 text-red-400 font-bold">{diseaseError}</div>}
      </form>
    </div>
  );
};

export default Disease;
