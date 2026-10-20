import {NightCity as Opening,SunMeeting as Meeting,MoreFireworks as Fireworks,FrozenFireworks,GivingHearts as Lantern,CrowdPlaza as DreamWake,LetterOut as Envelope} from './Revisions';
import {SweetMontage as Tram,FilmRoll} from './Memories';
import {Actor,Pair} from './Rig';
import {Wash,Sky,Cloud,Tree,Petals,Sea,House,School,WindowRoom,Bench,Boat,PaperBird,Photo,Book,Firework,Stars,pen} from './Paint';
import {range,wave,hash,ease,lerp,pulse,clamp} from '../motion';

type S={shot:number;f:number;p:number};
export const groupOf=[0,0,1,2,2,3,3,4,4,5,5,6,7,7,8,8,9,9,10,10,11,11,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,20];
export const starts=[0,204,302,408,506,686,774,858,949,1144,1233,1331,1488,1563,1659,1756,1851,1949,2039,2141,2238];

function Ocean({f,shot}:S){const travel=range(f,302,408);return <>
 <Sky f={f}/><Sea f={f} from={560}/>
 <g transform={`translate(${-40*travel} 0)`}><Cloud x={400} y={250} s={1.6} f={f}/><Cloud x={1450} y={140} s={.8} f={-f}/></g>
 {shot===3?<>
  <Actor x={620} y={1360} scale={1.72} f={f} emotion="wonder" tilt={-3} look={1}/>
  <Actor girl x={1300} y={1320} scale={1.56} f={f} emotion="happy" tilt={4}/>
  <path d="M475 580q18 -11 28 0m172 0q16 -9 26 0" stroke="#a8d2d6" strokeWidth="3" fill="none" opacity=".7"/>
  <path d="M1930 1080Q1310 830 410 1080" stroke="#fbf3df" strokeWidth="65" fill="none"/>
 </>:<>
  <Boat y={870} s={1.48} f={f}/>
  <Actor x={752} y={892} scale={.71} f={f} emotion="soft" pose="sit" tilt={-2}/>
  <Actor girl x={1139} y={882} scale={.72} f={f} emotion="happy" pose="point" lean={-2}/>
  <path d="M373 900L553 1042H1351L1545 900L960 1003Z" fill="#f9eed7" stroke="#8f8781" strokeWidth="3"/>
 </>}
 </>}

function Rain({f,shot}:S){const open=range(f,602,678);return <>
 <Wash kind="day"/>
 <g opacity={1-open*.72} stroke="#8b9eae" strokeWidth="4"><path d="M120 107H1790V736H120Z" fill="#b4c6d0"/><path d="M520 107V736M940 107V736M1360 107V736M120 445H1790" stroke="#e6e3d5" strokeWidth="15"/>
 {Array.from({length:38},(_,i)=><path key={i} d={`M${151+hash(i+1)*1600} ${120+(f*3+i*51)%580}l-10 36`} stroke="#dae3de" strokeWidth="2"/>)}</g>
 <path d="M0 782H1920V1080H0Z" fill="#d4c7b4"/>
 <Bench y={872} w={935}/>
 {shot===7?<>
  <Actor x={733} y={1040} scale={.94} f={f} pose="sit" emotion="sad" tilt={7} lean={6}/>
  <Actor girl x={1222-137*range(f,520,568)} y={1040} scale={.94} f={f} pose="sit" emotion="soft" tilt={-9*range(f,530,581)} lean={-5*range(f,530,581)}/>
  <Cloud x={945} y={245} s={1.5} dark f={f}/>
 </>:<>
  <path d="M0 0H1920V615Q1420 490 960 535Q420 490 0 615Z" fill="#f9df9d" opacity={open*.8}/>
  <Actor x={680} y={984} scale={1.03} f={f} pose="lift" emotion={open>.6?'happy':'soft'} tilt={-3}/>
  <Actor girl x={1250} y={984} scale={1.03} f={f} pose="lift" emotion="happy" tilt={4}/>
  <g transform={`translate(${-open*570} ${-open*80})`}><Cloud x={600} y={366} s={2.17} dark f={f}/></g>
  <g transform={`translate(${open*570} ${-open*80})`}><Cloud x={1310} y={357} s={2.2} dark f={f}/></g>
 </>}
 </>}

