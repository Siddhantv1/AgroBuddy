import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const LANGUAGES = [
  { label: "English", value: "en-US" },
  { label: "हिन्दी", value: "hi-IN" },
  { label: "ਪੰਜਾਬੀ", value: "pa-IN" },
  { label: "ಕನ್ನಡ", value: "kn-IN" },
  { label: "বাংলা", value: "bn-IN" },
  { label: "ગુજરાતી", value: "gu-IN" },
  {label: "मराठी", value: "mr-IN" },
  { label: "മലയാളം", value: "ml-IN" },
];

const STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Header = ({ selectedLanguage, handleLanguageChange, selectedState, setSelectedState }) => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">🌱</span>
            </div>
            <a
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              AgroBuddy
            </a>
          </div>

          {/* State & Language Selectors */}
          <div className="flex items-center space-x-4">
            {/* State Selector */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                {selectedState || "Select a State"}
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-52 max-h-60 overflow-y-auto origin-top-right rounded-xl border border-white/20 bg-gray-700 p-1 text-sm text-white shadow-xl">
                {STATES.map((state) => (
                  <MenuItem key={state}>
                    {({ focus }) => (
                      <button
                        onClick={() => setSelectedState(state)}
                        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                          focus ? "bg-white/20" : ""
                        }`}
                      >
                        {state}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            {/* Language Selector */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                {selectedLanguage}
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-52 max-h-60 overflow-y-auto origin-top-right rounded-xl border border-white/20 bg-gray-600 p-1 text-sm text-white shadow-xl">
                {LANGUAGES.map((language) => (
                  <MenuItem key={language.value}>
                    {({ focus }) => (
                      <button
                        onClick={() => handleLanguageChange(language)}
                        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                          focus ? "bg-white/20" : ""
                        }`}
                      >
                        {language.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
