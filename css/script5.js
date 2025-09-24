/* season-bg.js
   Seasonal background animations:
   - spring: sakura petals falling
   - summer: fireworks bursts
   - autumn: maple leaves falling
   - winter: snowflakes
   Includes simple UI hook (select#seasonSelect) and "auto by month".
*/

(() => {
  const canvas = document.getElementById('seasonCanvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  // state
  let season = localStorage.getItem('fs-season') || 'autumn';
  let autoMode = false;
  const select = document.getElementById('seasonSelect');

  // particles arrays
  let petals = [];
  let leaves = [];
  let snow = [];
  let fireworks = [];

  // utils
  function rand(min, max){ return Math.random()*(max-min)+min; }
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);

  // --- UI initialization
  function guessSeasonByMonth(m){
    // Northern hemisphere mapping
    if(m>=3 && m<=5) return 'spring';
    if(m>=6 && m<=8) return 'summer';
    if(m>=9 && m<=11) return 'autumn';
    return 'winter';
  }

  // set initial season (if "auto" was previously chosen)
  const saved = localStorage.getItem('fs-season-mode');
  if(saved === 'auto'){
    autoMode = true;
    season = guessSeasonByMonth(new Date().getMonth()+1);
  } else {
    const s = localStorage.getItem('fs-season');
    if(s) season = s;
  }

  // sync select UI
  function syncSelect(){
    if(autoMode) select.value = 'auto';
    else select.value = season;
  }
  syncSelect();

  select.addEventListener('change', (e) => {
    const v = e.target.value;
    if(v === 'auto'){
      autoMode = true;
      localStorage.setItem('fs-season-mode','auto');
      season = guessSeasonByMonth(new Date().getMonth()+1);
    } else {
      autoMode = false;
      localStorage.setItem('fs-season-mode','manual');
      season = v;
      localStorage.setItem('fs-season', v);
    }
    // re-seed particles for visible change
    seedForSeason();
  });

  // --- Particle factories per season
  function createPetal(){
    return {
      x: rand(-50, W+50),
      y: rand(-60, -10),
      vx: rand(-0.6, 0.6),
      vy: rand(0.6, 1.6),
      r: rand(8, 18),
      rot: rand(0, Math.PI*2),
      vrot: rand(-0.02, 0.02),
      color: ['#ffd3e6','#ffc0d9','#ffb3d1'][Math.floor(rand(0,3))]
    };
  }

  function createLeaf(){
    return {
      x: rand(-50, W+50),
      y: rand(-60, -10),
      vx: rand(-1.0, 1.5),
      vy: rand(0.8, 1.8),
      r: rand(10, 22),
      rot: rand(0, Math.PI*2),
      vrot: rand(-0.03, 0.03),
      color: ['#ff8c42','#ff5e3a','#b33f2a'][Math.floor(rand(0,3))]
    };
  }

  function createSnow(){
    return {
      x: rand(0, W),
      y: rand(-80, -10),
      vx: rand(-0.3, 0.3),
      vy: rand(0.6, 1.6),
      r: rand(1.2, 4),
      opacity: rand(0.6, 1)
    };
  }

  // fireworks: burst with particles
  function launchFirework(){
    const fx = rand(80, W-80);
    const fy = rand(60, H*0.45);
    const hue = Math.floor(rand(0, 360));
    // create burst
    const count = Math.floor(rand(18, 40));
    for(let i=0;i<count;i++){
      const angle = Math.random()*Math.PI*2;
      const speed = rand(1.8, 4.6);
      fireworks.push({
        x: fx, y: fy,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        life: 0,
        ttl: Math.floor(rand(40, 90)),
        hue,
        size: rand(1.6, 3.6),
        alpha: 1
      });
    }
  }

  // seed small initial particles for immediate effect
  function seedForSeason(){
    petals = []; leaves = []; snow = []; fireworks = [];
    if(season === 'spring'){ for(let i=0;i<30;i++) petals.push(createPetal()); }
    if(season === 'autumn'){ for(let i=0;i<28;i++) leaves.push(createLeaf()); }
    if(season === 'winter'){ for(let i=0;i<120;i++) snow.push(createSnow()); }
    if(season === 'summer'){ for(let i=0;i<2;i++) launchFirework(); }
  }
  seedForSeason();

  // draw helpers
  function drawPetal(p){
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(p.r*0.6, -p.r*0.7, 0, -p.r*1.2);
    ctx.quadraticCurveTo(-p.r*0.6, -p.r*0.7, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function drawLeaf(l){
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.rot);
    ctx.fillStyle = l.color;
    ctx.beginPath();
    ctx.moveTo(0, -l.r);
    ctx.bezierCurveTo(l.r*0.6, -l.r*0.3, l.r*0.6, l.r*0.3, 0, l.r);
    ctx.bezierCurveTo(-l.r*0.6, l.r*0.3, -l.r*0.6, -l.r*0.3, 0, -l.r);
    ctx.fill();
    ctx.restore();
  }

  function drawSnowflake(s){
    ctx.save();
    ctx.globalAlpha = s.opacity;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function drawFirework(f){
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = `hsla(${f.hue},90%,60%,${f.alpha})`;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI*2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }

  // update loops
  function updatePetals(){
    for(let i = petals.length-1;i>=0;i--){
      const p = petals[i];
      p.rot += p.vrot;
      p.x += p.vx + Math.sin(p.y * 0.01) * 0.6;
      p.y += p.vy;
      if(p.y > H + 40 || p.x < -80 || p.x > W + 80) petals.splice(i,1);
    }
    // spawn occasionally
    if(Math.random() < 0.7) petals.push(createPetal());
  }

  function updateLeaves(){
    for(let i = leaves.length-1;i>=0;i--){
      const l = leaves[i];
      l.rot += l.vrot;
      l.x += l.vx + Math.sin(l.y * 0.01) * 0.8;
      l.y += l.vy;
      if(l.y > H + 60 || l.x < -100 || l.x > W + 100) leaves.splice(i,1);
    }
    if(Math.random() < 0.6) leaves.push(createLeaf());
  }

  function updateSnow(){
    for(let i = snow.length-1;i>=0;i--){
      const s = snow[i];
      s.x += s.vx;
      s.y += s.vy + Math.sin(s.x*0.01)*0.2;
      if(s.y > H + 20) { snow.splice(i,1); }
    }
    if(Math.random() < 0.9) snow.push(createSnow());
  }

  function updateFireworks(){
    for(let i = fireworks.length-1;i>=0;i--){
      const f = fireworks[i];
      f.life++;
      f.x += f.vx;
      f.y += f.vy + 0.02 * f.life; // gravity-ish
      f.alpha = 1 - (f.life / f.ttl);
      if(f.life > f.ttl) fireworks.splice(i,1);
    }
    if(Math.random() < 0.02) launchFirework();
  }

  // background gradient per season
  function paintBackground(){
    let g;
    if(season === 'spring'){
      g = ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,'#fff8fb'); g.addColorStop(1,'#fff0f6');
    } else if(season === 'summer'){
      g = ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,'#020428'); g.addColorStop(1,'#2c5364'); // midnight blue gradient
    } else if(season === 'autumn'){
      g = ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,'#fff7f0'); g.addColorStop(1,'#fff0e6');
    } else { // winter
      g = ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,'#f6fbff'); g.addColorStop(1,'#eaf6ff');
    }
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);
  }

  // main draw loop
  let raf = null;
  let visible = true;
  function step(){
    if(!visible) return;
    paintBackground();

    if(season === 'spring'){
      updatePetals();
      for(const p of petals) drawPetal(p);
    } else if(season === 'autumn'){
      updateLeaves();
      for(const l of leaves) drawLeaf(l);
    } else if(season === 'winter'){
      updateSnow();
      for(const s of snow) drawSnowflake(s);
    } else if(season === 'summer'){
      // dark background for fireworks
      updateFireworks();
      for(const f of fireworks) drawFirework(f);
    }

    raf = requestAnimationFrame(step);
  }

  // pause when not visible
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if(visible){
      // if auto mode might need to recompute
      if(autoMode) season = guessSeasonByMonth(new Date().getMonth()+1);
      seedForSeason();
      step();
    } else {
      cancelAnimationFrame(raf);
    }
  });

  // initial run
  seedForSeason();
  step();

  // keep background in sync with auto mode if time flows
  setInterval(() => {
    if(autoMode){
      const s = guessSeasonByMonth(new Date().getMonth()+1);
      if(s !== season){
        season = s;
        seedForSeason();
      }
    }
  }, 30_000); // check every 30s

  // expose for debugging or external control
  window.FourSeasonsBG = {
    setSeason(s, save=true){
      if(s === 'auto'){
        autoMode = true; localStorage.setItem('fs-season-mode','auto');
        season = guessSeasonByMonth(new Date().getMonth()+1);
      } else {
        autoMode = false; localStorage.setItem('fs-season-mode','manual');
        season = s;
        if(save) localStorage.setItem('fs-season', s);
      }
      seedForSeason();
    },
    getSeason(){ return season; }
  };

})();
