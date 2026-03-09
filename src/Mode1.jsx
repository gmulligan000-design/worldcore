import { useState, useEffect, useRef, useCallback } from 'react'
import { COUNTRIES, resolveCountry, fmtTime } from './data'

const CODE2TO3 = {
  AF:"AFG",AL:"ALB",DZ:"DZA",AD:"AND",AO:"AGO",AG:"ATG",AR:"ARG",AM:"ARM",AU:"AUS",AT:"AUT",AZ:"AZE",BS:"BHS",BH:"BHR",BD:"BGD",BB:"BRB",BY:"BLR",BE:"BEL",BZ:"BLZ",BJ:"BEN",BT:"BTN",BO:"BOL",BA:"BIH",BW:"BWA",BR:"BRA",BN:"BRN",BG:"BGR",BF:"BFA",BI:"BDI",KH:"KHM",CM:"CMR",CA:"CAN",CV:"CPV",CF:"CAF",TD:"TCD",CL:"CHL",CN:"CHN",CO:"COL",KM:"COM",CG:"COG",CR:"CRI",HR:"HRV",CU:"CUB",CY:"CYP",CZ:"CZE",DK:"DNK",DJ:"DJI",DM:"DMA",DO:"DOM",CD:"COD",EC:"ECU",EG:"EGY",SV:"SLV",GQ:"GNQ",ER:"ERI",EE:"EST",SZ:"SWZ",ET:"ETH",FJ:"FJI",FI:"FIN",FR:"FRA",GA:"GAB",GM:"GMB",GE:"GEO",DE:"DEU",GH:"GHA",GR:"GRC",GD:"GRD",GT:"GTM",GN:"GIN",GW:"GNB",GY:"GUY",HT:"HTI",VA:"VAT",HN:"HND",HU:"HUN",IS:"ISL",IN:"IND",ID:"IDN",IR:"IRN",IQ:"IRQ",IE:"IRL",IL:"ISR",IT:"ITA",CI:"CIV",JM:"JAM",JP:"JPN",JO:"JOR",KZ:"KAZ",KE:"KEN",KI:"KIR",KW:"KWT",KG:"KGZ",LA:"LAO",LV:"LVA",LB:"LBN",LS:"LSO",LR:"LBR",LY:"LBY",LI:"LIE",LT:"LTU",LU:"LUX",MG:"MDG",MW:"MWI",MY:"MYS",MV:"MDV",ML:"MLI",MT:"MLT",MH:"MHL",MR:"MRT",MU:"MUS",MX:"MEX",FM:"FSM",MD:"MDA",MC:"MCO",MN:"MNG",ME:"MNE",MA:"MAR",MZ:"MOZ",MM:"MMR",NA:"NAM",NR:"NRU",NP:"NPL",NL:"NLD",NZ:"NZL",NI:"NIC",NE:"NER",NG:"NGA",KP:"PRK",MK:"MKD",NO:"NOR",OM:"OMN",PK:"PAK",PW:"PLW",PA:"PAN",PG:"PNG",PY:"PRY",PE:"PER",PH:"PHL",PL:"POL",PT:"PRT",QA:"QAT",RO:"ROU",RU:"RUS",RW:"RWA",KN:"KNA",LC:"LCA",VC:"VCT",WS:"WSM",SM:"SMR",ST:"STP",SA:"SAU",SN:"SEN",RS:"SRB",SC:"SYC",SL:"SLE",SG:"SGP",SK:"SVK",SI:"SVN",SB:"SLB",SO:"SOM",ZA:"ZAF",KR:"KOR",SS:"SSD",ES:"ESP",LK:"LKA",PS:"PSE",SD:"SDN",SR:"SUR",SE:"SWE",CH:"CHE",SY:"SYR",TW:"TWN",TJ:"TJK",TZ:"TZA",TH:"THA",TL:"TLS",TG:"TGO",TO:"TON",TT:"TTO",TN:"TUN",TR:"TUR",TM:"TKM",TV:"TUV",UG:"UGA",UA:"UKR",AE:"ARE",GB:"GBR",US:"USA",UY:"URY",UZ:"UZB",VU:"VUT",VE:"VEN",VN:"VNM",YE:"YEM",ZM:"ZMB",ZW:"ZWE"
}
function buildNumericMap(){return{"004":"AF","008":"AL","012":"DZ","020":"AD","024":"AO","028":"AG","032":"AR","051":"AM","036":"AU","040":"AT","031":"AZ","044":"BS","048":"BH","050":"BD","052":"BB","112":"BY","056":"BE","084":"BZ","204":"BJ","064":"BT","068":"BO","070":"BA","072":"BW","076":"BR","096":"BN","100":"BG","854":"BF","108":"BI","116":"KH","120":"CM","124":"CA","132":"CV","140":"CF","148":"TD","152":"CL","156":"CN","170":"CO","174":"KM","178":"CG","188":"CR","191":"HR","192":"CU","196":"CY","203":"CZ","208":"DK","262":"DJ","212":"DM","214":"DO","180":"CD","218":"EC","818":"EG","222":"SV","226":"GQ","232":"ER","233":"EE","748":"SZ","231":"ET","242":"FJ","246":"FI","250":"FR","266":"GA","270":"GM","268":"GE","276":"DE","288":"GH","300":"GR","308":"GD","320":"GT","324":"GN","624":"GW","328":"GY","332":"HT","336":"VA","340":"HN","348":"HU","352":"IS","356":"IN","360":"ID","364":"IR","368":"IQ","372":"IE","376":"IL","380":"IT","384":"CI","388":"JM","392":"JP","400":"JO","398":"KZ","404":"KE","296":"KI","414":"KW","417":"KG","418":"LA","428":"LV","422":"LB","426":"LS","430":"LR","434":"LY","438":"LI","440":"LT","442":"LU","450":"MG","454":"MW","458":"MY","462":"MV","466":"ML","470":"MT","584":"MH","478":"MR","480":"MU","484":"MX","583":"FM","498":"MD","492":"MC","496":"MN","499":"ME","504":"MA","508":"MZ","104":"MM","516":"NA","520":"NR","524":"NP","528":"NL","554":"NZ","558":"NI","562":"NE","566":"NG","408":"KP","807":"MK","578":"NO","512":"OM","586":"PK","585":"PW","591":"PA","598":"PG","600":"PY","604":"PE","608":"PH","616":"PL","620":"PT","634":"QA","642":"RO","643":"RU","646":"RW","659":"KN","662":"LC","670":"VC","882":"WS","674":"SM","678":"ST","682":"SA","686":"SN","688":"RS","690":"SC","694":"SL","702":"SG","703":"SK","705":"SI","090":"SB","706":"SO","710":"ZA","410":"KR","728":"SS","724":"ES","144":"LK","275":"PS","729":"SD","740":"SR","752":"SE","756":"CH","760":"SY","158":"TW","762":"TJ","834":"TZ","764":"TH","626":"TL","768":"TG","776":"TO","780":"TT","788":"TN","792":"TR","795":"TM","798":"TV","800":"UG","804":"UA","784":"AE","826":"GB","840":"US","858":"UY","860":"UZ","548":"VU","862":"VE","704":"VN","887":"YE","894":"ZM","716":"ZW"}}

