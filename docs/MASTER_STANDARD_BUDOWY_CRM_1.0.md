# MASTER STANDARD BUDOWY CRM 1.0

Status: **MASTER — ZATWIERDZONY 22.09.2026**

Ten dokument jest nadrzędnym, uniwersalnym standardem budowy CRM. Zasady branżowe są modułami i nie mogą naruszać CORE.

## KM-00 — CZYSTY FUNDAMENT I PUNKT POWROTU
Każdy CRM zaczyna się od minimalnego, działającego repozytorium. Po wdrożeniu: **WDROŻENIE → TEST NA URZĄDZENIU → AKCEPTACJA → MASTER PUNKT 0 → ZAMROŻENIE**. Punkt 0 nie jest gałęzią rozwojową.

## KM-01 — GEOMETRIA, DOPASOWANIE, ZOOM I PRZEWIJANIE
Jedno urządzenie referencyjne, jedno płótno i jeden układ współrzędnych. Dla CRM ŚWIATŁOWÓD EU: Samsung Galaxy S24 Ultra, pion, **1440×3120 px**, origin **X=0/Y=0**. Skalowany jest wyłącznie cały design-stage.

Karta po otwarciu ma być proporcjonalnie dopasowana w całości do ekranu. Nie wolno wymuszać scrollowania błędną geometrią. **Pinch-to-zoom jest obowiązkowy**; po świadomym powiększeniu użytkownik może przesuwać widok pionowo i poziomo. Dynamicznie rosnące tabele, listy, historie i protokoły mogą mieć naturalny scroll pionowy.

Zakazane: crop, trim, niezależne skalowanie/przesuwanie warstw i zmiana ich wzajemnych współrzędnych.

## KM-02 — MASTER JEST WZORCEM
Grafika MASTER definiuje wygląd, proporcje i geometrię X/Y/W/H. MASTER REFERENCJA nie jest produkcyjną warstwą runtime i nie służy do późniejszego maskowania elementów.

## KM-03 — ROZBIÓR MASTER 4× CLEAN/LIVE
Obowiązuje jedna komenda:

**MASTER 4× CLEAN/LIVE — ROZBIÓR 1:1 — 1440×3120 RGBA — X0/Y0 LOCK — TYLKO SEPARACJA — LIVE REMOVE AT SOURCE — ZERO MASK/OVERLAY/PATCH — 01 TŁO + 02 MEDIA + 03 UI STATIC + 04 MASTER REFERENCJA X/Y/W/H — PIXEL 1:1 CONTROL — STOP**

Rezultaty rozbioru:
1. `01_TLO_MASTER` — czyste statyczne tło, pełne 1440×3120 RGBA.
2. `02_MEDIA_URZADZENIA` — wyłącznie statyczne media/urządzenia, pełne 1440×3120 RGBA.
3. `03_RAMKI_IKONY_UI` — wyłącznie rzeczywiście statyczne UI, pełne 1440×3120 RGBA.
4. `04_MASTER_REFERENCJA` — nienaruszony MASTER techniczny oraz mapa `NR / ELEMENT / TYP / X / Y / W / H / STATIC-LIVE`. Nie jest używany w runtime.

Źródłem rozbioru jest wyłącznie zatwierdzony MASTER. Tryb 1:1 oznacza separację, nie przeprojektowywanie ani generowanie podobnej grafiki.

## KM-04 — LIVE REMOVE AT SOURCE
Każdy element zmienny, aktywny, klikalny, reagujący na użytkownika, pokazujący stan/dane lub zależny od centralnego silnika jest klasyfikowany jako LIVE. Jego X/Y/W/H zapisujemy w MASTER REFERENCJA, ale sam element **nie trafia do 01, 02 ani 03**.

Dotyczy m.in.: ONLINE, GPS AKTYWNY, PDF GOTOWY, SYNCHRONIZUJ, POWRÓT, aktywnych przycisków, pól formularzy, liczników, statusów, aktywnych pasków/wskaźników, tekstów zależnych od języka, dynamicznych tabel i animacji.

Obszar pod LIVE musi być właściwym czystym tłem, a nie kopią elementu przeznaczoną do późniejszego przykrycia.

## KM-05 — ZERO ŁATEK / ZERO MASKOWANIA
Bezwzględnie zakazane: czarne/kolorowe maski, repaint, zakrywanie tekstów, wypalony LIVE + drugi LIVE, stary przycisk przykryty nowym, overlay do ukrywania błędu, CSS użyty wyłącznie do zamaskowania błędnej grafiki oraz łańcuch „łatka na łatkę”.

