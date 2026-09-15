// ============================================
// SPRACHE (DE/EN)
// ============================================
let currentLang = 'de';

// Die Texte für den "Cycler" im Hero-Bereich, für beide Sprachen
const cyclerPhrases = {
  de: ["baue an Netzwerken.", "automatisiere Abläufe.", "Selbstständig & Teamarbeit", "vernetztes Denken."],
  en: ["build networks.", "automate workflows.", "Independent & team player", "connected thinking."]
};

// Die Labels für die Scroll-Route (route rail), für beide Sprachen
const sectionLabels = {
  de: ['Start', 'Über mich', 'Skills', 'Projekte', 'Werdegang', 'Kontakt'],
  en: ['Start', 'About', 'Skills', 'Projects', 'Journey', 'Contact']
};

// Wendet die aktuelle Sprache auf alle markierten Elemente an
function applyLanguage(lang) {
  currentLang = lang;

  // Reines <html lang="..."> Attribut aktualisieren (wichtig für Screenreader/SEO)
  document.documentElement.lang = lang;

  // 1) Einfache Text-Elemente: data-de / data-en
  document.querySelectorAll('[data-de]').forEach((el) => {
    const value = el.getAttribute('data-' + lang);
    if (value !== null) el.textContent = value;
  });

  // 2) Elemente mit HTML-Inhalt (z.B. <strong>, <em>, <br>): data-de-html / data-en-html
  document.querySelectorAll('[data-de-html]').forEach((el) => {
    const value = el.getAttribute('data-' + lang + '-html');
    if (value !== null) el.innerHTML = value;
  });

  // 3) Umschalt-Button: zeigt die Sprache, zu der man wechseln WÜRDE
  const toggleBtn = document.getElementById('langToggle');
  toggleBtn.textContent = lang === 'de' ? 'EN' : 'DE';

  // 4) Route-Rail Labels aktualisieren (werden dynamisch erzeugt, siehe unten)
  const stopLabels = document.querySelectorAll('.route-rail .stop-label');
  stopLabels.forEach((label, i) => {
    label.textContent = sectionLabels[lang][i];
  });
}

// Klick-Handler für den Umschalt-Button
document.getElementById('langToggle').addEventListener('click', () => {
  const newLang = currentLang === 'de' ? 'en' : 'de';
  applyLanguage(newLang);
});


// ============================================
// TEXT-CYCLER IM HERO
// ============================================
const el = document.getElementById('typed');
let idx = 0;
function cycle(){
  el.style.opacity = 0;
  setTimeout(()=>{
    el.textContent = cyclerPhrases[currentLang][idx];
    el.style.opacity = 1;
    idx = (idx + 1) % cyclerPhrases[currentLang].length;
  }, 300);
}
el.style.transition = 'opacity .3s ease';
cycle();
setInterval(cycle, 2600);


// ============================================
// SCROLL-EINBLENDUNGEN (Reveal)
// ============================================
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


// ============================================
// SCROLL-ROUTE (linke Leiste)
// ============================================
const sections = ['hero','about','skills','projects','journey','contact'];
const rail = document.getElementById('routeRail');
sections.forEach((id, i)=>{
  const stop = document.createElement('div');
  stop.className = 'stop';
  stop.style.top = (i / (sections.length-1) * 100) + '%';
  stop.dataset.id = id;
  const label = document.createElement('div');
  label.className = 'stop-label';
  label.textContent = sectionLabels[currentLang][i]; // Startsprache
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


// ============================================
// MOBILE MENÜ
// ============================================
const menuBtn = document.querySelector('.menu-btn');
const navlinks = document.querySelector('.navlinks');
menuBtn.addEventListener('click', ()=>{
  const open = navlinks.style.display === 'flex';
  navlinks.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:78px;left:0;right:0;background:#1C1826;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.1);gap:18px;';
});
