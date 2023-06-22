const express = require('express');
const {verifyAdmin, verifyToken}  = require('../middleware/tokenValidity');
const Announcement = require('../models/Announcement');
const Society = require('../models/Society');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/', verifyAdmin, async (req, res) =>
{
    try
    {
        const {title, description, image, isAdmin, dName} = req.body;
        const {admin} = req;
        let society;
    
        if (!isAdmin)
        {
            society = Society.findOne({name: dName});
            await Announcement.create({title, description, image, admin, society});
        }
    
        else
            await Announcement.create({title, description, image, admin});       
            
        return res.sendStatus(200);
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
});

router.get('/', verifyToken, async (req, res) =>
{
    try
    {
        const announcements = await Announcement.find();
        
        for (let i of announcements)
        {
            i.admin = await Admin.findById(i.admin);
        }
        
        return res.json(announcements);
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
})

module.exports = router;