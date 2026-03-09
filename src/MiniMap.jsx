import { COUNTRIES, CONT_COLORS } from './data'

export default function MiniMap({ highlighted = [], targetCodes = [] }) {
  const highlightSet = new Set(highlighted)
  const targetSet = new Set(targetCodes)

  const continentGroups = {}
  COUNTRIES.forEach(c => {
    if (!continentGroups[c.cont]) continentGroups[c.cont] = []
    continentGroups[c.cont].push(c)
  })

  return (
    <div style={{ background: "#0f172a", borderRadius: 12, padding: "12px", border: "1px solid #1e293b" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {Object.entries(continentGroups).map(([cont, countries]) => (
          <div key={cont} style={{ flex: "1 1 140px", minWidth: 120 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#475569", textTransform: "uppercase", marginBottom: 4 }}>{cont}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {countries.map(c => {
                const isFound = highlightSet.has(c.code)
                const isTarget = targetSet.has(c.code)
                const color = isFound ? CONT_COLORS[c.cont] : isTarget ? "#334155" : "#1e293b"
                return (
                  <div key={c.code} title={c.name} style={{
                    width: 18, height: 18, borderRadius: 3,
                    background: color,
                    border: isTarget && !isFound ? `1px solid ${CONT_COLORS[c.cont]}44` : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, cursor: "default", transition: "all 0.3s",
                    transform: isFound ? "scale(1.1)" : "scale(1)",
                  }}>{isFound ? c.flag : ""}</div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