const TINY_A2 = new Set(["VA","SM","MC","LI","MT","MV","SG","BH","KW","QA","LB","PS","KN","DM","AG","BB","GD","LC","VC","TT","MU","SC","KI","NR","TV","PW","MH","FM","TO","WS","SB","CV","KM","ST","DJ","BN"])
const TINY_CENTERS = {
  VA:[12.45,41.9],SM:[12.46,43.94],MC:[7.41,43.73],LI:[9.52,47.14],MT:[14.52,35.9],
  MV:[73.22,3.2],SG:[103.82,1.35],BH:[50.55,26.0],KW:[47.48,29.37],QA:[51.18,25.35],
  LB:[35.5,33.88],PS:[35.3,31.95],KN:[62.78,17.3],DM:[61.37,15.42],AG:[61.8,17.07],
  BB:[59.57,13.19],GD:[61.68,12.12],LC:[60.98,13.9],VC:[61.2,13.25],TT:[61.22,10.45],
  MU:[57.55,-20.28],SC:[55.45,-4.67],KI:[172.97,1.87],NR:[166.93,-0.53],TV:[179.19,-8.52],
  PW:[134.58,7.51],MH:[171.18,7.11],FM:[158.26,6.92],TO:[175.12,-21.18],WS:[-172.13,-13.76],
  SB:[160.15,-9.43],CV:[-24.0,16.0],KM:[43.87,-11.64],ST:[6.61,0.33],DJ:[42.59,11.83],BN:[114.73,4.94]
}

