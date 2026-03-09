import { useState } from 'react'
import { USERS } from './data'

const avatars = { Mi: "🌸", Gary: "🌍", Hailey: "⚡" }
const subtitles = { Mi: "Explorer", Gary: "Cartographer", Hailey: "Navigator" }

export default function LoginPage({ onLogin }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 50%, #0c1a3a 0%, #030711 60%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontSize: 14, letterSpacing: 8, color: "#3B82F6", textTransform: "uppercase", marginBottom: 16 }}>Welcome to</div>
        <h1 style={{
          fontSize: 72, fontWeight: 900, margin: 0, letterSpacing: -2,
          background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>WORLD CORE</h1>
        <div style={{ fontSize: 16, color: "#475569", marginTop: 12, letterSpacing: 3 }}>GEOGRAPHY · STRATEGY · GLORY</div>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {USERS.map(user => (
          <button key={user}
            onMouseEnter={() => setHovered(user)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onLogin(user)}
            style={{
              background: hovered === user ? "linear-gradient(135deg,#1e3a5f,#2d1b69)" : "#0f172a",
              border: `2px solid ${hovered === user ? "#3B82F6" : "#1e293b"}`,
              borderRadius: 20, padding: "32px 40px", cursor: "pointer",
              transition: "all 0.3s", transform: hovered === user ? "translateY(-4px)" : "none",
              boxShadow: hovered === user ? "0 20px 60px #3B82F620" : "none",
              minWidth: 160, textAlign: "center",
            }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{avatars[user]}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", letterSpacing: 1 }}>{user}</div>
            <div style={{ fontSize: 12, color: "#475569", letterSpacing: 3, textTransform: "uppercase", marginTop: 4 }}>{subtitles[user]}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 48, fontSize: 12, color: "#1e293b", letterSpacing: 4 }}>SELECT YOUR PROFILE</div>
    </div>
  )
}
