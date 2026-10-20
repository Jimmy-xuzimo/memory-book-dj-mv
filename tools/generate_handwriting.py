from pathlib import Path
import json, math, random, shutil

p=Path(__file__).resolve().parents[1]
cues=json.loads((p/'src/data/captions.json').read_text(encoding='utf-8'))
needed=set(''.join(c['text'] for c in cues)+'把回忆拼好给你')-{' '}
source=json.loads((p/'tools/handwriting-medians.json').read_text(encoding='utf-8'))
assert needed==set(source)

def smooth(points):
    # Catmull-Rom resampling preserves hook endpoints and prevents polygon corners.
    result=[]
    for i in range(len(points)-1):
        a=points[max(0,i-1)];b=points[i];c=points[i+1];d=points[min(len(points)-1,i+2)]
        steps=max(3,int(math.dist(b,c)/17))
        for j in range(steps):
            t=j/steps
            result.append(tuple(.5*((2*b[k])+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t) for k in (0,1)))
    result.append(points[-1]);return result

def pen(stroke,rng):
    pts=[]
    shear=rng.uniform(-.045,.045)
    for x,y in stroke:
        x=x+(y-450)*shear+rng.uniform(-6,6)
        y=900-y+rng.uniform(-6,6)
        pts.append((x,y))
    pts=smooth(pts)
    # Newly drawn marker silhouettes: variable pressure, rounded endpoints, one fill only.
    left=[];right=[];w=rng.uniform(37,47);phase=rng.random()*6
    for i,(x,y) in enumerate(pts):
        a=pts[max(0,i-1)];b=pts[min(len(pts)-1,i+1)];dx=b[0]-a[0];dy=b[1]-a[1];n=math.hypot(dx,dy) or 1
        u=i/max(1,len(pts)-1);pressure=.76+.24*math.sin(u*math.pi)+.08*math.sin(u*7+phase)
        width=w*pressure/2
        left.append((x-dy/n*width,y+dx/n*width));right.append((x+dy/n*width,y-dx/n*width))
    polygon=left+list(reversed(right))
    path='M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in polygon)+'Z'
    # Round pen endpoints are part of the same colored glyph, never a contrasting outline.
    for x,y in (pts[0],pts[-1]):
        r=w*.36;path+=f'M{x-r:.1f},{y:.1f}a{r:.1f},{r:.1f} 0 1,0 {2*r:.1f},0a{r:.1f},{r:.1f} 0 1,0 {-2*r:.1f},0Z'
    return path

glyphs={}
for ch in sorted(needed):
    glyphs[ch]=[[pen(stroke,random.Random(ord(ch)*91+v*901+j*23)) for j,stroke in enumerate(source[ch])] for v in range(3)]
(p/'src/v6/handwriting-paths.json').write_text(json.dumps(glyphs,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
assets=p/'public/v6/handwriting';assets.mkdir(parents=True,exist_ok=True)
for ch,variants in glyphs.items():
    svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -90 1084 1120"><g fill="#383039">'+''.join(f'<path d="{s}"/>' for s in variants[0])+'</g></svg>'
    (assets/f'{ord(ch):x}.svg').write_text(svg,encoding='utf-8')
credits='''V6 generated handwriting assets

No installed font, browser font, TTF/OTF or SVG text element is used for V6 lyric rendering.
Stroke centerlines: Make Me a Hanzi, https://github.com/skishore/makemeahanzi
graphics.txt sources: Arphic PL KaitiM GB and Arphic PL UKai, Arphic Public License.
Modifications: new marker silhouettes generated from medians; resampled curves, independently perturbed points, variable stroke pressure, rounded endpoints, three drawn variants per character. The original typeface outlines are not rendered.
This is procedural handwriting built from licensed stroke skeletons; it is not a claim of a wholly original typeface or human pen input.
See attached original COPYING and APL license files. Generated SVG assets and handwriting-paths.json follow the Arphic Public License.
'''
(assets/'CREDITS.txt').write_text(credits,encoding='utf-8')

print(f'{len(glyphs)} glyphs, three handwriting variants, {len(cues)} exact original lyrics')
