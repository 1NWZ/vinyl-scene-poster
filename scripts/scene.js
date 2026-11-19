/* Original Canvas 2D motion study. No browser libraries required. */
(function (root) {
  'use strict';
  const W=1080,H=1440,T=6,FPS=30,TAU=Math.PI*2;
  const cx=430,cy=610,R=660,labelR=232;
  const colors={paper:'#F2EFE4',ink:'#183C2D',cream:'#EB8B84',coffee:'#183D2E'};
  function circle(c,x,y,r,fill,stroke,width=1){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}}
  function line(c,points,stroke,width){c.beginPath();c.moveTo(...points[0]);for(const p of points.slice(1))c.lineTo(...p);c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}
  function seeded(seed){let a=seed;return()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296}}
  const random=seeded(2173);
  const specks=Array.from({length:1100},()=>({x:random()*W,y:random()*H,a:random()*.06}));
  const stars=Array.from({length:3},()=>({r:280+random()*405,a:random()*TAU,s:2.5+random()*3.5,p:random()*TAU,k:1+Math.floor(random()*3)}));
  function text(c,str,x,y,font,color=colors.ink,align='left'){c.font=font;c.fillStyle=color;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(str,x,y)}
  function arcText(c,str,r,font,centerAngle,color){c.save();c.font=font;c.fillStyle=color;c.textBaseline='middle';c.textAlign='center';let ws=[...str].map(ch=>c.measureText(ch).width+1.4),total=ws.reduce((a,b)=>a+b,0)/r;let a=centerAngle-total/2;[...str].forEach((ch,i)=>{a+=ws[i]/r/2;c.save();c.translate(Math.cos(a)*r,Math.sin(a)*r);c.rotate(a+Math.PI/2);c.fillText(ch,0,0);c.restore();a+=ws[i]/r/2});c.restore()}
  function buildLayers(makeCanvas,topdownScene){
    const paper=makeCanvas(W,H),p=paper.getContext('2d');
    p.fillStyle=colors.paper;p.fillRect(0,0,W,H);
    for(const dot of specks){p.fillStyle=`rgba(45,64,42,${dot.a})`;p.fillRect(dot.x,dot.y,1.2,1.2)}
    text(p,'WEEKEND',1010,69,'16px Georgia',colors.ink,'right');
    text(p,'AT HOME / 01',1010,97,'12px Arial',colors.ink,'right');
    line(p,[[942,112],[1010,112]],'#A38E70',1);
    text(p,'A quiet Saturday,',51,1351,'italic 30px Georgia');
    text(p,'on repeat.',51,1387,'italic 30px Georgia');
    text(p,'WATERMELON  /  BOOKS  /  ONE MORE EPISODE',1014,1398,'10px Arial',colors.ink,'right');

    const plate=makeCanvas(1480,1480),d=plate.getContext('2d');d.translate(740,740);
    let rim=d.createRadialGradient(-60,-80,530,0,0,R);rim.addColorStop(0,'#D5C9AE');rim.addColorStop(.96,'#B8B29F');rim.addColorStop(.975,'#ECE3D1');rim.addColorStop(.99,'#898D81');rim.addColorStop(1,'#EFE6D7');circle(d,0,0,R,rim);
    // This is a regenerated, coherent 90-degree overhead scene, not a cutout atlas.
    d.save();circle(d,0,0,R-11);d.clip();
    d.drawImage(topdownScene,-R+11,-R+11,(R-11)*2,(R-11)*2);
    // Subtle record grooves sit over the model-generated weekend tabletop.
    for(let r=249;r<R-19;r+=12){circle(d,0,0,r,null,'rgba(210,223,176,.06)',.7)}
    d.restore();

    const label=makeCanvas(496,496),l=label.getContext('2d');l.translate(248,248);
    let lg=l.createLinearGradient(-200,-220,180,230);lg.addColorStop(0,'#F4B5AA');lg.addColorStop(.6,'#EB8B84');lg.addColorStop(1,'#DA7D77');circle(l,0,0,labelR,lg,'#2F4938',1.3);
    circle(l,0,0,labelR-16,null,'rgba(50,75,50,.7)',1);circle(l,0,0,76,null,'rgba(50,75,50,.56)',.9);
    arcText(l,'Slow Saturday',176,'italic 51px Georgia',-Math.PI/2,'#173F2B');
    text(l,'S I D E  A',0,-99,'12px Arial','#234532','center');
    text(l,'01  WATERMELON BREAK',0,112,'12px Arial','#244832','center');
    text(l,'02  ONE MORE EPISODE',0,135,'12px Arial','#244832','center');
    text(l,'SLOW LITTLE MOMENTS',0,176,'9px Arial','#34523A','center');
    circle(l,0,0,12,'#34251D');circle(l,-3,-3,3.7,'#D8CFBC');
    return {paper,plate,label};
  }
  function sparkle(c,x,y,s,alpha){c.save();c.translate(x,y);c.globalAlpha=alpha;c.beginPath();c.moveTo(0,-s*1.8);c.quadraticCurveTo(s*.16,-s*.1,s*1.4,0);c.quadraticCurveTo(s*.16,s*.1,0,s*1.8);c.quadraticCurveTo(-s*.16,s*.1,-s*1.4,0);c.quadraticCurveTo(-s*.16,-s*.1,0,-s*1.8);c.fillStyle='#FFF2CC';c.fill();c.restore()}
  function drawArm(c){
    const pivot={x:969,y:1190},tip={x:686,y:684};
    c.save();c.lineCap='round';c.lineJoin='round';
    c.shadowColor='rgba(38,22,10,.14)';c.shadowBlur=10;c.shadowOffsetY=6;
    circle(c,pivot.x,pivot.y,96,'#D4D3C5','#7C8277',1.2);c.shadowColor='transparent';
    circle(c,pivot.x,pivot.y,86,'#E9E8D8','#FDF9E9',2);circle(c,pivot.x,pivot.y,60,'#C8CBBF','#8C9286',1);circle(c,pivot.x,pivot.y,37,'#453729');circle(c,pivot.x,pivot.y,24,'#6D6450');
    // Wooden grip echoes the source stationery; a silver articulated shaft stays fixed.
    c.save();c.translate(pivot.x+42,pivot.y+73);c.rotate(-.55);c.fillStyle='#6D7A69';c.strokeStyle='#475B48';c.lineWidth=1;c.beginPath();c.roundRect(-20,-18,40,66,7);c.fill();c.stroke();c.restore();
    c.shadowColor='rgba(24,12,4,.25)';c.shadowBlur=6;c.shadowOffsetX=5;c.shadowOffsetY=5;
    line(c,[[pivot.x,pivot.y],[731,759],[tip.x,tip.y]],'#79877E',26);c.shadowColor='transparent';
    line(c,[[pivot.x-1,pivot.y-2],[726,757],[tip.x-2,tip.y-2]],'#E0E4D8',20);
    line(c,[[pivot.x-5,pivot.y-5],[723,759],[tip.x-6,tip.y-1]],'#FFFDF0',6);
    c.save();c.translate(tip.x,tip.y);c.rotate(-.61);
    c.shadowColor='rgba(18,8,2,.22)';c.shadowBlur=6;c.shadowOffsetY=5;
    c.fillStyle='#EFF0DF';c.strokeStyle='#89958A';c.lineWidth=1.5;c.beginPath();c.roundRect(-37,-51,74,99,6);c.fill();c.stroke();c.shadowColor='transparent';
    line(c,[[-22,-28],[-22,7]],'#919C90',2);line(c,[[0,-28],[0,7]],'#919C90',2);line(c,[[22,-28],[22,7]],'#919C90',2);
    c.fillStyle='#C87876';c.fillRect(-23,24,46,6);c.fillStyle='#5C6D61';c.fillRect(-4,-63,8,12);c.restore();c.restore();
  }
  function renderFrame(ctx,t,assets,scale=1){
    const u=((t%T)+T)%T/T,angle=-TAU*u-.08*Math.sin(TAU*u);
    ctx.setTransform(scale,0,0,scale,0,0);ctx.globalAlpha=1;ctx.clearRect(0,0,W,H);ctx.drawImage(assets.paper,0,0);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.drawImage(assets.plate,-740,-740);
    ctx.save();circle(ctx,0,0,R-13);ctx.clip();
    // All reconstructed subjects share the plate coordinate system.
    // Their contact ripples, light and scale were generated together.
    stars.forEach(s=>{const v=(1+Math.sin(TAU*u*s.k+s.p))/2;sparkle(ctx,Math.cos(s.a)*s.r,Math.sin(s.a)*s.r,s.s,.04+.38*v*v*v)});
    ctx.restore();ctx.drawImage(assets.label,-248,-248);ctx.restore();
    drawArm(ctx);
  }
  const api={W,H,T,FPS,colors,buildLayers,renderFrame};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CafeVinyl=api;
})(typeof window!=='undefined'?window:globalThis);
