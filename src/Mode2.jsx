import { useState, useEffect, useRef, useCallback } from 'react'
import { COUNTRIES, resolveCountry, fmtTime } from './data'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const CODE2TO3 = {
  AF:"AFG",AL:"ALB",DZ:"DZA",AD:"AND",AO:"AGO",AG:"ATG",AR:"ARG",AM:"ARM",AU:"AUS",AT:"AUT",AZ:"AZE",BS:"BHS",BH:"BHR",BD:"BGD",BB:"BRB",BY:"BLR",BE:"BEL",BZ:"BLZ",BJ:"BEN",BT:"BTN",BO:"BOL",BA:"BIH",BW:"BWA",BR:"BRA",BN:"BRN",BG:"BGR",BF:"BFA",BI:"BDI",KH:"KHM",CM:"CMR",CA:"CAN",CV:"CPV",CF:"CAF",TD:"TCD",CL:"CHL",CN:"CHN",CO:"COL",KM:"COM",CG:"COG",CR:"CRI",HR:"HRV",CU:"CUB",CY:"CYP",CZ:"CZE",DK:"DNK",DJ:"DJI",DM:"DMA",DO:"DOM",CD:"COD",EC:"ECU",EG:"EGY",SV:"SLV",GQ:"GNQ",ER:"ERI",EE:"EST",SZ:"SWZ",ET:"ETH",FJ:"FJI",FI:"FIN",FR:"FRA",GA:"GAB",GM:"GMB",GE:"GEO",DE:"DEU",GH:"GHA",GR:"GRC",GD:"GRD",GT:"GTM",GN:"GIN",GW:"GNB",GY:"GUY",HT:"HTI",VA:"VAT",HN:"HND",HU:"HUN",IS:"ISL",IN:"IND",ID:"IDN",IR:"IRN",IQ:"IRQ",IE:"IRL",IL:"ISR",IT:"ITA",CI:"CIV",JM:"JAM",JP:"JPN",JO:"JOR",KZ:"KAZ",KE:"KEN",KI:"KIR",KW:"KWT",KG:"KGZ",LA:"LAO",LV:"LVA",LB:"LBN",LS:"LSO",LR:"LBR",LY:"LBY",LI:"LIE",LT:"LTU",LU:"LUX",MG:"MDG",MW:"MWI",MY:"MYS",MV:"MDV",ML:"MLI",MT:"MLT",MH:"MHL",MR:"MRT",MU:"MUS",MX:"MEX",FM:"FSM",MD:"MDA",MC:"MCO",MN:"MNG",ME:"MNE",MA:"MAR",MZ:"MOZ",MM:"MMR",NA:"NAM",NR:"NRU",NP:"NPL",NL:"NLD",NZ:"NZL",NI:"NIC",NE:"NER",NG:"NGA",KP:"PRK",MK:"MKD",NO:"NOR",OM:"OMN",PK:"PAK",PW:"PLW",PA:"PAN",PG:"PNG",PY:"PRY",PE:"PER",PH:"PHL",PL:"POL",PT:"PRT",QA:"QAT",RO:"ROU",RU:"RUS",RW:"RWA",KN:"KNA",LC:"LCA",VC:"VCT",WS:"WSM",SM:"SMR",ST:"STP",SA:"SAU",SN:"SEN",RS:"SRB",SC:"SYC",SL:"SLE",SG:"SGP",SK:"SVK",SI:"SVN",SB:"SLB",SO:"SOM",ZA:"ZAF",KR:"KOR",SS:"SSD",ES:"ESP",LK:"LKA",PS:"PSE",SD:"SDN",SR:"SUR",SE:"SWE",CH:"CHE",SY:"SYR",TW:"TWN",TJ:"TJK",TZ:"TZA",TH:"THA",TL:"TLS",TG:"TGO",TO:"TON",TT:"TTO",TN:"TUN",TR:"TUR",TM:"TKM",TV:"TUV",UG:"UGA",UA:"UKR",AE:"ARE",GB:"GBR",US:"USA",UY:"URY",UZ:"UZB",VU:"VUT",VE:"VEN",VN:"VNM",YE:"YEM",ZM:"ZMB",ZW:"ZWE"
}
function buildNumericMap(){return{"004":"AF","008":"AL","012":"DZ","020":"AD","024":"AO","028":"AG","032":"AR","051":"AM","036":"AU","040":"AT","031":"AZ","044":"BS","048":"BH","050":"BD","052":"BB","112":"BY","056":"BE","084":"BZ","204":"BJ","064":"BT","068":"BO","070":"BA","072":"BW","076":"BR","096":"BN","100":"BG","854":"BF","108":"BI","116":"KH","120":"CM","124":"CA","132":"CV","140":"CF","148":"TD","152":"CL","156":"CN","170":"CO","174":"KM","178":"CG","188":"CR","191":"HR","192":"CU","196":"CY","203":"CZ","208":"DK","262":"DJ","212":"DM","214":"DO","180":"CD","218":"EC","818":"EG","222":"SV","226":"GQ","232":"ER","233":"EE","748":"SZ","231":"ET","242":"FJ","246":"FI","250":"FR","266":"GA","270":"GM","268":"GE","276":"DE","288":"GH","300":"GR","308":"GD","320":"GT","324":"GN","624":"GW","328":"GY","332":"HT","336":"VA","340":"HN","348":"HU","352":"IS","356":"IN","360":"ID","364":"IR","368":"IQ","372":"IE","376":"IL","380":"IT","384":"CI","388":"JM","392":"JP","400":"JO","398":"KZ","404":"KE","296":"KI","414":"KW","417":"KG","418":"LA","428":"LV","422":"LB","426":"LS","430":"LR","434":"LY","438":"LI","440":"LT","442":"LU","450":"MG","454":"MW","458":"MY","462":"MV","466":"ML","470":"MT","584":"MH","478":"MR","480":"MU","484":"MX","583":"FM","498":"MD","492":"MC","496":"MN","499":"ME","504":"MA","508":"MZ","104":"MM","516":"NA","520":"NR","524":"NP","528":"NL","554":"NZ","558":"NI","562":"NE","566":"NG","408":"KP","807":"MK","578":"NO","512":"OM","586":"PK","585":"PW","591":"PA","598":"PG","600":"PY","604":"PE","608":"PH","616":"PL","620":"PT","634":"QA","642":"RO","643":"RU","646":"RW","659":"KN","662":"LC","670":"VC","882":"WS","674":"SM","678":"ST","682":"SA","686":"SN","688":"RS","690":"SC","694":"SL","702":"SG","703":"SK","705":"SI","090":"SB","706":"SO","710":"ZA","410":"KR","728":"SS","724":"ES","144":"LK","275":"PS","729":"SD","740":"SR","752":"SE","756":"CH","760":"SY","158":"TW","762":"TJ","834":"TZ","764":"TH","626":"TL","768":"TG","776":"TO","780":"TT","788":"TN","792":"TR","795":"TM","798":"TV","800":"UG","804":"UA","784":"AE","826":"GB","840":"US","858":"UY","860":"UZ","548":"VU","862":"VE","704":"VN","887":"YE","894":"ZM","716":"ZW"}}

