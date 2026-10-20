import {MV9,SceneV9,RoleStudyV9} from "./v9/MV";
import {MV8,SceneV8,RoleStudyV8} from "./v8/MV";
import {MV7,SceneV7,RoleStudyV7} from "./v7/MV";
import {MV6,SceneV6,RoleStudyV6} from "./v6/MV";
import {MV5,SceneV5,RoleStudyV5} from "./v5/MV";
import {MV4,SceneV4,RoleStudyV4} from "./v4/MV";
import { Composition, Folder } from "remotion";
import { MV, Scene, CharacterStudy } from "./MV";

export const RemotionRoot = () => (
  <>
    <Folder name="HandDrawnV9">
      <Composition id="MemoryBookV9" component={MV9} durationInFrames={2371} fps={30} width={1920} height={1080}/>
      <Composition id="RoleStudyV9" component={RoleStudyV9} durationInFrames={180} fps={30} width={1920} height={1080}/>
      <Composition id="V9-Bund" component={SceneV9} durationInFrames={204} fps={30} width={1920} height={1080} defaultProps={{shot:0,offset:0,standalone:true}}/>
    </Folder>
    <Folder name="HandDrawnV8">
      <Composition id="MemoryBookV8" component={MV8} durationInFrames={2371} fps={30} width={1920} height={1080}/>
      <Composition id="RoleStudyV8" component={RoleStudyV8} durationInFrames={180} fps={30} width={1920} height={1080}/>
      <Composition id="V8-Bund" component={SceneV8} durationInFrames={204} fps={30} width={1920} height={1080} defaultProps={{shot:0,offset:0,standalone:true}}/>
    </Folder>
    <Folder name="HandDrawnV7">
      <Composition id="MemoryBookV7" component={MV7} durationInFrames={2371} fps={30} width={1920} height={1080}/>
      <Composition id="RoleStudyV7" component={RoleStudyV7} durationInFrames={180} fps={30} width={1920} height={1080}/>
      <Composition id="V7-Bund" component={SceneV7} durationInFrames={204} fps={30} width={1920} height={1080} defaultProps={{shot:0,offset:0,standalone:true}}/>
    </Folder>
    <Folder name="HandDrawnV6">
      <Composition id="MemoryBookV6" component={MV6} durationInFrames={2371} fps={30} width={1920} height={1080}/>
      <Composition id="RoleStudyV6" component={RoleStudyV6} durationInFrames={180} fps={30} width={1920} height={1080}/>
      <Composition id="V6-Dream" component={SceneV6} durationInFrames={95} fps={30} width={1920} height={1080} defaultProps={{shot:27,offset:1756,standalone:true}}/>
    </Folder>
    <Folder name="HandDrawnV5">
      <Composition id="MemoryBookV5" component={MV5} durationInFrames={2371} fps={30} width={1920} height={1080}/>
      <Composition id="RoleStudyV5" component={RoleStudyV5} durationInFrames={180} fps={30} width={1920} height={1080}/>
      <Composition id="V5-City" component={SceneV5} durationInFrames={204} fps={30} width={1920} height={1080} defaultProps={{shot:0,offset:0}}/>
    </Folder>
    <Folder name="HandDrawnV4">
<Composition id="MemoryBookV4" component={MV4} durationInFrames={2371} fps={30} width={1920} height={1080}/>
<Composition id="RoleStudyV4" component={RoleStudyV4} durationInFrames={180} fps={30} width={1920} height={1080}/>
<Composition id="V4-PaperCity" component={SceneV4} durationInFrames={204} fps={30} width={1920} height={1080} defaultProps={{shot:0,offset:0}}/>
<Composition id="V4-Meeting" component={SceneV4} durationInFrames={98} fps={30} width={1920} height={1080} defaultProps={{shot:2,offset:204}}/>
<Composition id="V4-PaperSea" component={SceneV4} durationInFrames={106} fps={30} width={1920} height={1080} defaultProps={{shot:3,offset:302}}/>
<Composition id="V4-Tram" component={SceneV4} durationInFrames={98} fps={30} width={1920} height={1080} defaultProps={{shot:5,offset:408}}/>
<Composition id="V4-CloudCurtain" component={SceneV4} durationInFrames={180} fps={30} width={1920} height={1080} defaultProps={{shot:7,offset:506}}/>
<Composition id="V4-JoyJar" component={SceneV4} durationInFrames={88} fps={30} width={1920} height={1080} defaultProps={{shot:9,offset:686}}/>
<Composition id="V4-Whisper" component={SceneV4} durationInFrames={84} fps={30} width={1920} height={1080} defaultProps={{shot:11,offset:774}}/>
<Composition id="V4-Fireworks" component={SceneV4} durationInFrames={91} fps={30} width={1920} height={1080} defaultProps={{shot:12,offset:858}}/>
<Composition id="V4-PhotoOrbit" component={SceneV4} durationInFrames={195} fps={30} width={1920} height={1080} defaultProps={{shot:14,offset:949}}/>
<Composition id="V4-Globe" component={SceneV4} durationInFrames={89} fps={30} width={1920} height={1080} defaultProps={{shot:16,offset:1144}}/>
<Composition id="V4-DayNight" component={SceneV4} durationInFrames={98} fps={30} width={1920} height={1080} defaultProps={{shot:18,offset:1233}}/>
<Composition id="V4-Lantern" component={SceneV4} durationInFrames={157} fps={30} width={1920} height={1080} defaultProps={{shot:20,offset:1331}}/>
<Composition id="V4-Ticket" component={SceneV4} durationInFrames={75} fps={30} width={1920} height={1080} defaultProps={{shot:22,offset:1488}}/>
<Composition id="V4-PaperWhale" component={SceneV4} durationInFrames={96} fps={30} width={1920} height={1080} defaultProps={{shot:23,offset:1563}}/>
<Composition id="V4-CloudSwing" component={SceneV4} durationInFrames={97} fps={30} width={1920} height={1080} defaultProps={{shot:25,offset:1659}}/>
<Composition id="V4-Future" component={SceneV4} durationInFrames={95} fps={30} width={1920} height={1080} defaultProps={{shot:27,offset:1756,standalone:true}}/>
<Composition id="V4-DreamWake" component={SceneV4} durationInFrames={98} fps={30} width={1920} height={1080} defaultProps={{shot:29,offset:1851}}/>
<Composition id="V4-Thanks" component={SceneV4} durationInFrames={90} fps={30} width={1920} height={1080} defaultProps={{shot:31,offset:1949}}/>
<Composition id="V4-Bridge" component={SceneV4} durationInFrames={102} fps={30} width={1920} height={1080} defaultProps={{shot:33,offset:2039}}/>
<Composition id="V4-Envelope" component={SceneV4} durationInFrames={97} fps={30} width={1920} height={1080} defaultProps={{shot:35,offset:2141}}/>
<Composition id="V4-Farewell" component={SceneV4} durationInFrames={133} fps={30} width={1920} height={1080} defaultProps={{shot:37,offset:2238}}/>
</Folder>
    <Composition
      id="MemoryBook"
      component={MV}
      durationInFrames={2371}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="Studies">
      <Composition
        id="CharacterStudy"
        component={CharacterStudy}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Globe"
        component={Scene}
        durationInFrames={89}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ shot: 16, offset: 1144 }}
      />
      <Composition
        id="DayNightChat"
        component={Scene}
        durationInFrames={48}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ shot: 18, offset: 1233 }}
      />
      <Composition
        id="PaperWhale"
        component={Scene}
        durationInFrames={48}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ shot: 24, offset: 1611 }}
      />
    </Folder>
  </>
);
