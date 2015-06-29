validate = function (arg, argName) {
    return validators.buildDefaultValidator(null, arg, argName, false);
};

validate.setDefaultValidator = validators.setDefaultValidator.bind(validators);
validate.addValidator = validators.addValidator.bind(validators);
validate.addValidation = validators.addValidation.bind(validators);