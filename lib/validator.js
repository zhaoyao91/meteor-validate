ValidatorBuilder = function () {
    this.methods = {
        validate: function (argName, showName) {
            if (typeof showName !== 'string') showName = this.argName + '.' + argName;
            var subArg = this.arg ? this.arg[argName] : undefined;
            return validators.buildDefaultValidator(this.validator, subArg, showName, this.pass);
        },

        back: function () {
            if (!this.parent) throw new Error('no parent validator');
            return this.parent;
        },

        optional: function () {
            // .not().optional() is alias to .exists()
            if (this.not) {
                this.not = false;
                return this.validator.exists();
            }

            if (this.arg === null || this.arg === undefined) this.pass = true;
            return this.validator;
        },

        not: function() {
            this.not = this.not ? false : true;
            return this.validator;
        }
    };
};

/**
 * @param options
 * @param options.converter
 */
ValidatorBuilder.prototype.setOptions = function (options) {
  this.options = options;
};

ValidatorBuilder.prototype.addMethod = function (name, method) {
    this.methods[name] = method;
};

ValidatorBuilder.prototype.addValidation = function (name, testFunc) {
    var validation = buildValidation(name, testFunc);
    this.addMethod(name, validation);
};

ValidatorBuilder.prototype.addValidatorSwitcher = function (name, validatorBuilder) {
    var switcher = function () {
        return validatorBuilder.build(this.validator, this.arg, this.argName, this.pass);
    };
    this.addMethod(name, switcher);
};

ValidatorBuilder.prototype.build = function (parent, arg, argName, pass) {
    // save fields
    var fields = {
        parent: parent,
        arg: arg,
        argName: argName || 'argument',
        pass: pass ? true : false
    };

    // process fields by options
    if (this.options) {
        if (this.options.converter) {
            fields.arg = this.options.converter(fields.arg);
        }
    }

    // validator is a function
    // equals validate(...) when there is some arg
    // or equals back() when there is no arg
    var validator = function () {
        if (arguments.length) return validator.validate.apply(fields, arguments);
        else return validator.back.apply(fields, arguments);
    };

    fields.validator = validator;
    validator.fields = fields;

    // add methods
    for (var name in this.methods) {
        validator[name] = this.methods[name].bind(fields);
    }

    return validator;
};

