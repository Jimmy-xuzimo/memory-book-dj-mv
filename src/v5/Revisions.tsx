import {Actor,Pair} from './Rig';
import {Wash,Stars,Corridor,Firework,Book,pen,Cloud} from './Paint';
import {range,lerp,hash,wave,clamp,ease} from '../motion';

export function NightCity({f,shot}:{f:number;shot:number}){
 const travel=range(f,0,95),move=lerp(816,960,travel);
 return <>
  <Wash kind="night"/><rect width="1920" height="1080" fill="#17283d" opacity=".35"/>
  <circle cx="1460" cy="152" r="48" fill="#e5dec1" opacity=".7"/>
  {[0,1,2].map(layer=>{const count=[29,21,15][layer],width=[79,113,158][layer];return <g key={layer} transform={`translate(${-range(f,0,204)*(layer+1)*24} 0)`} stroke={['#61728b','#526881','#33475e'][layer]} strokeWidth={layer+1}>
   {Array.from({length:count},(_,i)=>{const h=([240,360,340][layer]+hash(i+layer*33)*[260,290,340][layer]),x=i*width-135+(layer===1?40:0),y=925-h,face=['#3d506d','#344761','#26394f'][layer];return <g key={i}>
    <path d={`M${x+7} 929L${x} ${y+10}L${x+width*.65} ${y}L${x+width*.89} ${y+17}L${x+width*.92} 929Z`} fill={face}/>
    <path d={`M${x+width*.65} ${y}L${x+width*.89} ${y+17}L${x+width*.92} 929L${x+width*.68} 928Z`} fill={['#33445f','#2b3c53','#1c2d43'][layer]}/>
    {Array.from({length:Math.floor(h/42)-1},(_,r)=><g key={r}>{[0,1,2].map(c=>{const lit=hash(i*97+r*11+c*7+layer*15)>.5;return <path key={c} d={`M${x+12+c*width*.17} ${y+38+r*41}l${width*.10} -1v${layer===2?20:14}l-${width*.1} 1Z`} stroke="none" fill={lit?(hash(i+r+c)>.4?'#e5ca91':'#8ca8c1'):'#435871'} opacity={lit?.65:.25}/>})}</g>)}
    {i%4===0&&<path d={`M${x+width*.4} ${y+4}V${y-38}`} strokeWidth="2"/>}
   </g>})}
  </g>})}
  <path d="M0 927L1920 911V1080H0Z" fill="#293849"/>
  <path d="M0 933L1920 917" stroke="#7a8692" strokeWidth="3"/>
  <ellipse cx="960" cy="991" rx="128" ry="15" fill="#d5c19b" opacity=".10"/>
  {shot===0?<Actor x={move} y={992} scale={.38} f={f} view="back" walk={f<95} distance={(move-816)/.38} direction={1} tilt={-2}/>:<>
   <Actor x={960} y={992} scale={.4} f={f} view="side" direction={1} emotion="sad" tilt={7} lean={5}/>
   <g opacity={.35*range(f,110,142)}>{Array.from({length:40},(_,i)=><path key={i} d={`M${hash(i)*1920} ${(i*77+f*6)%1090-30}l-9 32`} stroke="#a7b9c8" strokeWidth="2"/>)}</g>
   <path d="M1170 415h51v83h-51Z" fill="#f1d49b" opacity={.2+.7*range(f,151,199)}/>
  </>}
 </>;
}

