var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var RatingSchema = new Schema({
  rating: {type: Number, min: 1, max: 5},
  card: {type: Schema.Types.ObjectId, ref:'Card'}
});

var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;

