const UserModel = require("../schemas/UserModel");

exports.index = function (req, res) {
  UserModel.get(function (err, posts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
        data: {},
      });
    } else {
      res.json({
        status: "success",
        message: "Posts retrieved successfully",
        data: posts,
      });
    }
  });
};

exports.findByIdPromise = function (id) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ id }, (errorMongo, respuestaMongo) => {
      if (errorMongo) {
        reject(errorMongo);
      } else {
        resolve(respuestaMongo);
      }
    });
  });
};

exports.new = function (req, res) {
  let user = new UserModel();
  Object.assign(user, req.body);
  // save the post and check for errors
  user.save(function (err) {
    if (err) {
      res.json({ status: "error", data: err });
    } else {
      res.json({
        message: "New user created!",
        data: "Duro",
      });
    }
  });
};