function Jar({f,shot}:S){const fall=range(f,688,718),release=range(f,735,770);return <>
 <WindowRoom f={f} girl/>
 <Actor x={620} y={1210} scale={1.25} f={f} emotion="happy" pose={shot===9?'offer':'reach'} hands={shot===9?{right:[270,-390],left:[-90,-190]}:undefined} tilt={-3}/>
 <Actor girl x={1155} y={1210} scale={1.25} f={f} emotion="happy" pose="offer" hands={{left:[-145,-245],right:[-65,-245]}} tilt={4}/>
 <g transform="translate(973 827)" {...pen}><path d="M-83 -105L-69 -67L-79 91Q0 119 79 91L69 -67L83 -105Z" fill="#d5ece5" fillOpacity=".45" stroke="#7a9ca6" strokeWidth="4"/><ellipse cy="-105" rx="83" ry="15" fill="#f5f5df" fillOpacity=".6" stroke="#8ca2a4"/><path d="M-53 -49L-56 64" stroke="#fff8dc" strokeWidth="11" opacity=".7"/>
  {[0,1,2].map(i=><path key={i} d="M0 -18L5 -6L18 -5L9 4L11 17L0 10L-12 17L-10 3L-18 -5L-5 -7Z" transform={`translate(${-38+i*38} ${54-(i%2)*26-wave(f,86,i)*4})`} fill="#f7d792" stroke="#c6a66f" strokeWidth="1"/>)}</g>
 {shot===9?<path d="M0 -22L6 -7L22 -6L11 4L14 20L0 12L-14 20L-11 4L-22 -6L-6 -7Z" transform={`translate(963 ${590+fall*270}) rotate(${fall*90})`} fill="#f6d692" stroke="#a58c68" strokeWidth="2"/>:<>
  {[0,1,2].map(i=><PaperBird key={i} x={1050+release*(430+i*100)} y={710-release*(290+i*90)} s={.42+i*.08} f={f+i*3}/>)}
 </>}
 </>}

function Whisper({f}:S){return <>
 <Sky f={f} night/><Sea f={f} night from={775}/>
 <Actor x={749} y={1080} scale={1.23} f={f} emotion="shy" tilt={6} lean={3}/>
 <Actor girl x={1230-58*range(f,775,815)} y={1080} scale={1.22} f={f} emotion="happy" tilt={-9} lean={-5} pose="chest"/>
 {[0,1,2,3,4].map(i=>{const a=(f-775)*.017+i*1.18;return <g key={i} transform={`translate(${925+Math.cos(a)*327} ${326+Math.sin(a)*133}) rotate(${i*20})`}><path d="M0 -11L4 -3L12 -2L6 5L7 13L0 8L-8 13L-6 4L-12 -3L-4 -3Z" fill={i%2?'#f4d293':'#e5b6c3'}/></g>})}
 </>}

export function MemoryPicture({f,variant=0}:{f:number;variant?:number}){return <>
 <rect width="620" height="430" fill={variant%3===1?'#657596':'#c3dcda'}/>
 <circle cx="495" cy="88" r="43" fill="#efd5a0"/>
 {variant%3===1?<><Firework x={176} y={104} f={f%35+14} size={105}/><Firework x={450} y={85} f={f%35+14} size={88}/></>:<><Cloud x={130} y={94} s={.55} f={f}/><path d="M0 330Q140 250 310 318T620 297V430H0Z" fill="#b2c5a5"/><Tree x={558} y={399} s={.4} f={f} pink/></>}
 {variant%3===2?<><Actor x={235} y={439} scale={.53} f={f} view="side" direction={1} pose="hug" hands={{right:[225,-270],left:[30,-230]}} tilt={3}/><Actor girl x={385} y={439} scale={.53} f={f} view="side" direction={-1} pose="hug" hands={{left:[-220,-255],right:[-20,-220]}} tilt={-3}/></>:<Pair x={302} y={439} s={.53} gap={400} f={f} hold emotion="happy"/>}
 </>}

