/**
 * build a validation method for validator
 *
 * @param validationName
 * @param testFunc(arg, otherArgs...) - test if arg satisfy sth
 *
 * @return validation function
 */
buildValidation = function (validationName, testFunc) {
    // the validation is intent to be a method of a validator
    // so `this` refer to the host validator
    return function () {
        var validatorFields = this;
        var not = this.not;
        this.not = false; // 'not' only takes effect once

        // if pass, don't check
        if (!this.pass) {
            // convert arguments object to array
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            try {
                try{
                    check(this.arg, Match.Where(function (arg) {
                        // bind validatorFields to 'this' of testFunc
                        // so it can do some advanced test or validation
                        return testFunc.bind(validatorFields, arg).apply(null, args);
                    }));
                }
                catch (error) {
                    // if not pass and 'not', then pass
                    if (error.errorType === 'Match.Error' && not) return this.validator;
                    else throw error;
                }
                // if pass and 'not', then not pass
                if (not) check(null, Match.Where(function(){return false}));
            }
            catch (error) {
                if (error.errorType === 'Match.Error') {
                    // in case that the test func has already failed some validation
                    // so the details is already set and is more precise
                    if (!error.sanitizedError.details) {
                        if (not) validationName = 'not ' + validationName;
                        error.sanitizedError.details = formatDetails(this.arg, this.argName, validationName, args);
                    }
                }
                throw error;
            }
        }

        return this.validator;
    }
};

formatDetails = function (arg, argName, validationName, validationArgs) {
    var details = 'Fail to validate <' + argName + '> with ' + '<' + arg + '>' + ' by <' + validationName + '>';
    if (validationArgs.length > 0) details += ' with <' + validationArgs + '>';
    return details
};