var mongoose = require('mongoose');
Schema = mongoose.Schema;

var DestinationSchema = new Schema ({
  name: { type: String, required: true },
  image: { type: String, required: true },

});

var Destination = mongoose.model('Destination', DestinationSchema);

module.exports = Destination;