import { useState, useEffect, useRef } from 'react'
import { COUNTRIES, resolveCountry, fmtTime } from './data'
import MiniMap from './MiniMap'

export default function Mode2({ user, scores, updateMode2, onBack }) {
  const [letter, setLetter] = useState(null)
  const [input, setInput] = useState("")
  const [found, setFound] = useState(new Set())
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [wrongFlash, setWrongFlash] = useState(false)
  const [flash, setFlash] = useState(null)
  const timerRef = useRef(null)
  const timeRef = useRef(0)

  const pickLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const available = letters.filter(l => COUNTRIES.some(c => c.name.startsWith(l)))
    const l = available[Math.floor(Math.random() * available.length)]
    setLetter(l); setFound(new Set()); timeRef.current = 0; setTime(0)
    setRunning(false); setFinished(false); setInput(""); setFlash(null)
    clearInterval(timerRef.current)
  }

  useEffect(() => { pickLetter() }, [])

  useEffect(() => {
    if (running && !finished) {
      timerRef.current = setInterval(() => {
        timeRef.current += 1
        setTime(timeRef.current)
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [running, finished])

  const targets = letter ? COUNTRIES.filter(c => c.name.startsWith(letter)) : []

  const handleInput = (e) => {
    const val = e.target.value
    setInput(val)
    if (!running && val.length > 0) setRunning(true)
    const resolved = resolveCountry(val)
    if (resolved && resolved.startsWith(letter) && !found.has(resolved)) {
      const nf = new Set(found); nf.add(resolved)
      setFound(nf); setFlash(resolved); setInput("")
      setTimeout(() => setFlash(null), 800)
      if (nf.size === targets.length) {
        setFinished(true); setRunning(false); clearInterval(timerRef.current)
        updateMode2(user, letter, timeRef.current)
      }
    }
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const resolved = resolveCountry(input.trim())
      if (!resolved || !resolved.startsWith(letter) || found.has(resolved)) {
        setWrongFlash(true); setTimeout(() => setWrongFlash(false), 400)
      }
    }
  }

  const foundCodes = Array.from(found).map(n => COUNTRIES.find(c => c.name === n)?.code).filter(Boolean)
  const targetCodes = targets.map(c => c.code)

  const letterScores = Object.entries(scores.mode2)
    .map(([uid, lmap]) => ({ uid, t: (lmap || {})[letter] }))
    .filter(x => x.t !== undefined)
    .sort((a, b) => a.t - b.t)

  const userLetterMap = scores.mode2[user] || {}

  return (
    <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia', serif", padding: "24px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e293b", color: "#475569", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 22, fontWeight: 700 }}>🔤 Country by Alphabet</h2>
        </div>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{
            background: "linear-gradient(135deg,#1e0f3f,#0f1a3f)",
            border: "2px solid #8B5CF6", borderRadius: 20,
            padding: "24px 32px", textAlign: "center", minWidth: 140,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#8B5CF6" }}>CURRENT LETTER</div>
            <div style={{ fontSize: 96, fontWeight: 900, color: "#a78bfa", lineHeight: 1.1, marginTop: 8 }}>{letter}</div>
            <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>{found.size}/{targets.length} found</div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#e2e8f0" }}>{fmtTime(time)}</div>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>TIME</div>
              </div>
              <button onClick={pickLetter} style={{
                background: "#0f172a", border: "1px solid #8B5CF6", color: "#a78bfa",
                padding: "12px 20px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontFamily: "inherit",
              }}>🎲 New Letter</button>
            </div>
            <div style={{ height: 4, background: "#1e293b", borderRadius: 4, marginBottom: 16, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#8B5CF6,#EC4899)", width: `${(found.size / Math.max(targets.length, 1)) * 100}%`, transition: "width 0.5s" }} />
            </div>
            <div style={{ position: "relative" }}>
              <input
                value={input} onChange={handleInput} onKeyDown={handleKey}
                placeholder={finished ? "🎉 Complete! Hit New Letter?" : `Countries starting with "${letter}"...`}
                disabled={finished} autoFocus
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: wrongFlash ? "#3f1515" : "#0f172a",
                  border: `2px solid ${wrongFlash ? "#EF4444" : flash ? "#10B981" : "#1e293b"}`,
                  borderRadius: 12, padding: "14px 16px", fontSize: 16, color: "#e2e8f0",
                  outline: "none", transition: "all 0.2s", fontFamily: "inherit",
                }}
              />
              {flash && <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#10B981", fontWeight: 700, fontSize: 13 }}>✓ {flash}</div>}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <MiniMap highlighted={foundCodes} targetCodes={targetCodes} />
        </div>

        {finished && (
          <div style={{ marginTop: 16, background: "linear-gradient(135deg,#1e0f3f,#0f172a)", border: "1px solid #8B5CF6", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🎯</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#a78bfa" }}>Letter {letter} Complete!</div>
            <div style={{ fontSize: 18, color: "#e2e8f0", marginTop: 4 }}>Time: {fmtTime(time)}</div>
          </div>
        )}

        <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
          {letterScores.length > 0 && (
            <div style={{ flex: 1, minWidth: 200, background: "#080f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: "#8B5CF6", textTransform: "uppercase", marginBottom: 12 }}>🏅 Best Times — {letter}</div>
              {letterScores.map((s, i) => (
                <div key={s.uid} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: i < letterScores.length - 1 ? "1px solid #1e293b" : "none" }}>
                  <span style={{ width: 24 }}>{["🥇", "🥈", "🥉"][i] || "·"}</span>
                  <span style={{ flex: 1, color: s.uid === user ? "#a78bfa" : "#94a3b8", fontWeight: s.uid === user ? 700 : 400 }}>{s.uid}</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 700 }}>{fmtTime(s.t)}</span>
                </div>
              ))}
            </div>
          )}
          {Object.keys(userLetterMap).length > 0 && (
            <div style={{ flex: 1, minWidth: 200, background: "#080f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: "#8B5CF6", textTransform: "uppercase", marginBottom: 12 }}>Your Records — {user}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.entries(userLetterMap).sort(([a], [b]) => a.localeCompare(b)).map(([l, t]) => (
                  <div key={l} style={{ background: l === letter ? "#1e0f3f" : "#0f172a", border: `1px solid ${l === letter ? "#8B5CF6" : "#1e293b"}`, borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#a78bfa" }}>{l}</div>
                    <div style={{ fontSize: 10, color: "#475569" }}>{fmtTime(t)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
