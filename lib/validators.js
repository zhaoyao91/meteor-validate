validators = {
    setDefaultValidator: function (validatorName) {
        this.defaultValidatorName = validatorName;
    },

    /**
     * @param validatorName
     * @param options
     * @param options.converter - convert the arg to another form
     */
    putValidator: function (validatorName, options) {
        // create validator class
        var SomeValidator = function () {
            Validator.apply(this, arguments);

            if (options) {
                if (options.converter) {
                    this.arg = options.converter(this.arg);
                }
            }
        };
        SomeValidator.prototype = Object.create(Validator.prototype);

        // collect validator class
        this.validatorClasses[validatorName] = SomeValidator;

        // add validator creation function to all validator class
        for (var vn1 in this.validatorClasses) {
            var validatorClass = this.validatorClasses[vn1];
            for (var vn2 in this.validatorClasses) {
                (function (vClass, vName) {
                    vClass.prototype[vName] = function () {
                        return validators.createValidator(vName, this.arg, this.name, this.pass);
                    }
                }(validatorClass, vn2));
            }
        }
    },

    /**
     * @param validatorName
     * @param validations - {validationName: testFunc}
     */
    extendValidator: function (validatorName, validations) {
        var validatorClass = this.validatorClasses[validatorName];
        for (var validationName in validations) {
            var testFunc = validations[validationName];
            var validation = createValidation(testFunc, validationName);
            validatorClass.prototype[validationName] = validation;
        }
    },

    createValidator: function (validatorName, arg, argName, pass) {
        var ValidatorClass = this.validatorClasses[validatorName];
        var v = new ValidatorClass(arg, argName, pass);
        return v;
    },

    createDefaultValidator: function (arg, argName, pass) {
        return this.createValidator(this.defaultValidatorName, arg, argName, pass);
    },

    defaultValidatorName: null,
    validatorClasses: {}
};