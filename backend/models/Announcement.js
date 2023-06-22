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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'societies'
    },
 
    description: 
    {
        type: String,
        required: true
    },

    date:
    {
        type: Date,
        default: Date.now()
    }, 

    image:
    {
        type: String
    },

    admin:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'admins',
        required: true
    }


});

module.exports = mongoose.model('announcements', Announcement);
