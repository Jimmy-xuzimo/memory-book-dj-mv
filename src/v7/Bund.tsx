import {Actor} from './Rig';
import {Wash,Stars,Cloud} from './Paint';
import {range,lerp,hash,wave,clamp} from '../motion';

/** A layered paper-cut interpretation of the Bund, river and Lujiazui skyline. */
export function BundNight({f}:{f:number;shot?:number}){
 const progress=clamp(f/90),travel=progress<.8?progress/.8*.86:.86+.14*range(progress,.8,1);
 const x=lerp(740,1000,travel),turn=range(f,90,112),rain=range(f,145,170);
 const profile=turn<.5,turnWidth=profile?Math.max(.08,1-turn*2):Math.max(.08,(turn-.5)*2);
 return <>
  <Wash kind="night"/><rect width="1920" height="1080" fill="#14283f" opacity=".47"/>
  <Stars f={f} n={40}/><circle cx="1735" cy="132" r="37" fill="#e6dec4" opacity=".66"/>
  <g fill="#2e415d" stroke="#52617b" strokeWidth="2">
   {Array.from({length:42},(_,i)=>{const bx=i*49-40,h=100+hash(i+4)*220;return <path key={i} d={`M${bx} 608V${608-h}l32 -6l16 15V608Z`}/>})}
  </g>
  {/* Dense cut-paper buildings behind the four characteristic silhouettes. */}
  {Array.from({length:26},(_,i)=>{const bx=i*79-50,h=110+hash(i+43)*235,bw=55+hash(i+7)*25,by=608-h;return <g key={i}>
   <path d={`M${bx} 608V${by}l${bw*.7} -7l${bw*.3} 15V608Z`} fill={i%2?'#354963':'#293e58'} stroke="#65728b" strokeWidth="1.6"/>
   <path d={`M${bx+bw*.7} ${by-7}V608H${bx+bw}V${by+8}Z`} fill="#21354f"/>
   {Array.from({length:Math.floor(h/21)-1},(_,j)=><g key={j}>{[0,1,2].map(k=><rect key={k} x={bx+8+k*13} y={by+15+j*21} width="6" height="10" fill={hash(i*63+j*7+k)>.4?'#e5c68d':'#7496b0'} opacity={.25+hash(i*17+j+k)*.5}/>)}</g>)}
  </g>})}
  {/* Oriental Pearl: needle, two spheres, lattice support legs. */}
  <g transform="translate(862 0)" stroke="#8595ab" strokeWidth="2.5" strokeLinejoin="round">
   <path d="M-14 603L-11 367H11L16 603Z" fill="#aeb5bd"/>
   <path d="M-51 605L-16 382M51 605L16 382M-35 602L0 445L35 602" fill="none" stroke="#afafba" strokeWidth="9"/>
   <path d="M-7 340V210H7V340M-3 188V109" stroke="#adb6c9" strokeWidth="7"/>
   <ellipse cy="208" rx="27" ry="25" fill="#c58ca3"/><ellipse cy="354" rx="55" ry="49" fill="#c59aaf"/>
   <path d="M-50 340Q0 317 50 340M-52 356Q0 379 52 356M-43 379Q0 397 43 379M-24 200Q0 190 24 200" fill="none" stroke="#f1c5c6" strokeWidth="3"/>
   <path d="M-29 316L-15 394M0 307V402M29 316L15 394" fill="none" stroke="#d7b8c7" strokeWidth="2"/>
   <path d="M-64 607Q0 565 64 607" fill="#8998aa"/>
  </g>
  {/* World Financial Center: trapezoid opening; Jin Mao: stacked crown. */}
  <g stroke="#7e96ad" strokeWidth="2.5">
   <path d="M1170 605L1198 174L1299 151L1312 605Z" fill="#354e6c"/>
   <path d="M1212 188L1281 174L1284 234L1210 241Z" fill="#1e314b" stroke="#c5c8c6" strokeWidth="5"/>
   <path d="M1198 261L1286 249M1189 379L1295 370M1181 489L1301 483" stroke="#d4c49f" strokeWidth="3"/>
   {Array.from({length:9},(_,i)=><path key={i} d={`M${1201-i*2} ${276+i*32}L${1290+i} ${268+i*32}`} stroke="#8ba8bb" opacity=".55"/>)}
   <path d="M1351 606V336H1363V303H1378V278H1390V247H1398V219H1406V248H1417V278H1432V303H1448V336H1460V606Z" fill="#586782"/>
   {[350,374,399,424,450,476,503,531,560,589].map(y=><path key={y} d={`M1355 ${y}H1457`} stroke="#e7cc9f" strokeWidth="3" opacity=".65"/>)}
  </g>
  {/* Shanghai Tower: taper and a twisting facade, a clear highest point. */}
  <g stroke="#8eabc2" strokeWidth="3">
   <path d="M1502 605Q1539 389 1513 176Q1510 109 1546 73Q1608 92 1631 152Q1660 374 1624 605Z" fill="#3e5876"/>
   <path d="M1515 177Q1571 132 1631 152M1509 262Q1573 229 1640 248M1513 352Q1576 317 1641 336M1511 446Q1576 412 1637 429M1508 535Q1571 510 1629 519" fill="none" stroke="#9db4bf" strokeWidth="2.2"/>
   <path d="M1546 73Q1596 302 1544 605M1581 91Q1640 325 1592 605" fill="none" stroke="#c0c7c8" opacity=".55"/>
  </g>
  <path d="M0 607Q960 596 1920 608V640H0Z" fill="#21384e"/>
  <path d="M0 615H1920" stroke="#e5c48e" strokeWidth="3" opacity=".8"/>
  {/* The full river separates the skyline from the foreground promenade. */}
  <path d="M0 624H1920V922H0Z" fill="#27445c"/>
  {Array.from({length:108},(_,i)=>{const bx=hash(i+56)*1920,by=635+hash(i+89)*283,w=10+hash(i)*94;return <path key={i} d={`M${bx+wave(f,150,i)*8} ${by}h${w}`} stroke={['#d5a4a2','#dbc08c','#8aafc5','#728caa'][i%4]} strokeWidth={1+hash(i+9)*3.2} opacity={.10+hash(i+31)*.26}/>})}
  <g transform={`translate(${265+f*.42} 746)`}>
   <path d="M-91 -2H106L83 21H-65Z" fill="#172e42" stroke="#a7a99e" strokeWidth="2"/>
   <path d="M-55 -31H60V-4H-55Z" fill="#617b8b"/>
   {[-38,-12,14,40].map(xx=><path key={xx} d={`M${xx} -22h15v9h-15Z`} fill="#ecd59f"/>)}
  </g>
  <path d="M0 914L1920 899V1080H0Z" fill="#343d49"/>
  <path d="M0 1036L1920 1019M310 1080L707 916M1380 1080L1220 908" stroke="#59616a" strokeWidth="2"/>
  <g stroke="#8c979e" fill="none">
   <path d="M-20 944L1940 925M-20 989L1940 970" strokeWidth="7"/>
   {Array.from({length:29},(_,i)=><path key={i} d={`M${i*70} ${944-i*.69}V${1023-i*.69}`} strokeWidth="6"/>)}
   <path d="M-20 938L1940 919" stroke="#c0b8aa" strokeWidth="8"/>
  </g>
  <g transform={`translate(${x} 1008) scale(${turnWidth} 1)`}>
   <Actor x={0} y={0} scale={.32} f={f} view={profile?'side':'back'} direction={1} walk={f<90} distance={(x-740)/.32} tilt={turn>0?-1:0} hands={!profile?{left:[-110,-215],right:[110,-215]}:undefined}/>
  </g>
  {/* One cloud arrives, then heavy local rain falls around the small silhouette. */}
  <g opacity={range(f,112,137)} style={{filter:'brightness(.55)'}}>
   <Cloud x={lerp(1640,1000,range(f,112,147))} y={235} s={1.35} f={f} dark/>
  </g>
  <g opacity={rain} strokeLinecap="round">
   {Array.from({length:170},(_,i)=>{const xx=776+hash(i+70)*464,yy=310+((f*20+i*47)%720);return <path key={i} d={`M${xx} ${yy}l-6 ${17+hash(i)*21}`} stroke="#a6c8d9" strokeWidth={1+hash(i+4)*1.3} opacity={.35+hash(i+8)*.4}/>})}
   {Array.from({length:13},(_,i)=><ellipse key={i} cx={870+hash(i+22)*255} cy={1015+hash(i+50)*20} rx={3+((f+i*7)%17)*.4} ry="1.4" fill="none" stroke="#acc9d2" opacity={1-((f+i*7)%17)/17}/>)}
  </g>
 </>;
}
