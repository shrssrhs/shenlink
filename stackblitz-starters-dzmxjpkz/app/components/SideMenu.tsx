'use client'

import { useState } from 'react'
import { ChevronRight, User, Settings } from 'lucide-react'

export default function SideMenu({ onProfileClick, onSettingsClick }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="absolute bottom-4 left-[280px] z-50 flex items-center space-x-2">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
      >
        <ChevronRight
          size={20}
          className={`transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      <div
        className={`transition-all duration-300 flex items-center space-x-2 overflow-hidden ${
          open ? 'w-[240px] opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <button
          onClick={onProfileClick}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
        >
          <User size={16} />
          <span className="text-sm">Профиль</span>
        </button>
        <button
          onClick={onSettingsClick}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
        >
          <Settings size={16} />
          <span className="text-sm">Настройки</span>
        </button>
      </div>
    </div>
  )
}
