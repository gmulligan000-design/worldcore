import { useState, useEffect, useRef } from 'react'
import { COUNTRIES, resolveCountry } from './data'

const USERS = ["Mi", "Gary", "Hailey"]
const CODE2TO3 = {
  AF:"AFG",AL:"ALB",DZ:"DZA",AD:"AND",AO:"AGO",AG:"ATG",AR:"ARG",AM:"ARM",AU:"AUS",AT:"AUT",AZ:"AZE",BS:"BHS",BH:"BHR",BD:"BGD",BB:"BRB",BY:"BLR",BE:"BEL",BZ:"BLZ",BJ:"BEN",BT:"BTN",BO:"BOL",BA:"BIH",BW:"BWA",BR:"BRA",BN:"BRN",BG:"BGR",BF:"BFA",BI:"BDI",KH:"KHM",CM:"CMR",CA:"CAN",CV:"CPV",CF:"CAF",TD:"TCD",CL:"CHL",CN:"CHN",CO:"COL",KM:"COM",CG:"COG",CR:"CRI",HR:"HRV",CU:"CUB",CY:"CYP",CZ:"CZE",DK:"DNK",DJ:"DJI",DM:"DMA",DO:"DOM",CD:"COD",EC:"ECU",EG:"EGY",SV:"SLV",GQ:"GNQ",ER:"ERI",EE:"EST",SZ:"SWZ",ET:"ETH",FJ:"FJI",FI:"FIN",FR:"FRA",GA:"GAB",GM:"GMB",GE:"GEO",DE:"DEU",GH:"GHA",GR:"GRC",GD:"GRD",GT:"GTM",GN:"GIN",GW:"GNB",GY:"GUY",HT:"HTI",VA:"VAT",HN:"HND",HU:"HUN",IS:"ISL",IN:"IND",ID:"IDN",IR:"IRN",IQ:"IRQ",IE:"IRL",IL:"ISR",IT:"ITA",CI:"CIV",JM:"JAM",JP:"JPN",JO:"JOR",KZ:"KAZ",KE:"KEN",KI:"KIR",KW:"KWT",KG:"KGZ",LA:"LAO",LV:"LVA",LB:"LBN",LS:"LSO",LR:"LBR",LY:"LBY",LI:"LIE",LT:"LTU",LU:"LUX",MG:"MDG",MW:"MWI",MY:"MYS",MV:"MDV",ML:"MLI",MT:"MLT",MH:"MHL",MR:"MRT",MU:"MUS",MX:"MEX",FM:"FSM",MD:"MDA",MC:"MCO",MN:"MNG",ME:"MNE",MA:"MAR",MZ:"MOZ",MM:"MMR",NA:"NAM",NR:"NRU",NP:"NPL",NL:"NLD",NZ:"NZL",NI:"NIC",NE:"NER",NG:"NGA",KP:"PRK",MK:"MKD",NO:"NOR",OM:"OMN",PK:"PAK",PW:"PLW",PA:"PAN",PG:"PNG",PY:"PRY",PE:"PER",PH:"PHL",PL:"POL",PT:"PRT",QA:"QAT",RO:"ROU",RU:"RUS",RW:"RWA",KN:"KNA",LC:"LCA",VC:"VCT",WS:"WSM",SM:"SMR",ST:"STP",SA:"SAU",SN:"SEN",RS:"SRB",SC:"SYC",SL:"SLE",SG:"SGP",SK:"SVK",SI:"SVN",SB:"SLB",SO:"SOM",ZA:"ZAF",KR:"KOR",SS:"SSD",ES:"ESP",LK:"LKA",PS:"PSE",SD:"SDN",SR:"SUR",SE:"SWE",CH:"CHE",SY:"SYR",TW:"TWN",TJ:"TJK",TZ:"TZA",TH:"THA",TL:"TLS",TG:"TGO",TO:"TON",TT:"TTO",TN:"TUN",TR:"TUR",TM:"TKM",TV:"TUV",UG:"UGA",UA:"UKR",AE:"ARE",GB:"GBR",US:"USA",UY:"URY",UZ:"UZB",VU:"VUT",VE:"VEN",VN:"VNM",YE:"YEM",ZM:"ZMB",ZW:"ZWE"
}
function buildNumericMap(){return{"004":"AF","008":"AL","012":"DZ","020":"AD","024":"AO","028":"AG","032":"AR","051":"AM","036":"AU","040":"AT","031":"AZ","044":"BS","048":"BH","050":"BD","052":"BB","112":"BY","056":"BE","084":"BZ","204":"BJ","064":"BT","068":"BO","070":"BA","072":"BW","076":"BR","096":"BN","100":"BG","854":"BF","108":"BI","116":"KH","120":"CM","124":"CA","132":"CV","140":"CF","148":"TD","152":"CL","156":"CN","170":"CO","174":"KM","178":"CG","188":"CR","191":"HR","192":"CU","196":"CY","203":"CZ","208":"DK","262":"DJ","212":"DM","214":"DO","180":"CD","218":"EC","818":"EG","222":"SV","226":"GQ","232":"ER","233":"EE","748":"SZ","231":"ET","242":"FJ","246":"FI","250":"FR","266":"GA","270":"GM","268":"GE","276":"DE","288":"GH","300":"GR","308":"GD","320":"GT","324":"GN","624":"GW","328":"GY","332":"HT","336":"VA","340":"HN","348":"HU","352":"IS","356":"IN","360":"ID","364":"IR","368":"IQ","372":"IE","376":"IL","380":"IT","384":"CI","388":"JM","392":"JP","400":"JO","398":"KZ","404":"KE","296":"KI","414":"KW","417":"KG","418":"LA","428":"LV","422":"LB","426":"LS","430":"LR","434":"LY","438":"LI","440":"LT","442":"LU","450":"MG","454":"MW","458":"MY","462":"MV","466":"ML","470":"MT","584":"MH","478":"MR","480":"MU","484":"MX","583":"FM","498":"MD","492":"MC","496":"MN","499":"ME","504":"MA","508":"MZ","104":"MM","516":"NA","520":"NR","524":"NP","528":"NL","554":"NZ","558":"NI","562":"NE","566":"NG","408":"KP","807":"MK","578":"NO","512":"OM","586":"PK","585":"PW","591":"PA","598":"PG","600":"PY","604":"PE","608":"PH","616":"PL","620":"PT","634":"QA","642":"RO","643":"RU","646":"RW","659":"KN","662":"LC","670":"VC","882":"WS","674":"SM","678":"ST","682":"SA","686":"SN","688":"RS","690":"SC","694":"SL","702":"SG","703":"SK","705":"SI","090":"SB","706":"SO","710":"ZA","410":"KR","728":"SS","724":"ES","144":"LK","275":"PS","729":"SD","740":"SR","752":"SE","756":"CH","760":"SY","158":"TW","762":"TJ","834":"TZ","764":"TH","626":"TL","768":"TG","776":"TO","780":"TT","788":"TN","792":"TR","795":"TM","798":"TV","800":"UG","804":"UA","784":"AE","826":"GB","840":"US","858":"UY","860":"UZ","548":"VU","862":"VE","704":"VN","887":"YE","894":"ZM","716":"ZW"}}

