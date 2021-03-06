'use strict';
// // blank template for starting projects

// // Lab 7 and in class notes

// 'use strict';


// var allDogs = [];

// function Dog(name, color, breed, nickName) {
//   this.name = name;
//   this.color = color;
//   this.breed = breed;
//   this.nick = nickName;

//   // avoid defining instance methods inside the constructor
//   // this.bark = function() {
//   //   console.log(this.name);
//   // };

//   allDogs.push(this);
// }

// Dog.prototype.bark = function() {
//   console.log(this.name);
// };


// //  1. {} creates new object literal
// //  2. assigns context to 'this'

// // {
// //   name: 'Demi',
// //   color: 'black and white',
// //   breed: 'border collie',
// //   nick: 'Demdog',
// // }


// new Dog('Demi', 'black and white', 'border collie', 'Demdog');
// new Dog('Dog', 'black', 'not sure', 'D');
// new Dog('Dog Too', 'blue', 'cat', 'Dog?');
// new Dog ('Salt', 'white', 'lizard', 'Salt');
// new Dog('Whiskers', 'orange', 'definitely a cat', 'Mr. Bigglesworth');


// Create the document

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var stores = [];

function Store(name, minCustomer, maxCustomer, avgSales, customersPerHour, cookiesPerHour, dailyTotal) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgSales = avgSales;
  this.customersPerHour = customersPerHour;
  this.cookiesPerHour = cookiesPerHour;
  this.dailyTotal = dailyTotal;

  stores.push(this);
}

var pike = new Store('First and Pike', 23, 65, 6.3, [], [], 0);
var seatac = new Store('Seatac Airport', 3, 24, 1.2, [], [], 0);
var seacen = new Store('Seattle Center',11, 38, 3.7, [], [], 0);
var caphill = new Store('Capitol Hill', 20, 38, 2.3, [], [], 0);
var alki = new Store('Alki', 2, 16, 4.6, [], [], 0);


Store.prototype.generateRandom = function() {
  return Math.ceil(Math.random() * (this.maxCustomer - this.minCustomer) + this.minCustomer);
};

Store.prototype.calculateCustomers = function() {
  var random = Math.ceil(this.generateRandom(this.minCustomer, this.maxCustomer) * this.avgSales);
  this.cookiesPerHour.push(random);
  return this.cookiesPerHour;
};

Store.prototype.calculateTotal = function() {
  this.dailyTotal = this.cookiesPerHour.reduce((a,b) => a + b, 0);
};


for (var i = 0; i < hours.length; i++) {
  pike.generateRandom();
  pike.calculateCustomers();
  pike.calculateTotal();
  seatac.generateRandom();
  seatac.calculateCustomers();
  seatac.calculateTotal();
  seacen.generateRandom();
  seacen.calculateCustomers();
  seacen.calculateTotal();
  caphill.generateRandom();
  caphill.calculateCustomers();
  caphill.calculateTotal();
  alki.generateRandom();
  alki.calculateCustomers();
  alki.calculateTotal();
}

var trEl2 = document.createElement('tr');
var tdEl2 = document.createElement('td');
tdEl2.textContent = '';
trEl2.appendChild(tdEl2);
for (var l = 0; l < hours.length; l++) {
  tdEl2 = document.createElement('th');
  tdEl2.textContent = hours[l];
  trEl2.appendChild(tdEl2);
}
tdEl2 = document.createElement('th');
tdEl2.textContent = 'Total Customers';
trEl2.appendChild(tdEl2);
var semiEl2 = document.getElementById('semi-content');
semiEl2.appendChild(trEl2);

var createTable = function() {
  for (var j = 0; j < stores.length ; j++) {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = stores[j].name;
    trEl.appendChild(tdEl);
    for (var k = 0; k < hours.length; k++) {
      tdEl = document.createElement('td');
      tdEl.textContent = stores[j].cookiesPerHour[k];
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = stores[j].dailyTotal;
    trEl.appendChild(tdEl);
    var semiEl = document.getElementById('semi-content');
    semiEl.appendChild(trEl);
  }
};

createTable();
// var pClickel = document.getElementById('p-click');
// pClickel.addEventListener('click', function() {
//   console.log('Clicked!');
// });

function clicked() {
  console.log('Clicked!');
}

var pClickel = document.getElementById('p-click');
pClickel.addEventListener('click', clicked);


var formEl = document.getElementById('main-form');
formEl.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('event.target', event);
  console.log(event.target.storename.value);
  var storename = event.target.storename.value;
  var minC = event.target.minC.value;
  var maxC = event.target.maxC.value;
  var avgS = event.target.avgC.value;
  var submitStore = new Store(storename, minC, maxC, avgS, [], [], 0);
  for (var i = 0; i < hours.length; i++) {
    submitStore.generateRandom();
    submitStore.calculateCustomers();
    submitStore.calculateTotal();
  }

  addTable();
});


