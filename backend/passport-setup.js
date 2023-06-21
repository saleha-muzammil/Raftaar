const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) =>
{
    done(null, user);
});

passport.deserializeUser((user, done) =>
{
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '1016618172831-mr3e0a060vo7hal9f09dbk2k0v65iiv7.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));