let validator = require('validator');
let models = require('../models');

const validateCreateUserFields = function(errors, req) {
    if (!validator.isEmail(req.body.email)) {
        errors["email"] = "Please use a valid Email Address.";
    }
    if (!validator.isAscii(req.body.password)) {
        errors["password"] = "Invalid Characters in Password, Please use another one";
    }
    if (!validator.isLength(req.body.password, { min: 8, max: 25 })) {
        errors["password"] = "Please ensure that you password's minimum length is 8 characters!"
    }
}

exports.validateUser = function(errors, req) {
    return new Promise(function(resolve, reject) {
        validateCreateUserFields(errors, req);
        return models.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(u => {
            if (u !== null) {
                errors["password"] = "Email already in use. Please Login or Reset your password";
            }
            resolve(errors);
        })
    })

}