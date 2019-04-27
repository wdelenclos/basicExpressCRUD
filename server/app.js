const express = require('express');
const bodyparser = require('body-parser');
const db = require('./lib/db');
const User = require('./models/user');
const MovieRouter = require('./routes/movie');
const UserRouter = require('./routes/user');


const app = express();


app.use(bodyparser.json());

app.use('/movies', MovieRouter);
app.use('/users', UserRouter);

app.listen(3000, () => console.log(">>> 📡 Server Listening on 3000"));

db.once('open', () => {});

db.once('error', (error) => console.log(error));