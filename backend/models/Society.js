const mongoose = require('mongoose');

const Society = mongoose.Schema(
{
    picture:
    {
        type: String,
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

module.exports = mongoose.model('societies', Society);