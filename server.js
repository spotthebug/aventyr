// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

// require express and other modules
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),

  //  NEW ADDITIONS
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true, }));

// serve static files from public folder
app.use(express.static('public'));

// set Models
var db = require('./models'),
  Card = db.Card,
  Destination = db.Destination,
  User = db.User,
  Rating = db.Rating;

// set view engine to ejs
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

app.use(cookieParser());
app.use(session({
  secret: "thisisasecret", // change this!
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});


////////////////////
//  ROUTES
///////////////////

// set view engine to ejs
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  Destination.find(function (err, allDestinations) {
    console.log(allDestinations);
    if (err) {
      res.status(500).json({ error: err.message, });
    } else {
        res.render("index", { destinations: allDestinations, user: req.user, error: null});
    }
  });
});

// Signup
app.get('/signup', function (req, res) {
 res.render('signup');
});


app.post("/signup", function (req, res) {
  console.log("sanity check!! pre-signup");
  User.register(new User({ username: req.body.username, }), req.body.password,
      function (err, newUser) {
        console.log("Check if it enter function to auth");
        console.log("ERROR", err);
        console.log("NEW USER!!",newUser);
        passport.authenticate("local")(req, res, function() {
          res.redirect("/");
        });
      }
  );
});

// Login and Logout

app.post('/login',passport.authenticate('local'), function (req, res){

res.redirect("/");
});

app.get('/login', function(req, res){
  res.render("login")
});

app.get('/logout', function (req, res){
  console.log("Before logout", JSON.stringify(req.user));
  req.logout();
  console.log("After logout", JSON.stringify(req.user));
  res.redirect('/')
});



//View of all cards
app.get("/api/cards", function(req, res){
  Card.find({}, function(err, allCards){
    if (err){
      console.log(err);
    } else {
      console.log(allCards);
      res.render("./cards/index", {cards: allCards, user: req.user});
    }

});
});

app.get("/api/cards/create", function(req, res){
  Destination.find({}, function(err, allDestinations){
    if (err){
      console.log(err);
    } else {
      // res.render("cards/index", {cards: allCards, error: null});
      console.log(allDestinations);
      res.render("./cards/create", {destinations: allDestinations, user: req.user});
    }
  });

});

// create cards
// create cards
app.post("/api/cards", function(req, res){
  var newCard = new Card(req.body);
//saving the new card that was created
console.log(req.body);
Destination.findOne({name: req.body.destination}, function(err, destination){
  if (err){
    console.log(err);
  } else {
    // res.render("cards/index", {cards: allCards, error: null});
    newCard.destination = destination;
    newCard.user = req.user;
    // newCard.rating = Rating.findOne({rating: req.body.rating);
    console.log(req.user);
    newCard.save(function(err, savedCard){
      if (err){
        console.log(err);
      } else {
        console.log(savedCard);
      }
    res.redirect("/api/cards");
  })
};

  });
});
//Showpage for individual cards
app.get("/api/cards/:id", function(req, res){
  Card.findOne({_id: req.params.id}, function(err, foundCard){
    console.log(foundCard);
    if (err){
      console.log(err);
    } else{
      res.render("./cards/show",{card: foundCard});
      // foundCard.title = req.body.title || foundCard.title;
      // foundCard.description = req.body.description || foundCard.description;
      // foundCard.image = req.body.title || foundCard.image;
    }
  })
});


// Show all destinations
app.get("/api/destinations", function(req, res) {
  Destination.find({}, function(err, allDestinations) {
    if (err) {
      res.status(500).json({error: err.message});
    }
    else {
      res.render("./destinations/index", {destinations: allDestinations, user: req.user});
    }
  });
});

app.get("/api/destinations/:id", function(req, res) {
  var destination = req.params.id;
  Destination.findById((destination), function(err, foundDestination) {
    if (err) {
      res.status(500).json({error: err.message});
    }
    else if (foundDestination) {
      console.log()
      Card.find({destination: foundDestination._id}, req.body, {new: true}).populate('user').exec(function(err, allCards) {
        if (err) {
          res.status(500).json({error: err.message});
        }
        else {
          console.log(allCards);
          res.render("./destinations/show", {cards: allCards, destination: foundDestination, user: req.user});
        }
      });

    }


    });
});


app.get("/api/users", function(req, res){
  User.find({}, function(err, allUsers){
    if (err){
      console.log(err);
    } else {
      res.json(allUsers);
    }
});
});
app.get("/api/users/:id", function(req, res){
  console.log('user data:', req.user);
  var user= req.user;
  Card.find({user: user.id}, function(err, userCards){
    if (err) {
      console.log(err);
    } else{
      res.render("./users/index", {user: req.user, cards: userCards});
    }
  })
});


//delete cards
app.delete("/api/cards/:id", function (req, res) {
  // get card id from url params (`req.params`)
  var cardId = req.params.id;

  // find card in db by id and remove
  Card.findOneAndRemove({ _id: cardId, }, function () {
    console.log("Deleted:");
    res.redirect("/api/cards");
  });
});



//-------------Server------------->
app.listen(process.env.PORT || 3000, function(){
  console.log("listening..");
});
