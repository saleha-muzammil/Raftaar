const mongoose = require('mongoose');

const User = mongoose.Schema(
{
    picture:
    {
        type: String,
        required: true
    },
    
    name: 
    {
        type: String,
        required: true
    },

    email:
    {
        type: String,
        unique: true,
        required: true
    } 
});

module.exports = mongoose.model('users', User);