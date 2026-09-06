document.addEventListener("DOMContentLoaded",()=>{
  if(typeof SITE_CONFIG==="undefined"){console.error("config.js not loaded");return}
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem("poojaSiteConfig") || "null"); }
    catch (_) { return null; }
  })();
  const c = saved ? deepMerge(structuredClone(SITE_CONFIG), saved) : SITE_CONFIG;
  const deepMerge = (target, source) => {
    if (!source || typeof source !== "object") return target;
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        target[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };
  const $=s=>document.querySelector(s);
  const set=(s,v)=>{const e=$(s);if(e)e.textContent=v??""};

  document.documentElement.style.setProperty("--primary",c.appearance.primary);
  document.documentElement.style.setProperty("--sage",c.appearance.sage);
  document.documentElement.style.setProperty("--cream",c.appearance.cream);
  document.documentElement.style.setProperty("--ink",c.appearance.ink);
  document.documentElement.style.setProperty("--gold",c.appearance.gold);

  document.title=`${c.site.name} | ${c.site.title}`;
  set("#metaDescription",c.site.description);
  $("#metaDescription").setAttribute("content",c.site.description);
  $("#favicon").href=c.branding.favicon;
  document.querySelectorAll("[data-name]").forEach(e=>e.textContent=c.professional.name.toUpperCase());
  document.querySelectorAll("[data-title]").forEach(e=>e.textContent=c.professional.designation);

  set("#heroEyebrow",c.hero.eyebrow); set("#heroHeading",c.hero.heading); set("#heroHighlight",c.hero.highlight); set("#heroDescription",c.hero.description);
  const hi=$("#heroImage"); hi.src=c.hero.image; hi.alt=`${c.professional.name} — ${c.professional.designation}`;
  const logo=$("#navLogo"); logo.src=c.branding.logo;

  set("#bio",c.professional.biography); set("#philosophy",c.philosophy); set("#qualifications",c.professional.qualifications); set("#registration",c.professional.registration); set("#experience",c.professional.experience);
  set("#phone",c.contact.phone); set("#email",c.contact.email); set("#address",c.contact.address); set("#footerEmail",c.contact.email); set("#footerPhone",c.contact.phone);
  $("#copyright").textContent=`© ${new Date().getFullYear()} ${c.professional.name}. All rights reserved.`;


  const timeline = $("#timeline");
  (c.timeline || []).forEach((item,i)=>{
    const el=document.createElement("article");
    el.className="timeline-item reveal";
    el.innerHTML=`<div class="timeline-dot"></div><div class="timeline-year">${item.year}</div><div class="timeline-content"><h3>${item.title}</h3><p>${item.text}</p></div>`;
    timeline.appendChild(el);
  });

  const sg=$("#servicesGrid");
  c.services.forEach((s,i)=>{
    const el=document.createElement("article"); el.className="service-card reveal";
    el.innerHTML=`<span>0${i+1}</span><h3>${s.title}</h3><p>${s.text}</p><a href="#contact">Learn more →</a>`;
    sg.appendChild(el);
  });


  const gg=$("#galleryGrid");
  const lightbox=$("#galleryLightbox");
  const lightboxImg=$("#galleryLightboxImage"), lightboxTitle=$("#galleryLightboxTitle"), lightboxCaption=$("#galleryLightboxCaption");
  (c.gallery || []).forEach((g,i)=>{
    const el=document.createElement("button");
    el.type="button"; el.className="gallery-item reveal"; el.setAttribute("aria-label",`Open ${g.title||"gallery image"}`);
    el.innerHTML=`<img src="${g.image}" alt="${g.title||""}" loading="lazy"><span><b>${g.title||""}</b><small>${g.caption||""}</small></span>`;
    el.addEventListener("click",()=>{
      lightboxImg.src=g.image; lightboxImg.alt=g.title||""; lightboxTitle.textContent=g.title||""; lightboxCaption.textContent=g.caption||"";
      lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
    });
    gg.appendChild(el);
  });
  const closeGallery=()=>{lightbox?.classList.remove("open");lightbox?.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")};
  document.querySelectorAll("[data-close-gallery]").forEach(x=>x.addEventListener("click",closeGallery));

  const tg=$("#testimonialGrid");
  (c.testimonials || []).forEach((t,i)=>{
    const el=document.createElement("article");
    el.className="testimonial-card reveal";
    el.innerHTML=`<span class="quote-symbol">“</span><p>${t.quote}</p><div class="testimonial-person"><b>${t.name}</b><small>${t.context}</small></div>`;
    tg.appendChild(el);
  });

  const fq=$("#faqList");
  c.faq.forEach(([q,a])=>{
    const d=document.createElement("details");
    d.innerHTML=`<summary>${q}</summary><p>${a}</p>`;
    fq.appendChild(d);
  });

  const socials=$("#socials");
  Object.entries(c.social).forEach(([name,url])=>{
    if(url){const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener";a.textContent=name[0].toUpperCase()+name.slice(1);socials.appendChild(a)}
  });


  // Booking / WhatsApp CTAs are controlled from config.js.
  const bookingButton = $("#bookingButton");
  const whatsappButton = $("#whatsappButton");

  if (bookingButton) {
    if (c.contact.bookingUrl) {
      bookingButton.href = c.contact.bookingUrl;
      bookingButton.target = "_blank";
      bookingButton.rel = "noopener";
    } else {
      bookingButton.href = "#contact";
    }
  }

  if (whatsappButton) {
    if (c.contact.whatsappUrl) {
      whatsappButton.hidden = false;
      whatsappButton.href = c.contact.whatsappUrl;
      whatsappButton.target = "_blank";
      whatsappButton.rel = "noopener";
    }
  }

  const menu=$(".menu-toggle"),nav=$("#nav");
  menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const header=$("#header");
  const onScroll=()=>header.classList.toggle("scrolled",scrollY>20);
  addEventListener("scroll",onScroll,{passive:true}); onScroll();

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(e=>io.observe(e));

  $("#consultationForm").addEventListener("submit",e=>{
    e.preventDefault();
    const name=$("#name").value.trim(),email=$("#emailInput").value.trim();
    if(!name||!email){$("#formStatus").textContent="Please enter your name and email address.";return}
    $("#formStatus").textContent=`Thank you, ${name}. Your request is ready for the secure booking connection.`;
  });
});
  const mobileMenu = document.querySelector("#mobileMenu");
  const nav = document.querySelector("#nav");
  if (mobileMenu && nav) {
    mobileMenu.addEventListener("click", ()=>{
      const open = nav.classList.toggle("mobile-open");
      mobileMenu.setAttribute("aria-expanded", String(open));
      mobileMenu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      nav.classList.remove("mobile-open");
      mobileMenu.setAttribute("aria-expanded","false");
    }));
  }
  