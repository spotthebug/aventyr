var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CardSchema = new Schema({
    title: String,
    description: String,
    image: String,
    user: {type: Schema.Types.ObjectId, ref:'User'},
    user: {type: Schema.Types.ObjectId, ref:'Destination'}
})


var Card = mongoose.model('Card', CardSchema);
module.exports = Card;
