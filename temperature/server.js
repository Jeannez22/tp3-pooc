const express = require('express')
const app = express()
const port = 3000

const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
const ledR = new Gpio(18, 'out');
const ledB = new Gpio(24, 'out');
const sensor = require('ds18b20');
const sensorId = '28-0213121a4aaa';

var temperature = sensor.temperatureSync(sensorId);

//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');

//Configuration du moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//On retrouve le même comportement que notre serveur précédent
app.get('/', (request, response) => {
  //Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
  response.render('index');
});

app.get('/temperature', (request, response) =>{

if (temperature < 15){
response.render('froid');
ledB.writeSync(1);
console.log('froid');

}else if(temperature >15 && temperature <30){
response.render('normal');
console.log('normal');

}else if (temperature > 30){
response.render('chaud');
ledR.writeSync(1);
console.log('chaud');
}});


app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }
  //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
})
