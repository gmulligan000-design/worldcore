import { useState, useEffect, useRef } from 'react'
import { COUNTRIES, resolveCountry, fmtTime } from './data'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const CODE2TO3 = {
  AF:"AFG",AL:"ALB",DZ:"DZA",AD:"AND",AO:"AGO",AG:"ATG",AR:"ARG",AM:"ARM",AU:"AUS",AT:"AUT",AZ:"AZE",BS:"BHS",BH:"BHR",BD:"BGD",BB:"BRB",BY:"BLR",BE:"BEL",BZ:"BLZ",BJ:"BEN",BT:"BTN",BO:"BOL",BA:"BIH",BW:"BWA",BR:"BRA",BN:"BRN",BG:"BGR",BF:"BFA",BI:"BDI",KH:"KHM",CM:"CMR",CA:"CAN",CV:"CPV",CF:"CAF",TD:"TCD",CL:"CHL",CN:"CHN",CO:"COL",KM:"COM",CG:"COG",CR:"CRI",HR:"HRV",CU:"CUB",CY:"CYP",CZ:"CZE",DK:"DNK",DJ:"DJI",DM:"DMA",DO:"DOM",CD:"COD",EC:"ECU",EG:"EGY",SV:"SLV",GQ:"GNQ",ER:"ERI",EE:"EST",SZ:"SWZ",ET:"ETH",FJ:"FJI",FI:"FIN",FR:"FRA",GA:"GAB",GM:"GMB",GE:"GEO",DE:"DEU",GH:"GHA",GR:"GRC",GD:"GRD",GT:"GTM",GN:"GIN",GW:"GNB",GY:"GUY",HT:"HTI",VA:"VAT",HN:"HND",HU:"HUN",IS:"ISL",IN:"IND",ID:"IDN",IR:"IRN",IQ:"IRQ",IE:"IRL",IL:"ISR",IT:"ITA",CI:"CIV",JM:"JAM",JP:"JPN",JO:"JOR",KZ:"KAZ",KE:"KEN",KI:"KIR",KW:"KWT",KG:"KGZ",LA:"LAO",LV:"LVA",LB:"LBN",LS:"LSO",LR:"LBR",LY:"LBY",LI:"LIE",LT:"LTU",LU:"LUX",MG:"MDG",MW:"MWI",MY:"MYS",MV:"MDV",ML:"MLI",MT:"MLT",MH:"MHL",MR:"MRT",MU:"MUS",MX:"MEX",FM:"FSM",MD:"MDA",MC:"MCO",MN:"MNG",ME:"MNE",MA:"MAR",MZ:"MOZ",MM:"MMR",NA:"NAM",NR:"NRU",NP:"NPL",NL:"NLD",NZ:"NZL",NI:"NIC",NE:"NER",NG:"NGA",KP:"PRK",MK:"MKD",NO:"NOR",OM:"OMN",PK:"PAK",PW:"PLW",PA:"PAN",PG:"PNG",PY:"PRY",PE:"PER",PH:"PHL",PL:"POL",PT:"PRT",QA:"QAT",RO:"ROU",RU:"RUS",RW:"RWA",KN:"KNA",LC:"LCA",VC:"VCT",WS:"WSM",SM:"SMR",ST:"STP",SA:"SAU",SN:"SEN",RS:"SRB",SC:"SYC",SL:"SLE",SG:"SGP",SK:"SVK",SI:"SVN",SB:"SLB",SO:"SOM",ZA:"ZAF",KR:"KOR",SS:"SSD",ES:"ESP",LK:"LKA",PS:"PSE",SD:"SDN",SR:"SUR",SE:"SWE",CH:"CHE",SY:"SYR",TW:"TWN",TJ:"TJK",TZ:"TZA",TH:"THA",TL:"TLS",TG:"TGO",TO:"TON",TT:"TTO",TN:"TUN",TR:"TUR",TM:"TKM",TV:"TUV",UG:"UGA",UA:"UKR",AE:"ARE",GB:"GBR",US:"USA",UY:"URY",UZ:"UZB",VU:"VUT",VE:"VEN",VN:"VNM",YE:"YEM",ZM:"ZMB",ZW:"ZWE"
}
function buildNumericMap(){return{"004":"AF","008":"AL","012":"DZ","020":"AD","024":"AO","028":"AG","032":"AR","051":"AM","036":"AU","040":"AT","031":"AZ","044":"BS","048":"BH","050":"BD","052":"BB","112":"BY","056":"BE","084":"BZ","204":"BJ","064":"BT","068":"BO","070":"BA","072":"BW","076":"BR","096":"BN","100":"BG","854":"BF","108":"BI","116":"KH","120":"CM","124":"CA","132":"CV","140":"CF","148":"TD","152":"CL","156":"CN","170":"CO","174":"KM","178":"CG","188":"CR","191":"HR","192":"CU","196":"CY","203":"CZ","208":"DK","262":"DJ","212":"DM","214":"DO","180":"CD","218":"EC","818":"EG","222":"SV","226":"GQ","232":"ER","233":"EE","748":"SZ","231":"ET","242":"FJ","246":"FI","250":"FR","266":"GA","270":"GM","268":"GE","276":"DE","288":"GH","300":"GR","308":"GD","320":"GT","324":"GN","624":"GW","328":"GY","332":"HT","336":"VA","340":"HN","348":"HU","352":"IS","356":"IN","360":"ID","364":"IR","368":"IQ","372":"IE","376":"IL","380":"IT","384":"CI","388":"JM","392":"JP","400":"JO","398":"KZ","404":"KE","296":"KI","414":"KW","417":"KG","418":"LA","428":"LV","422":"LB","426":"LS","430":"LR","434":"LY","438":"LI","440":"LT","442":"LU","450":"MG","454":"MW","458":"MY","462":"MV","466":"ML","470":"MT","584":"MH","478":"MR","480":"MU","484":"MX","583":"FM","498":"MD","492":"MC","496":"MN","499":"ME","504":"MA","508":"MZ","104":"MM","516":"NA","520":"NR","524":"NP","528":"NL","554":"NZ","558":"NI","562":"NE","566":"NG","408":"KP","807":"MK","578":"NO","512":"OM","586":"PK","585":"PW","591":"PA","598":"PG","600":"PY","604":"PE","608":"PH","616":"PL","620":"PT","634":"QA","642":"RO","643":"RU","646":"RW","659":"KN","662":"LC","670":"VC","882":"WS","674":"SM","678":"ST","682":"SA","686":"SN","688":"RS","690":"SC","694":"SL","702":"SG","703":"SK","705":"SI","090":"SB","706":"SO","710":"ZA","410":"KR","728":"SS","724":"ES","144":"LK","275":"PS","729":"SD","740":"SR","752":"SE","756":"CH","760":"SY","158":"TW","762":"TJ","834":"TZ","764":"TH","626":"TL","768":"TG","776":"TO","780":"TT","788":"TN","792":"TR","795":"TM","798":"TV","800":"UG","804":"UA","784":"AE","826":"GB","840":"US","858":"UY","860":"UZ","548":"VU","862":"VE","704":"VN","887":"YE","894":"ZM","716":"ZW"}}

