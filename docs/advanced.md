# Advanced
The true power of this package is not the built-in validations, but the ability for easy extention.  

## Concepts
### Validator
When you call `validate(arg)`, you actually built a **validator**. A validator holds the **arg**, a set of **validations**, a set of **validator switchers** and a set of **basic methods**, conceptually, they are all methods of the validator.  

There are two built-in classes of validator: **basic** and **asString**.

### Validation
A validation is a method of a validator which test the arg the validator holds. If the test fails, it throws an error with an errorType of Match.Error and a sanitizedError with details for the client. If the test passes, it returns the validator.  

For example, `optional()`, `isString()`, `eq(target)` are validations.

### Validator Switcher
There can be more than one classes of validator. Validators of different classes have different validations. Moreover, some validators may change the arg before validation. So there is way to build a new validator with the same arg(say switch to another validator), that is, by calling validator switchers.  

A validator switcher is a method of a validator which is of the same name with the name of the target validator and will build a target validator with the arg held by the current validator.

For example, `asString()` is a validator switcher.

### Other Basic Methods
#### validate(subFieldName) => validator
It will return a **default** validator holding the sub field of the arg held by current validator.

### back() => validator
It will return the parent validator of current validator, that is, the validator before calling a validator switcher or before calling the validate method for a sub field.

#### ([subFieldName]) => validator
This is tricky, the validator itself is a function. The effect of calling it is depending on if there is any input argument. If there is, it equals calling `.validate(subFieldName)`, else, it equals calling `.back()`.

## Add Validator
Call `validate.addValidator(validatorName, options)` to add or override a class of validator. After adding, all new validators will have the validator switcher to a validator of this class with the same name of it.

For example, if you call `validate.addValidator('asDouble')`, then you can switch to an asDouble validator by calling `.asDouble()`.

### options.converter(arg) => arg
A function which converts the arg before validation.

## Add Validation
Call `validate.addValidation(validatorName, validationName, testFunc)` to add or override a validation to a class of validator. After adding, all new validators of this class will have such a validation.

### testFunc(arg, [otherArgs...]) => boolean
A test function is function which returns boolean and takes any number of arguments, with the first arg to be validated.

## Set Default Validator
Call `validate.setDefaultValidator(validatorName)` to set default validator class.
`validate` function and `validate` method of validators will return a **default** validator by this setting. As you can guess, **basic** is the default default validator class.

## Set Details Formatter
Call `validate.setDetailsFormatter(formatter)` to set details formatter, which will build strings for **sanitizedError.details.**

### formatter(arg, argName, validationName, validationArgs) => string
Build a string for **sanitizedError.details.**.
