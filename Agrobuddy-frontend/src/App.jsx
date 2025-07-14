import { useState } from 'react'
import './App.css'
import './index.css'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function App() {
  const [view, setView] = useState("home");
  const [isNewFarmer, setIsNewFarmer] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // State for crop recommendation
  const [cropForm, setCropForm] = useState({ N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: '' });
  const [cropResult, setCropResult] = useState(null);
  const [cropLoading, setCropLoading] = useState(false);
  const [cropError, setCropError] = useState(null);

  // State for disease detection
  const [diseaseFile, setDiseaseFile] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [diseaseError, setDiseaseError] = useState(null);

  // Handle crop form change
  const handleCropChange = (e) => {
    setCropForm({ ...cropForm, [e.target.name]: e.target.value });
  };

  // Submit crop recommendation
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

  // Handle disease file change
  const handleDiseaseFileChange = (e) => {
    setDiseaseFile(e.target.files[0]);
  };

  // Submit disease detection
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">🌱</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                AgroBuddy
              </h1>
            </div>
            
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                {selectedLanguage}
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-1 text-sm text-white shadow-xl">
                <MenuItem>
                  <button
                    onClick={() => setSelectedLanguage('English')}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
                  >
                    🇺🇸 English
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setSelectedLanguage('हिन्दी')}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
                  >
                    🇮🇳 हिन्दी
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setSelectedLanguage('ਪੰਜਾਬੀ')}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
                  >
                    🇮🇳 ਪੰਜਾਬੀ
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setSelectedLanguage('ಕನ್ನಡ')}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
                  >
                    🇮🇳 ಕನ್ನಡ
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "home" && (
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Welcome to AgroBuddy
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Your intelligent farming companion. Get crop recommendations and detect plant diseases with AI-powered insights.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => {
                  setView("recommend");
                  setIsNewFarmer(false);
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105 border border-blue-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-3">
                  🌾 Crop Recommendation
                </span>
              </button>
              
              <button 
                onClick={() => setView("disease")}
                className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-2xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105 border border-red-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-3">
                  🔍 Disease Detection
                </span>
              </button>
            </div>

            {/* Feature Cards */}
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
        )}

        {view === "disease" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Disease Detection
              </h2>
              <p className="text-gray-300">Upload an image or enter crop details to identify potential diseases</p>
            </div>
            <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6" onSubmit={handleDiseaseSubmit}>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">Crop Name</label>
                <input
                  type="text"
                  placeholder="e.g., Tomato, Rice, Wheat..."
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-300 mb-4">OR</p>
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
                          Delete & Retry
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
        )}

        {/* Removed unreachable 'New Farmer Setup'*/}

        {isNewFarmer === false && view === "recommend" && (
          <div className="max-w-2xl mx-auto space-y-8">
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
                  <input
                    type="number"
                    name="N"
                    value={cropForm.N}
                    onChange={handleCropChange}
                    placeholder="0-140"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Phosphorus (P)</label>
                  <input
                    type="number"
                    name="P"
                    value={cropForm.P}
                    onChange={handleCropChange}
                    placeholder="5-145"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Potassium (K)</label>
                  <input
                    type="number"
                    name="K"
                    value={cropForm.K}
                    onChange={handleCropChange}
                    placeholder="5-205"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">pH Value</label>
                  <input
                    type="number"
                    name="ph"
                    value={cropForm.ph}
                    onChange={handleCropChange}
                    placeholder="3.5-10.0"
                    step="0.1"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Rainfall (mm)</label>
                  <input
                    type="number"
                    name="rainfall"
                    value={cropForm.rainfall}
                    onChange={handleCropChange}
                    placeholder="20-300"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Humidity (%)</label>
                  <input
                    type="number"
                    name="humidity"
                    value={cropForm.humidity}
                    onChange={handleCropChange}
                    placeholder="15-100"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Temperature (°C)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={cropForm.temperature}
                    onChange={handleCropChange}
                    placeholder="10-40"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 px-6 py-4 rounded-xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105" type="submit" disabled={cropLoading}>
                {cropLoading ? 'Getting Recommendation...' : '🌾 Get Recommendations'}
              </button>
              {cropResult && <div className="mt-4 text-green-400 font-bold">Recommended Crop: {cropResult}</div>}
              {cropError && <div className="mt-4 text-red-400 font-bold">{cropError}</div>}
            </form>
          </div>
        )}

        {/* Back Button */}
        {view !== "home" && (
          <div className="text-center mt-8">
            <button
              onClick={() => setView("home")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-100"
            >
              ← Back to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App
