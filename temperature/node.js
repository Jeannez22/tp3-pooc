const sensor = require('ds18b20');

const sensorId = '28-0213121a4aaa';

var temperature = sensor.temperatureSync(sensorId);

console.log ('La température est de ' + temperature);

if (temperature < 15){
console.log ('Il fait froid');
};

if (temperature > 15 && temperature < 30){
console.log('Ca peut aller');
};

if (temperature > 30){
console.log('Il fait chaud');
};

