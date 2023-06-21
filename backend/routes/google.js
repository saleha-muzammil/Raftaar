const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:5000/google/401'}), async(req,res) => 
{
    res.redirect('http://localhost:3000/#/login-successful');
});

router.get('/401', (req, res) => res.send('Unauthorized'));

router.get('/logout', (req, res) =>
{
    req.session = null;
    req.logout();
    res.send('Done');
});

module.exports = router;