'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Вход в ShenLink</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Войти
      </button>

      {/* Переключатель на регистрацию */}
      <p className="text-sm text-center text-gray-400 mt-2">
        Нет аккаунта?{' '}
        <span
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-login'))}
          className="text-blue-400 underline cursor-pointer"
        >
          Зарегистрироваться
        </span>
      </p>
    </div>
  )
}
