const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const port = process.env.SERVER_PORT || 7000;

app.use(bodyParser.json());

// Return all greetings
app.get("/greetings", (req, res) => res.json(db.findAll()));

// Return greeting with specified id (or 404)
app.get("/greetings/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const greeting = db.findById(id);

  if (!greeting) {
    return res.status(404).json({ error: `Greeting '${id}' not found` });
  }

  return res.json(greeting)
});

// create new greeting
app.post("/greetings", (req, res) => {

  const greeting = req.body;
  if (!greeting) {
    return res.status(400).json({ error: 'Greeting must be defined' });
  }

  if (!greeting.name) {
    return res.status(400).json({ error: 'greeting.name must be defined' });
  }

  if (!greeting.greeting) {
    return res.status(400).json({ error: 'greeting.greeting must be defined' });
  }

  const newId = db.insert(req.body);
  return res.status(201).json({id: newId});
});

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
