# DSH.ldr – doplnění chybějících dílků

Aby se model DSH.ldr zobrazil kompletně (všechny dílky ve správné barvě), musí být v `ldraw_parts/` (nebo v `official/`, `unofficial/`) všechny díly, na které model přímo i nepřímo odkazuje.

## Postup

### 1. Zjistit, co chybí

Rekurzivní sběr všech ID dílů, které model potřebuje:

```bash
node scripts/collect-ldraw-deps.js models/DSH.ldr
```

Výstup: na stderr počet požadovaných / dostupných / chybějících, na stdout seznam všech požadovaných ID (jeden na řádek). ID s cestou (`s/xxx.dat`, `48/xxx.dat`, `8/xxx.dat`) musí zůstat s cestou.

### 2. Stáhnout chybějící z LDraw library

Chybějící (bez generovaných a vlastních souborů) ulož do souboru, jeden ID na řádek, např. `scripts/missing-dsh-parts.txt`. Pak:

```bash
node scripts/download-ldraw-parts.js --list scripts/missing-dsh-parts.txt
```

Skript ukládá soubory do `ldraw_parts/`; u ID s cestou (např. `s/27925s01.dat`) vytvoří příslušný podadresář (`ldraw_parts/s/` atd.).

### 3. Opakovat 1–2

Po stažení může collector najít další závislosti (nové díly). Spusť znovu krok 1, případně doplň seznam a znovu krok 2, dokud počet chybějících nepřestane klesat.

## Co nestahovat

- **stud10.dat, stud6.dat, …** – generuje je viewer (LDR.Studs), nejsou v library.
- Soubory s diakritikou nebo mezerou v názvu (např. **převod.dat**, **víko 1.dat**) – obvykle vlastní/neoficiální díly; pokud je máte jinde, zkopírujte je do `ldraw_parts/` ručně.

## Viewer a cesty

V `dsh-viewer.html` je vlastní `idToUrl`: pro `s/xxx.dat` se kromě `ldraw_parts/s/xxx.dat` zkouší i `ldraw_parts/xxx.dat` (flat), takže fungují obě varianty uložení.
