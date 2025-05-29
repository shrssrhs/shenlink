'use client'

export default function StickerPanel({ onSelect }) {
  const stickers = ['🔥', '😂', '😎', '❤️', '👍', '😢', '🙂']

  return (
    <div className="bg-[#1f1f1f] border border-gray-700 rounded-md p-2 shadow-lg">
      <div className="grid grid-cols-7 gap-2">
        {stickers.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onSelect(emoji)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