export function SunMeeting({f}:{f:number}){
 const light=range(f,213,291),a=range(f,210,252),b=range(f,247,280);
 return <>
  <Corridor f={f} warm={false}/>
  <rect width="1920" height="1080" fill="#52657a" opacity={.28*(1-light)}/>
  <defs><linearGradient id="v5-sun-ray" x1=".15" y1=".2" x2=".85" y2="1"><stop stopColor="#fff4c3" stopOpacity=".9"/><stop offset="1" stopColor="#ffdfa0" stopOpacity="0"/></linearGradient></defs>
  <g opacity={light}>
   <path d={`M238 235L383 209L${1050+light*590} 1080H${420+light*300}Z`} fill="url(#v5-sun-ray)"/>
   <path d={`M271 315L340 306L${1000+light*360} 1080H${700+light*140}Z`} fill="#fff2b4" opacity=".19"/>
   <ellipse cx={920+light*200} cy="965" rx={130+light*260} ry="42" fill="#fff1bf" opacity=".26"/>
   {Array.from({length:16},(_,i)=><circle key={i} cx={330+hash(i+2)*850+wave(f,190,i)*8} cy={300+hash(i+38)*650-f%60*.12} r={1.3+hash(i+9)*2} fill="#fff7d9" opacity={.2+hash(i)*.5}/>)}
  </g>
  <Actor x={590} y={968} scale={1.03} f={f} emotion={f>260?'happy':'soft'} tilt={-4+4*a} look={1} lean={-2+2*a}/>
  <Actor girl x={1300-90*a} y={960} scale={1.04} f={f} emotion="happy" tilt={-6} lean={-7+4*b} pose="reach" arm={-38-13*b}/>
  <path d="M1703 0L1750 1080H1860V0Z" fill="#8e7568" stroke="#796457" strokeWidth="5"/>
  <path d="M1716 0L1765 1080" stroke="#d6bda4" strokeWidth="14"/>
 </>;
}

const blooms=[
 {x:405,y:333,start:850,size:190,c:'#9ecbd9'},
 {x:1268,y:260,start:856,size:265,c:'#e9bdc9'},
 {x:778,y:201,start:867,size:232,c:'#e8ce9d'},
 {x:1614,y:392,start:879,size:218,c:'#bdc6e2'},
 {x:206,y:496,start:890,size:149,c:'#edd5a0'},
 {x:1047,y:398,start:899,size:284,c:'#e6b1c2'},
 {x:622,y:422,start:909,size:223,c:'#a9cdd5'},
 {x:1464,y:155,start:916,size:175,c:'#f0d4a7'},
 {x:963,y:205,start:924,size:240,c:'#eed3b5'},
];
function FireworkField({f}:{f:number}){return <>
 <Wash kind="night"/><Stars f={f} n={26}/>
 <path d="M0 787H1920V1080H0Z" fill="#4a607e"/>
 <g stroke="#c1bac9" strokeWidth="2" opacity=".22">{[815,855,902].map(y=><path key={y} d={`M0 ${y}H1920`}/>)}</g>
 {blooms.map((b,i)=><Firework key={i} x={b.x} y={b.y} start={b.start} size={b.size} color={b.c} f={f}/>)}
 <path d="M0 985Q430 880 1040 944T1920 968V1080H0Z" fill="#656474"/>
 <Pair x={913} y={1004} s={.62} f={f} hold back/>
 </>}
export function MoreFireworks({f}:{f:number}){return <FireworkField f={f}/>}
export function FrozenFireworks({f}:{f:number}){
 const q=range(f,949,1049),z=lerp(1,1.62,q);
 return <g transform={`translate(980 372) scale(${z}) translate(-980 -372)`}><FireworkField f={949}/></g>;
}