function Orbit({f,shot}:S){if(shot===14)return <FrozenFireworks f={f}/>;const drift=range(f,1050,1144);return <>
 <Wash kind={shot===14?'pink':'night'}/>{shot===15&&<Stars f={f}/>}
 {shot===14?<>
  <Photo x={960} y={550} s={1.46} r={-4+range(f,950,1045)*3}><MemoryPicture f={f} variant={1}/></Photo>
  <Firework x={1630} y={230} f={f} start={964} size={190}/><Petals f={f} n={9}/>
 </>:<>
  {[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3+drift*.45,x=960+Math.cos(a)*660,y=525+Math.sin(a)*330;return <Photo key={i} x={x} y={y} s={.42+(i%2)*.12+(i===1?pulse(f)*.012:0)} r={i*13-30+drift*4}><MemoryPicture f={100+i*15} variant={i}/></Photo>})}
  <Actor x={963} y={1010} scale={1.04} f={f} emotion="sad" pose="reach" tilt={-4+drift*5} arm={-86+drift*20}/>
 </>}
 </>}

function Globe({f,opposite=false}:S&{opposite?:boolean}){const t=f-(opposite?2039:1144),theta=-t*.0052,spin=-t*(opposite?.06:.13),r=opposite?250:257,cx=960,cy=opposite?640:566;return <>
 <Wash kind="night"/><Stars f={f} n={55}/>
 <defs><clipPath id="v5-globe-disc"><circle cx={cx} cy={cy} r={r}/></clipPath><linearGradient id="v5-terminator"><stop offset="0" stopColor="#263654" stopOpacity=".75"/><stop offset=".48" stopColor="#263654" stopOpacity=".48"/><stop offset=".53" stopColor="#fff0bc" stopOpacity=".13"/><stop offset="1" stopColor="#fff0bc" stopOpacity=".36"/></linearGradient></defs>
 <circle cx={cx} cy={cy} r={r+11} fill="#a6c7d3" opacity=".14"/>
 <circle cx={cx} cy={cy} r={r} fill="#94bcc8" stroke="#d5d9cc" strokeWidth="4"/>
 <g clipPath="url(#v5-globe-disc)">
 <g transform={`translate(0 ${opposite?74:0}) rotate(${spin} ${cx} 566)`} stroke="#b3cbb3" strokeWidth="2" fill="#bbcdac">
 <path d="M873 305L928 327L944 374L912 392L931 424L905 456L866 452L852 493L816 497L792 457L817 412L793 374L824 341Z"/>
 <path d="M1081 338L1130 368L1138 411L1188 423L1205 470L1167 493L1179 533L1125 560L1108 598L1064 607L1047 651L1014 672L979 635L988 594L960 567L983 532L961 505L989 468L1031 453L1021 413L1061 389Z"/>
 <path d="M776 573L816 547L856 567L893 559L918 588L899 626L862 631L842 678L798 694L769 651Z"/>
 <path d="M920 756L949 718L984 739L1004 780L970 810L934 794Z"/>
 <path d="M965 367L990 351L1006 376L991 393Z"/>
 </g>
 <g transform={`rotate(${spin} ${cx} ${cy})`} stroke="#f5f2d5" strokeWidth="1.3" fill="none" opacity=".4">
 {[75,151,215].map(v=><circle key={v} cx={cx} cy={cy} r={v}/>)}
 {[0,30,60,90,120,150].map(a=><path key={a} d={`M${cx-r} ${cy}H${cx+r}`} transform={`rotate(${a} ${cx} ${cy})`}/>)}
 </g>
 <rect x={cx-r} y={cy-r} width={r*2} height={r*2} fill="url(#v5-terminator)"/>
 </g>
 <circle cx="1640" cy="268" r="73" fill="#f3d798"/>
 <g stroke="#f0d299" strokeWidth="3" opacity=".7">{Array.from({length:12},(_,i)=><path key={i} d="M0 -92V-114" transform={`translate(1640 268) rotate(${i*30})`}/>)}</g>
 <path d="M368 198Q321 172 313 218Q310 262 359 259Q325 235 343 202Z" fill="#d9dbd1"/>
 {[-2.65,-.49].map((a,i)=>{const ang=opposite?(-Math.PI/2+(i===0?-.2:.2)+(i===0?-1:1)*t*.010):a+theta,px=cx+Math.cos(ang)*r,py=cy+Math.sin(ang)*r;return <g key={i} transform={`translate(${px} ${py}) rotate(${ang*180/Math.PI+90})`}><Actor girl={i===1} x={0} y={0} scale={.44} f={f} phase={i*6} walk distance={t*(opposite?Math.abs((i===0?-.010:.010)+.06*Math.PI/180):(.0052-.13*Math.PI/180))*r/.44} view="side" direction={opposite&&i===1?1:-1} emotion="soft"/></g>})}
 </>}

