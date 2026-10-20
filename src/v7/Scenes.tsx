import {CloudCurtain,SailboatScene,SideEmbrace,CloudRest} from './Acting';
import {DreamMemory} from './Dream';
import {PhotoAssembly} from './Finale';
import {NightCity as Opening,SunMeeting as Meeting,MoreFireworks as Fireworks,FrozenFireworks,GivingHearts as Lantern,CrowdPlaza as DreamWake,LetterOut as Envelope} from './Revisions';
import {SweetMontage as Tram,FilmRoll} from './Memories';
import {Actor,Pair} from './Rig';
import {Wash,Sky,Cloud,Tree,Petals,Sea,School,WindowRoom,Boat,PaperBird,Photo,Book,Firework,Stars,pen} from './Paint';
import {range,wave,lerp,pulse} from '../motion';

type S={shot:number;f:number;p:number};
export const groupOf=[0,0,1,2,2,3,3,4,4,5,5,6,7,7,8,8,9,9,10,10,11,11,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,20];
export const starts=[0,204,302,408,506,686,774,858,949,1144,1233,1331,1488,1563,1659,1756,1851,1949,2039,2141,2238];

function Ocean({f,shot}:S){if(shot===4)return <SailboatScene f={f}/>;const travel=range(f,302,408);return <>
 <Sky f={f}/><Sea f={f} from={560}/>
 <g transform={`translate(${-40*travel} 0)`}><Cloud x={400} y={250} s={1.6} f={f}/><Cloud x={1450} y={140} s={.8} f={-f}/></g>
 {shot===3?<>
  <Actor x={620} y={1360} scale={1.72} f={f} emotion="wonder" tilt={-3} look={1}/>
  <Actor girl x={1300} y={1320} scale={1.56} f={f} emotion="happy" tilt={4}/>
 </>:<>
  <Boat y={870} s={1.48} f={f}/>
  <Actor x={752} y={892} scale={.71} f={f} emotion="soft" pose="sit" tilt={-2}/>
  <Actor girl x={1139} y={882} scale={.72} f={f} emotion="happy" pose="point" lean={-2}/>
  <path d="M373 900L553 1042H1351L1545 900L960 1003Z" fill="#f9eed7" stroke="#8f8781" strokeWidth="3"/>
 </>}
 </>}

function Rain({f,shot}:S){return <CloudCurtain f={f} shot={shot}/>}

function Jar({f,shot}:S){const fall=range(f,688,718),release=range(f,735,770);return <>
 <WindowRoom f={f} girl/>
 <Actor x={620} y={1210} scale={1.25} f={f} emotion="happy" pose={shot===9?'offer':'reach'} hands={shot===9?{right:[270,-390],left:[-79,-134]}:undefined} tilt={-3}/>
 <Actor girl x={1155} y={1210} scale={1.25} f={f} emotion="happy" pose="offer" hands={{left:[-145,-245],right:[-65,-245]}} tilt={4}/>
 <g transform="translate(973 827)" {...pen}><path d="M-83 -105L-69 -67L-79 91Q0 119 79 91L69 -67L83 -105Z" fill="#d5ece5" fillOpacity=".45" stroke="#7a9ca6" strokeWidth="4"/><ellipse cy="-105" rx="83" ry="15" fill="#f5f5df" fillOpacity=".6" stroke="#8ca2a4"/><path d="M-53 -49L-56 64" stroke="#fff8dc" strokeWidth="11" opacity=".7"/>
  {[0,1,2].map(i=><path key={i} d="M0 -18L5 -6L18 -5L9 4L11 17L0 10L-12 17L-10 3L-18 -5L-5 -7Z" transform={`translate(${-38+i*38} ${54-(i%2)*26-wave(f,86,i)*4})`} fill="#f7d792" stroke="#c6a66f" strokeWidth="1"/>)}</g>
 {shot===9?<path d="M0 -22L6 -7L22 -6L11 4L14 20L0 12L-14 20L-11 4L-22 -6L-6 -7Z" transform={`translate(963 ${590+fall*270}) rotate(${fall*90})`} fill="#f6d692" stroke="#a58c68" strokeWidth="2"/>:<>
  {[0,1,2].map(i=><PaperBird key={i} x={1050+release*(430+i*100)} y={710-release*(290+i*90)} s={.42+i*.08} f={f+i*3}/>)}
 </>}
 </>}

function Whisper({f}:S){return <SideEmbrace f={f}/>}

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
  <Actor x={963} y={1010} scale={1.04} f={f} emotion="sad" pose="cry" tilt={-4+drift*5}/>
 </>}
 </>}

