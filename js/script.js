(()=>{
const base=window.SITE_CONFIG||{};const saved=(()=>{try{return JSON.parse(localStorage.getItem('pujaSiteConfigV12')||'null')}catch(e){return null}})();
const merge=(a,b)=>{if(!b)return a;const o=Array.isArray(a)?[...a]:{...a};Object.keys(b).forEach(k=>{o[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])?merge(o[k]||{},b[k]):b[k]});return o};const c=merge(base,saved);
const sectionImages=c.sectionImages||{};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const set=(s,v)=>{const el=$(s);if(el)el.textContent=v||''};
function render(){document.documentElement.style.setProperty('--primary',c.appearance.primary);document.documentElement.style.setProperty('--sage',c.appearance.sage);document.documentElement.style.setProperty('--cream',c.appearance.cream);document.documentElement.style.setProperty('--ink',c.appearance.ink);document.documentElement.style.setProperty('--gold',c.appearance.gold);document.documentElement.style.setProperty('--radius',c.appearance.radius+'px');
$('#heroImage').src=sectionImages.hero||c.hero.image||'assets/hero.jpg';
[['about','about'],['services','services'],['approach','approach'],['journey','journey'],['practice','practice'],['reviews','reviews'],['faq','faq'],['contact','contact'],['cta','cta']].forEach(([id,section])=>{const el=$('#'+id);if(el&&sectionImages[section])el.style.setProperty('--section-image',`url(\"${sectionImages[section]}\")`)});$('#navLogo').src=c.branding.logo||'assets/logo.png';set('#heroEyebrow',c.hero.eyebrow);set('#heroHeading',c.hero.heading);set('#heroHighlight',c.hero.highlight);set('#heroDescription',c.hero.description);set('#bio',c.professional.biography);set('#philosophy',c.philosophy);set('#qualifications',c.professional.qualifications);set('#registration',c.professional.registration);set('#experience',c.professional.experience);set('#phone',c.contact.phone);set('#email',c.contact.email);set('#address',c.contact.address);set('#footerEmail',c.contact.email);set('#footerPhone',c.contact.phone);set('#copyright',`© ${new Date().getFullYear()} ${c.professional.name}. All rights reserved.`);$$('[data-name]').forEach(e=>e.textContent=c.professional.name.toUpperCase());$$('[data-title]').forEach(e=>e.textContent=c.professional.designation);$('#pageTitle').textContent=`${c.site.name} | ${c.professional.designation}`;$('#metaDescription').content=c.site.description;
$('#servicesGrid').innerHTML=(c.services||[]).map((x,i)=>`<article class="service-card reveal"><div class="service-icon">${['◉','♧','♡','▣'][i%4]}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><span class="arrow">→</span></article>`).join('');
$('#approachList').innerHTML=(c.approach||[]).map((x,i)=>`<div class="approach-item reveal"><span>0${i+1}</span><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></div>`).join('');
$('#journeyGrid').innerHTML=(c.timeline||[]).map((x,i)=>`<article class="journey-item reveal"><div class="journey-icon">${['♢','⌾','▤'][i%3]}</div><div><small>${esc(x.year)}</small><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join('');
$('#galleryGrid').innerHTML=(c.gallery||[]).map(x=>`<figure class="gallery-card reveal"><img src="${esc(x.image)}" alt="${esc(x.title)}"><figcaption><b>${esc(x.title)}</b><span>${esc(x.caption)}</span></figcaption></figure>`).join('');
$('#reviewGrid').innerHTML=(c.testimonials||[]).map(x=>`<article class="review-card reveal"><span>“</span><p>${esc(x.quote)}</p><b>${esc(x.name)}</b><small>${esc(x.context)}</small></article>`).join('');
$('#faqList').innerHTML=(c.faq||[]).map(x=>`<details><summary>${esc(x[0])}<span>+</span></summary><p>${esc(x[1])}</p></details>`).join('');
const social=c.social||{};$('#socials').innerHTML=Object.entries(social).filter(([,v])=>v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase()+k.slice(1))}</a>`).join('');
if(c.contact.bookingUrl){$$('a[href="#contact"]').forEach(a=>{if(a.classList.contains('pill'))a.href=c.contact.bookingUrl})}
}
render();
// V12.5: load per-section images from IndexedDB (more reliable than localStorage on Android).
(async()=>{
  try{
    const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('pujaSiteCustomizerV12_5',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('images'))r.result.createObjectStore('images',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
    const images=await new Promise((resolve,reject)=>{const tx=db.transaction('images','readonly'),r=tx.objectStore('images').getAll();r.onsuccess=()=>resolve(Object.fromEntries(r.result.map(x=>[x.id,x.dataUrl])));r.onerror=()=>reject(r.error)});
    Object.entries(images).forEach(([id,url])=>{
      if(id==='hero'){const img=$('#heroImage');if(img)img.src=url;}
      else {const el=$('#'+id);if(el)el.style.setProperty('--section-image',`url(\"${url}\")`);}
    });
  }catch(e){}
})();
// Motion system: smooth reveals, staggered cards, gentle parallax, and active navigation.
const revealEls=$$('.reveal');
revealEls.forEach((el,i)=>el.style.setProperty('--reveal-delay',`${Math.min((i%5)*70,280)}ms`));
const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}
}),{threshold:.10,rootMargin:'0px 0px -7% 0px'});
revealEls.forEach(el=>io.observe(el));

const sectionEls=$$('main section[id]');
const navLinks=$$('#nav a[href^="#"]');
const setActive=(id)=>navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sectionEls.forEach(el=>sectionObserver.observe(el));

let ticking=false;
const updateMotion=()=>{
  if(ticking)return;
  ticking=true;
  requestAnimationFrame(()=>{
    const y=scrollY;
    document.documentElement.style.setProperty('--scroll-y',`${y}px`);
    const heroImg=$('#heroImage');
    if(heroImg){const heroRect=heroImg.getBoundingClientRect();const shift=Math.max(-18,Math.min(18,(innerHeight/2-heroRect.top-heroRect.height/2)*0.035));heroImg.style.transform=`translate3d(0,${shift}px,0) scale(1.01)`;}
    $$('.section').forEach(el=>{
      const r=el.getBoundingClientRect();
      const offset=Math.max(-28,Math.min(28,(innerHeight/2-(r.top+r.height/2))*0.025));
      el.style.setProperty('--bg-shift',`${offset}px`);
    });
    const h=document.documentElement.scrollHeight-innerHeight;
    $('#progress').style.width=`${scrollY/Math.max(h,1)*100}%`;
    ticking=false;
  });
};
addEventListener('scroll',updateMotion,{passive:true});addEventListener('resize',updateMotion);updateMotion();

const menu=$('#menu'),nav=$('#nav');
menu.setAttribute('aria-expanded','false');
menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));};
$$('#nav a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')});
addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
addEventListener('click',e=>{if(window.innerWidth<=760&&!nav.contains(e.target)&&!menu.contains(e.target)){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});

$('#consultationForm').addEventListener('submit',e=>{e.preventDefault();set('#formStatus','Thank you. This demo form is ready to connect to your verified email or booking system.');e.target.reset()});
})();
