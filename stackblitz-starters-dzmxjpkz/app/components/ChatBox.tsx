'use client'

import { useEffect, useRef, useState } from 'react'
import {
  collection, doc, onSnapshot, orderBy, query,
  addDoc, serverTimestamp, updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import StickerPanel from './StickerPanel'

export default function ChatBox({ user, chatPartner }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showStickers, setShowStickers] = useState(false)
  const bottomRef = useRef(null)

  const chatId = user && chatPartner
    ? [user.uid, chatPartner.uid].sort().join('_')
    : null

  if (!chatPartner?.uid) return <div className="p-4 text-gray-400">Выберите чат</div>

  useEffect(() => {
    if (!chatId) return
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    })

    return () => unsub()
  }, [chatId])

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: newMessage,
      type: 'text',
      senderId: user.uid,
      senderName: user.displayName || 'Без имени',
      timestamp: serverTimestamp(),
      reactions: {}
    })
    setNewMessage('')
  }

  const sendSticker = async (emoji) => {
    if (!chatId) return
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: emoji,
      type: 'sticker',
      senderId: user.uid,
      senderName: user.displayName || 'Без имени',
      timestamp: serverTimestamp(),
      reactions: {}
    })
    setShowStickers(false)
  }

  const toggleReaction = async (msgId, emoji) => {
    const msgRef = doc(db, 'chats', chatId, 'messages', msgId)
    const msg = messages.find(m => m.id === msgId)
    const reactions = { ...msg.reactions }

    if (reactions[user.uid] === emoji) {
      delete reactions[user.uid]
    } else {
      reactions[user.uid] = emoji
    }

    await updateDoc(msgRef, { reactions })
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden pb-16">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-lg ${msg.senderId === user.uid ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}
          >
            <div className="text-xs text-gray-300 mb-1">
              {msg.senderName} • {new Date(msg.timestamp?.toDate()).toLocaleString()}
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                const emoji = prompt('Реакция: ❤️ 😂 👍 🔥 😢')
                if (emoji) toggleReaction(msg.id, emoji)
              }}
            >
              {msg.type === 'sticker' ? (
                <div className="text-3xl">{msg.text}</div>
              ) : (
                <div>{msg.text}</div>
              )}
            </div>

            {msg.reactions && Object.keys(msg.reactions).length > 0 && (
              <div className="mt-1 flex space-x-1 text-sm">
                {Object.values(msg.reactions).map((emoji, idx) => (
                  <span key={idx}>{emoji}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {showStickers && (
        <div className="absolute bottom-16 left-2 z-50">
          <StickerPanel onSelect={sendSticker} />
        </div>
      )}

      <div className="p-2 border-t border-gray-800 bg-[#1a1a1d] flex relative">
        <button
          onClick={() => setShowStickers(prev => !prev)}
          className="text-xl mr-2 text-white"
        >
          😄
        </button>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Введите сообщение..."
          className="flex-1 bg-gray-800 text-white rounded px-3 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          ➤
        </button>
      </div>
    </div>
  )
}