function SimpleWorldMap({ targetCodes, guessedCodes }) {
  const [paths, setPaths] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        await new Promise((res, rej) => { if (window.topojson){res();return} const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s) })
        const r = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        const topo = await r.json()
        if (cancelled) return
        const features = window.topojson.feature(topo, topo.objects.countries).features
        const nm = buildNumericMap()
        setPaths(features.map(f => { const a2=nm[String(f.id).padStart(3,'0')]; return {alpha3:a2?CODE2TO3[a2]:null,geometry:f.geometry} }))
        setLoaded(true)
      } catch(e){setLoaded(true)}
    }
    load()
    return()=>{cancelled=true}
  }, [])
  const proj=(lon,lat)=>[(lon+180)*(800/360),(90-lat)*(380/180)+10]
  const toD=(geo)=>{
    if(!geo)return""
    const polys=geo.type==="Polygon"?[geo.coordinates]:geo.type==="MultiPolygon"?geo.coordinates:[]
    let d=""
    for(const poly of polys)for(const ring of poly){let f=true;for(const[lo,la]of ring){const[x,y]=proj(lo,la);d+=(f?"M":"L")+x.toFixed(1)+","+y.toFixed(1);f=false}d+="Z"}
    return d
  }
  return (
    <div style={{width:"100%",background:"#060d1a",borderRadius:12,overflow:"hidden",border:"1px solid #1e293b"}}>
      <svg viewBox="0 0 800 400" style={{width:"100%",display:"block"}}>
        <rect width="800" height="400" fill="#060d1a"/>
        {!loaded&&<text x="400" y="200" textAnchor="middle" fill="#475569" fontSize="14">Loading map...</text>}
        {paths.map((p,i)=>{const ig=p.alpha3&&guessedCodes.includes(p.alpha3);const it=p.alpha3&&targetCodes.includes(p.alpha3);const d=toD(p.geometry);if(!d)return null;return <path key={i} d={d} fill={ig?"#10B981":it?"#3B82F6":"#1e3a5f"} stroke="#060d1a" strokeWidth="0.5" opacity={ig||it?1:0.35}/>})}
      </svg>
    </div>
  )
}

