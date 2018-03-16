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

db.User.remove({}, function(err, users){
    console.log('removed all users');
    for (var i=0; i < 5; i++) {
    userList.push(db.User.create({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: "password"
  }, function(err, users){
    if(err){
      return console.log(err);
    }
    console.log("recreated all users");
  }));
}

});