**BŁĄD ŹRÓDŁA → WRACAMY DO ŹRÓDŁA → POPRAWIAMY → KONTROLA → WDROŻENIE.**

## KM-06 — JEDEN CENTRALNY SILNIK CRM
Każda wspólna funkcja posiada dokładnie jedno źródło wykonawcze. Karty i gałęzie korzystają z CORE; nie tworzą własnych kopii silników języka, nawigacji, statusów, synchronizacji itd.

## KM-07 — SINGLE SOURCE OF TRUTH
Każdy globalny stan istnieje raz. Język, ONLINE, GPS, PDF i inne globalne dane mają jedno źródło stanu i wiele widoków. Zakazane są równoległe kopie tego samego stanu dla poszczególnych kart.

## KM-08 — CENTRALNY SYSTEM JĘZYKOWY — MASTER LOCK 12 JĘZYKÓW
**Status: ŚWIĘTA ZASADA / MASTER LOCK — zatwierdzone przez użytkownika 22.09.2026.**

Cały CRM korzysta z **jednego centralnego silnika językowego** i dokładnie **12 zatwierdzonych języków**:
1. polski — `pl`
2. angielski — `en`
3. czeski — `cs`
4. duński — `da`
5. niemiecki — `de`
6. norweski — `no`
7. francuski — `fr`
8. rumuński — `ro`
9. turecki — `tr`
10. włoski — `it`
11. holenderski — `nl`
12. ukraiński — `uk`

**Zasada wykonawcza: 1 CRM → 1 centralny silnik językowy → 12 języków → 1 globalnie wybrany język dla całej aplikacji.**

Zmiana języka ma obowiązywać globalnie we wszystkich kartach, gałęziach, formularzach, tabelach, komunikatach, przyciskach, protokołach i ustawieniach. Teksty zależne od języka są LIVE i nie mogą być wypalane w produkcyjnych PNG. Nie tworzymy osobnych silników językowych dla kart ani 12 graficznych kopii tej samej karty. Wybrany język ma być przechowywany jako jeden globalny stan i zachowany po ponownym uruchomieniu aplikacji.

**Lista 12 języków jest zamrożona. Nie wolno jej dodawać, usuwać, zamieniać, zmieniać kolejności ani zastępować bez nowej, jednoznacznej decyzji użytkownika znoszącej ten MASTER LOCK.**

## KM-09 — CENTRALNE KONTROLKI LIVE
Stała kolejność: **ONLINE → GPS AKTYWNY → PDF GOTOWY**. ONLINE odzwierciedla rzeczywistą łączność, GPS rzeczywistą dostępność lokalizacji, a PDF GOTOWY globalny rzeczywisty stan dokumentów. Kontrolki są LIVE i korzystają z centralnego silnika.

## KM-10 — JEDNA NAWIGACJA I WSPÓLNE KOMPONENTY
POWRÓT, SYNCHRONIZUJ i inne wspólne komponenty mają jedną implementację i jedną logikę. Aktualizacja wspólnego komponentu następuje w jednym źródle, a nie osobno na kartach.

## KM-11 — STRUKTURA KART
KARTA 0 jest ekranem wejściowym/spisem treści gałęzi. Następne karty: 1→n. Każda karta ma jednoznaczny identyfikator niezależny od widocznej nazwy.

## KM-12 — JEDNA ZMIANA = JEDEN CYKL
**JEDNA ZMIANA → KONTROLA → WDROŻENIE → TEST → AKCEPTACJA → MASTER → ZAMROŻENIE → NASTĘPNA ZMIANA.**

Zakaz poprawek „przy okazji”. Inny wykryty problem staje się następnym zadaniem.

## KM-13 — MASTER NADAJE UŻYTKOWNIK
Commit ani deployment nie oznacza MASTER. MASTER powstaje dopiero po teście na urządzeniu referencyjnym i wyraźnej akceptacji użytkownika.

## KM-14 — MASTER = JEDNOZNACZNY PUNKT POWROTU
Zatwierdzony etap otrzymuje identyfikator, commit, zakres i datę akceptacji. Nie zgadujemy później, który historyczny commit był prawidłowy.

