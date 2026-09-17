(() => {
  'use strict';

  const REPO = 'LeszekSladkowski/CRM-SWIATLOWOD-EU';
  const API = 'https://api.github.com/repos/' + REPO;
  const GPS_LIMIT = 30;
  const langNames = {pl:'POLSKI',en:'ENGLISH',cs:'ČEŠTINA',da:'DANSK',de:'DEUTSCH',no:'NORSK',fr:'FRANÇAIS',ro:'ROMÂNĂ',tr:'TÜRKÇE',it:'ITALIANO',nl:'NEDERLANDS',uk:'УКРАЇНСЬКА'};
  const i18n = {
    pl:{settingsTitle:'USTAWIENIA',settingsSub:'CENTRUM SYSTEMU I AKTUALIZACJI',tabUpdates:'AKTUALIZACJE',tabSystem:'SYSTEM',tabBackups:'BACKUPY',tabShare:'WYŚLIJ / MENU',updatesTitle:'AKTUALIZACJA APLIKACJI',version:'WERSJA',deployedCommit:'COMMIT WDROŻONY',latestCommit:'NAJNOWSZY MAIN',deploy:'DEPLOYMENT',channel:'KANAŁ',history:'HISTORIA OSTATNICH AKTUALIZACJI',systemTitle:'INFORMACJE O SYSTEMIE',device:'URZĄDZENIE / PRZEGLĄDARKA',network:'SIEĆ',language:'JĘZYK',screen:'EKRAN',masterPoint:'PUNKT MASTER',backupsTitle:'MAGAZYN BACKUPÓW',backupsHint:'Gałęzie MASTER i BACKUP są pobierane bezpośrednio z repozytorium.',shareTitle:'WYŚLIJ / OTWÓRZ MENU',shareReport:'WYŚLIJ RAPORT SYSTEMU',downloadReport:'ZAPISZ RAPORT JSON',openRepo:'OTWÓRZ REPOZYTORIUM',openMenu:'WRÓĆ DO MENU GŁÓWNEGO',reportPreview:'PODGLĄD RAPORTU',current:'SYSTEM AKTUALNY',newVersion:'DOSTĘPNA NOWA WERSJA',syncing:'SYNCHRONIZACJA...',syncDetail:'Pobieranie danych z repozytorium i telefonu',okDetail:'Wdrożony commit jest zgodny z najnowszym main',newDetail:'Najnowszy main różni się od buildu zapisanego w aplikacji'},
    en:{settingsTitle:'SETTINGS',settingsSub:'SYSTEM AND UPDATE CENTER',tabUpdates:'UPDATES',tabSystem:'SYSTEM',tabBackups:'BACKUPS',tabShare:'SHARE / MENU',updatesTitle:'APPLICATION UPDATE',version:'VERSION',deployedCommit:'DEPLOYED COMMIT',latestCommit:'LATEST MAIN',deploy:'DEPLOYMENT',channel:'CHANNEL',history:'RECENT UPDATE HISTORY',systemTitle:'SYSTEM INFORMATION',device:'DEVICE / BROWSER',network:'NETWORK',language:'LANGUAGE',screen:'SCREEN',masterPoint:'MASTER POINT',backupsTitle:'BACKUP STORAGE',backupsHint:'MASTER and BACKUP branches are loaded directly from the repository.',shareTitle:'SHARE / OPEN MENU',shareReport:'SHARE SYSTEM REPORT',downloadReport:'SAVE JSON REPORT',openRepo:'OPEN REPOSITORY',openMenu:'BACK TO MAIN MENU',reportPreview:'REPORT PREVIEW',current:'SYSTEM UP TO DATE',newVersion:'NEW VERSION AVAILABLE',syncing:'SYNCING...',syncDetail:'Reading repository and device data',okDetail:'Deployed commit matches latest main',newDetail:'Latest main differs from the build recorded in the app'},
    cs:{settingsTitle:'NASTAVENÍ',settingsSub:'CENTRUM SYSTÉMU A AKTUALIZACÍ',tabUpdates:'AKTUALIZACE',tabSystem:'SYSTÉM',tabBackups:'ZÁLOHY',tabShare:'SDÍLET / MENU',updatesTitle:'AKTUALIZACE APLIKACE',version:'VERZE',deployedCommit:'NASAZENÝ COMMIT',latestCommit:'NEJNOVĚJŠÍ MAIN',deploy:'NASAZENÍ',channel:'KANÁL',history:'HISTORIE AKTUALIZACÍ',systemTitle:'INFORMACE O SYSTÉMU',device:'ZAŘÍZENÍ / PROHLÍŽEČ',network:'SÍŤ',language:'JAZYK',screen:'OBRAZOVKA',masterPoint:'MASTER BOD',backupsTitle:'ÚLOŽIŠTĚ ZÁLOH',backupsHint:'Větve MASTER a BACKUP se načítají přímo z repozitáře.',shareTitle:'SDÍLET / OTEVŘÍT MENU',shareReport:'SDÍLET SYSTÉMOVÝ REPORT',downloadReport:'ULOŽIT JSON REPORT',openRepo:'OTEVŘÍT REPOZITÁŘ',openMenu:'ZPĚT DO HLAVNÍHO MENU',reportPreview:'NÁHLED REPORTU',current:'SYSTÉM JE AKTUÁLNÍ',newVersion:'NOVÁ VERZE K DISPOZICI',syncing:'SYNCHRONIZACE...',syncDetail:'Načítání dat repozitáře a telefonu',okDetail:'Nasazený commit odpovídá nejnovějšímu main',newDetail:'Nejnovější main se liší od buildu aplikace'},
    de:{settingsTitle:'EINSTELLUNGEN',settingsSub:'SYSTEM- UND UPDATE-ZENTRALE',tabUpdates:'UPDATES',tabSystem:'SYSTEM',tabBackups:'BACKUPS',tabShare:'SENDEN / MENÜ',updatesTitle:'APP-AKTUALISIERUNG',version:'VERSION',deployedCommit:'BEREITGESTELLTER COMMIT',latestCommit:'NEUESTER MAIN',deploy:'BEREITSTELLUNG',channel:'KANAL',history:'LETZTE AKTUALISIERUNGEN',systemTitle:'SYSTEMINFORMATIONEN',device:'GERÄT / BROWSER',network:'NETZWERK',language:'SPRACHE',screen:'BILDSCHIRM',masterPoint:'MASTER-PUNKT',backupsTitle:'BACKUP-SPEICHER',backupsHint:'MASTER- und BACKUP-Zweige werden direkt aus dem Repository geladen.',shareTitle:'SENDEN / MENÜ ÖFFNEN',shareReport:'SYSTEMBERICHT SENDEN',downloadReport:'JSON-BERICHT SPEICHERN',openRepo:'REPOSITORY ÖFFNEN',openMenu:'ZUM HAUPTMENÜ',reportPreview:'BERICHTSVORSCHAU',current:'SYSTEM AKTUELL',newVersion:'NEUE VERSION VERFÜGBAR',syncing:'SYNCHRONISIERUNG...',syncDetail:'Repository- und Gerätedaten werden geladen',okDetail:'Bereitgestellter Commit entspricht dem neuesten main',newDetail:'Neuester main unterscheidet sich vom App-Build'},
    it:{settingsTitle:'IMPOSTAZIONI',settingsSub:'CENTRO SISTEMA E AGGIORNAMENTI',tabUpdates:'AGGIORNAMENTI',tabSystem:'SISTEMA',tabBackups:'BACKUP',tabShare:'INVIA / MENU',updatesTitle:'AGGIORNAMENTO APPLICAZIONE',version:'VERSIONE',deployedCommit:'COMMIT DISTRIBUITO',latestCommit:'MAIN PIÙ RECENTE',deploy:'DISTRIBUZIONE',channel:'CANALE',history:'CRONOLOGIA AGGIORNAMENTI',systemTitle:'INFORMAZIONI DI SISTEMA',device:'DISPOSITIVO / BROWSER',network:'RETE',language:'LINGUA',screen:'SCHERMO',masterPoint:'PUNTO MASTER',backupsTitle:'ARCHIVIO BACKUP',backupsHint:'I rami MASTER e BACKUP vengono letti direttamente dal repository.',shareTitle:'INVIA / APRI MENU',shareReport:'INVIA RAPPORTO DI SISTEMA',downloadReport:'SALVA RAPPORTO JSON',openRepo:'APRI REPOSITORY',openMenu:'TORNA AL MENU PRINCIPALE',reportPreview:'ANTEPRIMA RAPPORTO',current:'SISTEMA AGGIORNATO',newVersion:'NUOVA VERSIONE DISPONIBILE',syncing:'SINCRONIZZAZIONE...',syncDetail:'Lettura dati repository e telefono',okDetail:'Il commit distribuito coincide con il main più recente',newDetail:'Il main più recente differisce dal build registrato'},
    ro:{settingsTitle:'SETĂRI',settingsSub:'CENTRU SISTEM ȘI ACTUALIZĂRI',tabUpdates:'ACTUALIZĂRI',tabSystem:'SISTEM',tabBackups:'BACKUP',tabShare:'TRIMITE / MENIU',updatesTitle:'ACTUALIZARE APLICAȚIE',version:'VERSIUNE',deployedCommit:'COMMIT IMPLEMENTAT',latestCommit:'ULTIMUL MAIN',deploy:'IMPLEMENTARE',channel:'CANAL',history:'ISTORIC ACTUALIZĂRI',systemTitle:'INFORMAȚII SISTEM',device:'DISPOZITIV / BROWSER',network:'REȚEA',language:'LIMBĂ',screen:'ECRAN',masterPoint:'PUNCT MASTER',backupsTitle:'MAGAZIN BACKUP',backupsHint:'Ramurile MASTER și BACKUP sunt citite direct din repository.',shareTitle:'TRIMITE / DESCHIDE MENIU',shareReport:'TRIMITE RAPORT SISTEM',downloadReport:'SALVEAZĂ RAPORT JSON',openRepo:'DESCHIDE REPOSITORY',openMenu:'ÎNAPOI LA MENIUL PRINCIPAL',reportPreview:'PREVIZUALIZARE RAPORT',current:'SISTEM ACTUALIZAT',newVersion:'VERSIUNE NOUĂ DISPONIBILĂ',syncing:'SINCRONIZARE...',syncDetail:'Citire date repository și telefon',okDetail:'Commitul implementat corespunde cu ultimul main',newDetail:'Ultimul main diferă de buildul aplicației'},
    da:{settingsTitle:'INDSTILLINGER',settingsSub:'SYSTEM- OG OPDATERINGSCENTER',tabUpdates:'OPDATERINGER',tabSystem:'SYSTEM',tabBackups:'BACKUP',tabShare:'DEL / MENU',updatesTitle:'APP-OPDATERING',version:'VERSION',deployedCommit:'UDRULLET COMMIT',latestCommit:'SENESTE MAIN',deploy:'UDRULNING',channel:'KANAL',history:'SENESTE OPDATERINGER',systemTitle:'SYSTEMOPLYSNINGER',device:'ENHED / BROWSER',network:'NETVÆRK',language:'SPROG',screen:'SKÆRM',masterPoint:'MASTER-PUNKT',backupsTitle:'BACKUP-LAGER',backupsHint:'MASTER- og BACKUP-grene læses direkte fra repository.',shareTitle:'DEL / ÅBN MENU',shareReport:'DEL SYSTEMRAPPORT',downloadReport:'GEM JSON-RAPPORT',openRepo:'ÅBN REPOSITORY',openMenu:'TILBAGE TIL HOVEDMENU',reportPreview:'RAPPORTVISNING',current:'SYSTEMET ER OPDATERET',newVersion:'NY VERSION TILGÆNGELIG',syncing:'SYNKRONISERER...',syncDetail:'Læser repository- og telefondata',okDetail:'Udrullet commit matcher seneste main',newDetail:'Seneste main afviger fra app-build'},
    no:{settingsTitle:'INNSTILLINGER',settingsSub:'SYSTEM- OG OPPDATERINGSSENTER',tabUpdates:'OPPDATERINGER',tabSystem:'SYSTEM',tabBackups:'BACKUP',tabShare:'DEL / MENY',updatesTitle:'APP-OPPDATERING',version:'VERSJON',deployedCommit:'UTRULLET COMMIT',latestCommit:'SISTE MAIN',deploy:'UTRULLING',channel:'KANAL',history:'SISTE OPPDATERINGER',systemTitle:'SYSTEMINFORMASJON',device:'ENHET / NETTLESER',network:'NETTVERK',language:'SPRÅK',screen:'SKJERM',masterPoint:'MASTER-PUNKT',backupsTitle:'BACKUP-LAGER',backupsHint:'MASTER- og BACKUP-grener leses direkte fra repository.',shareTitle:'DEL / ÅPNE MENY',shareReport:'DEL SYSTEMRAPPORT',downloadReport:'LAGRE JSON-RAPPORT',openRepo:'ÅPNE REPOSITORY',openMenu:'TILBAKE TIL HOVEDMENY',reportPreview:'RAPPORTFORHÅNDSVISNING',current:'SYSTEMET ER OPPDATERT',newVersion:'NY VERSJON TILGJENGELIG',syncing:'SYNKRONISERER...',syncDetail:'Leser repository- og telefondata',okDetail:'Utrullet commit samsvarer med siste main',newDetail:'Siste main avviker fra app-build'},
    fr:{settingsTitle:'PARAMÈTRES',settingsSub:'CENTRE SYSTÈME ET MISES À JOUR',tabUpdates:'MISES À JOUR',tabSystem:'SYSTÈME',tabBackups:'SAUVEGARDES',tabShare:'ENVOYER / MENU',updatesTitle:'MISE À JOUR APPLICATION',version:'VERSION',deployedCommit:'COMMIT DÉPLOYÉ',latestCommit:'DERNIER MAIN',deploy:'DÉPLOIEMENT',channel:'CANAL',history:'HISTORIQUE DES MISES À JOUR',systemTitle:'INFORMATIONS SYSTÈME',device:'APPAREIL / NAVIGATEUR',network:'RÉSEAU',language:'LANGUE',screen:'ÉCRAN',masterPoint:'POINT MASTER',backupsTitle:'STOCKAGE DES SAUVEGARDES',backupsHint:'Les branches MASTER et BACKUP sont lues directement depuis le dépôt.',shareTitle:'ENVOYER / OUVRIR MENU',shareReport:'ENVOYER RAPPORT SYSTÈME',downloadReport:'ENREGISTRER RAPPORT JSON',openRepo:'OUVRIR LE DÉPÔT',openMenu:'RETOUR AU MENU PRINCIPAL',reportPreview:'APERÇU DU RAPPORT',current:'SYSTÈME À JOUR',newVersion:'NOUVELLE VERSION DISPONIBLE',syncing:'SYNCHRONISATION...',syncDetail:'Lecture du dépôt et du téléphone',okDetail:'Le commit déployé correspond au dernier main',newDetail:'Le dernier main diffère du build de l’application'},
    tr:{settingsTitle:'AYARLAR',settingsSub:'SİSTEM VE GÜNCELLEME MERKEZİ',tabUpdates:'GÜNCELLEMELER',tabSystem:'SİSTEM',tabBackups:'YEDEKLER',tabShare:'GÖNDER / MENÜ',updatesTitle:'UYGULAMA GÜNCELLEMESİ',version:'SÜRÜM',deployedCommit:'DAĞITILAN COMMIT',latestCommit:'EN YENİ MAIN',deploy:'DAĞITIM',channel:'KANAL',history:'SON GÜNCELLEMELER',systemTitle:'SİSTEM BİLGİLERİ',device:'CİHAZ / TARAYICI',network:'AĞ',language:'DİL',screen:'EKRAN',masterPoint:'MASTER NOKTASI',backupsTitle:'YEDEK DEPOSU',backupsHint:'MASTER ve BACKUP dalları doğrudan repository’den okunur.',shareTitle:'GÖNDER / MENÜYÜ AÇ',shareReport:'SİSTEM RAPORU GÖNDER',downloadReport:'JSON RAPORU KAYDET',openRepo:'REPOSITORY AÇ',openMenu:'ANA MENÜYE DÖN',reportPreview:'RAPOR ÖNİZLEME',current:'SİSTEM GÜNCEL',newVersion:'YENİ SÜRÜM MEVCUT',syncing:'SENKRONİZE EDİLİYOR...',syncDetail:'Repository ve telefon verileri okunuyor',okDetail:'Dağıtılan commit en yeni main ile eşleşiyor',newDetail:'En yeni main uygulama buildinden farklı'},
    nl:{settingsTitle:'INSTELLINGEN',settingsSub:'SYSTEEM- EN UPDATECENTRUM',tabUpdates:'UPDATES',tabSystem:'SYSTEEM',tabBackups:'BACK-UPS',tabShare:'DELEN / MENU',updatesTitle:'APP-UPDATE',version:'VERSIE',deployedCommit:'UITGEROLDE COMMIT',latestCommit:'NIEUWSTE MAIN',deploy:'UITROL',channel:'KANAAL',history:'RECENTE UPDATES',systemTitle:'SYSTEEMINFORMATIE',device:'APPARAAT / BROWSER',network:'NETWERK',language:'TAAL',screen:'SCHERM',masterPoint:'MASTER-PUNT',backupsTitle:'BACK-UP OPSLAG',backupsHint:'MASTER- en BACKUP-branches worden rechtstreeks uit de repository gelezen.',shareTitle:'DELEN / MENU OPENEN',shareReport:'SYSTEEMRAPPORT DELEN',downloadReport:'JSON-RAPPORT OPSLAAN',openRepo:'REPOSITORY OPENEN',openMenu:'TERUG NAAR HOOFDMENU',reportPreview:'RAPPORTVOORBEELD',current:'SYSTEEM ACTUEEL',newVersion:'NIEUWE VERSIE BESCHIKBAAR',syncing:'SYNCHRONISEREN...',syncDetail:'Repository- en telefoongegevens lezen',okDetail:'Uitgerolde commit komt overeen met nieuwste main',newDetail:'Nieuwste main wijkt af van app-build'},
    uk:{settingsTitle:'НАЛАШТУВАННЯ',settingsSub:'ЦЕНТР СИСТЕМИ ТА ОНОВЛЕНЬ',tabUpdates:'ОНОВЛЕННЯ',tabSystem:'СИСТЕМА',tabBackups:'РЕЗЕРВИ',tabShare:'НАДІСЛАТИ / МЕНЮ',updatesTitle:'ОНОВЛЕННЯ ЗАСТОСУНКУ',version:'ВЕРСІЯ',deployedCommit:'РОЗГОРНУТИЙ COMMIT',latestCommit:'ОСТАННІЙ MAIN',deploy:'РОЗГОРТАННЯ',channel:'КАНАЛ',history:'ІСТОРІЯ ОНОВЛЕНЬ',systemTitle:'ІНФОРМАЦІЯ ПРО СИСТЕМУ',device:'ПРИСТРІЙ / БРАУЗЕР',network:'МЕРЕЖА',language:'МОВА',screen:'ЕКРАН',masterPoint:'ТОЧКА MASTER',backupsTitle:'СХОВИЩЕ РЕЗЕРВІВ',backupsHint:'Гілки MASTER і BACKUP читаються безпосередньо з репозиторію.',shareTitle:'НАДІСЛАТИ / ВІДКРИТИ МЕНЮ',shareReport:'НАДІСЛАТИ СИСТЕМНИЙ ЗВІТ',downloadReport:'ЗБЕРЕГТИ JSON-ЗВІТ',openRepo:'ВІДКРИТИ РЕПОЗИТОРІЙ',openMenu:'ДО ГОЛОВНОГО МЕНЮ',reportPreview:'ПЕРЕГЛЯД ЗВІТУ',current:'СИСТЕМА АКТУАЛЬНА',newVersion:'ДОСТУПНА НОВА ВЕРСІЯ',syncing:'СИНХРОНІЗАЦІЯ...',syncDetail:'Читання даних репозиторію та телефону',okDetail:'Розгорнутий commit відповідає останньому main',newDetail:'Останній main відрізняється від build застосунку'}
  };

  let lang = localStorage.getItem('crm.language') || 'pl';
  if (!i18n[lang]) lang = 'pl';
  const t = () => i18n[lang] || i18n.pl;
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => [...document.querySelectorAll(s)];
  let report = {};
  let version = {};

  const applyLanguage = () => {
    document.documentElement.lang = lang;
    qsa('[data-i18n]').forEach(el => { const k=el.dataset.i18n; if(t()[k]) el.textContent=t()[k]; });
  };

  const shortSha = (sha) => sha ? String(sha).slice(0,12) : '—';
  const fmtDate = (v) => { try{return new Date(v).toLocaleString();}catch(_){return v||'—';} };
  const fetchJson = async (url) => { const r=await fetch(url,{cache:'no-store'}); if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); };

  const updateNetwork = async () => {
    const mini = qs('#miniOnline');
    let ok = navigator.onLine;
    if(ok){ try{ const r=await fetch('./?health='+Date.now(),{method:'HEAD',cache:'no-store'}); ok=r.ok; }catch(_){ok=false;} }
    mini.classList.toggle('on',ok); mini.classList.toggle('off',!ok); mini.querySelector('b').textContent=ok?'ONLINE':'OFFLINE';
    report.online=ok;
    qs('#networkInfo').textContent=ok?'ONLINE':'OFFLINE';
  };

  const updateGps = () => new Promise((resolve) => {
    if(!navigator.geolocation){ report.gps={active:false,reason:'unsupported'}; qs('#gpsInfo').textContent='GPS BRAK'; return resolve(); }
    navigator.geolocation.getCurrentPosition(pos=>{
      const acc=Number(pos.coords.accuracy); const active=Number.isFinite(acc)&&acc<=GPS_LIMIT;
      report.gps={active,accuracy_m:acc}; qs('#gpsInfo').textContent=active?`GPS AKTYWNY • ±${Math.round(acc)} m`:`GPS BRAK / SŁABY • ±${Math.round(acc)} m`; resolve();
    },()=>{report.gps={active:false,reason:'unavailable'};qs('#gpsInfo').textContent='GPS BRAK';resolve();},{enableHighAccuracy:true,maximumAge:5000,timeout:9000});
  });

  const fillSystem = async () => {
    qs('#deviceInfo').textContent=navigator.userAgent;
    const standalone=window.matchMedia('(display-mode: standalone)').matches || navigator.standalone===true;
    qs('#pwaInfo').textContent=standalone?'STANDALONE / PWA':'PRZEGLĄDARKA';
    qs('#pdfInfo').textContent=localStorage.getItem('crm.pdf.ready')==='1'?'PDF GOTOWY':'PDF BRAK';
    qs('#languageInfo').textContent=langNames[lang]||lang;
    qs('#screenInfo').textContent=`${screen.width}×${screen.height} CSS px • DPR ${window.devicePixelRatio||1}`;
    const regs=('serviceWorker' in navigator)?await navigator.serviceWorker.getRegistrations().catch(()=>[]):[];
    qs('#swInfo').textContent=regs.length?`AKTYWNY (${regs.length})`:'BRAK / NIEZAREJESTROWANY';
    qs('#masterInfo').textContent=version.master_branch||version.master_point||'—';
    report.device={userAgent:navigator.userAgent,pwa:standalone,screen:`${screen.width}x${screen.height}`,dpr:window.devicePixelRatio||1,service_workers:regs.length};
    report.language=lang;
    report.pdf_ready=localStorage.getItem('crm.pdf.ready')==='1';
  };

  const renderCommits = (commits) => {
    const host=qs('#commitHistory'); host.innerHTML='';
    commits.slice(0,8).forEach(c=>{ const el=document.createElement('div'); el.className='history-item'; el.innerHTML=`<div><b>${escapeHtml((c.commit?.message||'').split('\n')[0])}</b><small>${fmtDate(c.commit?.committer?.date)} • ${shortSha(c.sha)}</small></div><span class="pill">${shortSha(c.sha)}</span>`; host.appendChild(el); });
    if(!commits.length) host.innerHTML='<div class="loading">BRAK DANYCH</div>';
  };

  const renderBackups = (branches) => {
    const host=qs('#backupList'); host.innerHTML='';
    const selected=branches.filter(b=>/MASTER|BACKUP/i.test(b.name));
    selected.forEach(b=>{ const el=document.createElement('div'); el.className='backup-item'; el.innerHTML=`<div><b>${escapeHtml(b.name)}</b><small>${shortSha(b.commit?.sha)}</small></div><span class="pill">${/^MASTER/i.test(b.name)?'MASTER':'BACKUP'}</span>`; host.appendChild(el); });
    if(!selected.length) host.innerHTML='<div class="loading">BRAK GAŁĘZI MASTER/BACKUP</div>';
    report.backups=selected.map(b=>({name:b.name,commit:b.commit?.sha}));
  };

  const escapeHtml = (s) => String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  const sync = async () => {
    const btn=qs('#syncBtn'), banner=qs('#updateBanner');
    btn.classList.add('is-syncing'); banner.className='status-banner'; qs('#updateHeadline').textContent=t().syncing; qs('#updateDetail').textContent=t().syncDetail;
    try{
      const [v,commits,runs,branches]=await Promise.all([
        fetchJson('./version.json?ts='+Date.now()),
        fetchJson(API+'/commits?sha=main&per_page=8'),
        fetchJson(API+'/actions/runs?branch=main&per_page=5'),
        fetchJson(API+'/branches?per_page=100')
      ]);
      version=v||{};
      const latest=commits[0]?.sha||'';
      const deploy=(runs.workflow_runs||[])[0]||{};
      qs('#appVersion').textContent=version.version||'—';
      qs('#appBuild').textContent=version.build||'—';
      qs('#deployedCommit').textContent=version.deployed_commit||'—';
      qs('#latestCommit').textContent=latest||'—';
      qs('#deployState').textContent=(deploy.conclusion||deploy.status||'—').toUpperCase();
      qs('#appChannel').textContent=version.channel||'main';
      qs('#footerVersion').textContent=`${version.app||'CRM ŚWIATŁOWÓD EU'} • ${version.version||'—'} • ${version.build||'—'}`;
      renderCommits(commits); renderBackups(branches);
      const current=Boolean(version.deployed_commit && latest && version.deployed_commit===latest);
      banner.classList.add(current?'ok':'warn');
      qs('#updateHeadline').textContent=current?t().current:t().newVersion;
      qs('#updateDetail').textContent=current?t().okDetail:t().newDetail;
      report.version=version; report.latest_main=latest; report.deployment={status:deploy.status,conclusion:deploy.conclusion,run_number:deploy.run_number,updated_at:deploy.updated_at}; report.recent_commits=commits.map(c=>({sha:c.sha,message:c.commit?.message,date:c.commit?.committer?.date}));
      await updateNetwork(); await updateGps(); await fillSystem();
      qs('#reportPreview').textContent=JSON.stringify(report,null,2);
    } catch(e){
      banner.classList.add('warn'); qs('#updateHeadline').textContent='BŁĄD SYNCHRONIZACJI'; qs('#updateDetail').textContent=String(e.message||e); await updateNetwork(); await updateGps(); await fillSystem(); qs('#reportPreview').textContent=JSON.stringify(report,null,2);
    } finally { btn.classList.remove('is-syncing'); }
  };

  qsa('.tab').forEach(tab=>tab.addEventListener('click',()=>{ const id=tab.dataset.card; qsa('.tab').forEach(x=>x.classList.toggle('active',x===tab)); qsa('.settings-card').forEach(p=>p.classList.toggle('active',p.dataset.panel===id)); window.scrollTo({top:0,behavior:'smooth'}); }));
  qs('#syncBtn').addEventListener('click',sync);
  qs('#shareReport').addEventListener('click',async()=>{ const text=JSON.stringify(report,null,2); if(navigator.share){try{await navigator.share({title:'CRM ŚWIATŁOWÓD EU — raport systemu',text});return;}catch(_){}} await navigator.clipboard?.writeText(text); });
  qs('#downloadReport').addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='crm-swiatlowod-eu-system-report.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); });
  window.addEventListener('online',updateNetwork,{passive:true}); window.addEventListener('offline',updateNetwork,{passive:true});
  applyLanguage();
  sync();
})();
