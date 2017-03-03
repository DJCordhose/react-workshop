### Vorbereitung
* Kopiere `backend.js` und `main.js` in dein Workspace-Verzeichnis
  * `backend.js` enthält den Code für den Serverzugriff
  * `main.js` importiert Polyfills für `fetch` und Promises

### Backend API
Das `backend`-Modul stellt zwei Funktionen zur Verfügung. Die API-Dokumentation
findest Du in der Datei `backend.js`
  
### Stelle den GreetingController um
1. Importiere `loadFromServer` und `saveToServer` aus dem `backend`-Modul
2. Füge im `GreetingController` zwei Methoden zum Laden und Speichern der Greetings hinzu
3. Nach dem Mounten der Komponente in den DOM sollen die Greetings geladen werden
4. Das `onAdd`-Callback von `GreetingDetail` soll die übergebene Greeting speichern und im Erfolgsfall 
das gespeicherte Greeting in die Liste aller Greetings zufügen.
 

