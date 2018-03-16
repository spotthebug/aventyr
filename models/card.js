var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CardSchema = new Schema({
    title: String,
    description: String,
    image: String
})


var Card = mongoose.model('Card', CardSchema);
module.exports = Card;
