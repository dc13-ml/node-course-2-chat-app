const moment = require('moment');

var date = moment();
console.log(date.format());

console.log(date.format('DD-MMM'));
console.log(date.format('Do-MMM-YYYY'));

console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));
