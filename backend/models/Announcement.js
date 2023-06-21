const mongoose = require('mongoose');

const Announcement = mongoose.Schema(
{
    title:
    {
        type: String,
        required: true
    }, 

    society:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'socities',

    },
 
    description: 
    {
        type: String,
        required: true
    },

    date:
    {
        type: Date,
        required: true
    }, 

    image:
    {
        type: String
    },

    user:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'users' ,
        required: true
    }


});

module.exports = mongoose.model('announcements', Announcement);
