const mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  express = require("express"),
  app = express(),
  cors = require("cors");

require("dotenv").config();
require("http");
require("helmet");
require("morgan");

const postController = require("./controlers/postController");
const passController = require("./controlers/passController");
const userController = require("./controlers/userController");

const { read } = require("fs");
const hostname = process.env.HOST;
const port = process.env.PORT;
const mongoPassword = process.env.MONGO_PASS;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

const uri = `mongodb+srv://tihomir22:${mongoPassword}@cluster0.xc7wt.mongodb.net/BlogTiho?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/posts", function (req, res) {
  postController.index(req, res);
});

app.get("/postsSlug/:slug", function (req, res) {
  postController.viewBySlug(req, res);
});

app.post("/posts", function (req, res) {
  postController.new(req, res);
});

app.post("/user", function (req, res) {
  userController.new(req, res);
});

app.post("/accessEditor", (req, response) => {
  if (req.body && req.body.contrasenya) {
    passController.recuperarContrasenya(req, response, req.body.contrasenya);
  } else {
    response.json({ status: "error", message: "Te falta algun dato por introducir", data: false });
  }
});

app.listen(port, hostname, () => {
  console.log(`listening into ${hostname} ${port}`);
});
