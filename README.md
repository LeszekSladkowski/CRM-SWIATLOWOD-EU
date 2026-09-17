# CRM ŚWIATŁOWÓD EU

Nowe, czyste repozytorium projektu **CRM ŚWIATŁOWÓD EU**.

## Status

**PUNKT 0 — CZYSTY FUNDAMENT — KANDYDAT DO TESTU**

Ten stan nie jest jeszcze MASTER-em. MASTER powstaje dopiero po pozytywnym teście użytkownika na Samsung Galaxy S24 Ultra.

## Bezwzględne zasady projektu

- urządzenie referencyjne: Samsung Galaxy S24 Ultra, pion;
- płótno projektowe każdej karty: **1440 × 3120 px**;
- origin: **X=0 / Y=0** w lewym górnym rogu;
- brak poziomego scrolla;
- pionowe przewijanie dozwolone;
- pinch-to-zoom ma pozostać dostępny;
- skaluje się wyłącznie cały `design-stage`, nigdy pojedyncze warstwy MASTER;
- jedna zmiana naraz: **wdrożenie → test telefonu → akceptacja → MASTER/zamrożenie → kolejny element**;
- żadnych poprawek „przy okazji”;
- stare repozytoria są wyłącznie archiwum i nie są źródłem kodu bez wyraźnej decyzji.

## Fundament techniczny

Aplikacja jest celowo minimalna: czysty HTML, CSS i JavaScript bez frameworków, bibliotek zewnętrznych, cache/service workera i starych zależności. Dzięki temu każdy kolejny element będzie dokładany świadomie i testowany osobno.

## Struktura startowa

- `index.html` — wejście aplikacji;
- `styles.css` — geometria i skalowanie płótna;
- `app.js` — dopasowanie całego płótna 1440×3120 do szerokości ekranu;
- `manifest.webmanifest` — podstawowe dane aplikacji;
- `assets/cards/` — przyszłe zatwierdzone grafiki kart;
- `.github/workflows/pages.yml` — wdrożenie GitHub Pages.
