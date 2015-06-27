validate = function (arg, name) {
    if (typeof name !== 'string') name = 'argument';
    return new Validator(arg, name);
};

Validator = function (arg, name) {
    this.arg = arg;
    this.name = name;
};

PassValidator = function () {

};

Validator.prototype.optional = function () {
    if (this.arg === null || this.arg === undefined) return new PassValidator();
    else return this;
};

Validator.prototype.validate = function (argName, showName) {
    if (typeof showName !== 'string') showName = this.name + '.' + argName;
    return new Validator(this.arg[argName], showName);
};

PassValidator.prototype.optional = returnThis;
PassValidator.prototype.validate = returnThis;

validate.extend = function (funcName, func) {
    if (typeof funcName === 'object') {
        var batch = funcName; // the arg is a batch of extends, not funcName anymore
        for (var name in batch) {
            validate.extend(name, batch[name]);
        }
        return;
    }

    Validator.prototype[funcName] = function () {
        // convert arguments object to array
        var otherArgs = [];
        for (var i = 0; i < arguments.length; i++) {
            otherArgs[i] = arguments[i];
        }

        try {
            check(this.arg, Match.Where(function (arg) {
                return func.bind(null, arg).apply(null, otherArgs);
            }));
        }
        catch (error) {
            if (error.errorType === 'Match.Error') {
                var details = 'Fail to validate [' + this.name + '] with ' + '[' + this.arg + ']' + ' by [' + funcName + ']';
                if (otherArgs.length > 0) details += ' with [' + otherArgs + ']';
                error.sanitizedError.details = details;
            }
            throw error;
        }
        return this;
    };

    PassValidator.prototype[funcName] = returnThis;
};

function returnThis() {
    return this;
}