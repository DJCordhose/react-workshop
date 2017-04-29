### Vorbereitung
* Kopiere `backend.js` und `main.js` in dein Workspace-Verzeichnis
  * `backend.js` enthält den Code für den Serverzugriff
  * `main.js` importiert Polyfills für `fetch` und Promises

### Backend API
Das `backend`-Modul stellt zwei Funktionen (`loadFromServer`und `saveToServer`) zur Verfügung. 

**Verwendung**: Die beiden Funktionen kapseln den `fetch` Zugriff und übernehmen die
Verarbeitung der Antwort (Parsen JSON, Fehlerbehandlung). Das Ergebnis wird dann
über eine der beiden Callback-Funktionen zurückgegeben. (siehe API Doku)

**Beispiel**:
```javascript
import {loadFromServer} from './backend';

loadFromServer(
  // 1. parameter: success callback:
  greetings => console.log('Greetings loaded: ', greetings),
  
  // 2. parameter: error handler:
  error => console.error('Some error occured: ', error)
);
```

Weitere Informationen kannst Du der API Doku in dem `backend` Modul entnehmen.
  
### Übung: Stelle den GreetingController um
1. Importiere `loadFromServer` und `saveToServer` aus dem `backend`-Modul
2. Füge in der Komponente `GreetingController` zwei Methoden zum Laden und Speichern der Greetings hinzu
3. Nach dem Mounten der Komponente in den DOM sollen die Greetings geladen werden (Lifecycle-Methode `componentDidMount`)
4. Das `onAdd`-Callback von `GreetingDetail` soll die übergebene Greeting speichern und im Erfolgsfall 
das gespeicherte Greeting in die Liste aller Greetings zufügen.
 

