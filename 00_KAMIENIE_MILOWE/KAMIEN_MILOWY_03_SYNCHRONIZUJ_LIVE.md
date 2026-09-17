# ŚWIĘTY KAMIEŃ MILOWY 03 — PRZYCISK SYNCHRONIZUJ LIVE

Status: **BEZWZGLĘDNIE I BEZAPELACYJNIE OBOWIĄZUJĄCY W CAŁYM CRM ŚWIATŁOWÓD EU**

## 1. Jeden wzorzec w całym CRM
- Przycisk `SYNCHRONIZUJ` ma zawsze ten sam wygląd i zachowanie we wszystkich gałęziach, kartach i modułach.
- Nie tworzymy lokalnych wariantów tego przycisku.

## 2. Wygląd
- Przycisk jest **idealnie okrągły**.
- Kolor przycisku i jego aktywnego obrysu/glow jest **zielony**.
- Wewnątrz znajdują się **dwie strzałki synchronizacji**.
- Pod przyciskiem znajduje się napis `SYNCHRONIZUJ` jako tekst LIVE, podlegający centralnemu systemowi tłumaczeń.

## 3. Stan spoczynku
- Zielony okrągły przycisk pozostaje widoczny.
- Strzałki synchronizacji są nieruchome.
- Brak animacji oznacza, że aktualnie nie trwa synchronizacja.

## 4. Stan aktywnej synchronizacji
- Po rozpoczęciu aktualizacji/synchronizacji strzałki wewnątrz przycisku rozpoczynają płynną animację obrotową.
- Kierunek obrotu: **zgodnie z ruchem wskazówek zegara**.
- Animacja trwa nieprzerwanie przez cały rzeczywisty czas procesu synchronizacji.
- Nie stosujemy sztucznego czasu animacji niezależnego od procesu.

## 5. Zakończenie procesu
- Po poprawnym zakończeniu synchronizacji animacja zatrzymuje się i przycisk wraca do stanu spoczynku.
- Po błędzie synchronizacji animacja również musi się zatrzymać; system ma zwrócić informację o błędzie bez zmiany stałego wzorca graficznego przycisku.

## 6. Zasada techniczna
- Funkcja przycisku i animacja są realizowane **LIVE w kodzie**.
- Przycisk nie może być funkcjonalnie „wypalony” w statycznym PNG.
- Warstwa graficzna może definiować styl wizualny, ale kliknięcie, stan procesu, obrót strzałek, blokada wielokrotnego startu i wynik synchronizacji muszą być sterowane logiką aplikacji.

## 7. Zasada działania
Kliknięcie `SYNCHRONIZUJ` uruchamia właściwy dla danego modułu proces aktualizacji danych. Od startu procesu do jego zakończenia komponent pokazuje rzeczywisty stan pracy przez obracające się strzałki.

## 8. Nienaruszalność
Każda przyszła implementacja przycisku `SYNCHRONIZUJ` w CRM ŚWIATŁOWÓD EU musi być zgodna z tym kamieniem milowym. Zmiana standardu wymaga wyraźnej, jednoznacznej decyzji właściciela projektu.
