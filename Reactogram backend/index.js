const express = require('express');
const PORT = 3000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config')

global.__basedir = __dirname;
mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./model/user_model');
require('./model/post_model');

app.use(cors());
app.use(express.json());

app.use(require('./route/user_route'));
app.use(require('./route/post_route'));
app.use(require('./route/files_route'));


app.listen(PORT, () => {
    console.log("Server started");
});