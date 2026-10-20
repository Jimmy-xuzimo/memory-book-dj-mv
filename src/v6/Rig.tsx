import {staticFile} from 'remotion';
import {wave, range, clamp} from '../motion';
import {solveArm} from './Armature';

export type Emotion='soft'|'happy'|'sad'|'wonder'|'closed'|'shy';
export type Pose='idle'|'wave'|'reach'|'hold'|'hug'|'phone'|'sit'|'lift'|'offer'|'point'|'chest';
type Props={girl?:boolean;x?:number;y?:number;scale?:number;f:number;walk?:boolean;emotion?:Emotion;pose?:Pose;view?:'front'|'side'|'back';direction?:1|-1;tilt?:number;lean?:number;opacity?:number;phase?:number;arm?:number;look?:number;distance?:number;hands?:{left?:[number,number];right?:[number,number]}};
const ink='#242127',skin='#ffe4cc';

export function RigDefs(){return <defs>
  <pattern id="cloth-boy-v6" width="180" height="210" patternUnits="userSpaceOnUse"><image href={staticFile('v4/boy-cloth.png')} width="180" height="210" preserveAspectRatio="none"/></pattern>
  <pattern id="cloth-girl-v6" width="180" height="210" patternUnits="userSpaceOnUse"><image href={staticFile('v4/girl-cloth.png')} width="180" height="210" preserveAspectRatio="none"/></pattern>
  <pattern id="pants-v6" width="95" height="140" patternUnits="userSpaceOnUse"><rect width="95" height="140" fill="#30313c"/><path d="M5 0L7 140M81 0L78 140" stroke="#525365" strokeWidth="2" opacity=".22"/></pattern>
</defs>}