function Chat({f,shot}:S){return <>
 <svg x="0" y="0" width="960" height="1080" viewBox="0 0 1920 1080" preserveAspectRatio="none"><WindowRoom f={f} night/></svg>
 <svg x="960" y="0" width="960" height="1080" viewBox="0 0 1920 1080" preserveAspectRatio="none"><WindowRoom f={f} girl/></svg>
 <path d="M123 848H790V978H123Z" fill="#9493aa" stroke="#665e75" strokeWidth="5"/><path d="M124 849Q420 782 789 845" fill="#b8bacb" stroke="#9e9db2" strokeWidth="3"/>
 <Actor x={489} y={1038} scale={.89} f={f} pose={shot===18?'phone':'reach'} arm={shot===19?-72:undefined} emotion={shot===18?'soft':'sad'} tilt={5}/>
 <Actor girl x={1436} y={1026} scale={.88} f={f} pose="phone" emotion="soft" tilt={-4} opacity={shot===19?1-range(f,1285,1328)*.32:1}/>
 <path d="M1180 867L1648 862L1704 929H1157Z" fill="#ceb19c" stroke="#8e7770" strokeWidth="4"/><path d="M1198 923V1064M1667 924V1064" stroke="#8e7770" strokeWidth="9"/>
 <path d="M955 0Q938 520 958 1080" fill="none" stroke="#292f4b" strokeWidth="10" opacity=".3"/>
 <path d="M969 0Q982 520 970 1080" fill="none" stroke="#fff1ce" strokeWidth="9" opacity=".6"/>
 {shot===19&&<PaperBird x={620+range(f,1283,1330)*850} y={740-range(f,1283,1330)*390} s={.58} f={f}/>}
 </>}

function Hand({x,y,s=1,rotate=0,pink=false}:{x:number;y:number;s?:number;rotate?:number;pink?:boolean}){return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} {...pen} stroke="#352e33" strokeWidth="5"><path d="M-400 110L-81 76L-73 -60L-400 -144Z" fill={pink?'url(#cloth-girl-v5)':'url(#cloth-boy-v5)'}/><path d="M-98 -59L-20 -78Q31 -95 54 -71Q72 -58 54 -43L-2 -27Q61 -40 71 -22Q81 -6 59 4L8 24Q61 5 65 29Q66 49 38 61L-21 89Q-44 105 -85 78Z" fill="#ffe3ca"/><path d="M-92 -63L-95 79" strokeWidth="8"/></g>}
function Ticket({f}:S){const q=range(f,1491,1548);return <>
 <Book/>
 <g transform={`translate(1010 535) rotate(-8)`} {...pen} stroke="#a18978"><path d="M-460 -182H447Q418 -145 450 -107V90Q422 128 451 167H-460Q-428 131 -459 94V-109Q-427 -144 -460 -182Z" fill="#dfb7af"/>
 <path d="M-235 -176V164M-220 -176V164" strokeDasharray="6 9" opacity=".7"/>
 <g transform="translate(90 -22)"><path d="M-147 -84H150V73H-147Z" fill="#d7e6df"/><path d="M-146 27Q-20 -21 148 22V73H-146Z" fill="#9ab8b3"/><circle cx="87" cy="-48" r="25" fill="#f2d49b"/><path d="M-111 18H87V61H-111Z" fill="#e4adad"/><circle cx="-76" cy="66" r="13" fill="#7c7886"/><circle cx="53" cy="66" r="13" fill="#7c7886"/></g>
 <path d="M-413 -86H-291M-415 -37H-324M-414 15H-284M-414 62H-303" stroke="#b18c84" strokeWidth="6" opacity=".5"/>
 </g>
 <Hand x={620+q*44} y={722+q*10} s={1.16} rotate={-19}/>
 </>}