## KM-15 — ARCHIWUM NIE JEST ŹRÓDŁEM KODU
Stare repozytoria są dokumentacją/referencją. Kod można z nich przenieść wyłącznie po świadomej decyzji i kontroli. Nie wolno automatycznie importować starych zależności ani łatek.

## KM-16 — PRE-DEPLOY SURGERY
Komenda kontrolna:

**PRE-DEPLOY SURGERY — 1 CHANGE ONLY — MASTER GEOMETRY LOCK — STATIC/LIVE CHECK — SINGLE ENGINE CHECK — ZERO PATCH/MASK/DUPLICATE — REFERENCES CHECK — DEPLOY OR STOP**

Wymagane: 0 martwych odwołań, 0 osieroconych plików związanych ze zmianą, 0 duplikatów logiki, 0 przypadkowych zmian MASTER, 0 masek/łatek, 0 przesunięć geometrii i 0 równoległych silników. Niepowodzenie dowolnej kontroli = STOP.

## KM-17 — MODUŁY BRANŻOWE
CORE CRM pozostaje uniwersalny. Funkcje specyficzne dla światłowodu, pelletu lub innej branży są modułami i nie mogą duplikować ani łamać mechanizmów CORE.

## KM-18 — ZASADA NADRZĘDNA
**JEDNO ŹRÓDŁO → JEDNA GEOMETRIA → JEDEN SILNIK → CZYSTE WARSTWY → PRAWDZIWE LIVE → JEDNA ZMIANA → JEDEN TEST → JEDEN MASTER.**

## KM-19 — MASTER VISUAL QA / KONTROLA ZGODNOŚCI 1:1
Dla każdej karty oryginalna, nienaruszona **GRAFIKA MASTER** musi być przechowywana jako nietykalne źródło porównawcze. Po złożeniu BUILD i zapisaniu go w GitHubie, ale **przed dopuszczeniem do testu użytkownika**, obowiązkowo wykonuje się kontrolę BUILD względem GRAFIKI MASTER.

Kontrola obejmuje: geometrię X/Y/W/H, proporcje, ostrość, jakość obrazów, tło, media, ramki/ikony, pozycję i rozmiar LIVE, teksty LIVE, hitboxy, kontrolki ONLINE/GPS/PDF, zachowanie widoku początkowego oraz brak masek, łatek, duplikatów i wypalonych LIVE w produkcyjnych STATIC.

Dla LIVE porównujemy pozycję, rozmiar, styl i geometrię; jego aktualna treść/stan ma wynikać z rzeczywistego centralnego stanu, a nie z poglądowego stanu narysowanego na MASTER.

**FAIL → STOP → naprawa właściwego źródła → ponowne QA. PASS → DEPLOY → test na urządzeniu → akceptacja → MASTER.**

## KM-20 — MASTER FILE LOCK / ZERO ZAUFANIA — PEŁNA KONTROLA
**Status: MASTER LOCK — obowiązkowa procedura dla każdej grafiki i każdej karty.**

Celem tej zasady jest wyeliminowanie pracy „na słowo”, na podglądzie, na pamięci lub na założeniu. **Każde PASS musi wynikać z pomiaru konkretnego fizycznego pliku. Brak pomiaru = NIEZWERYFIKOWANE, nigdy PASS.**

### A. Jedyny dopuszczalny MASTER źródłowy
Dla CRM ŚWIATŁOWÓD EU źródłowy MASTER karty musi być fizycznym plikiem **PNG 1440×3120 px**, zgodnym z ustalonym trybem produkcyjnym i geometrią **X0/Y0**. Screenshot, miniatura, podgląd aplikacji, JPEG ani obraz ponownie przesłany do czatu jako zdjęcie **nie zastępuje MASTER-a**.

### B. Bezpieczna droga pliku
Obowiązuje droga:
**PLIK ŹRÓDŁOWY → KONTROLA → POBRANE/FILES → BEZPOŚREDNI UPLOAD DO GITHUB `01_GRAFIKI_MASTER` → KONTROLA PO UPLOADZIE → LOCK.**

Zakazane jest używanie ponownie przesłanego do czatu zdjęcia jako źródła rozbioru lub jako dowodu wymiarów MASTER-a. Potwierdzony test z 22.09.2026 wykazał, że ścieżka obrazu w rozmowie może zwrócić przetworzoną wersję podglądową, podczas gdy bezpośredni upload oryginalnego pliku do GitHuba zachowuje plik.

