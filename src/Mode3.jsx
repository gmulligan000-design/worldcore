import { useState, useRef } from 'react'
import { COUNTRIES, resolveCountry, fmtPop, CONT_COLORS } from './data'

function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({length: m+1}, (_, i) => Array.from({length: n+1}, (_, j) => i===0?j:j===0?i:0))
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++) dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
  return dp[m][n]
}

function isCloseEnough(input, target) {
  const a = input.toLowerCase().trim()
  const b = target.toLowerCase().trim()
  if (a === b) return false
  const dist = levenshtein(a, b)
  const threshold = b.length <= 5 ? 1 : b.length <= 8 ? 2 : 3
  return dist <= threshold
}

export default function Mode3({ user, scores, updateMode3, onBack }) {
  const getNext = () => COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
  const [current, setCurrent] = useState(() => getNext())
  const [streak, setStreak] = useState(0)
  const streakRef = useRef(0)
  const [input, setInput] = useState("")
  const [phase, setPhase] = useState("playing")
  const [wrongFlash, setWrongFlash] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [savedStreak, setSavedStreak] = useState(null)
  const [misspelled, setMisspelled] = useState(false)

  const handleGuess = () => {
    const val = input.trim(); if (!val) return
    const resolved = resolveCountry(val)

    if (resolved === current.name) {
      const ns = streakRef.current + 1
      streakRef.current = ns
      setStreak(ns)
      setPhase("correct")
      setMisspelled(false)
      updateMode3(user, ns)
      setTimeout(() => { setCurrent(getNext()); setInput(""); setPhase("playing"); setReveal(false) }, 1200)
    } else {
      const close = isCloseEnough(val, current.name) ||
        COUNTRIES.some(c => c.name !== current.name && resolveCountry(val) === c.name ? false : isCloseEnough(val, current.name))
      
      if (close && !misspelled) {
        setMisspelled(true)
        setInput("")
        setPhase("misspelled")
        setTimeout(() => setPhase("playing"), 2000)
      } else {
        const finalStreak = streakRef.current
        setSavedStreak(finalStreak)
        setMisspelled(false)
        setPhase("wrong")
        setWrongFlash(true)
        updateMode3(user, finalStreak)
        setTimeout(() => { setWrongFlash(false); setReveal(true) }, 500)
      }
    }
  }

  const handleNext = () => { streakRef.current=0; setStreak(0); setSavedStreak(null); setCurrent(getNext()); setInput(""); setPhase("playing"); setReveal(false); setMisspelled(false) }

  const streakScores = Object.entries(scores.mode3).sort(([,a],[,b])=>b-a).map(([uid,s])=>({uid,s}))

  const clues = [
    { label: "Flag",           value: <span style={{fontSize:72}}>{current.flag}</span> },
    { label: "Continent",      value: <span style={{color:CONT_COLORS[current.cont]||"#e2e8f0",fontWeight:900,fontSize:22}}>{current.cont}</span> },
    { label: "Population",     value: <span style={{fontWeight:900,fontSize:26,color:"#e2e8f0"}}>{fmtPop(current.pop)}</span> },
    { label: "Biggest Export", value: <span style={{fontWeight:700,fontSize:20,color:"#e2e8f0"}}>{current.export}</span> },
    { label: "Famous Person",  value: <span style={{fontWeight:700,fontSize:18,color:"#fbbf24"}}>{current.famous}</span> },
  ]

  return (
    <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
          <button onClick={onBack} style={{background:"none",border:"1px solid #1e293b",color:"#475569",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
          <h2 style={{color:"#e2e8f0",margin:0,fontSize:22,fontWeight:700}}>🚩 Guess the Country</h2>
          <div style={{marginLeft:"auto",display:"flex",gap:16,alignItems:"center"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:900,color:streak>9?"#F59E0B":streak>4?"#10B981":"#e2e8f0"}}>{streak}</div>
              <div style={{fontSize:10,color:"#475569",letterSpacing:2}}>STREAK</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:700,color:"#60a5fa"}}>{scores.mode3[user]||0}</div>
              <div style={{fontSize:10,color:"#475569",letterSpacing:2}}>BEST</div>
            </div>
          </div>
        </div>

        <div style={{background:phase==="correct"?"linear-gradient(135deg,#0f2a1e,#0f172a)":phase==="wrong"?"linear-gradient(135deg,#2a0f0f,#0f172a)":phase==="misspelled"?"linear-gradient(135deg,#2a1f0f,#0f172a)":"linear-gradient(135deg,#0f1f3f,#0f172a)",border:"2px solid "+(phase==="correct"?"#10B981":phase==="wrong"?"#EF4444":phase==="misspelled"?"#F59E0B":"#1e3a5f"),borderRadius:24,padding:28,marginBottom:20,transition:"all 0.3s"}}>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {clues.map((clue,i)=>(
              <div key={i} style={{background:"#0f172a",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",border:"1px solid #1e293b"}}>
                <div style={{fontSize:10,letterSpacing:3,color:"#475569",textTransform:"uppercase",minWidth:130}}>Clue {i+1} — {clue.label}</div>
                <div style={{textAlign:"right"}}>{clue.value}</div>
              </div>
            ))}
          </div>

          {phase==="misspelled" && (
            <div style={{marginTop:16,padding:16,background:"#1a1200",borderRadius:12,border:"1px solid #F59E0B",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:"#F59E0B"}}>⚠️ Looks misspelled — try again!</div>
              <div style={{fontSize:13,color:"#92400e",marginTop:4}}>You're close but not quite right</div>
            </div>
          )}

          {reveal && (
            <div style={{marginTop:16,padding:16,background:"#1a0f0f",borderRadius:12,border:"1px solid #EF4444",textAlign:"center"}}>
              <div style={{fontSize:12,color:"#EF4444",letterSpacing:2,marginBottom:4}}>ANSWER WAS</div>
              <div style={{fontSize:28,fontWeight:900,color:"#e2e8f0"}}>{current.flag} {current.name}</div>
              {savedStreak!==null&&<div style={{marginTop:10,fontSize:14,color:"#475569"}}>Streak of <span style={{color:"#60a5fa",fontWeight:700}}>{savedStreak}</span> saved ✓</div>}
            </div>
          )}
        </div>

        {!reveal ? (
          <div style={{display:"flex",gap:12}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleGuess()}
              placeholder={misspelled?"Check your spelling...":"Which country is this?"} autoFocus
              style={{flex:1,background:wrongFlash?"#3f1515":phase==="misspelled"?"#1a1200":"#0f172a",border:"2px solid "+(wrongFlash?"#EF4444":phase==="misspelled"?"#F59E0B":phase==="correct"?"#10B981":"#1e293b"),borderRadius:12,padding:"16px 20px",fontSize:18,color:"#e2e8f0",outline:"none",transition:"all 0.2s",fontFamily:"inherit"}}/>
            <button onClick={handleGuess} style={{background:"#1e3a5f",border:"none",color:"#60a5fa",padding:"16px 24px",borderRadius:12,cursor:"pointer",fontSize:16,fontFamily:"inherit"}}>Guess</button>
          </div>
        ) : (
          <button onClick={handleNext} style={{width:"100%",background:"#0f172a",border:"2px solid #3B82F6",color:"#60a5fa",padding:18,borderRadius:12,cursor:"pointer",fontSize:16,fontFamily:"inherit",fontWeight:700}}>Continue (Streak Resets) →</button>
        )}

        {phase==="correct"&&!reveal&&(
          <div style={{marginTop:16,textAlign:"center",color:"#10B981",fontSize:18,fontWeight:700}}>
            ✓ Correct! {streak>9&&"🔥🔥"}{streak>4&&streak<=9&&"🔥"} Streak: {streak}
          </div>
        )}

        {streakScores.length>0&&(
          <div style={{marginTop:28,background:"#080f1e",border:"1px solid #1e293b",borderRadius:16,padding:24}}>
            <div style={{fontSize:11,letterSpacing:4,color:"#10B981",textTransform:"uppercase",marginBottom:16}}>🏅 Longest Streaks</div>
            {streakScores.map((s,i)=>(
              <div key={s.uid} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<streakScores.length-1?"1px solid #1e293b":"none"}}>
                <span style={{fontSize:20,width:32}}>{["🥇","🥈","🥉"][i]||"·"}</span>
                <span style={{flex:1,color:s.uid===user?"#34d399":"#94a3b8",fontWeight:s.uid===user?700:400}}>{s.uid}</span>
                <span style={{color:"#e2e8f0",fontWeight:700}}>{s.s} correct</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