function Globe({f,opposite=false}:S&{opposite?:boolean}){const t=f-(opposite?2039:1144),theta=-t*.0052,spin=-t*(opposite?.06:.13),r=opposite?250:257,cx=960,cy=opposite?640:566;return <>
 <Wash kind="night"/><Stars f={f} n={55}/>
 <defs><clipPath id="v7-globe-disc"><circle cx={cx} cy={cy} r={r}/></clipPath><linearGradient id="v7-terminator"><stop offset="0" stopColor="#263654" stopOpacity=".75"/><stop offset=".48" stopColor="#263654" stopOpacity=".48"/><stop offset=".53" stopColor="#fff0bc" stopOpacity=".13"/><stop offset="1" stopColor="#fff0bc" stopOpacity=".36"/></linearGradient></defs>
 <circle cx={cx} cy={cy} r={r+11} fill="#a6c7d3" opacity=".14"/>
 <circle cx={cx} cy={cy} r={r} fill="#94bcc8" stroke="#d5d9cc" strokeWidth="4"/>
 <g clipPath="url(#v7-globe-disc)">
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
 <rect x={cx-r} y={cy-r} width={r*2} height={r*2} fill="url(#v7-terminator)"/>
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

function Hand({x,y,s=1,rotate=0,pink=false}:{x:number;y:number;s?:number;rotate?:number;pink?:boolean}){return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} {...pen} stroke="#352e33" strokeWidth="5"><path d="M-400 110L-81 76L-73 -60L-400 -144Z" fill={pink?'url(#cloth-girl-v7)':'url(#cloth-boy-v7)'}/><path d="M-98 -59L-20 -78Q31 -95 54 -71Q72 -58 54 -43L-2 -27Q61 -40 71 -22Q81 -6 59 4L8 24Q61 5 65 29Q66 49 38 61L-21 89Q-44 105 -85 78Z" fill="#ffe3ca"/><path d="M-92 -63L-95 79" strokeWidth="8"/></g>}
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
  <Photo x={261} y={407} s={.4+pulse(f)*.008} r={-14}><MemoryPicture f={f} variant={0}/></Photo>
  <Photo x={1630} y={230} s={.36} r={13}><MemoryPicture f={f} variant={1}/></Photo>
 </>}
 <Petals f={f} n={9}/>
 </>}

function Swing({f,shot}:S){if(shot===26)return <CloudRest f={f}/>;const sw=Math.sin((f-1659)/35)*4,land=range(f,1707,1747);return <>
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

function Thanks({f,shot}:S){const give=range(f,1995,2032);return <>
 <School f={f}/>
 <Actor x={710} y={1010} scale={1} f={f} emotion="soft" pose={shot===32?'offer':'idle'} tilt={-2}/>
 <Actor girl x={1220} y={1010} scale={1} f={f} emotion="happy" pose={shot===32?'offer':'idle'} tilt={4}/>
 {shot===32&&<g transform={`translate(${1000+give*70} ${753-give*4}) rotate(${give*-8})`}><rect x="-85" y="-66" width="170" height="135" fill="#fff9e7" stroke="#b69f8b" strokeWidth="3"/><rect x="-74" y="-55" width="148" height="98" fill="#bad2d3"/><path d="M-74 22Q0 -3 74 14V43H-74Z" fill="#a9c1a5"/></g>}
 <Petals f={f} n={12}/>
 </>}

function Farewell({f,shot}:S){if(shot===37)return <>
 <Sky f={f} sunset/><path d="M0 907Q960 737 1920 907V1080H0Z" fill="#bdc9ae"/>
 <path d="M840 1080L960 834L460 631M960 834L1480 637" stroke="#f5e9d3" strokeWidth="105" fill="none"/>
 <Tree x={189} y={920} s={1.25} f={f} pink/><Tree x={1750} y={916} s={1.15} f={f}/>
 <Actor x={673-range(f,2268,2289)*42} y={1007} scale={.94} f={f} emotion="happy" pose="wave" tilt={-3}/>
 <Actor girl x={1267+range(f,2268,2289)*42} y={1007} scale={.94} f={f} emotion="happy" pose="wave" tilt={3}/>
 <Petals f={f} n={14}/>
 </>;
 return <PhotoAssembly f={f}/>;
}

export function World({shot,f,p}:S){const props={shot,f,p};switch(groupOf[shot]){
 case 0:return <Opening {...props}/>;case 1:return <Meeting {...props}/>;case 2:return <Ocean {...props}/>;
 case 3:return <Tram {...props}/>;case 4:return <Rain {...props}/>;case 5:return <Jar {...props}/>;
 case 6:return <Whisper {...props}/>;case 7:return <Fireworks {...props}/>;case 8:return <Orbit {...props}/>;
 case 9:return <Globe {...props}/>;case 10:return <Chat {...props}/>;case 11:return <Lantern {...props}/>;
 case 12:return <Ticket {...props}/>;case 13:return <TrainWhale {...props}/>;case 14:return <Swing {...props}/>;
 case 15:return <DreamMemory f={f}/>;case 16:return <DreamWake {...props}/>;case 17:return <Thanks {...props}/>;
 case 18:return <Globe {...props} opposite/>;case 19:return <Envelope {...props}/>;case 20:return <Farewell {...props}/>;
 default:return <School f={f}/>;
}}

export function Camera({shot,f,children}:{shot:number;f:number;children:React.ReactNode}){
 const group=groupOf[shot],st=starts[group],en=starts[group+1]||2371,q=range(f,st,en);
 let z=1,tx=0,ty=0,roll=0;
 if(group===0){z=lerp(1.06,1,q);tx=lerp(-12,0,q);ty=0}
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
 if(group===15){z=1}
 if(group===16){z=1}
 if(group===17){z=lerp(1.05,1.16,q);ty=28*q}
 if(group===18){z=lerp(1.08,1,q)}
 if(group===19){z=lerp(1.08,1,q);ty=16*q}
 if(group===20){z=shot===37?lerp(1.12,1,q):lerp(1.03,1,q)}
 return <g transform={`translate(${960+tx} ${540+ty}) rotate(${roll}) scale(${z}) translate(-960 -540)`}>{children}</g>
}

