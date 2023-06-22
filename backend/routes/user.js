const express = require('express');
const {verifyToken} = require('../middleware/tokenValidity');
const User = require('../models/User');
const router = express.Router();

router.get('/', verifyToken, async (req, res) =>
{
    try
    {
        const user = await User.findById(req.user_id);
        return res.json(user);
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
})

module.exports = router;