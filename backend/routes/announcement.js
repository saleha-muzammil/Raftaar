const express = require('express');
const verifyToken = require('../middleware/tokenValidity');
const Announcement = require('../models/Announcement');
const router = express.Router();

router.post('/', verifyToken, async (req, res) =>
{
    const user = await User.findById(req.user_id);
    const {title, description, date, image, isAdmin, dName} = req.body;
    let society;
    if (!isAdmin)
    {
        society = Society.findOne({name: dName});
        await Announcement.create({title, description, date, image, user, society});

    }
    else{
        await Announcement.create({title, description, date, image, user});
    }
    return res.status(200);
})

module.exports = router;