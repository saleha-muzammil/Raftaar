const express = require('express');
const verifyToken = require('../middleware/tokenValidity');
const User = require('../models/User');
const router = express.Router();

router.get('/', verifyToken, async (req, res) =>
{
    const user = await User.findById(req.user_id);
    return res.json(user);
})

module.exports = router;