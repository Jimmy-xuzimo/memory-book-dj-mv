import {HandLabel} from './Handwriting';
import {Actor,Pair} from './Rig';
import {Wash,Stars,Corridor,Book,pen,Cloud} from './Paint';
import {GoldenFireworks} from './GoldenFireworks';
import {range,lerp,hash,wave} from '../motion';

export {BundNight as NightCity} from './Bund';

export function SunMeeting({f}:{f:number}){
 const light=range(f,213,291),a=range(f,210,252),b=range(f,247,280);
 return <>
  <Corridor f={f} warm={false}/>
  <rect width="1920" height="1080" fill="#52657a" opacity={.28*(1-light)}/>
  <defs><linearGradient id="v8-sun-ray" x1=".15" y1=".2" x2=".85" y2="1"><stop stopColor="#fff4c3" stopOpacity=".9"/><stop offset="1" stopColor="#ffdfa0" stopOpacity="0"/></linearGradient></defs>
  <g opacity={light}>
   <path d={`M238 235L383 209L${1050+light*590} 1080H${420+light*300}Z`} fill="url(#v8-sun-ray)"/>
   <path d={`M271 315L340 306L${1000+light*360} 1080H${700+light*140}Z`} fill="#fff2b4" opacity=".19"/>
   <ellipse cx={920+light*200} cy="965" rx={130+light*260} ry="42" fill="#fff1bf" opacity=".26"/>
   {Array.from({length:16},(_,i)=><circle key={i} cx={330+hash(i+2)*850+wave(f,190,i)*8} cy={300+hash(i+38)*650-f%60*.12} r={1.3+hash(i+9)*2} fill="#fff7d9" opacity={.2+hash(i)*.5}/>)}
  </g>
  <Actor x={590} y={968} scale={1.03} f={f} emotion={f>260?'happy':'soft'} tilt={-4+4*a} look={1} lean={-2+2*a}/>
  <Actor girl x={1300-90*a} y={960} scale={1.04} f={f} emotion="happy" tilt={-6} lean={-7+4*b} pose="idle"/>
  <path d="M1703 0L1750 1080H1860V0Z" fill="#8e7568" stroke="#796457" strokeWidth="5"/>
  <path d="M1716 0L1765 1080" stroke="#d6bda4" strokeWidth="14"/>
 </>;
}

