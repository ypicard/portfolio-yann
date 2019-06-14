const path = require("path");
const http = require("http");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.locals.basedir = path.join(__dirname, "views"); // base dir for pug engine includes
// statics
app.use(express.static(path.join(__dirname, "public")));

app.get("/work", function(req, res) {
  res.render("work/index", { title: "Profesionnal experiences" });
});
app.get("/projects", function(req, res) {
  res.render("projects/index", { title: "Projects" });
});
app.get("/education", function(req, res) {
  res.render("education/index", { title: "Education" });
});
app.get("/blog", function(req, res) {
  res.render("blog/index", { title: "Blog" });
});
app.get("/blog/mediatool", function(req, res) {
  res.render("blog/mediatool", {
    title: "How I refactored a 7 year old legacy tool in 6 months"
  });
});
app.get("/downloads", function(req, res) {
  // handle all downloads here
  const filename = req.query.filename;
  const file = `${__dirname}/public/downloads/${filename}`;
  res.download(file); // Set disposition and send it.
});
app.get("*", function(req, res) {
  // route everything else to home page
  res.render("index");
});

// http
const httpServer = http.createServer(app);
httpServer.listen(8080, function() {
  console.log(`Http running server on http://localhost:8080`);
});

// ssl
if (process.env.NODE_ENV === "production") {
  const https = require("https");
  const fs = require("fs");
  const httpsServer = https.createServer(httpsOptions, app);
  let httpsOptions = {
    cert: fs.readFileSync("/etc/letsencrypt/live/ypicard.dev/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/ypicard.dev/privkey.pem")
  };
  httpsServer.listen(8443, function() {
    console.log(`Http running server on http://localhost:8443`);
  });
}
