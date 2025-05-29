'use client'

import { useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'

export default function SignUp({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (!email || !password || !username || !displayName) {
      setError('Заполните все поля')
      return
    }

    const snapshot = await getDocs(collection(db, 'users'))
    const usernameExists = snapshot.docs.some(
      (doc) => doc.data().username_lower === username.toLowerCase()
    )
    if (usernameExists) {
      setError('Такой username уже занят')
      return
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        username,
        username_lower: username.toLowerCase(),
        displayName,
        description: '',
        photoURL: '',
        status: 'online',
        lastSeen: Date.now(),
        // PIN НЕ добавляется!
      })

      onSuccess?.(user)
    } catch (err) {
      setError('Ошибка регистрации: ' + err.message)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Регистрация в ShenLink</h2>
      <input type="text" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" />
      <input type="text" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
        Зарегистрироваться
      </button>
    </div>
  )
}
