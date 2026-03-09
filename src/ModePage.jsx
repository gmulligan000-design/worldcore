import { useState, useEffect } from 'react'

const GLOBE_FACTS = [
  "Russia spans 11 time zones 🌏",
  "Canada has more lakes than the rest of the world combined 🍁",
  "Vatican City is the smallest country on Earth 🇻🇦",
  "Australia is wider than the Moon 🌙",
  "There are 44 countries in Europe 🇪🇺",
  "The Nile is the world's longest river 🌊",
  "Mongolia is the least densely populated country 🐎",
  "Brazil is the only Portuguese-speaking country in the Americas 🇧🇷",
]

function FloatingGlobe({ x, y, size, opacity, speed }) {
  const [pos, setPos] = useState({ x, y })
  useEffect(() => {
    let t = Math.random() * Math.PI * 2
    const interval = setInterval(() => {
      t += speed
      setPos({ x: x + Math.sin(t) * 8, y: y + Math.cos(t * 0.7) * 5 })
    }, 50)
    return () => clearInterval(interval)
  }, [])
  return (
    <div style={{ position: "absolute", left: pos.x + "%", top: pos.y + "%", fontSize: size, opacity, pointerEvents: "none", transition: "left 0.5s ease, top 0.5s ease", userSelect: "none" }}>🌍</div>
  )
}

