import {Pair} from './Rig';
import {Book,Cloud,Tree} from './Paint';
import {HandLabel} from './Handwriting';
import {range,hash,clamp} from '../motion';

const cols=8,rows=6;
const grid=Array.from({length:rows+1},(_,r)=>Array.from({length:cols+1},(_,c)=>[
 c*700/cols+(c>0&&c<cols?(hash(r*31+c*7)-.5)*26:0),
 r*560/rows+(r>0&&r<rows?(hash(r*43+c*17)-.5)*24:0),
]));
export const finalShards=Array.from({length:rows*cols},(_,i)=>{
 const r=Math.floor(i/cols),c=i%cols,points=[grid[r][c],grid[r][c+1],grid[r+1][c+1],grid[r+1][c]];
 const cx=points.reduce((s,p)=>s+p[0],0)/4,cy=points.reduce((s,p)=>s+p[1],0)/4;
 const angle=(i/(rows*cols))*Math.PI*2+hash(i+10)*.28,radius=650+hash(i+91)*550;
 return {points:points.map(p=>p.join(',')).join(' '),cx,cy,dx:Math.cos(angle)*radius,dy:Math.sin(angle)*radius*.72,spin:(hash(i+83)-.5)*310,delay:Math.floor(hash(i+8)*4)};
});

function PhotoArtwork(){return <>
 <rect width="700" height="560" fill="#fff9e9"/>
 <g transform="translate(40 40)">
  <rect width="620" height="430" fill="#bdd9d7"/><circle cx="475" cy="90" r="48" fill="#f2d69d"/>
  <Cloud x={143} y={88} s={.55} f={0}/><path d="M0 345Q190 267 350 326T620 312V430H0Z" fill="#adc3a8"/>
  <Tree x={580} y={432} s={.42} f={0} pink/>
  <Pair x={302} y={439} s={.52} f={30} hold emotion="happy"/>
 </g>
 <path d="M210 519Q350 505 497 520" fill="none" stroke="#d0b59b" strokeWidth="2"/>
 </>}

export function PhotoAssembly({f}:{f:number}){
 const hit=clamp((f-2317)/12),snap=hit>0&&hit<1?Math.sin(hit*Math.PI)*.055:0;
 return <>
  <Book/>
  <defs><g id="v6-final-photo-art"><PhotoArtwork/></g>
   {finalShards.map((s,i)=><clipPath key={i} id={`v6-photo-shard-${i}`}><polygon points={s.points}/></clipPath>)}
  </defs>
  <g transform={`translate(960 500) scale(${1.22+snap}) rotate(-3) translate(-350 -280)`}>
   {finalShards.map((s,i)=>{
    const q=range(f,2299+s.delay,2316+s.delay),float=Math.sin((f+i*7)/17)*4*(1-q);
    return <g key={i} transform={`translate(${s.dx*(1-q)} ${s.dy*(1-q)+float}) translate(${s.cx} ${s.cy}) rotate(${s.spin*(1-q)}) scale(${.64+.36*q}) translate(${-s.cx} ${-s.cy})`}>
     <g clipPath={`url(#v6-photo-shard-${i})`}><use href="#v6-final-photo-art"/></g>
    </g>;
   })}
   <path d="M231 -17L471 -12L468 48L229 43Z" fill="#d5bc92" opacity={range(f,2320,2331)*.68}/>
  </g>
  <g opacity={range(f,2327,2348)}><HandLabel text="把回忆拼好给你" x={693} y={914} size={66} color="#6b554c"/></g>
 </>;
}
