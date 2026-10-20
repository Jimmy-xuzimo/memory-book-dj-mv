import {Actor,Pair} from './Rig';
import {Wash,Sky,Cloud,Tree,Sea,Petals,pen} from './Paint';
import {range,clamp,wave,lerp} from '../motion';

export const memoryNames=['摩天轮的黄昏','偷偷分享爆米花','一起吃晚饭','雨中同一把伞','单车后的微风','海边的合影'];

// Six authored scenes, reused as moving memories in the montage and photographed film.
export function SweetPanel({variant,f}:{variant:number;f:number}){
 const v=((variant%6)+6)%6;
 if(v===0)return <>
  <Sky f={f} sunset/>
  <g transform={`translate(700 510) rotate(${f*.09})`} stroke="#9b808e" fill="none" strokeWidth="8">
   <circle r="450"/><circle r="422" strokeWidth="3"/>
   {Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30})`}><path d="M0 0V-450" strokeWidth="4"/><g transform={`translate(0 -450) rotate(${-i*30-f*.09})`}><rect x="-46" y="-9" width="92" height="84" rx="19" fill={i%2?'#e4b0b8':'#aac8cf'}/><path d="M-35 0H35V43H-35Z" fill="#f7e8cd" strokeWidth="3"/></g></g>)}
  </g>
  <path d="M630 535L440 1080M745 535L936 1080" stroke="#b49b9a" strokeWidth="22"/>
  <g transform={`translate(${wave(f,160)*5} ${wave(f,180)*4})`}>
   <path d="M573 655Q560 552 670 531H1430Q1522 558 1510 655V1043H574Z" fill="#e9b1bc" {...pen}/>
   <path d="M615 658H1464V945H615Z" fill="#f9e6c9" stroke="#a8878e" strokeWidth="5"/>
   <Actor x={864} y={1117} scale={.86} f={f} pose="sit" emotion="shy" tilt={4}/>
   <Actor girl x={1222} y={1111} scale={.86} f={f} pose="sit" emotion="happy" tilt={-9} lean={-3}/>
   <path d="M575 935H1510V1060H575Z" fill="#e7a6b5" stroke="#9f7f89" strokeWidth="5"/>
   <path d="M575 935H1510M1044 569V642" stroke="#f6dfce" strokeWidth="10"/>
   <circle cx="1044" cy="1000" r="24" fill="#f5d69c"/>
  </g>
  <Cloud x={1550} y={225} s={1.2} f={f}/>
 </>;
 if(v===1)return <>
  <Wash kind="night"/>
  <path d="M240 35H1710V324H240Z" fill="#d5decc" stroke="#7a7189" strokeWidth="13"/>
  <path d="M720 324L1130 324L1720 1000H200Z" fill="#e9e1be" opacity=".10"/>
  <g opacity=".4" transform="translate(0 5)"><Cloud x={520} y={160} s={.6} f={f}/><Cloud x={1430} y={190} s={.8} f={f}/></g>
  {[0,1,2].map(r=><g key={r} fill={r===2?'#805365':'#654a64'} stroke="#493c55" strokeWidth="5">{Array.from({length:9},(_,i)=><rect key={i} x={-70+i*245} y={405+r*240} width="210" height="215" rx="38"/>)}</g>)}
  <Actor x={723} y={1125} scale={1.05} f={f} pose="offer" emotion="happy" tilt={3} hands={{right:[190,-225],left:[-60,-160]}}/>
  <Actor girl x={1247} y={1120} scale={1.05} f={f} pose="offer" emotion="shy" tilt={-5} hands={{left:[-215,-190],right:[25,-170]}}/>
  <g transform="translate(978 855)" {...pen}><path d="M-97 -28H95L67 154H-65Z" fill="#faeed9"/>{[-60,-20,20,60].map(x=><path key={x} d={`M${x} -25L${x*.7} 152`} stroke="#d595a4" strokeWidth="20"/>)}
   {Array.from({length:14},(_,i)=><path key={i} d="M-19 2Q-31 -18 -11 -26Q-9 -46 9 -31Q29 -36 26 -14Q40 6 14 12Z" transform={`translate(${-72+(i%5)*36} ${-22-Math.floor(i/5)*22}) scale(.66)`} fill="#f7dfa2" stroke="#c8a975" strokeWidth="2"/>)}
  </g>
 </>;
 if(v===2)return <>
  <Wash kind="pink"/>
  <g {...pen} stroke="#a18c85"><path d="M90 60H1740V647H90Z" fill="#b5cbd0"/>
   <path d="M90 437H1740V647H90Z" fill="#748299"/>
   {[0,1,2,3,4,5,6,7,8].map(i=><g key={i}><path d={`M${140+i*177} 646V${342+(i%3)*36}h120V647Z`} fill="#728096"/>
    <path d={`M${160+i*177} 409h20v28h-20Zm44 59h21v28h-21Z`} fill="#f3d497" strokeWidth="0"/></g>)}
   <path d="M90 60H1740V647H90ZM640 60V647M1190 60V647" stroke="#ecddc5" strokeWidth="18" fill="none"/>
  </g>
  {[550,1390].map(x=><g key={x}><path d={`M${x} 0V139`} stroke="#8d747b" strokeWidth="5"/><path d={`M${x-100} 220Q${x-85} 110 ${x} 114Q${x+86} 108 ${x+105} 220Z`} fill="#edce9d" stroke="#ab8d7d" strokeWidth="4"/></g>)}
  <Actor x={590} y={1140} scale={1.02} f={f} pose="offer" emotion="happy" tilt={3} hands={{right:[218,-240]}}/>
  <Actor girl x={1375} y={1135} scale={1.02} f={f} pose="offer" emotion="happy" tilt={-5} hands={{left:[-220,-240]}}/>
  <g {...pen} stroke="#9c7c67"><path d="M305 864H1604L1770 1080H151Z" fill="#e2bea1"/>
   {[600,1300].map(x=><g key={x}><ellipse cx={x} cy="962" rx="150" ry="49" fill="#fff3db"/><ellipse cx={x} cy="951" rx="100" ry="30" fill="#dba976"/>
    <path d={`M${x-63} 949q40 -55 75 -9m-49 11q59 -40 80 -1`} fill="none" stroke="#f6dc99" strokeWidth="10"/></g>)}
   <path d="M912 880h94l-8 119h-77Z" fill="#f3d1b2"/>
  </g>
 </>;
 if(v===3)return <>
  <Wash kind="day"/>
  <path d="M0 803Q800 693 1920 790V1080H0Z" fill="#b4bdc7"/>
  <Tree x={211} y={960} s={1.3} f={f} pink/><Tree x={1740} y={930} s={1.2} f={f}/>
  <Pair x={959} y={1040} s={1.04} f={f} hold emotion="shy" gap={380} tilt={3}/>
  <g transform={`rotate(${wave(f,150)} 960 380)`} {...pen}><path d="M426 404Q535 48 960 84Q1391 41 1494 404Q1382 346 1282 406Q1173 348 1062 407Q953 348 853 405Q740 346 637 404Q530 346 426 404Z" fill="#e6b0bc"/><path d="M960 87V709Q958 776 1021 768" fill="none" stroke="#8b747e" strokeWidth="10"/>
   <path d="M960 90Q763 163 639 399M960 90Q1170 180 1284 401" fill="none" stroke="#b78d9f" strokeWidth="3"/>
  </g>
  {Array.from({length:35},(_,i)=><path key={i} d={`M${(i*131+f*2)%1980} ${(i*97+f*8)%1120-70}l-11 35`} stroke="#c5d8df" strokeWidth="3" opacity=".6"/>)}
 </>;
 if(v===4)return <>
  <Sky f={f}/><path d="M0 799Q700 696 1920 820V1080H0Z" fill="#b7c8a5"/>
  <g transform={`translate(${-f*1.8%400} 0)`}>{[0,450,900,1350,1800,2250].map(x=><Tree key={x} x={x} y={869} s={.7} f={f} pink/>)}</g>
  <path d="M0 950H1920V1080H0Z" fill="#e8d9bc"/>
  <Actor x={1040} y={947} scale={.83} f={f} pose="sit" view="side" direction={1} emotion="happy"/>
  <Actor girl x={716} y={938} scale={.8} f={f} pose="hug" emotion="happy" tilt={6}/>
  <g {...pen} stroke="#596c80" fill="none" strokeWidth="7">
   {[642,1177].map(x=><g key={x}><circle cx={x} cy="963" r="106" fill="#e9e7d2"/>{Array.from({length:10},(_,i)=><path key={i} d={`M${x} 963h100`} strokeWidth="2" transform={`rotate(${i*36+f*4} ${x} 963)`}/>)}</g>)}
   <path d="M642 963L820 791L991 962L642 963L752 789M820 791H1081L991 962M1177 963L1070 728H1014M708 784H838" stroke="#8c9fab" strokeWidth="13"/>
   <path d="M1038 725L1105 689"/>
  </g>
 </>;
 return <>
  <Sky f={f} sunset/><Sea f={f} from={570}/><path d="M0 889Q900 771 1920 893V1080H0Z" fill="#ead6b8"/>
  <Pair x={960} y={1000} s={.99} f={f} hold emotion="happy" tilt={4}/>
  <Petals f={f} n={5}/>
 </>;
}

export function SweetMontage({f}:{f:number}){
 const local=clamp(f-408,0,97),index=Math.min(5,Math.floor(local/16)),part=local-index*16;
 // The cabin window, cinema screen, table edge and umbrella become moving scene apertures.
 const opening=range(part,0,5),z=lerp(1.025,1.10,range(part,0,16));
 return <>
  <g transform={`translate(960 540) scale(${z}) translate(-960 -540)`}><SweetPanel variant={index} f={f}/></g>
  {part<5&&index>0&&<>
   <defs><clipPath id="v5-memory-sweep"><path d={`M${1920-opening*2320} -100Q${1650-opening*2400} 540 ${2020-opening*2400} 1180H2200V-100Z`}/></clipPath></defs>
   <g><SweetPanel variant={index-1} f={f}/></g>
   <g clipPath="url(#v5-memory-sweep)"><SweetPanel variant={index} f={f}/></g>
  </>}
 </>;
}

export function FilmRoll({f}:{f:number}){
 const t=clamp(f-1563,0,47),index=Math.min(5,Math.floor(t/8)),phase=t-index*8;
 const next=index===5?0:range(phase,4,8),offset=(index+next)*1130;
 return <>
  <Wash kind="cream"/>
  <g transform={`translate(960 490) rotate(${-4+range(f,1563,1611)*5})`}>
   <rect x="-1450" y="-365" width="2900" height="790" fill="#302e38" rx="20"/>
   <svg x="-900" y="-360" width="1800" height="780" viewBox="0 0 1800 780" overflow="hidden">
    <g transform={`translate(${375-offset} 0)`}>
     {Array.from({length:6},(_,i)=><g key={i} transform={`translate(${i*1130} 0)`}>
      <svg x="0" y="87" width="1050" height="590" viewBox="0 0 1920 1080" overflow="hidden"><SweetPanel variant={i%6} f={60+i*31}/></svg>
      <rect x="0" y="87" width="1050" height="590" fill="none" stroke="#80725d" strokeWidth="5"/>
      {Array.from({length:16},(_,h)=><g key={h} fill="#f8efd9"><rect x={h*70+5} y="18" width="37" height="45" rx="5"/><rect x={h*70+5} y="704" width="37" height="45" rx="5"/></g>)}
      <text x="20" y="778" fill="#cfbd8c" fontFamily="KaiTi,serif" fontSize="22">{String(i+1).padStart(2,'0')} · OUR DAYS</text>
     </g>)}
    </g>
   </svg>
  </g>
  <path d="M87 70L160 55V125H90ZM1815 890H1880V1015H1805Z" fill="#c8b9a5" opacity=".5"/>
 </>;
}
