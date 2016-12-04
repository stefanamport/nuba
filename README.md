# nuba

## Installation
npm install


## Start Server für Entwicklung
npm start
oder npm run watch

(.ts & .scss werden dabei automatisch kompiliert)

## HTML Templates
befinden sich alle in der Datei screens.html

## AngularFire
Tutorial: https://github.com/angular/angularfire2

In der Version 2.0.0-beta.6 von angularfire2 gibt es Momentan einen Bug.

Temporärer Fix:
"firebase = firebase.firebase;" in angularfire2.umd.js (node_modules/angularfire2/bundles) hinzufügen
 vor "var _a = firebase.auth;". Wenn das nicht gemacht wird, kann die App nicht gestartet werden.
 see https://github.com/angular/angularfire2/issues/576
