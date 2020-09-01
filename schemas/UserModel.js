let mongoose = require("mongoose");

let userModel = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
let User = (module.exports = mongoose.model("user", userModel));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
