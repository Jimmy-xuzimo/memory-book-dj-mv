import type {ReactNode} from 'react';
import {staticFile} from 'remotion';
import {hash,wave,range} from '../motion';
export const P={ink:'#4d4249',paper:'#fcf2df',pink:'#e8a7b5',blue:'#8fb6d2',gold:'#f3cf8b',night:'#3b496c',sage:'#a8bea9'};
export const pen={stroke:P.ink,strokeWidth:4.5,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
export function Wash({kind='cream'}:{kind?:'day'|'night'|'cream'|'pink'}){return <image href={staticFile(`v4/wash-${kind}.jpg`)} width="1920" height="1080" preserveAspectRatio="none"/>}
export function Cloud({x,y,s=1,f=0,dark=false}:{x:number;y:number;s?:number;f?:number;dark?:boolean}){return <g transform={`translate(${x+wave(f,370)*11} ${y}) scale(${s})`} filter="url(#v7-pencil-edge)">
 <path d="M-168 17Q-195 -8 -165 -33Q-154 -71 -104 -55Q-78 -121 -29 -86Q11 -125 49 -75Q106 -96 120 -45Q172 -63 186 -17Q209 18 171 37Q8 63 -158 38Z" fill={dark?'#a1adc3':'#fff9e9'} stroke={dark?'#77869c':'#c0bdad'} strokeWidth="4.1"/>
 <path d="M-151 20Q-87 36 -37 24M-91 -43Q-60 -66 -32 -46M81 -39Q121 -49 139 -16" fill="none" stroke={dark?'#7486a3':'#bacfd4'} strokeWidth="3" opacity=".44"/>
 </g>}
export function Stars({f=0,n=35}:{f?:number;n?:number}){return <g>{Array.from({length:n},(_,i)=>{const x=hash(i+9)*1850+35,y=hash(i+31)*860+35;return <g key={i} transform={`translate(${x} ${y})`} opacity={.18+(wave(f,140,i)+1)*.24}><path d="M-4 0H4M0 -4V5" stroke="#f7dfb1" strokeWidth="2"/><circle r={hash(i+70)*2.5+1} fill="#fff0c2"/></g>})}</g>}
export function Sky({f=0,night=false,sunset=false}:{f?:number;night?:boolean;sunset?:boolean}){return <>
 <Wash kind={night?'night':sunset?'pink':'day'}/>
 <path d="M0 500Q410 335 920 437T1920 375V1080H0Z" fill={night?'#727697':sunset?'#f8d0ab':'#f8ecce'} opacity=".45"/>
 <circle cx="1498" cy="223" r={night?50:85} fill={night?'#f3e1b5':'#f4d99e'} opacity=".9"/>
 {night?<Stars f={f}/>:<><Cloud x={300} y={212} s={1.35} f={f}/><Cloud x={1320} y={409} s={.9} f={f+30}/><Cloud x={1820} y={120} s={1.6} f={-f}/></>}
 </>}
export function Tree({x,y,s=1,f=0,pink=false}:{x:number;y:number;s?:number;f?:number;pink?:boolean}){return <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#v7-pencil-edge)">
 <path d="M-15 0L-7 -257L-66 -321M-6 -140L53 -261M-9 -184L-81 -246" stroke="#8b7367" strokeWidth="18" fill="none"/>
 <g transform={`rotate(${wave(f,200)*1.1} 0 -220)`}>
 {Array.from({length:13},(_,i)=><path key={i} d="M-67 0Q-85 -32 -55 -51Q-45 -84 -14 -61Q12 -81 41 -58Q81 -57 72 -16Q93 11 56 29Q17 48 -12 28Q-51 44 -67 0Z" transform={`translate(${Math.cos(i*2.4)*110} ${-324+Math.sin(i*2.4)*77}) scale(${.6+hash(i)*.5})`} fill={pink?(i%3?'#eab6bd':'#edc9c2'):(i%3?'#aec5ad':'#c4ceab')} stroke={pink?'#ba949e':'#8fa28b'} strokeWidth="2"/>) }
 <path d="M-84 -319q22 -35 55 -13m32 65q26 -33 57 -24m-23 -84q19 -25 43 -12" fill="none" stroke={pink?'#b58d98':'#809e8c'} strokeWidth="3" opacity=".5"/>
 </g></g>}
export function Petals({f,n=13}:{f:number;n?:number}){return <>{Array.from({length:n},(_,i)=><path key={i} d="M0 0Q-18 -24 4 -18Q21 -12 0 0Z" transform={`translate(${((hash(i+19)*2200+f*.6)%2200)-130} ${((hash(i+55)*1280+f*.38)%1280)-90}) rotate(${f*.4+i*34})`} fill={i%3?'#e6aab7':'#fff4d7'} opacity=".64"/>)}</>}
export function Grass({y=890,f=0}:{y?:number;f?:number}){return <g stroke="#9baf9e" strokeWidth="2" opacity=".6">{Array.from({length:45},(_,i)=><path key={i} d={`M${i*47} ${y+hash(i)*55}q${5+wave(f,200,i)*2} -${12+hash(i+9)*20} 13 -30m-9 25q-12 -24 -18 -18`} fill="none"/>)}</g>}
export function Sea({f=0,night=false,from=610}:{f?:number;night?:boolean;from?:number}){return <>
 <path d={`M0 ${from}Q460 ${from-16} 960 ${from+3}T1920 ${from}V1080H0Z`} fill={night?'#526a8c':'#92bdca'}/>
 {Array.from({length:10},(_,i)=><path key={i} d={`M-90 ${from+28+i*42}Q${190+wave(f,160,i)*65} ${from+12+i*42} 590 ${from+29+i*42}T1300 ${from+27+i*42}T2070 ${from+30+i*42}`} fill="none" stroke={i%2?'#f6e5c9':'#d2e6df'} strokeWidth={i<4?2:4} opacity={night?.25:.55}/>)}
 </>}
export function House({x,y,s=1,pink=false,lit=false}:{x:number;y:number;s?:number;pink?:boolean;lit?:boolean}){return <g transform={`translate(${x} ${y}) scale(${s})`} {...pen}>
 <path d="M-106 0L-106 -219L86 -219L86 0Z" fill={pink?'#e4bdb3':'#bdc9ce'}/>
 <path d="M-121 -213L-13 -294L105 -213Z" fill={pink?'#c7999c':'#9daabe'}/>
 <path d="M-104 -202L86 -201M-104 -72H86M-14 -291L-14 -221" fill="none" strokeWidth="1.8" opacity=".5"/>
 {[-65,30].map(a=><g key={a}><path d={`M${a} -185h40v75h-40Z`} fill={lit?'#f8d79a':'#90a9b9'}/><path d={`M${a+20} -183v72M${a} -158h40`} stroke="#faf0d8" strokeWidth="2.5"/></g>)}
 <path d="M-27 0V-79Q0 -98 25 -79V0" fill="#f8ead4"/>
 <path d="M-98 -39H-42M33 -39H81M-101 -102H-51M43 -105H81" opacity=".2"/>
 </g>}
export function School({f=0}:{f?:number}){return <>
 <Sky f={f}/><g opacity=".45"><Tree x={110} y={780} s={1.1} f={f}/><Tree x={1830} y={820} s={1.25} f={f}/></g>
 <g {...pen} stroke="#8c8c90" strokeWidth="2.2"><path d="M220 780V257L1600 257V780Z" fill="#e9ddc9"/><path d="M182 257L220 205H1596L1644 257Z" fill="#b8c1cb"/>
 {[0,1,2].map(row=><g key={row}>{Array.from({length:12},(_,i)=><g key={i}><rect x={270+i*107} y={300+row*139} width="70" height="90" fill={i%4===1?'#f5dda8':'#b4cbd1'}/><path d={`M${305+i*107} ${300+row*139}v90M${270+i*107} ${344+row*139}h70`} stroke="#faf0d9" strokeWidth="4"/></g>)}<path d={`M220 ${410+row*139}H1600`} stroke="#c1b3a1" strokeWidth="6"/></g>)}
 <path d="M825 780V661Q915 618 1000 661V780Z" fill="#b0bac3"/><path d="M915 641V781" stroke="#f9eedc" strokeWidth="6"/>
 </g><path d="M0 820Q960 761 1920 820V1080H0Z" fill="#d4d0b1"/><path d="M620 1080L815 780H1030L1310 1080Z" fill="#eee1cb"/>
 <Grass f={f}/><Tree x={1710} y={900} s={1.15} f={f} pink/><Petals f={f} n={10}/>
 </>}
export function Corridor({f=0,warm=true}:{f?:number;warm?:boolean}){return <>
 <Wash kind={warm?'cream':'day'}/>
 <path d="M0 0H1920V615L1050 500L0 670Z" fill="#eee5d8"/>
 <path d="M0 670L1050 500L1920 615V1080H0Z" fill="#cfbca7"/>
 <g {...pen} stroke="#9c9190" strokeWidth="2.5">
 {Array.from({length:6},(_,i)=>{const x=20+i*205,s=1-i*.055;return <g key={i} transform={`translate(${x} ${130+i*29}) scale(${s})`}><path d="M0 0H143V467H0Z" fill="#afcbd2"/><path d="M70 0V467M0 210H143" stroke="#f9f0db" strokeWidth="10"/><path d="M-12 473H155" strokeWidth="8"/></g>})}
 <path d="M1202 110L1694 20L1694 857L1202 672Z" fill="#b4a28f"/><path d="M1243 154L1656 87L1656 801L1243 653Z" fill="#e0c4ad"/><path d="M1255 166L1653 111L1653 444L1255 474Z" fill="#b3ced1"/>
 <path d="M1658 507L1691 499" strokeWidth="9"/>
 {Array.from({length:6},(_,i)=><path key={i} d={`M${i*350-300} 1080L1050 500M0 ${750+i*80}L1920 ${700+i*88}`} opacity=".24"/>)}
 </g>
 <g fill="#fff0bd" opacity={warm?.46+wave(f,290)*.006:.12}><path d="M52 599L178 578L917 1080H525Z"/><path d="M354 559L451 543L1458 1080H1124Z"/><path d="M649 527L730 514L1900 1042V1080H1748Z"/></g>
 </>}
export function WindowRoom({f=0,night=false,girl=false}:{f?:number;night?:boolean;girl?:boolean}){return <>
 <Wash kind={night?'night':'cream'}/><path d="M0 770L1920 724V1080H0Z" fill={night?'#685d72':'#cdb7a5'}/>
 <g {...pen} stroke={night?'#a5a2b8':'#9d9290'} strokeWidth="3"><rect x="165" y="100" width="740" height="518" rx="8" fill={night?'#2b3d60':'#b9d7dc'}/><path d="M530 102V617M168 359H904" stroke={night?'#c3b9b7':'#fbefd9'} strokeWidth="16"/>
 <path d="M132 72Q192 310 119 648L249 628Q271 337 242 81Z" fill={girl?'#dbb5bb':'#a9b7cd'} opacity=".9"/>
 <path d="M858 79Q839 297 922 640L1020 634Q924 349 982 76Z" fill={girl?'#e2bec1':'#abbcd2'} opacity=".9"/>
 <path d="M110 640H1042" strokeWidth="15"/>
 <path d="M1120 355L1412 355L1412 765H1120Z" fill={night?'#726879':'#c6ad99'}/><path d="M1120 492H1411M1120 626H1412"/>
 {Array.from({length:8},(_,i)=><path key={i} d={`M${1139+i*31} 489V${394-(i%3)*15}H${1158+i*31}V489Z`} fill={['#d5b3b0','#a6c4c8','#e7c99d'][i%3]}/>)}
 <path d="M1128 625L1184 527H1280L1312 625Z" fill="#e4b6ab"/><circle cx="1199" cy="565" r="20" fill="#ead5ac"/>
 </g>
 {night?<circle cx="768" cy="202" r="41" fill="#efdfb5"/>:<><Cloud x={390} y={208} s={.65} f={f}/><path d="M940 615L1400 1080H945L552 615Z" fill="#fff2ba" opacity=".3"/></>}
 <g transform={`translate(1580 793) rotate(${wave(f,190)*.7})`} {...pen}><path d="M-58 0L-75 -119H74L58 0Z" fill="#d7a8a0"/><path d="M0 -119Q-74 -254 -123 -201Q-138 -151 0 -119M0 -119Q80 -270 126 -209Q149 -165 0 -119M0 -130Q-20 -318 31 -314Q72 -305 0 -130" fill="#a3bc9e" stroke="#839a87"/>
 </g>
 </>}
export function Bench({x=960,y=860,w=650}:{x?:number;y?:number;w?:number}){return <g transform={`translate(${x} ${y})`} {...pen} stroke="#6f605b" strokeWidth="4"><path d={`M${-w/2+35} 9V142M${w/2-35} 9V142`} strokeWidth="13"/><path d={`M${-w/2} -6H${w/2}V24H${-w/2}Z`} fill="#bc9b83"/><path d={`M${-w/2+9} -138H${w/2-9}V-53H${-w/2+9}Z`} fill="#c9ab8d"/><path d={`M${-w/2+16} -94H${w/2-16}`} opacity=".4"/></g>}
export function Boat({x=960,y=800,s=1,f=0}:{x?:number;y?:number;s?:number;f?:number}){return <g transform={`translate(${x} ${y+wave(f,98)*5}) rotate(${wave(f,148)*.9}) scale(${s})`} {...pen} strokeWidth="4"><path d="M-400 0L-275 143H262L405 0L0 73Z" fill="#fcf2dd"/><path d="M-400 0L0 -79L405 0L0 73Z" fill="#d5c7b4"/><path d="M-284 -4L0 -245L282 -4L0 73Z" fill="#fff8e7"/><path d="M0 -245V73M-398 0L-275 143M0 73L262 143" fill="none" stroke="#b3a18e"/></g>}
export function PaperBird({x,y,s=1,f=0}:{x:number;y:number;s?:number;f?:number}){return <g transform={`translate(${x} ${y}) rotate(-12) scale(${s})`} {...pen}><path d={`M-84 ${-22-wave(f,24)*17}L0 13L78 ${-48-wave(f+5,24)*11}L22 52L-3 44Z`} fill="#f8edda"/><path d="M0 13L22 52M0 13L-3 44" stroke="#a9a5a3"/></g>}
export function Photo({x,y,s=1,r=0,children}:{x:number;y:number;s?:number;r?:number;children?:ReactNode}){return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
 <path d="M-336 -263H347V290H-336Z" fill="#705c58" opacity=".12" transform="translate(12 14)"/>
 <path d="M-340 -270L340 -267L335 283L-344 288Z" fill="#fff9e9" stroke="#b99c8b" strokeWidth="2.5"/>
 <svg x="-310" y="-241" width="620" height="430" viewBox="0 0 620 430" overflow="hidden">{children}</svg>
 <path d="M-175 231Q0 219 166 229" stroke="#cbb39d" strokeWidth="3" fill="none"/>
 <path d="M-91 -289L91 -285L87 -234L-94 -240Z" fill="#d9c09c" opacity=".65"/>
 </g>}
export function Book({children,angle=0}:{children?:ReactNode;angle?:number}){return <g transform={`rotate(${angle} 960 540)`}>
 <rect width="1920" height="1080" fill="#d9c6b4"/>
 <path d="M181 119Q550 46 957 138Q1360 48 1732 116L1750 977Q1350 910 960 1003Q555 908 162 980Z" fill="#8e7363" opacity=".16" transform="translate(14 15)"/>
 <path d="M181 108Q550 37 957 131Q1360 39 1732 108L1750 960Q1350 896 960 989Q555 896 162 960Z" fill="#fff6e3" stroke="#b69a83" strokeWidth="4"/>
 <path d="M957 131Q935 565 960 989" stroke="#c6ad95" strokeWidth="4" fill="none"/>
 <path d="M977 140Q990 557 976 967" stroke="#c6ad95" strokeWidth="14" opacity=".14" fill="none"/>
 {children}</g>}
export function Firework({x,y,f,start=0,size=230,color='#f0b3c2'}:{x:number;y:number;f:number;start?:number;size?:number;color?:string}){
 const age=f-start,expand=range(age,0,25),fade=1-range(age,36,91);
 if(age<0||age>91)return null;
 return <g transform={`translate(${x} ${y})`} opacity={fade}>
  {Array.from({length:52},(_,i)=>{const a=i*Math.PI*2/52,rr=size*expand*(.83+hash(i)*.17),r0=rr*(.15+.51*expand),drop=expand*expand*13;return <g key={i} stroke={i%5?color:'#fff0c6'} fill="none" strokeLinecap="round">
   <path d={`M${Math.cos(a)*r0} ${Math.sin(a)*r0}Q${Math.cos(a)*rr*.86} ${Math.sin(a)*rr*.86} ${Math.cos(a)*rr} ${Math.sin(a)*rr+drop}`} strokeWidth={i%3?2.5:4}/>
   {[.74,.92,1.1].map((r,j)=><circle key={j} cx={Math.cos(a)*rr*r} cy={Math.sin(a)*rr*r+drop} r={j===2?2.4:1.7} fill={color} stroke="none"/>)}
  </g>})}
  <circle r={9*(1-expand)} fill="#fff2c7"/>
 </g>;
}
