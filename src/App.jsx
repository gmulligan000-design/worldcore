import { useState } from 'react'
import { useScores } from './useScores'
import LoginPage from './LoginPage'
import ModePage from './ModePage'
import Mode1 from './Mode1'
import Mode2 from './Mode2'
import Mode3 from './Mode3'
import Mode4 from './Mode4'

export default function App() {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState(null)
  const { scores, loading, updateMode1, updateMode2, updateMode3, updateMode4 } = useScores()

  if (!user) return <LoginPage onLogin={setUser} />
  if (!mode) return <ModePage user={user} scores={scores} onSelect={setMode} />
  if (mode === 1) return <Mode1 user={user} scores={scores} updateMode1={updateMode1} onBack={() => setMode(null)} />
  if (mode === 2) return <Mode2 user={user} scores={scores} updateMode2={updateMode2} onBack={() => setMode(null)} />
  if (mode === 3) return <Mode3 user={user} scores={scores} updateMode3={updateMode3} onBack={() => setMode(null)} />
  if (mode === 4) return <Mode4 user={user} scores={scores} updateMode4={updateMode4} onBack={() => setMode(null)} />
}
