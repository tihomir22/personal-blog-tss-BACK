const PostModel = require("../schemas/PostModel");

// Import post model
Post = require("../schemas/PostModel");
exports.index = function (req, res) {
  Post.get(function (err, posts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Posts retrieved successfully",
      data: posts,
    });
  });
};
// Handle create post actions
exports.new = function (req, res) {
  let postModel = new PostModel();
  Object.assign(postModel, req.body);
  // save the post and check for errors
  postModel.save(function (err) {
    if (err) {
      res.json({ status: "error", data: err });
    } else {
      res.json({
        message: "New post created!",
        data: "Duro",
      });
    }
  });
};
// Handle view post info
exports.view = function (req, res) {
  Post.findById(req.params.post_id, function (err, post) {
    if (err) res.send(err);
    res.json({
      message: "post found!",
      data: post,
    });
  });
};
// Handle update post info
exports.update = function (req, res) {
  Post.findById(req.params.post_id, function (err, post) {
    if (err) res.send(err);
    post = req.body;
    // save the post and check for errors
    post.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "post Info updated",
        data: post,
      });
    });
  });
};
// Handle delete post
exports.delete = function (req, res) {
  post.deleteOne(
    {
      _id: req.params.post_id,
    },
    function (err, post) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "post deleted",
      });
    }
  );
};