function TrainWhale({f,shot}:S){if(shot===23)return <FilmRoll f={f}/>;const q=range(f,1563,1659);return <>
 <Sky f={f}/><Sea f={f} from={839}/>
 {shot===23?<>
  <path d="M-100 908Q820 789 2010 839" stroke="#918a85" strokeWidth="6" fill="none"/>
  <g transform={`translate(${-range(f,1563,1611)*180} 0)`}>
  {[0,1,2].map(i=><g key={i} transform={`translate(${150+i*720} 505)`} {...pen}><path d="M-100 -182H543V345H-100Z" fill={i%2?'#d8b0b8':'#b6cdd0'}/><path d="M-63 -132H502V206H-63Z" fill="#f6edd8"/>
   {i===1?<><Actor x={75} y={344} scale={.57} f={f} pose="sit" emotion="happy"/><Actor girl x={333} y={344} scale={.57} f={f} pose="sit" emotion="happy" tilt={-5}/></>:<><Cloud x={180} y={-21} s={.6} f={f}/><PaperBird x={230} y={74} s={.48} f={f}/></>}
   <path d="M-100 206H543V345H-100Z" fill={i%2?'#d8b0b8':'#b6cdd0'}/><path d="M-100 210H543" stroke="#fff1d5" strokeWidth="5"/>
   <circle cx="27" cy="359" r="54" fill="#797c8c"/><circle cx="430" cy="359" r="54" fill="#797c8c"/>
  </g>)}</g>
 </>:<>
  <g transform={`translate(${960+q*90} ${796+wave(f,110)*7}) rotate(${wave(f,160)*1})`} {...pen} stroke="#7798a6" strokeWidth="4">
  <path d="M-685 -32Q-432 -253 -63 -191Q172 -215 370 -104Q471 -43 548 61L702 -13L624 100L709 164L537 143Q375 271 -50 185Q-448 152 -685 -32Z" fill="#c7dce0"/>
  <path d="M-685 -32Q-425 45 -81 45Q231 78 548 61Q359 217 -50 185Q-432 160 -685 -32Z" fill="#e7e9dc"/>
  <path d="M-312 0Q-128 103 -232 178L-81 109" fill="#aac6d0"/>
  <circle cx="-494" cy="-34" r="10" fill="#4f6b7d" strokeWidth="0"/>
  <path d="M-608 20Q-575 44 -535 27M-455 63Q-220 134 39 115" fill="none" opacity=".4"/>
  <Actor x={-140} y={-95} scale={.65} f={f} pose="sit" emotion="happy" tilt={4}/>
  <Actor girl x={160} y={-103} scale={.65} f={f} pose="sit" emotion="wonder" tilt={-5} lean={-4}/>
  </g>
  <Photo x={261} y={249} s={.4+pulse(f)*.008} r={-14}><MemoryPicture f={f} variant={0}/></Photo>
  <Photo x={1630} y={230} s={.36} r={13}><MemoryPicture f={f} variant={1}/></Photo>
 </>}
 <Petals f={f} n={9}/>
 </>}

