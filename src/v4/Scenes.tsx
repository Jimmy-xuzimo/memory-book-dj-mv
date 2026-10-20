import {Actor,Pair} from './Rig';
import {Wash,Sky,Cloud,Tree,Petals,Sea,House,School,Corridor,WindowRoom,Bench,Boat,PaperBird,Photo,Book,Firework,Stars,P,pen} from './Paint';
import {range,wave,hash,ease,lerp,pulse,clamp} from '../motion';

type S={shot:number;f:number;p:number};
export const groupOf=[0,0,1,2,2,3,3,4,4,5,5,6,7,7,8,8,9,9,10,10,11,11,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,20];
export const starts=[0,204,302,408,506,686,774,858,949,1144,1233,1331,1488,1563,1659,1756,1851,1949,2039,2141,2238];

function PencilCity({f}:{f:number}){return <g {...pen} stroke="#84939f" strokeWidth="2">
 {Array.from({length:14},(_,i)=>{const rise=range(f,i*2,i*2+36),x=(i%7)*300-100,y=300+Math.floor(i/7)*290;return <g key={i} transform={`translate(${x} ${y}) scale(1 ${.1+rise*.9})`}><path d="M0 140L90 5L231 63L140 199Z" fill="#c8d0cf"/><path d="M0 140V302L140 365V199Z" fill="#aab6c1"/><path d="M140 199L231 63V227L140 365Z" fill="#d8dace"/><path d="M33 188L72 203V250L33 235Z" fill={i===4?'#f7d391':'#8b9fae'}/><path d="M162 210L194 159V202L162 255Z" fill="#9aaeb8"/><path d="M8 291L140 351L220 227" fill="none" opacity=".35"/></g>})}
 </g>}
function Opening({f,shot}:S){const stop=range(f,0,95),move=lerp(375,780,stop);return <>
 <Wash kind="day"/>
 <g opacity=".35" stroke="#9cabb4" strokeWidth="1">{Array.from({length:26},(_,i)=><path key={i} d={`M${i*100-200} 0V1080M0 ${i*80}H1920`}/>)}</g>
 <g transform={`translate(${shot===1?-90*range(f,110,170):0} 0)`}><PencilCity f={f}/>
 <path d="M-100 920Q430 720 1050 805T2200 710" stroke="#ece5d5" strokeWidth="112" fill="none"/>
 <path d="M-100 920Q430 720 1050 805T2200 710" stroke="#92a1ad" strokeWidth="2" strokeDasharray="8 12" fill="none"/>
 {shot===0?<Actor x={move} y={860} scale={.54} f={f} walk={f<95} distance={(move-375)/.54} direction={1} view="back" tilt={-2*range(f,86,105)}/>:<>
  <path d={`M862 895V806H1012V718H1165V${631+Math.sin(range(f,115,187)*Math.PI)*30}H1338V542H1500`} fill="none" stroke="#73889c" strokeWidth="10"/>
  <path d={`M1012 718l${45*Math.sin(range(f,116,170)*Math.PI)} -${25*Math.sin(range(f,116,170)*Math.PI)}`} stroke="#fff1d7" strokeWidth="10"/>
  <Actor x={900} y={811} scale={.66} f={f} view="side" direction={1} emotion="sad" lean={range(f,130,160)*5} tilt={range(f,131,177)*8}/>
  <Cloud x={900} y={228} s={.88} f={f} dark/>
  {Array.from({length:18},(_,i)=><path key={i} d={`M${760+hash(i)*290} ${265+(f*3+i*49)%260}l-8 23`} stroke="#8aa2b8" strokeWidth="2.5" opacity=".7"/>)}
  <path d={`M1780 740Q${1530-range(f,155,204)*130} 660 1290 747T${1080-range(f,160,204)*140} 800`} fill="none" stroke={P.pink} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-range(f,155,198)}/>
 </>}
 </g>
 <path d="M0 1040Q360 1045 448 860Q462 968 580 1080H0Z" fill="#fff4de" stroke="#c6b79f" strokeWidth="2"/>
 <path d="M448 860Q416 983 363 1019" fill="none" stroke="#b6a490" strokeWidth="3"/>
 </>}

