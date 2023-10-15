# FastTyper  
Spletna aplikacija, narejena v MERN stack-u, ki omogoča učenje deset-prstnega tipkanja.
Uporabniku poda izsek teksta ter prikaže pozicije prstov.
Ko uporabnik tipka se tekst dinamično spreminja.
Aplikacija beleži uporabnikov napredek ter statistiko, hkrati pa nudi razne igre podobne typeracer-ju
Učimo se hitreje tipkat na zanimiv način, kjer lahko tudi testiramo svoje sposobnosti in analiziramo naš napredek.

![image](https://github.com/zanivanusa/fastTyper_RIT/assets/60394411/a6c64716-7dc3-49a5-8f21-0ad02c1f8276)
![image](https://github.com/zanivanusa/fastTyper_RIT/assets/60394411/3da43e64-772c-4a93-a2b2-067136c0e27b)


## Setup
1. Install dependencies with
```bash
$ npm install
```
In client folder;
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
