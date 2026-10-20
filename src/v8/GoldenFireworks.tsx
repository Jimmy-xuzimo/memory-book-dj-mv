import {range,hash} from '../motion';

// Dense nested petals fill each burst's heart instead of outlining an empty ring.
const bursts=[
 {x:1040,y:332,r:275,t:837,c:'#e8c174'},
 {x:783,y:416,r:166,t:846,c:'#e3b263'},
 {x:1294,y:430,r:185,t:853,c:'#f1ce8b'},
 {x:985,y:191,r:158,t:862,c:'#f1d49b'},
 {x:887,y:565,r:143,t:868,c:'#dca864'},
 {x:1175,y:563,r:148,t:875,c:'#f1cd87'},
 {x:684,y:314,r:106,t:880,c:'#e6b2bb'},
 {x:1398,y:316,r:123,t:886,c:'#ebc17a'},
 {x:1045,y:333,r:286,t:895,c:'#f0ca80'},
 {x:812,y:402,r:162,t:901,c:'#e5b870'},
 {x:1284,y:443,r:175,t:908,c:'#ebc27d'},
 {x:1012,y:182,r:133,t:913,c:'#eac6a0'},
 {x:1147,y:536,r:116,t:918,c:'#e3aab4'},
 {x:949,y:567,r:134,t:922,c:'#e8ba70'},
];

function Burst({x,y,r,t,c,f,index}:{x:number;y:number;r:number;t:number;c:string;f:number;index:number}){
 const age=f-t,expand=range(age,0,27),fade=1-range(age,65,121);
 if(age<0||age>121)return null;
 return <g transform={`translate(${x} ${y})`} opacity={fade}>
  <circle r={r*expand*.27} fill={c} opacity=".045"/>
  {[{s:1,n:78},{s:.63,n:53},{s:.32,n:32},{s:.13,n:17}].map((shell,k)=><g key={k}>
   {Array.from({length:shell.n},(_,j)=>{
    const rnd=hash(j*17+k*47+index*59),angle=j*Math.PI*2/shell.n+k*.21+(rnd-.5)*.043;
    const radius=r*shell.s*expand*(.79+rnd*.22),inner=radius*(k===3?0:.22+hash(j+82)*.18);
    const xx=Math.cos(angle),yy=Math.sin(angle),sag=expand*expand*(age>50?14:5)*shell.s;
    const hue=j%7===0?'#fff0c9':j%5===0?'#c69759':c;
    return <g key={j} stroke={hue} fill="none" strokeLinecap="round">
     <path d={`M${xx*inner} ${yy*inner}Q${xx*radius*.72+(rnd-.5)*5} ${yy*radius*.72+sag*.25} ${xx*radius} ${yy*radius+sag}`} strokeWidth={(k===0?2.1:1.6)+rnd*1.9}/>
     <circle cx={xx*radius*1.05} cy={yy*radius*1.05+sag} r={1.3+rnd*1.4} fill={hue} stroke="none"/>
     {j%3===0&&<path d={`M${xx*radius*1.09} ${yy*radius*1.09+sag}l${xx*5} ${yy*5+2}`} strokeWidth="1.5" opacity=".73"/>}
    </g>;
   })}
  </g>)}
  <circle r={2.5+expand*2} fill="#fff0c7" opacity=".8"/>
 </g>;
}
export function GoldenFireworks({f}:{f:number}){
 return <>{bursts.map((b,i)=><Burst key={i} {...b} f={f} index={i}/>)}</>;
}
