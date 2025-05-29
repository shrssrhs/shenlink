
'use client'

import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import ChatList from './components/ChatList'
import ChatBox from './components/ChatBox'
import ProfileDrawer from './components/ProfileDrawer'
import SettingsDrawer from './components/SettingsDrawer'
import SideMenu from './components/SideMenu'
import PinPrompt from './components/PinPrompt'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

export default function Home() {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [showLogin, setShowLogin] = useState(true)
  const [showPinPrompt, setShowPinPrompt] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const snap = await getDoc(doc(db, 'users', currentUser.uid))
        if (snap.exists()) {
          setUserData(snap.data())
          if (!localStorage.getItem('pinConfirmed') && snap.data()?.pin?.length >= 4) {
            setShowPinPrompt(true)
          }
        }
        await updateDoc(doc(db, 'users', currentUser.uid), {
          status: 'online',
          lastSeen: Date.now()
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <div className="text-white p-4">Загрузка...</div>
  if (!user) return showLogin ? <SignIn setShowLogin={setShowLogin} /> : <SignUp setShowLogin={setShowLogin} />
  if (showPinPrompt) return <PinPrompt user={user} correctPin={userData?.pin} onSuccess={() => setShowPinPrompt(false)} />

  return (
    <div className="flex h-screen bg-[#0f0f11] text-white relative">
      <div className="w-[280px] border-r border-gray-800 overflow-y-auto">
        <ChatList user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatBox user={user} chatPartner={selectedChat} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Выберите чат</div>
        )}
      </div>

      <SideMenu
        onProfileClick={() => setShowProfile(prev => !prev)}
        onSettingsClick={() => setShowSettings(prev => !prev)}
      />

      <ProfileDrawer visible={showProfile} onClose={() => setShowProfile(false)} />
      <SettingsDrawer visible={showSettings} onClose={() => setShowSettings(false)} user={user} userData={userData} />
    </div>
  )
}
