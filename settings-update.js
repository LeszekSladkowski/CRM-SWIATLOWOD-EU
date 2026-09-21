(() => {
  'use strict';
  const REPO='LeszekSladkowski/CRM-SWIATLOWOD-EU';
  const API='https://api.github.com/repos/'+REPO;
  const $=s=>document.querySelector(s);
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const T={checking:'Sprawdzanie połączenia z Internetem...',version:'Odczyt wersji zainstalowanej...',repo:'Sprawdzanie najnowszej wersji w GitHub...',deploy:'Kontrola wdrożenia GitHub Pages...',worker:'Kontrola mechanizmu aktualizacji...',cache:'Kontrola pamięci podręcznej...',done:'Aktualizacja i kontrola zakończona',ok:'WSZYSTKO OK',need:'AKTUALIZACJA',offline:'BRAK INTERNETU',clearing:'Czyszczenie pamięci podręcznej...',cleared:'Pamięć podręczna została wyczyszczona'};
  let running=false,pct=0,versionData={},latestCommit=null,latestRun=null;
  const els={fill:$('#progressFill'),glow:$('#progressGlow'),pct:$('#progressPct'),dialog:$('#versionDialog'),dialogTitle:$('#versionDialogTitle'),dialogBody:$('#versionDialogBody')};
  async function fetchJson(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}
  function setProgress(v){pct=Math.max(0,Math.min(100,Math.round(v)));const w=486*pct/100;els.fill.setAttribute('width',String(w));els.glow.setAttribute('cx',String(51+w));els.pct.textContent=pct+'%'}
  async function networkProbe(){if(!navigator.onLine)return false;try{const r=await fetch('./?update-health='+Date.now(),{method:'HEAD',cache:'no-store'});return r.ok}catch(_){return false}}
  async function runUpdateCheck(){
    if(running)return;running=true;setProgress(0);
    try{
      setProgress(5);await sleep(180);if(!await networkProbe())throw new Error(T.offline);
      setProgress(18);versionData=await fetchJson('./version.json?ts='+Date.now());await sleep(180);
      setProgress(38);latestCommit=await fetchJson(API+'/commits/main?ts='+Date.now());await sleep(180);
      setProgress(58);const runs=await fetchJson(API+'/actions/runs?branch=main&per_page=12&ts='+Date.now());latestRun=(runs.workflow_runs||[]).find(r=>r.conclusion==='success')||null;await sleep(180);
      setProgress(76);if('serviceWorker'in navigator){const regs=await navigator.serviceWorker.getRegistrations().catch(()=>[]);for(const reg of regs){try{await reg.update()}catch(_){}}}await sleep(180);
      setProgress(90);if('caches'in window)await caches.keys().catch(()=>[]);await sleep(180);
      setProgress(100);localStorage.setItem('crm.settings.lastSync',new Date().toISOString());
    }catch(e){console.error('KARTA 1:',e);setProgress(Math.max(pct,10))}finally{running=false}
  }
  async function clearCache(){if(running)return;running=true;try{setProgress(5);const keys='caches'in window?await caches.keys():[];let done=0;for(const key of keys){await caches.delete(key);done++;setProgress(10+Math.round((done/Math.max(1,keys.length))*80));await sleep(120)}setProgress(100)}finally{running=false}}
  async function openVersion(){
    if(!Object.keys(versionData).length){try{versionData=await fetchJson('./version.json?ts='+Date.now())}catch(_){}}
    const body={language:'pl',installed:versionData,latest_main:latestCommit?{sha:latestCommit.sha,message:latestCommit.commit?.message,date:latestCommit.commit?.committer?.date}:null,last_successful_deployment:latestRun?{head_sha:latestRun.head_sha,run_number:latestRun.run_number,updated_at:latestRun.updated_at}:null,last_sync:localStorage.getItem('crm.settings.lastSync')};
    els.dialogTitle.textContent='INFORMACJE O WERSJI';els.dialogBody.textContent=JSON.stringify(body,null,2);els.dialog.showModal();
  }
  function bind(action,fn){const el=document.querySelector(`[data-action="${action}"]`);if(el)el.addEventListener('click',fn)}
  function init(){document.documentElement.lang='pl';localStorage.setItem('crm.language','pl');setProgress(0);bind('sync',runUpdateCheck);bind('check',runUpdateCheck);bind('version',openVersion);bind('cache',clearCache);bind('pulpit',()=>location.href='./');const close=$('#closeVersion');if(close)close.addEventListener('click',()=>els.dialog.close());if(new URLSearchParams(location.search).get('debug')==='1')$('#updateStage').classList.add('debug')}
  init();
})();
