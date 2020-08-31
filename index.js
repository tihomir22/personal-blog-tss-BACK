const mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  express = require("express"),
  app = express();
let cors = require("cors");
require("dotenv").config();
require("http");

const postController = require("./controlers/postController");
const passController = require("./controlers/passController");
const { read } = require("fs");
const hostname = process.env.HOST;
const port = process.env.PORT;
const mongoPassword = process.env.MONGO_PASS;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

const uri = `mongodb+srv://tihomir22:${mongoPassword}@cluster0.xc7wt.mongodb.net/BlogTiho?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", function (req, res) {
console.log("hello hello");
  res.send("Hello World");
});

app.get("/posts", function (req, res) {
	console.log("GET POSTS");
  postController.index(req, res);
});

app.post("/posts", function (req, res) {
console.log("POST POSTS");
  postController.new(req, res);
});

app.post("/accessEditor", (req, response) => {
	console.log("ACCESS EDITOR"); 
 if (req.body && req.body.contrasenya) {
    passController.recuperarContrasenya(req, response, req.body.contrasenya);
  } else {
    response.json({ status: "error", message: "Te falta algun dato por introducir", data: false });
  }
});

app.listen(port, hostname,()=>{
  console.log(`listening into ${hostname} ${port}`)
});