// Raster identity and original paint texture stay rigid. SVG joints provide deterministic acting.
// Every profile uses its own source crop; opposite profile hides the far-side clip.
export function Actor({girl=false,x=0,y=0,scale=1,f,walk=false,emotion='soft',pose='idle',view='front',direction=-1,tilt=0,lean=0,opacity=1,phase=0,arm,look=0,hands,distance}:Props){
 const who=girl?'girl':'boy',cloth=`url(#cloth-${who}-v6)`;
 const g=girl,side=view==='side',back=view==='back';
 const cycle=(distance!==undefined?distance/140:(f+phase)/30)*Math.PI*2,step=Math.sin(cycle);
 const bob=walk?-3.8*(1-Math.cos(cycle*2))/2:wave(f+phase,116)*1.3;
 const sit=pose==='sit'||pose==='phone';
 const top=g?-660:-700,hh=g?330:325,hw=g?411:379;
 const neck=g?-347:-389,hip=g?-157:-161;
 const blink=(f+phase+(g?47:0))%139<5;
 const htilt=tilt+wave(f+phase-5,140)*.7+(walk?Math.sin(cycle-.24)*.8:0);
 const shoulder=g?-302:-338;
 let la=walk?-step*22:wave(f-5,116)*1.1,ra=walk?step*22:-wave(f-9,116)*1.1;
 if(pose==='wave'){ra=-151+Math.sin(f/10)*8;la=3}
 if(pose==='lift'){la=145;ra=-145}
 if(pose==='reach'){la=12;ra=-81}
 if(pose==='offer'){la=106;ra=-106}
 if(pose==='point'){la=8;ra=-112}
 if(pose==='hug'){la=73;ra=-71}
 if(pose==='hold'){la=g?40:0;ra=g?0:-32}
 if(pose==='phone'){la=53;ra=-55}
 if(pose==='chest'){la=62;ra=-61}
 if(arm!==undefined)ra=arm;
 const leg=(right:boolean)=>{
  const lx=(right?1:-1)*(side?24:43),leglen=g?146:161;
  const theta=walk?(right?-step:step)*23:sit?(side?direction*68:0):0;
  const lift=walk?Math.max(0,(right?step:-step))*7:0;
  if(walk&&distance!==undefined){
   const u=((distance/140+(right?.5:0))%1+1)%1;
   const swing=u>=.6,v=swing?(u-.6)/.4:u/.6;
   const fx=lx+direction*(swing?-42+84*range(v,0,1):42-84*v);
   const fy=-bob-(swing?Math.sin(v*Math.PI)*31:0);
   const ky=hip*.48-(swing?13:0),kx=(lx+fx)/2+direction*(swing?25:13);
   const legpath=`M${lx} ${hip}Q${kx} ${ky} ${fx} ${fy-23}`;
   return <g strokeLinecap="round" strokeLinejoin="round">
    <path d={legpath} stroke={ink} strokeWidth={g?32:57} fill="none"/>
    <path d={legpath} stroke={g?skin:'#32333f'} strokeWidth={g?22:44} fill="none"/>
    {g&&<path d={`M${fx} ${fy-61}L${fx} ${fy-22}`} stroke="#fffaf1" strokeWidth="24"/>}
    <g transform={`translate(${fx} ${fy})`}><path d="M-32 -26Q-51 -20 -50 1Q-43 13 38 10Q49 3 41 -18L20 -28Z" fill="#fcf8ef" stroke={ink} strokeWidth="7"/><path d="M-39 -16Q-7 -26 33 -16L39 -3H-44Z" fill="#30333e" stroke={ink} strokeWidth="2"/><path d="M-19 -22L8 -13M-25 -14L1 -5" stroke="#fff7e8" strokeWidth="6"/></g>
   </g>
  }
  if(sit&&side){const dx=direction*77;return <g transform={`translate(${lx} ${hip})`}>
   <path d={`M-25 -3Q${dx*.5} -22 ${dx} 11Q${dx+25} 24 ${dx+24} 54L${dx+23} ${leglen-21}H${dx-26}L${dx-28} 48Q${dx*.5} 54 -26 35Z`} fill={g?skin:'url(#pants-v6)'} stroke={ink} strokeWidth="6"/>
   {g&&<path d={`M${dx-25} ${leglen-54}H${dx+24}V${leglen-21}H${dx-25}Z`} fill="#fffaf2" stroke={ink} strokeWidth="4"/>}
   <path d={`M${dx-28} ${leglen-25}Q${dx-55} ${leglen-20} ${dx-55} ${leglen+2}Q${dx} ${leglen+19} ${dx+43} ${leglen+8}L${dx+36} ${leglen-21}Z`} fill="#fcf7ef" stroke={ink} strokeWidth="7"/>
   <path d={`M${dx-45} ${leglen-7}H${dx+37}`} stroke={ink} strokeWidth="7"/>
  </g>}
  return <g transform={`translate(${lx} ${hip-lift}) rotate(${theta})`}>
   <path d={sit?`M-29 -3Q-45 11 -37 41L-26 ${leglen-24}Q0 ${leglen-19} 28 ${leglen-24}L35 41Q41 11 26 -3Z`:`M-27 -4Q-30 ${leglen*.4} -27 ${leglen-23}Q0 ${leglen-17} 29 ${leglen-23}L27 -3Z`} fill={g?skin:'url(#pants-v6)'} stroke={ink} strokeWidth="6"/>
   {sit&&!g&&<path d="M-30 42Q0 30 29 43" fill="none" stroke="#64616d" strokeWidth="3" opacity=".6"/>}
   {g&&<path d={`M-26 ${leglen-55}L28 ${leglen-55}L29 ${leglen-20}L-27 ${leglen-20}Z`} fill="#fffaf2" stroke={ink} strokeWidth="4"/>}
   <path d={`M-28 ${leglen-26}Q-52 ${leglen-20} -54 ${leglen-2}Q-51 ${leglen+9} -29 ${leglen+11}L38 ${leglen+10}Q52 ${leglen+7} 44 ${leglen-10}Q40 ${leglen-25} 23 ${leglen-28}Z`} fill="#fdfaf4" stroke={ink} strokeWidth="7"/>
   <path d={`M-40 ${leglen-15}Q-5 ${leglen-27} 34 ${leglen-17}L40 ${leglen-4}L-47 ${leglen-3}Z`} fill="#30323d" stroke={ink} strokeWidth="3"/>
   <path d={`M-17 ${leglen-22}L7 ${leglen-15}M-26 ${leglen-16}L-2 ${leglen-9}`} stroke="#fffaf0" strokeWidth="6" strokeLinecap="round"/>
  </g>
 };
 const sleeve=(right:boolean,a:number)=>{
  const sign=right?1:-1,sx=sign*(side?62:79);
  let hx=sx-Math.sin(a*Math.PI/180)*(walk?198:169),hy=shoulder+Math.cos(a*Math.PI/180)*(walk?198:169);
  if(pose==='offer'){hx=right?(g?sx+19:230):(g?-218:sx-19);hy=shoulder+(right?(g?198:72):(g?81:198));}
  if(pose==='phone'){hx=right?29:-25;hy=neck+167;}
  if(pose==='chest'){hx=right?-22:28;hy=neck+(right?167:144);}
  if(pose==='sit'){hx=sign*102;hy=shoulder+183;}
  if(pose==='wave'&&right){hx=216+Math.sin(f/9)*12;hy=shoulder-105;}
  if(pose==='lift'){hx=sign*215;hy=shoulder-140;}
  if(pose==='hold'){hx=right?(g?sx+19:195):(g?-205:sx-19);hy=right?(g?shoulder+198:-171):(g?-164:shoulder+198);}
  if(pose==='point'&&right){hx=239;hy=shoulder-53;}
  if(pose==='hug'){hx=right?158:20;hy=shoulder+90;}
  if(arm!==undefined&&right){hx=sx-Math.sin(arm*Math.PI/180)*172;hy=shoulder+Math.cos(arm*Math.PI/180)*172;}
  // Quiet poses use long relaxed arms rather than a bent curve with a reversed elbow.
  if(!walk&&(pose==='idle'||(pose==='reach'&&!right))){hx=sx+sign*19;hy=shoulder+198;}
  const target=right?hands?.right:hands?.left;
  if(target){[hx,hy]=target;}
  const outwardReach=sign*(hx-sx)>65;
  const naturalWalk=walk&&pose==='idle'&&arm===undefined&&!target;
  const bend=naturalWalk?-sign:(pose==='wave'||pose==='lift'||pose==='point'||outwardReach)?sign:-sign;
  const limb=solveArm([sx,shoulder],[hx,hy],bend);
  const [wx,wy]=limb.wrist;
  return <g strokeLinecap="round" strokeLinejoin="round">
   <path d={limb.path} stroke={ink} strokeWidth="51" fill="none"/>
   <path d={limb.path} stroke={cloth} strokeWidth="39" fill="none"/>
   <g transform={`translate(${wx} ${wy}) rotate(${limb.angle})`}>
    <ellipse rx="21" ry="26" fill={skin} stroke={ink} strokeWidth="5.5"/>
    <path d="M-23 -19Q0 -14 23 -19" fill="none" stroke={ink} strokeWidth="4.5"/>
   </g>
  </g>
 };
 const headFile=side?`${who}-side${direction===1?'-right':''}.png`:`${who}-${view}.png`;
 const sideW=g?335:348;
 return <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
  <ellipse cy="12" rx={side?92:141} ry="17" fill="#594749" opacity=".085"/>
  <g transform={`translate(0 ${bob}) rotate(${lean+(walk&&distance===undefined?step*.5:0)} 0 -170)`}>
   {leg(false)}{leg(true)}
   {sleeve(false,la)}
   <path d={`M-67 ${neck+8}Q-91 ${neck+19} -93 ${neck+74}L-96 ${hip+8}Q0 ${hip+25} 96 ${hip+8}L91 ${neck+74}Q90 ${neck+18} 65 ${neck+8}Z`} fill={cloth} stroke={ink} strokeWidth="7"/>
   <path d={`M-77 ${neck+27}Q-103 ${neck-7} -69 ${neck-31}Q-28 ${neck-41} 0 ${neck-10}Q29 ${neck-42} 67 ${neck-28}Q97 ${neck-4} 76 ${neck+25}Q35 ${neck+6} 0 ${neck+30}Q-35 ${neck+7} -77 ${neck+27}Z`} fill={cloth} stroke={ink} strokeWidth="7"/>
   {back?<path d={`M-79 ${neck-12}Q-20 ${neck+95} 77 ${neck-12}`} fill="none" stroke={ink} strokeWidth="5"/>:<>
    <path d={`M-22 ${neck+29}Q-24 ${neck+60} ${-24+wave(f-5,87)} ${neck+100}M24 ${neck+29}Q24 ${neck+65} ${25+wave(f-8,87)} ${neck+102}`} fill="none" stroke="#fff6e5" strokeWidth="8" strokeLinecap="round"/>
    <path d={`M-41 ${hip-31}Q0 ${hip-19} 41 ${hip-31}`} fill="none" stroke={ink} strokeWidth="2" opacity=".17"/>
   </>}
   {g&&<g transform={`rotate(${walk?Math.sin(cycle-.35)*1.7:wave(f-7,130)*.4} 0 ${hip})`}>
    <path d={`M-96 ${hip}L-108 ${hip+57}Q0 ${hip+78} 108 ${hip+57}L95 ${hip}Z`} fill="#47464c" stroke={ink} strokeWidth="6"/>
    {[-68,-28,19,62].map(v=><path key={v} d={`M${v} ${hip+5}L${v*1.08} ${hip+59}`} stroke="#22212a" strokeWidth="4"/>)}
   </g>}
   {sleeve(true,ra)}
   {pose==='phone'&&<g transform={`translate(${side?direction*75:8} ${neck+115}) rotate(-8)`}><rect x="-26" y="-30" width="52" height="86" rx="9" fill="#494554" stroke={ink} strokeWidth="5"/><rect x="-19" y="-21" width="38" height="62" rx="3" fill="#c1dce5"/><circle cy="47" r="3" fill="#f9eee6"/></g>}
   <g transform={`rotate(${htilt} 0 ${neck+8})`}>
    <image href={staticFile('v4/'+headFile)} x={-(side?sideW:hw)/2} y={top} width={side?sideW:hw} height={hh} preserveAspectRatio="xMidYMid meet"/>
    {view==='front'&&<g transform={`translate(${g?-2:10} ${g?-432:-446})`} stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
     {[-58,58].map((v,i)=>{
      const eyeclosed=blink||emotion==='closed'||emotion==='happy'||emotion==='shy';
      return <g key={i} transform={`translate(${v+look*3} 0)`}>
       {eyeclosed?<path d={blink||emotion==='closed'?'M-16 2Q0 14 16 2':'M-17 5Q0 -21 17 5'} strokeWidth={blink?6:10}/>:emotion==='sad'?<><path d="M-15 0Q0 11 15 0" strokeWidth="7"/><path d={`M-16 -22Q0 -15 14 -26`} strokeWidth="4"/></>:<ellipse rx={emotion==='wonder'?10:8} ry={emotion==='wonder'?15:12} fill={ink} strokeWidth="0"/>}
      </g>
     })}
     {emotion==='wonder'?<ellipse cy="36" rx="9" ry="13" fill="#edafac" strokeWidth="4"/>:<path d={emotion==='sad'?'M-10 42Q0 33 10 42':emotion==='soft'?'M-10 35Q0 42 10 35':'M-14 33Q0 52 14 33'} transform={`translate(0 ${emotion==='shy'?2:0})`} strokeWidth="5"/>}
     {emotion==='shy'&&<g stroke="#ed969b" strokeWidth="3" opacity=".7"><path d="M-86 20l-3 7m12-6l-3 7m135-7l-3 7m12-7l-3 7"/></g>}
    </g>}
    {side&&<path d={`M${direction===-1?-117:117} ${g?-373:-407}q${direction*7} 5 ${direction*13} 0`} fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round"/>}
   </g>
  </g>
 </g>
}

export function Pair({x=960,y=900,s=.8,f,walk=false,hold=false,emotion='happy',back=false,sit=false,gap=400,tilt=0,distance}:{x?:number;y?:number;s?:number;f:number;walk?:boolean;hold?:boolean;emotion?:Emotion;back?:boolean;sit?:boolean;gap?:number;tilt?:number;distance?:number}){
 return <g>
  <Actor x={x-gap*s/2} y={y} scale={s} f={f} walk={walk} distance={distance} direction={1} emotion={emotion} view={back?'back':'front'} pose={sit?'sit':hold?'hold':'idle'} tilt={tilt}/>
  <Actor girl x={x+gap*s/2} y={y} scale={s} f={f} phase={4} walk={walk} distance={distance} direction={1} emotion={emotion} view={back?'back':'front'} pose={sit?'sit':hold?'hold':'idle'} tilt={-tilt}/>
 </g>
}

export function RolePreview(){return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{background:'#fff9f1'}}><RigDefs/>
 <Actor x={370} y={925} scale={1.05} f={60} emotion="happy" pose="wave"/>
 <Actor girl x={840} y={925} scale={1.05} f={60} emotion="shy" tilt={-4}/>
 <Actor x={1270} y={900} scale={.8} f={11} view="side" walk/>
 <Actor girl x={1630} y={900} scale={.8} f={11} view="back"/>

 </svg>}

export const stopping=(f:number,a:number,b:number)=>1-range(f,a,b);
export const bounded=(v:number)=>clamp(v);
