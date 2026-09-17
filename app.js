(() => {
  'use strict';

  const STAGE_WIDTH = 1440;
  const STAGE_HEIGHT = 3120;
  const GPS_ACCURACY_LIMIT_METERS = 30;
  const repoHealthUrl = () => `./?crm-health=${Date.now()}`;

  const viewport = document.getElementById('viewport');
  const stage = document.getElementById('designStage');
  if (!viewport || !stage) return;

  const translations = {
    pl: {
      flag: '🇵🇱', language: 'JĘZYK', subtitle: 'MENU GŁÓWNE / PANEL STEROWANIA',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'AKTYWNY', gpsNone: 'BRAK', pdfReady: 'GOTOWY', pdfNone: 'BRAK',
      m1t: 'MAGISTRALA HK', m1d: 'WDMUCHIWANIE\nŚWIATŁOWODÓW',
      m2t: 'PRZYŁĄCZA HKA', m2d: 'WDMUCHIWANIE\nDO OBIEKTÓW',
      m3t: 'SPAWANIE MUF', m3d: 'SPOINY\nABONENCKIE',
      m4t: 'SPAWANIE POP', m4d: 'SPOINY\nMAGISTRALNE',
      m5t: 'PROTOKOŁY', m5d: 'DOKUMENTACJA\nI RAPORTY',
      m6t: 'PROJEKTY QGIS', m6d: 'MAPY I LOKALIZACJE\nSIECI',
      m7t: 'POMIARY OTDR', m7d: 'REFLEKTOMETRIA\nŚWIATŁOWODÓW',
      m8t: 'POMIARY MOCY', m8d: 'POMIARY TŁUMIENIA\nI MOCY OPTYCZNEJ',
      m9t: 'USTAWIENIA', m9d: 'KONFIGURACJA\nAPLIKACJI',
      tffbauDesc: 'BUDOWA KANALIZACJI TELETECHNICZNEJ\nRUROCIĄGI ŚWIATŁOWODOWE',
      slogan: 'Łączymy świat\nlepszymi możliwościami'
    },
    en: {
      flag: '🇬🇧', language: 'LANGUAGE', subtitle: 'MAIN MENU / CONTROL PANEL',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'ACTIVE', gpsNone: 'NO SIGNAL', pdfReady: 'READY', pdfNone: 'NONE',
      m1t: 'BACKBONE HK', m1d: 'FIBRE BLOWING',
      m2t: 'HKA CONNECTIONS', m2d: 'BLOWING TO\nBUILDINGS',
      m3t: 'CLOSURE SPLICING', m3d: 'SUBSCRIBER\nSPLICES',
      m4t: 'POP SPLICING', m4d: 'BACKBONE\nSPLICES',
      m5t: 'PROTOCOLS', m5d: 'DOCUMENTATION\nAND REPORTS',
      m6t: 'QGIS PROJECTS', m6d: 'NETWORK MAPS\nAND LOCATIONS',
      m7t: 'OTDR MEASUREMENTS', m7d: 'FIBRE\nREFLECTOMETRY',
      m8t: 'POWER MEASUREMENTS', m8d: 'ATTENUATION AND\nOPTICAL POWER',
      m9t: 'SETTINGS', m9d: 'APPLICATION\nCONFIGURATION',
      tffbauDesc: 'TELECOMMUNICATION DUCT CONSTRUCTION\nFIBRE-OPTIC PIPELINES',
      slogan: 'Connecting the world\nwith better possibilities'
    },
    cs: {
      flag: '🇨🇿', language: 'JAZYK', subtitle: 'HLAVNÍ MENU / OVLÁDACÍ PANEL',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'AKTIVNÍ', gpsNone: 'NENÍ', pdfReady: 'PŘIPRAVENO', pdfNone: 'NENÍ',
      m1t: 'PÁTEŘNÍ TRASA HK', m1d: 'ZAFOUKÁVÁNÍ\nOPTICKÝCH VLÁKEN',
      m2t: 'PŘÍPOJKY HKA', m2d: 'ZAFOUKÁVÁNÍ\nDO OBJEKTŮ',
      m3t: 'SVAŘOVÁNÍ SPOJEK', m3d: 'ÚČASTNICKÉ\nSVARY',
      m4t: 'SVAŘOVÁNÍ POP', m4d: 'PÁTEŘNÍ\nSVARY',
      m5t: 'PROTOKOLY', m5d: 'DOKUMENTACE\nA REPORTY',
      m6t: 'PROJEKTY QGIS', m6d: 'MAPY A LOKALIZACE\nSÍTĚ',
      m7t: 'MĚŘENÍ OTDR', m7d: 'REFLEKTOMETRIE\nOPTICKÝCH VLÁKEN',
      m8t: 'MĚŘENÍ VÝKONU', m8d: 'ÚTLUM A OPTICKÝ\nVÝKON',
      m9t: 'NASTAVENÍ', m9d: 'KONFIGURACE\nAPLIKACE',
      tffbauDesc: 'VÝSTAVBA TELEKOMUNIKAČNÍCH TRAS\nOPTICKÁ POTRUBÍ',
      slogan: 'Propojujeme svět\nlepšími možnostmi'
    },
    da: {
      flag: '🇩🇰', language: 'SPROG', subtitle: 'HOVEDMENU / KONTROLPANEL',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'AKTIV', gpsNone: 'MANGLER', pdfReady: 'KLAR', pdfNone: 'MANGLER',
      m1t: 'HOVEDLINJE HK', m1d: 'INDBLÆSNING\nAF FIBER',
      m2t: 'HKA-TILSLUTNINGER', m2d: 'INDBLÆSNING\nTIL BYGNINGER',
      m3t: 'MUFFE-SPLIDSNING', m3d: 'ABONNENT-\nSPLIDSNINGER',
      m4t: 'POP-SPLIDSNING', m4d: 'HOVEDNET-\nSPLIDSNINGER',
      m5t: 'PROTOKOLLER', m5d: 'DOKUMENTATION\nOG RAPPORTER',
      m6t: 'QGIS-PROJEKTER', m6d: 'NETKORT OG\nPLACERINGER',
      m7t: 'OTDR-MÅLINGER', m7d: 'FIBER-\nREFLEKTOMETRI',
      m8t: 'EFFEKT-MÅLINGER', m8d: 'DÆMPNING OG\nOPTISK EFFEKT',
      m9t: 'INDSTILLINGER', m9d: 'APP-\nKONFIGURATION',
      tffbauDesc: 'ETABLERING AF TELEKANALISATION\nFIBEROPTISKE RØRSYSTEMER',
      slogan: 'Vi forbinder verden\nmed bedre muligheder'
    },
    de: {
      flag: '🇩🇪', language: 'SPRACHE', subtitle: 'HAUPTMENÜ / STEUERUNG',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'AKTIV', gpsNone: 'FEHLT', pdfReady: 'BEREIT', pdfNone: 'FEHLT',
      m1t: 'HAUPTTRASSE HK', m1d: 'GLASFASER\nEINBLASEN',
      m2t: 'HKA-ANSCHLÜSSE', m2d: 'EINBLASEN ZU\nGEBÄUDEN',
      m3t: 'MUFFENSPLEISSUNG', m3d: 'TEILNEHMER-\nSPLEISSE',
      m4t: 'POP-SPLEISSUNG', m4d: 'HAUPTNETZ-\nSPLEISSE',
      m5t: 'PROTOKOLLE', m5d: 'DOKUMENTATION\nUND BERICHTE',
      m6t: 'QGIS-PROJEKTE', m6d: 'NETZKARTEN UND\nSTANDORTE',
      m7t: 'OTDR-MESSUNGEN', m7d: 'GLASFASER-\nREFLEKTOMETRIE',
      m8t: 'LEISTUNGSMESSUNGEN', m8d: 'DÄMPFUNG UND\nOPTISCHE LEISTUNG',
      m9t: 'EINSTELLUNGEN', m9d: 'APP-\nKONFIGURATION',
      tffbauDesc: 'BAU VON TELEKOMMUNIKATIONSKANÄLEN\nGLASFASER-ROHRSYSTEME',
      slogan: 'Wir verbinden die Welt\nmit besseren Möglichkeiten'
    },
    no: {
      flag: '🇳🇴', language: 'SPRÅK', subtitle: 'HOVEDMENY / KONTROLLPANEL',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'AKTIV', gpsNone: 'MANGLER', pdfReady: 'KLAR', pdfNone: 'MANGLER',
      m1t: 'HOVEDTRASÉ HK', m1d: 'INNBLÅSING\nAV FIBER',
      m2t: 'HKA-TILKOBLINGER', m2d: 'INNBLÅSING\nTIL BYGG',
      m3t: 'SKJØTING AV MUFFER', m3d: 'ABONNENT-\nSKJØTER',
      m4t: 'POP-SKJØTING', m4d: 'STAMNETT-\nSKJØTER',
      m5t: 'PROTOKOLLER', m5d: 'DOKUMENTASJON\nOG RAPPORTER',
      m6t: 'QGIS-PROSJEKTER', m6d: 'NETTKART OG\nPOSISJONER',
      m7t: 'OTDR-MÅLINGER', m7d: 'FIBER-\nREFLEKTOMETRI',
      m8t: 'EFFEKT-MÅLINGER', m8d: 'DEMPING OG\nOPTISK EFFEKT',
      m9t: 'INNSTILLINGER', m9d: 'APP-\nKONFIGURASJON',
      tffbauDesc: 'BYGGING AV TELEKANALISASJON\nFIBEROPTISKE RØRSYSTEMER',
      slogan: 'Vi kobler verden\nmed bedre muligheter'
    },
    fr: {
      flag: '🇫🇷', language: 'LANGUE', subtitle: 'MENU PRINCIPAL / PANNEAU DE COMMANDE',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'ACTIF', gpsNone: 'ABSENT', pdfReady: 'PRÊT', pdfNone: 'ABSENT',
      m1t: 'DORSALE HK', m1d: 'SOUFFLAGE DE\nFIBRE OPTIQUE',
      m2t: 'RACCORDEMENTS HKA', m2d: 'SOUFFLAGE VERS\nLES BÂTIMENTS',
      m3t: 'SOUDURE DES BOÎTIERS', m3d: 'SOUDURES\nABONNÉS',
      m4t: 'SOUDURE POP', m4d: 'SOUDURES\nDORSALES',
      m5t: 'PROTOCOLES', m5d: 'DOCUMENTATION\nET RAPPORTS',
      m6t: 'PROJETS QGIS', m6d: 'CARTES ET\nEMPLACEMENTS RÉSEAU',
      m7t: 'MESURES OTDR', m7d: 'RÉFLECTOMÉTRIE\nFIBRE',
      m8t: 'MESURES DE PUISSANCE', m8d: 'ATTÉNUATION ET\nPUISSANCE OPTIQUE',
      m9t: 'PARAMÈTRES', m9d: 'CONFIGURATION\nDE L’APPLICATION',
      tffbauDesc: 'CONSTRUCTION DE CANALISATIONS TÉLÉCOM\nCONDUITES DE FIBRE OPTIQUE',
      slogan: 'Nous connectons le monde\nà de meilleures possibilités'
    },
    ro: {
      flag: '🇷🇴', language: 'LIMBĂ', subtitle: 'MENIU PRINCIPAL / PANOU DE CONTROL',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'ACTIV', gpsNone: 'LIPSĂ', pdfReady: 'GATA', pdfNone: 'LIPSĂ',
      m1t: 'MAGISTRALĂ HK', m1d: 'SUFLARE\nFIBRĂ OPTICĂ',
      m2t: 'RACORDURI HKA', m2d: 'SUFLARE CĂTRE\nCLĂDIRI',
      m3t: 'SUDURĂ MUFE', m3d: 'SUDURI\nABONAT',
      m4t: 'SUDURĂ POP', m4d: 'SUDURI\nMAGISTRALE',
      m5t: 'PROCESE-VERBALE', m5d: 'DOCUMENTAȚIE\nȘI RAPOARTE',
      m6t: 'PROIECTE QGIS', m6d: 'HĂRȚI ȘI LOCAȚII\nREȚEA',
      m7t: 'MĂSURĂTORI OTDR', m7d: 'REFLECTOMETRIE\nFIBRĂ',
      m8t: 'MĂSURĂTORI PUTERE', m8d: 'ATENUARE ȘI\nPUTERE OPTICĂ',
      m9t: 'SETĂRI', m9d: 'CONFIGURARE\nAPLICAȚIE',
      tffbauDesc: 'CONSTRUCȚIE CANALIZAȚII TELECOM\nCONDUCTE DE FIBRĂ OPTICĂ',
      slogan: 'Conectăm lumea\ncu posibilități mai bune'
    },
    tr: {
      flag: '🇹🇷', language: 'DİL', subtitle: 'ANA MENÜ / KONTROL PANELİ',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'AKTİF', gpsNone: 'YOK', pdfReady: 'HAZIR', pdfNone: 'YOK',
      m1t: 'ANA HAT HK', m1d: 'FİBER\nÜFLEME',
      m2t: 'HKA BAĞLANTILARI', m2d: 'BİNALARA\nFİBER ÜFLEME',
      m3t: 'MUFA EKLERİ', m3d: 'ABONE\nEKLERİ',
      m4t: 'POP EKLERİ', m4d: 'OMURGA\nEKLERİ',
      m5t: 'PROTOKOLLER', m5d: 'DOKÜMANTASYON\nVE RAPORLAR',
      m6t: 'QGIS PROJELERİ', m6d: 'AĞ HARİTALARI\nVE KONUMLARI',
      m7t: 'OTDR ÖLÇÜMLERİ', m7d: 'FİBER\nREFLEKTOMETRİSİ',
      m8t: 'GÜÇ ÖLÇÜMLERİ', m8d: 'ZAYIFLAMA VE\nOPTİK GÜÇ',
      m9t: 'AYARLAR', m9d: 'UYGULAMA\nYAPILANDIRMASI',
      tffbauDesc: 'TELEKOM KANALİZASYONU İNŞAATI\nFİBER OPTİK BORU HATLARI',
      slogan: 'Dünyayı daha iyi\nolanaklarla bağlıyoruz'
    },
    it: {
      flag: '🇮🇹', language: 'LINGUA', subtitle: 'MENU PRINCIPALE / PANNELLO DI CONTROLLO',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'ATTIVO', gpsNone: 'ASSENTE', pdfReady: 'PRONTO', pdfNone: 'ASSENTE',
      m1t: 'DORSALE HK', m1d: 'SOFFIAGGIO\nFIBRA OTTICA',
      m2t: 'COLLEGAMENTI HKA', m2d: 'SOFFIAGGIO VERSO\nGLI EDIFICI',
      m3t: 'GIUNZIONE MUFFOLE', m3d: 'GIUNTI\nABBONATO',
      m4t: 'GIUNZIONE POP', m4d: 'GIUNTI\nDORSALE',
      m5t: 'PROTOCOLLI', m5d: 'DOCUMENTAZIONE\nE RAPPORTI',
      m6t: 'PROGETTI QGIS', m6d: 'MAPPE E POSIZIONI\nRETE',
      m7t: 'MISURE OTDR', m7d: 'RIFLETTOMETRIA\nFIBRA',
      m8t: 'MISURE DI POTENZA', m8d: 'ATTENUAZIONE E\nPOTENZA OTTICA',
      m9t: 'IMPOSTAZIONI', m9d: 'CONFIGURAZIONE\nAPP',
      tffbauDesc: 'COSTRUZIONE DI CANALIZZAZIONI TLC\nCONDOTTE IN FIBRA OTTICA',
      slogan: 'Colleghiamo il mondo\ncon possibilità migliori'
    },
    nl: {
      flag: '🇳🇱', language: 'TAAL', subtitle: 'HOOFDMENU / BEDIENINGSPANEEL',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'ACTIEF', gpsNone: 'ONTBREEKT', pdfReady: 'GEREED', pdfNone: 'ONTBREEKT',
      m1t: 'HOOFDTRACÉ HK', m1d: 'GLASVEZEL\nINBLAZEN',
      m2t: 'HKA-AANSLUITINGEN', m2d: 'INBLAZEN NAAR\nGEBOUWEN',
      m3t: 'LASSEN VAN MOFFEN', m3d: 'ABONNEE-\nLASSEN',
      m4t: 'POP-LASSEN', m4d: 'BACKBONE-\nLASSEN',
      m5t: 'PROTOCOLLEN', m5d: 'DOCUMENTATIE\nEN RAPPORTEN',
      m6t: 'QGIS-PROJECTEN', m6d: 'NETWERKKAARTEN\nEN LOCATIES',
      m7t: 'OTDR-METINGEN', m7d: 'GLASVEZEL-\nREFLECTOMETRIE',
      m8t: 'VERMOGENSMETINGEN', m8d: 'DEMPING EN\nOPTISCH VERMOGEN',
      m9t: 'INSTELLINGEN', m9d: 'APP-\nCONFIGURATIE',
      tffbauDesc: 'AANLEG VAN TELECOMKANALISATIE\nGLASVEZELBUISSYSTEMEN',
      slogan: 'Wij verbinden de wereld\nmet betere mogelijkheden'
    },
    uk: {
      flag: '🇺🇦', language: 'МОВА', subtitle: 'ГОЛОВНЕ МЕНЮ / ПАНЕЛЬ КЕРУВАННЯ',
      online: 'ONLINE', offline: 'OFFLINE', gpsActive: 'АКТИВНИЙ', gpsNone: 'НЕМАЄ', pdfReady: 'ГОТОВИЙ', pdfNone: 'НЕМАЄ',
      m1t: 'МАГІСТРАЛЬ HK', m1d: 'ЗАДУВАННЯ\nОПТОВОЛОКНА',
      m2t: 'ПІДКЛЮЧЕННЯ HKA', m2d: 'ЗАДУВАННЯ\nДО ОБ’ЄКТІВ',
      m3t: 'ЗВАРЮВАННЯ МУФТ', m3d: 'АБОНЕНТСЬКІ\nЗВАРЮВАННЯ',
      m4t: 'ЗВАРЮВАННЯ POP', m4d: 'МАГІСТРАЛЬНІ\nЗВАРЮВАННЯ',
      m5t: 'ПРОТОКОЛИ', m5d: 'ДОКУМЕНТАЦІЯ\nТА ЗВІТИ',
      m6t: 'ПРОЄКТИ QGIS', m6d: 'КАРТИ ТА ЛОКАЦІЇ\nМЕРЕЖІ',
      m7t: 'ВИМІРЮВАННЯ OTDR', m7d: 'РЕФЛЕКТОМЕТРІЯ\nОПТОВОЛОКНА',
      m8t: 'ВИМІРЮВАННЯ ПОТУЖНОСТІ', m8d: 'ЗАГАСАННЯ ТА\nОПТИЧНА ПОТУЖНІСТЬ',
      m9t: 'НАЛАШТУВАННЯ', m9d: 'КОНФІГУРАЦІЯ\nЗАСТОСУНКУ',
      tffbauDesc: 'БУДІВНИЦТВО ТЕЛЕКОМ-КАНАЛІЗАЦІЇ\nОПТОВОЛОКОННІ ТРУБОПРОВОДИ',
      slogan: 'Поєднуємо світ\nкращими можливостями'
    }
  };

  const languageSelect = document.getElementById('languageSelect');
  const languageFlag = document.getElementById('languageFlag');
  const onlineStatus = document.getElementById('onlineStatus');
  const gpsStatus = document.getElementById('gpsStatus');
  const pdfStatus = document.getElementById('pdfStatus');

  const state = {
    lang: 'pl',
    online: false,
    gps: false,
    pdfReady: localStorage.getItem('crm.pdf.ready') === '1'
  };

  const fitStage = () => {
    const availableWidth = Math.max(1, document.documentElement.clientWidth);
    const scale = availableWidth / STAGE_WIDTH;
    document.documentElement.style.setProperty('--stage-scale', String(scale));
    viewport.style.height = `${STAGE_HEIGHT * scale}px`;
    stage.dataset.scale = scale.toFixed(6);
  };

  const setMultiline = (element, value) => {
    if (!element) return;
    element.innerHTML = String(value).split('\n').map(line => line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('<br>');
  };

  const updateStatusText = () => {
    const t = translations[state.lang] || translations.pl;
    const onlineLabel = document.querySelector('[data-status-label="online"]');
    const gpsLabel = document.querySelector('[data-status-label="gps"]');
    const pdfLabel = document.querySelector('[data-status-label="pdf"]');
    if (onlineLabel) onlineLabel.textContent = state.online ? t.online : t.offline;
    if (gpsLabel) gpsLabel.textContent = state.gps ? t.gpsActive : t.gpsNone;
    if (pdfLabel) pdfLabel.textContent = state.pdfReady ? t.pdfReady : t.pdfNone;
  };

  const applyLanguage = (lang, persist = true) => {
    if (!translations[lang]) lang = 'pl';
    state.lang = lang;
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(t, key)) setMultiline(element, t[key]);
    });
    if (languageSelect) languageSelect.value = lang;
    if (languageFlag) languageFlag.textContent = t.flag;
    updateStatusText();
    if (persist) localStorage.setItem('crm.language', lang);
    window.dispatchEvent(new CustomEvent('crm:languagechange', { detail: { lang } }));
  };

  const setOnline = (value) => {
    state.online = Boolean(value);
    onlineStatus?.classList.toggle('status-on', state.online);
    onlineStatus?.classList.toggle('status-off', !state.online);
    onlineStatus?.classList.toggle('online', state.online);
    updateStatusText();
  };

  const setGps = (value) => {
    state.gps = Boolean(value);
    gpsStatus?.classList.toggle('status-off', !state.gps);
    gpsStatus?.classList.toggle('gps-active', state.gps);
    updateStatusText();
  };

  const setPdfReady = (value) => {
    state.pdfReady = Boolean(value);
    pdfStatus?.classList.toggle('status-off', !state.pdfReady);
    pdfStatus?.classList.toggle('pdf-ready', state.pdfReady);
    localStorage.setItem('crm.pdf.ready', state.pdfReady ? '1' : '0');
    updateStatusText();
    window.dispatchEvent(new CustomEvent('crm:pdfstatus', { detail: { ready: state.pdfReady } }));
  };

  const verifyInternet = async () => {
    if (!navigator.onLine) {
      setOnline(false);
      return;
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(repoHealthUrl(), {
        method: 'HEAD',
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller.signal
      });
      setOnline(response.ok);
    } catch (_) {
      setOnline(false);
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const startGpsWatch = () => {
    if (!('geolocation' in navigator)) {
      setGps(false);
      return;
    }
    navigator.geolocation.watchPosition(
      (position) => {
        const accuracy = Number(position?.coords?.accuracy);
        setGps(Number.isFinite(accuracy) && accuracy <= GPS_ACCURACY_LIMIT_METERS);
        document.documentElement.dataset.gpsAccuracy = Number.isFinite(accuracy) ? accuracy.toFixed(1) : 'unknown';
      },
      () => setGps(false),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  };

  const wireTiles = () => {
    document.querySelectorAll('.tile-live').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.add('pressed');
        window.setTimeout(() => button.classList.remove('pressed'), 180);
        if (navigator.vibrate) navigator.vibrate(35);
        const moduleName = button.dataset.module || 'module';
        history.replaceState(null, '', `#${moduleName}`);
        window.dispatchEvent(new CustomEvent('crm:modulepress', { detail: { module: moduleName } }));
      });
    });
  };

  fitStage();
  window.addEventListener('resize', fitStage, { passive: true });
  window.addEventListener('orientationchange', fitStage, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fitStage, { passive: true });

  const savedLanguage = localStorage.getItem('crm.language');
  applyLanguage(savedLanguage && translations[savedLanguage] ? savedLanguage : 'pl', false);
  setPdfReady(state.pdfReady);
  setOnline(false);
  setGps(false);
  wireTiles();

  languageSelect?.addEventListener('change', (event) => applyLanguage(event.target.value));
  window.addEventListener('online', verifyInternet, { passive: true });
  window.addEventListener('offline', () => setOnline(false), { passive: true });
  window.addEventListener('storage', (event) => {
    if (event.key === 'crm.language' && event.newValue && translations[event.newValue]) applyLanguage(event.newValue, false);
    if (event.key === 'crm.pdf.ready') setPdfReady(event.newValue === '1');
  });

  verifyInternet();
  window.setInterval(verifyInternet, 30000);
  startGpsWatch();

  window.CRMLanguage = Object.freeze({
    get: () => state.lang,
    set: (lang) => applyLanguage(lang),
    available: () => Object.keys(translations)
  });

  window.CRMStatus = Object.freeze({
    get: () => ({ online: state.online, gps: state.gps, pdfReady: state.pdfReady }),
    setPdfReady
  });

  document.documentElement.dataset.appReady = 'true';
  document.documentElement.dataset.screen = 'MENU_GLOWNE_01_TEST';
})();