const heart='M0 22C-18 9 -43 -8 -43 -29C-43 -59 -7 -65 0 -39C9 -65 43 -59 43 -29C43 -8 18 9 0 22Z';
export function GivingHearts({f}:{f:number}){
 const gray=range(f,1397,1467),breaking=range(f,1420,1485),t=f-1331;
 return <>
  <Wash kind="pink"/><rect width="1920" height="1080" fill="#a8b0bd" opacity={gray*.54}/>
  <path d="M0 927Q960 842 1920 927V1080H0Z" fill="#d8c9be"/>
  <defs><filter id="v5-drain"><feColorMatrix type="saturate" values={String(1-gray)}/></filter>
   <clipPath id="v5-heart-left"><path d="M-70 -80H0L-12 -19L5 -2L-11 19L0 40H-70Z"/></clipPath>
   <clipPath id="v5-heart-right"><path d="M0 -80H70V40H0L-11 19L5 -2L-12 -19Z"/></clipPath>
  </defs>
  <g filter="url(#v5-drain)"><Actor x={570} y={1030} scale={1.12} f={f} emotion={gray>.3?'sad':'soft'} pose="offer" tilt={3+gray*5} hands={{right:[180,-250],left:[-50,-180]}}/></g>
  <Actor girl x={1356} y={1030} scale={1.10} f={f} emotion="soft" tilt={-4} pose="offer" hands={{left:[-155,-230],right:[45,-180]}}/>
  {[0,1,2,3,4].map(i=>{const a=clamp((t-i*20)/32),q=ease(a),x=lerp(776,1195,q),y=lerp(750,768,q)-Math.sin(q*Math.PI)*105,visible=t>=i*20;return visible&&<g key={i} transform={`translate(${a>=1?1480+(i%3)*55:x} ${a>=1?742-Math.floor(i/3)*64:y}) scale(${a>=1?.68:.83})`}><path d={heart} fill="#d85c73" stroke="#ab465e" strokeWidth="3"/></g>})}
  <g transform="translate(558 753) scale(1.6)">
   <path d={heart} fill={gray>.1?'#a0a0aa':'#d66d81'} opacity={1-breaking} stroke="#75717c" strokeWidth="2"/>
   {[-1,1].map((side,i)=><g key={side} clipPath={`url(#v5-heart-${i===0?'left':'right'})`} transform={`translate(${side*breaking*17} ${breaking*9}) rotate(${side*breaking*13})`}><path d={heart} fill={gray>.3?'#a4a2ab':'#cf8c9a'} stroke="#746d7c" strokeWidth="2"/></g>)}
   <path d="M0 -51L-12 -19L5 -2L-11 19L0 22" fill="none" stroke="#625c6e" strokeWidth="2.7" opacity={breaking}/>
  </g>
  {Array.from({length:7},(_,i)=>{const q=range(f,1444+i*3,1489);return <path key={i} d="M-5 -9L9 -2L3 13L-8 5Z" transform={`translate(${560+(hash(i)-.5)*q*200} ${790+q*q*220}) rotate(${q*90*(i%2?1:-1)})`} fill="#9c99a5" opacity={q>0?1-q*.5:0}/>})}
 </>;
}

