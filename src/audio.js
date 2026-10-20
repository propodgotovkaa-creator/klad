// All sound is synthesized locally after a user gesture; no remote files.
export class Sound {
 constructor(){this.enabled=true;this.ctx=null;}
 unlock(){if(!this.enabled)return;try{this.ctx??=new (window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});}catch{}}
 tone(f=480,d=.09,delay=0){if(!this.enabled||!this.ctx)return;const c=this.ctx,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*.8,t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(c.destination);o.start(t);o.stop(t+d);}
 rustle(d=.2){if(!this.enabled||!this.ctx)return;const c=this.ctx,b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/a.length);const s=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();s.buffer=b;f.type='lowpass';f.frequency.value=1700;g.gain.value=.035;s.connect(f).connect(g).connect(c.destination);s.start();}
 win(){[523,659,784,1046].forEach((f,i)=>this.tone(f,.4,i*.14));}
}
