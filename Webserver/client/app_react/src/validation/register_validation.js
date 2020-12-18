const Validator = require("validator");
const isEmpty = require("is-empty");
const { default: validator } = require("validator");

module.exports = function validateRegisterInput(name, email, password, password2) {
    let errors = {};
    console.log(name, " : ", email);
    console.log(password, " : ", password2);
    name = name.value;
    email = email.value;
    password = password.value;
    password2 = password2.value;
    //Set empty fields to empty strings.
    name = !isEmpty(name) ? name : "";
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ? password : "";
    password2 = !isEmpty(password2) ? password2 : "";

    //Validate name
    if (Validator.isEmpty(name)) {
        errors.name = "Name field is required to register";
    }
    //Validate email
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required to register";
    }
    // Password checks
    if (Validator.isEmpty(password)) {
        errors.password = "Password field is required to register";
    }
    if (Validator.isEmpty(password2)) {
        errors.password2 = "Confirm password field is required to register";
    }
    if (!Validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters to register";
    }
    if (!Validator.equals(password, password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};