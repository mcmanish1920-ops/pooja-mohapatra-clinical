(()=>{
const base=window.SITE_CONFIG||{};const saved=(()=>{try{return JSON.parse(localStorage.getItem('pujaSiteConfigV14')||localStorage.getItem('pujaSiteConfigV13')||'null')}catch(e){return null}})();
const merge=(a,b)=>{if(!b)return a;const o=Array.isArray(a)?[...a]:{...a};Object.keys(b).forEach(k=>{o[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])?merge(o[k]||{},b[k]):b[k]});return o};const c=merge(base,saved);
const sectionImages=c.sectionImages||{};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const set=(s,v)=>{const el=$(s);if(el)el.textContent=v||''};
function render(){document.documentElement.style.setProperty('--primary',c.appearance.primary);document.documentElement.style.setProperty('--sage',c.appearance.sage);document.documentElement.style.setProperty('--cream',c.appearance.cream);document.documentElement.style.setProperty('--ink',c.appearance.ink);document.documentElement.style.setProperty('--gold',c.appearance.gold);document.documentElement.style.setProperty('--radius',c.appearance.radius+'px');
const heroSrc=sectionImages.hero||c.hero.image||'assets/hero.jpg';$('#heroImage').src=heroSrc;
[['about','about'],['services','services'],['approach','approach'],['journey','journey'],['practice','practice'],['reviews','reviews'],['faq','faq'],['contact','contact'],['cta','cta']].forEach(([id,section])=>{const el=$('#'+id);const src=sectionImages[section];if(el&&src)el.style.setProperty('--section-image',`url(\"${src}\")`);const img=$('#'+id+'Image');if(img&&src){img.src=src;img.loading='lazy';img.decoding='async';}});$('#navLogo').src=c.branding.logo||'assets/logo.png';set('#heroEyebrow',c.hero.eyebrow);set('#heroHeading',c.hero.heading);set('#heroHighlight',c.hero.highlight);set('#heroDescription',c.hero.description);set('#bio',c.professional.biography);set('#philosophy',c.philosophy);set('#qualifications',c.professional.qualifications);set('#registration',c.professional.registration);set('#experience',c.professional.experience);set('#phone',c.contact.phone);set('#email',c.contact.email);set('#address',c.contact.address);set('#footerEmail',c.contact.email);set('#footerPhone',c.contact.phone);set('#copyright',`© ${new Date().getFullYear()} ${c.professional.name}. All rights reserved.`);$$('[data-name]').forEach(e=>e.textContent=c.professional.name.toUpperCase());$$('[data-title]').forEach(e=>e.textContent=c.professional.designation);$('#pageTitle').textContent=`${c.site.name} | ${c.professional.designation}`;$('#metaDescription').content=c.site.description;const ogTitle=$('#ogTitle');if(ogTitle)ogTitle.content=`${c.site.name} | ${c.professional.designation}`;const ogDescription=$('#ogDescription');if(ogDescription)ogDescription.content=c.site.description;
$('#processGrid').innerHTML=(c.process||[]).map(x=>`<article class="process-card reveal"><span>${esc(x.number)}</span><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div><b>→</b></article>`).join('');
$('#servicesGrid').innerHTML=(c.services||[]).map((x,i)=>`<article class="service-card reveal" data-number="0${i+1}"><div class="service-icon">${['◉','♧','♡','▣'][i%4]}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><span class="arrow">→</span></article>`).join('');
$('#approachList').innerHTML=(c.approach||[]).map((x,i)=>`<div class="approach-item reveal"><span>0${i+1}</span><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></div>`).join('');
$('#journeyGrid').innerHTML=(c.timeline||[]).map((x,i)=>`<article class="journey-item reveal"><div class="journey-icon">${['♢','⌾','▤'][i%3]}</div><div><small>${esc(x.year)}</small><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join('');
$('#galleryGrid').innerHTML=(c.gallery||[]).map((x,i)=>`<figure class="gallery-card reveal" data-index="${i+1}"><img loading="lazy" decoding="async" src="${esc(x.image)}" alt="${esc(x.title)}"><figcaption><b>${esc(x.title)}</b><span>${esc(x.caption)}</span></figcaption></figure>`).join('');
$('#reviewGrid').innerHTML=(c.testimonials||[]).map(x=>`<article class="review-card reveal placeholder-review"><span>“</span><p>${esc(x.quote)}</p><b>${esc(x.name)}</b><small>${esc(x.context)}</small></article>`).join('');
$('#faqList').innerHTML=(c.faq||[]).map(x=>`<details><summary>${esc(x[0])}<span>+</span></summary><p>${esc(x[1])}</p></details>`).join('');
const social=c.social||{};$('#socials').innerHTML=Object.entries(social).filter(([,v])=>v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase()+k.slice(1))}</a>`).join('');
if(c.contact.bookingUrl){$$('a[href="#contact"]').forEach(a=>{if(a.classList.contains('pill'))a.href=c.contact.bookingUrl})}
}
render();
// V13 image system: one shared IndexedDB database for all section images.
(async()=>{
  try{
    const db=await new Promise((resolve,reject)=>{
      const r=indexedDB.open('pujaSiteCustomizerV13',1);
      r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('images'))r.result.createObjectStore('images',{keyPath:'id'});};
      r.onsuccess=()=>resolve(r.result); r.onerror=()=>reject(r.error);
    });
    const rows=await new Promise((resolve,reject)=>{
      const tx=db.transaction('images','readonly'), r=tx.objectStore('images').getAll();
      r.onsuccess=()=>resolve(r.result||[]); r.onerror=()=>reject(r.error);
    });
    const images=Object.fromEntries(rows.map(x=>[x.id,x.dataUrl]).filter(x=>x[1]));
    Object.entries(images).forEach(([id,url])=>{
      const img=$('#'+id+'Image'); if(img){img.src=url;img.loading=id==='hero'?'eager':'lazy';img.decoding='async';}
      if(id==='hero'){const hero=$('#heroImage'); if(hero) hero.src=url;}
      const section=$('#'+id); if(section) section.style.setProperty('--section-image',`url("${url}")`);
      if(id==='practice'){const first=$('#galleryGrid img'); if(first) first.src=url;}
    });
  }catch(e){console.warn('Customize images could not be loaded',e);}
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
menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');};
$$('#nav a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')});
addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}});
addEventListener('click',e=>{if(window.innerWidth<=760&&!nav.contains(e.target)&&!menu.contains(e.target)){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}});


const header=$('.header');
const updateHeader=()=>header.classList.toggle('scrolled',scrollY>18);
addEventListener('scroll',updateHeader,{passive:true});updateHeader();
const topButton=document.createElement('button');topButton.className='to-top';topButton.type='button';topButton.setAttribute('aria-label','Back to top');topButton.textContent='↑';document.body.appendChild(topButton);
topButton.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const updateTop=()=>topButton.classList.toggle('show',scrollY>700);addEventListener('scroll',updateTop,{passive:true});updateTop();
const mobileBook=$('#mobileBook');const contactSection=$('#contact');const updateMobileBook=()=>{if(!mobileBook||!contactSection)return;const r=contactSection.getBoundingClientRect();mobileBook.classList.toggle('hidden',scrollY<450||r.top<innerHeight*.72)};addEventListener('scroll',updateMobileBook,{passive:true});addEventListener('resize',updateMobileBook);updateMobileBook();

$('#consultationForm').addEventListener('submit',e=>{e.preventDefault();set('#formStatus','Thank you. This demo form is ready to connect to your verified email or booking system.');e.target.reset()});
})();
