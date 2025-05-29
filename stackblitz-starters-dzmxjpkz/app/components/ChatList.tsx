'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

export default function ChatList({ user, selectedChat, setSelectedChat }) {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), where('uid', '!=', user.uid))
      const snapshot = await getDocs(q)
      const userList = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
      }))
      setUsers(userList)
    }

    if (user?.uid) fetchUsers()
  }, [user])

  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-2 flex flex-col h-full">
      <h2 className="text-white text-xl font-bold mb-3 px-2">ShenLink</h2>

      <input
        type="text"
        placeholder="Поиск по @username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3 px-3 py-2 bg-gray-800 text-white rounded outline-none"
      />

      <h3 className="text-gray-400 text-xs px-2 mb-1">Контакты</h3>
      <div className="flex-1 overflow-y-auto flex flex-col space-y-1">
        {filteredUsers.map((u) => (
          <button
            key={u.uid}
            onClick={() => setSelectedChat(u)}
            className={`flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-800 transition-all ${
              selectedChat?.uid === u.uid ? 'bg-gray-800' : ''
            }`}
          >
            <img
              src={u.photoURL || '/icons/profile.png'}
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-600 object-cover"
            />
            <div className="text-left">
              <div className="text-sm font-semibold">{u.displayName || 'Без имени'}</div>
              <div className="text-xs text-gray-400">@{u.username}</div>
              <div className={`text-xs ${
                u.status === 'online' ? 'text-green-400' :
                u.status === 'invisible' ? 'text-gray-500 italic' :
                'text-gray-500'
              }`}>
                {u.status === 'online' ? 'в сети' : u.status === 'invisible' ? 'невидимка' : 'не в сети'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

