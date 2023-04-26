/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
*/

import { userModel } from '../models/userModel.js';

function list(req, res) {
    userModel.find((err, users) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err
            });
        }

        return res.json(users);
    });
}

function show(req, res) {
    var id = req.params.id;

    userModel.findOne({_id: id}, (err, user) => {
        // server error
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err
            });
        }

        // user not found
        if (!user) {
            return res.status(404).json({
                message: 'No such user'
            });
        }

        // user found
        return res.json(user);
    });
}

async function create(req, res) {
    var user = new userModel({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });

    await user.save()
    .then(() => {
        return res.redirect('/');
    });
  /*
    .catch((err) => {
        return res.status(500).json({
                message: 'Error when creating user',
                error: err
        });
    });

    user.save((err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }

        return res.redirect('/');
    });
    */
}

function update(req, res) {
    var id = req.params.id;

    userModel.findOne({_id: id}, (err, user) => {
        // server error
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user',
                error: err
            });
        }

        // no user found
        if (!user) {
            return res.status(404).json({
                message: 'No such user'
            });
        }

        // check if any new data
        user.username = req.body.username ? 
                        req.body.username : user.username;
        user.email = req.body.email ? req.body.email : user.email;
        user.password = req.body.password ?
                        req.body.password : user.password;
  
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating user.',
                    error: err
                });
            }

            return res.json(user);
        });
    });
}

function remove(req, res) {
    var id = req.params.id;

    userModel.findByIdAndRemove(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the user.',
                error: err
            });
        }

        return res.status(204).json();
    });
}

function login(req, res, next){
    userModel.authenticate(req.body.username, 
      req.body.password, 
      (error, user) => {
        if(error || !user) {
            var err = new Error("Wrong username or password");
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id;
            req.session.username = user.username;
            return res.redirect('/users/');
        }
    });
}

function logout(req, res){
  if(req.session) {
      req.session.destroy((err) => {
          if(err)
            return next(err);
          else
            return res.redirect('/');
      });
  }
}

export const userController = {
    list,
    show,
    create,
    update,
    remove,
    login,
    logout
};
