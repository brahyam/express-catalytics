'use strict';
/**
 * Middleware that checks if an user is authenticated and passes request to next middleware. If
 * not authenticated it will redirect the user to the login page
 * @param error current error object
 * @param req express request object
 * @param res express response object
 * @param next express next middleware object
 * @returns {*} next middleware or redirects to /login
 */
module.exports.isLoggedIn = function (error, req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
};