function Meeting({f}:S){const a=range(f,210,252),b=range(f,247,280);return <>
 <Corridor f={f}/>
 <Actor x={590} y={968} scale={1.03} f={f} emotion={f>260?'happy':'soft'} tilt={-4+4*a} look={1} lean={-2+2*a}/>
 <Actor girl x={1300-90*a} y={960} scale={1.04} f={f} emotion="happy" tilt={-6} lean={-7+4*b} pose="reach" arm={-38-13*b}/>
 <path d="M1180 954Q1000 861 834 943T568 958" stroke={P.pink} strokeWidth="4" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-a} opacity=".7"/>
 <path d="M1703 0L1750 1080H1860V0Z" fill="#8e7568" stroke="#796457" strokeWidth="5"/>
 <path d="M1716 0L1765 1080" stroke="#d6bda4" strokeWidth="14"/>
 <Petals f={f} n={5}/>
 </>}

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

function Tram({f,shot}:S){const q=range(f,408,506),lean=range(f,461,494);return <>
 <Wash kind="cream"/>
 <svg x="0" y="0" width="1920" height="725" viewBox="0 0 1920 725" overflow="hidden">
 <Sky f={f} sunset/>
 <g transform={`translate(${-q*470} 0)`}>{[-200,210,630,1090,1580,2030,2440].map((v,i)=><g key={v}><House x={v} y={710} s={1.2+(i%2)*.4} pink={i%2===0}/><Tree x={v+150} y={710} s={.85} f={f} pink={i%3===0}/></g>)}</g>
 </svg>
 <path d="M0 0H1920V130H0ZM0 675H1920V1080H0Z" fill="#d8b6a5" stroke="#8e7870" strokeWidth="5"/>
 <path d="M58 129V675M633 129V675M1276 129V675M1863 129V675" stroke="#b7a28e" strokeWidth="27"/>
 <path d="M0 675H1920" stroke="#faf1dd" strokeWidth="12"/>
 <Bench x={970} y={878} w={1130}/>
 <Actor x={755} y={1047} scale={.96} f={f} pose={shot===5?'offer':'sit'} emotion={shot===5?'shy':'soft'} tilt={shot===5?2:5*lean}/>
 <Actor girl x={1230-100*lean} y={1034} scale={.96} f={f} pose={shot===5?'offer':'sit'} emotion="happy" tilt={shot===5?-4:-12*lean} lean={-5*lean}/>
 {shot===5&&<g transform={`translate(${1070-range(f,414,446)*90} ${799-range(f,413,442)*48}) rotate(9)`} {...pen}><path d="M-21 -15Q-49 -42 -25 -61Q-8 -76 9 -58Q38 -62 43 -37L26 15Z" fill="#e3b67c"/><path d="M-29 -13L29 1L18 53L-32 43Z" fill="#f6dfc3"/><path d="M-17 14L8 22" stroke="#c9a58d"/></g>}
 <path d="M0 1000Q420 977 1920 1010V1080H0Z" fill="#a98479" opacity=".3"/>
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
  <g transform={`translate(${-open*570} ${-open*80})`}><Cloud x={600} y={366} s={2.17} dark f={f}/><path d="M920 299L944 338L912 363L937 390L905 424" fill="none" stroke="#edf0df" strokeWidth="5"/></g>
  <g transform={`translate(${open*570} ${-open*80})`}><Cloud x={1310} y={357} s={2.2} dark f={f}/></g>
  <path d="M960 305L978 328L958 353L974 381L957 420" stroke="#fff2c3" strokeWidth={6+open*26} opacity={.6} fill="none"/>
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
  <path d="M1010 809Q1250 761 1555 360" stroke="#e6c5b8" strokeWidth="3" strokeDasharray="3 12" fill="none" opacity={release*.6}/>
 </>}
 </>}

