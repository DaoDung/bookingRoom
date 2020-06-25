const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

// Import User Model
var User = require("../models/user");

exports.user_signup = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var newUser = new User({
          username: req.body.username,
          password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Username already exists.'});
          }
          res.json({success: true, msg: 'Successful created new user.'});
        });
      }
}

exports.user_signin = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
    if (err) throw err;

    if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
            });
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
        } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
        });
    }
    });
}

exports.user_login = (req, res, next) => {
    var token = getToken(req.headers);
    console.log(token)
}

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };