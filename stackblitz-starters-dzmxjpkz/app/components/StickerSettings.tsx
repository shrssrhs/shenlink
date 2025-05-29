
'use client'

export default function StickerSettings() {
  return (
    <div className="p-4 text-white">
      <h2 className="text-lg font-bold mb-4">Стикеры и Emoji</h2>
      <p className="text-sm text-gray-400 mb-3">
        ShenLink использует Emoji Unicode и в будущем поддержит импорт из Telegram.
      </p>
      <ul className="text-sm text-gray-300 space-y-2">
        <li>✔ Отправка стикеров</li>
        <li>✔ Реакции к сообщениям</li>
        <li>🕓 Импорт emoji из Telegram</li>
        <li>🕓 Стикерпак Telegram</li>
      </ul>
    </div>
  )
}
