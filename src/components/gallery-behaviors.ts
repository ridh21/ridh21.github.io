/** Small, local-only behaviors for the visual component playground. */
export function initGallery(signal:AbortSignal) {
 const all=<T extends HTMLElement=HTMLElement>(s:string,r:ParentNode=document)=>Array.from(r.querySelectorAll<T>(s));
 const one=<T extends HTMLElement=HTMLElement>(s:string,r:ParentNode=document)=>r.querySelector<T>(s);
 const timers:ReturnType<typeof setTimeout>[]=[];
 const later=(fn:()=>void,ms:number)=>timers.push(setTimeout(fn,ms));
 const tokenRows=[[
 ['Swap permission','Token swaps via DEX'],['Transfer limit','Daily outgoing cap'],['Staking access','Earn staking rewards']],
 [['Auto-convert','Convert to USDC on receive'],['Yield farming','Deposit into yield pools'],['Cross-chain','Bridge to other networks']],
 [['Marketplace','Buy and sell on markets'],['Royalties','Enforce on secondary sales'],['Collateral','Use as lending collateral']]];
 const permissions=[[true,false,true],[false,true,false],[true,false,false]];let token=0;
 const price=()=>{const root=one('.pricing-toggle');if(!root)return;const b=one('.pricing-toggle-button.is-active',root);const clip=one('.pricing-toggle-clip',root);if(!b||!clip)return;const a=root.getBoundingClientRect(),c=b.getBoundingClientRect(),d=clip.getBoundingClientRect();root.style.setProperty('--pricing-selected-left',`${c.left-a.left}px`);root.style.setProperty('--pricing-selected-width',`${c.width}px`);const surface=one('.pricing-toggle-selected',root);if(surface)surface.style.transform='none';clip.style.clipPath=`inset(0px ${Math.max(0,d.right-c.right)}px 0px ${Math.max(0,c.left-d.left)}px round 999px)`;};
 const resize=new ResizeObserver(price);const pricing=one('.pricing-toggle');if(pricing)resize.observe(pricing);
 document.addEventListener('click',e=>{
 const target=e.target instanceof Element?e.target:null;const b=target?.closest<HTMLElement>('button');if(!b)return;
 if(b.matches('.infinity-tab'))later(price,30);
 if(b.matches('.pricing-toggle-button:not(.is-overlay)')){all('.pricing-toggle-button:not(.is-overlay)').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));price();}
 if(b.matches('[class*="CryptoAssetToggle"][role=radio]')){const root=b.parentElement!;const value=b.getAttribute('aria-label')?.toLowerCase();all('[data-visible]',root).forEach(el=>el.dataset.visible=String(el.className.includes(value==='solana'?'solanaIcon':'bitcoinIcon')));}
 if(b.matches('[class*="ReasoningSummaryPanel"][aria-expanded]')){const expanded=b.getAttribute('aria-expanded')==='true';const root=b.closest('[class*="__anchor"]')!;all('[data-open]',root).forEach(el=>el.dataset.open=String(expanded));(root as HTMLElement).dataset.open=String(expanded);all('[inert], [class*="__panel"], [class*="__footer"]',root).forEach(el=>{el.inert=!expanded;el.setAttribute('aria-hidden',String(!expanded));});b.setAttribute('aria-controls','thinking-details');const time=one('[class*="__timeValue"]',root);if(time)time.textContent='2.4s';}
 if(b.matches('.integrations-switch')){const row=b.closest('.integrations-row')!;const note=one('.integrations-app-note',row);const name=one('.integrations-app-name',row)?.textContent;const on=b.getAttribute('aria-checked')==='true';if(note)note.textContent=on?'Connected just now':'Disconnected just now';b.setAttribute('aria-label',`${name} ${on?'connected':'disconnected'}`);}
 if(b.matches('.tp-toggle')){const i=all('.tp-toggle').indexOf(b);permissions[token][i]=b.getAttribute('aria-checked')==='true';b.setAttribute('aria-label',`${tokenRows[token][i][0]} ${permissions[token][i]?'on':'off'}`);}
 if(b.matches('.ix-segment-item')){token=all('.ix-segment-item').indexOf(b);all('.token-permissions-row').forEach((row,i)=>{one('.token-permissions-label',row)!.textContent=tokenRows[token][i][0];one('.token-permissions-detail',row)!.textContent=tokenRows[token][i][1];const toggle=one('.tp-toggle',row)!;toggle.setAttribute('aria-checked',String(permissions[token][i]));toggle.classList.toggle('is-on',permissions[token][i]);toggle.setAttribute('aria-label',`${tokenRows[token][i][0]} ${permissions[token][i]?'on':'off'}`);});}
 if(b.matches('.hero-prompt-tool')){const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));b.classList.toggle('is-active',on);show(b.matches('.is-mic')?(on?'Recording demo…':'Voice note added'):(on?'File attached':'Attachment removed'));}
 if(b.matches('.hero-prompt-send')){const text=one('.hero-prompt-input')?.innerText;if(!text?.trim())return;b.setAttribute('disabled','');show('Thinking…');later(()=>{b.removeAttribute('disabled');show('Done. Your project summary is ready.');},1300);}
 },{signal});
 function show(text:string){const toast=one('.hero-prompt-toast');if(toast){toast.textContent=text;toast.classList.add('is-visible');later(()=>toast.classList.remove('is-visible'),2200);}}
 document.addEventListener('input',e=>{const target=e.target as HTMLElement;if(target.matches('.hero-prompt-input')){const send=one<HTMLButtonElement>('.hero-prompt-send');if(send)send.disabled=!target.innerText.trim();}},{signal});
 document.addEventListener('keydown',e=>{const target=e.target as HTMLElement;if(target.matches('[role=radio]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const options=all<HTMLButtonElement>('[role=radio]',target.parentElement!);const index=e.key==='Home'?0:e.key==='End'?options.length-1:(options.indexOf(target as HTMLButtonElement)+1)%options.length;options[index].click();options[index].focus();}if(target.matches('[role=tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const options=all<HTMLButtonElement>('[role=tab]',target.parentElement!);const current=options.indexOf(target as HTMLButtonElement);const index=e.key==='Home'?0:e.key==='End'?options.length-1:(current+(e.key==='ArrowRight'?1:-1)+options.length)%options.length;options[index].click();options[index].focus();}},{signal});
 return()=>{resize.disconnect();timers.forEach(clearTimeout);};
}
