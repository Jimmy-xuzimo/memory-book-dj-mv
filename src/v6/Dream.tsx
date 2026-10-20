import {Pair} from './Rig';
import {School,Sky,Wash,Cloud,Tree,Sea,pen} from './Paint';
import {range,clamp,hash,wave} from '../motion';

export const dreamPlaces=['学校','家庭','公司','城市','旅行'];
export function FutureBackground({index,f}:{index:number;f:number}){
 if(index===0)return <School f={f}/>;
 if(index===1)return <>
  <Wash kind="cream"/>
  <path d="M0 815H1920V1080H0Z" fill="#dac5b2"/>
  <g {...pen} stroke="#aa8d83">
   <path d="M250 588Q230 520 310 514H1590Q1667 516 1652 590V859H250Z" fill="#e5b7b9"/>
   <path d="M282 648H1623V840H282Z" fill="#f1cdd0"/><path d="M705 522V833M1207 522V833" fill="none"/>
   <path d="M203 645Q140 592 138 671V873H329V687Q331 630 278 644M1605 648Q1712 592 1732 673V873H1578V688Q1575 640 1605 648" fill="#dfadb5"/>
   <path d="M343 868V921M1536 868V921" strokeWidth="12"/>
   <path d="M1673 461V873M1583 461H1761L1720 327H1626Z" fill="#edcf98" strokeWidth="4"/>
   <path d="M220 366H422V467H220Z" fill="#f6e9cc"/><path d="M237 447L280 407L323 435L368 393L408 447" fill="#b3c6ad"/>
  </g>
  <Tree x={1770} y={923} s={.56} f={f}/>
 </>;
 if(index===2)return <>
  <Sky f={f}/>
  <path d="M60 275H1860V783H60Z" fill="#c4d9dd" stroke="#a2afb5" strokeWidth="5"/>
  {[0,1,2,3,4,5].map(i=><g key={i}><path d={`M${130+i*300} 294v480`} stroke="#f5eddd" strokeWidth="13"/><path d={`M${100+i*300} 772V${440+(i%3)*53}h163v330Z`} fill="#9db2c1" opacity=".44"/></g>)}
  <path d="M0 784H1920V1080H0Z" fill="#d7d0c0"/>
  {[370,1490].map(x=><g key={x} {...pen} stroke="#8c8991"><path d={`M${x-220} 725H${x+220}v43H${x-220}Z`} fill="#d5b698"/><path d={`M${x-192} 770v165m384-165v165`} strokeWidth="13"/><rect x={x-100} y="531" width="190" height="142" rx="9" fill="#8d9eae"/><path d={`M${x-83} 545h157v109H${x-83}Z`} fill="#d1e7df"/><path d={`M${x-10} 676v47m-55 0h108`} strokeWidth="8"/></g>)}
  <Cloud x={1370} y={165} s={.8} f={f}/>
 </>;
 if(index===3)return <>
  <Sky f={f}/>
  {[0,1,2].map(layer=><g key={layer} opacity={.5+layer*.22}>{Array.from({length:10},(_,i)=>{
   const x=i*218-80+layer*53,h=230+hash(i+layer*19)*340,y=810-h;
   return <g key={i} {...pen} stroke="#899ba8" strokeWidth="2"><path d={`M${x} 810V${y}h157V810Z`} fill={['#c9d6d9','#afc3cf','#adc2c8'][layer]}/>{Array.from({length:4},(_,r)=><path key={r} d={`M${x+26} ${y+42+r*48}h105`} stroke="#eaf0dd" strokeWidth="12"/>)}</g>;
  })}</g>)}
  <path d="M0 838Q960 793 1920 838V1080H0Z" fill="#d5d0bd"/><path d="M0 1005H1920" stroke="#f7eed4" strokeWidth="35"/>
  <Tree x={135} y={951} s={.63} f={f} pink/><Tree x={1760} y={944} s={.68} f={f} pink/>
 </>;
 return <>
  <Sky f={f}/><Sea f={f} from={695}/>
  <path d="M0 698L271 267L585 694L916 307L1220 697L1481 389L1920 700Z" fill="#b4cbd3"/>
  <path d="M174 423L271 267L386 426L318 402L270 445L225 401ZM805 452L916 307L1031 464L944 432L904 468L864 431Z" fill="#faf2e0"/>
  <path d="M0 911Q960 746 1920 911V1080H0Z" fill="#ddcaaa"/>
  <g {...pen} stroke="#977e7e" strokeWidth="5" fill="none"><path d="M1530 823L1640 310L1744 823M1593 542H1681M1563 674H1711M1540 792Q1640 682 1736 792"/><path d="M1612 477H1665M1618 434H1658" strokeWidth="13"/></g>
  <g transform={`translate(${428+wave(f,130)*9} 385)`} {...pen} stroke="#b18a96"><path d="M-84 0Q-147 -184 0 -199Q143 -184 84 0L33 71H-34Z" fill="#e2b2bf"/><path d="M0 -199Q-52 -126 -26 23M0 -199Q50 -125 27 23" fill="none"/><path d="M-32 72L-25 106H26L33 72Z" fill="#d5b593"/></g>
 </>;
}

/** The couple remains at identical screen coordinates through all five places. */
export function DreamMemory({f}:{f:number}){
 if(f>=1881)return null;
 const local=clamp(f-1756,0,94),index=Math.min(4,Math.floor(local/17));
 const dissolve=range(f,1840,1881),phase=local%17;
 return <>
  <defs><mask id="v6-dream-disperse"><rect width="1920" height="1080" fill="white"/>
   {dissolve>0&&Array.from({length:264},(_,i)=>{
    const col=i%22,row=Math.floor(i/22),age=clamp((dissolve-hash(i+91)*.32)/.68);
    return <rect key={i} x={col*89-10} y={row*92-10} width="112" height="115" rx={age*24} fill="black" opacity={age}/>;
   })}
  </mask></defs>
  <g opacity={1-dissolve} mask="url(#v6-dream-disperse)">
   <FutureBackground index={index} f={f}/>
   {phase<4&&index>0&&dissolve===0&&<g opacity={1-phase/4}><FutureBackground index={index-1} f={f}/></g>}
   <Pair x={960} y={1004} s={.84} f={f} gap={410} hold emotion="happy"/>
  </g>
  {dissolve>0&&Array.from({length:42},(_,i)=>{
   const q=clamp((dissolve-hash(i)*.36)/.64),x=hash(i+18)*1920,y=hash(i+44)*1050;
   return <path key={i} d="M-9 -7L10 -8L8 7L-8 9Z" fill={['#dcc7b1','#c1d3d9','#e5bec4'][i%3]} transform={`translate(${x+q*(hash(i+9)-.5)*160} ${y-q*130}) rotate(${q*(hash(i+61)-.5)*220}) scale(${(1-q)*1.5})`} opacity={Math.sin(q*Math.PI)*.54}/>;
  })}
 </>;
}
