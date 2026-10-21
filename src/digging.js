import {surface} from './graphics.js?v=4';
// Physical soil removal: opaque top layer + accumulated textured eraser strokes.
export class Digging {
 constructor(graphics,x,y,flower,glass){this.x=x;this.y=y;this.base=graphics.hole(x,y,flower,glass);this.cover=graphics.cellSoil(x,y);this.ctx=this.cover.getContext('2d');this.elapsed=0;this.duration=2.85;this.lastProgress=0;this.tip={x:57,y:22};this.noiseTick=-1;}
 point(p){const row=Math.min(7,Math.floor(p*8)),q=(p*8)%1,y=24+row*9.2,half=Math.sqrt(Math.max(0,1-((y-57)/43)**2))*34;return {x:57+(row%2?1-2*q:2*q-1)*half,y};}
 advance(dt,particles,sound){this.elapsed+=dt;const p=Math.min(1,this.elapsed/this.duration),ctx=this.ctx;ctx.save();ctx.clip(this.base.path);ctx.globalCompositeOperation='destination-out';// Sample by progress, independent of frame rate. A small irregular comb of bristles softens the excavation boundary.
 for(let a=this.lastProgress;a<p;a+=.0018){const q=this.point(a);for(let j=-3;j<=3;j++){ctx.beginPath();ctx.arc(q.x+j*2,q.y+Math.sin(a*170+j)*1.3,9.5,0,Math.PI*2);ctx.fill();}}
 ctx.restore();this.lastProgress=p;this.tip=this.point(Math.min(.99999,p));const tick=Math.floor(this.elapsed*12);if(tick!==this.noiseTick){this.noiseTick=tick;particles.soil(this.x*114+this.tip.x,this.y*114+this.tip.y,7);if(tick%3===0)sound.rustle(.16);}return p>=1;}
 draw(c,bx,by){c.drawImage(this.base.surface,bx+this.x*114,by+this.y*114);c.drawImage(this.cover,bx+this.x*114,by+this.y*114);}
}
export class Particles{
 constructor(){this.items=[];}
 soil(x,y,n=7){for(let i=0;i<n&&this.items.length<180;i++)this.items.push({x,y,vx:(Math.random()-.5)*130,vy:-25-Math.random()*95,r:1+Math.random()*2.7,life:.5+Math.random()*.45,max:1,gold:false});}
 sparkle(x,y){for(let i=0;i<42;i++)this.items.push({x,y,vx:(Math.random()-.5)*100,vy:-30-Math.random()*100,r:1+Math.random()*2,life:1+Math.random(),max:2,gold:true});}
 update(dt){for(const p of this.items){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.gold?22:210)*dt;}this.items=this.items.filter(p=>p.life>0);}
 draw(c,bx,by){for(const p of this.items){c.globalAlpha=Math.min(1,p.life*3);c.fillStyle=p.gold?'#fff0a1':['#9f703b','#d0a264','#68431e'][Math.floor(p.r)%3];c.beginPath();c.arc(bx+p.x,by+p.y,p.r,0,Math.PI*2);c.fill();}c.globalAlpha=1;}
}
