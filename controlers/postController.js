const PostModel = require("../schemas/PostModel");
const userController = require("./userController");
// Import post model
exports.index = function (req, res) {
  PostModel.get(async function (err, posts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      let postsConAutores = await fetchAutoresAndSetWithPosts(posts);

      res.json({
        status: "success",
        message: "Posts retrieved successfully",
        data: postsConAutores,
      });
    }
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
  PostModel.findById(req.params.id, function (err, post) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "Post found successfully",
        data: post,
      });
    }
  });
};

exports.viewBySlug = function (req, res) {
  PostModel.findOne({ slug: req.params.slug }, async function (err, post) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      let postConAutores = await fetchAutoresAndSetWithPosts([post]);
      res.json({
        status: "success",
        message: "post found!",
        data: postConAutores[0],
      });
    }
  });
};
// Handle update post info
exports.update = function (req, res) {
  PostModel.findById(req.params.post_id, function (err, post) {
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
  PostModel.deleteOne(
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

async function fetchAutoresAndSetWithPosts(posts) {
  return new Promise(async (resolve, reject) => {
    try {
      let autores = [...new Set(posts.map((entry) => entry.autorId))].map((autorId) => {
        return userController.findByIdPromise(autorId);
      });
      let autoresResueltos = await Promise.all(autores);
      for (const post of posts) {
        let autor = autoresResueltos.find((autor) => autor.id == post.autorId);
        if (autor) {
          post["autorObj"] = autor;
        }
      }
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
}
