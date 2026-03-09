import { useState, useEffect, useRef } from 'react'
import { COUNTRIES, TOTAL, resolveCountry, fmtTime } from './data'
import MiniMap from './MiniMap'

export default function Mode1({ user, scores, updateMode1, onBack }) {
  const [input, setInput] = useState("")
  const [found, setFound] = useState(new Set())
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [flash, setFlash] = useState(null)
  const [wrongFlash, setWrongFlash] = useState(false)
  const timerRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    if (running && !finished) {
      timerRef.current = setInterval(() => {
        timeRef.current += 1
        setTime(timeRef.current)
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [running, finished])

  const handleInput = (e) => {
    const val = e.target.value
    setInput(val)
    if (!running && val.length > 0) setRunning(true)
    const resolved = resolveCountry(val)
    if (resolved && !found.has(resolved)) {
      const newFound = new Set(found)
      newFound.add(resolved)
      setFound(newFound)
      setFlash(resolved)
      setInput("")
      setTimeout(() => setFlash(null), 800)
      if (newFound.size === TOTAL) {
        setFinished(true)
        setRunning(false)
        clearInterval(timerRef.current)
        updateMode1(user, timeRef.current)
      }
    }
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const resolved = resolveCountry(input.trim())
      if (!resolved || found.has(resolved)) {
        setWrongFlash(true)
        setTimeout(() => setWrongFlash(false), 400)
      }
    }
  }

  const foundCodes = Array.from(found).map(name => COUNTRIES.find(c => c.name === name)?.code).filter(Boolean)
  const remaining = COUNTRIES.filter(c => !found.has(c.name))

  const mode1Scores = Object.entries(scores.mode1)
    .sort(([, a], [, b]) => a - b)
    .map(([uid, t]) => ({ uid, t }))

  return (
    <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia', serif", padding: "24px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e293b", color: "#475569", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 22, fontWeight: 700 }}>🌍 Countries of the World</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: found.size === TOTAL ? "#10B981" : "#60a5fa" }}>{found.size}/{TOTAL}</div>
              <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>FOUND</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#e2e8f0" }}>{fmtTime(time)}</div>
              <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>TIME</div>
            </div>
          </div>
        </div>

        <div style={{ height: 4, background: "#1e293b", borderRadius: 4, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", width: `${(found.size / TOTAL) * 100}%`, transition: "width 0.5s" }} />
        </div>

        <MiniMap highlighted={foundCodes} />

        <div style={{ marginTop: 20, position: "relative" }}>
          <input
            value={input} onChange={handleInput} onKeyDown={handleKey}
            placeholder={finished ? "🎉 Complete!" : "Type a country name..."}
            disabled={finished} autoFocus
            style={{
              width: "100%", boxSizing: "border-box",
              background: wrongFlash ? "#3f1515" : "#0f172a",
              border: `2px solid ${wrongFlash ? "#EF4444" : flash ? "#10B981" : "#1e293b"}`,
              borderRadius: 12, padding: "16px 20px", fontSize: 18, color: "#e2e8f0",
              outline: "none", transition: "all 0.2s", fontFamily: "inherit",
            }}
          />
          {flash && (
            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#10B981", fontWeight: 700, fontSize: 14 }}>✓ {flash}</div>
          )}
        </div>

        {finished && (
          <div style={{ marginTop: 20, background: "linear-gradient(135deg,#0f2a1e,#0f172a)", border: "1px solid #10B981", borderRadius: 16, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🏆</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#10B981" }}>COMPLETE!</div>
            <div style={{ fontSize: 20, color: "#e2e8f0", marginTop: 8 }}>Time: {fmtTime(time)}</div>
          </div>
        )}

        {mode1Scores.length > 0 && (
          <div style={{ marginTop: 28, background: "#080f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "#3B82F6", textTransform: "uppercase", marginBottom: 16 }}>🏅 Best Times — Live Leaderboard</div>
            {mode1Scores.map((s, i) => (
              <div key={s.uid} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < mode1Scores.length - 1 ? "1px solid #1e293b" : "none" }}>
                <div style={{ fontSize: 20, width: 32 }}>{["🥇", "🥈", "🥉"][i] || "·"}</div>
                <div style={{ flex: 1, color: s.uid === user ? "#60a5fa" : "#94a3b8", fontWeight: s.uid === user ? 700 : 400 }}>{s.uid}</div>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{fmtTime(s.t)}</div>
              </div>
            ))}
          </div>
        )}

        {!finished && found.size > 0 && (
          <details style={{ marginTop: 16 }}>
            <summary style={{ color: "#334155", fontSize: 12, cursor: "pointer", letterSpacing: 2 }}>SHOW REMAINING ({remaining.length})</summary>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {remaining.map(c => (
                <span key={c.code} style={{ fontSize: 12, color: "#334155", background: "#0f172a", padding: "4px 8px", borderRadius: 6 }}>{c.name}</span>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
