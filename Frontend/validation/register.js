const Validator = require("validator");
const isEmpty = require("is-empty");
const { default: validator } = require("validator");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //Set empty fields to empty strings.
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Validate name
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required to register";
    }
    //Validate email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required to register";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required to register";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required to register";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters to register";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};