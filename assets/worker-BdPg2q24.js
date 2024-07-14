var Y=Object.defineProperty;var tt=(g,l,y)=>l in g?Y(g,l,{enumerable:!0,configurable:!0,writable:!0,value:y}):g[l]=y;var d=(g,l,y)=>tt(g,typeof l!="symbol"?l+"":l,y);(function(){"use strict";const g={red:[242,6,18,255],blue:[10,116,287,255],turquoise:[60,134,134,255],yellow:[209,196,65,255],brown:[134,52,26,255],lightBlue:[120,183,239,255],green:[69,153,68,255],orange:[244,140,75,255],purple:[108,99,137,255]},l={red:[117,117,117,255],blue:[141,141,141,255],turquoise:[188,188,188,255],yellow:[104,104,104,255],brown:[199,199,199,255],lightBlue:[87,87,87,255],green:[166,166,166,255],orange:[176,176,176,255],purple:[203,203,203,255]};function y(n){return n.reduce((o,e)=>o+e,0)/n.length}function A(n,o){const e=y(n.slice(0,2)),a=y(o.slice(0,2)),s=Math.abs(e-n[0])+Math.abs(e-n[1])+Math.abs(e-n[2]),u=Math.abs(a-o[0])+Math.abs(a-o[1])+Math.abs(a-o[2]);return s<u}function j(n,o){return!A(n,o)}function q(){let n=()=>{},o=()=>{};const e=new Promise((a,s)=>{n=a,o=s});return{resolve:n,reject:o,promise:e}}let O=1;class T{constructor(o){d(this,"animations",[]);d(this,"animationLayer");this.animationLayer=o}addAnimation(o,e){const{promise:a,resolve:s}=q();return this.animations.push([o,e,s,O++]),a}bufferFrame(o,e){const a=[];this.animations.forEach(([s,u,c,M])=>{if(o>=BigInt(s.length)+u)c();else{a.push([s,u,c,M]);const p=s[Number(o-u)];for(const[w,L]of Object.entries(p)){const f=parseInt(w);this.animationLayer.getPixelSource(f)!==M&&j(this.animationLayer.getPixel(f),L)||this.animationLayer.setPixel(f,L,M)}}}),this.animations=a,e(this.animationLayer.getImageData())}}class D{constructor(o,e){d(this,"imageData");d(this,"coordinates");d(this,"pixelSource",new Map);this.imageData=o,this.coordinates=e}getPixel(o){return Array.from(this.imageData.data.slice(o,o+4))}getPixelSource(o){return this.pixelSource.get(o)}setPixel(o,e,a){this.imageData.data[o]=e[0],this.imageData.data[o+1]=e[1],this.imageData.data[o+2]=e[2],this.imageData.data[o+3]=e[3],this.pixelSource.set(o,a)}getMatchingNeighbors(o){const e=this.getPixel(o);return this.coordinates.getNeighbors(o).filter(a=>{const s=this.getPixel(a);return Math.abs(s[0]-e[0])<1&&Math.abs(s[1]-e[1])<1&&Math.abs(s[2]-e[2])<1})}getImageData(){return this.imageData}getData(){return this.imageData.data}}function t(n){return n*60}function r(n){return 3600*n}class U{constructor(o,e){d(this,"width");d(this,"height");this.width=o,this.height=e}getWidth(){return this.width}getHeight(){return this.height}fromXy({x:o,y:e}){return e*this.width*4+o*4}toXy(o){return{x:o%(this.width*4),y:Math.floor(o/(this.width*4))}}distance(o,e){const a=this.toXy(o),s=this.toXy(e),u=a.x-s.x,c=a.y-s.y;return Math.sqrt(Math.pow(u,2)+Math.pow(c,2))}getNeighbors(o){return[o-this.width*4-4,o-this.width*4,o-this.width*4+4,o-4,o+4,o+this.width*4-4,o+this.width*4,o+this.width*4+4]}}function X(n,o){return n[0]===o[0]&&n[1]===o[1]&&n[2]===o[2]&&n[3]===o[3]}class _{constructor(o,e,a,s){d(this,"sectionIndices");d(this,"targetColor");d(this,"originalColor");d(this,"state");d(this,"batchSize");d(this,"rStep");d(this,"gStep");d(this,"bStep");d(this,"aStep");d(this,"resolve");d(this,"finished");d(this,"isFinished",!1);this.sectionIndices=[...o],this.targetColor=e,this.originalColor=a,this.state={};const u=40;this.rStep=(e[0]-a[0])/u,this.gStep=(e[1]-a[1])/u,this.bStep=(e[2]-a[2])/u,this.aStep=(e[3]-a[3])/u;const c=s-u;this.batchSize=Math.ceil(o.length/c),this.finished=new Promise(M=>{this.resolve=()=>{this.isFinished=!0,M()}})}interpolateState(){Object.entries(this.state).forEach(([o,e])=>{if(e===null)throw new Error("Should not happen");if(X(e,this.originalColor)){delete this.state[o];return}const a=[e[0]-this.rStep,e[1]-this.gStep,e[2]-this.bStep,e[3]-this.aStep];Math.abs(a[0]-this.originalColor[0])<Math.abs(2*this.rStep)&&(a[0]=this.originalColor[0]),Math.abs(a[1]-this.originalColor[1])<Math.abs(2*this.gStep)&&(a[1]=this.originalColor[1]),Math.abs(a[2]-this.originalColor[2])<Math.abs(2*this.bStep)&&(a[2]=this.originalColor[2]),Math.abs(a[3]-this.originalColor[3])<Math.abs(2*this.aStep)&&(a[3]=this.originalColor[3]),this.state[o]=a})}processBatch(){const o=this.sectionIndices.splice(0,this.batchSize);if(o.length===0&&Object.values(this.state).length===0)return this.resolve();for(const e of o)this.state[e]=this.targetColor}getFrame(){return this.interpolateState(),this.processBatch(),this.state}getPeakColor(){return this.targetColor}cache(){const o=[];for(;this.isFinished===!1;)o.push({...this.getFrame()});return o}}class k{constructor(o,e,a,s){d(this,"sections");d(this,"color");d(this,"originalPixel");d(this,"engine");d(this,"sectionFrames",[]);this.sections=o,this.color=e,this.engine=s,this.originalPixel=a,this.cache()}async run(o){let e=o;for(const a of this.sectionFrames)await this.engine.addAnimation(a,e),e+=BigInt(a.length)}cache(){const o=[];for(const e of this.sections){const a=new _(e.pixels,this.color,this.originalPixel,e.duration);o.push(a.cache())}this.sectionFrames=o}}class z{constructor(o,e){d(this,"lineLayer");d(this,"coordinates");this.lineLayer=o,this.coordinates=e}getLineData(o,e,a=!1){const s=[];return o.sectionData.forEach(u=>{const c=u.coordinates.map(M=>this.lineLayer.getSection(this.coordinates.fromXy(M))).flat();a?s.unshift({pixels:c.reverse(),duration:u.duration}):s.push({pixels:c,duration:u.duration})}),new k(s,o.color,o.bgColor,e)}}class W{constructor(o,e){d(this,"coordinates");d(this,"canvasImageData");this.coordinates=o,this.canvasImageData=e}reduceColors(){for(let o=0;o<this.canvasImageData.getData().length;o+=4){const e=this.canvasImageData.getPixel(o),a=H(e);a?this.canvasImageData.setPixel(o,[...a,255],-1):this.canvasImageData.setPixel(o,[255,255,255,255],-1)}return this}reduceNoise(){let o=[];for(let e=0;e<this.canvasImageData.getData().length;e+=4){if(this.canvasImageData.getPixel(e).join(",")==="255,255,255,255")continue;this.coordinates.getNeighbors(e).map(u=>this.canvasImageData.getPixel(u)).reduce((u,c)=>{const M=(c==null?void 0:c.join(","))??"NULL";return u[M]=(u[M]??0)+1,u},{})["255,255,255,255"]>5&&o.push(e)}for(const e of o)this.canvasImageData.setPixel(e,[255,255,255,255],-1);return this}getSection(o){const e=[],a=[o];for(;a.length>0;){const s=a.shift();if(!e.includes(s)){e.push(s);for(const u of this.canvasImageData.getMatchingNeighbors(s))a.push(u)}}return e}}const G={turquoise:[4,136,135],purple:[110,99,140],darkBlue:[10,116,187],green:[4,155,55],brown:[145,44,13],lightBlue:[98,185,244],red:[242,6,18],olive:[212,195,10],orange:[243,135,55]};function H(n){for(const o of Object.values(G))if(Math.abs(o[0]-n[0])<20&&Math.abs(o[1]-n[1])<20&&Math.abs(o[2]-n[2])<20)return o;return null}class h{constructor(o,e,a,s){d(this,"schedule",[]);d(this,"line");let u=o;for(;u<e;)this.schedule.push(u),u+=a;this.line=s}onTick(o){this.schedule[0]<=o&&(this.schedule=this.schedule.slice(1),this.line.run(o))}}function Z({frame:n,frameNumber:o}){return{command:"ADD_TO_BUFFER",frame:n,frameNumber:o}}function $(n){return(n==null?void 0:n.command)==="BUFFER_FULL"}function J(n){return(n==null?void 0:n.command)==="BUFFER_LOW"}function K(n){return(n==null?void 0:n.command)==="INITIALIZE"}const v={color:g.blue,bgColor:l.blue,sectionData:[{duration:Math.round(t(31)*t(2)/t(46)),coordinates:[{x:507,y:890}]},{duration:Math.round(t(31)*t(2)/t(46)),coordinates:[{x:600,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:694,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:792,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:886,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:980,y:890},{x:1036,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1074,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1172,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1266,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1362,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1458,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1554,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1650,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1746,y:890}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1832,y:965}]},{duration:Math.round(t(31)*t(3)/t(46)),coordinates:[{x:1865,y:1055}]}]},C={color:g.turquoise,bgColor:l.turquoise,sectionData:[{duration:Math.round(t(28)*t(2)/t(34)),coordinates:[{x:357,y:596}]},{duration:Math.round(t(28)*t(14)/t(34)),coordinates:[{x:313,y:673}]},{duration:Math.round(t(28)*t(13)/t(34)),coordinates:[{x:573,y:500}]},{duration:Math.round(t(28)*t(5)/t(34)),coordinates:[{x:726,y:733}]}]},I={color:g.orange,bgColor:l.orange,sectionData:[{duration:Math.round(t(31)*t(10)/t(44)),coordinates:[{x:357,y:716}]},{duration:Math.round(t(31)*t(10)/t(44)),coordinates:[{x:478,y:596},{x:508,y:555}]},{duration:Math.round(t(31)*t(5)/t(44)),coordinates:[{x:564,y:499}]},{duration:Math.round(t(31)*t(6)/t(44)),coordinates:[{x:671,y:446}]},{duration:Math.round(t(31)*t(4)/t(44)),coordinates:[{x:732,y:529}]},{duration:Math.round(t(31)*t(4)/t(44)),coordinates:[{x:732,y:640}]},{duration:Math.round(t(31)*t(5)/t(44)),coordinates:[{x:732,y:731}]}]},S={color:g.lightBlue,bgColor:l.lightBlue,sectionData:[{duration:Math.round(t(46)*t(6)/t(63)),coordinates:[{x:719,y:104}]},{duration:Math.round(t(46)*t(4)/t(63)),coordinates:[{x:809,y:104}]},{duration:Math.round(t(46)*t(6)/t(63)),coordinates:[{x:899,y:104}]},{duration:Math.round(t(46)*t(4)/t(63)),coordinates:[{x:984,y:104}]},{duration:Math.round(t(46)*t(7)/t(63)),coordinates:[{x:1074,y:104}]},{duration:Math.round(t(46)*t(5)/t(63)),coordinates:[{x:1176,y:106}]},{duration:Math.round(t(46)*t(4)/t(63)),coordinates:[{x:1207,y:208}]},{duration:Math.round(t(46)*t(4)/t(63)),coordinates:[{x:1207,y:283}]},{duration:Math.round(t(46)*t(6)/t(63)),coordinates:[{x:1207,y:351}]},{duration:Math.round(t(46)*t(4)/t(63)),coordinates:[{x:1207,y:457}]},{duration:Math.round(t(46)*t(5)/t(63)),coordinates:[{x:1207,y:567}]},{duration:Math.round(t(46)*t(5)/t(63)),coordinates:[{x:1159,y:753},{x:1097,y:816}]},{duration:Math.round(t(46)*t(3)/t(63)),coordinates:[{x:1060,y:855}]}]},R={color:g.yellow,bgColor:l.yellow,sectionData:[{duration:Math.round(t(12)*t(4)/t(18)),coordinates:[{x:655,y:1100}]},{duration:Math.round(t(12)*t(4)/t(18)),coordinates:[{x:781,y:1100}]},{duration:Math.round(t(12)*t(4)/t(18)),coordinates:[{x:929,y:1040}]},{duration:Math.round(t(12)*t(6)/t(18)),coordinates:[{x:1032,y:975}]}]},B={color:g.red,bgColor:l.red,sectionData:[{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:326,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:426,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:510,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:596,y:438}]},{duration:Math.round(t(32)*t(4)/t(48)),coordinates:[{x:672,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:750,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:826,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:908,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:992,y:438}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:1033,y:506}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:1033,y:565}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:1033,y:622}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:1033,y:682}]},{duration:Math.round(t(32)*t(5)/t(48)),coordinates:[{x:1033,y:746},{x:1033,y:776}]},{duration:Math.round(t(32)*t(3)/t(48)),coordinates:[{x:958,y:877}]}]},F={color:g.brown,bgColor:l.brown,sectionData:[{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:219,y:302}]},{duration:Math.round(t(74)*t(6)/t(109)),coordinates:[{x:219,y:204}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:264,y:100}]},{duration:Math.round(t(74)*t(3)/t(109)),coordinates:[{x:284,y:170}]},{duration:Math.round(t(74)*t(5)/t(109)),coordinates:[{x:284,y:226}]},{duration:Math.round(t(74)*t(7)/t(109)),coordinates:[{x:284,y:296}]},{duration:Math.round(t(74)*t(6)/t(109)),coordinates:[{x:327,y:365}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:742,y:460}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:742,y:531}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:931,y:728}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1076,y:770}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1168,y:733},{x:1213,y:688}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1261,y:665}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1386,y:624}]},{duration:Math.round(t(74)*t(3)/t(109)),coordinates:[{x:1441,y:570}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1468,y:490}]},{duration:Math.round(t(74)*t(6)/t(109)),coordinates:[{x:1468,y:427}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1308,y:372}]},{duration:Math.round(t(74)*t(3)/t(109)),coordinates:[{x:1215,y:325}]},{duration:Math.round(t(74)*t(3)/t(109)),coordinates:[{x:1350,y:258}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1350,y:188}]},{duration:Math.round(t(74)*t(3)/t(109)),coordinates:[{x:1410,y:106}]},{duration:Math.round(t(74)*t(5)/t(109)),coordinates:[{x:1503,y:106}]},{duration:Math.round(t(74)*t(3)/t(109)),coordinates:[{x:1596,y:106}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1687,y:106}]},{duration:Math.round(t(74)*t(4)/t(109)),coordinates:[{x:1778,y:106}]}]},P={color:g.green,bgColor:l.green,sectionData:[{duration:Math.round(t(35)*t(4)/t(52)),coordinates:[{x:1320,y:683},{x:1296,y:660}]},{duration:Math.round(t(35)*t(4)/t(52)),coordinates:[{x:1242,y:658},{x:1200,y:658}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1040,y:600}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1040,y:543}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1040,y:484}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1100,y:438}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1216,y:438}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1276,y:438}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1346,y:438}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1476,y:438}]},{duration:Math.round(t(35)*t(4)/t(52)),coordinates:[{x:1540,y:438}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1600,y:458}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1603,y:513}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1603,y:578}]},{duration:Math.round(t(35)*t(3)/t(52)),coordinates:[{x:1603,y:642}]},{duration:Math.round(t(35)*t(4)/t(52)),coordinates:[{x:1663,y:686}]}]},E={color:g.purple,bgColor:l.purple,sectionData:[{duration:Math.round(t(17)*t(3)/t(22)),coordinates:[{x:1458,y:882}]},{duration:Math.round(t(17)*t(5)/t(22)),coordinates:[{x:1554,y:882}]},{duration:Math.round(t(17)*t(4)/t(22)),coordinates:[{x:1663,y:692}]},{duration:Math.round(t(17)*t(3)/t(22)),coordinates:[{x:1743,y:692}]},{duration:Math.round(t(17)*t(4)/t(22)),coordinates:[{x:1825,y:692}]},{duration:Math.round(t(17)*t(3)/t(22)),coordinates:[{x:1862,y:572}]}]},Q=BigInt(r(5)+t(36)),i={blueLine:[r(6),r(24)+t(50)],blueLineReverse:[r(5)+t(55),r(24)+t(35)],redLine:[r(6),r(24)+t(30)],redLineReverse:[r(6)+t(6),r(24)+t(54)],airportExpress:[r(6),r(24)+t(45)],airportExpressReverse:[r(5)+t(50),r(24)+t(48)],southIslandLine:[r(6),r(24)+t(42)],southIslandLineReverse:[r(6)+t(11),r(25)+t(5)],tuenMaLine:[r(5)+t(45),r(24)+t(9)],tuenMaLineReverse:[r(5)+t(38),r(23)+t(54)],lightBlueLine:[r(5)+t(55),r(17)+t(55)],lightBlueLineReverse:[r(6)+t(4),r(17)+t(1)],greenLine:[r(6)+t(10),r(24)+t(40)],greenLineReverse:[r(6)+t(7),r(24)+t(22)],tungChungLine:[r(6)+t(2),r(24)+t(43)],tungChungLineReverse:[r(6)+t(1),r(24)+t(50)],purpleLine:[r(6)+t(13),r(25)+t(12)],purpleLineReverse:[r(6),r(24)+t(50)]};let m=!1;addEventListener("message",async n=>{const o=n==null?void 0:n.data;if($(o)&&(m=!0),J(o)&&(m=!1),!K(o))return;const{lineLayerImageData:e,animationLayerImageData:a,width:s,height:u}=o,c=new U(s,u),M=new W(c,new D(e,c)).reduceColors().reduceNoise(),p=new z(M,c),w=new D(a,c),L=new T(w),f=V(p,L);for(let x=Q;x<r(25)+t(20);x++){for(f.forEach(b=>b.onTick(x)),L.bufferFrame(x,b=>{self.postMessage(Z({frame:b,frameNumber:x}))});m;)await N(50);await N(0)}});async function N(n){return new Promise(o=>setTimeout(o,n))}function V(n,o){return[new h(i.blueLine[0],i.blueLine[1],Math.round(t(1.9)),n.getLineData(v,o)),new h(i.blueLineReverse[0],i.blueLineReverse[1],Math.round(t(1.9)),n.getLineData(v,o,!0)),new h(i.redLine[0],i.redLine[1],Math.round(t(2)),n.getLineData(B,o)),new h(i.redLineReverse[0],i.redLineReverse[1],Math.round(t(2)),n.getLineData(B,o,!0)),new h(i.airportExpress[0],i.airportExpress[1],t(10),n.getLineData(C,o)),new h(i.airportExpressReverse[0],i.airportExpressReverse[1],t(10),n.getLineData(C,o,!0)),new h(i.southIslandLine[0],i.southIslandLine[1],Math.round(t(3.3)),n.getLineData(R,o)),new h(i.southIslandLineReverse[0],i.southIslandLineReverse[1],Math.round(t(3.3)),n.getLineData(R,o,!0)),new h(i.tuenMaLine[0],i.tuenMaLine[1],Math.round(t(2.7)),n.getLineData(F,o)),new h(i.tuenMaLineReverse[0],i.tuenMaLineReverse[1],Math.round(t(2.7)),n.getLineData(F,o,!0)),new h(i.lightBlueLine[0],i.lightBlueLine[1],Math.round(t(2.7)),n.getLineData(S,o)),new h(i.lightBlueLineReverse[0],i.lightBlueLineReverse[1],Math.round(t(2.7)),n.getLineData(S,o,!0)),new h(i.greenLine[0],i.greenLine[1],Math.round(t(2.1)),n.getLineData(P,o)),new h(i.greenLineReverse[0],i.greenLineReverse[1],Math.round(t(2.1)),n.getLineData(P,o,!0)),new h(i.tungChungLine[0],i.tungChungLine[1],t(6),n.getLineData(I,o)),new h(i.tungChungLineReverse[0],i.tungChungLineReverse[1],t(6),n.getLineData(I,o,!0)),new h(i.purpleLine[0],i.purpleLine[1],Math.round(t(2.2)),n.getLineData(E,o)),new h(i.purpleLineReverse[0],i.purpleLineReverse[1],Math.round(t(2.2)),n.getLineData(E,o,!0))]}})();
