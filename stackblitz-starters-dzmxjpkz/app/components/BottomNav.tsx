'use client'

import { User, Settings } from 'lucide-react'

export default function BottomNav({ onProfileClick, onSettingsClick }) {
  return (
    <div className="h-14 w-full bg-[#1a1a1d] border-t border-gray-800 flex items-center justify-around">
      <button
        className="text-gray-400 flex flex-col items-center hover:text-white"
        onClick={onProfileClick}
      >
        <User size={20} />
        <span className="text-xs">Профиль</span>
      </button>

      <button
        className="text-gray-400 flex flex-col items-center hover:text-white"
        onClick={onSettingsClick}
      >
        <Settings size={20} />
        <span className="text-xs">Настройки</span>
      </button>
    </div>
  )
}
