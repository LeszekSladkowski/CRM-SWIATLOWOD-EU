# ŚWIĘTY KAMIEŃ MILOWY 04 — STANDARD 5 FOLDERÓW GRAFIK

Status: ZAMROŻONY / BEZWZGLĘDNIE OBOWIĄZUJĄCY W CAŁYM CRM ŚWIATŁOWÓD EU.

## Zasada nadrzędna
Każda karta CRM przechodzi zawsze przez dokładnie ten sam układ 5 folderów. Nie zmieniamy znaczenia folderów między kartami. Nie przenosimy elementów według uznania.

## FOLDER 1 — 01_GRAFIKI_KART_WEJSCIOWE
**TU TRAFIA TYLKO PEŁNY, ZATWIERDZONY MASTER ŹRÓDŁOWY 1:1.**
To jest grafika referencyjna użytkownika przed rozkładem. Nie jest warstwą produkcyjną aplikacji.

## FOLDER 2 — 02_TLO_MASTER
**BASE / TŁO.**
Tylko statyczne tło pełnego płótna: tekstura, kolor, nieruchome światła i dekoracje tła. Bez urządzeń, bez tekstów, bez statusów, bez przycisków i bez elementów LIVE.

## FOLDER 3 — 03_MEDIA_URZADZENIA
**MEDIA / URZĄDZENIA.**
Tylko obiekty wizualne: maszyny, mierniki, urządzenia, zdjęcia, clipboard, QGIS, pojazdy, elementy banera itp. Pełne płótno i pozycje 1:1. Bez tekstów, ramek i logiki LIVE.

## FOLDER 4 — 04_RAMKI_IKONY_UI
**STATYCZNE UI.**
Logo, ramki, obrysy, separatory, nieruchome ozdobne ikony i grafika przycisków. Bez treści zależnych od języka i bez dynamicznych stanów. ONLINE/GPS/PDF, język oraz animacja SYNCHRONIZUJ pozostają LIVE w kodzie.

## FOLDER 5 — 05_MASTER_REFERENCJA
**MASTER TECHNICZNY X/Y/W/H.**
Pełna zatwierdzona karta z mapą współrzędnych, origin X=0/Y=0, numeracją bloków, wymiarami X/Y/W/H oraz oznaczeniem obszarów LIVE. Jest dokumentacją techniczną i nie jest warstwą wyświetlaną w aplikacji.

## WARSTWA LIVE — NIE JEST SZÓSTYM FOLDEREM GRAFICZNYM
LIVE realizujemy w kodzie nad warstwami graficznymi. Obejmuje w szczególności:
- wszystkie teksty i tłumaczenia 12 języków,
- przełącznik języka: flaga + nazwa języka,
- ONLINE / OFFLINE,
- GPS AKTYWNY / GPS BRAK,
- PDF GOTOWY / PDF BRAK,
- przycisk SYNCHRONIZUJ i obrót strzałek podczas rzeczywistego procesu,
- hitboxy i aktywne strefy dotykowe kafli, guzików i strzałek,
- wszystkie przyszłe stany dynamiczne.

## STANDARD NAZW PLIKÓW
Dla każdej karty stosujemy nazwę logiczną, np. `01_MENU_GLOWNE`:
- F1: `01_MENU_GLOWNE_MASTER_WEJSCIOWY.png`
- F2: `01_MENU_GLOWNE_TLO_MASTER.png`
- F3: `01_MENU_GLOWNE_MEDIA_URZADZENIA.png`
- F4: `01_MENU_GLOWNE_RAMKI_IKONY_UI.png`
- F5: `01_MENU_GLOWNE_MASTER_REFERENCJA.png`

## TRYB PRACY
MASTER 5 FOLDERÓW — TRYB 1:1 — TYLKO CIĘCIE — KONTROLA 1:1 — bez redesignu, bez samowolnych przesunięć i bez wypalania elementów LIVE w PNG.

Każde odstępstwo wymaga wyraźnej decyzji użytkownika.