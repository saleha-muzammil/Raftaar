const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verify = (req, res) =>
{
    const token = req.header('auth-token');
    
    if (!token)
    {
        return res.send(401).json({error: 'Access Denied.'});
    }
    
    try
    {
        const decrypted = jwt.verify(token, JWT_SECRET);
        req.user_id =  decrypted.id;
    }

    catch
    {
        return res.status(401).json({error: 'Access Denied.'});
    }   
}

const verifyToken = (req, res, next) =>
{
    try
    {
        const message = verify(req, res);
    
        if (!req.user_id)
            return message;
        
        next();
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
}

const verifyAdmin = async(req, res, next) =>
{
    try
    {
        const message = verify(req, res);
        
        if (!req.user_id)
            return message;
        
        const admin = await Admin.findById(req.user_id);
        
        if (!admin)
            return res.status(401).json({error: 'Access Denied.'});

        req.admin = admin;
        next();    
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
}

module.exports = {verifyToken, verifyAdmin};