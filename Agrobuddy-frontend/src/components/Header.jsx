import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
const Header = ({ selectedLanguage, setSelectedLanguage }) => (
  <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-white">🌱</span>
          </div>
          <a href="/" className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            AgroBuddy
          </a>
        </div>
        {/* Language selector*/}
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
);

export default Header;
