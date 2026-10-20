import {Actor} from './Rig';
import {solveArm} from './Armature';
import {Wash,Cloud,Bench,Sky,Sea,Tree,pen} from './Paint';
import {range,hash,wave,lerp} from '../motion';

export function SailboatScene({f}:{f:number}){
 const sway=wave(f,148)*1.4;
 return <>
  <Sky f={f}/><Sea f={f} from={565}/>
  <Cloud x={380} y={232} s={1.2} f={f}/><Cloud x={1530} y={149} s={.8} f={f}/>
  <g transform={`translate(980 ${854+wave(f,98)*5}) rotate(${sway})`} {...pen} stroke="#817c76" strokeWidth="4">
   <path d="M-515 -9L-400 122Q-40 179 376 119L511 -9Z" fill="#d6b799"/>
   <path d="M-515 -9Q0 42 511 -9L446 40Q0 89 -462 38Z" fill="#fff0d5"/>
   <path d="M-438 64Q0 114 438 64" fill="none" stroke="#b4947d"/>
   <path d="M-106 3V-544" stroke="#7b746d" strokeWidth="11"/>
   <path d="M-100 -525L215 -95L-100 -80Z" fill="#fff9e4"/>
   <path d={`M-123 -461Q${-264+wave(f,150)*7} -262 -414 -91L-126 -90Z`} fill="#efc6bd"/>
   <path d="M-94 -493L181 -112M-129 -421L-379 -112" stroke="#dac8ac" strokeWidth="2.5" fill="none"/>
   <path d="M-112 -536L-57 -529L-110 -510Z" fill="#c17b8f"/>
   <path d="M-117 -85L231 -101" stroke="#8b7e70" strokeWidth="9"/>
   <path d="M-110 -536L-451 -7M-110 -536L433 -6" stroke="#b8ac97" strokeWidth="2.5"/>
   <Actor x={-282} y={113} scale={.58} f={f} pose="sit" emotion="happy" tilt={-2}/>
   <Actor girl x={207} y={107} scale={.58} f={f} pose="sit" emotion="happy" tilt={4}/>
   <path d="M-472 34Q0 88 467 33L391 109Q0 163 -400 112Z" fill="#dfc3a3"/>
   <path d="M-470 34Q0 89 466 33" fill="none" stroke="#f7e8cb" strokeWidth="9"/>
  </g>
 </>;
}

export function CloudCurtain({f,shot}:{f:number;shot:number}){
 const open=range(f,607,663),sun=range(f,651,683),left=lerp(-80,-251,open),right=lerp(80,251,open);
 return <>
  <Wash kind="day"/>
  <g opacity={1-open*.67} stroke="#8b9eae" strokeWidth="4"><path d="M120 107H1790V736H120Z" fill="#b4c6d0"/><path d="M520 107V736M940 107V736M1360 107V736M120 445H1790" stroke="#e6e3d5" strokeWidth="15"/>
   {Array.from({length:38},(_,i)=><path key={i} d={`M${151+hash(i+1)*1600} ${120+(f*3+i*51)%580}l-10 36`} stroke="#dae3de" strokeWidth="2"/>)}</g>
  <path d="M0 782H1920V1080H0Z" fill="#d4c7b4"/>
  {shot===7?<>
   <Bench y={872} w={935}/>
   <Actor x={733} y={1040} scale={.94} f={f} pose="sit" emotion="soft" tilt={6} hands={{left:[-96,-137],right:[96,-137]}}/>
   <Actor girl x={1222-137*range(f,520,568)} y={1040} scale={.94} f={f} pose="sit" emotion="soft" tilt={-7*range(f,530,581)} hands={{left:[-96,-101],right:[96,-101]}}/>
   <Cloud x={945} y={245} s={1.5} dark f={f}/>
  </>:<>
   <g opacity={sun}>
    <path d="M960 66L241 1080H1689Z" fill="#ffe6a6" opacity=".27"/>
    <path d="M951 112L697 1080H1346Z" fill="#fff3bf" opacity=".40"/>
    <g transform={`translate(960 ${lerp(-105,165,sun)})`}>
     <circle r="64" fill="#f2cc77"/><circle r="53" fill="#f7d991"/>
     {Array.from({length:12},(_,i)=><path key={i} d="M0 -84V-106" transform={`rotate(${i*30+f*.04})`} stroke="#eec47a" strokeWidth="6" strokeLinecap="round"/>)}
    </g>
   </g>
   <Actor x={680} y={984} scale={1.03} f={f} emotion={open>.6?'happy':'soft'} tilt={-3} hands={{left:[left,-140-145*open],right:[98,-140]}}/>
   <Actor girl x={1250} y={984} scale={1.03} f={f} emotion="happy" tilt={4} hands={{left:[-98,-104],right:[right,-104-145*open]}}/>
   <g transform={`translate(${-open*790} ${-open*90})`}><Cloud x={600} y={366} s={2.17} dark f={f}/></g>
   <g transform={`translate(${open*790} ${-open*90})`}><Cloud x={1310} y={357} s={2.2} dark f={f}/></g>
  </>}
 </>;
}