function Whisper({f}:S){return <>
 <Sky f={f} night/><Sea f={f} night from={775}/>
 <Actor x={749} y={1080} scale={1.23} f={f} emotion="shy" tilt={6} lean={3}/>
 <Actor girl x={1230-58*range(f,775,815)} y={1080} scale={1.22} f={f} emotion="happy" tilt={-9} lean={-5} pose="chest"/>
 <path d={`M1124 420Q1272 277 1050 220Q750 129 621 281Q516 430 693 491`} stroke="#d8b49d" strokeWidth="3" fill="none" strokeDasharray="4 13" pathLength="1" strokeDashoffset={-f*.003}/>
 {[0,1,2,3,4].map(i=>{const a=(f-775)*.017+i*1.18;return <g key={i} transform={`translate(${925+Math.cos(a)*327} ${326+Math.sin(a)*133}) rotate(${i*20})`}><path d="M0 -11L4 -3L12 -2L6 5L7 13L0 8L-8 13L-6 4L-12 -3L-4 -3Z" fill={i%2?'#f4d293':'#e5b6c3'}/></g>})}
 </>}

function Fireworks({f,shot}:S){return <>
 <Sky f={f} night/><Sea f={f} night from={754}/>
 <path d="M0 972Q420 850 1100 929T1920 944V1080H0Z" fill="#767180"/>
 <Firework x={656} y={308} f={f} start={856} size={307}/><Firework x={1320} y={242} f={f} start={872} size={269} color="#e7ce9e"/>
 <Firework x={365} y={376} f={f} start={893} size={194} color="#9ec9da"/>
 <Pair x={783} y={986} s={.66} f={f} hold back/>
 <path d="M619 689Q760 631 902 686" fill="none" stroke="#f3d2b0" strokeWidth="18" opacity={.08+pulse(f)*.06}/>
 {shot===13&&[0,1,2].map((i)=>{const t=range(f,906,949),x=490+i*490+wave(f,190,i)*45,y=283+(i%2)*93-t*22;return <g key={i} transform={`translate(${x} ${y}) rotate(${wave(f,160,i)*4})`}><path d="M-98 8Q-110 -102 0 -122Q108 -104 98 8Q58 34 0 15Q-61 36 -98 8Z" fill={i%2?'#a8c5d2':'#e6b5cb'} fillOpacity=".44" stroke="#e6c9d9" strokeWidth="3"/>{[-65,-25,15,58].map(v=><path key={v} d={`M${v} 14Q${v-28} ${90+wave(f,70,v)*12} ${v+13} 171T${v-7} 247`} fill="none" stroke={i%2?'#d5e5e7':'#ebc1d7'} strokeWidth="3" opacity=".6"/>)}</g>})}
 </>}

export function MemoryPicture({f,variant=0}:{f:number;variant?:number}){return <>
 <rect width="620" height="430" fill={variant%3===1?'#657596':'#c3dcda'}/>
 <circle cx="495" cy="88" r="43" fill="#efd5a0"/>
 {variant%3===1?<><Firework x={176} y={104} f={f%35+14} size={105}/><Firework x={450} y={85} f={f%35+14} size={88}/></>:<><Cloud x={130} y={94} s={.55} f={f}/><path d="M0 330Q140 250 310 318T620 297V430H0Z" fill="#b2c5a5"/><Tree x={558} y={399} s={.4} f={f} pink/></>}
 {variant%3===2?<><Actor x={235} y={439} scale={.53} f={f} view="side" direction={1} pose="hug" hands={{right:[225,-270],left:[30,-230]}} tilt={3}/><Actor girl x={385} y={439} scale={.53} f={f} view="side" direction={-1} pose="hug" hands={{left:[-220,-255],right:[-20,-220]}} tilt={-3}/></>:<Pair x={302} y={439} s={.53} gap={400} f={f} hold emotion="happy"/>}
 </>}

