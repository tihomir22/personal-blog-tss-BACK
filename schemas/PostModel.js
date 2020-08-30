let mongoose = require("mongoose");
// Setup schema
let postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  wallpaperImage: {
    type: String,
    required: true,
  },
  bloques: {
    type: Object,
    required: true,
  },
  categorias: [String],
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  autorId: Number,
  keywords: [String],
  comentarios: [{ id: Number, contenido: String }],
});
// Export Post model
var Post = (module.exports = mongoose.model("post", postSchema));
module.exports.get = function (callback, limit) {
  Post.find(callback).limit(limit);
};
