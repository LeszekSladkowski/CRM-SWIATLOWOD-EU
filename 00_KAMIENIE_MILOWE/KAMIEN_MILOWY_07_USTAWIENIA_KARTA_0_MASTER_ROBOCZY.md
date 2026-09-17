# ŚWIĘTY KAMIEŃ MILOWY 07 — USTAWIENIA KARTA 0 / MASTER ROBOCZY

Status: ZAMROŻONY ROBOCZO po pozytywnym teście użytkownika na Samsung Galaxy S24 Ultra.

## Punkt odniesienia
- Commit testowany: `3f0ce971cafc95d5a4fc5250b81c00be69cb6403`
- Gałąź zamrożona: `MASTER-ROBOCZY-USTAWIENIA-KARTA-0-CHIRURGIA-02`
- Ekran: `settings.html`
- Metoda: pełny MASTER 1:1 jako jedna nienaruszona warstwa wizualna + minimalna warstwa LIVE.

## Bezwzględnie obowiązujące zasady tego etapu
1. Nie składać KARTY 0 z regenerowanych warstw BASE/MEDIA/UI, jeśli powoduje to różnice względem zatwierdzonego MASTER-a.
2. Pełny MASTER pozostaje nadrzędnym źródłem geometrii i wyglądu.
3. LIVE pozostają tylko elementy wymagające rzeczywistej funkcji: data, godzina, ONLINE/OFFLINE, SYNCHRONIZUJ oraz aktywne hitboxy WRÓĆ, KARTA 1–4 i PULPIT.
4. Przycisk SYNCHRONIZUJ zachowuje zatwierdzony standard: zielony, idealnie okrągły, animacja zgodnie z ruchem wskazówek zegara tylko podczas synchronizacji.
5. KARTA 1–4 prowadzą do istniejącego silnika ustawień; nie zmieniać ich działania bez osobnego testu i zatwierdzenia.
6. Każda dalsza zmiana wymaga zasady: jedna zmiana → deploy → test S24 Ultra → zatwierdzenie → zamrożenie.

Ten punkt jest obowiązującym bezpiecznym punktem powrotu dla dalszej budowy gałęzi USTAWIENIA.
