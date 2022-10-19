# Apollo GraphQL Server Workshop

## Verzeichnisse:

* `app`: Fertige Beispiel-Anwendung
* `material` Material für die Übungen (wenn wir das brauchen, sage ich das jeweils bei der Übung)
* `steps`: Lösungen für die Übungen
* `workspace`: hierin arbeiten wir

## TypeScript

Der Code im `workspace`-Verzeichnis enthält TypeScript-Dateien. TypeScript ist aber hier so konfiguriert,
dass Du während der Übungen keinen TypeScript-spezifischen Code schreiben musst.

## Installation

**Voraussetzungen**

Um an den Übungen teilzunehmen, brauchst Du:
* NodeJS 16.17
* **pnpm**. 
  * Falls nicht installiert, bitte [installieren](https://pnpm.io/installation) oder "corepacks" einschalten: `corepack enable` (Siehe: https://nodejs.org/api/corepack.html)
  * `npm` sollte aber auch funktionieren
* Die Ports 4000 und 4010 müssen verfügbar sein.

**Installation der Packages**

Bitte `pnpm install` in den beiden Verzeichnissen ausführen:

* `app/userservice`
* `workspace`

**Backend starten**

Das Backend kannst Du im Verzeichnis `workspace` starten:

```bash
cd workspace

pnpm dev
```

Wenn Du Änderungen im Code machst, wird das Backend automatisch neu gestartet.