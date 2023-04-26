/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
*/

import { userModel } from '../models/userModel.js';

async function list(req, res) {
    userModel.find().then((users) => {
        return res.json(users);
    }).catch((err) => {
        return res.status(500).json({
            message: 'Error when getting user.',
            error: err
        });
    });
}

async function show(req, res) {
    var id = req.params.id;

    userModel.findOne({_id: id}).then((user) => {
        return res.json(user);
    }).catch((err) => {
        return res.status(500).json({
            message: 'Error when getting user.',
            error: err
        });
    });
}

async function create(req, res) {
    var user = new userModel({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });

    await user.save().then(() => {
        return res.redirect('/');
    }).catch((err) => {
        return res.status(500).json({
                message: 'Error when creating user',
                error: err
        });
    });
}

async function update(req, res) {
    var id = req.params.id;

    userModel.findOne({_id: id}).then(async (user) => {
        // check if any new data
        user.username = req.body.username ? 
                        req.body.username : user.username;
        user.email = req.body.email ? req.body.email : user.email;
        user.password = req.body.password ?
                        req.body.password : user.password;
        await user.save().then(() => {
              return res.redirect('/');
        }).catch((err) => {
            return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
            });
        });

    }).catch((err) => {
        return res.status(500).json({
                message: 'Error when getting user',
                error: err
        });
    });
}

function remove(req, res) {
    var id = req.params.id;

    userModel.findByIdAndRemove({id}).then((user) => {
        return res.status(204).json();
    }).catch((err) => {
        return res.status(500).json({
            message: 'Error when deleting the user.',
            error: err
        });
    });
}

function login(req, res, next){
    userModel.authenticate(req.body.username, 
        req.body.password, 
        function(error, user) {
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