// An uncluttered plaza: crowd trajectories are fast; the two leads drift apart slowly.
export function CrowdPlaza({f}:{f:number}){
 const q=range(f,1851,1949),boy=lerp(838,514,q),girl=lerp(1085,1440,q);
 return <>
  <Wash kind="day"/><rect width="1920" height="1080" fill="#efdec5" opacity=".3"/>
  <g opacity=".55" fill="#bfc7c7" stroke="#a6b1ba" strokeWidth="2">
   <path d="M0 471V310H184V457H315V338H532V468H1380V329H1644V452H1770V284H1920V520H0Z"/>
  </g>
  <path d="M0 510Q960 469 1920 510V1080H0Z" fill="#d9cfc1"/>
  <g stroke="#b6b1ab" strokeWidth="2" opacity=".45">{[605,742,920].map(y=><path key={y} d={`M0 ${y}H1920`}/>)}{[-1300,-450,250,780,1290,1930,2700,3450].map(x=><path key={x} d={`M960 498L${x} 1080`}/>)}</g>
  <Cloud x={440} y={212} s={1.1} f={f}/><Cloud x={1570} y={118} s={.8} f={f}/>
  {Array.from({length:12},(_,i)=>{const speed=(i%2?1:-1)*(20+i%3*7),x=((f-1851)*speed+i*267+6000)%3000-550,scale=.42+(i%3)*.08,y=636+(i%3)*55;return <CrowdPerson key={i} x={x} y={y} scale={scale} f={f+i*14} color={['#929cae','#b49fa8','#a0aca4'][i%3]}/>})}
  <Actor x={boy} y={979} scale={.84} f={f} view="side" direction={-1} walk distance={(838-boy)/.84} emotion="sad" tilt={4}/>
  <Actor girl x={girl} y={979} scale={.84} f={f} view="side" direction={1} walk distance={(girl-1085)/.84} emotion="soft" tilt={-4}/>
  {Array.from({length:7},(_,i)=>{const speed=(i%2?1:-1)*(35+i%3*6),x=((f-1851)*speed+i*450+12000)%3600-850;return <CrowdPerson key={i} x={x} y={1140+(i%2)*100} scale={.92+(i%3)*.15} f={f+i*19} color={['#8c8d9e','#afa0aa','#9ca7b0'][i%3]} opacity={.72}/>})}
 </>;
}
function CrowdPerson({x,y,scale,f,color,opacity=1}:{x:number;y:number;scale:number;f:number;color:string;opacity?:number}){const stride=wave(f,16)*20;return <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color} stroke={color} opacity={opacity} strokeLinecap="round">
 <ellipse cy="-353" rx="53" ry="62"/><path d="M-38 -286Q-71 -203 -58 -110H58Q71 -201 37 -285Z"/>
 <path d={`M-25 -123L${-29+stride} -3M25 -123L${30-stride} -3`} fill="none" strokeWidth="35"/>
 <path d={`M-43 -260L${-65-stride} -140M43 -260L${65+stride} -142`} fill="none" strokeWidth="24"/>
 </g>}

export function LetterOut({f}:{f:number}){
 const q=range(f,2148,2221),lift=q*405,hand=range(f,2141,2157);
 // Letter is behind the pocket. The visible top edge never travels through a front panel.
 return <>
  <Book/>
  <g transform="translate(1090 710) rotate(-5)" {...pen} stroke="#a18a78" strokeWidth="3">
   <path d="M-330 -110L0 -330L330 -110V213H-330Z" fill="#dcbf9e"/>
   <path d="M-330 -110L0 -310L330 -110" fill="#edd2ae"/>
   <g transform={`translate(0 ${-lift})`}>
    <path d="M-280 -142L278 -142L280 183H-280Z" fill="#fff8e7"/>
    <path d="M-247 -111H243V150H-247Z" fill="none" stroke="#e8d9c0" strokeWidth="2"/>
    <text x="-215" y="-55" fontFamily="STKaiti,KaiTi,serif" fontSize="32" fill="#9e707b">给你</text>
    <path d="M-211 -10H189M-211 25H147M-211 60H193M-211 95H111" fill="none" stroke="#bea098" strokeWidth="3"/>
    <path d={heart} transform="translate(198 112) scale(.48)" fill="#d2939e" stroke="#ba8792" strokeWidth="2"/>
   </g>
   <path d="M-330 -110L0 94L330 -110V213H-330Z" fill="#e8c9a5"/>
   <path d="M-330 213L-29 20Q0 2 29 20L330 213" fill="#edd5b6"/>
   <path d="M-330 -110L0 94L330 -110" fill="none" stroke="#b39980"/>
   <g transform={`translate(${215-25*hand} ${-122-lift}) rotate(-13)`}>
    <path d="M29 -35L850 -215L900 -150L56 49Z" fill="url(#cloth-boy-v5)" stroke="#34303a" strokeWidth="4"/>
    <path d="M45 -34Q22 -53 6 -37L-25 -10Q-37 7 -20 17L4 6Q-19 28 -4 38Q12 46 34 18L51 7Z" fill="#ffe3ca" stroke="#34303a" strokeWidth="4"/>
   </g>
  </g>
 </>;
}
