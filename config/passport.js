var JwtStrategy= require('passport-jwt').Strategy;
var ExtractJwt= require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var settings= require('../config/settings');

module.exports= function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey= settings.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.findOne({id: jwt_payload.id}, function(err, user){ //if any user is logged in while making the request and already has an id as a secured session
            if(err){
                return done(err, false);
            }
            if(user){   //If user exists return user info or null 
                done(null, user);
            }
            else{
                done(null, false);
            }
        })
    }))

};