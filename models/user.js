var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var RatingSchema = new Schema({
  rating: {type: Number, min: 1, max: 5}
});

var UserSchema = new Schema({
  username: { type: String, required: true },
  password: String
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
