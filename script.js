(()=>{
'use strict';
const base=window.SITE_CONFIG||{};
const saved=(()=>{try{return JSON.parse(localStorage.getItem('pujaSiteConfigV21')||localStorage.getItem('pujaSiteConfigV14')||localStorage.getItem('pujaSiteConfigV13')||'null')}catch(e){return null}})();
const merge=(a,b)=>{if(!b)return a;const o=Array.isArray(a)?[...a]:{...a};Object.keys(b).forEach(k=>{o[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])?merge(o[k]||{},b[k]):b[k]});return o};
const c=merge(base,saved);
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const set=(sel,value)=>{const el=$(sel);if(el)el.textContent=value??''};
const fill=(id,html)=>{const el=$('#'+id);if(el)el.innerHTML=html};
function render(){
 const appearance=c.appearance||{};
 ['primary','sage','cream','ink','gold'].forEach(k=>{if(appearance[k])document.documentElement.style.setProperty('--'+k,appearance[k]);});
 if(appearance.radius)document.documentElement.style.setProperty('--radius',appearance.radius+'px');
 const sectionImages=c.sectionImages||{};
 const imageDefaults={
   hero:c.hero?.image||'assets/hero-reference.jpg',
   about:'assets/about-reference.jpg',
   journey:'assets/journey-reference.jpg',
   approach:'assets/approach-reference.jpg',
   practice:'assets/practice-1-reference.jpg',
   reviews:null,
   faq:'assets/contact-reference.jpg',
   contact:'assets/contact-reference.jpg'
 };
 const hero=$('#heroImage'); if(hero) hero.src=imageDefaults.hero;
 Object.entries(imageDefaults).forEach(([id,src])=>{
   const img=$('#'+id+'Image'); if(img&&src){img.src=src;img.loading=id==='hero'?'eager':'lazy';img.decoding='async';}
 });
 Object.entries(sectionImages).forEach(([id,src])=>{
   const section=$('#'+id); if(section&&src && id!=='hero' && !['about','journey','approach','practice','faq','contact'].includes(id)) section.style.setProperty('--section-image',`url("${src}")`);
 });
 const logo=$('#navLogo');if(logo)logo.src=c.branding?.logo||'assets/logo.png';
 set('#heroEyebrow',c.hero?.eyebrow);set('#heroHeading',c.hero?.heading);set('#heroHighlight',c.hero?.highlight);set('#heroDescription',c.hero?.description);
 set('#bio',c.professional?.biography);set('#philosophy',c.philosophy);set('#qualifications',c.professional?.qualifications);set('#registration',c.professional?.registration);set('#experience',c.professional?.experience);
 set('#phone',c.contact?.phone);set('#email',c.contact?.email);set('#address',c.contact?.address);set('#footerEmail',c.contact?.email);set('#footerPhone',c.contact?.phone);
 set('#copyright',`© ${new Date().getFullYear()} ${c.professional?.name||c.site?.name||''}. All rights reserved.`);
 $$('[data-name]').forEach(e=>e.textContent=(c.professional?.name||c.site?.name||'').toUpperCase());
 $$('[data-title]').forEach(e=>e.textContent=c.professional?.designation||c.site?.title||'');
 const title=$('#pageTitle');if(title)title.textContent=`${c.site?.name||''} | ${c.professional?.designation||c.site?.title||''}`;
 const meta=$('#metaDescription');if(meta)meta.content=c.site?.description||'';
 const ogt=$('#ogTitle');if(ogt)ogt.content=title?.textContent||'';const ogd=$('#ogDescription');if(ogd)ogd.content=c.site?.description||'';
 fill('servicesGrid',(c.services||[]).map((x,i)=>`<article class="service-card reveal" data-service="${esc(x.title)}"><div class="service-icon">${['◉','♧','♡','▣'][i%4]}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><button class="service-request" type="button">Request this service <span>→</span></button></article>`).join(''));
 fill('reviewGrid',(c.testimonials||[]).map(x=>`<article class="review-card reveal placeholder-review"><span>“</span><p>${esc(x.quote)}</p><b>${esc(x.name)}</b><small>${esc(x.context)}</small></article>`).join(''));
 fill('faqList',(c.faq||[]).map(x=>`<details><summary>${esc(x[0])}<span>+</span></summary><p>${esc(x[1])}</p></details>`).join(''));
 const socials=$('#socials');if(socials){const social=c.social||{};socials.innerHTML=Object.entries(social).filter(([,v])=>v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase()+k.slice(1))}</a>`).join('');}
 if(c.contact?.bookingUrl)$$('a[href="#contact"]').forEach(a=>{if(a.classList.contains('pill')||a.classList.contains('nav-book'))a.href=c.contact.bookingUrl});
}
render();

(async()=>{try{
 const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('pujaSiteCustomizerV21',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('images'))r.result.createObjectStore('images',{keyPath:'id'});};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
 const rows=await new Promise((resolve,reject)=>{const tx=db.transaction('images','readonly'),r=tx.objectStore('images').getAll();r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error)});
 Object.entries(Object.fromEntries(rows.map(x=>[x.id,x.dataUrl]).filter(x=>x[1]))).forEach(([id,url])=>{const img=$('#'+id+'Image');if(img)img.src=url;const section=$('#'+id);if(section)section.style.setProperty('--section-image',`url("${url}")`);if(id==='practice'){const first=$('#practiceImage');if(first)first.src=url}});
 }catch(e){console.warn('Customize images unavailable',e)}})();

const revealEls=$$('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -7% 0px'});revealEls.forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${Math.min((i%5)*70,280)}ms`);io.observe(el)})}else revealEls.forEach(el=>el.classList.add('in'));
const sectionEls=$$('main section[id]');const navLinks=$$('#nav a[href^="#"]');const setActive=id=>navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
if('IntersectionObserver' in window){const so=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)}),{rootMargin:'-35% 0px -55% 0px'});sectionEls.forEach(el=>so.observe(el))}
let ticking=false;const updateMotion=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=window.scrollY||0;document.documentElement.style.setProperty('--scroll-y',`${y}px`);const heroImg=$('#heroImage');if(heroImg&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const r=heroImg.getBoundingClientRect();const shift=Math.max(-18,Math.min(18,(innerHeight/2-r.top-r.height/2)*.035));heroImg.style.transform=`translate3d(0,${shift}px,0) scale(1.01)`}const progress=$('#progress');if(progress){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${y/Math.max(h,1)*100}%`}ticking=false})};addEventListener('scroll',updateMotion,{passive:true});addEventListener('resize',updateMotion);updateMotion();
const menu=$('#menu'),nav=$('#nav');if(menu&&nav){menu.setAttribute('aria-expanded','false');menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')};$$('#nav a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')});addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}})}
const header=$('.header');if(header){const uh=()=>header.classList.toggle('scrolled',(window.scrollY||0)>18);addEventListener('scroll',uh,{passive:true});uh()}
const topButton=document.createElement('button');topButton.className='to-top';topButton.type='button';topButton.setAttribute('aria-label','Back to top');topButton.textContent='↑';document.body.appendChild(topButton);topButton.onclick=()=>scrollTo({top:0,behavior:'smooth'});const ut=()=>topButton.classList.toggle('show',(window.scrollY||0)>700);addEventListener('scroll',ut,{passive:true});ut();
const mobileBook=$('#mobileBook'),contactSection=$('#contact');if(mobileBook&&contactSection){const um=()=>{const r=contactSection.getBoundingClientRect();mobileBook.classList.toggle('hidden',(window.scrollY||0)<450||r.top<innerHeight*.72)};addEventListener('scroll',um,{passive:true});addEventListener('resize',um);um()}
const serviceInput=$('#serviceInput');
if(serviceInput){(c.services||[]).forEach(x=>{const o=document.createElement('option');o.value=x.title;o.textContent=x.title;serviceInput.appendChild(o)})}
$$('.service-card').forEach(card=>{card.addEventListener('click',()=>{const title=card.querySelector('h3')?.textContent||'';if(serviceInput)serviceInput.value=title;const message=$('#message');if(message&&!message.value)message.value=`I’m interested in ${title}. I would like to learn more about the consultation process.`;$('#contact')?.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>$('#name')?.focus(),650)})});
const form=$('#consultationForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const email=c.contact?.email||'';const name=$('#name')?.value.trim()||'';const from=$('#emailInput')?.value.trim()||'';const service=serviceInput?.value||'General consultation';const message=$('#message')?.value.trim()||'';if(!email || email.includes('[Add ')){set('#formStatus','Please add a verified professional email in config.js first.');return}const subject=encodeURIComponent(`Consultation request — ${service}`);const body=encodeURIComponent(`Name: ${name}\nEmail: ${from}\nService: ${service}\n\nMessage:\n${message}`);set('#formStatus','Opening your email app…');window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;});
})();
