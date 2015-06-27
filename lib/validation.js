/**
 * create a validation method for validator
 *
 * @param testFunc(arg, otherArgs...) - test if arg satisfy sth
 * @return {Function} validation function
 */
createValidation = function(testFunc, validationName) {
    // the instance of Validate is intent to be a method of a validator
    return function() {
        // if pass, don't check
        if (!this.pass) {
            // convert arguments object to array
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            try {
                check(this.arg, Match.Where(function (arg) {
                    return testFunc.bind(null, arg).apply(null, args);
                }));
            }
            catch (error) {
                if (error.errorType === 'Match.Error') {
                    var details = 'Fail to validate [' + this.name + '] with ' + '[' + this.arg + ']' + ' by [' + validationName + ']';
                    if (args.length > 0) details += ' with [' + args + ']';
                    error.sanitizedError.details = details;
                }
                throw error;
            }
        }

        return this;
    }
};