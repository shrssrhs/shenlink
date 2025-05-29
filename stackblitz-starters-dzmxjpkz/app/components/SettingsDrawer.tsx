
'use client'

import { useState } from 'react'
import {
  User, Bell, Lock, Monitor, Palette, Languages, Smile, Folder,
  RefreshCw, Star, Gift, Briefcase, Activity, ChevronLeft
} from 'lucide-react'
import StickerSettings from './StickerSettings'

export default function SettingsDrawer({ visible, onClose, user, userData }) {
  const [section, setSection] = useState('main')

  const menuItems = [
    { icon: <User size={20} />, title: 'Мой профиль' },
    { icon: <Bell size={20} />, title: 'Уведомления и звуки' },
    { icon: <Lock size={20} />, title: 'Приватность и безопасность' },
    { icon: <Activity size={20} />, title: 'Активные сессии' },
    { icon: <Palette size={20} />, title: 'Внешний вид' },
    { icon: <Languages size={20} />, title: 'Язык' },
    {
      icon: <Smile size={20} />,
      title: 'Стикеры и Emoji',
      onClick: () => setSection('stickers')
    },
    { icon: <Folder size={20} />, title: 'Папки чатов' },
    { icon: <RefreshCw size={20} />, title: 'Обновление' },
    { icon: <Star size={20} />, title: 'ShenLink Studio' },
    { icon: <Briefcase size={20} />, title: 'ShenLink Business' },
    { icon: <Gift size={20} />, title: 'Подарок другу' },
  ]

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-[#2a2a33] text-white shadow-lg border-l border-gray-700 transform transition-transform duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="p-4 font-bold border-b border-gray-700 text-lg flex items-center justify-between">
        {section !== 'main' && (
          <button onClick={() => setSection('main')} className="mr-2 text-white">
            <ChevronLeft size={20} />
          </button>
        )}
        <span>Настройки</span>
        <button onClick={onClose} className="text-white text-xl">×</button>
      </div>

      <div className="p-2 space-y-1 overflow-y-auto h-full">
        {section === 'main' && menuItems.map((item, idx) => (
          <button
            key={idx}
            className="flex items-center justify-between px-4 py-3 bg-[#1f1f28] hover:bg-[#2f2f38] rounded transition w-full"
            onClick={item.onClick}
          >
            <div className="flex items-center space-x-3">
              <div className="text-white">{item.icon}</div>
              <span className="text-sm">{item.title}</span>
            </div>
            <span className="text-gray-500 text-xs">›</span>
          </button>
        ))}

        {section === 'stickers' && <StickerSettings />}
      </div>
    </div>
  )
}
