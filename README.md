# Treasure map

Lead adventurers in search of treasures !

## Description

A program that take as parameter a file with data about a map, moutains, treasures and adventurers, simulate the movement of thoses adventurers and finaly output the resultat in another file. 


### Dependencies

* Nodejs >= v16.15.1

### Installing

* npm install
* make sure to have read/write right in the folder and subfolders.

### Executing program

* from root folder of the project:

* node main.js pathToEntryMap  (some map are available in tests/file)

* node main.js -d pathToEntryMap  (if you want to draw rather than write, --draw works too)
* If you draw big map, be sure to open the output in an app tha can handle big file. (tested on vscode)

* npm test -- --silent to launch all unit test done with jest (--silent to remove console.info)