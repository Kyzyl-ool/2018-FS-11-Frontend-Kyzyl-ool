importScripts('https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.0/firebase-messaging.js');
var config = {
  messagingSenderId: "541876881149"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

