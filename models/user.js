var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var RatingSchema = new Schema({
  rating: {type: Number, min: 1, max: 5}
});

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rating: [RatingSchema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
