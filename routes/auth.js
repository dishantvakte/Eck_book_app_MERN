var mongoose = require('mongoose');
var passport = require('passport');
var settings= require('../config/settings');
var express = require('express');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var router= express.Router();
var User = require('../models/user');

router.post('/register', function(req, res){
    if(!req.body.username || !req.body.password){
        res.json({success: false, msg: 'Please pass username and password'});
    }
    else{
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        })
        newUser.save(function(err){
            if(err){
                return res.json({success: false, msg: 'Username already exists'});
            }
            res.json({success: true, msg: 'user created successfully'});
        })
    }
})

router.post('/login',function(req, res){
    User.findOne({                              //Checking if user is present in the db
        username: req.body.username
    }, function(err, user){
        if(err){                                   //in case of an error
            throw err;
        }
        if(!user){                              //if user is not found
            res.status(401).send({success: false, msg: 'User not found..'});
        }
        else{                                               //if user is found and there is no error
            user.confirmPassword(req.body.password, function(err, isMatch){ //matching password
                if(isMatch && !err){
                    var token = jwt.sign(user.toJSON(), settings.secret);    // create a token using jwt sign method using the secret key
                    res.json({success: true , token : 'JWT '+ token});
                }
                else{
                    res.status(401).send({success: false, msg: 'Incorrect password'})
                }
            })
        }
    })
})

module.exports= router;
