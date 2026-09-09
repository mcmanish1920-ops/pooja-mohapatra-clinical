(()=>{
const base=window.SITE_CONFIG||{};const saved=(()=>{try{return JSON.parse(localStorage.getItem('pujaSiteConfigV12')||'null')}catch(e){return null}})();
const merge=(a,b)=>{if(!b)return a;const o=Array.isArray(a)?[...a]:{...a};Object.keys(b).forEach(k=>{o[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])?merge(o[k]||{},b[k]):b[k]});return o};const c=merge(base,saved);
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const set=(s,v)=>{const el=$(s);if(el)el.textContent=v||''};
function render(){document.documentElement.style.setProperty('--primary',c.appearance.primary);document.documentElement.style.setProperty('--sage',c.appearance.sage);document.documentElement.style.setProperty('--cream',c.appearance.cream);document.documentElement.style.setProperty('--ink',c.appearance.ink);document.documentElement.style.setProperty('--gold',c.appearance.gold);document.documentElement.style.setProperty('--radius',c.appearance.radius+'px');
$('#heroImage').src=c.hero.image||'assets/hero.jpg';$('#navLogo').src=c.branding.logo||'assets/logo.png';set('#heroEyebrow',c.hero.eyebrow);set('#heroHeading',c.hero.heading);set('#heroHighlight',c.hero.highlight);set('#heroDescription',c.hero.description);set('#bio',c.professional.biography);set('#philosophy',c.philosophy);set('#qualifications',c.professional.qualifications);set('#registration',c.professional.registration);set('#experience',c.professional.experience);set('#phone',c.contact.phone);set('#email',c.contact.email);set('#address',c.contact.address);set('#footerEmail',c.contact.email);set('#footerPhone',c.contact.phone);set('#copyright',`© ${new Date().getFullYear()} ${c.professional.name}. All rights reserved.`);$$('[data-name]').forEach(e=>e.textContent=c.professional.name.toUpperCase());$$('[data-title]').forEach(e=>e.textContent=c.professional.designation);$('#pageTitle').textContent=`${c.site.name} | ${c.professional.designation}`;$('#metaDescription').content=c.site.description;
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
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});$$('.reveal').forEach(e=>io.observe(e));
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(scrollY/Math.max(h,1)*100)+'%'},{passive:true});
$('#menu').onclick=()=>$('#nav').classList.toggle('open');$$('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
$('#consultationForm').addEventListener('submit',e=>{e.preventDefault();set('#formStatus','Thank you. This demo form is ready to connect to your verified email or booking system.');e.target.reset()});
})();
