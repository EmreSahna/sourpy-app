const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const ApiKey = require('./models/ApiKey');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// mongoose connection
mongoose.connect("mongodb+srv://sourpy:sourpy@cluster0.z2q6q.mongodb.net/sourpy?retryWrites=true&w=majority")
.then(console.log("Connected to Database"))
.catch((err) => console.log(err))

app.get("/users", function(req,res) {
    User.find({})
    .then(function(Users) {
      res.json(Users);
    })
    .catch(function(err) {
      res.json(err);
    })
});

app.get("/keys", function(req,res) {
    ApiKey.find({})
    .then(function(ApiKeys) {
      res.json(ApiKeys);
    })
    .catch(function(err) {
      res.json(err);
    })
});

app.post("/user", function(req, res) {
    User.create(req.body)
      .then(function(User) {
        res.json(User);
      })
      .catch(function(err) {
        res.json(err);
      });
});

app.post("/key/:id", function(req, res) {
    ApiKey.create(req.body)
      .then(function(ApiKey) {
        return User.findOneAndUpdate({ _id: req.params.id }, {$push: {keys: ApiKey._id}}, { new: true });
      })
      .then(function(User) {
        res.json(User);
      })
      .catch(function(err) {
        res.json(err);
      });
});

app.get("/users/:id", function(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("keys")
      .then(function(User) {
        res.json(User);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

app.listen(5000, () => {
    console.log("server çalıştı.");
})