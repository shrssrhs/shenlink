'use client'

import { auth, db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

export default function ClearPIN() {
  const [message, setMessage] = useState('')

  const handleClearPin = async () => {
    const uid = auth.currentUser?.uid
    if (!uid) {
      setMessage('Вы не вошли в аккаунт.')
      return
    }

    try {
      await updateDoc(doc(db, 'users', uid), {
        pin: null,
      })
      localStorage.removeItem('pinConfirmed')
      setMessage('PIN удалён успешно.')
    } catch (error) {
      setMessage('Ошибка при удалении PIN.')
    }
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded max-w-md mx-auto mt-20 space-y-3">
      <h2 className="text-lg font-bold">Удалить PIN</h2>
      <button
        onClick={handleClearPin}
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
      >
        Удалить PIN
      </button>
      {message && <p className="text-sm text-gray-300">{message}</p>}
    </div>
  )
}
