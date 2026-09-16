'use client';
/* Client behavior for the reference's server-rendered pages. No reference analytics or APIs are loaded. */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { initGallery } from './gallery-behaviors';
const $ = <T extends HTMLElement = HTMLElement>(s:string, root:ParentNode=document) => root.querySelector<T>(s);
const $$ = <T extends HTMLElement = HTMLElement>(s:string, root:ParentNode=document) => Array.from(root.querySelectorAll<T>(s));
export default function SiteEnhancements({route}:{route:string}) {
 const [dark,setDark] = useState<boolean|null>(null);
 const [notice,setNotice] = useState('');
 useEffect(()=>{
  const abort = new AbortController(); const signal=abort.signal;
  
  const timers: ReturnType<typeof setTimeout>[]=[];
  const later=(fn:()=>void,ms:number)=>{timers.push(setTimeout(fn,ms));};
  const theme = () => { const value=document.documentElement.dataset.theme==='dark'; setDark(value); $$('button[class*="modeSwitcher"]').forEach(b=>{b.setAttribute('aria-pressed',String(value)); b.setAttribute('aria-label',`Switch to ${value?'light':'dark'} mode`);}); };
  theme();
  const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  const copy=async(text:string,b?:HTMLElement)=>{try{await navigator.clipboard.writeText(text);setNotice('Copied to clipboard'); if(b){b.dataset.copied='true';later(()=>delete b.dataset.copied,1600);}later(()=>setNotice(''),1800);}catch{setNotice('Copy unavailable. Please select and copy the text.');}};
  const clock=()=>{ $$('.footer-time').forEach(e=>e.textContent=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true}).format(new Date()).toLowerCase()); };
  clock(); const interval=setInterval(clock,1000);
  const greet=['good evening,','शुभ संध्या,','શુભ સાંજ'];
  $$('.greetings > span').forEach((e,i)=>e.textContent=greet[i]);
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');if(e.target instanceof HTMLVideoElement)void e.target.play().catch(()=>{});}else if(e.target instanceof HTMLVideoElement)e.target.pause();}),{rootMargin:'150px'});
  $$('video').forEach(e=>observer.observe(e));
  const videos:Record<string,string>={telegram:'trimmed89.mp4',realgirl:'realgirl_noaudio_trimmed.mp4'};
  Object.entries(videos).forEach(([id,file])=>{const v=$<HTMLVideoElement>(`.collage-item[data-id="${id}"] video`);if(v){v.src=`/Collage/Light mode/${file}`;v.muted=true;v.loop=true;}});
  $$('.cv-collapse-body').forEach(e=>{e.inert=true;});
  const scroll=()=>{ $$('button[aria-label="Back to top"]').forEach(e=>{const visible=window.scrollY>400;e.style.opacity=visible?'1':'0';e.style.pointerEvents=visible?'auto':'none';e.setAttribute('aria-hidden',String(!visible));e.tabIndex=visible?0:-1;}); };
  window.addEventListener('scroll',scroll,{signal,passive:true});scroll();
  document.addEventListener('click',e=>{
   const t=e.target instanceof Element?e.target:null; if(!t)return;const b=t.closest<HTMLElement>('button, [role="button"]');if(!b)return;
   if(b.matches('[class*="modeSwitcher"]')) {toggleTheme();return;}
   if(b.matches('.copy-button'))void copy('ridhampatel2k4@gmail.com',b);
   if(b.matches('.code-copy')) void copy($('code',b.closest('.code-block')!)?.innerText||'',b);
   if(b.matches('[aria-label="Copy quote"]'))void copy(window.getSelection()?.toString()||'',b);
   if(b.matches('[aria-label="Back to top"]'))window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
   if(b.matches('[class*="__share"]') && !b.matches('[class*="__toTop"]'))void copy(location.href,b);
   if(b.matches('.cv-collapse-toggle')){const expanded=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(expanded));const body=document.getElementById(b.getAttribute('aria-controls')||'');if(body){body.style.height=expanded?`${body.scrollHeight}px`:'0px';body.setAttribute('aria-hidden',String(!expanded));body.inert=!expanded;}const icon=$('.cv-collapse-icon',b);if(icon)icon.textContent=expanded?'−':'+';}
   if(b.matches('.infinity-tab')){const interaction=b.textContent==='Interaction';$$('.infinity-tab').forEach(el=>{el.classList.toggle('is-active',el===b);el.setAttribute('aria-pressed',String(el===b));});$('.infinity-static')?.classList.toggle('is-hidden',interaction);$('.infinity-interaction')?.classList.toggle('is-hidden',!interaction);$('.infinity-feed-grid')?.classList.toggle('is-hidden',!interaction);window.scrollTo({top:0});}
   if(b.matches('.integrations-switch,.tp-toggle,.radius-border-switch')){const on=b.getAttribute('aria-checked')!=='true';b.setAttribute('aria-checked',String(on));b.classList.toggle('is-on',on);b.closest('.radius-border-stage')?.classList.toggle('is-counted',on);if(b.matches('.radius-border-switch')){$$('.radius-border-card',b.closest('.demo-container')||document).forEach(c=>c.classList.toggle('is-counted',on));}}
   if(b.matches('[class*="CryptoAssetToggle"][role="radio"]')){const parent=b.parentElement!;$$('[role="radio"]',parent).forEach(el=>{el.setAttribute('aria-checked',String(el===b));el.tabIndex=el===b?0:-1;});parent.dataset.active=b.getAttribute('aria-label')?.toLowerCase();parent.setAttribute('data-value',parent.dataset.active||'bitcoin');}
   if(b.matches('.pricing-toggle-button:not(.is-overlay)')){const root=b.closest('.pricing-toggle')!;const buttons=$$('.pricing-toggle-button:not(.is-overlay)',root);buttons.forEach(el=>{el.classList.toggle('is-active',el===b);el.setAttribute('aria-selected',String(el===b));});const selected=$('.pricing-toggle-selected',root);if(selected){selected.style.transform=`translateX(${buttons.indexOf(b)*100}%)`;}}
   if(b.matches('[class*="ReasoningSummaryPanel"][aria-expanded]')){const on=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(on));b.closest('[class*="__anchor"]')?.classList.toggle('replica-expanded',on);}
   if(b.matches('.action-button')&&!b.classList.contains('is-processing')){b.classList.remove('is-idle','is-success');b.classList.add('is-processing');b.setAttribute('aria-busy','true');later(()=>{b.classList.replace('is-processing','is-success');b.setAttribute('aria-busy','false');later(()=>b.classList.replace('is-success','is-idle'),2000);},1800);}
   if(b.matches('.onboarding-checkbox')){b.classList.toggle('is-checked');b.setAttribute('aria-checked',String(b.classList.contains('is-checked')));b.closest('.onboarding-item')?.classList.toggle('is-complete');}
   if(b.matches('.ix-segment-item')){const root=b.closest('.ix-segment')!;$$('.ix-segment-item',root).forEach(el=>{el.classList.toggle('is-active',el===b);el.setAttribute('aria-selected',String(el===b));});const slider=$('.ix-segment-slider',root);if(slider)slider.style.transform=`translateX(${$$('.ix-segment-item',root).indexOf(b)*100}%)`;}
   if(b.dataset.sourceImage){const dialog=document.createElement('dialog');dialog.className='source-image-dialog';const img=document.createElement('img');img.src=b.dataset.sourceImage;img.alt=b.dataset.sourceAlt||'';const close=document.createElement('button');close.textContent='Close';close.addEventListener('click',()=>dialog.close());dialog.append(img,close);dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);dialog.showModal();}
   if(b.matches('.radius-button-demo-button')){b.animate([{transform:'scale(1)'},{transform:'scale(.95)'},{transform:'scale(1)'}],{duration:220});}
  },{signal});
  // Preserve the reference's custom sliders, including keyboard interaction.
  $$('.radius-slider-hit').forEach(slider=>{
   const min=Number(slider.getAttribute('aria-valuemin')),max=Number(slider.getAttribute('aria-valuemax'));
   const set=(value:number)=>{value=Math.max(min,Math.min(max,Math.round(value)));slider.setAttribute('aria-valuenow',String(value));slider.setAttribute('aria-valuetext',`${value}px`);slider.parentElement?.style.setProperty('--slider-progress',`${(value-min)/(max-min)*100}%`);const label=slider.closest('.radius-slider')!;const out=$('.radius-slider-value',label);if(out)out.textContent=max===20&&value===20?'pill':`${value}px`;const demo=slider.closest('.demo-container')!;const name=$('.radius-slider-label',label)?.textContent?.toLowerCase()||'';
    if(name.includes('padding')){const card=$('.radius-product-card',demo);if(card)card.style.padding=`${value}px`;}
    else if(name.includes('stroke')||name.includes('border')){$$('.radius-border-card',demo).forEach(el=>el.style.borderWidth=`${value}px`);}
    else $$('.radius-scale-shape,.radius-button-demo-button,.radius-product-card,.radius-product-media,.radius-border-card,.radius-border-image',demo).forEach(el=>{el.style.borderRadius=`${value}px`;el.classList.toggle('is-pill',max===20&&value===20);});
   };
   const pointer=(e:PointerEvent)=>{const rect=slider.getBoundingClientRect();set(min+(e.clientX-rect.left)/rect.width*(max-min));};
   slider.addEventListener('pointerdown',e=>{e.preventDefault();slider.setPointerCapture(e.pointerId);pointer(e);},{signal});
   slider.addEventListener('pointermove',e=>{if(slider.hasPointerCapture(e.pointerId))pointer(e);},{signal});
   slider.addEventListener('keydown',e=>{const v=Number(slider.getAttribute('aria-valuenow'));if(['ArrowLeft','ArrowDown','ArrowRight','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();set(e.key==='Home'?min:e.key==='End'?max:v+(['ArrowLeft','ArrowDown'].includes(e.key)?-1:1));}},{signal});
  });
  // Pointer capture keeps paper collage dragging reliable even outside each image.
  $$('.collage-item').forEach(item=>{let origin:{x:number;y:number;tx:number;ty:number}|null=null;let tx=0,ty=0;
   item.addEventListener('pointerdown',e=>{if(e.button!==0)return;item.setPointerCapture(e.pointerId);origin={x:e.clientX,y:e.clientY,tx,ty};item.classList.add('is-dragging');item.style.zIndex='200';},{signal});
   item.addEventListener('pointermove',e=>{if(!origin)return;tx=origin.tx+e.clientX-origin.x;ty=origin.ty+e.clientY-origin.y;item.style.translate=`${tx}px ${ty}px`;},{signal});
   const end=()=>{origin=null;item.classList.remove('is-dragging');};item.addEventListener('pointerup',end,{signal});item.addEventListener('pointercancel',end,{signal});
  });
  const cleanupGallery=route==='infinity'?initGallery(signal):()=>{};
  return()=>{cleanupGallery();abort.abort();clearInterval(interval);timers.forEach(clearTimeout);observer.disconnect();themeObserver.disconnect();};
 },[route]);
 function toggleTheme(){const next=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('portfolio-theme',next?'dark':'light');}catch{}setDark(next);}
 const essay=route==='27'||route==='taste';
 return <>{!essay&&<div className="theme-toggle-anchor"><button type="button" className="theme-toggle" role="switch" aria-checked={dark===true} aria-label={`Switch to ${dark?'light':'dark'} mode`} onClick={toggleTheme}><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor"/><path d="M6 1a5 5 0 0 1 0 10Z" fill="currentColor"/></svg></button></div>}
 {!essay&&<nav className="floating-dock-anchor" aria-label="Quick links"><div className="floating-dock">{route!=='home'&&<Link href="/" className="floating-dock-icon floating-dock-index" aria-label="Back to home"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 6-6 6 6 6M3 12h12a5 5 0 0 0 0-10"/></svg></Link>}{[['LinkedIn','https://www.linkedin.com/in/ridhampatel2k4/','LinkedIn Icon.svg'],['GitHub','https://github.com/ridh21','GitHub Icon.svg'],['X (Twitter)','https://x.com/ridhampatel2k4','X Icon.svg']].map(([name,url,icon])=><a key={name} href={url} className="floating-dock-icon" aria-label={name} target="_blank" rel="noopener noreferrer"><img src={`/${icon}`} alt="" width="36" height="36" /></a>)}</div></nav>}
 <div className={`replica-notice ${notice?'is-visible':''}`} role="status" aria-live="polite">{notice}</div></>;
}
