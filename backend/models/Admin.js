const mongoose = require('mongoose');

const Admin = mongoose.Schema(
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
    },
    
    title:
    {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('admins', Admin);