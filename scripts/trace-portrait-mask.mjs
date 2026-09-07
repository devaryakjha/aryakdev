// Trace the closed white contour into a CSS mask; the original raster is unchanged.
// Run from the project root with: bun scripts/trace-portrait-mask.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import assert from 'node:assert/strict';
const {data, info} = await sharp('src/assets/images/grid/arya-line.png').raw().toBuffer({resolveWithObject:true});
const {width:w,height:h,channels:c}=info;
const outside=new Uint8Array(w*h), queue=new Int32Array(w*h);
let head=0,tail=0;
function visit(i){if(!outside[i] && data[i*c]<128){outside[i]=1;queue[tail++]=i;}}
for(let x=0;x<w;x++){visit(x);visit((h-1)*w+x);}
for(let y=0;y<h;y++){visit(y*w);visit(y*w+w-1);}
while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)visit(i-1);if(x<w-1)visit(i+1);if(y)visit(i-w);if(y<h-1)visit(i+w);}
const stride=w+1, edges=new Map();
const edge=(x,y,xx,yy)=>edges.set(y*stride+x,yy*stride+xx);
for(let y=0;y<h;y++)for(let x=0;x<w;x++){
 const i=y*w+x;if(outside[i])continue;
 if(!y||outside[i-w])edge(x,y,x+1,y);
 if(x===w-1||outside[i+1])edge(x+1,y,x+1,y+1);
 if(y===h-1||outside[i+w])edge(x+1,y+1,x,y+1);
 if(!x||outside[i-1])edge(x,y+1,x,y);
}
const paths=[];
while(edges.size){const start=edges.keys().next().value;let vertex=start;const path=[];do{path.push([vertex%stride,Math.floor(vertex/stride)]);const next=edges.get(vertex);edges.delete(vertex);vertex=next;}while(vertex!==undefined&&vertex!==start);if(vertex===start)paths.push(path);}
const area=p=>Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-a[1]*b[0]},0)/2);
paths.sort((a,b)=>area(b)-area(a));const path=paths[0];
function simplify(points){const a=points[0],b=points.at(-1),dx=b[0]-a[0],dy=b[1]-a[1],den=dx*dx+dy*dy;let max=0,index=0;for(let i=1;i<points.length-1;i++){const p=points[i],t=den?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/den)):0;const d=Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);if(d>max){max=d;index=i;}}return max>.75?[...simplify(points.slice(0,index+1)).slice(0,-1),...simplify(points.slice(index))]:[a,b];}
const outline=simplify([...path,path[0]]).slice(0,-1);
assert.ok(area(outline)>w*h*.3 && area(outline)<w*h*.7);
assert.equal(outside[250*w+650],0,'Hair remains inside the silhouette');
assert.equal(outside[700*w+640],0,'Face remains inside the silhouette');
assert.equal(outside[50*w+50],1,'Exterior stays outside');
console.log({outside:tail,paths:paths.length,area:area(outline),vertices:outline.length,bounds:[Math.min(...outline.map(p=>p[0])),Math.min(...outline.map(p=>p[1])),Math.max(...outline.map(p=>p[0])),Math.max(...outline.map(p=>p[1]))]});
fs.writeFileSync('public/grid/portrait-mask.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">\n  <path fill="white" d="M${outline.map(p=>p.join(' ')).join('L')}Z"/>\n</svg>\n`);
