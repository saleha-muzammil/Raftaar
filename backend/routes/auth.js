const express = require('express');
const isLoggedIn = require('../middleware/login'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Society = require('../models/Society');
const Admin = require('../models/Admin');
const router = express.Router();

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', isLoggedIn, async(req, res) => 
{
    try
    {
        const {name, email, picture} = req.user._json;
        const admin = await Admin.findOne({email});
    
        if (!email.includes('.edu.pk') || admin)
        {
            return res.status(401).json({error: admin ? 'Admins not allowed in the user application' : 'Only emails with .edu.pk are allowed'});
        }
    
        const user = await User.findOne({email});
        let token;
    
        if (!user)
        {
            const society = await Society.findOne({email});
            
            if (!society)
            {
                const new_user = await User.create({name, email, picture});
                token = jwt.sign({id: new_user._id}, JWT_SECRET);
            }
    
            else
            {
                !society.picture ? await Society.findByIdAndUpdate(society._id, {...society, picture}) : '';
                token = jwt.sign({id: society._id}, JWT_SECRET);
            }
        }
    
        else  
        {  
            token = jwt.sign({id: user._id}, JWT_SECRET);
        }
        
        return res.json({token});
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
});

router.get('/admin', isLoggedIn, async(req, res) => 
{
    try
    {
        const {email} = req.user._json;
        const admin = await Admin.findOne({email});
        console.log(email, admin);
        
        if (!admin)
        {
            return res.status(401).json({error: "Access Denied."});
        }

        const token = jwt.sign({id: admin._id}, JWT_SECRET);
        return res.json({token});
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
});

module.exports = router;