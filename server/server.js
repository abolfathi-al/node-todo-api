var express = require('express');
var bodyParser = require('body-parser');

var { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { Hotel } = require('./models/hotel');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {

  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  
  if(!ObjectID.isValid(id))
    return res.status(404).send();

  Todo.findById(id).then((todo) => {
    if(!todo)
      return res.status(404).send();

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.get('/hotel', (req, res) => {

  var page = +req.query.page || 1;
  var perPage = +req.query.perPage || 10;
  var codeIataCity = req.query.CodeIataCity;

  Hotel.find({
      CodeIataCity: codeIataCity
    })
    .limit(perPage)
    .skip(perPage * page).then((hotel) => {
      res.send({
        count: hotel.length,
        hotel
      });
    }, (e) => {
      res.status(400).send(e);
    });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
}