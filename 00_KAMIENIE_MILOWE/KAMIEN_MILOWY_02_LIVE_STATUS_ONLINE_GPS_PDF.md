# KAMIEŃ MILOWY 02 — LIVE STATUS ONLINE / GPS / PDF

Status: **ZAMROŻONY / OBOWIĄZUJĄCY**

Projekt: **CRM ŚWIATŁOWÓD EU**

## Zasada nadrzędna
Kontrolki ONLINE, GPS i PDF nie mogą być wypalone w żadnej grafice PNG. Są osobnymi komponentami LIVE sterowanymi przez kod i zawsze pokazują rzeczywisty stan aplikacji / telefonu / CRM.

## 1. ONLINE
- **ONLINE** — kontrolka świeci na zielono tylko wtedy, gdy aplikacja ma faktyczny dostęp do Internetu.
- **OFFLINE** — kontrolka świeci na czerwono, gdy Internetu nie ma.
- Nie wystarcza samo połączenie z Wi‑Fi; należy sprawdzać realną dostępność Internetu.

## 2. GPS
- **GPS AKTYWNY** — kontrolka świeci na żółto, gdy aplikacja otrzymuje świeżą lokalizację z telefonu o zaakceptowanej dokładności.
- **GPS BRAK** — kontrolka świeci na czerwono, gdy lokalizacja jest niedostępna, wyłączona, użytkownik nie udzielił zgody, wystąpił timeout lub dokładność jest zbyt słaba.
- Aplikacja webowa nie może udawać liczby satelitów ani siły sygnału satelitarnego, jeśli przeglądarka takich danych nie udostępnia. Stan ustalamy na podstawie rzeczywistej dostępności i jakości pozycji.

## 3. PDF
- **PDF GOTOWY** — kontrolka świeci na niebiesko, gdy dowolna gałąź całego CRM poprawnie wygenerowała dokument PDF z wyników pracy.
- **PDF BRAK** — kontrolka świeci na czerwono, gdy żadna gałąź CRM nie ma aktualnie wygenerowanego PDF.
- Wszystkie gałęzie korzystają z jednego wspólnego centralnego stanu `PDF STATUS`.

## 4. Architektura
- ONLINE, GPS i PDF mają własne niezależne stany i logikę.
- Kolory i opisy zmieniają się dynamicznie.
- Grafika MASTER może zawierać wyłącznie stałą ramkę / miejsce wizualne dla kontrolek.
- Lampki, opisy i logika stanu są elementami LIVE tworzonymi w kodzie.
- Teksty tych kontrolek również podlegają centralnemu systemowi 12 języków.

## 5. Stany obowiązujące
| Moduł | Stan aktywny | Kolor | Stan braku | Kolor |
|---|---|---|---|---|
| ONLINE | ONLINE | zielony | OFFLINE | czerwony |
| GPS | GPS AKTYWNY | żółty | GPS BRAK | czerwony |
| PDF | PDF GOTOWY | niebieski | PDF BRAK | czerwony |

## 6. Zasada testów
Każda zmiana dotycząca tych kontrolek wymaga testu na referencyjnym Samsung Galaxy S24 Ultra przed nadaniem statusu MASTER.

Ten dokument jest obowiązującym kamieniem milowym projektu. Nie wolno zmieniać powyższej logiki bez wyraźnej nowej decyzji użytkownika.
