var db = require('./models');
var faker = require('faker');

var userList = [];

var destinationsList = [
  {
    name: "San Francisco",
    image: "./images/america1"
  },
  {
    name: "Egypt",
    image: "./images/egypt1.png"
  },
  {
    name: "Paris",
    image: "./images/france2.png"
  },
  {
    name: "Agra",
    image: "./images/tajmahal1.png"
  },
  {
    name: "Sydney",
    image: "./images/castle1.png"
  }
];

var cardList = [
  {
    title: "Golden Gate",
    description: "A huge orange bridge",
    image: "https://images.unsplash.com/photo-1416184008836-5486f3e2cf58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96758e63046414a225db70c7d2b1cc59&auto=format&fit=crop&w=666&q=80"
  },
  {
    title: "Eiffel Tower",
    description: "Tower full of rods",
    image: "https://images.unsplash.com/photo-1503302130949-aa7c93f0bcb1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=caf3cfce3a085a07704de5172054c385&auto=format&fit=crop&w=1668&q=80"
  },
  {
    title: "Taj Mahal",
    description: "Symbol of Love",
    image: "https://images.unsplash.com/photo-1515004207928-a22c7f92c249?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=97bb8ba4c9b823dc214d1fcebb2e0909&auto=format&fit=crop&w=818&q=80"
  },
  {
    title: "Sydney Opera House",
    description: "Sydney's pride",
    image: "https://images.unsplash.com/photo-1501159606039-efa80afc41f8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6cb192619f8d1140c887edc0fd7c98ba&auto=format&fit=crop&w=1502&q=80"
  },
  {
    title: "Sphinx",
    description: "Egyptian pyramid",
    image: "https://images.unsplash.com/photo-1486150702851-498e985c2efc?ixlib=rb-0.3.5&s=d5fc45f7b145ab8d3bfd1b44772d0eb5&auto=format&fit=crop&w=1502&q=80"
  }
];

db.Card.remove({}, function(err, cards) {
  console.log('removed all cards');
  db.Card.create(cardList, function(err, cards){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all cards');
    console.log("created", cards.length, "cards");
  })
});

// remove all records that match {} -- which means remove ALL records
db.Destination.remove({}, function(err, destinations) {
  console.log('removed all destinations');
  db.Destination.create(destinationsList, function(err, destinations){
     if (err) {
      console.log(err);
      return;
    }
  console.log('recreated all destinations');
    console.log("created", destinations.length, "destinations");
  })
});


// db.User.remove({}, function(err, users){
//     console.log('removed all users');
//     for (var i=0; i < 5; i++) {
//     userList.push(db.User.create({
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: "password"
//   }, function(err, users){
//     if(err){
//       return console.log(err);
//     }
//     console.log("recreated all users");
//   }));
// }

// });

