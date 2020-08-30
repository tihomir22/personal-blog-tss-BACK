let mongoose = require("mongoose");
// Setup schema
let passModel = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
// Export Post model
var Pass = (module.exports = mongoose.model("pass", passModel));
module.exports.get = function (callback, limit) {
  Pass.find(callback).limit(limit);
};
