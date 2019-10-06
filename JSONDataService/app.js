const express = require('express');
const router = require('./router');
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/usersdb";
const mongoose = require('mongoose');

app.use(express.json());
app.use('/',router);

mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },  
    () => console.log('connected to DB!')
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
