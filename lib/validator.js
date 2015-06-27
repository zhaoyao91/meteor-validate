Validator = function (arg, name, pass) {
    this.arg = arg;
    this.name = name || 'argument';
    this.pass = pass ? true : false;
};

/**
 * if the arg is null/undefined and optional, all the following validations will pass
 */
Validator.prototype.optional = function () {
    if (this.arg === null || this.arg === undefined) this.pass = true;
    return this;
};

/**
 * validate a sub field of the arg
 *
 * @param argName - name of the sub field
 * @param showName
 * @returns {Validator} default validator for the sub field
 */
Validator.prototype.validate = function (argName, showName) {
    if (typeof showName !== 'string') showName = this.name + '.' + argName;

    return validators.createDefaultValidator(this.arg[argName], showName, this.pass);
};