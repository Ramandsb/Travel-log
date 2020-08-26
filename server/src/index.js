/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');

const logs = require('./api/logs')

require('dotenv').config();

const app = express();

const db = require('./config/keys').MongoURI



mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log('MongoDB connected...'))
.catch((err)=> console.log(err))

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3004",
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});
app.use(express.json())

app.use('/api/logs', logs)

app.use(middlewares.errorHandler);

app.use(middlewares.notFound);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log('Listening to http://localhost:1337');
});