function Swing({f,shot}:S){const sw=Math.sin((f-1659)/35)*4,land=range(f,1707,1747);return <>
 <Sky f={f}/><Cloud x={300} y={612} s={2.2} f={f}/><Cloud x={1550} y={760} s={2.5} f={f}/>
 <path d="M-80 965Q600 750 1060 841T2000 767" stroke="#e9dec5" strokeWidth="145" fill="none"/>
 <path d="M-80 965Q600 750 1060 841T2000 767" stroke="#9ca8aa" strokeWidth="3" fill="none"/>
 {shot===25?<>
  <g transform={`rotate(${sw} 1240 10)`}>
  <path d="M1070 -30V814M1400 -30V814" stroke="#b69d92" strokeWidth="6"/>
  <Actor girl x={1235} y={962} scale={.85} f={f} pose="sit" emotion="happy" tilt={-4}/>
  <path d="M1047 818H1426V842H1047Z" fill="#d7b6a7" stroke="#8e7d78" strokeWidth="4"/>
  </g>
  <Actor x={761} y={1005} scale={.91} f={f} pose="reach" emotion="happy" tilt={-3} arm={-95}/>
 </>:<>
  <Actor x={720+land*115} y={977} scale={.85} f={f} view="side" direction={1} walk={land<.98} distance={land*115/.85} pose="reach" arm={-89} emotion="soft"/>
  <Actor girl x={1200+land*100} y={977-land*13} scale={.85} f={f} walk={land<.98} direction={1} distance={land*100/.85} emotion="happy" pose="hold" tilt={-3}/>
  <path d="M1030 970Q1110 889 1245 934" fill="none" stroke="#f6efda" strokeWidth="33"/>
 </>}
 <PaperBird x={300+range(f,1659,1756)*900} y={165} s={.52} f={f}/>
 </>}

function Breakfast({f}:{f:number}){const pass=range(f,1807,1840);return <>
 <WindowRoom f={f} girl/>
 <Actor x={634} y={1080} scale={.95} f={f} pose="sit" emotion={f>1824?'happy':'soft'} tilt={-3}/>
 <Actor girl x={1315} y={1080} scale={.95} f={f} pose="offer" emotion="happy" tilt={3}/>
 <g {...pen} stroke="#8f7465" strokeWidth="4"><path d="M357 862L1520 862L1643 1044H230Z" fill="#cba78a"/><path d="M357 862L1520 862L1643 1044H230Z" fill="#ead0aa" opacity=".58"/>
 <path d="M292 1044L284 1080M1580 1044L1596 1080" strokeWidth="12"/>
 <g transform={`translate(${1115-pass*243} 878)`}><ellipse cy="45" rx="74" ry="14" fill="#efe0c3"/><path d="M-46 -17H43L33 39Q0 57 -37 39Z" fill="#f2ece0"/><path d="M44 -7Q90 -11 76 23Q68 39 39 29" fill="none" strokeWidth="7"/><path d={`M-13 -43q-13 -20 0 -37m25 39q-10 -20 0 -32`} fill="none" stroke="#fff8e4" strokeWidth="3" opacity=".6"/></g>
 <path d="M1168 975Q1247 937 1335 979Q1253 1025 1168 975Z" fill="#eee6d5"/><path d="M1203 969L1230 929L1301 950L1277 982Z" fill="#e1b276"/>
 <path d="M452 993Q524 957 597 996Q520 1036 452 993Z" fill="#eee6d5"/>
 </g>
 </>}
function Future({f,shot}:S){const build=range(f,1756,1790);return shot===28?<Breakfast f={f}/>:<>
 <Sky f={f} sunset/>
 <g opacity=".6" transform={`translate(0 ${240*(1-build)})`}>
 {[170,530,1340,1730].map((x,i)=><House key={x} x={x} y={810} s={1.4+(i%2)*.4} pink={i%2===0} lit/>)}
 </g>
 <path d="M0 946Q960 797 1920 946V1080H0Z" fill="#d3cfb0"/><path d="M750 1080L922 768H1077L1270 1080Z" fill="#f5e9cf"/>
 <Pair x={910+range(f,1756,1787)*70} y={979} s={.84} f={f} walk={f<1787} distance={range(f,1756,1787)*70/.84} hold emotion="happy"/>
 <path d="M940 110V717M154 714H1764M173 116H1752" stroke="#bda58e" strokeWidth="21"/>
 <path d="M958 118V713" stroke="#fff4d7" strokeWidth="8"/>
 <Tree x={1650} y={941} s={.9} f={f} pink/><Petals f={f}/>
 </>}

