import { useState } from 'react'
import LoginPage from './LoginPage'
import ModePage from './ModePage'
import Mode1 from './Mode1'
import Mode2 from './Mode2'
import Mode3 from './Mode3'
import { useScores } from './useScores'

export default function App() {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState(null)
  const { scores, loading, updateMode1, updateMode2, updateMode3 } = useScores()

  const handleSelect = (m) => {
    if (m === "logout") { setUser(null); setMode(null) }
    else setMode(m)
  }

  if (!user) return <LoginPage onLogin={u => setUser(u)} />

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#030711", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌍</div>
        <div style={{ color: "#475569", letterSpacing: 4, fontSize: 13 }}>LOADING LEADERBOARDS...</div>
      </div>
    </div>
  )

  if (!mode) return <ModePage user={user} onSelect={handleSelect} scores={scores} />

  if (mode === 1) return <Mode1 user={user} scores={scores} updateMode1={updateMode1} onBack={() => setMode(null)} />
  if (mode === 2) return <Mode2 user={user} scores={scores} updateMode2={updateMode2} onBack={() => setMode(null)} />
  if (mode === 3) return <Mode3 user={user} scores={scores} updateMode3={updateMode3} onBack={() => setMode(null)} />
}
