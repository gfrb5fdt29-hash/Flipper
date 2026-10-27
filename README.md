# Nebula Flipper

Űrtémájú flipperjáték iPhone-ra (és bármilyen böngészőre), a régi windowsos flipper hangulatában. Egyetlen HTML-fájl, telepítés nélkül fut Safariban, és a Főképernyőre téve teljes képernyős appként indul.

A játék saját készítésű: a pálya, a grafika és a hangok mind itt készültek, a Microsoft játékából nem tartalmaz semmit.

## Irányítás

| Mit | Telefonon | Billentyűzeten |
| --- | --- | --- |
| Bal flipper | a képernyő bal felének érintése | Z vagy ← |
| Jobb flipper | a képernyő jobb felének érintése | M vagy → |
| Golyó indítása | tartsd nyomva a jobb oldalt, majd engedd el (minél tovább, annál erősebb) | szóköz vagy ↓ |
| Szünet | a bal felső gomb | P vagy Esc |

Két ujjal egyszerre mindkét flipper használható.

## A pálya

- **Felső sávok (3 csillag):** ha mindhármat kigyújtod, nő a bónuszszorzó (legfeljebb 5×). A flipperekkel a kigyújtott fények áttolhatók a sávok között.
- **Bumperek:** a három rózsaszín lökhárító pontot ad és pörgeti a golyót.
- **Aszteroidák:** a jobb oldali három ejtőcélpont. Ha mind leesik, nagy pontot kapsz, és a sor újraáll.
- **Orbit:** a bal oldali folyosó. Felfelé belőve számít találatnak.
- **Fekete lyuk:** elnyeli, majd kilövi a golyót. Minden harmadik elnyelés **multiballt** indít: 3 golyó egyszerre a pályán.
- **Golyómentés:** indítás után néhány másodpercig a leeső golyó visszajön (a MENTÉS fény jelzi).

## Küldetések és rangok

A kijelző időnként mutatja az aktuális küldetést (pl. `> ORBIT 1/2`), a pályán pedig villogó nyíl jelzi, hová kell lőni. Minden teljesített küldetés előléptetést és pontot ad: Kadét → Pilóta → Hadnagy → Főhadnagy → Százados → Őrnagy → Ezredes → Tábornok → Admirális. A Hadnagy, az Őrnagy és az Admirális rang extra golyót is ad.

Egy játék 3 golyóból áll. A golyó elvesztésekor a bónusz × szorzó hozzáadódik a pontszámhoz. A rekordot a böngésző megjegyzi.

## Telepítés iPhone-ra

A játéknak egy weboldalon kell futnia, ehhez a legegyszerűbb a GitHub Pages:

1. A GitHubon nyisd meg a repót, majd: **Settings → Pages**.
2. A **Source** legyen *Deploy from a branch*, a branch *main*, a mappa */ (root)*. Mentsd el.
3. Pár perc múlva a játék elérhető lesz a `https://<felhasználónév>.github.io/<repó-neve>/` címen.
4. iPhone-on nyisd meg ezt a címet **Safariban**, koppints a **Megosztás** gombra, majd a **Főképernyőhöz adás** pontra.
5. A Főképernyőn megjelenik a **Nebula** ikon, ami teljes képernyőn indítja a játékot.

Tipp: ha nem szól a hang, kapcsold ki a telefon némítókapcsolóját.

## Helyi futtatás

Nincs fordítási lépés. Nyisd meg az `index.html`-t böngészőben, vagy indíts egy egyszerű szervert:

```sh
python3 -m http.server 8000
```

## Fájlok

- `index.html`: a teljes játék (fizika, grafika, hang, irányítás)
- `manifest.webmanifest`, `icons/`: a Főképernyő-ikonhoz és a teljes képernyős indításhoz