function Thanks({f,shot}:S){const give=range(f,1995,2032);return <>
 <School f={f}/>
 <Actor x={710} y={1010} scale={1} f={f} emotion="soft" pose={shot===32?'offer':'idle'} tilt={-2}/>
 <Actor girl x={1220} y={1010} scale={1} f={f} emotion="happy" pose={shot===32?'offer':'idle'} tilt={4}/>
 {shot===32&&<g transform={`translate(${1000+give*70} ${753-give*4}) rotate(${give*-8})`}><rect x="-85" y="-66" width="170" height="135" fill="#fff9e7" stroke="#b69f8b" strokeWidth="3"/><rect x="-74" y="-55" width="148" height="98" fill="#bad2d3"/><path d="M-74 22Q0 -3 74 14V43H-74Z" fill="#a9c1a5"/></g>}
 <Petals f={f} n={12}/>
 </>}

function FinalPicture({f}:{f:number}){return <><rect width="620" height="430" fill="#bdd9d7"/><circle cx="475" cy="90" r="48" fill="#f2d69d"/><Cloud x={143} y={88} s={.55} f={0}/><path d="M0 345Q190 267 350 326T620 312V430H0Z" fill="#adc3a8"/><Tree x={580} y={432} s={.42} f={0} pink/><Pair x={302} y={439} s={.52} f={f} hold emotion="happy"/></>}
const pieces=['0,0 620,0 620,72 508,72 500,44 120,44 113,75 0,75','0,75 113,75 110,220 0,220','0,220 110,220 120,377 0,377','0,377 120,377 129,430 0,430','129,430 120,377 500,377 498,430','498,430 500,377 620,377 620,430','500,377 508,222 620,222 620,377','508,222 508,72 620,72 620,222','120,44 500,44 508,72 508,222 500,377 120,377 110,220 113,75'];
function Farewell({f,shot}:S){const assembly=range(f,2292,2331);if(shot===37)return <>
 <Sky f={f} sunset/><path d="M0 907Q960 737 1920 907V1080H0Z" fill="#bdc9ae"/>
 <path d="M840 1080L960 834L460 631M960 834L1480 637" stroke="#f5e9d3" strokeWidth="105" fill="none"/>
 <Tree x={189} y={920} s={1.25} f={f} pink/><Tree x={1750} y={916} s={1.15} f={f}/>
 <Actor x={673-range(f,2268,2289)*42} y={1007} scale={.94} f={f} emotion="happy" pose="wave" tilt={-3}/>
 <Actor girl x={1267+range(f,2268,2289)*42} y={1007} scale={.94} f={f} emotion="happy" pose="wave" tilt={3}/>
 <Petals f={f} n={14}/>
 </>;
 return <>
 <Book/>
 <g transform={`translate(960 505) rotate(-4)`}>
 <path d="M-435 -317H435V362H-435Z" fill="#fff9e9" stroke="#baa18a" strokeWidth="3"/>
 {assembly>.999?<svg x="-396" y="-277" width="792" height="550" viewBox="0 0 620 430"><FinalPicture f={30}/></svg>:pieces.map((poly,i)=>{const late=clamp((assembly-i*.018)/(.86-i*.013)),q=ease(late),ox=(hash(i+7)-.5)*1500*(1-q),oy=(hash(i+52)-.5)*1000*(1-q);return <svg key={i} x={-396+ox} y={-277+oy} width="792" height="550" viewBox="0 0 620 430" overflow="visible">
 <defs><clipPath id={`final-v5-${i}`}><polygon points={poly}/></clipPath></defs><g clipPath={`url(#final-v5-${i})`}><FinalPicture f={30}/></g>
 </svg>})}
 <path d="M-140 -339L104 -335L99 -274L-146 -282Z" fill="#d3bc94" opacity=".65"/>
 <path d="M-178 315Q0 300 187 314" stroke="#c8ac90" strokeWidth="3" fill="none"/>
 </g>
 <path d="M1490 826L1606 865L1588 939L1471 898Z" fill="#ead3b5" stroke="#bda087" strokeWidth="2"/>
 <text x="960" y="910" textAnchor="middle" fontFamily="STKaiti,KaiTi,serif" fontSize="44" fill="#826b60" opacity={range(f,2321,2349)}>把回忆拼好给你</text>
 </>}

