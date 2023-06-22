const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:5000/google/401'}), async(req,res) => 
{
    try
    {
        return res.redirect('http://localhost:3000/#/login-successful');
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
});

router.get('/401', (req, res) => res.status(401).send('Unauthorized'));

router.get('/logout', (req, res) =>
{
    try
    {
        req.session = null;
        req.logout();
        res.send('Done');
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
});

module.exports = router;