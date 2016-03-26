Plan
====

Themen
------

Laut

www.enterjs.de/abstracts.html#worksop-react
- Basics
- ES6
- Tests
- React Router 2

Beispiel-Anwendung im Master-Detail-Stil.

Idee für Beispielanwendung
* Rant-Provider? Rant eingeben und der wird dargestellt?


Parallel-Track: ES6
-------------------

Wird Stück für Stück bei jeder Lesson gemacht.

Nur das was wir auch wirklich brauchen zeigen. Nichts darüber hinaus

Themen
* classes
* const
* Arrow Funktions
* Destrukturing
* Promise


Lesson 1: Hello World
---------------------

Aufgabe: Detail-Ansicht erstellen

Vorgehen:
* Sehr schnell mit Hello-World-Code anfangen und den erklären
* Teilnehmer sehr schnell zum Praxis-Teil bringen (innerhalb von 15 Minuten wenn möglich)

* Vorgabe:
  * npm Projekt
  * CSS und Rahmen als React-Komponente, die das nutzen (React Komponente ansonsten leer)
  * Webpack basierter Build-Prozess

* Aufgabe:
  * Arbeitsumgebung einrichten
  * Die Tools,
  * die Ablaufumgebung (Browser) und
  * die IDE kennen lernen
  * ein erstes React Programm zum laufen bringen

Lesson 2: Komponentenhierarchien und Interaktion
------------------------------------------------

* Aufgabe
  * Knopf einbauen
  * Input-Komponente aus der Detail-View herausziehen
  * Detail hält weiterhin State
  * gibt den State und Update-Callback als Property nach unten


Lesson 3: Unit-Tests
--------------------

Tests für beide Komponenten entwickeln? Oder erst mal Ende, damit man die nicht ständig nachziehen muss?


Lesson n-1: React Router
------------------------

* Rahmenseite
  * Master (Hello World)
  * Detail

Optionale Lesson n: Call gegen generisches REST-API
---------------------------------------------------

Eigenen Server schreiben ist zu aufwändig. Server auf Workshop-Leiter-Maschinen nutzen möglich, aber nach dem Workshop ist damit ja Schluss.

Was gibt es da? Firebase?
* https://www.firebase.com/
  * https://www.firebase.com/docs/rest/api/ oder
  * https://www.firebase.com/docs/web/api/

Rants abspeichern und in eigener View mit Id darstellen lassen


TODO
====

* ES6
  * Folien aus JavaScript-Einführung übernehmen
  * Welche Themen brauchen wir noch?
* Beispiel-App aussuchen
* Beispiel-Code für jeden Schritt
* Workspace mit Build-Umgebung
* Folien
* Erstes Beispiel in den Folien weiter reduziehen
  * Nur Eingabe und Darstellung
  * Keine Knöpfe und keine refs
