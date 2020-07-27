const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const Datastore = require("nedb");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/user.js");
const Score = require("./model/score.js");
const path = require("path");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});
app.listen(PORT, () => console.log("Im listening on PORT:" + PORT));
//connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

//routes
app.post("/login", (req, res) => {
  User.findOne(req.body, (err, data) => {
    err ? res.send(err) : res.send(data);
  });
});

app.post("/reg", (req, res) => {
  User.findOne({ name: req.body.name }, (err, data) => {
    if (err) {
      res.send(err);
    } else if (data) {
      res.send("username exist");
    } else {
      const user = new User(req.body);
      user.save((err, data) => {
        err ? res.send(err) : res.send(data);
      });
    }
  });
});
app.post("/score", (req, res) => {
  const score = new Score(req.body);
  score.save((err, data) => {
    err ? res.send(err) : res.send(data);
  });
});

app.get("/stats/:username?", (req, res) => {
  Score.find(req.params, (err, data) => {
    err ? res.err(err) : res.send(data);
  });
});
