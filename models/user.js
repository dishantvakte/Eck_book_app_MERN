var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
username: {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true

}
})

UserSchema.pre('save', function(next){    //on save event.. before saving
    var user = this;
    if(this.isModified('password' || this.isNew)){  //if new user is created or the password is being modified
       
        bcrypt.genSalt(10, function(err, salt){  //salting will round off to 10
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password , salt , null, function(err, hash){ //hash the password with the salt
                if(err){
                    return next(err);
                }
                user.password= hash;
                next();
            })
        })
        
    }
    else{
        return next();
    }
})
//creates a method with name confirmPassword
UserSchema.methods.confirmPassword = function(passw, next){
    bcrypt.compare(passw, this.password, function(err,isMatch){  //compares passwords even in encrypted form
        if(err){
            return next(err); 
        }
        next(null, isMatch);
    })
};



module.exports= mongoose.model('User', UserSchema);
