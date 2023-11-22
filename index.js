const mongoose = require("mongoose");
const express = require("express");
const randomString = require("randomstring");

const urlSchema = require("./model/urlSchema");

const app = express();

mongoose.connect("mongodb+srv://mbahvictor16:WHNvtuYRVq9wDi0O@shorturl.xqfcipr.mongodb.net/?retryWrites=true&w=majority");

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  console.log(req.headers.host);
  res.render("index");
});



app.get("/url/shorturl", (req, res) => {
  res.render("url", {url : ""})
}).post("/url/shorturl", async (req, res) => {
  if (req.body.url == null || req.body.url == "") return res.redirect("/");

  const newUrl = await urlSchema.create({
    fullUrl: req.body.url,
    shortUrl: `https://${req.headers.host}/${randomString.generate(7)}`
  });

  await newUrl.save();
  res.render("url", {url : newUrl.shortUrl});

});

app.get("/:shortUrl", async (req, res) => {
  const findUrl = await urlSchema.findOne({ shortUrl: `https://${req.headers.host}/${req.params.shortUrl}` });

  if (findUrl) {
    res.redirect(findUrl.fullUrl);
  } else {
    res.sendStatus(404);
  }
});


app.listen(3001, () => {
  console.log("server has started at http://localhost:3001");
});
