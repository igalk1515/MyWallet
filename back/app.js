const mongodb = require('./mongo.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expnse = require('./expense.js');
const Summary = require('./Summary.js');
const { ObjectId } = require('mongodb');

const DB = new mongodb();
const app = express();
const port = 8001 || process.env.PORT;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.cookies.jwt; // Get the token from the cookie
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
}

app.listen(port || process.env.PORT, () => {
  console.log(`Listening on port ${port}`);
});

app.post('/expense', authenticate, (req, res) => {
  const expense = new expnse(DB);
  const data = {
    ...req.body,
    userId: req.user.userId,
  };
  expense.insertOne(data);
  res.send('ok');
});

app.get('/summary', authenticate, async (req, res) => {
  const summary = new Summary(DB);
  const data = await summary.getByMonths(
    req.user.userId,
    Number(req.query.month)
  );
  res.send(data);
});

app.post('/register', async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const user = await DB.getUser(userName);
  if (user) {
    res.status(400).send('user already exists');
    return;
  }
  const id = new ObjectId();
  DB.addUser(userName, password, id);
  const accessToken = jwt.sign(
    { userName, userId: id },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.cookie('jwt', accessToken);
  res.send({ state: 'ok', token: accessToken });
});
