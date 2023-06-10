const mongodb = require('./mongo.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const expnse = require('./expense.js');
const Summary = require('./Summary.js');
const Income = require('./Income.js');
const { ObjectId } = require('mongodb');

const DB = new mongodb();
const app = express();
const port = 8001 || process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

function authenticate(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).send('user not signed in');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send('could not authenticate');
  }
}

app.listen(port || process.env.PORT, () => {
  console.log(`Listening on port ${port}`);
  console.log(`the FRONTEND_URL is ${process.env.FRONTEND_URL}`);
});

app.post('/expense', authenticate, (req, res) => {
  const expense = new expnse(DB);
  const data = {
    ...req.body,
    userId: req.user.userId,
  };
  if (data._id) {
    expense.updateOne(data);
  } else {
    expense.insertOne(data);
  }
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

app.get('/login', async (req, res) => {
  const userName = req.query.userName;
  const password = req.query.password;
  const user = await DB.getUser(userName);
  if (!user) {
    res.status(400).send('user not found');
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400).send('wrong password');
    return;
  }
  const accessToken = jwt.sign(
    { userName, userId: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.send({ state: 'ok', token: accessToken });
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
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.send({ state: 'ok', token: accessToken });
});

app.post('/income', (req, res) => {
  const data = req.body;
  const income = new Income(DB);
  income.insertOne(data);
  res.send('ok');
});