const VALID_LETTERS = LETTERS.filter(l => COUNTRIES.some(c => c.name.startsWith(l)))
const getRandomLetter = () => VALID_LETTERS[Math.floor(Math.random() * VALID_LETTERS.length)]
const USERS = ["Mi", "Gary", "Hailey"]

export default function Mode2({ user, scores, updateMode2, onBack }) {
  const getLC = (l) => COUNTRIES.filter(c => c.name.startsWith(l))
  const [view, setView] = useState("playing")
  const [letter, setLetter] = useState(() => getRandomLetter())
  const [guessed, setGuessed] = useState([])
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(true)
  const [done, setDone] = useState(false)
  const [shake, setShake] = useState(false)
  const timerRef = useRef(null)
  const lc = getLC(letter)
  const record = scores.mode2[letter] || null
  const holder = scores.mode2holders?.[letter] || null

  useEffect(() => {
    if (running && !done) { timerRef.current = setInterval(() => setTime(t => t+1), 1000) }
    return () => clearInterval(timerRef.current)
  }, [running, done])

  const startNew = () => { const l=getRandomLetter(); setLetter(l); setGuessed([]); setInput(""); setTime(0); setRunning(true); setDone(false) }

  const handleGuess = () => {
    const val = input.trim(); if (!val) return
    const resolved = resolveCountry(val)
    if (resolved && resolved.startsWith(letter) && !guessed.includes(resolved)) {
      const ng = [...guessed, resolved]; setGuessed(ng); setInput("")
      if (ng.length === lc.length) { setRunning(false); setDone(true); updateMode2(user, letter, time+1) }
    } else { setShake(true); setTimeout(()=>setShake(false),500); setInput("") }
  }

  const giveUp = () => { setRunning(false); setDone(true) }
  const targetCodes = lc.map(c=>CODE2TO3[c.code]).filter(Boolean)
  const guessedCodes = guessed.map(name=>{const c=COUNTRIES.find(x=>x.name===name);return c?CODE2TO3[c.code]:null}).filter(Boolean)

  if (view === "leaderboard") {
    return (
      <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
            <button onClick={()=>setView("playing")} style={{background:"none",border:"1px solid #1e293b",color:"#475569",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
            <h2 style={{color:"#e2e8f0",margin:0,fontSize:22,fontWeight:700}}>🏅 All Letter Records</h2>
          </div>
          <div style={{background:"#080f1e",border:"1px solid #1e293b",borderRadius:16,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 1fr 1fr",padding:"12px 16px",borderBottom:"1px solid #1e293b",background:"#0a1628"}}>
              <div style={{fontSize:11,color:"#475569",letterSpacing:2}}>LTR</div>
              <div style={{fontSize:11,color:"#475569",letterSpacing:2}}>COUNT</div>
              {USERS.map(u=><div key={u} style={{fontSize:11,color:u===user?"#34d399":"#475569",letterSpacing:2,textAlign:"right",fontWeight:u===user?700:400}}>{u.toUpperCase()}</div>)}
            </div>
            {VALID_LETTERS.map((l,i)=>(
              <div key={l} style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 1fr 1fr",padding:"10px 16px",borderBottom:i<VALID_LETTERS.length-1?"1px solid #0f172a":"none",background:i%2===0?"#080f1e":"#060d1a"}}>
                <div style={{fontSize:18,fontWeight:900,color:"#e2e8f0"}}>{l}</div>
                <div style={{fontSize:12,color:"#475569",alignSelf:"center"}}>{getLC(l).length}</div>
                {USERS.map(u=>{const t=scores.mode2userscores?.[u]?.[l]||null;const isRec=t&&t===scores.mode2[l];return(
                  <div key={u} style={{textAlign:"right",alignSelf:"center"}}>
                    {t?<span style={{fontSize:13,fontWeight:700,color:isRec?"#F59E0B":u===user?"#34d399":"#60a5fa"}}>{isRec?"👑 ":""}{fmtTime(t)}</span>:<span style={{fontSize:12,color:"#1e293b"}}>—</span>}
                  </div>
                )})}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={onBack} style={{background:"none",border:"1px solid #1e293b",color:"#475569",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
          <div style={{fontSize:36,fontWeight:900,color:"#e2e8f0"}}>{letter}</div>
          <div style={{fontSize:13,color:"#475569"}}>{lc.length} countries</div>

          {record ? (
            <div style={{marginLeft:12,padding:"6px 14px",background:"#0f172a",border:"1px solid #1e3a5f",borderRadius:10,display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:11,color:"#475569",letterSpacing:1}}>RECORD</span>
              <span style={{fontSize:14,fontWeight:900,color:"#F59E0B"}}>👑 {holder}</span>
              <span style={{fontSize:14,fontWeight:700,color:"#e2e8f0"}}>{fmtTime(record)}</span>
            </div>
          ) : (
            <div style={{marginLeft:12,padding:"6px 14px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10}}>
              <span style={{fontSize:11,color:"#475569"}}>No record yet for {letter}</span>
            </div>
          )}

          <button onClick={()=>setView("leaderboard")} style={{marginLeft:"auto",background:"#0f172a",border:"1px solid #1e3a5f",color:"#60a5fa",padding:"8px 14px",borderRadius:8,cursor:"pointer",fontSize:12}}>🏅 All Records</button>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:28,fontWeight:900,color:done?"#10B981":record&&time>record?"#EF4444":"#e2e8f0"}}>{fmtTime(time)}</div>
          </div>
        </div>

        <SimpleWorldMap targetCodes={targetCodes} guessedCodes={guessedCodes}/>

        <div style={{marginTop:10,marginBottom:10,display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:12,color:"#10B981"}}>■ Guessed</div>
          <div style={{fontSize:12,color:"#3B82F6"}}>■ Still needed</div>
          <div style={{marginLeft:"auto",fontSize:13,color:"#e2e8f0",fontWeight:700}}>{guessed.length}/{lc.length}</div>
        </div>

        {!done?(
          <div style={{display:"flex",gap:12,marginBottom:20}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleGuess()}
              placeholder={`Country starting with ${letter}...`} autoFocus
              style={{flex:1,background:shake?"#3f1515":"#0f172a",border:"2px solid "+(shake?"#EF4444":"#1e293b"),borderRadius:12,padding:"16px 20px",fontSize:18,color:"#e2e8f0",outline:"none",fontFamily:"inherit",transition:"all 0.2s"}}/>
            <button onClick={giveUp} style={{background:"#0f172a",border:"1px solid #1e293b",color:"#475569",padding:"16px 20px",borderRadius:12,cursor:"pointer",fontSize:13}}>Give up</button>
          </div>
        ):(
          <div style={{marginBottom:20,padding:20,background:"#0f2a1e",border:"2px solid #10B981",borderRadius:16,textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:900,color:"#10B981"}}>{guessed.length===lc.length?"✓ Complete!":guessed.length+"/"+lc.length+" named"}</div>
            {guessed.length===lc.length&&<div style={{fontSize:18,color:"#e2e8f0",marginTop:4}}>Time: {fmtTime(time)}</div>}
            <button onClick={startNew} style={{marginTop:12,background:"#1e3a5f",border:"none",color:"#60a5fa",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:15,fontFamily:"inherit"}}>New Random Letter →</button>
          </div>
        )}

        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {lc.map(c=>(
            <div key={c.name} style={{padding:"6px 12px",borderRadius:8,fontSize:13,background:guessed.includes(c.name)?"#0f2a1e":done?"#1a0f0f":"#0f172a",border:"1px solid "+(guessed.includes(c.name)?"#10B981":done?"#EF4444":"#1e293b"),color:guessed.includes(c.name)?"#10B981":done?"#EF4444":"#475569"}}>
              {guessed.includes(c.name)?c.flag+" "+c.name:done?c.name:"?"}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
