const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/User");
const ApiKey = require("./models/ApiKey");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://sourpy:sourpy@cluster0.z2q6q.mongodb.net/sourpy?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to Database"))
  .catch((err) => console.log(err));


//User Methods
app.get("/users", function (req, res) {
  User.find({})
    .then(function (Users) {
      res.json(Users);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/user", function (req, res) {
  User.create(req.body)
    .then(function (User) {
      res.json(User);
    })
    .catch(function (err) {
      res.json(err);
      console.log(err);
    });
});

app.get("/users/:username", function (req, res) {
  User.findOne({ username: req.params.username })
    .populate("keys")
    .then(function (User) {
      res.json(User);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//ApiKey Methods
app.get("/keys", function (req, res) {
  ApiKey.find({})
    .then(function (ApiKeys) {
      res.json(ApiKeys);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/keys/:id", function(req,res){
  ApiKey.findById({_id: req.params.id})
  .then(function(ApiKey){
    res.json(ApiKey);
  })
  .catch(function(err){
    res.json(err);
  });
})

app.post("/key/:username", function (req, res) {
  ApiKey.create(req.body)
    .then(function (ApiKey) {
      return User.findOneAndUpdate(
        { username: req.params.username },
        { $push: { keys: ApiKey._id } },
        { new: true }
      );
    })
    .then(function (User) {
      res.json(User);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.put("/keys/:id", function(req,res){
  ApiKey.findOneAndUpdate({_id: req.params.id},{apiName: req.body.apiName, apiKey: req.body.apiKey, apiUsername: req.body.apiUsername, supplierId: req.body.supplierId})
  .then(function(ApiKey){
    res.json(ApiKey);
  })
  .catch(function(err){
    res.json(err);
  });
})

app.delete("/keys/:username/:id", function(req,res) {
  ApiKey.findOneAndDelete({_id: req.params.id})
  .then(function(ApiKey){
    return User.findOneAndUpdate(
      { username: req.params.username },
      { $pull: {keys: ApiKey._id} },
      { new: true }
    )
  })
  .catch(function(err){
    res.json(err);
  })
})

app.listen(5000, () => {
  console.log("server çalıştı.");
});