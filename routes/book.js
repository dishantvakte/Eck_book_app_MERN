var express = require('express');
var mongoose= require('mongoose');
var router= express.Router();
var Book = require('../models/book');
var passport = require('passport');
require('../config/passport')(passport);

//get all books from data base


router.get('/', passport.authenticate('jwt', {session: false}), function(req,res){ //to allow only authorized users
    var token = getToken(req.headers);
    if(token){          //if token is verified i.e. a user is already logged in


        
        Book.find(function(err, data){
            if(err){
                return next();
            }
            else{
                res.json(data);
            }
        });
       

    }
    else{                                                                   //if unauthorized user tries to make the request
        return res.status(403).send({success: false, msg:'Unauthorized'});

    }
})


//Save Book


router.post('/', passport.authenticate('jwt', {session: false}), function(req,res){ //to allow only authorized users
    var token = getToken(req.headers);
    if(token){          //if token is verified i.e. a user is already logged in


        
            Book.create(req.body, function(err, data){
                if(err){
                    return next(err);
                        }
                        else{
                            res.json(data);
                        }
            })
       

    }
    else{                                                                   //if unauthorized user tries to make the request
        return res.status(403).send({success: false, msg:'Unauthorized'});

    }
})

getToken = function(headers){
    if(headers && headers.authorization){
        var parted= headers.authorization.split(' ');
        if(parted.length ===2){
            return parted[1];

        }
        else{
            return null;
        }
    }
    else{
        return null;
    }

}

module.exports= router;