var addTable = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = stores[stores.length -1].name;
  trEl.appendChild(tdEl);
  for (var k = 0; k < hours.length; k++) {
    tdEl = document.createElement('td');
    tdEl.textContent = stores[stores.length -1].cookiesPerHour[k];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = stores[stores.length -1].dailyTotal;
  trEl.appendChild(tdEl);
  var semiEl = document.getElementById('semi-content');
  semiEl.appendChild(trEl);

  Totals = [];
  totalSum();
  document.getElementById('tfoot').innerHTML = ' ';
  totalDisplay();
};

var Totals = [];
function totalSum() {
  for(var c = 0; c < hours.length; c++){
    var holder = 0;
    for(var b = 0; b < stores.length; b++){
      holder += stores[b].cookiesPerHour[c];
    }
    Totals.push(holder);
  }
}

console.log(totalSum());

function totalDisplay() {
  var footr = document.createElement('tr');
  var footd = document.createElement('td');
  footd.textContent = 'Totals: ';
  footr.appendChild(footd);
  for (var m = 0; m < hours.length; m++) {
    footd = document.createElement('td');
    footd.textContent = Totals[m];
    footr.appendChild(footd);
  }
  footd = document.createElement('td');
  footd.textContent = 'test';
  footr.appendChild(footd);
  var footEl = document.getElementById('tfoot');
  footEl.appendChild(footr);
}

totalDisplay();

// var head = document.getElementsByTagName('head');
// head.setAttribute('id', 'test');


//   render: function() {
//     oldpike.calculateSales();

//     var ulEl = document.createElement('ul');
//     var h2El = document.createElement('h2');
//     h2El.textContent = oldpike.name;
//     ulEl.appendChild(h2El);

//     for (var idx in oldpike.hours) {
//       var liEl = document.createElement('li');
//       liEl.textContent = oldpike.hours[idx] + ': ' + oldpike.cookiesPerHour[idx] + ' cookies';
//       ulEl.appendChild(liEl);
//     }

//     var liEltwo = document.createElement('li');
//     liEltwo.textContent = 'Total: ' + oldpike.dailyTotal;
//     ulEl.appendChild(liEltwo);

//     var mainEl = document.getElementById('main-content');
//     mainEl.appendChild(ulEl);
//   },
// };


// for (var k = 0; k < hours.length; k++) {
//   var tdEl2 = document.createElement('td');
//   var trEl2 = document.createElement('tr');
//   tdEl2.textContent = 'test';
//   tdEl2.appendChild(trEl2);
//   var semiEl2 = document.getElementById('');
//   semiEl2.appendChild(tdEl2);
// }



// Store.prototype.calculateSales() {

//   for (var numCustomers of store.customersPerHour) {
//     var cookies = Math.ceil(store.avgSales * numCustomers);
//     store.cookiesPerHour.push(cookies);
//     store.dailyTotal += cookies;
//   }
//   return pike.cookiesPerHour; // Unnecessary - for demo only
// }






// 2. Multipy rando by avgSales

// function generateRandom(min, max) {
//   return Math.random() * (max - min) + min;
// }

// var oldpike = {
//   calculateCustomers: function() {
//     // 1. Iterate thru hours
//     // 2. For each hour, run rando generator
//     // 3. Push to customersPerHour

//     // for (var i = 0; i < oldpike.hours.length; i++) {}
//     for(var hour of hours) {
//       var rando = generateRandom(oldpike.minCustomers, oldpike.maxCustomers);
//       oldpike.customersPerHour.push(rando);
//     }
//     return oldpike.customersPerHour; // Unnecessary - for demo only
//   },
//   calculateSales: function() {
//     oldpike.calculateCustomers();

//     for (var numCustomers of oldpike.customersPerHour) {
//       var cookies = Math.ceil(oldpike.avgSales * numCustomers);
//       oldpike.cookiesPerHour.push(cookies);
//       oldpike.dailyTotal += cookies;
//     }
//     return oldpike.cookiesPerHour; // Unnecessary - for demo only
//   },



// Finally; Run render() for each store we create!
// for (var store of stores) {
//   store.render();
// }