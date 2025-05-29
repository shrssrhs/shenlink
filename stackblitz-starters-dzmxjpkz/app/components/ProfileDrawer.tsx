
'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { signOut, updateProfile } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default function ProfileDrawer({ visible, onClose }) {
  const [userData, setUserData] = useState({
    displayName: '',
    username: '',
    description: '',
    photoURL: '',
    status: 'online',
  })

  const user = auth.currentUser

  useEffect(() => {
    if (!user) return
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'users', user.uid))
      const data = snap.data()
      setUserData({
        displayName: data?.displayName || '',
        username: data?.username || '',
        description: data?.description || '',
        photoURL: data?.photoURL || '',
        status: data?.status || 'online',
      })
    }
    fetch()
  }, [user])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setUserData(prev => ({ ...prev, photoURL: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    await updateProfile(user, { displayName: userData.displayName })
    await updateDoc(doc(db, 'users', user.uid), {
      displayName: userData.displayName,
      username: userData.username,
      description: userData.description,
      photoURL: userData.photoURL,
    })
    alert('Сохранено')
  }

  const handleLogout = async () => {
    await signOut(auth)
    onClose()
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-[#2a2a33] text-white shadow-lg border-r border-gray-700 transform transition-transform duration-300 z-50 ${
        visible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 font-bold border-b border-gray-700 text-lg">Профиль</div>

      <div className="p-4 space-y-4 h-[calc(100%-56px)] overflow-y-auto">
        <div className="flex items-center space-x-4">
          <img
            src={userData.photoURL || '/icons/profile.png'}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-gray-600 object-cover"
          />
          <div className="flex flex-col space-y-1">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="text-xs text-gray-300"
            />
            <input
              type="text"
              placeholder="Display Name"
              value={userData.displayName}
              onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
              className="bg-gray-800 text-white p-1 rounded w-full"
            />
            <p className="text-sm text-gray-400">@{userData.username}</p>
          </div>
        </div>

        <textarea
          rows={3}
          className="w-full bg-gray-800 text-white rounded p-2 resize-none"
          placeholder="О себе"
          value={userData.description}
          onChange={(e) => setUserData({ ...userData, description: e.target.value })}
        />

        <div className="flex justify-between pt-4 border-t border-gray-700">
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Сохранить
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}
