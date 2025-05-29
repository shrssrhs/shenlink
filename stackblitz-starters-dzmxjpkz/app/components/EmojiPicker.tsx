
'use client'

import { useState } from 'react'

const categories = ['😊', '😂', '🔥', '🐱', '💀', '❤️', '🧃']
const emojis = ['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','😊','😇','😉','😌','😍']

export default function EmojiPicker({ onSelect }) {
  const [tab, setTab] = useState('emoji')
  const [category, setCategory] = useState('😊')

  return (
    <div className="absolute bottom-16 left-4 w-[340px] bg-[#1f1f28] rounded shadow-lg z-50 border border-gray-700">
      {/* Категории */}
      <div className="flex px-2 py-1 space-x-1 border-b border-gray-700 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-xl px-2 py-1 rounded ${category === c ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Контент */}
      <div className="grid grid-cols-8 gap-2 p-3 max-h-[200px] overflow-y-auto">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="text-2xl hover:scale-125 transition"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Вкладки */}
      <div className="flex border-t border-gray-700">
        {['emoji', 'stickers', 'gifs'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm capitalize ${
              tab === t ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
