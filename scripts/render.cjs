const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const {once}=require('node:events');
const canvas=require(process.env.CANVAS_MODULE||'@napi-rs/canvas');
const scene=require('./scene.js');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const args=process.argv.slice(2);
 const flag=name=>{const i=args.indexOf(name);return i<0?null:args[i+1]};
 const out=path.resolve(flag('--out')||path.join(root,'outputs'));
 fs.mkdirSync(out,{recursive:true});
 const topdownScene=await canvas.loadImage(path.resolve(flag('--scene')||path.join(root,'demo-scene.png')));
 const assets=scene.buildLayers(canvas.createCanvas,topdownScene);
 const c=canvas.createCanvas(scene.W,scene.H),ctx=c.getContext('2d');
 scene.renderFrame(ctx,0,assets);fs.writeFileSync(path.join(out,'cover.png'),c.toBuffer('image/png'));
 // A label raster makes typography identical in the offline browser preview.
 fs.writeFileSync(path.join(out,'label.png'),assets.label.toBuffer('image/png'));
 if(process.argv.includes('--cover'))return;
 const ff=process.env.FFMPEG||'ffmpeg';
 const proc=spawn(ff,['-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgba','-video_size',`${scene.W}x${scene.H}`,'-framerate',String(scene.FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart','-y',path.join(out,'poster.mp4')],{stdio:['pipe','inherit','inherit']});
 const finished=once(proc,'close');proc.stdin.on('error',e=>{if(e.code!=='EPIPE')console.error(e)});
 for(let n=0;n<scene.T*scene.FPS;n++){
   scene.renderFrame(ctx,n/scene.FPS,assets);
   const raw=Buffer.from(ctx.getImageData(0,0,scene.W,scene.H).data);
   if(!proc.stdin.write(raw))await once(proc.stdin,'drain');
   if(n%45===0)console.log(`Rendered ${n}/180`);
 }
 proc.stdin.end();const [code]=await finished;if(code!==0)throw Error(`ffmpeg exited ${code}`);
 scene.renderFrame(ctx,scene.T,assets);const end=c.toBuffer('image/png');
 console.log('Loop endpoints equal:',end.equals(fs.readFileSync(path.join(out,'cover.png'))));
 console.log('Rendered poster.mp4');
})().catch(e=>{console.error(e);process.exit(1)});
