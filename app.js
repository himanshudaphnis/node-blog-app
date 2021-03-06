const path = require("path");
const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./database/models/Post");
const fileUpload = require("express-fileupload");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

const app = new express();

mongoose
  .connect("mongodb://localhost:27017/node-blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => "you are now connected to Mongo!")
  .catch(err => console.error("error", err));

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);

/*app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname, "pages/contact.html");
});

app.get("/post", (req, res) => {
  res.sendFile(__dirname, "pages/post.html");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "public/posts", image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
});

app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.render("post", { post });
  } catch (error) {
    console.error(error);
    res.redirect("/not-found");
  }
});*/

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