function Orbit({f,shot}:S){const drift=range(f,1050,1144);return <>
 <Wash kind={shot===14?'pink':'night'}/>{shot===15&&<Stars f={f}/>}
 {shot===14?<>
  <Photo x={960} y={550} s={1.46} r={-4+range(f,950,1045)*3}><MemoryPicture f={f} variant={1}/></Photo>
  <Firework x={1630} y={230} f={f} start={964} size={190}/><Petals f={f} n={9}/>
 </>:<>
  {[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3+drift*.45,x=960+Math.cos(a)*660,y=525+Math.sin(a)*330;return <Photo key={i} x={x} y={y} s={.42+(i%2)*.12+(i===1?pulse(f)*.012:0)} r={i*13-30+drift*4}><MemoryPicture f={100+i*15} variant={i}/></Photo>})}
  <path d="M300 510C300 80 1620 80 1620 510S300 940 300 510Z" stroke="#dfc4b6" strokeWidth="2" strokeDasharray="3 13" fill="none" opacity=".35"/>
  <Actor x={963} y={1010} scale={1.04} f={f} emotion="sad" pose="reach" tilt={-4+drift*5} arm={-86+drift*20}/>
 </>}
 </>}

function Globe({f}:S){const t=f-1144,theta=-t*.0052,spin=-t*.13,r=257,cx=960,cy=566;return <>
 <Wash kind="night"/><Stars f={f} n={55}/>
 <defs><clipPath id="v4-globe-disc"><circle cx={cx} cy={cy} r={r}/></clipPath><linearGradient id="v4-terminator"><stop offset="0" stopColor="#263654" stopOpacity=".75"/><stop offset=".48" stopColor="#263654" stopOpacity=".48"/><stop offset=".53" stopColor="#fff0bc" stopOpacity=".13"/><stop offset="1" stopColor="#fff0bc" stopOpacity=".36"/></linearGradient></defs>
 <circle cx={cx} cy={cy} r={r+11} fill="#a6c7d3" opacity=".14"/>
 <circle cx={cx} cy={cy} r={r} fill="#94bcc8" stroke="#d5d9cc" strokeWidth="4"/>
 <g clipPath="url(#v4-globe-disc)">
 <g transform={`rotate(${spin} ${cx} ${cy})`} stroke="#b3cbb3" strokeWidth="2" fill="#bbcdac">
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
 <rect x={cx-r} y={cy-r} width={r*2} height={r*2} fill="url(#v4-terminator)"/>
 </g>
 <circle cx="1640" cy="268" r="73" fill="#f3d798"/>
 <g stroke="#f0d299" strokeWidth="3" opacity=".7">{Array.from({length:12},(_,i)=><path key={i} d="M0 -92V-114" transform={`translate(1640 268) rotate(${i*30})`}/>)}</g>
 <path d="M368 198Q321 172 313 218Q310 262 359 259Q325 235 343 202Z" fill="#d9dbd1"/>
 {[-2.65,-.49].map((a,i)=>{const ang=a+theta,px=cx+Math.cos(ang)*r,py=cy+Math.sin(ang)*r;return <g key={i} transform={`translate(${px} ${py}) rotate(${ang*180/Math.PI+90})`}><Actor girl={i===1} x={0} y={0} scale={.44} f={f} phase={i*6} walk distance={t*(.0052-.13*Math.PI/180)*r/.44} view="side" direction={-1} emotion="soft"/></g>})}
 <path d="M755 881Q960 933 1165 881" fill="none" stroke="#b3bac8" strokeWidth="2" opacity=".2"/>
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

function Lantern({f,shot}:S){const self=shot===21;return <>
 <Sky night f={f}/>
 <g opacity=".58">{[80,420,1480,1850].map((x,i)=><House key={x} x={x} y={950} s={1.5} pink={i%2===0} lit/>)}</g>
 <path d="M0 1040Q360 845 960 917T1920 924V1080H0Z" fill="#77768d"/>
 <Actor x={self?960:801} y={1060} scale={1.17} f={f} pose={self?'chest':'offer'} emotion={self?'soft':'sad'} tilt={self?-5:5}/>
 <g transform={`translate(${self?960:1127} ${self?770:727})`}>
 <circle r={self?130:65} fill="#f7d48f" opacity={self?.12:.07}/>
 <path d="M-52 45L-61 -54L53 -54L47 45Z" fill="#f3d9a0" stroke="#927d70" strokeWidth="4"/><path d="M-61 -54L-5 -83L53 -54M-5 -83V-111M-52 45H47" stroke="#b39b7b" strokeWidth="4" fill="none"/>
 <path d="M-31 -41L-24 30M21 -41L20 30" stroke="#fff2c5" strokeWidth="7" opacity=".8"/>
 </g>
 {!self&&<path d="M1157 743Q1430 629 1590 703" stroke="#d8bba3" strokeWidth="2" strokeDasharray="4 12" opacity=".4" fill="none"/>}
 </>}

function Hand({x,y,s=1,rotate=0,pink=false}:{x:number;y:number;s?:number;rotate?:number;pink?:boolean}){return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} {...pen} stroke="#352e33" strokeWidth="5"><path d="M-400 110L-81 76L-73 -60L-400 -144Z" fill={pink?'url(#cloth-girl-v4)':'url(#cloth-boy-v4)'}/><path d="M-98 -59L-20 -78Q31 -95 54 -71Q72 -58 54 -43L-2 -27Q61 -40 71 -22Q81 -6 59 4L8 24Q61 5 65 29Q66 49 38 61L-21 89Q-44 105 -85 78Z" fill="#ffe3ca"/><path d="M-92 -63L-95 79" strokeWidth="8"/></g>}
function Ticket({f}:S){const q=range(f,1491,1548);return <>
 <Book/>
 <g transform={`translate(1010 535) rotate(-8)`} {...pen} stroke="#a18978"><path d="M-460 -182H447Q418 -145 450 -107V90Q422 128 451 167H-460Q-428 131 -459 94V-109Q-427 -144 -460 -182Z" fill="#dfb7af"/>
 <path d="M-235 -176V164M-220 -176V164" strokeDasharray="6 9" opacity=".7"/>
 <g transform="translate(90 -22)"><path d="M-147 -84H150V73H-147Z" fill="#d7e6df"/><path d="M-146 27Q-20 -21 148 22V73H-146Z" fill="#9ab8b3"/><circle cx="87" cy="-48" r="25" fill="#f2d49b"/><path d="M-111 18H87V61H-111Z" fill="#e4adad"/><circle cx="-76" cy="66" r="13" fill="#7c7886"/><circle cx="53" cy="66" r="13" fill="#7c7886"/></g>
 <path d="M-413 -86H-291M-415 -37H-324M-414 15H-284M-414 62H-303" stroke="#b18c84" strokeWidth="6" opacity=".5"/>
 </g>
 <Hand x={620+q*44} y={722+q*10} s={1.16} rotate={-19}/>
 <path d="M302 904Q780 870 1570 910" fill="none" stroke="#b39b85" strokeWidth="2"/>
 </>}