export default function ModePage({ user, scores, onSelect }) {
  const [factIdx, setFactIdx] = useState(0)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => setFactIdx(i => (i + 1) % GLOBE_FACTS.length), 3500)
    return () => clearInterval(interval)
  }, [])

  const mode4Best = () => {
    const u = scores.mode4?.[user] || {}
    const count = Object.keys(u).length
    if (count === 0) return "No records yet"
    const best = Object.entries(u).sort(([,a],[,b])=>a-b)[0]
    return `${best[0]}: ${Math.floor(best[1]/60)}m ${best[1]%60}s`
  }

  const mode5Pending = (scores.mode5duels || []).filter(d =>
    (d.status === 'pending' && d.target === user) ||
    (d.status === 'pending_challenger' && d.challenger === user)
  ).length

  const modes = [
    {
      id: 1,
      icon: "🌍",
      title: "Countries of the World",
      desc: "Name all 196 countries as fast as possible",
      color: "#3B82F6",
      glow: "rgba(59,130,246,0.3)",
      stat: scores.mode1[user] ? `Your best: ${Math.floor(scores.mode1[user]/60)}m ${scores.mode1[user]%60}s` : "No record yet",
      statColor: scores.mode1[user] ? "#34d399" : "#475569",
      bg: "linear-gradient(135deg, #0a1628 0%, #0f172a 100%)",
      pattern: "🗺️",
    },
    {
      id: 2,
      icon: "🔤",
      title: "Country by Alphabet",
      desc: "Name all countries starting with a random letter",
      color: "#8B5CF6",
      glow: "rgba(139,92,246,0.3)",
      stat: (() => { const c = Object.keys(scores.mode2userscores?.[user] || {}).length; return c > 0 ? `${c} letters completed` : "No records yet" })(),
      statColor: Object.keys(scores.mode2userscores?.[user] || {}).length > 0 ? "#a78bfa" : "#475569",
      bg: "linear-gradient(135deg, #0f0a28 0%, #0f172a 100%)",
      pattern: "🔡",
    },
    {
      id: 3,
      icon: "🚩",
      title: "Guess the Country",
      desc: "Flag, continent, population, export & famous person — don't break your streak!",
      color: "#10B981",
      glow: "rgba(16,185,129,0.3)",
      stat: scores.mode3[user] ? `Best streak: ${scores.mode3[user]}` : "No record yet",
      statColor: scores.mode3[user] ? "#34d399" : "#475569",
      bg: "linear-gradient(135deg, #0a1f18 0%, #0f172a 100%)",
      pattern: "🏴",
    },
    {
      id: 4,
      icon: "🌐",
      title: "Continental Mastery",
      desc: "Pick a continent and name every country in it",
      color: "#F59E0B",
      glow: "rgba(245,158,11,0.3)",
      stat: mode4Best(),
      statColor: scores.mode4?.[user] && Object.keys(scores.mode4[user]).length > 0 ? "#F59E0B" : "#475569",
      bg: "linear-gradient(135deg, #1a140a 0%, #0f172a 100%)",
      pattern: "🗺️",
    },
    {
      id: 5,
      icon: "⚔️",
      title: "1v1 Duel",
      desc: "Challenge friends — pick a trap country for them to identify in 30 seconds",
      color: "#EF4444",
      glow: "rgba(239,68,68,0.3)",
      stat: mode5Pending > 0 ? `⚠️ ${mode5Pending} duel${mode5Pending>1?"s":""} waiting!` : "Challenge someone!",
      statColor: mode5Pending > 0 ? "#EF4444" : "#475569",
      bg: "linear-gradient(135deg, #1a0a0a 0%, #0f172a 100%)",
      pattern: "⚔️",
    },
  ]

  const topMode1 = Object.entries(scores.mode1 || {}).sort(([,a],[,b])=>a-b)[0]
  const topMode3 = Object.entries(scores.mode3 || {}).sort(([,a],[,b])=>b-a)[0]

  return (
    <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia', serif", overflow: "hidden", position: "relative" }}>
      <FloatingGlobe x={5} y={10} size="2rem" opacity={0.06} speed={0.008} />
      <FloatingGlobe x={85} y={15} size="3rem" opacity={0.05} speed={0.006} />
      <FloatingGlobe x={15} y={70} size="1.5rem" opacity={0.07} speed={0.01} />
      <FloatingGlobe x={75} y={65} size="2.5rem" opacity={0.05} speed={0.007} />
      <FloatingGlobe x={50} y={85} size="2rem" opacity={0.06} speed={0.009} />

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
        {Array.from({length: 18}, (_,i) => <line key={"v"+i} x1={`${(i/17)*100}%`} y1="0" x2={`${(i/17)*100}%`} y2="100%" stroke="#3B82F6" strokeWidth="1"/>)}
        {Array.from({length: 10}, (_,i) => <line key={"h"+i} x1="0" y1={`${(i/9)*100}%`} x2="100%" y2={`${(i/9)*100}%`} stroke="#3B82F6" strokeWidth="1"/>)}
        <ellipse cx="50%" cy="50%" rx="35%" ry="45%" stroke="#3B82F6" strokeWidth="1" fill="none"/>
        <ellipse cx="50%" cy="50%" rx="20%" ry="45%" stroke="#3B82F6" strokeWidth="1" fill="none"/>
      </svg>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#3B82F6", marginBottom: 8, textTransform: "uppercase" }}>Mission Control</div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "#e2e8f0", margin: "0 0 4px", letterSpacing: -1 }}>
            World<span style={{ color: "#3B82F6" }}>Core</span>
          </h1>
          <div style={{ fontSize: 13, color: "#475569", marginBottom: 16 }}>Playing as <span style={{ color: "#60a5fa", fontWeight: 700 }}>{user}</span></div>
          <div style={{ background: "#080f1e", border: "1px solid #1e3a5f", borderRadius: 12, padding: "10px 20px", display: "inline-block", fontSize: 13, color: "#60a5fa", fontStyle: "italic" }}>
            💡 {GLOBE_FACTS[factIdx]}
          </div>
        </div>

        {(topMode1 || topMode3) && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {topMode1 && (
              <div style={{ flex: 1, background: "#080f1e", border: "1px solid #1e293b", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2, marginBottom: 4 }}>🏆 SPEED KING</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F59E0B" }}>{topMode1[0]}</div>
                <div style={{ fontSize: 12, color: "#475569" }}>{Math.floor(topMode1[1]/60)}m {topMode1[1]%60}s</div>
              </div>
            )}
            {topMode3 && (
              <div style={{ flex: 1, background: "#080f1e", border: "1px solid #1e293b", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2, marginBottom: 4 }}>🔥 STREAK KING</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981" }}>{topMode3[0]}</div>
                <div style={{ fontSize: 12, color: "#475569" }}>{topMode3[1]} correct</div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {modes.map((mode) => (
            <button key={mode.id} onClick={() => onSelect(mode.id)}
              onMouseEnter={() => setHovered(mode.id)} onMouseLeave={() => setHovered(null)}
              style={{ background: hovered === mode.id ? mode.bg : "#080f1e", border: `2px solid ${hovered === mode.id ? mode.color : "#1e293b"}`, borderRadius: 20, padding: "20px 24px", cursor: "pointer", textAlign: "left", transition: "all 0.25s ease", boxShadow: hovered === mode.id ? `0 0 30px ${mode.glow}` : "none", transform: hovered === mode.id ? "translateY(-2px)" : "none", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 55, opacity: 0.06, pointerEvents: "none" }}>{mode.pattern}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${mode.color}22`, border: `2px solid ${mode.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{mode.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 3 }}>{mode.title}</div>
                  <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.4 }}>{mode.desc}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: mode.statColor, fontWeight: 600, marginBottom: 4 }}>{mode.stat}</div>
                  <div style={{ fontSize: 20, color: hovered === mode.id ? mode.color : "#1e293b" }}>›</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 16, opacity: 0.5 }}>
          {["🌍","🌎","🌏"].map((g,i) => <div key={i} style={{ fontSize: 26, animation: `float ${2.5+i*0.5}s ease-in-out infinite alternate` }}>{g}</div>)}
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={() => window.location.reload()} style={{ background: "none", border: "1px solid #1e293b", color: "#475569", padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontSize: 12, letterSpacing: 2, fontFamily: "inherit" }}>← SWITCH PROFILE</button>
        </div>
      </div>

      <style>{`@keyframes float { from { transform: translateY(0px); } to { transform: translateY(-8px); } }`}</style>
    </div>
  )
}
