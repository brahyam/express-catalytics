'use strict';
const UserModel = require('../models/user-model');
const mongoDb = require('mongodb');
const winston = require('winston');

class UserService {

  create(user) {
    return new Promise(
      function (resolve, reject) {
        var newUser = new UserModel();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = newUser.generateHash(user.password);

        newUser.save(function (err, createdUser) {
          if (err) {
            // Failed to save
            reject(err);
          }
          else {
            resolve(createdUser);
          }
        });
      }
    )
  }

  find(query) {
    return new Promise(
      function (resolve, reject) {

        var newQuery;
        if (!query) {
          newQuery = {};
        }
        else {
          newQuery = query;
        }

        UserModel.find(newQuery, function (err, users) {
          if (err) {
            reject(err);
          }
          else {
            resolve(users);
          }
        });
      }
    )
  }

  generateHash(user, password) {
    return user.generateHash(password);
  }

  validPassword(user, password) {
    return user.validPassword(password);
  }
}

module.exports = new UserService();