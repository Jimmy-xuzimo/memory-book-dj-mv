import {useCurrentFrame,useVideoConfig,spring} from 'remotion';
import glyphData from './handwriting-paths.json';
import captions from './captions.json';
import {clamp,hash} from '../motion';

const glyphs=glyphData as Record<string,string[][]>;
export function HandGlyph({ch,variant=0}:{ch:string;variant?:number}){
 if(ch===' ')return null;
 return <g>{glyphs[ch][variant%3].map((d,i)=><path key={i} d={d}/>)}</g>;
}
export function HandLabel({text,x,y,size=60,color='#45393e'}:{text:string;x:number;y:number;size?:number;color?:string}){
 return <g fill={color}>{Array.from(text).map((ch,i)=><g key={i} transform={`translate(${x+i*size*.93} ${y+(hash(i+3)-.5)*size*.1}) rotate(${(hash(i+8)-.5)*7}) scale(${size/1024})`}><HandGlyph ch={ch} variant={i}/></g>)}</g>;
}

// Every entry is a layout instruction for the original text; concatenation must equal the SRT.
const breaks=[
 ['我们都是','渺小真实存在'],['祈愿小世界里','不只有挫败'],['直到遇见你','我以为就光明起来'],
 ['眼睛里看到的','都是广袤无垠的大海'],['有你在的日子里','不可能被取代'],['在最灰暗的日子','你陪着我发呆'],
 ['你让我学会','如何拨开阴霾'],['将快乐','全都收集'],['将不开心','全都淘汰'],['你对我','说的情话'],
 ['像转瞬即逝的','烟花'],['只停在','绽放一刹那'],['我却已','无法自拔'],['我们的爱','总有时差'],
 ['也为你骗自己','放下'],['爱炙热的你','却忘了爱自己'],['和你在一起画面一帧帧绘进脑海'],
 ['你总说我是小孩','对我总是想溺爱'],['我像做了一场梦','梦见我们的未来'],['我们俩嘻嘻闹闹','直到梦突然醒来'],
 ['想和和你说声谢谢','至少笑着离开'],['不想闹的不愉快 ','互相不理不睬'],['我想说爱这件事','总要履行告白'],['最后就用','朋友身份说拜拜'],
];
const important=['渺小','挫败','遇见你','大海','取代','陪着我','阴霾','快乐','不开心','情话','烟花','绽放','自拔','时差','放下','爱自己','一帧帧','小孩','未来','醒来','谢谢','不愉快','告白','拜拜'];

export const lyricLayouts=captions.map((cue,n)=>{
 const rows=breaks[n];
 if(rows.join('')!==cue.text)throw new Error(`Handwritten lyric mismatch ${n+1}`);
 const anchorRight=[3,17].includes(n),narrow=[13,14].includes(n);
 const left=anchorRight?1070:108+(n%3)*24,top=n===16?50:65+(n%4)*9;
 const width=n===16?1700:anchorRight?735:narrow?710:1010;
 let index=0;
 const letters=rows.flatMap((row,r)=>{
  const keyword=important[n],where=row.indexOf(keyword);
  const sizes=Array.from(row).map((ch,i)=>{
   const strong=where>=0&&i>=where&&i<where+keyword.length;
   return (strong?(n===16?91:104):(n===16?61:69))*( .88+hash(n*87+i*11+r*30)*.24)*(ch===' '?.5:1);
  });
  const total=sizes.reduce((a,b)=>a+b*.96,0),fit=Math.min(1,width/total);
  let x=left+(r?20+hash(n+6)*24:0);
  return Array.from(row).map((ch,i)=>{
   const current=index++,size=sizes[i]*fit,strong=where>=0&&i>=where&&i<where+keyword.length;
   const item={ch,index:current,x:x+size/2,y:top+r*123+(hash(current+n*31)-.5)*21,size,rotation:(hash(n*133+current*17)-.5)*13,strong};
   x+=sizes[i]*fit*.96;return item;
  });
 });
 return {cue,letters,anchorRight};
});

export function HandwrittenLyrics(){
 const f=useCurrentFrame(),{fps}=useVideoConfig(),layout=lyricLayouts.find(l=>l.cue.startFrame<=f&&f<l.cue.endFrameExclusive);
 if(!layout)return null;
 const {cue,letters}=layout,local=f-cue.startFrame,dur=cue.endFrameExclusive-cue.startFrame;
 const dark=[1,2,10,11,12,13,14,15,22].includes(cue.id);
 // Cinema has a dark wall at upper left; all other sweet backgrounds have light skies.
 const cinema=f>=424&&f<440;
 const color=dark||cinema?'#fff2d8':'#392f39';
 const delay=Math.min(1.65,(dur-20)/Math.max(1,letters.length-1));
 return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,pointerEvents:'none'}} aria-label={cue.text}>
  <g fill={color} opacity={clamp((dur-local)/4)}>
   {letters.map(l=>{
    const age=local-l.index*delay;
    if(age<0)return null;
    const pop=spring({frame:age,fps,config:{damping:9.5,stiffness:210,mass:.6}});
    const accent=l.strong&&age>22?Math.sin(Math.min(1,(age-22)/18)*Math.PI)*-9:0;
    return <g key={l.index} opacity={clamp((age+1)/2)} transform={`translate(${l.x} ${l.y+l.size*.5+(1-pop)*-47+accent}) rotate(${l.rotation+(1-pop)*(l.index%2?13:-13)}) scale(${(.48+.52*pop)*l.size/1024}) translate(-512 -512)`}><HandGlyph ch={l.ch} variant={(cue.id+l.index)%3}/></g>;
   })}
  </g>
 </svg>;
}

