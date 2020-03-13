const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '818796289202-r9kg401krgurj6136f6eerj9eimeghpi.apps.googleusercontent.com',
            clientSecret: 'uzJWTGM8GY1PMXaQY946N2Z',
            callbackURL: 'http://localhost:3000/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

//client id
//818796289202-r9kg401krgurj6136f6eerj9eimeghpi.apps.googleusercontent.com

//client secret
// quzJWTGM8GY1PMXaQY946N2Z