import { useState } from 'react'
import { COUNTRIES, resolveCountry, fmtPop } from './data'

export default function Mode3({ user, scores, updateMode3, onBack }) {
  const getNext = () => COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
  const [current, setCurrent] = useState(() => getNext())
  const [streak, setStreak] = useState(0)
  const [input, setInput] = useState("")
  const [phase, setPhase] = useState("playing") // playing | correct | wrong
  const [wrongFlash, setWrongFlash] = useState(false)
  const [reveal, setReveal] = useState(false)

  const handleGuess = () => {
    const val = input.trim()
    if (!val) return
    const resolved = resolveCountry(val)
    if (resolved === current.name) {
      const ns = streak + 1
      setStreak(ns)
      setPhase("correct")
      updateMode3(user, ns)
      setTimeout(() => {
        setCurrent(getNext()); setInput(""); setPhase("playing"); setReveal(false)
      }, 1200)
    } else {
      setPhase("wrong")
      setWrongFlash(true)
      updateMode3(user, streak)
      setTimeout(() => { setWrongFlash(false); setReveal(true) }, 500)
    }
  }

  const handleNext = () => {
    setStreak(0); setCurrent(getNext()); setInput(""); setPhase("playing"); setReveal(false)
  }

  const streakScores = Object.entries(scores.mode3)
    .sort(([, a], [, b]) => b - a)
    .map(([uid, s]) => ({ uid, s }))

  return (
    <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia', serif", padding: "24px 20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e293b", color: "#475569", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 22, fontWeight: 700 }}>🚩 Guess the Country</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: streak > 4 ? "#F59E0B" : streak > 1 ? "#10B981" : "#e2e8f0" }}>{streak}</div>
              <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>STREAK</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#60a5fa" }}>{scores.mode3[user] || 0}</div>
              <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>BEST</div>
            </div>
          </div>
        </div>

        <div style={{
          background: phase === "correct" ? "linear-gradient(135deg,#0f2a1e,#0f172a)" : phase === "wrong" ? "linear-gradient(135deg,#2a0f0f,#0f172a)" : "linear-gradient(135deg,#0f1f3f,#0f172a)",
          border: `2px solid ${phase === "correct" ? "#10B981" : phase === "wrong" ? "#EF4444" : "#1e3a5f"}`,
          borderRadius: 24, padding: 32, marginBottom: 24, textAlign: "center", transition: "all 0.3s",
        }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#475569", textTransform: "uppercase", marginBottom: 8 }}>Clue 1 — Flag</div>
            <div style={{ fontSize: 80 }}>{current.flag}</div>
          </div>
          <div style={{ marginBottom: 24, padding: "16px", background: "#0f172a", borderRadius: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#475569", textTransform: "uppercase", marginBottom: 6 }}>Clue 2 — Population</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#e2e8f0" }}>{fmtPop(current.pop)}</div>
          </div>
          <div style={{ padding: "16px", background: "#0f172a", borderRadius: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#475569", textTransform: "uppercase", marginBottom: 6 }}>Clue 3 — Biggest Export</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>{current.export}</div>
          </div>
          {reveal && (
            <div style={{ marginTop: 20, padding: "16px", background: "#1a0f0f", borderRadius: 12, border: "1px solid #EF4444" }}>
              <div style={{ fontSize: 12, color: "#EF4444", letterSpacing: 2, marginBottom: 4 }}>ANSWER WAS</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#e2e8f0" }}>{current.flag} {current.name}</div>
            </div>
          )}
        </div>

        {!reveal ? (
          <div style={{ display: "flex", gap: 12 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGuess()}
              placeholder="Which country is this?"
              autoFocus
              style={{
                flex: 1, background: wrongFlash ? "#3f1515" : "#0f172a",
                border: `2px solid ${wrongFlash ? "#EF4444" : phase === "correct" ? "#10B981" : "#1e293b"}`,
                borderRadius: 12, padding: "16px 20px", fontSize: 18, color: "#e2e8f0",
                outline: "none", transition: "all 0.2s", fontFamily: "inherit",
              }}
            />
            <button onClick={handleGuess} style={{
              background: "#1e3a5f", border: "none", color: "#60a5fa",
              padding: "16px 24px", borderRadius: 12, cursor: "pointer", fontSize: 16, fontFamily: "inherit",
            }}>Guess</button>
          </div>
        ) : (
          <button onClick={handleNext} style={{
            width: "100%", background: "#0f172a", border: "2px solid #3B82F6",
            color: "#60a5fa", padding: "18px", borderRadius: 12, cursor: "pointer",
            fontSize: 16, fontFamily: "inherit", fontWeight: 700,
          }}>Continue (Streak Resets) →</button>
        )}

        {phase === "correct" && !reveal && (
          <div style={{ marginTop: 16, textAlign: "center", color: "#10B981", fontSize: 18, fontWeight: 700 }}>
            ✓ Correct! {streak > 4 && "🔥"} Streak: {streak}
          </div>
        )}

        {streakScores.length > 0 && (
          <div style={{ marginTop: 32, background: "#080f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#10B981", textTransform: "uppercase", marginBottom: 16 }}>🏅 Longest Streaks — Live Leaderboard</div>
            {streakScores.map((s, i) => (
              <div key={s.uid} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < streakScores.length - 1 ? "1px solid #1e293b" : "none" }}>
                <span style={{ fontSize: 20, width: 32 }}>{["🥇", "🥈", "🥉"][i] || "·"}</span>
                <span style={{ flex: 1, color: s.uid === user ? "#34d399" : "#94a3b8", fontWeight: s.uid === user ? 700 : 400 }}>{s.uid}</span>
                <span style={{ color: "#e2e8f0", fontWeight: 700 }}>{s.s} correct</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
