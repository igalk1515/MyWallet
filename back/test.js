const mongodb = require('./mongo.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expnse = require('./expense.js');
const Summary = require('./Summary.js');

const DB = new mongodb();
const app = express();
const port = 8001 || process.env.PORT;

summary = new Summary(DB);
async function fetchData() {
  const data = await summary.getByMonths(6);
}

fetchData();
