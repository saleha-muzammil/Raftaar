const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const connectToDB = require('./db.js');
const app = express();

require('./config-passport.js');
connectToDB();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/auth'));
app.use('/google', require('./routes/google'));
app.use('/api/user', require('./routes/user'));
app.use('/api/announcement', require('./routes/announcement'));

app.listen(5000, () => console.log('App running'));