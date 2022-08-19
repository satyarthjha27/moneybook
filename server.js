require('dotenv').config();
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const env = process.env.NODE_ENV || 'local';
const mongoose = require("mongoose");
const mongo = process.env.MONGO;

app.use(cors());
app.use(bodyParser.json());

// Done: Set config Depending upon the Environment
const config = {
    dburl: `${mongo}`
}
try {
    mongoose.connect(config.dburl, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
    console.log(error);
}
const db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongoose default connection established.');
});

db.on('close', function () {
    console.log('Mongoose connection closed.');
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection ended.');
});


app.use('/', require('./routes'));

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
})