function TrainWhale({f,shot}:S){const q=range(f,1563,1659);return <>
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

function DreamWake({f,shot}:S){const flatten=range(f,1851,1934);return <>
 <Wash kind="cream"/>
 {shot===29?<>
  <Breakfast f={1840}/>
  <Actor girl x={1315} y={1080} scale={.95} f={1840} pose="offer" emotion="happy" opacity={1-range(f,1864,1898)*.8}/>
  {Array.from({length:7},(_,i)=>{const x=((f-1851)*28+i*375)%2800-450;return <g key={i} transform={`translate(${x} ${600+(i%2)*170}) rotate(${i%2?9:-8})`} fill={i%2?'#d0b9b7':'#aeb9c4'} opacity=".67" stroke="#9b9499" strokeWidth="2"><circle cy="-190" r="65"/><path d="M-48 -120L-74 92L-23 100L-13 243H24L32 95L79 100L44 -119Z"/></g>})}
  <path d="M0 0H1920V1080H0Z" fill="#fff3dc" opacity={flatten*.15}/>
 </>:<>
  <Book/>
  <Photo x={1090} y={527} s={1.15} r={-4}><svg width="620" height="430" viewBox="200 130 1520 800" preserveAspectRatio="xMidYMid slice"><Breakfast f={1840}/></svg></Photo>
  <Hand x={1010} y={790} s={1.4} rotate={-22}/>
  <path d={`M1540 769Q${1590-flatten*50} ${682-flatten*30} 1592 820L1540 769Z`} fill="#ecd7ba" stroke="#c1a88d" strokeWidth="2"/>
 </>}
 </>}

function Thanks({f,shot}:S){const give=range(f,1995,2032);return <>
 <School f={f}/>
 <Actor x={710} y={1010} scale={1} f={f} emotion="soft" pose={shot===32?'offer':'idle'} tilt={-2}/>
 <Actor girl x={1220} y={1010} scale={1} f={f} emotion="happy" pose={shot===32?'offer':'idle'} tilt={4}/>
 {shot===32&&<g transform={`translate(${1000+give*70} ${753-give*4}) rotate(${give*-8})`}><rect x="-85" y="-66" width="170" height="135" fill="#fff9e7" stroke="#b69f8b" strokeWidth="3"/><rect x="-74" y="-55" width="148" height="98" fill="#bad2d3"/><path d="M-74 22Q0 -3 74 14V43H-74Z" fill="#a9c1a5"/></g>}
 <Petals f={f} n={12}/>
 </>}

function Bridge({f,shot}:S){const part=range(f,2088,2137);return <>
 <Sky f={f} night/><Sea f={f} night from={765}/>
 <path d="M0 1080V674Q337 705 621 922L682 1080Z" fill="#b8b5a4"/>
 <path d="M1920 1080V670Q1600 700 1280 925L1220 1080Z" fill="#b8b5a4"/>
 <House x={273} y={745} s={1.57} lit pink/><House x={1660} y={745} s={1.57} lit/>
 <Actor x={620-part*95} y={923} scale={.72} f={f} emotion="soft" pose={shot===33?'offer':'idle'} tilt={2}/>
 <Actor girl x={1297+part*95} y={923} scale={.72} f={f} emotion="soft" pose={shot===33?'offer':'idle'} tilt={-2}/>
 <path d="M667 927Q960 778 1257 927" stroke="#f1d4b0" strokeWidth={shot===34?17:5} fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-range(f,2045,2120)} opacity=".85"/>
 {shot===34&&<path d="M667 965Q960 816 1257 965" stroke="#c1b6ad" strokeWidth="3" fill="none"/>}
 <path d="M284 782L248 994M1641 788L1681 1002" stroke="#f1d6a5" strokeWidth="11" opacity=".14"/>
 </>}

