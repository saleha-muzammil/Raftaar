const mongoose = require('mongoose');

const connectToDB = async() =>
{
    await mongoose.connect('mongodb://localhost:27017/raftaar');
    console.log('Connected to DB');
}

module.exports = connectToDB; 