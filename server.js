const express = require('express');
const app = express();

const mongodb = require('./data/contacts');

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

mongodb.initDB((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database is listening and node running on ${port}`) });
    }
});

app.use('/', require('./routes'));

// app.listen(3000, () => { console.log(`Running on port ${port}`) });