export function World({shot,f,p}:S){const props={shot,f,p};switch(groupOf[shot]){
 case 0:return <Opening {...props}/>;case 1:return <Meeting {...props}/>;case 2:return <Ocean {...props}/>;
 case 3:return <Tram {...props}/>;case 4:return <Rain {...props}/>;case 5:return <Jar {...props}/>;
 case 6:return <Whisper {...props}/>;case 7:return <Fireworks {...props}/>;case 8:return <Orbit {...props}/>;
 case 9:return <Globe {...props}/>;case 10:return <Chat {...props}/>;case 11:return <Lantern {...props}/>;
 case 12:return <Ticket {...props}/>;case 13:return <TrainWhale {...props}/>;case 14:return <Swing {...props}/>;
 case 15:return <Future {...props}/>;case 16:return <DreamWake {...props}/>;case 17:return <Thanks {...props}/>;
 case 18:return <Globe {...props} opposite/>;case 19:return <Envelope {...props}/>;case 20:return <Farewell {...props}/>;
 default:return <School f={f}/>;
}}

export function Camera({shot,f,children}:{shot:number;f:number;children:React.ReactNode}){
 const group=groupOf[shot],st=starts[group],en=starts[group+1]||2371,q=range(f,st,en);
 let z=1,tx=0,ty=0,roll=0;
 if(group===0){z=lerp(1.20,1,q);tx=lerp(-40,0,q);ty=lerp(-65,0,q)}
 if(group===1){z=lerp(1,1.22,q);tx=lerp(0,-54,q);ty=lerp(0,65,q)}
 if(group===2){z=shot===3?lerp(1.07,1,q):lerp(1,1.12,q);tx=lerp(30,-45,q);ty=shot===3?30:0}
 if(group===4){z=lerp(1.02,1.14,q);ty=18*q}
 if(group===5){z=lerp(1.02,1.15,q);ty=lerp(-10,-24,q)}
 if(group===6){z=lerp(1.05,1.21,q);tx=lerp(15,-35,q);ty=q*45}
 if(group===7){z=lerp(1.16,1,q);ty=lerp(36,0,q)}
 if(group===8&&shot===15){z=lerp(1.16,1,q);roll=lerp(-2,0,q)}
 if(group===9){z=lerp(1.10,1,q);tx=lerp(-40,0,q)}
 if(group===10){z=1.02;tx=lerp(-20,20,q)}
 if(group===11){z=lerp(1.04,1.15,q);ty=lerp(8,30,q)}
 if(group===12){z=lerp(1.05,1.20,q);tx=-q*45}
 if(group===13&&shot===24){z=lerp(1.10,1,q);tx=lerp(-50,15,q)}
 if(group===14){z=lerp(1.02,1.16,q);tx=-q*44;ty=24*q}
 if(group===15){z=shot===28?lerp(1.12,1.03,q):lerp(1.17,1,q)}
 if(group===16){z=lerp(1.09,1,q);ty=lerp(15,0,q)}
 if(group===17){z=lerp(1.05,1.16,q);ty=28*q}
 if(group===18){z=lerp(1.08,1,q)}
 if(group===19){z=lerp(1.08,1,q);ty=16*q}
 if(group===20){z=shot===37?lerp(1.12,1,q):lerp(1.03,1,q)}
 return <g transform={`translate(${960+tx} ${540+ty}) rotate(${roll}) scale(${z}) translate(-960 -540)`}>{children}</g>
}
