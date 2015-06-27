validate = function (arg, argName) {
    return validators.createDefaultValidator(arg, argName, false);
};

validate.setDefaultValidator = validators.setDefaultValidator.bind(validators);
validate.putValidator = validators.putValidator.bind(validators);
validate.extendValidator = validators.extendValidator.bind(validators);