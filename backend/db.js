const mongoose = require('mongoose');

const connectToDB = async() =>
{
    try
    {
        await mongoose.connect('mongodb://localhost:27017/raftaar');
        console.log('Connected to DB');
    }

    catch(err)
    {
        console.log('Failed to connect to DB', err);
    }
}

module.exports = connectToDB; 