function DuelMap({ highlightCode }) {
  const [paths, setPaths] = useState([])
  const [loaded, setLoaded] = useState(false)
  const alpha3 = CODE2TO3[highlightCode] || null

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
        setPaths(features.map(f=>{const a2=nm[String(f.id).padStart(3,'0')];return{alpha3:a2?CODE2TO3[a2]:null,geometry:f.geometry}}))
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
        <g>
          {paths.map((p,i)=>{
            const isTarget = p.alpha3 && p.alpha3 === alpha3
            const d = toD(p.geometry)
            if (!d) return null
            return <path key={i} d={d} fill={isTarget?"#F59E0B":"#1a3a5c"} stroke={isTarget?"#d97706":"#0f2a4a"} strokeWidth={isTarget?"1.5":"0.5"} opacity={isTarget?1:0.5}/>
          })}
        </g>
      </svg>
    </div>
  )
}

export default function Mode5({ user, scores, updateMode5, onBack }) {
  const [view, setView] = useState("home")
  const [selectedOpponent, setSelectedOpponent] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countrySearch, setCountrySearch] = useState("")
  const [activeDuel, setActiveDuel] = useState(null)
  const [phase, setPhase] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [input, setInput] = useState("")
  const [success, setSuccess] = useState(null)
  const [counterSearch, setCounterSearch] = useState("")
  const [counterCountry, setCounterCountry] = useState(null)
  const timerRef = useRef(null)

  const myDuels = (scores.mode5duels || []).filter(d => d.challenger === user || d.target === user)
  const pendingForMe = myDuels.filter(d => d.status === 'pending' && d.target === user)
  const pendingCounter = myDuels.filter(d => d.status === 'pending_challenger' && d.challenger === user)
  const opponents = USERS.filter(u => u !== user)

  const filteredCountries = COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).slice(0, 8)
  const filteredCounter = COUNTRIES.filter(c => c.name.toLowerCase().includes(counterSearch.toLowerCase())).slice(0, 8)

  const sendDuel = async () => {
    if (!selectedOpponent || !selectedCountry) return
    await updateMode5('send', { challenger: user, target: selectedOpponent, country: selectedCountry.name, country_code: selectedCountry.code })
    setView("home"); setSelectedOpponent(null); setSelectedCountry(null); setCountrySearch("")
  }

  const startReveal = (duel) => {
    setActiveDuel(duel); setPhase("reveal"); setRevealed(false); setTimeLeft(30); setInput(""); setSuccess(null)
  }

  useEffect(() => {
    if (phase === "guessing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleTimeUp(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  const handleReveal = () => { setRevealed(true); setPhase("guessing") }

  const handleTimeUp = () => {
    setSuccess(false); setPhase("result")
    updateMode5('respond', { id: activeDuel.id, success: false })
  }

  const handleInput = (val) => {
    setInput(val)
    const resolved = resolveCountry(val.trim())
    if (resolved === activeDuel.country) {
      clearInterval(timerRef.current)
      setSuccess(true); setPhase("result")
      updateMode5('respond', { id: activeDuel.id, success: true })
    }
  }

  const startChallengerReveal = (duel) => {
    setActiveDuel(duel); setPhase("challenger_reveal"); setRevealed(false); setTimeLeft(30); setInput(""); setSuccess(null)
  }

  const handleChallengerReveal = () => { setRevealed(true); setPhase("challenger_guessing") }

  useEffect(() => {
    if (phase === "challenger_guessing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleChallengerTimeUp(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  const handleChallengerTimeUp = () => {
    setSuccess(false); setPhase("challenger_result")
    updateMode5('resolve', { id: activeDuel.id, success: false })
  }

  const handleChallengerInput = (val) => {
    setInput(val)
    const resolved = resolveCountry(val.trim())
    if (resolved === activeDuel.counter_country) {
      clearInterval(timerRef.current)
      setSuccess(true); setPhase("challenger_counter_pick")
    }
  }

  const sendCounter = async () => {
    if (!counterCountry) return
    await updateMode5('resolve', { id: activeDuel.id, success: true, newCountry: counterCountry.name, newCode: counterCountry.code })
    setView("home"); setActiveDuel(null); setPhase(null); setCounterCountry(null); setCounterSearch("")
  }

  const timerColor = timeLeft <= 10 ? "#EF4444" : timeLeft <= 20 ? "#F59E0B" : "#10B981"

  if (view === "challenge") {
    return (
      <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
            <button onClick={()=>setView("home")} style={{background:"none",border:"1px solid #1e293b",color:"#475569",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
            <h2 style={{color:"#e2e8f0",margin:0,fontSize:22,fontWeight:700}}>⚔️ Send a Duel</h2>
          </div>

          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#475569",marginBottom:12}}>CHOOSE OPPONENT</div>
            <div style={{display:"flex",gap:12}}>
              {opponents.map(op=>(
                <button key={op} onClick={()=>setSelectedOpponent(op)} style={{flex:1,padding:"20px",background:selectedOpponent===op?"#1e3a5f":"#080f1e",border:`2px solid ${selectedOpponent===op?"#3B82F6":"#1e293b"}`,borderRadius:14,cursor:"pointer",color:selectedOpponent===op?"#60a5fa":"#94a3b8",fontSize:18,fontWeight:700,fontFamily:"inherit"}}>
                  {op}
                </button>
              ))}
            </div>
          </div>

          {selectedOpponent && (
            <div style={{marginBottom:24}}>
              <div style={{fontSize:11,letterSpacing:3,color:"#475569",marginBottom:12}}>PICK YOUR TRAP COUNTRY 😈</div>
              <input value={countrySearch} onChange={e=>setCountrySearch(e.target.value)} placeholder="Search country..." style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"12px 16px",fontSize:16,color:"#e2e8f0",outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}}/>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {filteredCountries.map(c=>(
                  <button key={c.name} onClick={()=>{setSelectedCountry(c);setCountrySearch(c.name)}} style={{background:selectedCountry?.name===c.name?"#1e3a5f":"#080f1e",border:`1px solid ${selectedCountry?.name===c.name?"#3B82F6":"#1e293b"}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"left",color:"#e2e8f0",fontSize:15,fontFamily:"inherit",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:20}}>{c.flag}</span><span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedOpponent && selectedCountry && (
            <div style={{background:"#080f1e",border:"2px solid #EF4444",borderRadius:16,padding:20,marginBottom:20,textAlign:"center"}}>
              <div style={{fontSize:13,color:"#EF4444",marginBottom:8}}>⚠️ You are sending <strong style={{color:"#e2e8f0"}}>{selectedOpponent}</strong> this trap:</div>
              <div style={{fontSize:28}}>{selectedCountry.flag}</div>
              <div style={{fontSize:22,fontWeight:900,color:"#e2e8f0"}}>{selectedCountry.name}</div>
              <div style={{fontSize:12,color:"#475569",marginTop:4}}>They won't see the name — just the map highlight</div>
            </div>
          )}

          <button onClick={sendDuel} disabled={!selectedOpponent||!selectedCountry} style={{width:"100%",background:selectedOpponent&&selectedCountry?"linear-gradient(135deg,#7f1d1d,#0f172a)":"#0f172a",border:`2px solid ${selectedOpponent&&selectedCountry?"#EF4444":"#1e293b"}`,color:selectedOpponent&&selectedCountry?"#fca5a5":"#475569",padding:"18px",borderRadius:14,cursor:selectedOpponent&&selectedCountry?"pointer":"default",fontSize:18,fontFamily:"inherit",fontWeight:700}}>
            ⚔️ Send Duel!
          </button>
        </div>
      </div>
    )
  }

  if (phase === "reveal" || phase === "guessing" || phase === "result") {
    return (
      <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#EF4444",marginBottom:4}}>DUEL FROM {activeDuel.challenger.toUpperCase()}</div>
            <h2 style={{color:"#e2e8f0",margin:0,fontSize:24,fontWeight:700}}>⚔️ Identify This Country</h2>
          </div>

          <DuelMap highlightCode={revealed ? activeDuel.country_code : null}/>

          {!revealed && (
            <button onClick={handleReveal} style={{width:"100%",marginTop:16,background:"linear-gradient(135deg,#1e3a5f,#0f172a)",border:"2px solid #3B82F6",color:"#60a5fa",padding:"20px",borderRadius:14,cursor:"pointer",fontSize:20,fontFamily:"inherit",fontWeight:700}}>
              👁️ Reveal & Start Timer
            </button>
          )}

          {revealed && phase === "guessing" && (
            <div style={{marginTop:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"12px 20px",background:"#080f1e",borderRadius:10,border:"1px solid #1e293b"}}>
                <span style={{fontSize:13,color:"#475569"}}>Time remaining</span>
                <span style={{fontSize:36,fontWeight:900,color:timerColor,transition:"color 0.3s"}}>{timeLeft}s</span>
              </div>
              <input value={input} onChange={e=>handleInput(e.target.value)} placeholder="Which country is highlighted?" autoFocus
                style={{width:"100%",background:"#0f172a",border:"2px solid #1e293b",borderRadius:12,padding:"16px 20px",fontSize:18,color:"#e2e8f0",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
          )}

          {phase === "result" && (
            <div style={{marginTop:16,padding:24,background:success?"#0f2a1e":"#1a0f0f",border:`2px solid ${success?"#10B981":"#EF4444"}`,borderRadius:16,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:8}}>{success?"🎉":"💀"}</div>
              <div style={{fontSize:24,fontWeight:900,color:success?"#10B981":"#EF4444"}}>{success?"You survived!":"You failed!"}</div>
              <div style={{fontSize:16,color:"#94a3b8",marginTop:8}}>
                {success ? `Now pick a country to send back to ${activeDuel.challenger}!` : `The answer was ${activeDuel.country}`}
              </div>
              {success && (
                <div style={{marginTop:16}}>
                  <input value={counterSearch} onChange={e=>setCounterSearch(e.target.value)} placeholder="Pick your counter trap..." style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"12px 16px",fontSize:16,color:"#e2e8f0",outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:8}}/>
                  {filteredCounter.map(c=>(
                    <button key={c.name} onClick={()=>{setCounterCountry(c);setCounterSearch(c.name)}} style={{width:"100%",background:counterCountry?.name===c.name?"#1e3a5f":"#080f1e",border:`1px solid ${counterCountry?.name===c.name?"#3B82F6":"#1e293b"}`,borderRadius:8,padding:"10px 14px",cursor:"pointer",textAlign:"left",color:"#e2e8f0",fontSize:14,fontFamily:"inherit",display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span>{c.flag}</span><span>{c.name}</span>
                    </button>
                  ))}
                  {counterCountry && (
                    <button onClick={async()=>{await updateMode5('counter',{id:activeDuel.id,country:counterCountry.name,country_code:counterCountry.code});setView("home");setPhase(null)}} style={{width:"100%",marginTop:12,background:"linear-gradient(135deg,#7f1d1d,#0f172a)",border:"2px solid #EF4444",color:"#fca5a5",padding:"16px",borderRadius:12,cursor:"pointer",fontSize:16,fontFamily:"inherit",fontWeight:700}}>
                      ⚔️ Send Counter Trap!
                    </button>
                  )}
                </div>
              )}
              {!success && <button onClick={()=>{setView("home");setPhase(null)}} style={{marginTop:16,background:"#0f172a",border:"1px solid #1e293b",color:"#475569",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>Back to Duels</button>}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (phase === "challenger_reveal" || phase === "challenger_guessing" || phase === "challenger_result" || phase === "challenger_counter_pick") {
    return (
      <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#8B5CF6",marginBottom:4}}>{activeDuel.target.toUpperCase()} SENT THIS BACK</div>
            <h2 style={{color:"#e2e8f0",margin:0,fontSize:24,fontWeight:700}}>⚔️ Counter Trap!</h2>
          </div>

          <DuelMap highlightCode={revealed ? activeDuel.counter_code : null}/>

          {!revealed && (
            <button onClick={handleChallengerReveal} style={{width:"100%",marginTop:16,background:"linear-gradient(135deg,#2d1b5e,#0f172a)",border:"2px solid #8B5CF6",color:"#a78bfa",padding:"20px",borderRadius:14,cursor:"pointer",fontSize:20,fontFamily:"inherit",fontWeight:700}}>
              👁️ Reveal & Start Timer
            </button>
          )}

          {revealed && phase === "challenger_guessing" && (
            <div style={{marginTop:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"12px 20px",background:"#080f1e",borderRadius:10,border:"1px solid #1e293b"}}>
                <span style={{fontSize:13,color:"#475569"}}>Time remaining</span>
                <span style={{fontSize:36,fontWeight:900,color:timerColor}}>{timeLeft}s</span>
              </div>
              <input value={input} onChange={e=>handleChallengerInput(e.target.value)} placeholder="Which country is highlighted?" autoFocus
                style={{width:"100%",background:"#0f172a",border:"2px solid #1e293b",borderRadius:12,padding:"16px 20px",fontSize:18,color:"#e2e8f0",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
          )}

          {phase === "challenger_counter_pick" && (
            <div style={{marginTop:16,padding:24,background:"#0f2a1e",border:"2px solid #10B981",borderRadius:16,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:8}}>🎉</div>
              <div style={{fontSize:24,fontWeight:900,color:"#10B981"}}>You survived!</div>
              <div style={{fontSize:15,color:"#94a3b8",marginTop:8,marginBottom:16}}>Now send {activeDuel.target} another trap!</div>
              <input value={counterSearch} onChange={e=>setCounterSearch(e.target.value)} placeholder="Pick your next trap..." style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"12px 16px",fontSize:16,color:"#e2e8f0",outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:8}}/>
              {filteredCounter.map(c=>(
                <button key={c.name} onClick={()=>{setCounterCountry(c);setCounterSearch(c.name)}} style={{width:"100%",background:counterCountry?.name===c.name?"#1e3a5f":"#080f1e",border:`1px solid ${counterCountry?.name===c.name?"#3B82F6":"#1e293b"}`,borderRadius:8,padding:"10px 14px",cursor:"pointer",textAlign:"left",color:"#e2e8f0",fontSize:14,fontFamily:"inherit",display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span>{c.flag}</span><span>{c.name}</span>
                </button>
              ))}
              {counterCountry && <button onClick={sendCounter} style={{width:"100%",marginTop:12,background:"linear-gradient(135deg,#7f1d1d,#0f172a)",border:"2px solid #EF4444",color:"#fca5a5",padding:"16px",borderRadius:12,cursor:"pointer",fontSize:16,fontFamily:"inherit",fontWeight:700}}>⚔️ Send Trap!</button>}
            </div>
          )}

          {phase === "challenger_result" && (
            <div style={{marginTop:16,padding:24,background:"#1a0f0f",border:"2px solid #EF4444",borderRadius:16,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:8}}>💀</div>
              <div style={{fontSize:24,fontWeight:900,color:"#EF4444"}}>You failed!</div>
              <div style={{fontSize:16,color:"#94a3b8",marginTop:8}}>The answer was {activeDuel.counter_country}</div>
              <button onClick={()=>{setView("home");setPhase(null)}} style={{marginTop:16,background:"#0f172a",border:"1px solid #1e293b",color:"#475569",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>Back to Duels</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh",background:"#030711",fontFamily:"'Georgia',serif",padding:"24px 20px"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
          <button onClick={onBack} style={{background:"none",border:"1px solid #1e293b",color:"#475569",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
          <div>
            <div style={{fontSize:11,letterSpacing:4,color:"#EF4444",marginBottom:2}}>GAME MODE 5</div>
            <h2 style={{color:"#e2e8f0",margin:0,fontSize:24,fontWeight:700}}>⚔️ 1v1 Duel</h2>
          </div>
          <button onClick={()=>setView("challenge")} style={{marginLeft:"auto",background:"linear-gradient(135deg,#7f1d1d,#0f172a)",border:"2px solid #EF4444",color:"#fca5a5",padding:"12px 20px",borderRadius:12,cursor:"pointer",fontSize:14,fontFamily:"inherit",fontWeight:700}}>
            + New Duel
          </button>
        </div>

        {pendingForMe.length > 0 && (
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#EF4444",marginBottom:12}}>⚠️ YOUR TURN — INCOMING DUELS</div>
            {pendingForMe.map(d=>(
              <div key={d.id} style={{background:"#1a0f0f",border:"2px solid #EF4444",borderRadius:14,padding:20,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:13,color:"#EF4444",marginBottom:4}}>From <strong style={{color:"#e2e8f0"}}>{d.challenger}</strong></div>
                  <div style={{fontSize:12,color:"#475569"}}>They picked a mystery country for you 😈</div>
                </div>
                <button onClick={()=>startReveal(d)} style={{background:"#EF4444",border:"none",color:"#fff",padding:"12px 20px",borderRadius:10,cursor:"pointer",fontSize:14,fontFamily:"inherit",fontWeight:700}}>
                  Reveal ⚡
                </button>
              </div>
            ))}
          </div>
        )}

        {pendingCounter.length > 0 && (
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#8B5CF6",marginBottom:12}}>⚔️ COUNTER TRAP WAITING FOR YOU</div>
            {pendingCounter.map(d=>(
              <div key={d.id} style={{background:"#120a1a",border:"2px solid #8B5CF6",borderRadius:14,padding:20,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:13,color:"#8B5CF6",marginBottom:4}}><strong style={{color:"#e2e8f0"}}>{d.target}</strong> sent a counter!</div>
                  <div style={{fontSize:12,color:"#475569"}}>They survived and trapped you back 😤</div>
                </div>
                <button onClick={()=>startChallengerReveal(d)} style={{background:"#8B5CF6",border:"none",color:"#fff",padding:"12px 20px",borderRadius:10,cursor:"pointer",fontSize:14,fontFamily:"inherit",fontWeight:700}}>
                  Reveal ⚡
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,letterSpacing:3,color:"#475569",marginBottom:12}}>DUEL HISTORY</div>
          {myDuels.length === 0 && <div style={{color:"#475569",fontSize:14,textAlign:"center",padding:40}}>No duels yet. Challenge someone! ⚔️</div>}
          {myDuels.filter(d=>!['pending','pending_challenger'].includes(d.status)).map(d=>(
            <div key={d.id} style={{background:"#080f1e",border:"1px solid #1e293b",borderRadius:12,padding:"14px 18px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:"#e2e8f0"}}><span style={{color:"#EF4444"}}>{d.challenger}</span> vs <span style={{color:"#8B5CF6"}}>{d.target}</span></div>
                <div style={{fontSize:12,color:"#475569",marginTop:2}}>{d.country}{d.counter_country?` ↔ ${d.counter_country}`:""}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:d.status==="target_lost"?"#10B981":d.status==="challenger_lost"?"#EF4444":"#475569"}}>
                {d.status==="target_lost"?`${d.challenger} wins!`:d.status==="challenger_lost"?`${d.target} wins!`:"Ongoing"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
