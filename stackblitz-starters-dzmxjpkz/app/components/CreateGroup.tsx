
'use client'

import { useState } from 'react'
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export default function CreateGroup({ user }) {
  const [groupName, setGroupName] = useState('')
  const [userIds, setUserIds] = useState('')
  const [status, setStatus] = useState('')

  const createGroup = async () => {
    if (!groupName || !userIds) return

    const members = userIds.split(',').map(id => id.trim()).filter(Boolean)
    const groupId = uuidv4()

    await setDoc(doc(db, 'groupChats', groupId), {
      id: groupId,
      name: groupName,
      members: [user.uid, ...members],
      createdAt: serverTimestamp(),
      createdBy: user.uid,
    })

    setGroupName('')
    setUserIds('')
    setStatus('Группа создана!')
  }

  return (
    <div className="p-4 space-y-4">
      <input
        placeholder="Название группы"
        className="w-full p-2 bg-gray-800 text-white rounded"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        placeholder="UID участников (через запятую)"
        className="w-full p-2 bg-gray-800 text-white rounded"
        value={userIds}
        onChange={(e) => setUserIds(e.target.value)}
      />
      <button
        onClick={createGroup}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Создать группу
      </button>
      {status && <p className="text-green-400 text-sm">{status}</p>}
    </div>
  )
}
