var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CardSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: {type: Number},
    user: {type: Schema.Types.ObjectId, ref:'User'},
    destination: {type: Schema.Types.ObjectId, ref:'Destination'},
});


var Card = mongoose.model('Card', CardSchema);
module.exports = Card;
