require('dotenv').config();
const config = require('./config/auth.config');
const express = require('express');
const usersRouter = require('./routes/user.routes');
const cors = require('cors');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', usersRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
