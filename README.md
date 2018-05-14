# multi-chess-clock

This project is a little PWA chess-clock with no limit to the number of players.

It has been build with VueJS (and specifically with the [vue-pwa-boilerplate](https://github.com/vuejs-templates/pwa) template)

#### How to use

* Navigate to the app
* Select duration, hit `Create`
* Get other players to scan the **QR-Code to navigate to the URL**
* Ensure everyone has their smartphone at reach
* When **all** the players have joined, hit `Start the game`
* The app **randomly picks** the **starting player**
* When a player gets his turn, either wait for the allocated time, or click on `next player` to start the next timer

#### Try it now [here](https://multi-chess-clock.firebaseapp.com/)

![alt text](https://raw.githubusercontent.com/Yojimb0/multi-chess-clock/master/README_app.png)

## Tech details

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### Firebase Realtime DB configuration
Just add a file named `firebase.config.js` at the root level of the project :

``` js
// Config file
import * as firebase from "firebase";

const config = {
	apiKey: 'XXX',
	authDomain: 'XXX',
	databaseURL: 'XXX',
	projectId: 'XXX',
	storageBucket: 'XXX',
	messagingSenderId: 'XXX'
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

```

#### Firebase deploying

Simply follow the [Get Started with Hosting
](https://firebase.google.com/docs/hosting/quickstart) guide, nothing fancy



