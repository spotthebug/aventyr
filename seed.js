var db = require('./models');

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