const allAlpha2s = COUNTRIES.map(c => c.code)

const CONTINENTS = [
  { name: "Africa",        emoji: "🌍", color: "#F59E0B" },
  { name: "Asia",          emoji: "🌏", color: "#3B82F6" },
  { name: "Europe",        emoji: "🌍", color: "#8B5CF6" },
  { name: "North America", emoji: "🌎", color: "#10B981" },
  { name: "South America", emoji: "🌎", color: "#EF4444" },
  { name: "Oceania",       emoji: "🌏", color: "#06B6D4" },
]

function WorldMap({ guessedCodes, guessedAlpha2s }) {
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

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        await new Promise((res,rej)=>{if(window.topojson){res();return}const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s)})
        const r = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        const geojson = await r.json()
        if (cancelled) return
        const features = geojson.features
        const nm = buildNumericMap()
        setPaths(features.map(f => { const a2=f.properties?.ISO_A2||f.properties?.iso_a2||null; return {alpha3:a2?CODE2TO3[a2]:null,alpha2:a2||null,geometry:f.geometry} }))
        setLoaded(true)
      } catch(e){setLoaded(true)}
    }
    load()
    return()=>{cancelled=true}
  }, [])

  const animate = useCallback(() => {
    const ease = 0.13
    const dz = targetZoom.current - currentZoom.current
    const dx = targetPan.current.x - currentPan.current.x
    const dy = targetPan.current.y - currentPan.current.y
    if (Math.abs(dz)>0.0005||Math.abs(dx)>0.05||Math.abs(dy)>0.05) {
      currentZoom.current += dz*ease
      currentPan.current = {x:currentPan.current.x+dx*ease,y:currentPan.current.y+dy*ease}
      setZoom(currentZoom.current); setPan({...currentPan.current})
      animRef.current = requestAnimationFrame(animate)
    } else {
      currentZoom.current = targetZoom.current; currentPan.current = {...targetPan.current}
      setZoom(targetZoom.current); setPan({...targetPan.current})
    }
  }, [])
  const startAnim = () => { if(animRef.current) cancelAnimationFrame(animRef.current); animRef.current = requestAnimationFrame(animate) }

  const handleWheel = (e) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const mx=(e.clientX-rect.left)/rect.width*800
    const my=(e.clientY-rect.top)/rect.height*500
    const factor = e.deltaY<0?1.12:0.89
    const nz = Math.min(12,Math.max(1,targetZoom.current*factor))
    const scale = nz/targetZoom.current
    targetPan.current={x:mx-scale*(mx-targetPan.current.x),y:my-scale*(my-targetPan.current.y)}
    targetZoom.current=nz; startAnim()
  }
  const handleMouseDown=(e)=>{isDragging.current=true;lastPos.current={x:e.clientX,y:e.clientY}}
  const handleMouseMove=(e)=>{
    if(!isDragging.current)return
    const dx=e.clientX-lastPos.current.x; const dy=e.clientY-lastPos.current.y
    lastPos.current={x:e.clientX,y:e.clientY}
    const W=containerRef.current?.clientWidth||800; const H=containerRef.current?.clientHeight||500
    targetPan.current={x:targetPan.current.x+dx*(800/W),y:targetPan.current.y+dy*(500/H)}
    currentPan.current={...targetPan.current}; setPan({...targetPan.current})
  }
  const handleMouseUp=()=>{isDragging.current=false}

  const proj=(lon,lat)=>[(lon+180)*(800/360),Math.max(0,Math.min(500,(90-lat)*(500/180)))]
  const toD=(geo)=>{
    if(!geo)return""
    const polys=geo.type==="Polygon"?[geo.coordinates]:geo.type==="MultiPolygon"?geo.coordinates:[]
    let d=""
    for(const poly of polys){
      for(const ring of poly){
        // split ring into segments at antimeridian crossings
        const segs=[[]]
        for(let i=0;i<ring.length;i++){
          if(i>0&&Math.abs(ring[i][0]-ring[i-1][0])>180)segs.push([])
          segs[segs.length-1].push(ring[i])
        }
        for(const seg of segs){
          if(seg.length<2)continue
          for(let i=0;i<seg.length;i++){
            const lo=Math.max(-179.9,Math.min(179.9,seg[i][0]))
            const la=Math.max(-89,Math.min(89,seg[i][1]))
            const x=(lo+180)*(800/360)
            const y=(90-la)*(500/180)
            d+=(i===0?"M":"L")+x.toFixed(1)+","+y.toFixed(1)
          }
          // only close if single segment (no antimeridian split)
          if(segs.length===1)d+="Z"
        }
      }
    }
    return d
  }

  const tinyPins = []
  if (loaded) {
    let pinNum = 1
    for (const a2 of allAlpha2s) {
      if (!TINY_A2.has(a2)) continue
      const center = TINY_CENTERS[a2]
      if (!center) continue
      const [x, y] = proj(center[0], center[1])
      const a3 = CODE2TO3[a2]
      const isGuessed = a3 && guessedCodes.includes(a3)
      const color = isGuessed ? "#10B981" : "#3B82F6"
      tinyPins.push({ x, y, a2, a3, color, isGuessed, num: pinNum++ })
    }
  }

  const sw = Math.max(0.2, 1/zoom)

  return (
    <div style={{width:"100%",background:"#0a1628",borderRadius:14,overflow:"hidden",border:"1px solid #1e3a5f",position:"relative",userSelect:"none"}}>
      <div style={{position:"absolute",top:8,right:8,zIndex:10,display:"flex",gap:6}}>
        <button onClick={()=>{targetZoom.current=Math.min(12,targetZoom.current*1.35);startAnim()}} style={{background:"rgba(10,22,40,0.95)",border:"1px solid #1e3a5f",color:"#e2e8f0",width:32,height:32,borderRadius:7,cursor:"pointer",fontSize:18,lineHeight:1}}>+</button>
        <button onClick={()=>{targetZoom.current=1;targetPan.current={x:0,y:0};startAnim()}} style={{background:"rgba(10,22,40,0.95)",border:"1px solid #1e3a5f",color:"#475569",width:32,height:32,borderRadius:7,cursor:"pointer",fontSize:12}}>↺</button>
        <button onClick={()=>{targetZoom.current=Math.max(1,targetZoom.current*0.75);startAnim()}} style={{background:"rgba(10,22,40,0.95)",border:"1px solid #1e3a5f",color:"#e2e8f0",width:32,height:32,borderRadius:7,cursor:"pointer",fontSize:18,lineHeight:1}}>−</button>
      </div>
      <div ref={containerRef} onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{cursor:isDragging.current?"grabbing":"grab"}}>
        <svg viewBox="0 0 800 500" overflow="hidden" style={{width:"100%",display:"block"}}>
          <defs><clipPath id="clip"><rect x="0" y="0" width="800" height="500"/></clipPath></defs>
          <rect width="800" height="500" fill="#0a1628"/>
          {!loaded&&<text x="400" y="250" textAnchor="middle" fill="#475569" fontSize="14">Loading map...</text>}
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`} clipPath="url(#clip)">
            {paths.map((p,i)=>{
              const ig=p.alpha3&&guessedCodes.includes(p.alpha3)
              const isWorld=p.alpha3&&COUNTRIES.some(c=>CODE2TO3[c.code]===p.alpha3)
              const isTiny=p.alpha2&&TINY_A2.has(p.alpha2)&&isWorld
              if(isTiny)return null
              const d=toD(p.geometry); if(!d)return null
              // skip paths that span nearly full map width (antimeridian artifacts)
              const xs=d.match(/[ML]([-\d.]+),/g)?.map(s=>parseFloat(s.slice(1)))
              if(xs&&xs.length>1&&Math.max(...xs)-Math.min(...xs)>750)return null
              if(p.alpha2==="AQ")return null
              return <path key={i} d={d}
                fill={ig?"#10B981":isWorld?"#3B82F6":"#1e3a5f"}
                stroke={ig?"#059669":isWorld?"#2563eb":"#0f2240"}
                strokeWidth={sw} strokeLinejoin="round"/>
            })}
            {tinyPins.map((pin)=>{
              const r=Math.max(4,7/zoom)
              const lineLen=Math.max(12,22/zoom)
              const fontSize=Math.max(5,9/zoom)
              const pulse=tick%2===0
              return (
                <g key={"pin-"+pin.a2}>
                  <circle cx={pin.x} cy={pin.y} r={pulse?r*1.8:r*1.3} fill={pin.color} opacity={pulse?0.25:0.12}/>
                  <circle cx={pin.x} cy={pin.y} r={r} fill={pin.color} stroke="#fff" strokeWidth={Math.max(0.5,1.2/zoom)}/>
                  <line x1={pin.x} y1={pin.y-r} x2={pin.x} y2={pin.y-r-lineLen} stroke={pin.color} strokeWidth={Math.max(0.5,1.2/zoom)}/>
                  <rect x={pin.x-fontSize*1.4} y={pin.y-r-lineLen-fontSize*1.6} width={fontSize*2.8} height={fontSize*1.6} rx={fontSize*0.4} fill={pin.color} opacity={0.9}/>
                  <text x={pin.x} y={pin.y-r-lineLen-fontSize*0.3} textAnchor="middle" fill="#fff" fontSize={fontSize} fontWeight="bold">{pin.num}</text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}


const CONTINENTS = [
  { name: "Africa",        short: "Africa",    emoji: "🌍", color: "#F59E0B" },
  { name: "Asia",          short: "Asia",      emoji: "🌏", color: "#3B82F6" },
  { name: "Europe",        short: "Europe",    emoji: "🌍", color: "#8B5CF6" },
  { name: "North America", short: "N.America", emoji: "🌎", color: "#10B981" },
  { name: "South America", short: "S.America", emoji: "🌎", color: "#EF4444" },
  { name: "Oceania",       short: "Oceania",   emoji: "🌏", color: "#06B6D4" },
]

export default function Mode1({ user, scores, updateMode1, onBack }) {
  const [guessed, setGuessed] = useState([])
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [shake, setShake] = useState(false)
  const timerRef = useRef(null)
  const inputRef = useRef(null)

  const remaining = COUNTRIES.filter(c => !guessed.includes(c.name))
  const myBest = scores.mode1[user] || null
  const record = Object.entries(scores.mode1).sort(([,a],[,b])=>a-b)[0] || null
  const recordHolder = record?.[0] || null
  const recordTime = record?.[1] || null
  const timerColor = recordTime
    ? time>=recordTime-10?(Math.floor(time)%2===0?"#EF4444":"#ff6b6b"):time>=recordTime-15?"#EF4444":time>=recordTime-30?"#F59E0B":"#e2e8f0"
    : "#e2e8f0"

  // Continent breakdown
  const continentStats = CONTINENTS.map(cont => {
    const total = COUNTRIES.filter(c => c.cont === cont.name).length
    const done = COUNTRIES.filter(c => c.cont === cont.name && guessed.includes(c.name)).length
    const remaining = total - done
    return { ...cont, total, done, remaining }
  })

  const continentStats = CONTINENTS.map(cont => {
    const total = COUNTRIES.filter(c => c.cont === cont.name).length
    const guessedCount = COUNTRIES.filter(c => c.cont === cont.name && guessed.includes(c.name)).length
    return { ...cont, total, remaining: total - guessedCount }
  })

  useEffect(() => {
    if(running&&!done){timerRef.current=setInterval(()=>setTime(t=>t+1),1000)}
    return()=>clearInterval(timerRef.current)
  }, [running,done])

  const start=()=>{setStarted(true);setRunning(true);setGuessed([]);setTime(0);setDone(false);setTimeout(()=>inputRef.current?.focus(),100)}

  const handleInput=(val)=>{
    setInput(val)
    const resolved=resolveCountry(val.trim())
    if(resolved&&!guessed.includes(resolved)){
      const ng=[...guessed,resolved];setGuessed(ng);setInput("")
      if(ng.length===COUNTRIES.length){setRunning(false);setDone(true);updateMode1(user,time+1)}
    } else if(val.endsWith(" ")&&val.trim().length>1){setShake(true);setTimeout(()=>setShake(false),400)}
  }

  const giveUp=()=>{setRunning(false);setDone(true)}
  const guessedCodes=guessed.map(name=>{const c=COUNTRIES.find(x=>x.name===name);return c?CODE2TO3[c.code]:null}).filter(Boolean)
  const guessedAlpha2s=guessed.map(name=>{const c=COUNTRIES.find(x=>x.name===name);return c?.code||null}).filter(Boolean)
  const leaderboard=Object.entries(scores.mode1).sort(([,a],[,b])=>a-b)

  return (
    <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <button onClick={onBack} style={{background:"none",border:"1px solid #1e293b",color:"#475569",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
          <h2 style={{color:"#e2e8f0",margin:0,fontSize:22,fontWeight:700}}>🌍 Countries of the World</h2>

        </div>

        <WorldMap guessedCodes={guessedCodes} guessedAlpha2s={guessedAlpha2s}/>

        <div style={{marginTop:10,marginBottom:8,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{fontSize:12,color:"#10B981"}}>■ Guessed</div>
          <div style={{fontSize:12,color:"#3B82F6"}}>■ Remaining</div>
          <div style={{fontSize:11,color:"#475569"}}>Scroll or +/− to zoom · drag to pan</div>
        </div>

        {/* Continent tracker */}
        {started && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
            {continentStats.map(cont => (
              <div key={cont.name} style={{background:"#080f1e",border:`1px solid ${cont.remaining===0?"#10B981":"#1e293b"}`,borderRadius:10,padding:"8px 12px",display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>{cont.emoji}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:10,color:"#475569",letterSpacing:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{cont.name.toUpperCase()}</div>
                  <div style={{fontSize:13,fontWeight:700,color:cont.remaining===0?"#10B981":cont.color}}>
                    {cont.remaining===0?"✓ Done":`${cont.remaining} left`}
                  </div>
                </div>
                <div style={{fontSize:11,color:"#475569"}}>{cont.done}/{cont.total}</div>
              </div>
            ))}
          </div>
        )}

        {/* Record + Timer bar */}
        {started&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:8}}>
            {continentStats.map(cont=>(
              <div key={cont.name} style={{background:"#080f1e",border:`1px solid ${cont.remaining===0?"#10B981":"#1e293b"}`,borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:13,color:cont.remaining===0?"#10B981":cont.color,fontWeight:600}}>{cont.short}</span>
                <span style={{fontSize:15,fontWeight:900,color:cont.remaining===0?"#10B981":"#e2e8f0"}}>{cont.remaining===0?"✓":cont.remaining}</span>
              </div>
            ))}
          </div>
        )}

        {started&&!done&&(
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"10px 16px",background:"#080f1e",borderRadius:10,border:"1px solid #1e293b"}}>
            <div>
              {recordTime?(
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:11,color:"#475569",letterSpacing:1}}>RECORD</span>
                  <span style={{fontSize:14,fontWeight:900,color:"#F59E0B"}}>👑 {recordHolder}</span>
                  <span style={{fontSize:14,fontWeight:700,color:"#e2e8f0"}}>{fmtTime(recordTime)}</span>
                </div>
              ):<span style={{fontSize:12,color:"#475569"}}>No record yet — be first!</span>}
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
              <div style={{fontSize:11,color:"#475569",letterSpacing:1}}>{guessed.length}/196</div>
              <div style={{fontSize:32,fontWeight:900,color:timerColor,transition:"color 0.3s"}}>{fmtTime(time)}</div>
            </div>
          </div>
        )}

        {!started?(
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{color:"#475569",fontSize:14,marginBottom:16}}>Name all 196 countries as fast as possible</div>
            <button onClick={start} style={{background:"linear-gradient(135deg,#1e3a5f,#0f172a)",border:"2px solid #3B82F6",color:"#60a5fa",padding:"20px 40px",borderRadius:14,cursor:"pointer",fontSize:18,fontFamily:"inherit",fontWeight:700}}>Start Timer →</button>
          </div>
        ):!done?(
          <div style={{display:"flex",gap:12,marginBottom:16}}>
            <input ref={inputRef} value={input} onChange={e=>handleInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"){const r=resolveCountry(input.trim());if(!r||guessed.includes(r)){setShake(true);setTimeout(()=>setShake(false),400);setInput("")}}}}
              placeholder="Type a country..."
              style={{flex:1,background:shake?"#3f1515":"#0f172a",border:"2px solid "+(shake?"#EF4444":"#1e293b"),borderRadius:12,padding:"16px 20px",fontSize:18,color:"#e2e8f0",outline:"none",fontFamily:"inherit",transition:"all 0.2s"}}/>
            <button onClick={giveUp} style={{background:"#0f172a",border:"1px solid #1e293b",color:"#475569",padding:"16px 18px",borderRadius:12,cursor:"pointer",fontSize:13}}>Give Up</button>
          </div>
        ):(
          <div style={{marginBottom:16,padding:20,background:guessed.length===COUNTRIES.length?"#0f2a1e":"#0f172a",border:`2px solid ${guessed.length===COUNTRIES.length?"#10B981":"#1e293b"}`,borderRadius:16,textAlign:"center"}}>
            {guessed.length===COUNTRIES.length
              ?<div style={{fontSize:24,fontWeight:900,color:"#10B981"}}>✓ Complete! {fmtTime(time)}</div>
              :<div style={{fontSize:20,fontWeight:700,color:"#e2e8f0"}}>{guessed.length}/196 named</div>}
            {myBest&&guessed.length===COUNTRIES.length&&time+1<=myBest&&<div style={{fontSize:14,color:"#34d399",marginTop:4}}>New personal best! 🎉</div>}
            <button onClick={start} style={{marginTop:12,background:"#1e3a5f",border:"none",color:"#60a5fa",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:15,fontFamily:"inherit"}}>Play Again</button>
          </div>
        )}

        {started&&!done&&guessed.length>0&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16,maxHeight:160,overflowY:"auto"}}>
            {guessed.map(name=>{const c=COUNTRIES.find(x=>x.name===name);return(
              <div key={name} style={{padding:"4px 10px",borderRadius:6,fontSize:12,background:"#0f2a1e",border:"1px solid #10B981",color:"#10B981"}}>{c?.flag} {name}</div>
            )})}
          </div>
        )}

        {done&&remaining.length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#EF4444",marginBottom:8}}>MISSED</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {remaining.map(c=>(
                <div key={c.name} style={{padding:"4px 10px",borderRadius:6,fontSize:12,background:"#1a0f0f",border:"1px solid #EF4444",color:"#EF4444"}}>{c.flag} {c.name}</div>
              ))}
            </div>
          </div>
        )}

        {leaderboard.length>0&&(
          <div style={{marginTop:16,background:"#080f1e",border:"1px solid #1e293b",borderRadius:16,padding:20}}>
            <div style={{fontSize:11,letterSpacing:4,color:"#3B82F6",textTransform:"uppercase",marginBottom:12}}>🏅 Leaderboard</div>
            {leaderboard.map(([uid,t],i)=>(
              <div key={uid} style={{display:"flex",gap:12,padding:"8px 0",borderBottom:i<leaderboard.length-1?"1px solid #1e293b":"none"}}>
                <span style={{fontSize:20,width:32}}>{["🥇","🥈","🥉"][i]||"·"}</span>
                <span style={{flex:1,color:uid===user?"#34d399":"#94a3b8",fontWeight:uid===user?700:400}}>{uid}</span>
                <span style={{color:"#e2e8f0",fontWeight:700}}>{fmtTime(t)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
