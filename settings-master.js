(() => {
  'use strict';
  const W=709,H=1536;
  const stage=document.getElementById('settingsStage');
  const viewport=document.getElementById('settingsViewport');
  const lang=localStorage.getItem('crm.language')||'pl';
  const locale={pl:'pl-PL',en:'en-GB',cs:'cs-CZ',da:'da-DK',de:'de-DE',no:'nb-NO',fr:'fr-FR',ro:'ro-RO',tr:'tr-TR',it:'it-IT',nl:'nl-NL',uk:'uk-UA'}[lang]||'pl-PL';
  const T={
    pl:{back:'WRÓĆ',sync:'SYNCHRONIZUJ',settings:'USTAWIENIA',sub:'L&M ŚWIATŁOWÓD SYSTEM',card0:'KARTA 0',version:'WERSJA:',online:'ONLINE',offline:'OFFLINE',sys:'USTAWIENIA SYSTEMU',desc:'Aktualizacje, informacje techniczne, backupy i udostępnianie systemu.',c1:'KARTA 1',t1:'AKTUALIZACJA APLIKACJI',d1:'Wersja, postęp aktualizacji i kontrola systemu.',c2:'KARTA 2',t2:'INFORMACJE O SYSTEMIE',d2:'Wersja techniczna, build, tryb pracy i status.',c3:'KARTA 3',t3:'MAGAZYN BACKUPÓW',d3:'Kopie lokalne, import, przywracanie i historia.',c4:'KARTA 4',t4:'WYŚLIJ DO / OTWÓRZ MENU',d4:'E-mail, WhatsApp, GPChat i menu telefonu.',slogan:'SZYBSZA KOMUNIKACJA  •  WIĘKSZE MOŻLIWOŚCI',brand:'L&M TECHNIC',desk:'PULPIT'},
    en:{back:'BACK',sync:'SYNC',settings:'SETTINGS',sub:'L&M FIBER SYSTEM',card0:'CARD 0',version:'VERSION:',online:'ONLINE',offline:'OFFLINE',sys:'SYSTEM SETTINGS',desc:'Updates, technical information, backups and system sharing.',c1:'CARD 1',t1:'APPLICATION UPDATE',d1:'Version, update progress and system control.',c2:'CARD 2',t2:'SYSTEM INFORMATION',d2:'Technical version, build, operating mode and status.',c3:'CARD 3',t3:'BACKUP STORAGE',d3:'Local copies, import, restore and history.',c4:'CARD 4',t4:'SEND TO / OPEN MENU',d4:'E-mail, WhatsApp, GPChat and phone menu.',slogan:'FASTER COMMUNICATION  •  MORE POSSIBILITIES',brand:'L&M TECHNIC',desk:'DASHBOARD'},
    cs:{back:'ZPĚT',sync:'SYNCHRONIZOVAT',settings:'NASTAVENÍ',sub:'L&M OPTICKÝ SYSTÉM',card0:'KARTA 0',version:'VERZE:',online:'ONLINE',offline:'OFFLINE',sys:'NASTAVENÍ SYSTÉMU',desc:'Aktualizace, technické informace, zálohy a sdílení systému.',c1:'KARTA 1',t1:'AKTUALIZACE APLIKACE',d1:'Verze, průběh aktualizace a kontrola systému.',c2:'KARTA 2',t2:'INFORMACE O SYSTÉMU',d2:'Technická verze, build, režim práce a stav.',c3:'KARTA 3',t3:'ÚLOŽIŠTĚ ZÁLOH',d3:'Místní kopie, import, obnovení a historie.',c4:'KARTA 4',t4:'ODESLAT / OTEVŘÍT MENU',d4:'E-mail, WhatsApp, GPChat a menu telefonu.',slogan:'RYCHLEJŠÍ KOMUNIKACE  •  VÍCE MOŽNOSTÍ',brand:'L&M TECHNIC',desk:'PANEL'},
    da:{back:'TILBAGE',sync:'SYNKRONISER',settings:'INDSTILLINGER',sub:'L&M FIBERSYSTEM',card0:'KORT 0',version:'VERSION:',online:'ONLINE',offline:'OFFLINE',sys:'SYSTEMINDSTILLINGER',desc:'Opdateringer, teknisk information, backups og systemdeling.',c1:'KORT 1',t1:'APP-OPDATERING',d1:'Version, opdateringsforløb og systemkontrol.',c2:'KORT 2',t2:'SYSTEMOPLYSNINGER',d2:'Teknisk version, build, driftstilstand og status.',c3:'KORT 3',t3:'BACKUP-LAGER',d3:'Lokale kopier, import, gendannelse og historik.',c4:'KORT 4',t4:'SEND TIL / ÅBN MENU',d4:'E-mail, WhatsApp, GPChat og telefonmenu.',slogan:'HURTIGERE KOMMUNIKATION  •  FLERE MULIGHEDER',brand:'L&M TECHNIC',desk:'PANEL'},
    de:{back:'ZURÜCK',sync:'SYNCHRONISIEREN',settings:'EINSTELLUNGEN',sub:'L&M GLASFASER SYSTEM',card0:'KARTE 0',version:'VERSION:',online:'ONLINE',offline:'OFFLINE',sys:'SYSTEMEINSTELLUNGEN',desc:'Updates, technische Informationen, Backups und Systemfreigabe.',c1:'KARTE 1',t1:'APP-AKTUALISIERUNG',d1:'Version, Updatefortschritt und Systemkontrolle.',c2:'KARTE 2',t2:'SYSTEMINFORMATIONEN',d2:'Technische Version, Build, Betriebsart und Status.',c3:'KARTE 3',t3:'BACKUP-SPEICHER',d3:'Lokale Kopien, Import, Wiederherstellung und Verlauf.',c4:'KARTE 4',t4:'SENDEN / MENÜ ÖFFNEN',d4:'E-Mail, WhatsApp, GPChat und Telefonmenü.',slogan:'SCHNELLERE KOMMUNIKATION  •  MEHR MÖGLICHKEITEN',brand:'L&M TECHNIC',desk:'DASHBOARD'},
    no:{back:'TILBAKE',sync:'SYNKRONISER',settings:'INNSTILLINGER',sub:'L&M FIBERSYSTEM',card0:'KORT 0',version:'VERSJON:',online:'ONLINE',offline:'OFFLINE',sys:'SYSTEMINNSTILLINGER',desc:'Oppdateringer, teknisk informasjon, sikkerhetskopier og systemdeling.',c1:'KORT 1',t1:'APP-OPPDATERING',d1:'Versjon, oppdateringsfremdrift og systemkontroll.',c2:'KORT 2',t2:'SYSTEMINFORMASJON',d2:'Teknisk versjon, build, driftsmodus og status.',c3:'KORT 3',t3:'BACKUP-LAGER',d3:'Lokale kopier, import, gjenoppretting og historikk.',c4:'KORT 4',t4:'SEND TIL / ÅPNE MENY',d4:'E-post, WhatsApp, GPChat og telefonmeny.',slogan:'RASKERE KOMMUNIKASJON  •  FLERE MULIGHETER',brand:'L&M TECHNIC',desk:'PANEL'},
    fr:{back:'RETOUR',sync:'SYNCHRONISER',settings:'PARAMÈTRES',sub:'L&M SYSTÈME FIBRE',card0:'CARTE 0',version:'VERSION :',online:'ONLINE',offline:'OFFLINE',sys:'PARAMÈTRES SYSTÈME',desc:'Mises à jour, informations techniques, sauvegardes et partage du système.',c1:'CARTE 1',t1:'MISE À JOUR APPLICATION',d1:'Version, progression et contrôle du système.',c2:'CARTE 2',t2:'INFORMATIONS SYSTÈME',d2:'Version technique, build, mode de travail et état.',c3:'CARTE 3',t3:'STOCKAGE DES SAUVEGARDES',d3:'Copies locales, import, restauration et historique.',c4:'CARTE 4',t4:'ENVOYER / OUVRIR MENU',d4:'E-mail, WhatsApp, GPChat et menu du téléphone.',slogan:'COMMUNICATION PLUS RAPIDE  •  PLUS DE POSSIBILITÉS',brand:'L&M TECHNIC',desk:'TABLEAU DE BORD'},
    ro:{back:'ÎNAPOI',sync:'SINCRONIZEAZĂ',settings:'SETĂRI',sub:'L&M SISTEM FIBRĂ',card0:'CARD 0',version:'VERSIUNE:',online:'ONLINE',offline:'OFFLINE',sys:'SETĂRI SISTEM',desc:'Actualizări, informații tehnice, backupuri și partajarea sistemului.',c1:'CARD 1',t1:'ACTUALIZARE APLICAȚIE',d1:'Versiune, progresul actualizării și controlul sistemului.',c2:'CARD 2',t2:'INFORMAȚII SISTEM',d2:'Versiune tehnică, build, mod de lucru și stare.',c3:'CARD 3',t3:'MAGAZIN BACKUP',d3:'Copii locale, import, restaurare și istoric.',c4:'CARD 4',t4:'TRIMITE / DESCHIDE MENIU',d4:'E-mail, WhatsApp, GPChat și meniul telefonului.',slogan:'COMUNICARE MAI RAPIDĂ  •  MAI MULTE POSIBILITĂȚI',brand:'L&M TECHNIC',desk:'PANOU'},
    tr:{back:'GERİ',sync:'SENKRONİZE ET',settings:'AYARLAR',sub:'L&M FİBER SİSTEMİ',card0:'KART 0',version:'SÜRÜM:',online:'ONLINE',offline:'OFFLINE',sys:'SİSTEM AYARLARI',desc:'Güncellemeler, teknik bilgiler, yedekler ve sistem paylaşımı.',c1:'KART 1',t1:'UYGULAMA GÜNCELLEMESİ',d1:'Sürüm, güncelleme ilerlemesi ve sistem kontrolü.',c2:'KART 2',t2:'SİSTEM BİLGİLERİ',d2:'Teknik sürüm, build, çalışma modu ve durum.',c3:'KART 3',t3:'YEDEK DEPOSU',d3:'Yerel kopyalar, içe aktarma, geri yükleme ve geçmiş.',c4:'KART 4',t4:'GÖNDER / MENÜYÜ AÇ',d4:'E-posta, WhatsApp, GPChat ve telefon menüsü.',slogan:'DAHA HIZLI İLETİŞİM  •  DAHA FAZLA OLANAK',brand:'L&M TECHNIC',desk:'PANEL'},
    it:{back:'INDIETRO',sync:'SINCRONIZZA',settings:'IMPOSTAZIONI',sub:'L&M SISTEMA FIBRA',card0:'CARTA 0',version:'VERSIONE:',online:'ONLINE',offline:'OFFLINE',sys:'IMPOSTAZIONI DI SISTEMA',desc:'Aggiornamenti, informazioni tecniche, backup e condivisione del sistema.',c1:'CARTA 1',t1:'AGGIORNAMENTO APPLICAZIONE',d1:'Versione, avanzamento aggiornamento e controllo sistema.',c2:'CARTA 2',t2:'INFORMAZIONI DI SISTEMA',d2:'Versione tecnica, build, modalità operativa e stato.',c3:'CARTA 3',t3:'ARCHIVIO BACKUP',d3:'Copie locali, importazione, ripristino e cronologia.',c4:'CARTA 4',t4:'INVIA / APRI MENU',d4:'E-mail, WhatsApp, GPChat e menu del telefono.',slogan:'COMUNICAZIONE PIÙ RAPIDA  •  PIÙ POSSIBILITÀ',brand:'L&M TECHNIC',desk:'PANNELLO'},
    nl:{back:'TERUG',sync:'SYNCHRONISEREN',settings:'INSTELLINGEN',sub:'L&M VEZELSYSTEEM',card0:'KAART 0',version:'VERSIE:',online:'ONLINE',offline:'OFFLINE',sys:'SYSTEEMINSTELLINGEN',desc:'Updates, technische informatie, back-ups en systeemdeling.',c1:'KAART 1',t1:'APP-UPDATE',d1:'Versie, updatevoortgang en systeemcontrole.',c2:'KAART 2',t2:'SYSTEEMINFORMATIE',d2:'Technische versie, build, werkmodus en status.',c3:'KAART 3',t3:'BACK-UP OPSLAG',d3:'Lokale kopieën, import, herstel en geschiedenis.',c4:'KAART 4',t4:'VERZENDEN / MENU OPENEN',d4:'E-mail, WhatsApp, GPChat en telefoonmenu.',slogan:'SNELLERE COMMUNICATIE  •  MEER MOGELIJKHEDEN',brand:'L&M TECHNIC',desk:'DASHBOARD'},
    uk:{back:'НАЗАД',sync:'СИНХРОНІЗУВАТИ',settings:'НАЛАШТУВАННЯ',sub:'L&M ОПТОВОЛОКОННА СИСТЕМА',card0:'КАРТКА 0',version:'ВЕРСІЯ:',online:'ONLINE',offline:'OFFLINE',sys:'НАЛАШТУВАННЯ СИСТЕМИ',desc:'Оновлення, технічна інформація, резервні копії та спільний доступ.',c1:'КАРТКА 1',t1:'ОНОВЛЕННЯ ЗАСТОСУНКУ',d1:'Версія, хід оновлення та контроль системи.',c2:'КАРТКА 2',t2:'ІНФОРМАЦІЯ ПРО СИСТЕМУ',d2:'Технічна версія, build, режим роботи та стан.',c3:'КАРТКА 3',t3:'СХОВИЩЕ РЕЗЕРВІВ',d3:'Локальні копії, імпорт, відновлення та історія.',c4:'КАРТКА 4',t4:'НАДІСЛАТИ / ВІДКРИТИ МЕНЮ',d4:'E-mail, WhatsApp, GPChat і меню телефону.',slogan:'ШВИДШИЙ ЗВ’ЯЗОК  •  БІЛЬШЕ МОЖЛИВОСТЕЙ',brand:'L&M TECHNIC',desk:'ПАНЕЛЬ'}
  };
  const t=T[lang]||T.pl;

  function fit(){
    const scale=Math.min(window.innerWidth/W,1.35);
    stage.style.transform=`scale(${scale})`;
    viewport.style.height=Math.ceil(H*scale)+'px';
  }
  window.addEventListener('resize',fit,{passive:true}); fit();

  document.querySelectorAll('[data-k]').forEach(el=>{const k=el.dataset.k;if(t[k]!=null)el.textContent=t[k];});
  document.documentElement.lang=lang;

  const dateEl=document.getElementById('liveDate');
  const timeEl=document.getElementById('liveTime');
  function clock(){const n=new Date();dateEl.textContent=n.toLocaleDateString(locale,{day:'2-digit',month:'2-digit',year:'numeric'});timeEl.textContent=n.toLocaleTimeString(locale,{hour:'2-digit',minute:'2-digit'});}
  clock(); setInterval(clock,15000);

  async function realOnline(){
    let ok=navigator.onLine;
    if(ok){try{const r=await fetch('./?settings-health='+Date.now(),{method:'HEAD',cache:'no-store'});ok=r.ok;}catch(_){ok=false;}}
    const box=document.getElementById('liveOnline');box.classList.toggle('online',ok);box.classList.toggle('offline',!ok);box.querySelector('b').textContent=ok?t.online:t.offline;return ok;
  }
  window.addEventListener('online',realOnline,{passive:true});window.addEventListener('offline',realOnline,{passive:true});

  async function readVersion(){
    try{const r=await fetch('./version.json?ts='+Date.now(),{cache:'no-store'});const v=await r.json();document.getElementById('liveVersion').textContent=(v.display_version||'V4.1.0').replace(/^WERSJA:\s*/i,'');}catch(_){document.getElementById('liveVersion').textContent='V4.1.0';}
  }

  const sync=document.getElementById('syncLive');
  async function synchronize(){
    if(sync.classList.contains('syncing'))return;
    sync.classList.add('syncing');
    const started=performance.now();
    await Promise.allSettled([realOnline(),readVersion(),fetch('https://api.github.com/repos/LeszekSladkowski/CRM-SWIATLOWOD-EU/commits?sha=main&per_page=1',{cache:'no-store'})]);
    const wait=Math.max(0,700-(performance.now()-started));
    setTimeout(()=>sync.classList.remove('syncing'),wait);
  }
  document.getElementById('syncZone').addEventListener('click',synchronize);
  sync.addEventListener('click',synchronize);
  document.getElementById('backZone').addEventListener('click',()=>location.href='./');
  document.getElementById('homeZone').addEventListener('click',()=>location.href='./');
  document.querySelectorAll('[data-card-target]').forEach(el=>el.addEventListener('click',()=>location.href='./settings-engine.html?card='+el.dataset.cardTarget));
  readVersion();realOnline();
})();
