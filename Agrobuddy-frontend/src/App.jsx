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
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AgroBuddy</h1>
        <Menu as="div" className="relative inline-block text-left">
  <div>
    <MenuButton className="bg-gray-600 px-3 py-1 rounded flex items-center gap-2">
      {selectedLanguage}
      <ChevronDownIcon aria-hidden="true" className="size-5 text-white" />
    </MenuButton>
  </div>

  <MenuItems
    transition
    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
  >
    <div className="py-1">
      <MenuItem>
        <button 
          onClick={() => setSelectedLanguage('English')}
          className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          English
        </button>
      </MenuItem>
      <MenuItem>
        <button 
          onClick={() => setSelectedLanguage('हिन्दी')}
          className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          हिन्दी
        </button>
      </MenuItem>
      <MenuItem>
        <button 
          onClick={() => setSelectedLanguage('ਪੰਜਾਬੀ')}
          className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          ਪੰਜਾਬੀ
        </button>
        </MenuItem>
        <MenuItem>
        <button 
          onClick={() => setSelectedLanguage('ಕನ್ನಡ')}
          className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          ಕನ್ನಡ
        </button>
      </MenuItem>
    </div>
  </MenuItems>
</Menu>
      </header>

      {view === "home" && (
        <div className="space-y-12 ">
          <p className="text-3xl">Welcome to AgroBuddy. Choose your task:</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setView("recommend")}
              className="bg-blue-800 px-4 py-2 rounded-3xl"
            >
              Crop Recommend
            </button>
            <button className="bg-red-800 px-4 py-2 rounded-4xl"
              onClick={() => setView("disease")}
            >
              Disease Detect
            </button>
          </div>
        </div>
      )}

      {view === "disease" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Disease Detection</h2>
          <input
            type="text"
            placeholder="Enter crop name"
            className="p-2 rounded text-white"
          />
          <div>
            <p className="font-bold"> OR </p>
            <input type="file" className="mt-2 rounded-2xl border-2 py-2 border-cyan-900 bg-cyan-700" />
          </div>
          <button
            className="mt-4 bg-green-700 px-4 py-2 rounded"
            onClick={() => alert("Show disease info")}
          >
            Check Diseases
          </button>
        </div>
      )}

      {view === "recommend" && isNewFarmer === null && (
        <div className="space-y-4 justify-center">
          <h1 className="text-4xl font-semibold">Crop Recommendation</h1>
          <h2>Are you new to farming?</h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsNewFarmer(true)}
              className="bg-purple-900 px-4 py-2 rounded"
            >
              I'm New
            </button>
            <button
              onClick={() => setIsNewFarmer(false)}
              className="bg-yellow-600 px-4 py-2 rounded"
            >
              I'm Experienced
            </button>
          </div>
        </div>
      )}

      {isNewFarmer === true && view === "recommend" && (
        <div className="space-y-12">
          <h2>New Farmer Input</h2>
          <div className="flex gap-5 justify-center">
          <input
            type="text"
            placeholder="Enter region"
            className="p-2 text-white border-cyan-400 border-2 rounded-2xl"
          />
          <input
            type="text"
            placeholder="Enter soil quality"
            className="p-2 text-white border-cyan-400 border-2 rounded-2xl"
          />
          <button className="bg-green-700 px-4 py-2 rounded mt-2">
            Get Crop Recommendation
          </button>
        </div>
        </div>
      )}

      {isNewFarmer === false && view === "recommend" && (
        <div className="space-y-4">
          <h2>Experienced Farmer Input</h2>
          <input
            type="number"
            placeholder="Nitrogen level"
            className="p-2 rounded text-white"
          />
          <input
            type="number"
            placeholder="Phosphorus level"
            className="p-2 rounded text-white"
          />
          <input
            type="number"
            placeholder="Potassium level"
            className="p-2 rounded text-white"
          />
          <input
            type="number"
            placeholder="pH value"
            className="p-2 rounded text-white"
          />
          <button className="bg-green-700 px-4 py-2 rounded mt-2">
            Get Crop Recommendation
          </button>
        </div>
      )}
    </div>
  );
}
export default App