function Envelope({f,shot}:S){const insert=range(f,2144,2183),flat=range(f,2190,2231);return <>
 <Book/>
 {shot===35?<>
  <g transform="translate(1087 577) rotate(-7)" {...pen} stroke="#ad927e" strokeWidth="3"><path d="M-387 -160L0 -343L387 -160V206H-387Z" fill="#e2c4a5"/><path d="M-337 -217H336V135H-337Z" fill="#fff9e8" transform={`translate(0 ${insert*185})`}/><path d="M-305 -189H305V72H-305Z" fill="#bdd4d5" transform={`translate(0 ${insert*185})`}/><path d="M-387 -160L0 95L387 -160V206H-387Z" fill="#e5c6a8"/><path d="M-387 206L-45 -27Q0 -42 45 -27L387 206" fill="#edd4b5"/></g>
  <Hand x={780+insert*95} y={560+insert*135} s={1.1} rotate={14}/>
 </>:<>
  <Photo x={607} y={535} s={.83} r={-7}><MemoryPicture f={44} variant={0}/></Photo>
  <path d="M1114 303Q1320 270 1591 311M1111 414Q1333 386 1582 423M1115 526Q1320 497 1583 535" stroke="#d8c8ae" strokeWidth="2" opacity=".4" fill="none"/>
  <g transform={`translate(${1400+flat*40} ${780+flat*22}) rotate(-27)`} {...pen} strokeWidth="2"><path d="M-186 -15H141V14H-186Z" fill="#c9a282"/><path d="M141 -15L184 0L141 14Z" fill="#e5d1aa"/><path d="M169 -5L184 0L169 5Z" fill="#615957"/></g>
  <Hand x={662-flat*28} y={736+flat*52} s={.9} rotate={-19}/>
 </>}
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
 <defs><clipPath id={`final-v4-${i}`}><polygon points={poly}/></clipPath></defs><g clipPath={`url(#final-v4-${i})`}><FinalPicture f={30}/></g>
 </svg>})}
 <path d="M-140 -339L104 -335L99 -274L-146 -282Z" fill="#d3bc94" opacity=".65"/>
 <path d="M-178 315Q0 300 187 314" stroke="#c8ac90" strokeWidth="3" fill="none"/>
 </g>
 <path d="M1490 826L1606 865L1588 939L1471 898Z" fill="#ead3b5" stroke="#bda087" strokeWidth="2"/>
 <path d="M290 847Q373 798 466 852" stroke={P.pink} strokeWidth="5" fill="none"/>
 <text x="960" y="910" textAnchor="middle" fontFamily="STKaiti,KaiTi,serif" fontSize="44" fill="#826b60" opacity={range(f,2321,2349)}>把回忆拼好给你</text>
 </>}

