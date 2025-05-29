'use client'

import { useState } from 'react'

export default function PinPrompt({ user, correctPin, onSuccess }: { user: any, correctPin: string, onSuccess: () => void }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (pin === correctPin) {
      localStorage.setItem('pinConfirmed', 'true')
      onSuccess()
    } else {
      setError('Неверный PIN')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Введите PIN-код</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Ваш PIN"
          className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Подтвердить
        </button>
        {error && <p className="mt-2 text-red-400">{error}</p>}
      </div>
    </div>
  )
}
