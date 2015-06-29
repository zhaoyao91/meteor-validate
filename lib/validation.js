/**
 * build a validation method for validator
 *
 * @param testFunc(arg, otherArgs...) - test if arg satisfy sth
 * @param validationName
 *
 * @return validation function
 */
buildValidation = function(testFunc, validationName) {
    // the validation is intent to be a method of a validator
    // so `this` refer to the host validator
    return function() {
        var arg = this.arg;

        // if pass, don't check
        if (!this.pass) {
            // convert arguments object to array
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            try {
                check(arg, Match.Where(function (arg) {
                    return testFunc.bind(null, arg).apply(null, args);
                }));
            }
            catch (error) {
                if (error.errorType === 'Match.Error') {
                    var details = 'Fail to validate [' + this.argName + '] with ' + '[' + arg + ']' + ' by [' + validationName + ']';
                    if (args.length > 0) details += ' with [' + args + ']';
                    error.sanitizedError.details = details;
                }
                throw error;
            }
        }

        return this.validator;
    }
};