### C. Kontrola przed rozbiorem
Przed jakąkolwiek operacją trzeba wskazać dokładny plik źródłowy i zweryfikować co najmniej: nazwę/ścieżkę, format, W×H oraz integralność/identyfikator pliku, gdy jest dostępny. Dla wymagania 1440×3120 każda inna geometria = **FAIL → STOP**.

Nie wolno deklarować „zgodne”, „1440×3120”, „MASTER”, „wgrane” ani „PASS” na podstawie wyglądu, przypuszczenia, nazwy pliku lub pamięci.

### D. Rozbiór wyłącznie z oryginału GitHub
Po LOCK źródłem rozbioru jest wyłącznie oryginalny MASTER z `01_GRAFIKI_MASTER`. Nie wolno zastępować go screenshotem, miniaturą, obrazem z galerii ani kopią ponownie przesłaną do rozmowy.

Rozbiór daje cztery logiczne rezultaty: **TŁO / MEDIA / UI STATIC / MASTER REFERENCJA X/Y/W/H**. Każda graficzna warstwa produkcyjna zachowuje pełne płótno **1440×3120, X0/Y0**. LIVE jest usuwane u źródła zgodnie z KM-04. Zakazane są maski, overlaye i łatki zgodnie z KM-05.

### E. Raport kontrolny widoczny dla użytkownika
Po każdym etapie obowiązuje krótki raport, aby użytkownik nie musiał ufać deklaracji bez dowodu:
**ŹRÓDŁO: PASS/FAIL/NIEZWERYFIKOWANE | TŁO: PASS/FAIL | MEDIA: PASS/FAIL | UI STATIC: PASS/FAIL | REFERENCJA: PASS/FAIL | REKONSTRUKCJA 1:1: PASS/FAIL.**

Jeżeli którakolwiek pozycja ma `FAIL` albo wymagana kontrola pozostaje `NIEZWERYFIKOWANE` — **STOP. Nie przechodzimy do następnego etapu.**

### F. Kontrola po GitHubie
Po zapisaniu wyników w GitHubie kontrolę wykonuje się ponownie na plikach znajdujących się w repozytorium. Dopiero po pozytywnym wyniku można przejść do rekonstrukcji i QA.

### G. Rekonstrukcja i porównanie 1:1
Warstwy są składane zgodnie z referencją X/Y/W/H i porównywane z oryginalną `GRAFIKA_MASTER`. Sprawdzane są co najmniej: płótno, geometria, pozycje, proporcje, ostrość, media, ramki/ikony, miejsca LIVE oraz brak masek, duplikatów i przesunięć.

**FAIL → STOP → powrót do właściwego źródła błędu. PASS → dopiero następny etap.**

### H. Zasada odpowiedzialności technicznej
Automatyzacja może wykonywać operacje techniczne, ale nie może ukrywać ich wyniku przed użytkownikiem. Użytkownik zawsze otrzymuje jednoznaczny status kontroli. Jeśli narzędzie nie pozwala fizycznie zweryfikować danego parametru, należy napisać **NIEZWERYFIKOWANE** zamiast zgadywać.

## Standard katalogu karty
Aby uniknąć konfliktu nazw, każda karta przechowuje nietykalny wzorzec oraz cztery rezultaty techniczne:
- `01_GRAFIKA_MASTER/` — oryginalny, nienaruszony wzorzec porównawczy;
- `02_TLO_MASTER/` — czyste tło;
- `03_MEDIA_URZADZENIA/` — statyczne media;
- `04_RAMKI_IKONY_UI/` — statyczne UI;
- `05_MASTER_REFERENCJA/` — techniczna mapa X/Y/W/H i klasyfikacja STATIC/LIVE.

Logiczny rozbiór pozostaje **4×**: TŁO + MEDIA + UI STATIC + MASTER REFERENCJA. `01_GRAFIKA_MASTER` jest dodatkowym, nietykalnym źródłem wejściowym i wzorcem QA, nie piątym podzespołem produkcyjnym.

---

### Święta zasada wykonawcza
**MASTER → FIZYCZNA WALIDACJA → GITHUB SOURCE LOCK → CZYSTY ROZBIÓR 1:1 → LIVE REMOVE AT SOURCE → KONTROLA 4× → STATIC + CENTRALNY LIVE → BUILD → MASTER VISUAL QA → DEPLOY → TEST → AKCEPTACJA → MASTER.**