// Tiny countries that need a marker pin instead of filled shape
const TINY_A2 = new Set(["VA","SM","MC","LI","MT","MV","SG","BH","KW","QA","LB","PS","KN","DM","AG","BB","GD","LC","VC","TT","MU","SC","KI","NR","TV","PW","MH","FM","TO","WS","SB","CV","KM","ST","DJ","BN"])

// Approximate lon/lat centroids for tiny countries (for reliable pin placement)
const TINY_CENTERS = {
  VA:[12.45,41.9],SM:[12.46,43.94],MC:[7.41,43.73],LI:[9.52,47.14],MT:[14.52,35.9],
  MV:[73.22,3.2],SG:[103.82,1.35],BH:[50.55,26.0],KW:[47.48,29.37],QA:[51.18,25.35],
  LB:[35.5,33.88],PS:[35.3,31.95],KN:[62.78,17.3],DM:[61.37,15.42],AG:[61.8,17.07],
  BB:[59.57,13.19],GD:[61.68,12.12],LC:[60.98,13.9],VC:[61.2,13.25],TT:[61.22,10.45],
  MU:[57.55,-20.28],SC:[55.45,-4.67],KI:[172.97,1.87],NR:[166.93,-0.53],TV:[179.19,-8.52],
  PW:[134.58,7.51],MH:[171.18,7.11],FM:[158.26,6.92],TO:[175.12,-21.18],WS:[-172.13,-13.76],
  SB:[160.15,-9.43],CV:[-24.0,16.0],KM:[43.87,-11.64],ST:[6.61,0.33],DJ:[42.59,11.83],BN:[114.73,4.94]
}

