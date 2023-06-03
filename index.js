const mongoose = require("mongoose");
const express = require("express");

const urlSchema = require("./model/urlSchema");

const app = express();

mongoose.connect("mongodb://127.0.0.1/ShortLink");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const url = await urlSchema.find();
  res.render("index", { url: url });
});

app.post("/short-link", async (req, res) => {
  if (req.body.url == null || req.body.url == "") return res.redirect("/");
  const newUrl = await urlSchema.create({
    fullUrl: req.body.url,
  });

  await newUrl.save();
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const findUrl = await urlSchema.findOne({ shortUrl: req.params.shortUrl });

  if (findUrl) {
    res.redirect(findUrl.fullUrl);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3001, () => {
  console.log("server has started at http://localhost:3001");
});
