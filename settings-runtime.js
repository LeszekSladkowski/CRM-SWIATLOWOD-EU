(() => {
  'use strict';
  const API='https://api.github.com/repos/LeszekSladkowski/CRM-SWIATLOWOD-EU';
  const map={
    pl:{ok:'SYSTEM AKTUALNY',okd:'Najnowszy main jest wdrożony na GitHub Pages',new:'OCZEKUJE NA WDROŻENIE',newd:'Najnowszy main nie ma jeszcze zakończonego deploymentu'},
    en:{ok:'SYSTEM UP TO DATE',okd:'Latest main is deployed on GitHub Pages',new:'WAITING FOR DEPLOYMENT',newd:'Latest main has not completed deployment yet'},
    cs:{ok:'SYSTÉM JE AKTUÁLNÍ',okd:'Nejnovější main je nasazen na GitHub Pages',new:'ČEKÁ NA NASAZENÍ',newd:'Nejnovější main ještě nemá dokončené nasazení'},
    da:{ok:'SYSTEMET ER OPDATERET',okd:'Seneste main er udrullet på GitHub Pages',new:'VENTER PÅ UDRULNING',newd:'Seneste main er endnu ikke færdigudrullet'},
    de:{ok:'SYSTEM AKTUELL',okd:'Neuester main ist auf GitHub Pages bereitgestellt',new:'WARTET AUF BEREITSTELLUNG',newd:'Neuester main ist noch nicht vollständig bereitgestellt'},
    no:{ok:'SYSTEMET ER OPPDATERT',okd:'Siste main er utrullet på GitHub Pages',new:'VENTER PÅ UTRULLING',newd:'Siste main er ennå ikke ferdig utrullet'},
    fr:{ok:'SYSTÈME À JOUR',okd:'Le dernier main est déployé sur GitHub Pages',new:'EN ATTENTE DE DÉPLOIEMENT',newd:'Le dernier main n’est pas encore entièrement déployé'},
    ro:{ok:'SISTEM ACTUALIZAT',okd:'Ultimul main este implementat pe GitHub Pages',new:'AȘTEAPTĂ IMPLEMENTAREA',newd:'Ultimul main nu este încă implementat complet'},
    tr:{ok:'SİSTEM GÜNCEL',okd:'En yeni main GitHub Pages üzerinde dağıtıldı',new:'DAĞITIM BEKLENİYOR',newd:'En yeni main henüz tamamen dağıtılmadı'},
    it:{ok:'SISTEMA AGGIORNATO',okd:'Il main più recente è distribuito su GitHub Pages',new:'IN ATTESA DI DISTRIBUZIONE',newd:'Il main più recente non è ancora completamente distribuito'},
    nl:{ok:'SYSTEEM ACTUEEL',okd:'Nieuwste main is uitgerold op GitHub Pages',new:'WACHT OP UITROL',newd:'Nieuwste main is nog niet volledig uitgerold'},
    uk:{ok:'СИСТЕМА АКТУАЛЬНА',okd:'Останній main розгорнуто на GitHub Pages',new:'ОЧІКУЄ РОЗГОРТАННЯ',newd:'Останній main ще не завершив розгортання'}
  };
  const lang=localStorage.getItem('crm.language')||'pl'; const t=map[lang]||map.pl;
  const short=s=>s?String(s).slice(0,12):'—';
  async function run(){
    try{
      const [commits,runs]=await Promise.all([
        fetch(API+'/commits?sha=main&per_page=1',{cache:'no-store'}).then(r=>r.json()),
        fetch(API+'/actions/runs?branch=main&per_page=12',{cache:'no-store'}).then(r=>r.json())
      ]);
      const latest=commits[0]?.sha||'';
      const deployed=(runs.workflow_runs||[]).find(r=>r.conclusion==='success')||null;
      const exact=Boolean(deployed&&latest&&deployed.head_sha===latest);
      const build=document.getElementById('appBuild'); if(build) build.textContent=deployed?`RUN ${deployed.run_number}`:'—';
      const dep=document.getElementById('deployedCommit'); if(dep) dep.textContent=deployed?.head_sha||'—';
      const main=document.getElementById('latestCommit'); if(main) main.textContent=latest||'—';
      const st=document.getElementById('deployState'); if(st) st.textContent=deployed?(deployed.conclusion||deployed.status||'—').toUpperCase():'—';
      const banner=document.getElementById('updateBanner'); if(banner){banner.classList.remove('ok','warn');banner.classList.add(exact?'ok':'warn');}
      const h=document.getElementById('updateHeadline'); if(h) h.textContent=exact?t.ok:t.new;
      const d=document.getElementById('updateDetail'); if(d) d.textContent=exact?t.okd:t.newd;
      document.documentElement.dataset.latestMain=short(latest);
      document.documentElement.dataset.deployedMain=short(deployed?.head_sha);
    }catch(_){/* główny settings.js zachowuje własny fallback */}
  }
  window.addEventListener('load',()=>setTimeout(run,250));
  document.getElementById('syncBtn')?.addEventListener('click',()=>setTimeout(run,900));
})();
