
'use client'

import { useEffect, useState } from 'react'

export default function TelegramStickers({ setEmoji }) {
  const [stickers, setStickers] = useState([])

  useEffect(() => {
    const fetchStickers = async () => {
      const response = await fetch('/api/getStickers')
      const data = await response.json()
      setStickers(data.stickers || [])
    }

    fetchStickers()
  }, [])

  return (
    <div className="grid grid-cols-5 gap-2 p-2 max-h-[200px] overflow-y-auto">
      {stickers.map((s, i) => (
        <img
          key={i}
          src={`https://api.telegram.org/file/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/${s.file_path}`}
          alt="sticker"
          className="w-14 h-14 cursor-pointer hover:scale-110 transition"
          onClick={() => setEmoji(s.emoji)}
        />
      ))}
    </div>
  )
}
