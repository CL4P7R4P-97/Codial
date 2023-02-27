const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    //fetching id from payload
    User.findById(jwtPayload._id, function(err, user){

        if(err){
            console.log('Error in finding user');
        }
        if(user){

            return done(null, user);
        }

        else{
            return (null, false);
        }
    })
}))

module.exports = passport;