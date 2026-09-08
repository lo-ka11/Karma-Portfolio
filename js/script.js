const phrases = ["baue an Netzwerken.", "automatisiere Abläufe.", "Selbstständig & Teamarbeit", "vernetztes Denken."];
  const el = document.getElementById('typed');
  let idx = 0;
  function cycle(){
    el.style.opacity = 0;
    setTimeout(()=>{
      el.textContent = phrases[idx];
      el.style.opacity = 1;
      idx = (idx + 1) % phrases.length;
    }, 300);
  }
  el.style.transition = 'opacity .3s ease';
  cycle();
  setInterval(cycle, 2600);

  const revealEls = document.querySelectorAll('.reveal, .skill-card, .postcard');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((entry, i)=>{
      if(entry.isIntersecting){
        setTimeout(()=>entry.target.classList.add('in-view'), i * 50);
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(elm=>io.observe(elm));

  const sections = ['hero','about','skills','projects','journey','contact'];
  const labels = ['Start','Über mich','Skills','Projekte','Werdegang','Kontakt'];
  const rail = document.getElementById('routeRail');
  sections.forEach((id, i)=>{
    const stop = document.createElement('div');
    stop.className = 'stop';
    stop.style.top = (i / (sections.length-1) * 100) + '%';
    stop.dataset.id = id;
    const label = document.createElement('div');
    label.className = 'stop-label';
    label.textContent = labels[i];
    stop.appendChild(label);
    stop.addEventListener('click', ()=>document.getElementById(id).scrollIntoView({behavior:'smooth'}));
    rail.appendChild(stop);
  });
  const fillEl = document.getElementById('railFill');
  const stops = document.querySelectorAll('.route-rail .stop');

  function updateRail(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (scrollTop / docHeight) * 100);
    fillEl.style.height = pct + '%';
    let activeIdx = 0;
    sections.forEach((id, i)=>{
      const elm = document.getElementById(id);
      if(elm.getBoundingClientRect().top < window.innerHeight * 0.5) activeIdx = i;
    });
    stops.forEach((s, i)=> s.classList.toggle('active', i <= activeIdx));
  }
  window.addEventListener('scroll', updateRail);
  updateRail();

  const menuBtn = document.querySelector('.menu-btn');
  const navlinks = document.querySelector('.navlinks');
  menuBtn.addEventListener('click', ()=>{
    const open = navlinks.style.display === 'flex';
    navlinks.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:78px;left:0;right:0;background:#1C1826;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.1);gap:18px;';
  });