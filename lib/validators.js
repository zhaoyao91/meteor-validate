validators = {
    /**
     * add a validator builder
     *
     * @param name
     * @param options
     */
    addValidator: function (name, options) {
        var builder = new ValidatorBuilder();
        builder.setOptions(options);
        validatorBuilders[name] = builder;

        // refresh validator switchers
        for (var name1 in validatorBuilders) {
            var builder1 = validatorBuilders[name1];
            for (var name2 in validatorBuilders) {
                var builder2 = validatorBuilders[name2];
                builder1.addValidatorSwitcher(name2, builder2);
            }
        }
    },

    /**
     * add a validation to a kind of validators
     *
     * @param validatorName
     * @param validationName
     * @param testFunc
     */
    addValidation: function(validatorName, validationName, testFunc) {
        validatorBuilders[validatorName].addValidation(validationName, testFunc);
    },

    buildValidator: function (name, parent, arg, argName, pass) {
        var builder = validatorBuilders[name];
        return builder.build(parent, arg, argName, pass);
    },

    setDefaultValidator: function(name) {
        defaultValidator = name;
    },

    buildDefaultValidator: function(parent, arg, argName, pass) {
        return this.buildValidator(defaultValidator, parent, arg, argName, pass);
    }
};

var defaultValidator;
var validatorBuilders = {};