
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
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
            {selectedLanguage}
            <ChevronDownIcon className="size-4 fill-white/60" />
          </MenuButton>

          <MenuItems className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm text-white transition duration-100 ease-out scale-100 opacity-100 focus:outline-none">
            <MenuItem>
              <button
                onClick={() => setSelectedLanguage('English')}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10"
              >
                English
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setSelectedLanguage('हिन्दी')}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10"
              >
                हिन्दी
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setSelectedLanguage('ਪੰਜਾਬੀ')}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10"
              >
                ਪੰਜਾਬੀ
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setSelectedLanguage('ಕನ್ನಡ')}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10"
              >
                ಕನ್ನಡ
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </header>

      {view === "home" && (
        <div className="space-y-12 ">
          <p className="text-3xl">Welcome to AgroBuddy. Choose your task:</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setView("recommend");
                setIsNewFarmer(false);
              }}
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
              placeholder="Enter soil type"
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
          <input
            type="number"
            placeholder="Rainfall"
            className="p-2 rounded text-white"
          />
          <br></br>
          <input
            type="number"
            placeholder="Humidity"
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
