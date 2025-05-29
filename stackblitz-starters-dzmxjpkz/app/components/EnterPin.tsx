'use client'
import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import EnterPin from './components/EnterPin'

export default function EnterPin({ onSuccess }) {
  const [pinInput, setPinInput] = useState('')
  const [error, setError] = useState('')

  const checkPin = async () => {
    const uid = auth.currentUser?.uid
    if (!uid) return

    const snap = await getDoc(doc(db, 'users', uid))
    const realPin = snap.data()?.pin

    if (pinInput === realPin) {
      localStorage.setItem('pinConfirmed', 'true')
      onSuccess()
    } else {
      setError('Неверный PIN')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0f11] text-white">
      <div className="p-6 bg-gray-800 rounded shadow w-full max-w-sm">
        <h2 className="text-lg font-bold mb-3">Введите PIN</h2>
        <input
          type="password"
          placeholder="Ваш PIN"
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button onClick={checkPin} className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Войти
        </button>
      </div>
    </div>
  )
}
