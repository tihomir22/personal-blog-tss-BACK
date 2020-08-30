const PassModel = require("../schemas/PassModel");
exports.recuperarContrasenya = function (req, response, value) {
  PassModel.findOne({ id: req.body.id, pass: value }, (err, res) => {
    if (err == null && res != null) {
      response.json({ status: "success", message: "Contrasenya correcta", data: true });
    } else {
      response.json({ status: "error", message: "Contrasenya incorrecta", data: false });
    }
  });
};
