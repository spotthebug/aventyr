var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/aventyr");

module.exports = require("./user.js");
module.exports = require("./card.js");
module.exports = require("./destination.js");
