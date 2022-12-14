const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const mongoDB = process.env.CONNECT_SERVICE;
const Card = require('./models/card');
const Master = require('./models/master.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

mongoose.connect(mongoDB).then(console.log('All good with DB'));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', (req, res) => {
  res.send('PokeBack runs good');
});

app.get('/types', (req, res) => {
  Card.find().distinct('type', (err, data) => res.send(data));
});

app.post('/master-auth', (req, res) => {
  const master = req.body;
  Master.create({ name: master.name, email: master.email }).then((message) => res.send(message));
});

app.put('/score-update', (req, res) => {
  Master.updateOne({ name: 'Test' }, { $set: { score: 1000 } }).then((uMessage) =>
    res.send(uMessage),
  );
});

app.get('/max-values/:base', (req, res) => {
  Card.find().distinct(`base.${req.params.base}`, (err, data) => res.send(data));
});

app.get('/pokedex', (req, res) => {
  Card.find({}, (err, data) => res.send(data));
});

app.get('/pokedex/:id', (req, res) =>
  Card.find({ id: req.params.id }, (err, data) => res.send(data)),
);

app.listen(PORT, (req, res) => {
  console.log(`PokeBack runs good at port: ${PORT}`);
});

//server restart
