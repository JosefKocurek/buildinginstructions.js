# DSH – Interaktivní LEGO manuál

Černobílá webová aplikace pro prohlížení stavebního návodu modelu DSH (kroky z `0 STEP` v LDR).

## Struktura

- **Home** – úvodní stránka s názvem „To čubrním“, tlačítka „Začít stavět“ a „Stáhnout PDF“.
- **Viewer** – interaktivní manuál (kroky Zpět/Vpřed, indikátor „Krok X z Y“, seznam dílků pro krok, 3D scéna s OrbitControls).

Model: `models/DSH.ldr`. Knihovna: `buildinginstructions.js` (LDR loader, StepHandler, PLI). Barvy z `ldconfig.ldr` / `colors.js`. Díly: `official/`, `ldraw_parts/`, `ldraw_unofficial/`.

## Vývoj

```bash
cd DSH
npm install
npm run dev
```

Aby viewer načetl model a díly, musí být k dispozici složky `js/`, `models/`, `ldraw_parts/`, `ldraw_unofficial/`, `official/` (a volitelně `ldconfig.ldr`). Dvě možnosti:

1. **Sloužit z kořene repozitáře**  
   Např. z kořene projektu spusťte `npx serve .` a otevřete `http://localhost:3000/DSH/`. Viewer pak načte `/models/DSH.ldr` a `/js/…` z kořene.

2. **Symlinky v `public`**  
   Z `DSH` spusťte:
   ```bash
   cd public
   ln -sf ../../js js
   ln -sf ../../models models
   ln -sf ../../ldraw_parts ldraw_parts
   ln -sf ../../ldraw_unofficial ldraw_unofficial
   ln -sf ../../official official
   ln -sf ../../ldconfig.ldr ldconfig.ldr
   cd ..
   ```
   Pak `npm run dev` z DSH funguje i bez serveru v kořeni.

## Build

```bash
npm run build
```

Výstup je v `dist/`. Při nasazení nasaďte celý repozitář (ne jen DSH), aby `/js/`, `/models/`, `/ldraw_parts/` atd. byly dostupné z kořene, a aplikaci otevřete např. na `https://vase-domena/DSH/`.

## Tlačítko „Stáhnout PDF“

Aktuálně jen placeholder. Pro skutečný export do PDF je potřeba doplnit generování PDF (např. z obrázků kroků nebo z 3D snímků).