function FireworkField({f}:{f:number}){return <>
 <Wash kind="night"/><Stars f={f} n={15}/>
 <path d="M0 787H1920V1080H0Z" fill="#4a607e"/>
 <g stroke="#c1bac9" strokeWidth="2" opacity=".22">{[815,855,902].map(y=><path key={y} d={`M0 ${y}H1920`}/>)}</g>
 <GoldenFireworks f={f}/>
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
 const gray=range(f,1421,1453),breaking=range(f,1452,1486);
 const appearance=range(f,1409,1419),redToGray=range(f,1421,1451);
 const heartColor=`rgb(${Math.round(217-65*redToGray)},${Math.round(88+64*redToGray)},${Math.round(113+43*redToGray)})`;
 return <>
  <Wash kind="pink"/><rect width="1920" height="1080" fill="#a8b0bd" opacity={gray*.54}/>
  <path d="M0 927Q960 842 1920 927V1080H0Z" fill="#d8c9be"/>
  <defs><filter id="v8-drain"><feColorMatrix type="saturate" values={String(1-gray)}/></filter>
   <clipPath id="v8-heart-left"><path d="M-70 -80H0L-12 -19L5 -2L-11 19L0 40H-70Z"/></clipPath>
   <clipPath id="v8-heart-right"><path d="M0 -80H70V40H0L-11 19L5 -2L-12 -19Z"/></clipPath>
  </defs>
  {/* Received hearts stay behind her entire silhouette, filling her side of the world. */}
  {Array.from({length:44},(_,i)=>{
   const start=1332+i*1.88,q=range(f,start,start+29),visible=f>=start;
   const r=Math.sqrt((i+.5)/44),angle=i*2.399963+(hash(i+86)-.5)*.45;
   const tx=1452+Math.cos(angle)*r*390+(hash(i+31)-.5)*38,ty=607+Math.sin(angle)*r*319+(hash(i+48)-.5)*38;
   const xx=lerp(778,tx,q),yy=lerp(754,ty,q)-Math.sin(q*Math.PI)*87;
   return visible&&<g key={i} transform={`translate(${xx} ${yy}) rotate(${(hash(i+10)-.5)*58*q}) scale(${.40+hash(i+3)*.82})`} opacity={.43+.52*hash(i)}><path d={heart} fill={['#d95776','#e7758d','#b94767','#ebb2bf','#db8c9f'][i%5]} stroke="#b8506a" strokeWidth="2.5"/></g>;
  })}
  <g filter="url(#v8-drain)"><Actor x={570} y={1030} scale={1.12} f={f} emotion={gray>.3?'sad':'soft'} pose="offer" tilt={3+gray*5} hands={{right:[180,-250]}}/></g>
  <Actor girl x={1356} y={1030} scale={1.10} f={f} emotion="soft" tilt={-4} pose="offer" hands={{left:[-155,-230]}}/>
  {appearance>0&&<g transform={`translate(558 753) scale(${1.6*appearance})`} opacity={appearance}>
   {[-1,1].map((side,i)=><g key={side} clipPath={`url(#v8-heart-${i===0?'left':'right'})`} transform={`translate(${side*breaking*28} ${breaking*25}) rotate(${side*breaking*18})`} opacity={1-breaking*.45}><path d={heart} fill={heartColor} stroke="#756e7b" strokeWidth="2"/></g>)}
   <path d="M0 -51L-12 -19L5 -2L-11 19L0 22" fill="none" stroke="#625c6e" strokeWidth="2.7" opacity={breaking}/>
  </g>}
  {Array.from({length:9},(_,i)=>{const q=range(f,1461+i*2,1489);return <path key={i} d="M-5 -9L9 -2L3 13L-8 5Z" transform={`translate(${560+(hash(i)-.5)*q*200} ${790+q*q*220}) rotate(${q*90*(i%2?1:-1)})`} fill="#9c99a5" opacity={q>0?1-q*.5:0}/>})}
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
  <Actor x={boy} y={979} scale={.84} f={f} view="side" direction={-1} walk gait="plaza" distance={(838-boy)/.84} emotion="sad" tilt={4}/>
  <Actor girl x={girl} y={979} scale={.84} f={f} view="side" direction={1} walk gait="plaza" distance={(girl-1085)/.84} emotion="soft" tilt={-4}/>
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
    <HandLabel text="给你" x={-215} y={-85} size={39} color="#9e707b"/>
    <path d="M-211 -10H189M-211 25H147M-211 60H193M-211 95H111" fill="none" stroke="#bea098" strokeWidth="3"/>
    <path d={heart} transform="translate(198 112) scale(.48)" fill="#d2939e" stroke="#ba8792" strokeWidth="2"/>
   </g>
   <path d="M-330 -110L0 94L330 -110V213H-330Z" fill="#e8c9a5"/>
   <path d="M-330 213L-29 20Q0 2 29 20L330 213" fill="#edd5b6"/>
   <path d="M-330 -110L0 94L330 -110" fill="none" stroke="#b39980"/>
   <g transform={`translate(${215-25*hand} ${-122-lift}) rotate(-13)`}>
    <path d="M29 -35L850 -215L900 -150L56 49Z" fill="url(#cloth-boy-v8)" stroke="#34303a" strokeWidth="4"/>
    <path d="M45 -34Q22 -53 6 -37L-25 -10Q-37 7 -20 17L4 6Q-19 28 -4 38Q12 46 34 18L51 7Z" fill="#ffe3ca" stroke="#34303a" strokeWidth="4"/>
   </g>
  </g>
 </>;
}
