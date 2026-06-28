# Gigac web — návod

Statický web (Eleventy) s obsahom oddeleným od dizajnu, editovateľný cez TinaCMS,
automaticky nahrávaný na klientov FTP cez GitHub Actions.

---

## Ako je to poskladané

```
src/
  index.njk        ← šablóna (dizajn + rozloženie). TOTO sa needituje cez Tinu.
  _data/site.json  ← všetky texty a odkazy. TOTO mení klient aj Tina.
  img/             ← obrázky a video (sem ukladá obrázky aj Tina)
tina/config.ts     ← definícia editora (aké polia klient vidí)
.eleventy.js       ← nastavenie buildu
.github/workflows/deploy.yml  ← automat: build + nahranie na FTP
_site/             ← hotový web (generuje sa, NEcommituje sa, ide na FTP)
```

Pravidlo: **obsah** (texty, obrázky) je v `site.json`, **dizajn** v `index.njk`.
Klient siaha len na obsah.

---

## Lokálne (na tvojom Macu)

```bash
npm install        # raz, stiahne závislosti
npm run dev        # spustí web na http://localhost:8080 so živým náhľadom
npm run build      # zostaví web do _site/
```

> Pozn.: na úplne novom Node (25+) môže zlyhať natívny modul TinaCMS.
> Pre lokálne spustenie Tiny použi Node 20 (napr. `nvm use 20`). Na build
> samotného webu (`npm run build`) to nevadí, ten ide na hocijakom Node.

---

## Jednorazové nastavenie pilota (toto sa robí raz)

### 1. GitHub repo
1. Vytvor na GitHube nový **prázdny** repozitár (napr. `gigac-web`).
2. V priečinku projektu:
   ```bash
   git init
   git add .
   git commit -m "init: gigac web + tina + deploy"
   git branch -M main
   git remote add origin https://github.com/POUZIVATEL/gigac-web.git
   git push -u origin main
   ```
   Po pushi sa spustí Action a (zatiaľ bez FTP údajov) skončí na kroku nahrávania.

### 2. FTP údaje klienta → GitHub Secrets
V repozitári: **Settings → Secrets and variables → Actions → New repository secret**.
Pridaj:
- `FTP_SERVER` — adresa servera (napr. `ftp.klient.sk`)
- `FTP_USERNAME` — FTP login
- `FTP_PASSWORD` — FTP heslo

Voliteľne v záložke **Variables**:
- `FTP_PROTOCOL` — `ftps` (odporúčané) alebo `ftp`, ak hosting nepodporuje FTPS
- `FTP_SERVER_DIR` — cieľový priečinok na serveri (napr. `./www/` alebo `./public_html/`), default `./`

> Najprv testuj na nejakom testovacom priečinku, nie rovno na ostrom webe.
> Po pridaní secretov spusti deploy znova (Actions → Build a nahranie na FTP → Run workflow).

### 3. TinaCloud (editor pre klienta)
1. Choď na https://app.tina.io a prihlás sa cez GitHub.
2. Vytvor **Project** napojený na repo `gigac-web`.
3. TinaCloud ti dá **Client ID** a vygeneruješ **Read-only Token**.
4. Pridaj ich do GitHub Secrets:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` — Client ID
   - `TINA_TOKEN` — token
5. Pushni hocijakú zmenu (alebo spusti workflow ručne). Build teraz vytvorí aj `/admin`.

Editor je potom na: `https://domena-klienta.sk/admin/`
Klient sa prihlási (cez TinaCloud) a mení texty aj obrázky. Po uložení sa zmena
commitne do repa a Action ju nahrá na FTP.

---

## Bežná práca

### Klient (mení texty a obrázky)
Otvorí `…/admin/`, prihlási sa, klikne na sekciu, prepíše text alebo nahrá obrázok,
dá Uložiť. Web sa aktualizuje sám.

### Ty (meníš štruktúru/dizajn alebo pridávaš sekciu)
```bash
git pull            # vždy najprv: stiahni zmeny klienta
# úpravy v src/index.njk (dizajn) alebo src/_data/site.json (obsah)
git add . && git commit -m "popis zmeny" && git push
```
Po pushi sa web zbuilduje a nahrá na FTP automaticky.

---

## Čo zatiaľ nie je hotové (vedome)

- **Kontaktný formulár** zatiaľ len vyzerá, neodosiela. Treba mu backend
  (napr. skill `/contact-form` so SMTP + antispam) — rieši sa samostatne.
- **Sociálne siete a IBAN** v `site.json` sú placeholdery (`#`, „doplní sa"),
  klient ich doplní v editore.
- **Zvýraznené slová** v nadpisoch sú zatiaľ riešené ako text s HTML značkou
  (`<em>`, `<span>`, `<b>`). Funguje to, dá sa neskôr spríjemniť cez rich-text.

---

## Použiť ako šablónu na ďalší web

1. Skopíruj celý priečinok (okrem `node_modules`, `_site`, `.git`).
2. Nahraď `src/index.njk` (dizajn nového webu) a `src/_data/site.json` (jeho obsah).
3. Uprav polia v `tina/config.ts` podľa nového obsahu.
4. Zopakuj „Jednorazové nastavenie pilota" s novým repom a FTP údajmi klienta.
