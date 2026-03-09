import { useState } from 'react'
import { fmtTime } from './data'

export default function ModePage({ user, onSelect, scores }) {
  const [hovered, setHovered] = useState(null)

  const modes = [
    {
      id: 1, emoji: "🌍", title: "Countries of the World",
      desc: "Name all 195 countries as fast as possible",
      stat: scores.mode1[user] ? `Best: ${fmtTime(scores.mode1[user])}` : "No record yet",
      color: "#3B82F6",
    },
    {
      id: 2, emoji: "🔤", title: "Country by Alphabet",
      desc: "Name all countries starting with a random letter",
      stat: (() => {
        const count = Object.keys(scores.mode2[user] || {}).length
        return count ? `${count} letter${count > 1 ? "s" : ""} completed` : "No records yet"
      })(),
      color: "#8B5CF6",
    },
    {
      id: 3, emoji: "🚩", title: "Guess the Country",
      desc: "Identify countries from flag, population & export — don't break your streak!",
      stat: scores.mode3[user] ? `Best streak: ${scores.mode3[user]}` : "No streak yet",
      color: "#10B981",
    },
  ]

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 80% 20%, #0c1a3a 0%, #030711 60%)",
      fontFamily: "'Georgia', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 6, color: "#3B82F6", textTransform: "uppercase" }}>Mission Control</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#e2e8f0", margin: "8px 0 0", letterSpacing: -1 }}>Choose Your Game</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#475569", letterSpacing: 2 }}>PLAYING AS</div>
            <div style={{ fontSize: 20, color: "#60a5fa", fontWeight: 700 }}>{user}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {modes.map(m => (
            <button key={m.id}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(m.id)}
              style={{
                background: hovered === m.id ? "#0f172a" : "#080f1e",
                border: `1px solid ${hovered === m.id ? m.color : "#1e293b"}`,
                borderRadius: 16, padding: "28px 32px", cursor: "pointer",
                transition: "all 0.25s", transform: hovered === m.id ? "translateX(8px)" : "none",
                display: "flex", alignItems: "center", gap: 24, textAlign: "left",
                boxShadow: hovered === m.id ? `0 0 40px ${m.color}15` : "none",
              }}>
              <div style={{
                fontSize: 48, width: 72, height: 72,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${m.color}15`, borderRadius: 16,
              }}>{m.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{m.title}</div>
                <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>{m.desc}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: m.color, fontWeight: 600 }}>{m.stat}</div>
                <div style={{ fontSize: 24, color: "#1e293b", marginTop: 4 }}>›</div>
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => onSelect("logout")} style={{
          marginTop: 32, background: "none", border: "1px solid #1e293b",
          color: "#334155", fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
          padding: "12px 24px", borderRadius: 8, cursor: "pointer",
        }}>← Switch Profile</button>
      </div>
    </div>
  )
}
