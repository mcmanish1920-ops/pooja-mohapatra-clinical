(()=>{
const base=window.SITE_CONFIG||{};
const KEY='poojaSiteConfigV11';
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
 $$('[data-name]').forEach(e=>e.textContent=(pro.name||'Puja Mohapatra').toUpperCase());$$('[data-title]').forEach(e=>e.textContent=pro.designation||'Clinical Psychologist');
 if($('#pageTitle'))$('#pageTitle').textContent=`${c.site?.name||pro.name||'Puja Mohapatra'} | ${pro.designation||'Clinical Psychologist'}`;
 if($('#metaDescription'))$('#metaDescription').content=c.site?.description||'';
 const icons=['◉','♧','♡','▣'];
 $('#servicesGrid').innerHTML=(c.services||[]).map((x,i)=>`<article class="service-card reveal"><div class="service-icon">${icons[i%icons.length]}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><span class="arrow">→</span></article>`).join('');
 $('#approachList').innerHTML=(c.approach||[]).map((x,i)=>`<div class="approach-item reveal"><span>0${i+1}</span><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></div>`).join('');
 $('#journeyGrid').innerHTML=(c.timeline||[]).map((x,i)=>`<article class="journey-item reveal"><div class="journey-icon">${['♢','⌾','▤'][i%3]}</div><div><small>${esc(x.year)}</small><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join('');
 $('#galleryGrid').innerHTML=(c.gallery||[]).map(x=>`<figure class="gallery-card reveal"><img src="${esc(x.image)}" alt="${esc(x.title)}"><figcaption><b>${esc(x.title)}</b><span>${esc(x.caption)}</span></figcaption></figure>`).join('');
 $('#reviewGrid').innerHTML=(c.testimonials||[]).map(x=>`<article class="review-card reveal"><span>“</span><p>${esc(x.quote)}</p><b>${esc(x.name)}</b><small>${esc(x.context)}</small></article>`).join('');
 $('#faqList').innerHTML=(c.faq||[]).map(x=>`<details><summary>${esc(x[0])}<span>+</span></summary><p>${esc(x[1])}</p></details>`).join('');
 const social=c.social||{};$('#socials').innerHTML=Object.entries(social).filter(([,v])=>v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase()+k.slice(1))}</a>`).join('');
 if(contact.bookingUrl)$$('a[href="#contact"]').forEach(a=>{if(a.classList.contains('pill'))a.href=contact.bookingUrl});
}
render();

const animatedSections=$$('section').filter(s=>!s.classList.contains('hero'));
animatedSections.forEach(section=>{
 section.querySelectorAll('.eyebrow,h2,h3,p:not(.muted),.section-label,.details,.quote-card,.contact form,.cta .pill').forEach((el,i)=>{
  if(!el.classList.contains('reveal')){el.classList.add('reveal');el.style.transitionDelay=Math.min(i*45,180)+'ms'}
 });
});
const hero=$('.hero');if(hero)hero.classList.add('in-view');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('hero'))e.target.classList.add('in-view')}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
$$('.reveal').forEach(e=>io.observe(e));

const header=$('.header');
addEventListener('scroll',()=>{
 const h=document.documentElement.scrollHeight-innerHeight;
 if($('#progress'))$('#progress').style.width=(scrollY/Math.max(h,1)*100)+'%';
 if(header)header.classList.toggle('scrolled',scrollY>12);
},{passive:true});

const menu=$('#menu'),nav=$('#nav');
if(menu&&nav)menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
$$('#nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

$$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{const s=d.querySelector('summary span');if(s)s.textContent=d.open?'−':'+'}));
const form=$('#consultationForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();set('#formStatus','Thank you. This demo form is ready to connect to your verified email or booking system.');form.reset()});
})();