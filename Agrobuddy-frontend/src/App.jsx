import { useState } from 'react'
import './App.css'
import './index.css'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function App() {
  const [view, setView] = useState("home");
  const [isNewFarmer, setIsNewFarmer] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

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
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6">
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
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-4">📷</div>
                      <p className="text-lg font-medium text-white mb-2">Upload Plant Image</p>
                      <p className="text-sm text-gray-400">Click to browse or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-4 rounded-xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105"
                onClick={() => alert("Analyzing image for diseases...")}
              >
                🔍 Analyze for Diseases
              </button>
            </div>
          </div>
        )}

        {isNewFarmer === true && view === "recommend" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                New Farmer Setup
              </h2>
              <p className="text-gray-300">Tell us about your region and soil to get personalized recommendations</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Region</label>
                  <input
                    type="text"
                    placeholder="e.g., Punjab, Karnataka..."
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Soil Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Clay, Sandy, Loamy..."
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 px-6 py-4 rounded-xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105">
                🌾 Get Recommendations
              </button>
            </div>
          </div>
        )}

        {isNewFarmer === false && view === "recommend" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                Advanced Crop Analysis
              </h2>
              <p className="text-gray-300">Enter detailed soil and climate parameters for precise recommendations</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Nitrogen (N)</label>
                  <input
                    type="number"
                    placeholder="0-140"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Phosphorus (P)</label>
                  <input
                    type="number"
                    placeholder="5-145"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Potassium (K)</label>
                  <input
                    type="number"
                    placeholder="5-205"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">pH Value</label>
                  <input
                    type="number"
                    placeholder="3.5-10.0"
                    step="0.1"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Rainfall (mm)</label>
                  <input
                    type="number"
                    placeholder="20-300"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Humidity (%)</label>
                  <input
                    type="number"
                    placeholder="15-100"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 px-6 py-4 rounded-xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-100 transform hover:scale-105">
                🌾 Get Recommendations
              </button>
            </div>
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
