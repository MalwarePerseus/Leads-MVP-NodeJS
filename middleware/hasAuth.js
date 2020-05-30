let createError = require('http-errors')

exports.isLoggedIn = function(req, req, next) {
    if (req.user)
        next();
    else
        next(createError(401, 'User Not Authenticated.'));
}

exports.hasAuth = function(req, res, next) {
    if (req.user && req.user.is_admin == true)
        next();
    else
        next(createError(401, "User Not Authenticated."));
}