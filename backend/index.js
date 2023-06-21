const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const connectToDB = require('./db.js');
const User = require('./models/User');
const app = express();
const isLoggedIn = require('./middleware/login');

require('./passport-setup');
require('dotenv').config();
connectToDB();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/user', require('./routes/user'));
app.use('/google', require('./routes/google'));

app.get('/', isLoggedIn, async(req, res) => {
    const {name, email, picture} = req.user._json;
    
    if (!email.includes('.edu.pk'))
    {
        return res.status(401).json({error: 'Only emails with .edu.pk are allowed'});
    }

    const user =  await User.findOne({email});
    let token; 

    if (!user)
    {
        const new_user = await User.create({name, email, picture});
        token = jwt.sign({id: new_user._id}, JWT_SECRET);
    }    

    token = jwt.sign({id: user._id}, JWT_SECRET);
    
    return res.json({token});
});

app.listen(5000, () => console.log('App running'));