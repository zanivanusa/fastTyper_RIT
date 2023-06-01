# FastTyper  
Spletna aplikacija, ki omogoča učenje deset-prstnega tipkanja.
Uporabniku poda izsek teksta ter prikaže pozicije prstov.
Ko uporabnik tipka se tekst dinamično spreminja.
Aplikacija beleži uporabnikov napredek ter statistiko, hkrati pa nudi razne igre podobne typeracer-ju
Učimo se hitreje tipkat na zanimiv način, kjer lahko tudi testiramo svoje sposobnosti in analiziramo naš napredek.

## Setup
1. Install dependencies with
```bash
$ npm install
```
In client;(zan - se morem popravit)
```
$ npm install chart.js
$ npm install react-chartjs-2
```
2. Setup database

	* Rename .env.example to .env
	```bash
	$ mv .env.example .env
	```
	* Open the file and set the database username/password and recaptcha keys
	* Also copy the .env file to the client folder.
	* Go to Atlas and add your IP address to the list

3. Start application with (you have to be in the root directory)
```bash
$ npm start
```
