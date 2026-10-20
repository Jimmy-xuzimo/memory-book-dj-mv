import {AbsoluteFill,CanvasImage,Interactive,staticFile,useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {RigDefs,RolePreview} from './Rig';
import {World,Camera} from './Scenes';
import shots from './shots.json';
import {ease,clamp,range,wave} from '../motion';
import {TimelineV6} from './Timeline';
import {HandwrittenLyrics} from './Handwriting';

const transitions:Record<number,string>={204:'door',302:'eye',354:'wave',408:'window',506:'rain',598:'cloud',686:'jar',774:'jar',858:'star',1050:'photo',1144:'eye',1233:'split',1331:'heart',1488:'photo',1563:'film',1611:'whale',1659:'cloud',1707:'cloud',1756:'photo',1949:'door',2039:'eye',2141:'envelope',2238:'window'};

function Reveal({type,q}:{type:string;q:number}){
 const a=ease(q),full=<rect x="-200" y="-200" width="2320" height="1480"/>;
 if(q<=0)return null;
 if(a>.985)return full;
 if(type==='heart'){const z=a*95;return <path d="M0 22C-18 9 -43 -8 -43 -29C-43 -59 -7 -65 0 -39C9 -65 43 -59 43 -29C43 -8 18 9 0 22Z" transform={`translate(960 680) scale(${z})`}/>;}
 if(type==='film')return <rect x={-100} y={540-a*1500} width="2120" height={a*3000}/>;
 if(type==='envelope')return <path d={`M960 ${540-a*1900}L${960+a*2300} 540L960 ${540+a*1900}L${960-a*2300} 540Z`}/>;
 if(type==='door')return <path d={`M${1920-a*2420} -150L2180 -150V1250L${2070-a*2600} 1250Z`}/>;
 if(type==='eye')return <ellipse cx="650" cy="515" rx={a*2230} ry={a*1430}/>;
 if(type==='jar')return <ellipse cx="980" cy="740" rx={a*2350} ry={a*1760}/>;
 if(type==='cloud')return <path d={`M${960-a*2200} -200Q${960-a*1900} 170 ${960-a*2150} 330T${960-a*2050} 780T${960-a*2200} 1280H${960+a*2200}Q${960+a*1850} 900 ${960+a*2120} 640T${960+a*2110} 180T${960+a*2200} -200Z`}/>;
 if(type==='star'){const r=a*5800;return <path d="M0 -1L.25 -.31L.96 -.31L.40 .13L.59 .81L0 .39L-.59 .81L-.40 .13L-.96 -.31L-.25 -.31Z" transform={`translate(960 327) rotate(${q*18}) scale(${r})`}/>}
 if(type==='wave')return <path d={`M-200 ${1170-a*1700}Q420 ${1030-a*1700} 960 ${1160-a*1700}T2120 ${1110-a*1700}V1300H-200Z`}/>;
 if(type==='whale')return <path d={`M-300 ${1140-a*1720}Q420 ${800-a*1300} 1110 ${1120-a*1750}T2230 ${1050-a*1750}V1300H-300Z`}/>;
 if(type==='ribbon')return <path d={`M${2150-a*2700} -200Q${1720-a*2750} 190 ${2070-a*2750} 490T${2090-a*2800} 1270H2350V-200Z`}/>;
 if(type==='rain')return <>{Array.from({length:10},(_,i)=><path key={i} d={`M${i*225-160} -200Q${i*225-200} ${a*1700-350} ${i*225-260} ${a*1700}L${i*225-85} ${a*1700+120}Q${i*225+30} ${a*1700-370} ${i*225+55} -200Z`}/>)}</>;
 if(type==='crowd')return <>{Array.from({length:7},(_,i)=><rect key={i} x={-430+a*2820-i*310} y="-100" width={a*690} height="1300" transform={`skewX(${i%2?8:-6})`}/>)}</>;
 if(type==='split')return <rect x={960-a*1800} y="-100" width={a*3600} height="1300"/>;
 if(type==='fold')return <path d={`M${1900-a*2300} -200L2200 -200V1300L${2020-a*2600} 1300Q${1760-a*2100} 540 ${1900-a*2300} -200Z`}/>;
 if(type==='ticket'||type==='window'||type==='photo')return <rect x={960-a*2050} y={540-a*1300} width={a*4100} height={a*2600} rx={type==='window'?14:0} transform={`rotate(${type==='photo'?-5*(1-a):0} 960 540)`}/>;
 return full;
}

function SceneInner({shot=0,offset=0,standalone=false}:{shot?:number;offset?:number;standalone?:boolean}){
 const local=useCurrentFrame(),f=offset+local,data=shots[shot],p=clamp((f-data.startFrame)/(data.endFrameExclusive-data.startFrame-1));
 const type=transitions[data.startFrame],len=type==='film'?7:((data.startFrame===408||data.startFrame===1756)?9:19),enter=shot>0&&type&&local<len,q=clamp(local/(len-1));
 const prev=shots[Math.max(0,shot-1)],pp=clamp((f-prev.startFrame)/(prev.endFrameExclusive-prev.startFrame));
 const foldX=1920-ease(q)*2370,foldW=Math.sin(q*Math.PI)*355;
 return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
  {standalone&&<RigDefs/>}
  <defs>
   <clipPath id={`v6-mask-${shot}`}><Reveal type={type} q={q}/></clipPath>
   <clipPath id={`v6-oldpage-${shot}`}><rect x="-100" y="-100" width={Math.max(0,foldX+100)} height="1280"/></clipPath>
   <linearGradient id={`v6-page-shade-${shot}`}><stop stopColor="#9b7b65" stopOpacity=".28"/><stop offset=".2" stopColor="#fff6e4"/><stop offset=".82" stopColor="#f2dec0"/><stop offset="1" stopColor="#ac917b" stopOpacity=".4"/></linearGradient>
  </defs>
  {enter&&type!=='page'&&<Camera shot={shot-1} f={f}><World shot={shot-1} f={f} p={pp}/></Camera>}
  <g clipPath={enter&&type!=='page'?`url(#v6-mask-${shot})`:undefined}><Camera shot={shot} f={f}><World shot={shot} f={f} p={p}/></Camera></g>
  {enter&&type==='page'&&<>
   <g clipPath={`url(#v6-oldpage-${shot})`}><Camera shot={shot-1} f={Math.min(f,prev.endFrameExclusive+8)}><World shot={shot-1} f={Math.min(f,prev.endFrameExclusive+8)} p={1}/></Camera></g>
   <path d={`M${foldX} -80Q${foldX-foldW*.31} 500 ${foldX} 1180L${foldX+foldW} 1180Q${foldX+foldW*.55} 500 ${foldX+foldW} -80Z`} fill={`url(#v6-page-shade-${shot})`} stroke="#b59a7c" strokeWidth="2"/>
   <path d={`M${foldX+foldW*.15} -60Q${foldX+foldW*.03} 520 ${foldX+foldW*.15} 1150`} fill="none" stroke="#a58a76" strokeWidth="2" opacity=".3"/>
   <path d={`M${foldX+foldW*.6} 130Q${foldX+foldW*.55} 400 ${foldX+foldW*.62} 850`} fill="none" stroke="#d7bca0" strokeWidth="2" opacity=".35"/>
  </>}

 </svg>
}
export const SceneV6=Interactive.create({Component:SceneInner,layout:'absolute-fill',schema:{shot:{type:'number',default:0,hiddenFromList:false},offset:{type:'number',default:0,hiddenFromList:false},standalone:{type:'boolean',default:false}}});

export const Lyrics=HandwrittenLyrics;
const assets=['boy-front.png','boy-back.png','boy-side.png','boy-side-right.png','girl-front.png','girl-back.png','girl-side.png','girl-side-right.png','boy-cloth.png','girl-cloth.png','wash-day.jpg','wash-night.jpg','wash-pink.jpg','wash-cream.jpg'];
export const MV6=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#fff5e3'}}>
  <svg width="1" height="1" aria-hidden style={{position:'absolute',left:0,top:0,pointerEvents:'none'}}><RigDefs/></svg>
  <Audio src={staticFile('song.wav')}/>
  {assets.map(src=><CanvasImage key={src} src={staticFile('v4/'+src)} style={{position:'absolute',width:1,height:1,opacity:0}}/>)}
  <TimelineV6/>
  <AbsoluteFill style={{mixBlendMode:'multiply',opacity:.12,pointerEvents:'none'}}>{Array.from({length:12},(_,i)=><CanvasImage key={i} src={staticFile('paper.png')} style={{position:'absolute',left:(i%4)*512,top:Math.floor(i/4)*512,width:512,height:512}}/>)}</AbsoluteFill>
  <Lyrics/>
  <AbsoluteFill style={{background:'#fff7e9',opacity:f>2350?range(f,2350,2370)*.055:0,pointerEvents:'none'}}/>
 </AbsoluteFill>
}
export const RoleStudyV6=()=>{const f=useCurrentFrame();return <svg width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="#fff9f1"/><RigDefs/><g transform={`translate(0 ${wave(f,110)})`}><RolePreview/></g></svg>};
