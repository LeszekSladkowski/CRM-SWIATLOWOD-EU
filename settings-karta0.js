(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const stage = $('#settingsStage');
  const dateEl = $('#liveDate');
  const timeEl = $('#liveTime');
  const netText = $('#netText');
  const syncVisual = $('#syncVisual');
  let syncing = false;

  function pad(n){ return String(n).padStart(2,'0'); }

  function updateClock(){
    const d = new Date();
    dateEl.textContent = `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()}`;
    timeEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  async function probeInternet(){
    let ok = navigator.onLine;
    if(ok){
      try{
        const r = await fetch(`./?health=${Date.now()}`, {method:'HEAD', cache:'no-store'});
        ok = r.ok;
      }catch(_){ ok = false; }
    }
    document.body.classList.toggle('offline', !ok);
    netText.textContent = ok ? 'ONLINE' : 'OFFLINE';
    return ok;
  }

  async function synchronize(){
    if(syncing) return;
    syncing = true;
    syncVisual.classList.add('syncing');
    const started = performance.now();
    try{
      await Promise.allSettled([
        probeInternet(),
        fetch(`./version.json?ts=${Date.now()}`, {cache:'no-store'}).then(r => r.ok ? r.json() : Promise.reject())
      ]);
      localStorage.setItem('crm.settings.lastSync', new Date().toISOString());
    }finally{
      const elapsed = performance.now() - started;
      const wait = Math.max(0, 850 - elapsed);
      setTimeout(() => {
        syncVisual.classList.remove('syncing');
        syncing = false;
      }, wait);
    }
  }

  function goBack(){
    if(history.length > 1) history.back();
    else location.href = './';
  }

  document.querySelectorAll('[data-card]').forEach(el => {
    el.addEventListener('click', () => {
      const card = el.getAttribute('data-card');
      location.href = `./settings-engine.html?card=${card}`;
    });
  });

  document.querySelector('[data-action="back"]').addEventListener('click', goBack);
  document.querySelector('[data-action="pulpit"]').addEventListener('click', () => { location.href = './'; });
  document.querySelector('[data-action="sync"]').addEventListener('click', synchronize);

  window.addEventListener('online', probeInternet, {passive:true});
  window.addEventListener('offline', probeInternet, {passive:true});
  window.addEventListener('pageshow', () => window.scrollTo(0,0), {once:true});

  updateClock();
  setInterval(updateClock, 1000);
  probeInternet();
  setInterval(probeInternet, 15000);

  if(new URLSearchParams(location.search).get('debug') === '1') stage.classList.add('debug');
})();