const VALID_LETTERS = LETTERS.filter(l => COUNTRIES.some(c => c.name.startsWith(l)))
const getRandomLetter = (recentLetters = []) => {
  const available = VALID_LETTERS.filter(l => !recentLetters.includes(l))
  const pool = available.length > 0 ? available : VALID_LETTERS
  return pool[Math.floor(Math.random() * pool.length)]
}
const USERS = ["Mi", "Gary", "Hailey"]
const TRASH_SLOW = ["😂 Damn, you're slow!", "Did you fall asleep?", "My grandma types faster!", "Were you using Google Maps?", "A sloth could've done it quicker 🦥"]
const TRASH_FAIL = ["Did you even go to school?", "Maybe stick to your own street 😅", "Geography called, it wants you to study", "You need to travel more bro", "Not a single atlas in your house?"]
const TRASH_GOOD = ["Speedy! 🔥", "Okay okay, not bad!", "Look at you go!", "Someone's been studying 📚", "That's what I'm talking about!"]

function WorldMap({ targetCodes, guessedCodes, targetAlpha2s }) {
  const [paths, setPaths] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [tick, setTick] = useState(0)
  const isDragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const animRef = useRef(null)
  const targetZoom = useRef(1)
  const targetPan = useRef({ x: 0, y: 0 })
  const currentZoom = useRef(1)
  const currentPan = useRef({ x: 0, y: 0 })

  // Pulse animation for pins
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        await new Promise((res,rej)=>{if(window.topojson){res();return}const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s)})
        const r = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        const topo = await r.json()
        if (cancelled) return
        const features = window.topojson.feature(topo, topo.objects.countries).features
        const nm = buildNumericMap()
        setPaths(features.map(f => {
          const a2 = nm[String(f.id).padStart(3,'0')]
          return { alpha3: a2 ? CODE2TO3[a2] : null, alpha2: a2 || null, geometry: f.geometry }
        }))
        setLoaded(true)
      } catch(e) { setLoaded(true) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const animate = useCallback(() => {
    const ease = 0.13
    const dz = targetZoom.current - currentZoom.current
    const dx = targetPan.current.x - currentPan.current.x
    const dy = targetPan.current.y - currentPan.current.y
    if (Math.abs(dz) > 0.0005 || Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      currentZoom.current += dz * ease
      currentPan.current = { x: currentPan.current.x + dx * ease, y: currentPan.current.y + dy * ease }
      setZoom(currentZoom.current)
      setPan({ ...currentPan.current })
      animRef.current = requestAnimationFrame(animate)
    } else {
      currentZoom.current = targetZoom.current
      currentPan.current = { ...targetPan.current }
      setZoom(targetZoom.current)
      setPan({ ...targetPan.current })
    }
  }, [])
  const startAnim = () => { if (animRef.current) cancelAnimationFrame(animRef.current); animRef.current = requestAnimationFrame(animate) }

  const handleWheel = (e) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const mx = (e.clientX - rect.left) / rect.width * 800
    const my = (e.clientY - rect.top) / rect.height * 500
    const factor = e.deltaY < 0 ? 1.12 : 0.89
    const nz = Math.min(12, Math.max(1, targetZoom.current * factor))
    const scale = nz / targetZoom.current
    targetPan.current = { x: mx - scale * (mx - targetPan.current.x), y: my - scale * (my - targetPan.current.y) }
    targetZoom.current = nz
    startAnim()
  }
  const handleMouseDown = (e) => { isDragging.current = true; lastPos.current = { x: e.clientX, y: e.clientY } }
  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastPos.current.x; const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }
    const W = containerRef.current?.clientWidth || 800; const H = containerRef.current?.clientHeight || 500
    targetPan.current = { x: targetPan.current.x + dx * (800 / W), y: targetPan.current.y + dy * (500 / H) }
    currentPan.current = { ...targetPan.current }
    setPan({ ...targetPan.current })
  }
  const handleMouseUp = () => { isDragging.current = false }

  const proj = (lon, lat) => [(lon + 180) * (800 / 360), (90 - lat) * (500 / 180)]
  const toD = (geo) => {
    if (!geo) return ""
    const polys = geo.type === "Polygon" ? [geo.coordinates] : geo.type === "MultiPolygon" ? geo.coordinates : []
    let d = ""
    for (const poly of polys) {
      for (const ring of poly) {
        let first = true
        for (const [lo, la] of ring) {
          // clamp longitude to avoid wrapping streaks
          const clo = Math.max(-179.9, Math.min(179.9, lo))
          const [x, y] = proj(clo, la)
          d += (first ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1)
          first = false
        }
        d += "Z"
      }
    }
    return d
  }

  // Render tiny country pins using known centroids
  const tinyPins = []
  if (loaded) {
    for (const a2 of targetAlpha2s) {
      if (!TINY_A2.has(a2)) continue
      const center = TINY_CENTERS[a2]
      if (!center) continue
      const [x, y] = proj(center[0], center[1])
      const a3 = CODE2TO3[a2]
      const isGuessed = a3 && guessedCodes.includes(a3)
      const color = isGuessed ? "#10B981" : "#EF4444"
      const pulse = tick % 2 === 0
      tinyPins.push({ x, y, a2, a3, color, pulse, isGuessed })
    }
  }

  const sw = Math.max(0.2, 1 / zoom)

  return (
    <div style={{ width: "100%", background: "#0a1628", borderRadius: 14, overflow: "hidden", border: "1px solid #1e3a5f", position: "relative", userSelect: "none" }}>
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 10, display: "flex", gap: 6 }}>
        <button onClick={() => { targetZoom.current = Math.min(12, targetZoom.current * 1.35); startAnim() }} style={{ background: "rgba(10,22,40,0.95)", border: "1px solid #1e3a5f", color: "#e2e8f0", width: 32, height: 32, borderRadius: 7, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>+</button>
        <button onClick={() => { targetZoom.current = 1; targetPan.current = { x: 0, y: 0 }; startAnim() }} style={{ background: "rgba(10,22,40,0.95)", border: "1px solid #1e3a5f", color: "#475569", width: 32, height: 32, borderRadius: 7, cursor: "pointer", fontSize: 12 }}>↺</button>
        <button onClick={() => { targetZoom.current = Math.max(1, targetZoom.current * 0.75); startAnim() }} style={{ background: "rgba(10,22,40,0.95)", border: "1px solid #1e3a5f", color: "#e2e8f0", width: 32, height: 32, borderRadius: 7, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>−</button>
      </div>
      <div ref={containerRef} onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ cursor: isDragging.current ? "grabbing" : "grab" }}>
        <svg viewBox="0 0 800 500" style={{ width: "100%", display: "block" }}>
          <rect width="800" height="500" fill="#0a1628" />
          {!loaded && <text x="400" y="250" textAnchor="middle" fill="#475569" fontSize="14">Loading map...</text>}
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {paths.map((p, i) => {
              const ig = p.alpha3 && guessedCodes.includes(p.alpha3)
              const it = p.alpha3 && targetCodes.includes(p.alpha3)
              const isTiny = p.alpha2 && TINY_A2.has(p.alpha2) && (it || ig)
              if (isTiny) return null // skip shape for tiny — use pin instead
              const d = toD(p.geometry)
              if (!d) return null
              return (
                <path key={i} d={d}
                  fill={ig ? "#10B981" : it ? "#EF4444" : "#1e3a5f"}
                  stroke={ig ? "#059669" : it ? "#b91c1c" : "#0f2240"}
                  strokeWidth={sw}
                  strokeLinejoin="round"
                />
              )
            })}
            {/* Tiny country pins */}
            {tinyPins.map((pin, i) => {
              const r = Math.max(4, 7 / zoom)
              const lineLen = Math.max(12, 22 / zoom)
              const fontSize = Math.max(5, 9 / zoom)
              return (
                <g key={"pin-" + pin.a2}>
                  {/* pulsing outer ring */}
                  <circle cx={pin.x} cy={pin.y} r={pin.pulse ? r * 1.8 : r * 1.3} fill={pin.color} opacity={pin.pulse ? 0.25 : 0.12} />
                  {/* dot */}
                  <circle cx={pin.x} cy={pin.y} r={r} fill={pin.color} stroke="#fff" strokeWidth={Math.max(0.5, 1.2 / zoom)} />
                  {/* stem line */}
                  <line x1={pin.x} y1={pin.y - r} x2={pin.x} y2={pin.y - r - lineLen} stroke={pin.color} strokeWidth={Math.max(0.5, 1.2 / zoom)} />
                  {/* label */}
                  <rect x={pin.x - fontSize * 2.2} y={pin.y - r - lineLen - fontSize * 1.6} width={fontSize * 4.4} height={fontSize * 1.6} rx={fontSize * 0.4} fill={pin.color} opacity={0.9} />
                  <text x={pin.x} y={pin.y - r - lineLen - fontSize * 0.3} textAnchor="middle" fill="#fff" fontSize={fontSize} fontWeight="bold">{pin.a2}</text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
      {tinyPins.length > 0 && zoom < 2 && (
        <div style={{ position: "absolute", bottom: 8, left: 10, background: "rgba(10,22,40,0.9)", border: "1px solid #1e3a5f", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#60a5fa" }}>
          💡 Zoom in to see small countries
        </div>
      )}
    </div>
  )
}

export default function Mode2({ user, scores, updateMode2, onBack }) {
  const getLC = (l) => COUNTRIES.filter(c => c.name.startsWith(l))
  const [view, setView] = useState("playing")
  const [recentLetters, setRecentLetters] = useState([])
  const [letter, setLetter] = useState(() => getRandomLetter([]))
  const [guessed, setGuessed] = useState([])
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(true)
  const [done, setDone] = useState(false)
  const [winScreen, setWinScreen] = useState(null)
  const [shake, setShake] = useState(false)
  const [bestStreak, setBestStreak] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const timerRef = useRef(null)
  const inputRef = useRef(null)
  const lc = getLC(letter)
  const record = scores.mode2[letter] || null
  const holder = scores.mode2holders?.[letter] || null

  useEffect(() => {
    if (running && !done) { timerRef.current = setInterval(() => setTime(t => t + 1), 1000) }
    return () => clearInterval(timerRef.current)
  }, [running, done])

  const startNew = () => {
    const newRecent = [...recentLetters, letter].slice(-20)
    setRecentLetters(newRecent)
    const l = getRandomLetter(newRecent)
    setLetter(l); setGuessed([]); setInput(""); setTime(0); setRunning(true); setDone(false); setWinScreen(null); setCurrentStreak(0)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const finishRound = (finalGuessed, finalTime, gaveUp) => {
    setRunning(false); setDone(true)
    const accuracy = Math.round((finalGuessed.length / lc.length) * 100)
    const myRank = (() => {
      const all = Object.values(scores.mode2userscores || {}).map(ls => ls[letter]).filter(Boolean).sort((a,b)=>a-b)
      if (!finalTime || all.length === 0) return null
      return all.filter(x => x < finalTime).length + 1
    })()
    let msg = gaveUp ? TRASH_FAIL[Math.floor(Math.random()*TRASH_FAIL.length)] : record && finalTime > record ? TRASH_SLOW[Math.floor(Math.random()*TRASH_SLOW.length)] : TRASH_GOOD[Math.floor(Math.random()*TRASH_GOOD.length)]
    setWinScreen({ time: finalTime, accuracy, bestStreak, rank: myRank, msg, complete: finalGuessed.length === lc.length })
    if (!gaveUp && finalGuessed.length === lc.length) updateMode2(user, letter, finalTime)
  }

  const handleInput = (val) => {
    setInput(val)
    const resolved = resolveCountry(val.trim())
    if (resolved && resolved.startsWith(letter) && !guessed.includes(resolved)) {
      const ng = [...guessed, resolved]; setGuessed(ng); setInput("")
      const ns = currentStreak + 1; setCurrentStreak(ns)
      if (ns > bestStreak) setBestStreak(ns)
      if (ng.length === lc.length) finishRound(ng, time + 1, false)
    } else if (val.endsWith(" ") && val.trim().length > 1) {
      setShake(true); setTimeout(() => setShake(false), 400); setCurrentStreak(0)
    }
  }

  const giveUp = () => finishRound(guessed, time, true)
  const skip = () => finishRound(guessed, time, true)

  const targetCodes = lc.map(c => CODE2TO3[c.code]).filter(Boolean)
  const guessedCodes = guessed.map(name => { const c = COUNTRIES.find(x => x.name === name); return c ? CODE2TO3[c.code] : null }).filter(Boolean)
  const targetAlpha2s = lc.map(c => c.code)

  const timerColor = record
    ? time >= record - 10 ? (Math.floor(time) % 2 === 0 ? "#EF4444" : "#ff6b6b") : time >= record - 15 ? "#EF4444" : time >= record - 30 ? "#F59E0B" : "#e2e8f0"
    : "#e2e8f0"

  if (view === "leaderboard") {
    return (
      <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia',serif", padding: "24px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <button onClick={() => setView("playing")} style={{ background: "none", border: "1px solid #1e293b", color: "#475569", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>← Back</button>
            <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 22, fontWeight: 700 }}>🏅 All Letter Records</h2>
          </div>
          <div style={{ background: "#080f1e", border: "1px solid #1e293b", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 1fr 1fr", padding: "12px 16px", borderBottom: "1px solid #1e293b", background: "#0a1628" }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2 }}>LTR</div>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2 }}>COUNT</div>
              {USERS.map(u => <div key={u} style={{ fontSize: 11, color: u === user ? "#34d399" : "#475569", letterSpacing: 2, textAlign: "right", fontWeight: u === user ? 700 : 400 }}>{u.toUpperCase()}</div>)}
            </div>
            {VALID_LETTERS.map((l, i) => (
              <div key={l} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 1fr 1fr", padding: "10px 16px", borderBottom: i < VALID_LETTERS.length - 1 ? "1px solid #0f172a" : "none", background: i % 2 === 0 ? "#080f1e" : "#060d1a" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#e2e8f0" }}>{l}</div>
                <div style={{ fontSize: 12, color: "#475569", alignSelf: "center" }}>{getLC(l).length}</div>
                {USERS.map(u => { const t = scores.mode2userscores?.[u]?.[l] || null; const isRec = t && t === scores.mode2[l]; return (
                  <div key={u} style={{ textAlign: "right", alignSelf: "center" }}>
                    {t ? <span style={{ fontSize: 13, fontWeight: 700, color: isRec ? "#F59E0B" : u === user ? "#34d399" : "#60a5fa" }}>{isRec ? "👑 " : ""}{fmtTime(t)}</span> : <span style={{ fontSize: 12, color: "#1e293b" }}>—</span>}
                  </div>
                )})}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (winScreen) {
    return (
      <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia',serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>{winScreen.complete ? "🌍" : "📖"}</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: winScreen.complete ? "#10B981" : "#F59E0B", marginBottom: 8 }}>{winScreen.complete ? "Round Complete!" : "Round Over"}</div>
          <div style={{ fontSize: 20, color: "#94a3b8", marginBottom: 28, fontStyle: "italic" }}>"{winScreen.msg}"</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[["TIME", fmtTime(winScreen.time), "#e2e8f0"], ["ACCURACY", winScreen.accuracy + "%", winScreen.accuracy > 80 ? "#10B981" : winScreen.accuracy > 50 ? "#F59E0B" : "#EF4444"], ["BEST STREAK", bestStreak, "#60a5fa"], ["RANK", winScreen.rank ? "#" + winScreen.rank : "—", "#F59E0B"]].map(([label, val, color]) => (
              <div key={label} style={{ background: "#080f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 11, color: "#475569", letterSpacing: 3, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color }}>{val}</div>
              </div>
            ))}
          </div>
          <button onClick={startNew} style={{ width: "100%", background: "linear-gradient(135deg,#1e3a5f,#0f2a3f)", border: "2px solid #3B82F6", color: "#60a5fa", padding: "18px", borderRadius: 14, cursor: "pointer", fontSize: 18, fontFamily: "inherit", fontWeight: 700 }}>Next Letter →</button>
          <button onClick={onBack} style={{ marginTop: 12, background: "none", border: "1px solid #1e293b", color: "#475569", padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "inherit", width: "100%" }}>Back to Menu</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030711", fontFamily: "'Georgia',serif", padding: "24px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e293b", color: "#475569", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>← Back</button>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#e2e8f0" }}>{letter}</div>
          <div style={{ fontSize: 13, color: "#475569" }}>{lc.length} countries</div>
          <button onClick={() => setView("leaderboard")} style={{ marginLeft: "auto", background: "#0f172a", border: "1px solid #1e3a5f", color: "#60a5fa", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>🏅 All Records</button>
        </div>

        <WorldMap targetCodes={targetCodes} guessedCodes={guessedCodes} targetAlpha2s={targetAlpha2s} />

        <div style={{ marginTop: 10, marginBottom: 8, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 12, color: "#10B981" }}>■ Guessed</div>
          <div style={{ fontSize: 12, color: "#EF4444" }}>■ Still needed</div>
          <div style={{ marginLeft: "auto", fontSize: 13, color: "#e2e8f0", fontWeight: 700 }}>{guessed.length}/{lc.length}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "10px 16px", background: "#080f1e", borderRadius: 10, border: "1px solid #1e293b" }}>
          <div>
            {record ? (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#475569", letterSpacing: 1 }}>RECORD</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: "#F59E0B" }}>👑 {holder}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{fmtTime(record)}</span>
              </div>
            ) : <span style={{ fontSize: 12, color: "#475569" }}>No record yet — be first!</span>}
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: timerColor, transition: "color 0.3s" }}>{fmtTime(time)}</div>
        </div>

        {!done ? (
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input ref={inputRef} value={input} onChange={e => handleInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { const r = resolveCountry(input.trim()); if (!r || !r.startsWith(letter) || guessed.includes(r)) { setShake(true); setTimeout(() => setShake(false), 400); setInput(""); setCurrentStreak(0) } } }}
              placeholder={`Country starting with ${letter}...`} autoFocus
              style={{ flex: 1, background: shake ? "#3f1515" : "#0f172a", border: "2px solid " + (shake ? "#EF4444" : "#1e293b"), borderRadius: 12, padding: "16px 20px", fontSize: 18, color: "#e2e8f0", outline: "none", fontFamily: "inherit", transition: "all 0.2s" }} />
            <button onClick={skip} style={{ background: "#0f172a", border: "1px solid #1e3a5f", color: "#60a5fa", padding: "16px 14px", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Skip</button>
            <button onClick={giveUp} style={{ background: "#0f172a", border: "1px solid #1e293b", color: "#475569", padding: "16px 14px", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Give Up</button>
          </div>
        ) : null}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {lc.map(c => (
            <div key={c.name} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 13, background: guessed.includes(c.name) ? "#0f2a1e" : done ? "#1a0f0f" : "#0f172a", border: "1px solid " + (guessed.includes(c.name) ? "#10B981" : done ? "#EF4444" : "#1e293b"), color: guessed.includes(c.name) ? "#10B981" : done ? "#EF4444" : "#475569" }}>
              {guessed.includes(c.name) ? c.flag + " " + c.name : done ? c.name : "?"}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
