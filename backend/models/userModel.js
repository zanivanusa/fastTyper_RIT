/**
 * userModel.js
 *
 * @description :: Main user model.
*/


import mongoose from 'mongoose';
import hash from 'bcrypt';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    'username' : String,
    'email' : String,
    'password' : String
});

// middleware function
userSchema.pre('save', (next) => {
    var user = this.User;
    hash(user.password, 10, (err, hash) => {
        if(err)
          return next(err);
        
        user.password = hash;
        next();
	});
});

userSchema.statics.authenticate = (username, password, callback) => {
    // db query
    User.findOne({username: username}).exec((err, user) => {
        // error checks
        if(err) {
          return callback(err);
        } 
        else if (!user) {
          var err = new Error("User not found");
          err.status = 401;
          return callback(err);
        }
        // password decryption
        bcrypt.compare(password, user.password, 
                        function(err, result) {
            if(result === true)
              return callback(null, user);
            else 
              return callback();
        })
    });
}

// creates a model with which we can call db functions
export var userModel = mongoose.model('User', userSchema);
