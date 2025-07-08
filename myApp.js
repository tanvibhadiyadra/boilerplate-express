const bodyParser = require("body-parser");
let express = require("express");
let app = express();
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/name", function (req, res) {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", function (req, res) {
  res.json({ name: req.body.first + " " + req.body.last });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  },
);

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

// console.log("Hello World");

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
  // const message = (process.env.MESSAGE_STYLE === "uppercase") ? "HELLO      JSON" : "Hello json";
  // res.json({"message": message});

  // res.json({"message": "Hello json"});
});

module.exports = app;