export function SideEmbrace({f}:{f:number}){
 const settle=range(f,778,816),breath=wave(f,105)*1.5;
 const bx=lerp(802,829,settle),gx=lerp(1110,1088,settle),s=1.02;
 const blue=solveArm([bx+100*s,1030-338*s],[gx+18*s,1030-239*s],1);
 const pink=solveArm([gx-100*s,1030-302*s],[bx-10*s,1030-232*s],-1);
 const limb=(joint:ReturnType<typeof solveArm>,girl:boolean)=><g strokeLinecap="round" strokeLinejoin="round">
  <path d={joint.path} stroke="#242127" strokeWidth="49" fill="none"/>
  <path d={joint.path} stroke={`url(#cloth-${girl?'girl':'boy'}-v8)`} strokeWidth="37" fill="none"/>
  <ellipse cx={joint.wrist[0]} cy={joint.wrist[1]} rx="20" ry="24" fill="#ffe4cc" stroke="#242127" strokeWidth="5" transform={`rotate(${joint.angle} ${joint.wrist})`}/>
 </g>;
 return <>
  <Sky f={f} night/><Sea f={f} night from={775}/>
  <path d="M0 963Q960 871 1920 963V1080H0Z" fill="#8d8794"/>
  <g transform={`translate(0 ${breath})`}>
   {limb(blue,false)}
   <Actor x={bx} y={1030} scale={s} f={f} view="side" direction={1} pose="hug" emotion="closed" tilt={3} hideArms bodyShift={40}/>
   <Actor girl x={gx} y={1030} scale={s} f={f} view="side" direction={-1} pose="hug" emotion="closed" tilt={-3} hideArms bodyShift={-40}/>
   <path d={`M${gx+56*s} ${blue.wrist[1]+2}L${blue.wrist[0]+7} ${blue.wrist[1]}`} stroke="#242127" strokeWidth="40" strokeLinecap="round"/>
   <path d={`M${gx+56*s} ${blue.wrist[1]+2}L${blue.wrist[0]+7} ${blue.wrist[1]}`} stroke="url(#cloth-boy-v8)" strokeWidth="28" strokeLinecap="round"/>
   <ellipse cx={blue.wrist[0]+7} cy={blue.wrist[1]} rx="18" ry="22" fill="#ffe4cc" stroke="#242127" strokeWidth="5"/>
   {limb(pink,true)}
  </g>
 </>;
}

export function Tandem({f}:{f:number}){
 const angle=f*.22,s=.67;
 return <>
  <Sky f={f}/><path d="M0 799Q700 696 1920 820V1080H0Z" fill="#b7c8a5"/>
  <g transform={`translate(${-f*1.8%400} 0)`}>{[0,450,900,1350,1800,2250].map(x=><Tree key={x} x={x} y={869} s={.7} f={f} pink/>)}</g>
  <path d="M0 950H1920V1080H0Z" fill="#e8d9bc"/>
  <g {...pen} stroke="#5e7184" fill="none" strokeWidth="7">
   {[480,1360].map(x=><g key={x}><circle cx={x} cy="920" r="111" fill="#eee7d4"/><circle cx={x} cy="920" r="96" strokeWidth="2"/>{Array.from({length:14},(_,i)=><path key={i} d={`M${x} 920h103`} strokeWidth="1.8" transform={`rotate(${i*360/14+f*5} ${x} 920)`}/>)}</g>)}
   <path d="M480 920L720 788L776 874L480 920M720 788H1140L1195 874H776L1140 788L1360 920M776 874L1140 788M1360 920L1284 730" stroke="#7f9caa" strokeWidth="12"/>
   <path d="M720 788L705 752M1140 788L1128 752M1245 726H1325M824 750H895" stroke="#596772" strokeWidth="9"/>
   <path d="M679 751H742M1104 751H1167" stroke="#514b55" strokeWidth="15"/>
   <path d="M824 751L847 799" stroke="#7f9caa" strokeWidth="8"/>
   <path d="M776 874L1195 874" stroke="#5c6571" strokeWidth="4"/>
  </g>
  <Actor girl x={720} y={885} scale={s} f={f} pose="cycle" pedal={angle} view="side" direction={1} emotion="happy"/>
  <Actor x={1140} y={885} scale={s} f={f} pose="cycle" pedal={angle} view="side" direction={1} emotion="happy"/>
  {[776,1195].map((x,i)=><g key={i} transform={`translate(${x} ${885-17*s}) rotate(${angle*180/Math.PI})`} stroke="#5f6771" strokeWidth="5"><circle r="11" fill="#99acb1"/><path d={`M${-37*s} 0H${37*s}`}/><path d={`M${-37*s-11} -3h22M${37*s-11} 3h22`} strokeWidth="7"/></g>)}
 </>;
}

/** Clear second beat after the swing: resting together on a cloud bench. */
export function CloudRest({f}:{f:number}){
 return <>
  <Sky f={f}/><Cloud x={340} y={554} s={2.0} f={f}/><Cloud x={1530} y={719} s={2.1} f={f}/>
  <Cloud x={960} y={905} s={3.9} f={f}/>
  <Bench y={872} w={670}/>
  <Actor x={818} y={1030} scale={.85} f={f} pose="sit" emotion="happy" tilt={3} hands={{left:[-96,-137],right:[96,-137]}}/>
  <Actor girl x={1105} y={1030} scale={.85} f={f} pose="sit" emotion="happy" tilt={-7} hands={{left:[-96,-101],right:[96,-101]}}/>
 </>;
}
