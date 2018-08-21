require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { Hotel } = require('./models/hotel');

var app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  
  if(!ObjectID.isValid(id))
    return res.status(404).send();

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo)
      return res.status(404).send();

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  
  if(!ObjectID.isValid(id))
    return res.status(404).send();

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo)
      return res.status(404).send();

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
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

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
}