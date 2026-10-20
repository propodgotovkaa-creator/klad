// All sound is synthesized locally after a user gesture; no remote files.
export class Sound {
 constructor(){this.enabled=true;this.ctx=null;}
 unlock(){if(!this.enabled)return;try{this.ctx??=new (window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});}catch{}}
 rustle(d=.2){if(!this.enabled||!this.ctx)return;const c=this.ctx,b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/a.length);const s=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();s.buffer=b;f.type='lowpass';f.frequency.value=1700;g.gain.value=.035;s.connect(f).connect(g).connect(c.destination);s.start();}
}