export function World({shot,f,p}:S){const props={shot,f,p};switch(groupOf[shot]){
 case 0:return <Opening {...props}/>;case 1:return <Meeting {...props}/>;case 2:return <Ocean {...props}/>;
 case 3:return <Tram {...props}/>;case 4:return <Rain {...props}/>;case 5:return <Jar {...props}/>;
 case 6:return <Whisper {...props}/>;case 7:return <Fireworks {...props}/>;case 8:return <Orbit {...props}/>;
 case 9:return <Globe {...props}/>;case 10:return <Chat {...props}/>;case 11:return <Lantern {...props}/>;
 case 12:return <Ticket {...props}/>;case 13:return <TrainWhale {...props}/>;case 14:return <Swing {...props}/>;
 case 15:return <Future {...props}/>;case 16:return <DreamWake {...props}/>;case 17:return <Thanks {...props}/>;
 case 18:return <Bridge {...props}/>;case 19:return <Envelope {...props}/>;case 20:return <Farewell {...props}/>;
 default:return <School f={f}/>;
}}

export function Camera({shot,f,children}:{shot:number;f:number;children:React.ReactNode}){
 const group=groupOf[shot],st=starts[group],en=starts[group+1]||2371,q=range(f,st,en);
 let z=1,tx=0,ty=0;
 if(group===0){z=lerp(1,1.16,q);tx=-lerp(-45,20,q);ty=lerp(10,-45,q)}
 if(group===1){z=lerp(1,1.11,q);tx=lerp(14,-14,q);ty=lerp(20,10,q)}
 if(group===3){z=lerp(1,1.1,q);tx=lerp(20,-12,q);ty=-q*15}
 if(group===4){z=lerp(1,1.08,q);ty=-q*15}
 if(group===5){z=lerp(1.04,1.13,q);ty=lerp(-20,-42,q)}
 if(group===6){z=lerp(1,1.08,q);ty=-q*12}
 if(group===7){z=lerp(1,1.04,q);ty=-q*10}
 if(group===8){z=shot===14?lerp(1.04,1.1,q):1}
 if(group===11){z=lerp(1,1.08,q);ty=-q*14}
 if(group===12){z=lerp(1.05,1.12,q);tx=-q*25}
 if(group===14){z=lerp(1.03,1.08,q);tx=-q*20}
 if(group===15){z=shot===28?1.06:lerp(1.04,1,q)}
 if(group===16){z=shot===30?lerp(1.17,1.02,q):1.06}
 if(group===17){z=lerp(1,1.06,q);ty=-q*8}
 if(group===19){z=lerp(1.05,1,q)}
 if(group===20){z=shot===37?lerp(1.05,1,q):lerp(1.03,1,q)}
 return <g transform={`translate(${960+tx} ${540+ty}) scale(${z}) translate(-960 -540)`}>{children}</g>
}
