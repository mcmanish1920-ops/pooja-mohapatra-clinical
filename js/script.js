(()=>{
const base=window.SITE_CONFIG||{};
const KEY='pujaSiteConfigV11';
const saved=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}})();
const merge=(a,b)=>{if(!b)return a;const o=Array.isArray(a)?[...a]:{...a};Object.keys(b).forEach(k=>{o[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])?merge(o[k]||{},b[k]):b[k]});return o};
const c=merge(base,saved), $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const set=(s,v)=>{const el=$(s);if(el)el.textContent=v??''};
function render(){
 const a=c.appearance||{};
 Object.entries({primary:a.primary,sage:a.sage,cream:a.cream,ink:a.ink,gold:a.gold}).forEach(([k,v])=>v&&document.documentElement.style.setProperty('--'+k,v));
 if(a.radius)document.documentElement.style.setProperty('--radius',a.radius+'px');
 const hero=c.hero||{}, pro=c.professional||{}, contact=c.contact||{};
 const img=hero.image||'assets/hero.jpg', logo=(c.branding||{}).logo||'assets/logo.png';
 if($('#heroImage'))$('#heroImage').src=img;if($('#navLogo'))$('#navLogo').src=logo;
 set('#heroEyebrow',hero.eyebrow);set('#heroHeading',hero.heading);set('#heroHighlight',hero.highlight);set('#heroDescription',hero.description);
 set('#bio',pro.biography);set('#philosophy',c.philosophy);set('#phone',contact.phone);set('#email',contact.email);set('#address',contact.address);set('#footerEmail',contact.email);set('#footerPhone',contact.phone);set('#copyright',`© ${new Date().getFullYear()} ${pro.name||'Puja Mohapatra'}. All rights reserved.`);
 $$('[data-name]').forEach(e=>e.textContent=(pro.name||'Puja Mohapatra').toUpperCase());
 $$('[data-title]').forEach(e=>e.textContent=pro.designation||'Clinical Psychologist');
 if($('#pageTitle'))$('#pageTitle').textContent=`${c.site?.name||pro.name||'Puja Mohapatra'} | ${pro.designation||'Clinical Psychologist'}`;
 if($('#metaDescription'))$('#metaDescription').content=c.site?.description||'';
 const icons=['◉','♧','♡','▣'];
 const services=$('#servicesGrid'); if(services) services.innerHTML=(c.services||[]).map((x,i)=>`<article class="service-card reveal" style="--delay:${i*70}ms"><div class="service-icon">${icons[i%icons.length]}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><span class="arrow">→</span></article>`).join('');
 const approach=$('#approachList'); if(approach) approach.innerHTML=(c.approach||[]).map((x,i)=>`<div class="approach-item reveal" style="--delay:${i*70}ms"><span>0${i+1}</span><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></div>`).join('');
 const journey=$('#journeyGrid'); if(journey) journey.innerHTML=(c.timeline||[]).map((x,i)=>`<article class="journey-item reveal" style="--delay:${i*70}ms"><div class="journey-icon">${['♢','⌾','▤'][i%3]}</div><div><small>${esc(x.year)}</small><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join('');
 const gallery=$('#galleryGrid'); if(gallery) gallery.innerHTML=(c.gallery||[]).map((x,i)=>`<figure class="gallery-card reveal" style="--delay:${i*70}ms"><img src="${esc(x.image)}" alt="${esc(x.title)}" loading="lazy"><figcaption><b>${esc(x.title)}</b><span>${esc(x.caption)}</span></figcaption></figure>`).join('');
 const reviews=$('#reviewGrid'); if(reviews) reviews.innerHTML=(c.testimonials||[]).map((x,i)=>`<article class="review-card reveal" style="--delay:${i*70}ms"><span>“</span><p>${esc(x.quote)}</p><b>${esc(x.name)}</b><small>${esc(x.context)}</small></article>`).join('');
 const faq=$('#faqList'); if(faq) faq.innerHTML=(c.faq||[]).map(x=>`<details><summary>${esc(x[0])}<span>+</span></summary><p>${esc(x[1])}</p></details>`).join('');
 const social=c.social||{};if($('#socials'))$('#socials').innerHTML=Object.entries(social).filter(([,v])=>v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase()+k.slice(1))}</a>`).join('');
 if(contact.bookingUrl)$$('a[href="#contact"]').forEach(a=>{if(a.classList.contains('pill'))a.href=contact.bookingUrl});
}
render();

const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animatedSections=$$('section');
animatedSections.forEach(section=>{
 section.querySelectorAll('.eyebrow,h1,h2,h3,p:not(.muted),.section-label,.details,.quote-card,.contact form,.cta .pill,.service-card,.journey-item,.review-card,.gallery-card,.approach-item').forEach((el,i)=>{
   if(!el.classList.contains('reveal')){el.classList.add('reveal');el.style.setProperty('--delay',Math.min(i*55,220)+'ms')}
 });
});
const hero=$('.hero');if(hero)hero.classList.add('in-view');
const show=(el)=>{el.classList.add('in');el.style.removeProperty('will-change')};
if(prefersReduced){$$('.reveal').forEach(show)}else{
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){show(e.target);if(e.target.classList.contains('hero'))e.target.classList.add('in-view')}}),{threshold:.08,rootMargin:'0px 0px -8% 0px'});
 $$('.reveal').forEach(e=>io.observe(e));
}

const header=$('.header');
const onScroll=()=>{
 const h=document.documentElement.scrollHeight-innerHeight;
 if($('#progress'))$('#progress').style.width=(scrollY/Math.max(h,1)*100)+'%';
 if(header)header.classList.toggle('scrolled',scrollY>12);
};
addEventListener('scroll',onScroll,{passive:true});onScroll();

const menu=$('#menu'),nav=$('#nav'),backdrop=$('#navBackdrop');
const closeNav=()=>{nav?.classList.remove('open');backdrop?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open')};
const openNav=()=>{nav?.classList.add('open');backdrop?.classList.add('open');menu?.setAttribute('aria-expanded','true');menu?.setAttribute('aria-label','Close navigation');document.body.classList.add('menu-open')};
if(menu)menu.addEventListener('click',()=>nav?.classList.contains('open')?closeNav():openNav());
if(backdrop)backdrop.addEventListener('click',closeNav);
$$('#nav a').forEach(a=>a.addEventListener('click',closeNav));
addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
addEventListener('resize',()=>{if(innerWidth>760)closeNav()});

const navLinks=$$('#nav a[href^="#"]');
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){const activeIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.remove('active'));const a=navLinks.find(x=>x.getAttribute('href')==='#'+e.target.id);if(a)a.classList.add('active')}}),{rootMargin:'-35% 0px -55% 0px',threshold:0});sections.forEach(s=>activeIO.observe(s));}

$$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{const s=d.querySelector('summary span');if(s)s.textContent=d.open?'−':'+'}));
const form=$('#consultationForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();set('#formStatus','Thank you. This demo form is ready to connect to your verified email or booking system.');form.reset()});
})();
