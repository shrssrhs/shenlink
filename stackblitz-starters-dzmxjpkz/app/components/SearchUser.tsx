'use client'

import { useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function SearchUser({ user, allUsers, setSelectedChat }) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = async () => {
    const raw = searchValue.trim().toLowerCase().replace(/^@/, '')
    const snapshot = await getDocs(collection(db, 'users'))
    const found = snapshot.docs.find(doc => {
      const data = doc.data()
      return data.username?.toLowerCase() === raw
    })
    if (found) {
      const userData = found.data()
      const uid = found.id
      if (uid !== user.uid) {
        setSelectedChat({ ...userData, uid })
      } else {
        alert('Вы не можете написать сами себе. Используйте "Избранное".')
      }
    } else {
      alert('Пользователь не найден')
    }
    setSearchValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="p-2 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search @username"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
      />
    </div>
  )
}
