const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateNewPasswordInput(oldPassword, newPassword) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions

    oldPassword = oldPassword.value
    newPassword = password.value;

    oldPassword = !isEmpty(oldPassword) ? oldPassword : "";
    newPassword = !isEmpty(newPassword) ? newPassword : "";
    // Password checks
    if (Validator.isEmpty(oldPassword) || Validator.isEmpty(newPassword)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};